import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";
import { loadDataModule } from "./helpers/load-data.mjs";

test("sitemap lists canonical pages with stable, documented revision dates", () => {
  const testModule = { exports: {} };
  const source = ts.transpileModule(readFileSync(new URL("../app/sitemap.ts", import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  vm.runInNewContext(source, { module: testModule, exports: testModule.exports,
    require: name => loadDataModule(name, new URL("../app/sitemap.ts", import.meta.url)),
  });
  const entries = testModule.exports.default();
  assert.equal(entries.length, 8);
  assert.equal(new Set(entries.map((entry) => entry.url)).size, 8);
  assert.ok(entries.some((entry) => entry.url === "https://noblu.pl/polityka-prywatnosci"));
  assert.equal(entries.some((entry) => entry.url.includes("stylizacja-hybrydowa")), false);
  const { contentRevisions } = loadDataModule("../app/lib/contentRevisions", import.meta.url);
  assert.deepEqual(entries, testModule.exports.default(), "building a sitemap again must not change its dates");
  for (const entry of entries) {
    const route = new URL(entry.url).pathname;
    assert.equal(entry.lastModified, contentRevisions[route].date);
    assert.match(entry.lastModified, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(contentRevisions[route].reason.length > 30, route);
  }
});

test("page revisions include the newest revision of all shared content they display", () => {
  const { contentSources, contentDependencies, contentRevisions } = loadDataModule("../app/lib/contentRevisions", import.meta.url);
  assert.equal(Object.keys(contentDependencies).length, 8);
  for (const [route, sources] of Object.entries(contentDependencies)) {
    for (const source of sources) assert.ok(contentRevisions[route].date >= contentSources[source], `${route}: ${source}`);
  }
});
