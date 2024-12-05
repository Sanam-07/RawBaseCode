import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "src/ui",
  timeout: 300 * 10000, // Maximum time one test can run
  expect: {
    timeout: 5000, // Timeout for assertions
  },
  reporter: [
    ["html", { open: "on-failure" }], // HTML reporter to generate detailed reports
  ],
  retries: 0, // Retry failed tests
  workers: 4, // Number of parallel test workers
  use: {
    headless: true, // Run tests in headless mode
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
    video: "on-first-retry", // Record video on first retry
    screenshot: "only-on-failure", // Capture screenshot on failure
    baseURL: "https://www.google.com", // Set the base URL for your tests
  },
  projects: [
    {
      name: "Chromium",
      use: { browserName: "chromium", headless: false },
    },
  ],
});
