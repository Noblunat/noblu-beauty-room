import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const root = new URL("../", import.meta.url);
function load(file) {
  const m = { exports: {} };
  vm.runInNewContext(ts.transpileModule(readFileSync(new URL(file, root), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText, {
    module: m, exports: m.exports,
    require(name) { return load(path.posix.normalize(path.posix.join(path.posix.dirname(file), name + ".ts"))); },
  });
  return m.exports;
}

test("Booksy catalog keeps distinct employee prices and durations instead of advertising a single shared price", () => {
  const { booksyServices } = load("app/lib/booksyCatalog.ts");
  assert.equal(booksyServices.length, 21);
  assert.equal(booksyServices.reduce((count, s) => count + s.variants.length, 0), 28);
  const hybrid = booksyServices.find(s => s.name === "Stylizacja hybrydowa");
  assert.deepEqual(JSON.parse(JSON.stringify(hybrid.variants.map(v => [v.staff[0], v.pricePLN, v.durationMinutes]))), [
    ["Natalia", 160, 90], ["Julia", 130, 120],
  ]);
  const model = booksyServices.find(s => s.name.startsWith("MODELKA"));
  assert.equal(model.variants[0].pricePLN, 80);
  assert.equal(model.variants[0].durationMinutes, 150);
  assert.equal(model.variants[0].staff[0], "Julia");
});

test("existing campaign selections keep Natalia's service while Julia gets an explicit separate choice", () => {
  const { findBookingService } = load("app/lib/bookingServices.ts");
  assert.equal(findBookingService("Stylizacja hybrydowa").booksyVariantId, 6017028);
  assert.equal(findBookingService("Stylizacja hybrydowa").price, "160 zł");
  assert.equal(findBookingService("Stylizacja hybrydowa").staff, "Natalia");
  const junior = findBookingService("Stylizacja hybrydowa — Julia (stylistka junior)");
  assert.equal(junior.price, "130 zł");
  assert.equal(junior.duration, "2h");
  assert.equal(junior.booksyVariantId, 23177096);
  assert.equal(junior.staff, "Julia");
  assert.equal(findBookingService("Pedicure kosmetyczny z hybrydą").price, "200 zł");
});

test("price list includes each Booksy variant and keeps minimum add-on prices explicit", () => {
  const { nailPrices, pedicurePrices, addonPrices } = load("app/lib/priceCatalog.ts");
  assert.equal(nailPrices.length + pedicurePrices.length, 28);
  assert.equal(addonPrices.length, 7);
  assert.equal(addonPrices.find(x => x.name === "Zdobienie").price, "od 10 zł");
  assert.equal(addonPrices.find(x => x.name === "Zdobienie 3D").duration, "20min");
  assert.ok(addonPrices.find(x => x.name === "Usunięcie stylizacji z innego salonu").note.includes("wybranych"));
});
