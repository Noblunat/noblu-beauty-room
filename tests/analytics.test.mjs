import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";
import { createRequire } from "node:module";
import { randomUUID } from "node:crypto";

const nodeRequire = createRequire(import.meta.url);

const root = fileURLToPath(new URL("../", import.meta.url));

const storedConsent = (choice) => JSON.stringify({
  necessary: true, external: false, version: 1,
  decidedAt: "2026-10-18T10:00:00.000Z", ...choice,
});

function harness({ consent = { analytics: true, marketing: false }, ok = true, status, fetchFailure, jsonFailure, body, fetchImpl } = {}) {
  const events = [];
  const effects = [];
  const listeners = new Map();
  const states = [];
  const scripts = [];
  const stateValues = [];
  const requests = [];
  let stateIndex = 0;
  let refIndex = 0;
  const refs = [];
  const window = {
    location: new URL("https://noblu.pl/manicure-krakow?email=private@example.com"),
    localStorage: { getItem: () => consent ? storedConsent(consent) : null },
    gtag: (...args) => events.push(args),
    addEventListener: (name, fn) => listeners.set(name, fn),
    removeEventListener: (name) => listeners.delete(name),
  };
  const react = {
    useRef: (current) => {
      const index = refIndex++;
      return refs[index] ??= { current };
    },
    useMemo: (fn) => fn(),
    useEffect: (fn) => effects.push(fn),
    useState: (initial) => {
      const index = stateIndex++;
      if (!(index in stateValues)) stateValues[index] = index === 2 ? "+48 662 989 534" : initial;
      return [stateValues[index], (value) => { stateValues[index] = value; states.push(value); }];
    },
  };
  const jsx = (type, props) => ({ type, props });
  const cache = new Map();
  class Element {
    constructor(link) { this.link = link; }
    closest() { return this.link; }
  }
  function load(relative) {
    const filename = path.resolve(root, relative);
    if (cache.has(filename)) return cache.get(filename);
    const testModule = { exports: {} };
    cache.set(filename, testModule.exports);
    const compiled = ts.transpileModule(readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
    }).outputText;
    vm.runInNewContext(compiled, {
      module: testModule, exports: testModule.exports, window, URL, URLSearchParams, Element, AbortSignal,
      crypto: { randomUUID },
      document: {
        addEventListener: (name, fn) => listeners.set(name, fn),
        removeEventListener: (name) => listeners.delete(name),
        referrer: "https://example.org/source?email=private@example.com",
        getElementById: (id) => scripts.find((script) => script.id === id) ?? null,
        createElement: () => ({}),
        head: { appendChild(script) { scripts.push(script); } },
      },
      fetch: async (url, options) => {
        requests.push({ url, options });
        if (fetchImpl) return fetchImpl(url, options);
        if (fetchFailure) throw new Error("Technical network error");
        return { ok, status: status ?? (ok ? 200 : 400), json: async () => {
          if (jsonFailure) throw new SyntaxError("Unexpected token <");
          return body ?? (ok ? { ok: true } : { error: "Invalid request" });
        } };
      },
      require: (name) => {
        if (name === "react") return react;
        if (name === "libphonenumber-js/min") {
          const library = nodeRequire(name);
          return { parsePhoneNumberFromString: (value, options) =>
            library.parsePhoneNumberFromString(value, { ...options }) };
        }
        if (name === "react/jsx-runtime") return { jsx, jsxs: jsx };
        if (name === "next/navigation") return { usePathname: () => window.location.pathname };
        if (name === "next/image" || name === "next/link" || name.includes("BreadcrumbJsonLd")) return { default: () => null };
        if (name.startsWith(".")) return load(path.relative(root, path.resolve(path.dirname(filename), name + ".ts")));
        throw new Error(`Unexpected dependency: ${name}`);
      },
    }, { filename });
    return testModule.exports;
  }
  return { load, events, effects, listeners, window, states, scripts, Element, requests,
    render(component, props) { stateIndex = 0; refIndex = 0; return component(props); } };
}

function findElement(node, type) {
  if (!node || typeof node !== "object") return undefined;
  if (node.type === type) return node;
  for (const child of [node.props?.children].flat(Infinity)) {
    const found = findElement(child, type);
    if (found) return found;
  }
}

