import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { loadDataModule } from "./helpers/load-data.mjs";
import { renderPage, nodes, nodeText } from "./helpers/render-page.mjs";

test("each Booksy variant has the same price and employee on the visible price list and in structured offers", () => {
  const allNodes = nodes(renderPage(new URL("../app/cennik/page.tsx", import.meta.url)));
  const schema = JSON.parse(allNodes.find(n => n.type === "script").props.dangerouslySetInnerHTML.__html);
  const offers = schema.itemListElement.flatMap(group => group.itemListElement);
  const { nailPrices, pedicurePrices } = loadDataModule("../app/lib/priceCatalog", import.meta.url);
  for (const item of [...nailPrices, ...pedicurePrices]) {
    const row = allNodes.find(n => n.props?.["data-booking-service"] === item.bookingService);
    assert.ok(row, item.bookingService);
    const visible = nodeText(row);
    assert.ok(visible.includes(item.name), item.name);
    assert.ok(visible.includes(item.price), item.bookingService);
    assert.ok(visible.includes(item.staff), item.bookingService);
    const offer = offers.find(offer => offer.name === `${item.name} — ${item.staff}`);
    assert.equal(offer?.price, item.price.replace(/[^0-9]/g, ""), item.bookingService);
  }
  const decoration = offers.find(offer => offer.name === "Zdobienie");
  assert.equal(decoration.price, undefined, "a minimum price is not a fixed price");
  assert.equal(decoration.priceSpecification.minPrice, "10");
});

test("homepage uses the verified starting pedicure price", () => {
  const highlight = loadDataModule("../app/lib/homePricing", import.meta.url).priceHighlights.find(item => item.href === "/pedicure-krakow");
  assert.equal(highlight.price, "od 80 zł");
});

test("the model appointment is separate from regular hybrid manicure in the public price list", () => {
  const rows = nodes(renderPage(new URL("../app/cennik/page.tsx", import.meta.url)));
  const model = rows.find(n => n.props?.["data-booking-service"] === "modelka-hybryda-julia");
  assert.ok(nodeText(model).includes("80 zł"));
  assert.ok(nodeText(model).includes("2h 30min"));
  assert.ok(nodeText(model).includes("Osobna usługa modelkowa"));
});

test("pedicure copy, FAQ and schema do not retain the old 110 PLN price", () => {
  for (const filename of ["app/pedicure-krakow/page.tsx", "app/cennik/page.tsx"]) {
    const source = readFileSync(new URL(`../${filename}`, import.meta.url), "utf8");
    assert.doesNotMatch(source, /110/);
  }
});

test("gel refill has the single 190 PLN Booksy price approved by the owner", () => {
  const { nailPrices } = loadDataModule("../app/lib/priceCatalog", import.meta.url);
  const rows = nailPrices.filter(row => row.name === "Uzupełnienie żelowe");
  assert.equal(rows.length, 1);
  assert.equal(rows[0].price, "190 zł");
});
