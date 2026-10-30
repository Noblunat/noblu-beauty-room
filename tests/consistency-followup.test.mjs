import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { renderPage, nodes, nodeText } from "./helpers/render-page.mjs";
import { loadDataModule } from "./helpers/load-data.mjs";

const root = new URL("../", import.meta.url);
for (const route of [
  "manicure-krakow",
  "pedicure-krakow",
  "stylizacja-rzes-krakow",
  "przedluzanie-rzes-krakow",
]) {
  test(
    route + ": visible content does not repeat acquisition and district lists",
    () => {
      const text = nodeText(
        renderPage(new URL(`app/${route}/page.tsx`, root)),
      ).replace(/\s+/g, " ");
      assert.ok(
        (text.match(/przyjmujemy(?: również)? nowe klientki/gi) || []).length <=
          1,
      );
      assert.ok(
        (text.match(/Ruczaj\w*/gi) || []).length <= 1,
        "one comprehensive location list is enough",
      );
    },
  );
}

test("review opening quotes are decorative, while the pause action remains available", () => {
  const reviews = nodes(
    renderPage(new URL("app/components/home/HomeReviews.tsx", root)),
  );
  const quotes = reviews.filter((node) => nodeText(node) === "“");
  assert.equal(quotes.length, 6);
  assert.ok(quotes.every((node) => node.props["aria-hidden"] === "true"));
  const gallery = readFileSync(
    new URL("app/components/home/HomeGallery.tsx", root),
    "utf8",
  );
  assert.match(gallery, /Zatrzymaj automatyczną zmianę zdjęć/);
  assert.match(gallery, /aria-pressed/);
});

test("lash methods share the catalog prices, durations and canonical selection links", () => {
  const file = new URL("app/components/LashMethods.tsx", root);
  assert.ok(
    existsSync(file),
    "both lash pages need the same catalog-derived method section",
  );
  const cards = nodes(renderPage(file)).filter(
    (node) => node.type === "article",
  );
  assert.equal(cards.length, 3);
  assert.match(nodeText(renderPage(file)), /czasy są orientacyjne/);
  const { findBookingServiceById } = loadDataModule(
    "../app/lib/bookingServices",
    import.meta.url,
  );
  for (const id of [
    "rzesy-1-1-aplikacja",
    "rzesy-2d-aplikacja",
    "rzesy-3d-aplikacja",
  ]) {
    const service = findBookingServiceById(id);
    const card = cards.find((node) =>
      nodes(node).some(
        (child) =>
          child.type === "a" && child.props.href === `/rezerwacja?usluga=${id}`,
      ),
    );
    assert.ok(card, id);
    assert.ok(nodeText(card).includes(service.price));
    assert.ok(nodeText(card).includes(service.duration));
  }
  for (const route of ["stylizacja-rzes-krakow", "przedluzanie-rzes-krakow"]) {
    const source = readFileSync(new URL(`app/${route}/page.tsx`, root), "utf8");
    assert.match(source, /<LashMethods\s*\/>/);
    assert.match(source, /<SalonHygiene\s*\/>/);
  }
});

test("every bookable catalog row links to its own stable variant, never an add-on", () => {
  const rows = nodes(renderPage(new URL("app/cennik/page.tsx", root))).filter(
    (node) => node.type === "li",
  );
  const { catalogVariants } = loadDataModule(
    "../app/lib/serviceCatalog",
    import.meta.url,
  );
  for (const variant of catalogVariants) {
    const row = rows.find(
      (node) => node.props["data-booking-service"] === variant.id,
    );
    assert.ok(row, variant.id);
    const links = nodes(row).filter((node) => node.type === "a");
    assert.equal(links.length, 1);
    assert.equal(links[0].props.href, `/rezerwacja?usluga=${variant.id}`);
  }
  for (const row of rows.filter(
    (node) => !node.props["data-booking-service"],
  )) {
    assert.equal(nodes(row).filter((node) => node.type === "a").length, 0);
  }
});
