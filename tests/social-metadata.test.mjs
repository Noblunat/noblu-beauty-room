import { loadDataModule } from "./helpers/load-data.mjs";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";
import test from "node:test";
import sharp from "sharp";
import ts from "typescript";

function metadataFor(route) {
  const filename = route === "rezerwacja" ? "layout.tsx" : "page.tsx";
  const m = { exports: {} };
  vm.runInNewContext(ts.transpileModule(readFileSync(new URL(`../app/${route}/${filename}`, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, {
    module: m, exports: m.exports,
    require: name => /\/lib\//.test(name) ? loadDataModule(name, new URL(`../app/${route}/${filename}`, import.meta.url)) : ({ default: () => null }),
  });
  return m.exports.metadata;
}

for (const route of ["manicure-krakow", "pedicure-krakow", "stylizacja-rzes-krakow", "przedluzanie-rzes-krakow", "cennik", "polityka-prywatnosci", "rezerwacja"]) {
  test(`${route} explicitly owns its Twitter title, description and image`, () => {
    const metadata = metadataFor(route);
    assert.equal(metadata.twitter?.card, "summary_large_image");
    assert.equal(metadata.twitter.title, metadata.openGraph.title);
    assert.equal(metadata.twitter.description, metadata.openGraph.description);
    assert.equal(metadata.openGraph.url, `https://noblu.pl/${route}`);
    const ogImage = metadata.openGraph.images[0];
    const twitterImage = metadata.twitter.images[0];
    const ogUrl = typeof ogImage === "string" ? ogImage : ogImage.url;
    assert.equal(typeof twitterImage === "string" ? twitterImage : twitterImage.url, ogUrl);
    const url = new URL(ogUrl);
    assert.equal(url.origin, "https://noblu.pl");
    assert.ok(existsSync(new URL(`../public${url.pathname}`, import.meta.url)), ogUrl);
  });
}

test("price-list social preview uses a real 1200 by 630 image, not the portrait photo", async () => {
  const image = metadataFor("cennik").openGraph.images[0];
  assert.equal(image.width, 1200);
  assert.equal(image.height, 630);
  const filename = path.resolve("public", `.${new URL(image.url).pathname}`);
  const actual = await sharp(filename).metadata();
  assert.equal(actual.width, image.width);
  assert.equal(actual.height, image.height);
});
