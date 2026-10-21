import { defineConfig, devices } from "@playwright/test";

// An existing local server can be reused without starting a second Next.js
// process against the same development build directory.
const externalBaseURL = process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  reporter: "list",
  workers: 1,
  use: {
    baseURL: externalBaseURL ?? "http://127.0.0.1:3100",
    trace: "on-first-retry",
  },
  webServer: externalBaseURL
    ? undefined
    : {
        command: "npm run dev -- --webpack -H 127.0.0.1 -p 3100",
        url: "http://127.0.0.1:3100/en",
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
