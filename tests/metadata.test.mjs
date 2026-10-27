import { loadDataModule } from "./helpers/load-data.mjs";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const root = new URL("../", import.meta.url);
const pages = [
  "app/layout.tsx",
  "app/manicure-krakow/page.tsx",
  "app/pedicure-krakow/page.tsx",
  "app/przedluzanie-rzes-krakow/page.tsx",
  "app/stylizacja-rzes-krakow/page.tsx",
  "app/cennik/page.tsx",
  "app/rezerwacja/layout.tsx",
  "app/polityka-prywatnosci/page.tsx",
];

function metadata(file) {
  const testModule = { exports: {} };
  vm.runInNewContext(ts.transpileModule(readFileSync(new URL(file, root), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, {
    module: testModule, exports: testModule.exports, URL, process: { env: {} },
    require: name => /(?:bookingServices|booksyCatalog|priceCatalog|contentRevisions)$/.test(name) ? loadDataModule(name, new URL(file, root)) : ({ default: () => null }),
  });
  return testModule.exports.metadata;
}

test("homepage title is identical in document, Open Graph and Twitter metadata", () => {
  const home = metadata(pages[0]);
  assert.equal(home.openGraph.title, home.title);
  assert.equal(home.twitter.title, home.title);
});

test("each subpage has its own Twitter description matching Open Graph", () => {
  const descriptions = pages.map(file => {
    const page = metadata(file);
    assert.equal(page.twitter.description, page.openGraph.description, file);
    assert.equal(page.twitter.title, page.openGraph.title, file);
    assert.ok(page.twitter.description.length > 30, file);
    return page.twitter.description;
  });
  assert.equal(new Set(descriptions).size, pages.length);
});

test("public copy and structured data do not contain premium claims", () => {
  for (const folder of ["app/", "public/"]) {
    for (const file of readdirSync(new URL(folder, root), { recursive: true })) {
      if (!/\.(tsx?|json|txt|html)$/i.test(file)) continue;
      assert.doesNotMatch(readFileSync(new URL(folder + file.replaceAll("\\", "/"), root), "utf8"), /premium/i, file);
    }
  }
});
