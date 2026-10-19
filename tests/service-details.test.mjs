import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const root = new URL("../", import.meta.url);
function load(relative) {
  const testModule = { exports: {} };
  vm.runInNewContext(ts.transpileModule(readFileSync(new URL(relative, root), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, {
    module: testModule, exports: testModule.exports,
    require(name) {
      if (name === "react/jsx-runtime") return { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) };
      if (name.includes("bookingServices")) return load(path.posix.join(path.posix.dirname(relative), name + ".ts"));
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
  assert.equal(rows.length, 27);
  for (const row of rows) assert.match(text(row), /Czas:/, text(row));
});

test("french, ombre and babyboomer have no surcharge in rendered prices or the offer catalog", () => {
  const rendered = nodes(load("app/cennik/page.tsx").default());
  const row = rendered.find(n => n.props?.className?.includes("grid-cols-[1fr_auto]") && text(n).startsWith("French / ombre / babyboomer "));
  assert.equal(text(row.props.children[1]), "0 zł");
  const catalog = rendered.filter(n => n.type === "script" && n.props.type === "application/ld+json")
    .map(n => JSON.parse(n.props.dangerouslySetInnerHTML.__html)).find(schema => schema["@type"] === "OfferCatalog");
  const offer = catalog.itemListElement.flatMap(group => group.itemListElement).find(item => item.name === "French / ombre / babyboomer");
  assert.equal(offer.price, "0");
  assert.equal(offer.priceCurrency, "PLN");
});

test("price-list duration follows the reservation catalog for every bookable service", () => {
  const rows = nodes(load("app/cennik/page.tsx").default()).filter(n => n.props?.className?.includes("grid-cols-[1fr_auto]"));
  for (const service of load("app/lib/bookingServices.ts").serviceGroups.flatMap(g => g.services)) {
    const name = service.name === "Stylizacja hybrydowa więcej niż 1 kolor" ? "Stylizacja hybrydowa - więcej niż 1 kolor" : service.name;
    const row = rows.find(r => text(r.props.children[0].props.children[0]) === name);
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
  ]) assert.ok(text(rows.find(r => text(r).startsWith(name + " "))).includes(duration), name);
});

test("lash section links to the correctly selected reservation service", () => {
  const source = readFileSync(new URL("app/cennik/page.tsx", root), "utf8");
  assert.match(source, /href: "\/rezerwacja\?usluga=rzesy", label: "Zapytaj o termin"/);
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
  assert.ok(source.includes("★★★★★ 5,0 w Booksy"));
});
