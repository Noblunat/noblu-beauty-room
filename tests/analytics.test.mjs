import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";

const root = fileURLToPath(new URL("../", import.meta.url));

function harness({ consent = { analytics: true, marketing: false }, ok = true } = {}) {
  const events = [];
  const effects = [];
  const listeners = new Map();
  const states = [];
  const window = {
    location: new URL("https://noblu.pl/manicure-krakow?email=private@example.com"),
    localStorage: { getItem: () => consent ? JSON.stringify({ necessary: true, external: false, ...consent }) : null },
    gtag: (...args) => events.push(args),
    addEventListener: (name, fn) => listeners.set(name, fn),
    removeEventListener: (name) => listeners.delete(name),
  };
  const react = {
    useRef: (current) => ({ current }),
    useMemo: (fn) => fn(),
    useEffect: (fn) => effects.push(fn),
    useState: (initial) => [initial, (value) => states.push(value)],
  };
  const jsx = (type, props) => ({ type, props });
  const cache = new Map();
  function load(relative) {
    const filename = path.resolve(root, relative);
    if (cache.has(filename)) return cache.get(filename);
    const testModule = { exports: {} };
    cache.set(filename, testModule.exports);
    const compiled = ts.transpileModule(readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
    }).outputText;
    vm.runInNewContext(compiled, {
      module: testModule, exports: testModule.exports, window, URL, URLSearchParams,
      document: {
        addEventListener: (name, fn) => listeners.set(name, fn),
        removeEventListener: (name) => listeners.delete(name),
        getElementById: () => null,
        createElement: () => ({}),
        head: { appendChild() {} },
      },
      fetch: async () => ({ ok, status: ok ? 200 : 400, json: async () => ok ? { success: true } : { error: "Invalid request" } }),
      require: (name) => {
        if (name === "react") return react;
        if (name === "react/jsx-runtime") return { jsx, jsxs: jsx };
        if (name === "next/navigation") return { usePathname: () => window.location.pathname };
        if (name === "next/image" || name === "next/link" || name.includes("BreadcrumbJsonLd")) return { default: () => null };
        if (name.startsWith(".")) return load(path.relative(root, path.resolve(path.dirname(filename), name + ".ts")));
        throw new Error(`Unexpected dependency: ${name}`);
      },
    }, { filename });
    return testModule.exports;
  }
  return { load, events, effects, listeners, window, states };
}

function findElement(node, type) {
  if (!node || typeof node !== "object") return undefined;
  if (node.type === type) return node;
  for (const child of [node.props?.children].flat(Infinity)) {
    const found = findElement(child, type);
    if (found) return found;
  }
}

test("booking links map services and ignore unrelated or spoofed destinations", () => {
  const { bookingClickDetails } = harness().load("app/lib/analytics.ts");
  const source = "https://noblu.pl/pedicure-krakow?email=private@example.com";
  assert.equal(bookingClickDetails("/rezerwacja?usluga=manicure", source).service_name, "Manicure");
  assert.equal(bookingClickDetails("/rezerwacja", source).service_name, "Pedicure");
  assert.equal(bookingClickDetails("/rezerwacja", source).source_page, "/pedicure-krakow");
  assert.equal(bookingClickDetails("https://booksy.com/widget/index.html?id=105150", source).booking_channel, "booksy");
  assert.equal(bookingClickDetails("/cennik", source), null);
  assert.equal(bookingClickDetails("https://booksy.com.example.org/", source), null);
  assert.equal(bookingClickDetails("https://example.org/rezerwacja", source), null);
});

test("no GA4 events without analytics consent, including marketing-only consent", () => {
  for (const consent of [null, { analytics: false, marketing: false }, { analytics: false, marketing: true }]) {
    const h = harness({ consent });
    const { trackAnalyticsEvent } = h.load("app/lib/analytics.ts");
    for (const name of ["view_service", "click_booking", "booking_start", "booking_complete"]) {
      assert.equal(trackAnalyticsEvent(name, { service_name: "Manicure" }), false);
    }
    assert.equal(h.events.length, 0);
  }
});

test("analytics-only consent sends to GA4 with clean URL, without form fields", () => {
  const h = harness();
  const { trackAnalyticsEvent } = h.load("app/lib/analytics.ts");
  assert.equal(trackAnalyticsEvent("view_service", { service_name: "Manicure" }), true);
  const payload = h.events[0][2];
  assert.equal(payload.send_to, "G-BD9VRN0W6Q");
  assert.equal(payload.page_location, "https://noblu.pl/manicure-krakow");
  assert.equal(JSON.stringify(h.events).includes("private@example.com"), false);
  assert.equal(h.events.some((event) => event[1] === "conversion"), false);
});

test("storage or tag failures cannot break the user action", () => {
  const h = harness();
  const { trackAnalyticsEvent } = h.load("app/lib/analytics.ts");
  h.window.gtag = () => { throw new Error("Tag unavailable"); };
  assert.equal(trackAnalyticsEvent("booking_complete", { service_name: "Manicure" }), false);
  h.window.localStorage.getItem = () => { throw new Error("Storage unavailable"); };
  assert.equal(trackAnalyticsEvent("booking_start", { service_name: "Manicure" }), false);
});

test("service views emit once despite repeated consent notifications and effect setup", () => {
  const h = harness();
  h.load("app/components/ConversionEvents.tsx").default();
  const cleanup = h.effects[0]();
  h.listeners.get("noblu-cookie-consent-change")();
  cleanup();
  h.effects[0]();
  assert.equal(h.events.filter((event) => event[1] === "view_service").length, 1);
});

test("Google tag queues commands in the documented Arguments format", () => {
  const h = harness();
  delete h.window.gtag;
  h.load("app/components/GoogleTag.tsx").default();
  h.effects[0]();
  assert.equal(Object.prototype.toString.call(h.window.dataLayer[0]), "[object Arguments]");
  assert.equal(h.window.dataLayer[0][0], "consent");
  assert.equal(h.window.dataLayer[0][2].analytics_storage, "granted");
  assert.equal(h.window.dataLayer[0][2].ad_storage, "denied");
  assert.ok(h.window.dataLayer.some((command) => command[0] === "config" && command[1] === "G-BD9VRN0W6Q"));
});

for (const ok of [false, true]) {
  test(`reservation ${ok ? "success" : "failure"} emits completion only on success; start is deduplicated`, async () => {
    const h = harness({ ok });
    const tree = h.load("app/rezerwacja/ReservationClient.tsx").default({ initialService: "Manicure" });
    const form = findElement(tree, "form");
    assert.ok(form);
    await form.props.onSubmit({ preventDefault() {} });
    await form.props.onSubmit({ preventDefault() {} });
    assert.equal(h.events.filter((event) => event[1] === "booking_start").length, 1);
    assert.equal(h.events.filter((event) => event[1] === "booking_complete").length, ok ? 2 : 0);
    assert.ok(h.states.includes(ok ? "success" : "error"));
    assert.equal(h.events.some((event) => event[1] === "conversion"), false);
  });
}
