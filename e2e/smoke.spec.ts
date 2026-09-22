import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/about",
  "/bookkeeping",
  "/accounting",
  "/taxation",
  "/controller-services",
  "/services/compare",
  "/pricing",
  "/industries",
  "/process",
  "/why-juris",
  "/resources",
  "/resources/bookkeeping-checklist",
  "/faq",
  "/contact",
  "/privacy",
  "/terms",
];

test.describe("navigation and console health", () => {
  for (const route of routes) {
    test(`loads ${route} with no console errors or broken assets`, async ({ page }) => {
      const errors: string[] = [];
      const failedRequests: string[] = [];

      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });
      page.on("response", (response) => {
        if (response.status() >= 400) {
          failedRequests.push(`${response.status()} ${response.url()}`);
        }
      });

      const response = await page.goto(route, { waitUntil: "networkidle" });
      expect(response?.ok()).toBeTruthy();
      await expect(page.locator("h1").first()).toBeVisible();

      expect(errors, `console errors on ${route}: ${errors.join(", ")}`).toEqual([]);
      expect(
        failedRequests,
        `failed requests on ${route}: ${failedRequests.join(", ")}`,
      ).toEqual([]);
    });
  }
});

test("404 page renders for an unknown route", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByText("That page doesn't exist")).toBeVisible();
});

test("header navigation reaches a service page", async ({ page }) => {
  await page.goto("/");
  const desktopServicesButton = page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("button", { name: "Services", exact: true });
  if (await desktopServicesButton.isVisible()) {
    await desktopServicesButton.click();
  } else {
    // Narrow viewport: the desktop dropdown is hidden in favor of the
    // hamburger drawer.
    await page.getByRole("button", { name: "Open menu" }).click();
  }
  await page.locator('a[href="/bookkeeping"]').first().click();
  await expect(page).toHaveURL(/\/bookkeeping$/);
  await expect(page.locator("h1")).toContainText("Bookkeeping");
});

test("services comparison table shows all three services", async ({ page }) => {
  await page.goto("/services/compare");
  const table = page.locator("table").first();
  await expect(table).toBeVisible();
  await expect(table).toContainText("Bookkeeping");
  await expect(table).toContainText("Accounting");
  await expect(table).toContainText("Taxation");
});

test("which service flow updates the recommendation", async ({ page }) => {
  await page.goto("/");
  const flow = page.locator("#which-service");
  await flow.scrollIntoViewIfNeeded();
  await flow.getByRole("button", { name: "Yes" }).first().click();
  await expect(flow).toContainText("recommendation");
});

test("pricing builder moves between starting price and consultation", async ({ page }) => {
  await page.goto("/pricing");
  const outcome = page.getByTestId("pricing-outcome");

  await expect(outcome.getByText(/Starting from/i)).toBeVisible();

  await page.getByRole("button", { name: "Accounting" }).first().click();
  await expect(outcome.getByText(/consultation/i).first()).toBeVisible();
});

test("faq accordion expands and collapses", async ({ page }) => {
  await page.goto("/faq");
  const accordion = page.getByTestId("faq-accordion");
  // The first question is open by default; verify it can be collapsed and
  // a different question can be expanded.
  const firstQuestion = accordion.getByRole("button").first();
  const secondQuestion = accordion.getByRole("button").nth(1);

  await expect(firstQuestion).toHaveAttribute("aria-expanded", "true");
  await firstQuestion.click();
  await expect(firstQuestion).toHaveAttribute("aria-expanded", "false");

  await expect(secondQuestion).toHaveAttribute("aria-expanded", "false");
  await secondQuestion.click();
  await expect(secondQuestion).toHaveAttribute("aria-expanded", "true");
});

test("dashboard concept renders demo data on the homepage", async ({ page }) => {
  await page.goto("/");
  const dashboard = page.locator("#dashboard");
  await dashboard.scrollIntoViewIfNeeded();
  await expect(dashboard.getByText("Demo data").first()).toBeVisible();
  await expect(dashboard.locator("svg").first()).toBeVisible();
});

test("contact form shows a static-preview confirmation on submit", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Name", { exact: true }).fill("Test User");
  await page.getByLabel("Email", { exact: true }).fill("test@example.com");
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(
    page.getByText("we'll follow up shortly", { exact: false }),
  ).toBeVisible();
});

test("reduced motion is respected: content is visible without waiting on animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("h1").first()).toBeVisible();
  const opacity = await page.locator("h1").first().evaluate(
    (el) => getComputedStyle(el).opacity,
  );
  expect(Number(opacity)).toBeGreaterThan(0.9);
});

test("homepage has no critical accessibility violations", async ({ page }) => {
  await page.goto("/");
  // Let page-load reveal animations finish before scanning — mid-fade
  // opacity is expected to read as low contrast for that instant, it isn't
  // a real defect once the (intentional, one-time) reveal completes.
  await page.waitForTimeout(1500);
  const results = await new AxeBuilder({ page })
    .exclude("iframe")
    .analyze();
  const critical = results.violations.filter(
    (v) => v.impact === "critical" || v.impact === "serious",
  );
  expect(
    critical,
    critical.map((v) => `${v.id}: ${v.description}`).join("\n"),
  ).toEqual([]);
});
