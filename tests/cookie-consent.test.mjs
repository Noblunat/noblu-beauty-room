import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";

function storageHarness(value = null, blocked = false, writeBlocked = blocked) {
  const events = [];
  const testModule = { exports: {} };
  const source = readFileSync(new URL("../app/lib/cookieConsent.ts", import.meta.url), "utf8");
  vm.runInNewContext(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText, {
    module: testModule, exports: testModule.exports,
    CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } },
    window: {
      localStorage: {
        getItem() { if (blocked) throw new Error("Blocked"); return value; },
        setItem(key, next) { if (writeBlocked) throw new Error("Blocked"); value = next; },
      },
      dispatchEvent: (event) => events.push(event),
    },
  });
  return { ...testModule.exports, events };
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
