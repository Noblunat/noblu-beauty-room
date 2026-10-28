import { defineConfig, devices } from "@playwright/test";

const externalUrl = process.env.E2E_BASE_URL;
const baseURL = externalUrl || "http://127.0.0.1:3127";
const reportRoot = process.env.E2E_LIVE_TAGS === "1" ? "output/playwright/live-google" : "output/playwright";
const target = new URL(baseURL);
if (externalUrl && (target.protocol !== "https:" ||
    !/^noblu-beauty-room77(?:-[a-z0-9-]+)?\.vercel\.app$/.test(target.hostname) ||
    target.username || target.password || target.search || target.hash || target.pathname !== "/")) {
  throw new Error("E2E_BASE_URL must be an HTTPS preview URL for noblu-beauty-room77, without credentials or query parameters.");
}

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  timeout: 40_000,
  expect: { timeout: 10_000 },
  outputDir: `${reportRoot}/results`,
  reporter: [["list"], ["html", { outputFolder: `${reportRoot}/report`, open: "never" }]],
  use: {
    baseURL,
    serviceWorkers: "block",
    trace: process.env.VERCEL_AUTOMATION_BYPASS_SECRET ? "off" : "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-375", use: { ...devices["iPhone SE"], defaultBrowserType: "chromium" } },
    { name: "mobile-414", use: { ...devices["iPhone 11"], defaultBrowserType: "chromium" } },
  ],
  webServer: externalUrl ? undefined : {
    command: "node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3127",
    url: baseURL,
    reuseExistingServer: false,
    timeout: 60_000,
    env: {
      RESEND_API_KEY: "",
      RESEND_FROM_EMAIL: "",
      BOOKING_RECIPIENT_EMAIL: "",
    },
  },
});
