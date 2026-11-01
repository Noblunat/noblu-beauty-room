import assert from "node:assert/strict";
import test from "node:test";
import { loadDataModule } from "./helpers/load-data.mjs";

const { previewRequest, authorizePreview } = loadDataModule("./e2e/preview-request", import.meta.url);
const target = new URL("https://noblu-beauty-room77-preview.vercel.app/");
const authCookie = { name: "_vercel_jwt", domain: target.hostname, secure: true, httpOnly: true };

function mockContext(cookies = [authCookie], status = 307) {
  const calls = [];
  return {
    calls,
    request: { get: async (...args) => { calls.push(args); return { status: () => status }; } },
    cookies: async () => cookies,
  };
}

test("preview authorization establishes one host-scoped session without following redirects", async () => {
  const context = mockContext();
  await authorizePreview(context, target, "test-only-secret");
  assert.equal(context.calls.length, 1);
  const [url, options] = context.calls[0];
  assert.equal(url, target.origin);
  assert.equal(options.maxRedirects, 0);
  assert.equal(options.headers["x-vercel-protection-bypass"], "test-only-secret");
  assert.equal(options.headers["x-vercel-set-bypass-cookie"], "true");
});

test("preview authorization rejects non-preview destinations before sending credentials", async () => {
  for (const url of ["https://noblu.pl/", "https://evil.invalid/", "http://noblu-beauty-room77-preview.vercel.app/", "https://noblu-beauty-room77-preview.vercel.app/?secret=x"]) {
    const context = mockContext();
    await assert.rejects(authorizePreview(context, new URL(url), "test-only-secret"), /preview URL/);
    assert.equal(context.calls.length, 0);
  }
});

test("preview authorization requires a secure HttpOnly cookie for this exact host", async () => {
  for (const cookies of [[], [{ ...authCookie, domain: ".vercel.app" }], [{ ...authCookie, secure: false }], [{ ...authCookie, httpOnly: false }]]) {
    await assert.rejects(authorizePreview(mockContext(cookies), target, "test-only-secret"), /session cookie/);
  }
});

test("preview authorization reports failed authentication without exposing the key", async () => {
  await assert.rejects(authorizePreview(mockContext([], 401), target, "test-only-secret"), /HTTP 401/);
});

test("preview requests preserve successful responses", async () => {
  const response = { status: 200 };
  assert.equal(await previewRequest(async () => response, "test-only-secret"), response);
});

test("preview errors never expose the automation credential in their message or stack", async () => {
  const secret = "test-only-secret";
  for (const failure of [new Error(`fetch failed ${secret} twice ${secret}`), `fetch failed ${secret}`]) {
    await assert.rejects(previewRequest(async () => { throw failure; }, secret), error => {
      assert.match(error.message, /fetch failed/);
      assert.match(error.message, /\[redacted\]/);
      assert.equal(error.message.includes(secret), false);
      assert.equal(error.stack.includes(secret), false);
      assert.equal(error.cause, undefined);
      return true;
    });
  }
});