function findWhere(node, predicate) {
  if (!node || typeof node !== "object") return undefined;
  if (predicate(node)) return node;
  for (const child of [node.props?.children].flat(Infinity)) {
    const found = findWhere(child, predicate);
    if (found) return found;
  }
}

function elementText(node) {
  if (typeof node === "string") return node;
  if (!node || typeof node !== "object") return "";
  return [node?.props?.children].flat(Infinity).map(elementText).join(" ");
}

for (const scenario of [
  { ok: false, status: 502 },
  { ok: false, status: 503 },
  { ok: false, status: 429, jsonFailure: true },
  { fetchFailure: true },
  { jsonFailure: true },
  { body: { unexpected: true } },
]) {
  test(`delivery failure offers contact fallback and preserves the inquiry: ${JSON.stringify(scenario)}`, async () => {
    const h = harness(scenario);
    const component = h.load("app/rezerwacja/ReservationClient.tsx").default;
    const props = { initialService: "Manicure" };
    let tree = h.render(component, props);
    findWhere(tree, node => node.type === "input" && node.props.autoComplete === "name").props.onChange({ target: { value: "Testowa klientka" } });
    findWhere(tree, node => node.type === "input" && node.props.type === "date").props.onChange({ target: { value: "2099-01-01" } });
    findElement(tree, "textarea").props.onChange({ target: { value: "Proszę o kontakt" } });
    tree = h.render(component, props);
    await findElement(tree, "form").props.onSubmit({ preventDefault() {} });
    tree = h.render(component, props);
    const alert = findWhere(tree, node => node.props?.role === "alert");
    assert.ok(alert, "failure has an accessible alert");
    assert.ok(findWhere(alert, node => node.props?.href === "tel:+48662989534"));
    assert.ok(findWhere(alert, node => node.props?.href?.startsWith("https://booksy.com/widget/")));
    assert.doesNotMatch(elementText(alert), /Technical network error|Unexpected token/);
    assert.equal(findWhere(tree, node => node.props?.autoComplete === "name").props.value, "Testowa klientka");
    assert.equal(findWhere(tree, node => node.props?.type === "tel").props.value, "+48 662 989 534");
    assert.equal(findWhere(tree, node => node.props?.type === "date").props.value, "2099-01-01");
    assert.equal(findElement(tree, "select").props.value, "Manicure");
    assert.equal(findElement(tree, "textarea").props.value, "Proszę o kontakt");
    assert.equal(findWhere(tree, node => node.props?.type === "submit").props.disabled, false);
    assert.ok(h.requests[0].options.signal, "client request has a timeout");
    assert.equal(h.events.some(event => event[1] === "booking_complete"), false);
  });
}

