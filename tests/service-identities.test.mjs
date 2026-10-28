import assert from "node:assert/strict";
import test from "node:test";
import { loadDataModule } from "./helpers/load-data.mjs";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const catalog = () => loadDataModule("../app/lib/bookingServices", import.meta.url);

test("stable identities resolve independently of display names and old campaign aliases", () => {
  const { findBookingService } = catalog();
  const manicure = findBookingService("manicure-natalia");
  assert.ok(manicure, "new stable service identity must resolve");
  assert.equal(manicure.id, "manicure-natalia");
  assert.equal(findBookingService("Manicure").id, manicure.id);
  assert.equal(findBookingService("manicure").id, manicure.id);
  assert.equal(findBookingService("pedicure").id, "pedicure-spa-bez-hybrydy-natalia");
  assert.equal(findBookingService("Pedicure kosmetyczny").name, "Pedicure SPA bez hybrydy");
  assert.equal(findBookingService("rzesy").id, "rzesy-1-1-aplikacja");
  assert.equal(findBookingService("nieznana-usluga"), undefined);
});

function alteredCatalog(services) {
  const file = new URL("../app/lib/serviceCatalog.ts", import.meta.url);
  const source = loadDataModule("../app/lib/booksyCatalog", import.meta.url);
  const m = { exports: {} };
  vm.runInNewContext(ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, {
    module: m, exports: m.exports,
    require: name => name === "./booksyCatalog" ? { ...source, booksyServices: services } : loadDataModule(name, file),
  });
  return m.exports;
}

test("reordering source services and employee variants does not change their identities or prices", () => {
  const source = loadDataModule("../app/lib/booksyCatalog", import.meta.url);
  const reversed = alteredCatalog([...source.booksyServices].reverse().map(service => ({ ...service, variants: [...service.variants].reverse() })));
  for (const variant of catalog().serviceGroups.flatMap(group => group.services)) {
    const actual = reversed.findVariantById(variant.id);
    assert.equal(actual.pricePLN, variant.pricePLN);
    assert.equal(actual.durationMinutes, variant.durationMinutes);
    assert.equal(actual.staffId, variant.staffId);
  }
});

test("historical names keep resolving when the current Booksy display name changes", () => {
  const source = loadDataModule("../app/lib/booksyCatalog", import.meta.url);
  const renamed = alteredCatalog(source.booksyServices.map(service => ({ ...service, name: `Nowa nazwa ${service.serviceId}` })));
  assert.equal(renamed.resolveVariant("Manicure")?.id, "manicure-natalia");
  assert.equal(renamed.resolveVariant("MODELKA hybryda na naturalnej płytce")?.id, "modelka-hybryda-julia");
});

test("every selectable variant has one unique identity, numeric price/time and explicit staff", () => {
  const { serviceGroups } = catalog();
  const variants = serviceGroups.flatMap(group => group.services);
  assert.equal(variants.length, 32);
  assert.equal(new Set(variants.map(variant => variant.id)).size, 32);
  for (const variant of variants) {
    assert.match(variant.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal(typeof variant.pricePLN, "number");
    assert.equal(typeof variant.durationMinutes, "number");
    assert.ok(variant.updatedAt);
  }
  const junior = variants.find(variant => variant.id === "hybryda-julia");
  assert.equal(junior.staffId, "julia");
  assert.equal(junior.pricePLN, 130);
  assert.equal(junior.durationMinutes, 120);
  assert.equal(junior.name, "Stylizacja hybrydowa");
});

test("price rows and form options use the same canonical service and employee label", () => {
  const { findBookingService } = catalog();
  const prices = loadDataModule("../app/lib/priceCatalog", import.meta.url);
  for (const row of [...prices.nailPrices, ...prices.pedicurePrices, ...prices.lashPrices]) {
    const service = findBookingService(row.bookingService);
    assert.equal(service.label, row.name + (row.staff ? ` — ${row.staff}` : ""), row.bookingService);
  }
  const decorations = prices.addonPrices.filter(row => row.name.startsWith("French"));
  assert.equal(decorations.length, 2);
  for (const row of decorations) assert.equal(row.pricePLN, 20, row.name);
});
