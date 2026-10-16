import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { setTimeout as delay } from "node:timers/promises";
import { parse } from "parse5";

const local = process.argv.includes("--local");
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
  if (!local && process.argv.includes("--wait-for-release")) {
    assert.ok(process.env.EXPECTED_RELEASE, "An exact release SHA is required when waiting");
    console.log("Waiting for the expected release on the public domain...");
    const deadline = Date.now() + 180000;
    let published = false;
    while (Date.now() < deadline) {
      try {
        const response = await get("/");
        const elements = nodes(parse(await response.text()));
        if (response.ok && elements.some(n => n.tagName === "meta" && attr(n, "name") === "noblu-release" && attr(n, "content") === process.env.EXPECTED_RELEASE)) {
          published = true;
          break;
        }
      } catch { /* Deployment or network not ready. */ }
      await delay(3000);
    }
    assert.ok(published, "Expected release did not reach the public domain within 3 minutes");
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
  for (const path of pages) {
    const response = await get(path);
    assert.equal(response.status, 200, path);
    const elements = nodes(parse(await response.text()));
    documents.set(path, elements);
    assert.equal(elements.filter(n => n.tagName === "h1").length, 1, `${path}: one H1`);
    assert.ok(text(elements.find(n => n.tagName === "title") || {}).trim(), `${path}: title`);
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

  for (const path of ["/", "/rezerwacja"]) {
    assert.ok(documents.get(path).some(n => n.tagName === "a" && attr(n, "href") === "https://noblubeautyroom.booksy.com/"), `${path}: Booksy fallback`);
    assert.ok(documents.get(path).some(n => n.tagName === "a" && attr(n, "href")?.startsWith("tel:")), `${path}: telephone`);
  }
  assert.equal(documents.get("/").filter(n => n.tagName === "link" && attr(n, "as") === "font").length, 0, "No unused font preloads");
  const reservation = documents.get("/rezerwacja");
  assert.ok(reservation.some(n => n.tagName === "input" && attr(n, "type") === "date" && /^\d{4}-\d{2}-\d{2}$/.test(attr(n, "min") || "")), "Minimum booking date");
  assert.ok(reservation.some(n => n.tagName === "input" && attr(n, "type") === "tel" && attr(n, "autocomplete") === "tel"), "Telephone input");

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
