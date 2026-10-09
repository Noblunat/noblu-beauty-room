import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
function load(file, dependencies = {}) {
  const testModule = { exports: {} };
  vm.runInNewContext(ts.transpileModule(
    readFileSync(new URL(file, import.meta.url), "utf8"),
    { compilerOptions: { module: ts.ModuleKind.CommonJS } }
  ).outputText, {
    module: testModule, exports: testModule.exports, Response, process: { env: {} },
    require: name => {
      if (name === "libphonenumber-js/min") {
        const library = require(name);
        return { parsePhoneNumberFromString: (value, options) =>
          library.parsePhoneNumberFromString(value, { ...options }) };
      }
      return dependencies[name] ?? require(name);
    },
  });
  return testModule.exports;
}
const phone = load("../app/lib/phone.ts");

test("accepts domestic, international and formatted phone numbers", () => {
  for (const [input, expected] of [
    ["662 989 534", "+48662989534"],
    ["+48 (662) 989-534", "+48662989534"],
    ["0048 662989534", "+48662989534"],
    ["+44 20 7946 0958", "+442079460958"],
    ["+1 (213) 373-4253", "+12133734253"],
    ["+49 30 901820", "+4930901820"],
  ]) assert.equal(phone.normalizePhoneNumber(input), expected);
});

test("rejects text, embedded numbers, invalid lengths and non-string inputs", () => {
  for (const input of ["abc", "tel: +48662989534", "", "123", "++48662989534",
    "+999123456789", "12345678901234567890", null, 662989534]) {
    assert.equal(phone.normalizePhoneNumber(input), null, String(input));
  }
});

test("API rejects invalid telephone before rate limiting or email delivery", async () => {
  const api = load("../app/api/rezerwacja/route.ts", {
    "../../lib/phone": phone,
    "../../lib/bookingRateLimit": { checkBookingRateLimit() { throw new Error("Must not reach delivery"); } },
  });
  const response = await api.POST({ json: async () => ({
    name: "Test", telephone: "abc", service: "Manicure", date: "2099-01-01",
  }) });
  assert.equal(response.status, 400);
  assert.equal((await response.json()).error, phone.phoneErrorMessage);
  assert.equal((await api.POST({ json: async () => null })).status, 400);
});
