import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
const valid = { requestId: "17000000-0000-4000-8000-000000000001", name: "Test", telephone: "+48662989534", service: "Manicure", date: "2099-01-01", timePreference: "Dowolnie" };
const request = (data, headers = {}) => new Request("https://noblu.pl/api/rezerwacja", {
  method: "POST", headers: { "content-type": "application/json", origin: "https://noblu.pl", ...headers },
  body: typeof data === "string" ? data : JSON.stringify(data),
});

function harness({ failure, allowed = true, env = {}, provider } = {}) {
  const sent = [], logs = [];
  function load(filename) {
    const m = { exports: {} };
    vm.runInNewContext(ts.transpileModule(readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText, {
      module: m, exports: m.exports, Request, Response, URL, TextDecoder, AbortSignal,
      process: { env: { RESEND_API_KEY: "test-only", ...env } },
      console: { error: (...args) => logs.push(args) },
      fetch: async (url, options) => {
        sent.push({ url, options });
        if (provider) return provider(options);
        if (failure === "network") throw new Error("private@example.com secret provider error");
        return new Response(failure ? "private@example.com provider data" : '{"id":"test-id"}', { status: failure ? 500 : 200 });
      },
      require: name => {
        if (name.endsWith("/bookingRateLimit")) return { checkBookingRateLimit: () => ({ allowed, retryAfterSeconds: 60 }) };
        if (name.startsWith(".")) return load(path.resolve(path.dirname(filename), name + ".ts"));
        if (name === "libphonenumber-js/min") {
          const lib = require(name);
          return { parsePhoneNumberFromString: (value, options) => lib.parsePhoneNumberFromString(value, { ...options }) };
        }
        return require(name);
      },
    });
    return m.exports;
  }
  const api = load(fileURLToPath(new URL("../app/api/rezerwacja/route.ts", import.meta.url)));
  return { api, sent, logs };
}

test("booking derives price and duration from the server catalog", async () => {
  const h = harness();
  const res = await h.api.POST(request({ ...valid, price: "1 zl", duration: "1 minute" }));
  assert.equal(res.status, 200);
  const email = JSON.parse(h.sent[0].options.body);
  assert.equal(email.from, "Noblu Beauty Room <salon@noblu.pl>");
  assert.deepEqual(email.to, ["salon@noblu.pl"]);
  assert.equal(email.cc, undefined);
  assert.equal(email.bcc, undefined);
  assert.match(email.text, /100 zł/);
  assert.match(email.text, /ok\. 1h/);
  assert.doesNotMatch(email.text, /1 zl|1 minute/);
  assert.ok(h.sent[0].options.signal, "provider call has a timeout");
});

test("booking rejects missing or malformed request identities before delivery", async () => {
  for (const requestId of [undefined, "", 123, "bad\r\nheader", "x".repeat(1000)]) {
    const h = harness();
    assert.equal((await h.api.POST(request({ ...valid, requestId }))).status, 400);
    assert.equal(h.sent.length, 0);
  }
});

test("retries across API instances share the provider idempotency key, including a lost response", async () => {
  const accepted = new Map();
  let deliveries = 0;
  let loseFirstResponse = true;
  const provider = async (options) => {
    const key = options.headers["Idempotency-Key"];
    if (!key || !accepted.has(key)) {
      deliveries++;
      if (key) accepted.set(key, options.body);
    }
    if (loseFirstResponse) {
      loseFirstResponse = false;
      throw new Error("accepted but response lost");
    }
    return Response.json({ id: "same-email-id" });
  };
  const first = harness({ provider });
  assert.equal((await first.api.POST(request(valid))).status, 502);
  const second = harness({ provider });
  assert.equal((await second.api.POST(request(valid))).status, 200);
  assert.equal(second.sent[0].options.headers["Idempotency-Key"], `booking/${valid.requestId}`);
  assert.equal(first.sent[0].options.body, second.sent[0].options.body);
  assert.equal(deliveries, 1, "a shared provider, not process memory, deduplicates deliveries");
});

test("provider conflicts and concurrent requests never become false successes", async () => {
  for (const name of ["invalid_idempotent_request", "concurrent_idempotent_requests"]) {
    const h = harness({ provider: async () => Response.json({ name, message: "private provider details" }, { status: 409 }) });
    const response = await h.api.POST(request(valid));
    assert.equal(response.status, 409);
    const body = await response.json();
    assert.equal(body.ok, undefined);
    assert.match(body.error, name === "concurrent_idempotent_requests" ? /przetwarzane/ : /treści/);
    assert.doesNotMatch(body.error, /private provider/);
  }
});

test("booking respects the configured recipient without copying the old mailbox", async () => {
  const h = harness({ env: { BOOKING_RECIPIENT_EMAIL: "reception@example.com" } });
  assert.equal((await h.api.POST(request(valid))).status, 200);
  const email = JSON.parse(h.sent[0].options.body);
  assert.deepEqual(email.to, ["reception@example.com"]);
  assert.equal(email.cc, undefined);
  assert.equal(email.bcc, undefined);
});

test("booking rejects unknown services, time values and oversized fields before delivery", async () => {
  for (const changes of [{ service: "Made up" }, { timePreference: "Midnight" }, { name: "x".repeat(101) }, { notes: "x".repeat(1001) }, { name: "Injected\nheader" }]) {
    const h = harness();
    assert.equal((await h.api.POST(request({ ...valid, ...changes }))).status, 400);
    assert.equal(h.sent.length, 0);
  }
});

test("booking rejects cross-origin, wrong content type and oversized body", async () => {
  for (const [req, expected] of [
    [request(valid, { origin: "https://attacker.example" }), 403],
    [request(valid, { "content-type": "text/plain" }), 415],
    [request({ ...valid, notes: "x".repeat(20000) }), 413],
    [request("{bad json"), 400],
  ]) {
    const h = harness();
    assert.equal((await h.api.POST(req)).status, expected);
    assert.equal(h.sent.length, 0);
  }
});

test("origin validation uses HTTP host when Next reconstructs the bind hostname", async () => {
  const h = harness();
  const response = await h.api.POST(new Request("http://localhost:3100/api/rezerwacja", {
    method: "POST", headers: { host: "127.0.0.1:3100", origin: "http://127.0.0.1:3100", "content-type": "application/json" }, body: "{}",
  }));
  assert.equal(response.status, 400);
  assert.equal(h.sent.length, 0);
});

test("booking handles provider/network errors without leaking customer data", async () => {
  for (const failure of ["provider", "network"]) {
    const h = harness({ failure });
    const res = await h.api.POST(request(valid));
    assert.equal(res.status, 502);
    assert.doesNotMatch(JSON.stringify(h.logs), /private@example|secret provider/);
    assert.doesNotMatch(await res.text(), /private@example|secret provider/);
  }
});

test("honeypot and rate limit never call the email provider", async () => {
  const honey = harness();
  assert.equal((await honey.api.POST(request({ ...valid, website: "spam" }))).status, 200);
  assert.equal(honey.sent.length, 0);
  const limited = harness({ allowed: false });
  const response = await limited.api.POST(request(valid));
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "60");
  assert.equal(limited.sent.length, 0);
});
