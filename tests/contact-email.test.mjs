import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("public contact, reservation fallback and schema use the salon mailbox", () => {
  for (const file of [
    "app/components/home/HomeContact.tsx", "app/layout.tsx", "app/components/SiteFooter.tsx",
    "app/rezerwacja/ReservationClient.tsx", "app/polityka-prywatnosci/page.tsx",
    "app/lib/llms.ts",
  ]) {
    const source = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
    assert.ok(source.includes("business"), file);
    assert.equal(source.includes("noblu.beautyroom@gmail.com"), false, file);
  }
});
