import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

function literalRows(filename, variable) {
  const source = ts.createSourceFile(filename, readFileSync(new URL(`../${filename}`, import.meta.url), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let rows;
  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.name.getText(source) === variable && ts.isArrayLiteralExpression(node.initializer)) {
      rows = node.initializer.elements.map(item => Object.fromEntries(item.properties
        .filter(property => ts.isPropertyAssignment(property) && ["name", "price", "href"].includes(property.name.getText(source)) && ts.isStringLiteral(property.initializer))
        .map(property => [property.name.getText(source), property.initializer.text])));
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  assert.ok(rows, `${filename}: ${variable}`);
  return rows;
}

test("all public pedicure price rows match the Booksy offer checked on 2026-10-18", () => {
  assert.deepEqual(literalRows("app/cennik/page.tsx", "pedicurePrices"), [
    { name: "Pedicure same paznokcie", price: "100 zł" },
    { name: "Pedicure same paznokcie z hybrydą", price: "160 zł" },
    { name: "Pedicure kosmetyczny", price: "180 zł" },
    { name: "Pedicure kosmetyczny z hybrydą", price: "200 zł" },
    { name: "Usunięcie hybrydy z pedicure same paznokcie", price: "120 zł" },
    { name: "Usunięcie hybrydy z pełnym pedicure", price: "190 zł" },
  ]);
});

test("homepage uses the verified starting pedicure price", () => {
  const highlight = literalRows("app/page.tsx", "priceHighlights").find(item => item.href === "/pedicure-krakow");
  assert.equal(highlight.price, "od 100 zł");
});

test("verified manicure services and add-ons retain their Booksy prices", () => {
  const rows = literalRows("app/cennik/page.tsx", "nailPrices");
  for (const [name, price] of [
    ["Manicure", "100 zł"], ["Stylizacja hybrydowa", "160 zł"],
    ["Stylizacja hybrydowa - więcej niż 1 kolor", "170 zł"],
    ["Usunięcie hybrydy z manicure", "120 zł"],
    ["Żel na naturalnej płytce - paznokcie krótkie, max do opuszka", "180 zł"],
    ["Żel na naturalnej płytce", "190 zł"], ["Przedłużenie żelowe", "220 zł"],
    ["Usunięcie stylizacji żelowej z manicure", "140 zł"],
    ["Zdobienia", "od 10 zł"], ["Pyłek", "5 zł"], ["French / ombre / babyboomer", "20 zł"],
    ["Usunięcie stylizacji z innego salonu do uzupełnienia żelowego", "0 zł"],
    ["Naprawa jednego paznokcia", "30 zł"],
  ]) assert.equal(rows.find(row => row.name === name)?.price, price, name);
});

test("pedicure copy, FAQ and schema do not retain the old 110 PLN price", () => {
  for (const filename of ["app/pedicure-krakow/page.tsx", "app/cennik/page.tsx"]) {
    const source = readFileSync(new URL(`../${filename}`, import.meta.url), "utf8");
    assert.doesNotMatch(source, /110/);
  }
});

test("gel refill has the single 190 PLN Booksy price approved by the owner", () => {
  const rows = literalRows("app/cennik/page.tsx", "nailPrices").filter(row => row.name.startsWith("Uzupełnienie żelowe"));
  assert.deepEqual(rows, [{ name: "Uzupełnienie żelowe", price: "190 zł" }]);
});
