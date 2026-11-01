import assert from "node:assert/strict";
import test from "node:test";
import { loadDataModule } from "./helpers/load-data.mjs";

const { hybridOffers, hybridAddons, inquiryCopy } = loadDataModule("../app/lib/firstVisit", import.meta.url);
const { findVariantById } = loadDataModule("../app/lib/serviceCatalog", import.meta.url);

test("first-visit offers derive staff, price, duration and inquiry identity from the shared catalog", () => {
  assert.equal(hybridOffers.length, 2);
  for (const [index, id, price, minutes] of [[0, "hybryda-natalia", 160, 90], [1, "hybryda-julia", 130, 120]]) {
    const offer = hybridOffers[index];
    const variant = findVariantById(id);
    assert.equal(offer.id, variant.id);
    assert.equal(offer.pricePLN, price);
    assert.equal(offer.durationMinutes, minutes);
    assert.equal(offer.price, `${price} zł`);
    assert.equal(offer.duration, `${minutes} minut`);
    assert.equal(offer.inquiryHref, `/rezerwacja?usluga=${id}#formularz`);
    assert.equal(offer.person.id, variant.staffId);
  }
});

test("first-visit rules keep paid French and condition the free removal on a new service", () => {
  assert.equal(hybridAddons.length, 4);
  const french = hybridAddons.find(addon => addon.name === "French/Ombre/Babyboomer");
  assert.equal(french.price, "20 zł");
  assert.equal(french.duration, "20 minut");
  const removal = hybridAddons.find(addon => addon.name === "Usunięcie stylizacji z innego salonu");
  assert.equal(removal.price, "0 zł");
  assert.equal(removal.duration, "5 minut");
  assert.match(removal.description, /nie jest samodzielną bezpłatną usługą/);
  assert.match(inquiryCopy.notice, /nie potwierdzona rezerwacja/);
  assert.match(inquiryCopy.notice, /w godzinach pracy/);
  assert.match(inquiryCopy.unavailable, /Uzgodnimy/);
});
