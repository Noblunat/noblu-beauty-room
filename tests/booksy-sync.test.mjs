import assert from "node:assert/strict";
import test from "node:test";
import { loadDataModule } from "./helpers/load-data.mjs";
import { renderPage, nodes } from "./helpers/render-page.mjs";

test("Julia's newly available options keep their own price, duration and source identity", () => {
  const { findBookingService } = loadDataModule("../app/lib/bookingServices", import.meta.url);
  for (const [id, price, duration, sourceId] of [
    ["usuniecie-hybrydy-manicure-julia", 100, 70, 23230160],
    ["naprawa-paznokcia-julia", 20, 30, 23230171],
    ["pedicure-paznokcie-bez-hybrydy-julia", 80, 60, 23230201],
  ]) {
    const option = findBookingService(id);
    assert.ok(option, id);
    assert.equal(option.staffId, "julia");
    assert.equal(option.pricePLN, price);
    assert.equal(option.durationMinutes, duration);
    assert.equal(option.booksyVariantId, sourceId);
  }
  assert.equal(findBookingService("hybryda").id, "hybryda-natalia");
});

test("both service pages offer the owner's existing Booksy link without losing inquiry choices", () => {
  const { business } = loadDataModule("../app/lib/business", import.meta.url);
  for (const route of ["manicure-krakow", "pedicure-krakow"]) {
    const links = nodes(renderPage(new URL(`../app/${route}/page.tsx`, import.meta.url))).filter(n => n.type === "a");
    assert.equal(links.filter(n => n.props.href === business.links.booksyBooking).length, 2, route);
    assert.ok(links.some(n => n.props.href?.startsWith("/rezerwacja?usluga=")), route);
  }
});
