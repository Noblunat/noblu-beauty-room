import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/visual",
  testMatch: "homepage.spec.ts",
  workers: 1,
  timeout: 120_000,
  snapshotPathTemplate:
    "{testDir}/../../output/homepage-baseline/{projectName}/{arg}{ext}",
  outputDir: "output/homepage-visual-results",
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:3130",
    reducedMotion: "reduce",
    serviceWorkers: "block",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    {
      name: "mobile-375",
      use: { ...devices["iPhone SE"], defaultBrowserType: "chromium" },
    },
    {
      name: "mobile-414",
      use: { ...devices["iPhone 11"], defaultBrowserType: "chromium" },
    },
  ],
});