test("booking links map services and ignore unrelated or spoofed destinations", () => {
  const { bookingClickDetails } = harness().load("app/lib/analytics.ts");
  const source = "https://noblu.pl/pedicure-krakow?email=private@example.com";
  assert.equal(bookingClickDetails("/rezerwacja?usluga=manicure", source).service_name, "Manicure");
  assert.equal(bookingClickDetails("/rezerwacja", source).service_name, "Pedicure");
  assert.equal(bookingClickDetails("/rezerwacja", source).source_page, "/pedicure-krakow");
  assert.equal(bookingClickDetails("https://booksy.com/widget/index.html?id=105150", source).booking_channel, "booksy");
  assert.equal(bookingClickDetails("https://noblubeautyroom.booksy.com/", source).booking_channel, "booksy");
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

for (const analytics of [false, true]) {
  test(`form and Booksy use separate Ads actions, including analytics=${analytics}`, async () => {
    const h = harness({ consent: { analytics, marketing: true } });
    h.load("app/components/ConversionEvents.tsx").default();
    h.effects.forEach(effect => effect());
    h.listeners.get("click")({ target: new h.Element({
      href: "https://noblubeautyroom.booksy.com/", dataset: {},
    }) });
    const form = findElement(h.load("app/rezerwacja/ReservationClient.tsx").default({ initialService: "Manicure" }), "form");
    await form.props.onSubmit({ preventDefault() {} });
    await form.props.onSubmit({ preventDefault() {} });
    const conversions = h.events.filter(event => event[1] === "conversion");
    assert.equal(conversions.length, 2);
    assert.equal(conversions[0][2].send_to, "AW-10795260361/w2THCKCZ0LYcEMmzypso");
    assert.equal(conversions[1][2].send_to, "AW-10795260361/ZeoSCKvShaEdEMmzypso");
    assert.equal(conversions[1][2].transaction_id, JSON.parse(h.requests[0].options.body).requestId);
    assert.equal(conversions[1][2].value, undefined, "an inquiry is not revenue");
    assert.equal(h.events.filter(event => event[1] === "generate_lead").length, analytics ? 1 : 0);
    const lead = h.events.find(event => event[1] === "generate_lead");
    if (lead) assert.equal(lead[2].value, undefined);
    assert.doesNotMatch(JSON.stringify(h.events), /private@example.com|662989534/);
  });
}

test("a rejected form never emits the new Ads lead action", async () => {
  const h = harness({ ok: false, consent: { analytics: true, marketing: true } });
  const form = findElement(h.load("app/rezerwacja/ReservationClient.tsx").default({ initialService: "Manicure" }), "form");
  await form.props.onSubmit({ preventDefault() {} });
  assert.equal(h.events.some(event => event[1] === "conversion" || event[1] === "generate_lead"), false);
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

test("Google Tag applies withdrawal from another tab and storage clearing", () => {
  const h = harness();
  h.window.gtag = undefined;
  h.load("app/components/GoogleTag.tsx").default();
  const cleanup = h.effects[0]();
  h.window.localStorage.getItem = () => storedConsent({
    necessary: true, analytics: false, marketing: false, external: false,
  });
  h.listeners.get("storage")({
    key: "noblu-cookie-consent", storageArea: h.window.localStorage,
  });
  let command = h.window.dataLayer.at(-1);
  assert.equal(command[0], "consent");
  assert.equal(command[1], "update");
  assert.equal(command[2].analytics_storage, "denied");
  assert.equal(command[2].ad_storage, "denied");
  h.window.localStorage.getItem = () => null;
  h.listeners.get("storage")({ key: null, storageArea: h.window.localStorage });
  command = h.window.dataLayer.at(-1);
  assert.equal(command[2].ad_personalization, "denied");
  cleanup();
  assert.equal(h.listeners.size, 0);
});

for (const metadata of [{ version: undefined }, { version: 0 }, { decidedAt: "invalid" }]) {
  test(`invalid consent metadata blocks Google loaders and events: ${JSON.stringify(metadata)}`, () => {
    const h = harness({ consent: { analytics: true, marketing: true, ...metadata } });
    h.window.gtag = undefined;
    h.load("app/components/GoogleTag.tsx").default();
    h.effects[0]();
    assert.equal(h.scripts.length, 0);
    assert.equal(h.window.gtag, undefined);
    const analytics = h.load("app/lib/analytics.ts");
    h.window.gtag = (...args) => h.events.push(args);
    assert.equal(analytics.trackAnalyticsEvent("booking_complete", { service_name: "Manicure" }), false);
    assert.equal(analytics.trackGoogleAdsConversion("AW-test/test"), false);
    assert.equal(h.events.length, 0);
  });
}

test("a version change in another tab withdraws Google permissions immediately", () => {
  const h = harness({ consent: { analytics: true, marketing: true } });
  h.window.gtag = undefined;
  h.load("app/components/GoogleTag.tsx").default();
  h.effects[0]();
  h.window.localStorage.getItem = () => storedConsent({
    necessary: true, analytics: true, marketing: true, external: true, version: 0,
  });
  h.listeners.get("storage")({ key: "noblu-cookie-consent", storageArea: h.window.localStorage });
  const command = h.window.dataLayer.at(-1);
  assert.equal(command[0], "consent");
  for (const value of Object.values(command[2])) assert.equal(value, "denied");
  assert.equal(h.window["ga-disable-G-BD9VRN0W6Q"], true);
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
    assert.equal(h.events.filter((event) => event[1] === "booking_complete").length, ok ? 1 : 0);
    assert.ok(h.states.includes(ok ? "success" : "error"));
    assert.equal(h.events.some((event) => event[1] === "conversion"), false);
  });
}

test("a successful inquiry clears input state and requires an explicit fresh inquiry", async () => {
  const h = harness();
  const component = h.load("app/rezerwacja/ReservationClient.tsx").default;
  const props = { initialService: "Manicure" };
  let tree = h.render(component, props);
  findWhere(tree, n => n.props?.autoComplete === "name").props.onChange({ target: { value: "Private name" } });
  findElement(tree, "textarea").props.onChange({ target: { value: "Private note" } });
  tree = h.render(component, props);
  const submit = findElement(tree, "form").props.onSubmit;
  await submit({ preventDefault() {} });
  await submit({ preventDefault() {} });
  assert.equal(h.requests.length, 1);
  tree = h.render(component, props);
  assert.equal(findElement(tree, "form"), undefined);
  assert.ok(findWhere(tree, n => n.props?.role === "status"));
  assert.doesNotMatch(elementText(tree), /Private name|Private note/);
  const restart = findWhere(tree, n => n.type === "button" && elementText(n) === "Wyślij kolejne zapytanie");
  assert.ok(restart);
  restart.props.onClick();
  tree = h.render(component, props);
  for (const predicate of [n => n.props?.autoComplete === "name", n => n.props?.type === "tel", n => n.props?.type === "date", n => n.type === "textarea", n => n.type === "select"]) {
    assert.equal(findWhere(tree, predicate).props.value, "");
  }
  findWhere(tree, n => n.props?.type === "tel").props.onChange({ target: { value: "+48 662 989 534", setCustomValidity() {} } });
  findElement(tree, "select").props.onChange({ target: { value: "Manicure" } });
  tree = h.render(component, props);
  await findElement(tree, "form").props.onSubmit({ preventDefault() {} });
  assert.notEqual(JSON.parse(h.requests[0].options.body).requestId, JSON.parse(h.requests[1].options.body).requestId);
  assert.equal(h.events.filter(e => e[1] === "booking_complete").length, 2);
});

test("rapid duplicate submits are guarded before React renders a disabled button", async () => {
  let resolve;
  const h = harness({ fetchImpl: () => new Promise(done => { resolve = done; }) });
  const component = h.load("app/rezerwacja/ReservationClient.tsx").default;
  const submit = findElement(h.render(component, { initialService: "Manicure" }), "form").props.onSubmit;
  const first = submit({ preventDefault() {} });
  const second = submit({ preventDefault() {} });
  assert.equal(h.requests.length, 1);
  resolve({ ok: true, json: async () => ({ ok: true }) });
  await Promise.all([first, second]);
  assert.equal(h.events.filter(e => e[1] === "booking_complete").length, 1);
});

test("an unchanged failed attempt keeps its UUID, edited data starts a new one", async () => {
  const h = harness({ ok: false, status: 502 });
  const component = h.load("app/rezerwacja/ReservationClient.tsx").default;
  const props = { initialService: "Manicure" };
  for (let i = 0; i < 2; i++) await findElement(h.render(component, props), "form").props.onSubmit({ preventDefault() {} });
  const ids = () => h.requests.map(r => JSON.parse(r.options.body).requestId);
  assert.match(ids()[0], /^[\da-f-]{36}$/);
  assert.equal(ids()[0], ids()[1]);
  const tree = h.render(component, props);
  findElement(tree, "textarea").props.onChange({ target: { value: "Changed inquiry" } });
  await findElement(h.render(component, props), "form").props.onSubmit({ preventDefault() {} });
  assert.notEqual(ids()[0], ids()[2]);
});

test("marketing-only consent never configures GA4 and disables its collection", () => {
  const h = harness({ consent: { analytics: false, marketing: true } });
  h.load("app/components/GoogleTag.tsx").default();
  h.effects[0]();
  assert.equal(h.events.some((event) => event[0] === "config" && event[1] === "G-BD9VRN0W6Q"), false);
  assert.equal(h.events.some((event) => event[0] === "config" && event[1] === "GT-TW5DT9Q4"), false);
  assert.equal(h.window["ga-disable-G-BD9VRN0W6Q"], true);
  assert.ok(h.events.some((event) => event[0] === "config" && event[1] === "AW-10795260361"));
});

test("no optional consent means no Google loader or config", () => {
  const h = harness({ consent: null });
  delete h.window.gtag;
  h.load("app/components/GoogleTag.tsx").default();
  h.effects[0]();
  assert.equal(h.scripts.length, 0);
  assert.equal(h.events.length, 0);
  assert.equal(h.window["ga-disable-G-BD9VRN0W6Q"], true);
});

test("analytics config has clean URLs and does not initialize advertising", () => {
  const h = harness();
  h.load("app/components/GoogleTag.tsx").default();
  h.effects[0]();
  const config = h.events.find((event) => event[0] === "config" && event[1] === "G-BD9VRN0W6Q");
  assert.equal(config[2]?.page_location, "https://noblu.pl/manicure-krakow");
  assert.equal(config[2]?.page_referrer, "https://example.org/source");
  assert.equal(JSON.stringify(h.events).includes("private@example.com"), false);
  assert.equal(h.events.some((event) => event[0] === "config" && event[1] === "AW-10795260361"), false);
  assert.equal(h.window["ga-disable-G-BD9VRN0W6Q"], false);
});

test("granting and revoking categories configures each destination once with a single loader", () => {
  const h = harness({ consent: { analytics: false, marketing: true } });
  h.load("app/components/GoogleTag.tsx").default();
  h.effects[0]();
  h.window.localStorage.getItem = () => storedConsent({ necessary: true, analytics: true, marketing: true, external: false });
  h.listeners.get("storage")({ key: "noblu-cookie-consent", storageArea: h.window.localStorage });
  assert.equal(h.window["ga-disable-G-BD9VRN0W6Q"], false);
  assert.equal(h.events.filter((event) => event[0] === "config" && event[1] === "G-BD9VRN0W6Q").length, 1);
  h.window.localStorage.getItem = () => null;
  h.listeners.get("storage")({ key: null, storageArea: h.window.localStorage });
  assert.equal(h.window["ga-disable-G-BD9VRN0W6Q"], true);
  assert.equal(h.scripts.length, 1);
  assert.equal(h.events.at(-1)[1], "update");
});

test("service view starts when analytics consent arrives from another tab", () => {
  const h = harness({ consent: null });
  h.load("app/components/ConversionEvents.tsx").default();
  h.effects[0]();
  assert.equal(typeof h.listeners.get("storage"), "function");
  h.window.localStorage.getItem = () => storedConsent({ necessary: true, analytics: true, marketing: false, external: false });
  h.listeners.get("storage")({ key: "noblu-cookie-consent", storageArea: h.window.localStorage });
  assert.equal(h.events.filter((event) => event[1] === "view_service").length, 1);
});

for (const failingEvent of ["generate_lead", "conversion"]) {
  test(`successful request stays successful if ${failingEvent} throws`, async () => {
    const h = harness({ consent: { analytics: true, marketing: true } });
    h.window.gtag = (...args) => {
      if (args[1] === failingEvent) throw new Error("Tag failed");
      h.events.push(args);
    };
    const tree = h.load("app/rezerwacja/ReservationClient.tsx").default({ initialService: "Manicure" });
    await findElement(tree, "form").props.onSubmit({ preventDefault() {} });
    assert.ok(h.states.includes("success"));
    assert.equal(h.states.includes("error"), false);
  });
}

test("failed Ads tag cannot block telephone navigation", () => {
  const h = harness({ consent: { analytics: true, marketing: true } });
  h.load("app/components/ConversionEvents.tsx").default();
  h.effects[1]();
  h.window.gtag = () => { throw new Error("Tag failed"); };
  let prevented = false;
  assert.doesNotThrow(() => h.listeners.get("click")({
    target: new h.Element({ href: "tel:+48662989534", target: "", dataset: {} }),
    preventDefault() { prevented = true; },
  }));
  assert.equal(prevented, false);
});
