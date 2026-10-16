import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

test("sitemap lists canonical pages without unsupported modification dates", () => {
  const testModule = { exports: {} };
  const source = ts.transpileModule(readFileSync(new URL("../app/sitemap.ts", import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  vm.runInNewContext(source, { module: testModule, exports: testModule.exports });
  const entries = testModule.exports.default();
  assert.equal(entries.length, 8);
  assert.equal(new Set(entries.map((entry) => entry.url)).size, 8);
  assert.ok(entries.some((entry) => entry.url === "https://noblu.pl/polityka-prywatnosci"));
  assert.equal(entries.some((entry) => entry.url.includes("stylizacja-hybrydowa")), false);
  assert.ok(entries.every((entry) => !("lastModified" in entry)), "omit lastmod unless backed by reliable content revision dates");
});
