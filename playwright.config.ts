import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://localhost:4173",
  },
  webServer: {
    command: "npx serve out -l 4173",
    url: "http://localhost:4173",
    reuseExistingServer: false,
    timeout: 30000,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    // Chromium-based mobile emulation (Pixel 7) rather than the iPhone
    // preset, which defaults to WebKit and isn't installed in this environment.
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
