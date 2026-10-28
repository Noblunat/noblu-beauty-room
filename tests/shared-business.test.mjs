import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { loadDataModule } from "./helpers/load-data.mjs";

test("one business configuration owns public contact, opening hours and review provenance", () => {
  assert.ok(existsSync(new URL("../app/lib/business.ts", import.meta.url)), "shared business configuration is missing");
  const { business } = loadDataModule("../app/lib/business", import.meta.url);
  assert.equal(business.email, "salon@noblu.pl");
  assert.equal(business.phone.e164, "+48662989534");
  assert.equal(business.hours.closes, "19:00");
  assert.equal(business.reviews.minimum, 240);
  assert.equal(business.reviews.source, "Booksy");
});

test("AI-readable public information is generated from the same business configuration", () => {
  const { business, businessAddress } = loadDataModule("../app/lib/business", import.meta.url);
  const { llmsText } = loadDataModule("../app/lib/llms", import.meta.url);
  for (const value of [business.email, business.phone.international, businessAddress, business.links.booksyBooking]) assert.ok(llmsText.includes(value), value);
});

test("live application modules no longer own duplicate contact values", () => {
  for (const file of ["app/layout.tsx", "app/page.tsx", "app/components/SiteFooter.tsx", "app/rezerwacja/ReservationClient.tsx", "app/api/rezerwacja/route.ts"]) {
    const source = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
    assert.ok(source.includes("business"), file);
    assert.ok(!source.includes("salon@noblu.pl"), `${file}: duplicate mailbox`);
    assert.ok(!source.includes("+48662989534"), `${file}: duplicate telephone`);
  }
});
