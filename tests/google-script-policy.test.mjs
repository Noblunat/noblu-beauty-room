import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { loadDataModule } from "./helpers/load-data.mjs";

test("live-vendor tests fetch only libraries, never script-shaped collection requests", () => {
  assert.ok(
    existsSync(new URL("./e2e/google-script-policy.ts", import.meta.url)),
    "live-vendor proxy needs an explicit library allowlist, not the script resource type alone",
  );
  const { isGoogleLibrary } = loadDataModule(
    "./e2e/google-script-policy",
    import.meta.url,
  );
  for (const href of [
    "https://www.googletagmanager.com/gtag/js?id=G-BD9VRN0W6Q",
    "https://www.googletagmanager.com/gtag/destination?id=AW-10795260361",
  ])
    assert.equal(isGoogleLibrary(new URL(href)), true, href);
  for (const href of [
    "https://googleads.g.doubleclick.net/pagead/viewthroughconversion/10795260361/?fmt=4",
    "https://www.googleadservices.com/pagead/conversion/10795260361/",
    "https://www.google-analytics.com/g/collect",
    "https://www.googletagmanager.com/g/collect",
    "https://www.googletagmanager.com/unknown.js",
    "https://www.googletagmanager.com.example.org/gtag/js",
    "http://www.googletagmanager.com/gtag/js",
  ])
    assert.equal(isGoogleLibrary(new URL(href)), false, href);
});
