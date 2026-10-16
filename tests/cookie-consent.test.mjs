import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";

function storageHarness(value = null, blocked = false, writeBlocked = blocked) {
  const events = [];
  const listeners = new Map();
  const storage = {
    getItem() { if (blocked) throw new Error("Blocked"); return value; },
    setItem(key, next) { if (writeBlocked) throw new Error("Blocked"); value = next; },
  };
  const testModule = { exports: {} };
  const source = readFileSync(new URL("../app/lib/cookieConsent.ts", import.meta.url), "utf8");
  vm.runInNewContext(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText, {
    module: testModule, exports: testModule.exports,
    CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } },
    window: {
      localStorage: storage,
      addEventListener: (name, handler) => listeners.set(name, handler),
      removeEventListener: (name) => listeners.delete(name),
      dispatchEvent: (event) => events.push(event),
    },
  });
  return {
    ...testModule.exports, events, listeners,
    storageChange(next, key = "noblu-cookie-consent") {
      value = next;
      listeners.get("storage")?.({ key, storageArea: storage });
    },
  };
}

test("new visitors and invalid stored values have no consent", () => {
  for (const value of [null, "", "null", "{}", "invalid", '{"necessary":true}']) {
    assert.equal(storageHarness(value).readCookieConsent(), null);
  }
});

test("saving and reopening preserves the exact optional choices", () => {
  const h = storageHarness();
  const choice = { necessary: true, analytics: true, marketing: false, external: false };
  h.saveCookieConsent(choice);
  assert.equal(JSON.stringify(h.readCookieConsent()), JSON.stringify(choice));
  assert.equal(h.events[0].type, h.COOKIE_CONSENT_CHANGE_EVENT);
});

test("blocked browser storage defaults to no consent and supports an in-page choice", () => {
  const h = storageHarness(null, true);
  assert.equal(h.readCookieConsent(), null);
  const choice = { necessary: true, analytics: false, marketing: false, external: false };
  h.saveCookieConsent(choice);
  assert.equal(h.readCookieConsent(), choice);
  assert.equal(h.events.length, 1);
});

test("revoking consent overrides stale stored permissions when writes fail", () => {
  const h = storageHarness(JSON.stringify({
    necessary: true, analytics: true, marketing: true, external: true,
  }), false, true);
  const choice = { necessary: true, analytics: false, marketing: false, external: false };
  h.saveCookieConsent(choice);
  assert.equal(h.readCookieConsent(), choice);
});

test("another tab can revoke consent, clear storage and unsubscribe", () => {
  const h = storageHarness(JSON.stringify({
    necessary: true, analytics: true, marketing: true, external: true,
  }));
  const updates = [];
  const stop = h.subscribeToCookieConsent(() => updates.push(h.readCookieConsent()));
  h.storageChange(JSON.stringify({
    necessary: true, analytics: false, marketing: false, external: false,
  }));
  assert.equal(updates[0].analytics, false);
  assert.equal(updates[0].marketing, false);
  h.storageChange(null, null);
  assert.equal(updates[1], null);
  h.storageChange("unrelated", "other-key");
  assert.equal(updates.length, 2);
  stop();
  assert.equal(h.listeners.size, 0);
});

test("cookie preferences control supports a short label and only opens the panel", () => {
  const h = storageHarness();
  const m = { exports: {} };
  const jsx = (type, props) => ({ type, props });
  vm.runInNewContext(ts.transpileModule(readFileSync(new URL("../app/components/CookiePreferencesButton.tsx", import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, {
    module: m, exports: m.exports, Event,
    window: { dispatchEvent: event => h.events.push(event) },
    require: name => {
      if (name === "react/jsx-runtime") return { jsx, jsxs: jsx };
      if (name === "../lib/cookieConsent") return h;
      throw new Error(`Unexpected dependency ${name}`);
    },
  });
  const control = m.exports.default({ label: "Ustawienia cookies" });
  assert.equal(control.type, "button");
  assert.equal(control.props.type, "button");
  assert.equal(control.props.children, "Ustawienia cookies");
  control.props.onClick();
  assert.equal(h.events[0].type, h.COOKIE_CONSENT_OPEN_EVENT);
  assert.equal(h.readCookieConsent(), null, "opening preferences must not grant consent");
  assert.equal(m.exports.default({}).props.children, "Edytuj preferencje plików cookie");
});

test("accept and reject are equally prominent single-click choices on the first layer", () => {
  const h = storageHarness();
  const m = { exports: {} };
  const jsx = (type, props) => ({ type, props });
  vm.runInNewContext(ts.transpileModule(readFileSync(new URL("../app/components/CookieBanner.tsx", import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, {
    module: m, exports: m.exports,
    require: name => {
      if (name === "react/jsx-runtime") return { jsx, jsxs: jsx };
      if (name === "react") return { useState: initial => [initial, () => {}], useEffect() {}, useSyncExternalStore: () => true };
      if (name === "../lib/cookieConsent") return h;
      if (name === "next/link") return { default: "a" };
      throw new Error(`Unexpected dependency ${name}`);
    },
  });
  function nodes(node) {
    if (!node || typeof node !== "object") return [];
    return [node, ...[node.props?.children].flat(Infinity).flatMap(nodes)];
  }
  const buttons = nodes(m.exports.default()).filter(node => node.type === "button");
  const accept = buttons.find(node => node.props.children === "Akceptuję wszystkie");
  const reject = buttons.find(node => node.props.children === "Odrzucam opcjonalne");
  assert.ok(accept && reject, "both choices are available without opening settings");
  assert.equal(accept.props.className, reject.props.className, "same visual treatment and size");
  accept.props.onClick();
  assert.equal(h.readCookieConsent().analytics, true);
  reject.props.onClick();
  assert.equal(JSON.stringify(h.readCookieConsent()), JSON.stringify({ necessary: true, analytics: false, marketing: false, external: false }));
});
