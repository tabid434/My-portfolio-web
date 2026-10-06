import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  outputDir: `test-results/run-${Date.now()}`,
  fullyParallel: false,
  workers: 1,
  timeout: 60000,
  use: {
    baseURL: "http://localhost:3100",
    browserName: "chromium",
    launchOptions: { args: ["--enable-webgl", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] },
    trace: "off",
  },
  webServer: {
    command: "npm run start -- --port 3100",
    url: "http://localhost:3100",
    reuseExistingServer: false,
    env: { SITE_URL: "http://localhost:3100", RESEND_API_KEY: "", CONTACT_FROM_EMAIL: "" },
  },
});