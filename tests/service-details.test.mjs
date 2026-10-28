import { loadDataModule } from "./helpers/load-data.mjs";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const root = new URL("../", import.meta.url);
function load(relative) {
  if (relative.startsWith("app/lib/")) return loadDataModule("../" + relative.slice(0, -3), import.meta.url);
  const testModule = { exports: {} };
  vm.runInNewContext(ts.transpileModule(readFileSync(new URL(relative, root), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, {
    module: testModule, exports: testModule.exports,
    require(name) {
      if (name === "react/jsx-runtime") return { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) };
      if (/\/lib\//.test(name)) return loadDataModule(name, new URL(relative, root));
      return { default: () => null };
    },
  });
  return testModule.exports;
}
function nodes(node) {
  if (!node || typeof node !== "object") return [];
  if (typeof node.type === "function") return nodes(node.type(node.props));
  return [node, ...[node.props?.children].flat(Infinity).flatMap(nodes)];
}
function text(node) {
  if (typeof node === "string") return node;
  return node && typeof node === "object" ? [node.props?.children].flat(Infinity).map(text).join(" ") : "";
}

test("every price-list row exposes a duration or an explicit unconfirmed add-on time", () => {
  const rows = nodes(load("app/cennik/page.tsx").default()).filter(n => n.props?.className?.includes("grid-cols-[1fr_auto]"));
  assert.equal(rows.length, 39);
  for (const row of rows) assert.match(text(row), /Czas:/, text(row));
});

test("price-list duration follows the reservation catalog for every bookable service", () => {
  const rows = nodes(load("app/cennik/page.tsx").default()).filter(n => n.props?.className?.includes("grid-cols-[1fr_auto]"));
  for (const service of load("app/lib/bookingServices.ts").serviceGroups.flatMap(g => g.services)) {
    const name = service.name === "Stylizacja hybrydowa więcej niż 1 kolor" ? "Stylizacja hybrydowa - więcej niż 1 kolor" : service.name;
    const row = rows.find(r => r.props["data-booking-service"] === service.id);
    assert.ok(row, name);
    assert.ok(text(row).includes(service.duration), `${name}: ${service.duration}`);
  }
});

test("verified additional Booksy services have their actual durations", () => {
  const rows = nodes(load("app/cennik/page.tsx").default()).filter(n => n.props?.className?.includes("grid-cols-[1fr_auto]"));
  for (const [name, duration] of [
    ["Usunięcie hybrydy z manicure", "1h"],
    ["Żel na naturalnej płytce - paznokcie krótkie, max do opuszka", "1h 55min"],
    ["Usunięcie stylizacji żelowej z manicure", "1h 10min"],
    ["Usunięcie hybrydy z pedicure same paznokcie", "50min"],
    ["Usunięcie hybrydy z pełnym pedicure", "1h 15min"],
  ]) {
    const aliases = {"Usunięcie hybrydy z manicure": "Usunięcie stylizacji hybrydowej z manicure", "Żel na naturalnej płytce - paznokcie krótkie, max do opuszka": "Żel na naturalnej płytce - paznokcie przed opuszek", "Usunięcie hybrydy z pełnym pedicure": "Usunięcie hybrydy z pedicure SPA"};
    const service = load("app/lib/bookingServices.ts").findBookingService(aliases[name] ?? name);
    assert.ok(text(rows.find(r => r.props["data-booking-service"] === service.id)).includes(duration), name);
  }
});

test("lash section links to the correctly selected reservation service", () => {
  const source = readFileSync(new URL("app/cennik/page.tsx", root), "utf8");
  assert.match(source, /href: "\/rezerwacja\?usluga=rzesy-1-1-aplikacja", label: "Zapytaj o termin"/);
});

test("manicure copy answers practical questions without repeated acquisition and district lists", () => {
  const source = readFileSync(new URL("app/manicure-krakow/page.tsx", root), "utf8");
  assert.ok((source.match(/przyjmujemy nowe klientki/gi) ?? []).length <= 1);
  assert.ok((source.match(/Kurdwanowa/g) ?? []).length <= 1);
  for (const heading of ["Jak wygląda wizyta?", "Hybryda czy żel?", "Jak długo utrzymuje się hybryda?", "Jak dbać o stylizację po wizycie?"]) assert.ok(source.includes(heading), heading);
});

test("homepage uses a factual service heading and a separate Google review invitation", () => {
  const source = readFileSync(new URL("app/page.tsx", root), "utf8");
  assert.ok(source.includes("Nasze usługi"));
  assert.ok(!source.includes("Najbardziej pożądane zabiegi"));
  assert.ok(source.includes("Dodaj opinię w Google"));
  assert.ok(source.includes("businessRating"));
});
