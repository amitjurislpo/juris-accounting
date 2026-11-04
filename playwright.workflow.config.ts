import { defineConfig, devices } from "@playwright/test";

/**
 * The approval workflow, end to end, one serial run.
 *   Local (fake Sanity + local Postgres): sh scripts/test-workflow-local.sh
 *   Against a deployment and the real Sanity project: see docs/BLOG.md
 */
const external = Boolean(process.env.WORKFLOW_BASE_URL);

export default defineConfig({
  testDir: "./e2e",
  testMatch: "blog-workflow.spec.ts",
  workers: 1,
  timeout: 240_000,
  reporter: "list",
  use: { ...devices["Desktop Chrome"], baseURL: process.env.WORKFLOW_BASE_URL ?? "http://localhost:4173" },
  webServer: external
    ? undefined
    : [
        { command: "node e2e/fake-sanity.mjs", port: 4599, reuseExistingServer: false },
        { command: "npx next start -p 4173", url: "http://localhost:4173/blog", reuseExistingServer: false, timeout: 60_000 },
      ],
});
