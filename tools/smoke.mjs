import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { setTimeout as delay } from "node:timers/promises";
import { parse } from "parse5";

const local = process.argv.includes("--local");
const waitForRelease = !local && process.argv.includes("--wait-for-release");
const base = new URL(local ? "http://127.0.0.1:3100" : process.env.SMOKE_BASE_URL || "https://noblu.pl");
const pages = ["/", "/manicure-krakow", "/pedicure-krakow", "/stylizacja-rzes-krakow", "/przedluzanie-rzes-krakow", "/cennik", "/rezerwacja", "/polityka-prywatnosci"];
const require = createRequire(import.meta.url);
const nodes = (node) => [node, ...(node.childNodes || []).flatMap(nodes)];
const attr = (node, name) => node.attrs?.find(a => a.name === name)?.value;
const text = (node) => node.value || (node.childNodes || []).map(text).join("");
let server;
let serverOutput = "";

async function get(path, options) {
  return fetch(new URL(path, base), { redirect: "manual", signal: AbortSignal.timeout(15000), ...options });
}

try {
  const releaseDeadline = Date.now() + 180000;
  if (waitForRelease) {
    assert.ok(process.env.EXPECTED_RELEASE, "An exact release SHA is required when waiting");
    console.log("Waiting for the expected release on the public domain...");
  }
  if (local) {
    // Refuse to accidentally validate an unrelated server already using this port.
    try { await get("/"); throw new Error("Port 3100 is already in use"); }
    catch (error) { if (error.message === "Port 3100 is already in use") throw error; }
    server = spawn(process.execPath, [require.resolve("next/dist/bin/next"), "start", "--port", "3100", "--hostname", "127.0.0.1"], { stdio: ["ignore", "pipe", "pipe"] });
    for (const stream of [server.stdout, server.stderr]) stream.on("data", chunk => { serverOutput = (serverOutput + chunk).slice(-4000); });
    let ready = false;
    for (let attempt = 0; attempt < 60; attempt++) {
      if (server.exitCode !== null) throw new Error(`Smoke server failed: ${serverOutput}`);
      try { if ((await get("/")).ok) { ready = true; break; } } catch { /* Startup pending. */ }
      await delay(250);
    }
    assert.ok(ready, "Production-mode test server starts");
  }

  const documents = new Map();
  let cookieMessage;
  for (const path of pages) {
    let elements;
    while (true) {
      const response = await get(path);
      assert.equal(response.status, 200, `${path}: HTTP response`);
      elements = nodes(parse(await response.text()));
      const actualRelease = attr(elements.find(n => n.tagName === "meta" && attr(n, "name") === "noblu-release") || {}, "content");
      if (!waitForRelease || actualRelease === process.env.EXPECTED_RELEASE) break;
      assert.ok(Date.now() < releaseDeadline, `${path}: expected release did not arrive within 3 minutes (received ${actualRelease || "none"})`);
      // Alias/CDN propagation can briefly differ between successive requests.
      // Poll slowly and validate each route, not just the homepage handshake.
      await delay(15000);
    }
    documents.set(path, elements);
    assert.equal(elements.filter(n => n.tagName === "main").length, 1, `${path}: one main landmark`);
    assert.equal(elements.filter(n => n.tagName === "footer").length, 1, `${path}: one shared footer`);
    const footer = elements.find(n => n.tagName === "footer");
    assert.ok(nodes(footer).some(n => n.tagName === "a" && attr(n, "href") === "mailto:salon@noblu.pl"), `${path}: salon contact mailbox`);
    assert.ok(!elements.some(n => n.tagName === "a" && attr(n, "href") === "mailto:noblu.beautyroom@gmail.com"), `${path}: no legacy public mailbox`);
    assert.equal(nodes(footer).filter(n => n.tagName === "button" && text(n).trim() === "Ustawienia cookies").length, 1, `${path}: persistent cookie preferences control in footer`);
    const banner = elements.find(n => n.attrs?.some(a => a.name === "data-cookie-banner"));
    assert.ok(banner, `${path}: shared first-visit cookie banner`);
    const message = text(nodes(banner).find(n => n.tagName === "p") || {}).replace(/\s+/g, " ").trim();
    assert.match(message, /analityki, marketingu .*Google Ads/);
    assert.match(message, /mapa Google/);
    cookieMessage ??= message;
    assert.equal(message, cookieMessage, `${path}: same consent disclosure as homepage`);
    assert.equal(elements.filter(n => n.tagName === "h1").length, 1, `${path}: one H1`);
    assert.ok(text(elements.find(n => n.tagName === "title") || {}).trim(), `${path}: title`);
    const meta = (key, value) => attr(elements.find(n => n.tagName === "meta" && attr(n, key) === value) || {}, "content");
    assert.ok(meta("property", "og:description"), `${path}: Open Graph description`);
    assert.equal(meta("name", "twitter:description"), meta("property", "og:description"), `${path}: Twitter description matches Open Graph`);
    assert.equal(meta("name", "twitter:title"), meta("property", "og:title"), `${path}: Twitter title matches Open Graph`);
    if (path === "/") assert.equal(meta("property", "og:title"), text(elements.find(n => n.tagName === "title")), "Homepage title matches Open Graph");
    assert.doesNotMatch(text(elements[0]), /premium/i, `${path}: no premium claims in rendered copy or structured data`);
    assert.ok(elements.some(n => n.tagName === "meta" && attr(n, "name") === "description" && attr(n, "content")), `${path}: description`);
    assert.ok(elements.some(n => n.tagName === "link" && attr(n, "rel") === "canonical" && attr(n, "href") === (path === "/" ? "https://noblu.pl" : `https://noblu.pl${path}`)), `${path}: canonical`);
    assert.ok(!elements.some(n => n.tagName === "meta" && attr(n, "name") === "robots" && attr(n, "content")?.includes("noindex")), `${path}: indexable`);
    for (const schema of elements.filter(n => n.tagName === "script" && attr(n, "type") === "application/ld+json")) JSON.parse(text(schema));
    if (process.env.EXPECTED_RELEASE) assert.ok(elements.some(n => n.tagName === "meta" && attr(n, "name") === "noblu-release" && attr(n, "content") === process.env.EXPECTED_RELEASE), `${path}: deployed commit`);
    for (const anchor of elements.filter(n => n.tagName === "a")) {
      const href = attr(anchor, "href");
      if (href?.startsWith("/") && !href.startsWith("//")) assert.ok(pages.includes(new URL(href, base).pathname), `${path}: known internal link ${href}`);
    }
    console.log(`PASS ${path}: status, metadata, H1, schema, links`);
  }

  assert.equal(new Set([...documents.values()].map(elements => attr(elements.find(n => n.tagName === "meta" && attr(n, "name") === "twitter:description") || {}, "content"))).size, pages.length, "Twitter descriptions are specific to all eight pages");

  for (const path of ["/", "/rezerwacja"]) {
    assert.ok(documents.get(path).some(n => n.tagName === "a" && attr(n, "href") === "https://noblubeautyroom.booksy.com/"), `${path}: Booksy fallback`);
    assert.ok(documents.get(path).some(n => n.tagName === "a" && attr(n, "href")?.startsWith("tel:")), `${path}: telephone`);
  }
  const homeHeader = documents.get("/").find(n => n.tagName === "header");
  assert.ok(nodes(homeHeader).some(n => n.tagName === "a" && attr(n, "href") === "tel:+48662989534" && text(n).trim() === "662 989 534"), "Visible callable telephone in homepage header");
  assert.equal(documents.get("/").filter(n => n.tagName === "link" && attr(n, "as") === "font").length, 0, "No unused font preloads");
  const reservation = documents.get("/rezerwacja");
  assert.ok(reservation.some(n => n.tagName === "input" && attr(n, "type") === "date" && /^\d{4}-\d{2}-\d{2}$/.test(attr(n, "min") || "")), "Minimum booking date");
  assert.ok(reservation.some(n => n.tagName === "input" && attr(n, "type") === "tel" && attr(n, "autocomplete") === "tel"), "Telephone input");
  const prices = documents.get("/cennik");
  for (const service of ["manicure", "pedicure", "rzesy"]) {
    assert.ok(prices.some(n => n.tagName === "a" && attr(n, "href") === `/rezerwacja?usluga=${service}`), `Price-list booking link: ${service}`);
  }
  assert.equal(prices.filter(n => n.tagName === "span" && text(n).trim().startsWith("Czas:")).length, 27, "Duration or unconfirmed-time disclosure on all price rows");
  assert.ok(documents.get("/").some(n => n.tagName === "a" && attr(n, "href") === "https://g.page/r/CWOsZkWYFdZbEBM/review"), "Official Google review invitation");

  const privacyTable = documents.get("/polityka-prywatnosci").find(n => n.tagName === "table");
  assert.ok(privacyTable, "Privacy tools table");
  assert.equal(nodes(privacyTable).filter(n => n.tagName === "th" && attr(n, "scope") === "row").length, 9, "Current tools and historical mail storage in privacy table");
  assert.match(text(privacyTable), /OVHcloud \/ Zimbra/);

  const redirect = await get("/stylizacja-hybrydowa-krakow");
  assert.equal(redirect.status, 308);
  assert.equal(new URL(redirect.headers.get("location"), base).pathname, "/manicure-krakow");
  const missing = await get("/noblu-smoke-missing-page");
  assert.equal(missing.status, 404);
  assert.match(await missing.text(), /noindex/);
  assert.equal((await get("/Shaushka-Cosmetics/pr/32")).status, 410);
  const robots = await get("/robots.txt");
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Sitemap: https:\/\/noblu.pl\/sitemap.xml/);
  const sitemap = await get("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  for (const path of pages) assert.ok(xml.includes(`<loc>https://noblu.pl${path === "/" ? "" : path}</loc>`), `Sitemap ${path}`);
  for (const path of ["/og-noblu.jpg", "/rezerwacja/og-rezerwacja.jpg", "/_next/image?url=%2Fgallery%2Fsalon%2Fsalon-beauty-krakow-noblu.webp&w=640&q=75"]) {
    const image = await get(path);
    assert.equal(image.status, 200, path);
    assert.match(image.headers.get("content-type") || "", /^image\//);
    assert.ok((await image.arrayBuffer()).byteLength > 100, path);
  }
  // An empty request cannot pass validation or send an appointment/email.
  const invalid = await get("/api/rezerwacja", { method: "POST", headers: { "content-type": "application/json", origin: base.origin }, body: "{}" });
  assert.equal(invalid.status, 400, "Safe API validation probe");
  assert.ok((await invalid.json()).error);
  console.log("PASS Booksy, telephone, images, form attributes, redirect, 404, 410, robots, sitemap and API validation");
} catch (error) {
  console.error("SMOKE FAILED:", error.message);
  process.exitCode = 1;
} finally {
  if (server) {
    const stopped = new Promise(resolve => server.once("exit", resolve));
    server.kill();
    await Promise.race([stopped, delay(3000)]);
  }
}
