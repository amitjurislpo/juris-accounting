import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";
import { test, expect, type APIRequestContext, type Browser, type Page } from "@playwright/test";
import pg from "pg";

/**
 * The brief's "done" list, as far as an API-driven author can go. Publishing is done
 * the way Studio does it: replace the published document, drop the draft. Studio's own
 * UI (items 8 and 13) can't be driven here; those need a logged-in person.
 */
const fake = Boolean(process.env.WORKFLOW_FAKE_SANITY);
const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-02-19",
  useCdn: false,
  perspective: "raw",
  token: process.env.WORKFLOW_SANITY_TOKEN ?? process.env.SANITY_API_WRITE_TOKEN,
  ...(fake ? { apiHost: process.env.SANITY_TEST_API_HOST, useProjectHostname: false } : {}),
});
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const PASSWORD = "e2e-test-password-123";
const NON_CHECKER = "e2e-noncheck@jurislpo.com";
const CHECKERS = ["gopal@jurislpo.com", "ritz@jurislpo.com", "amit@jurislpo.com"];
const RUN = Date.now().toString(36);
const CACHE_WINDOW_MS = 100_000;

const span = (text: string) => ({ _type: "span", _key: "s", text, marks: [] });
const body = (text: string) => [
  { _type: "block", _key: "h", style: "h2", markDefs: [], children: [span("First heading")] },
  { _type: "block", _key: "b", style: "normal", markDefs: [], children: [span(text)] },
];
const baseDoc = (id: string, slug: string, over: object = {}) => ({
  _id: id,
  _type: "post",
  title: `[E2E TEST] ${slug}`,
  slug: { _type: "slug", current: slug },
  description: `Test description for ${slug}`,
  category: "accounting",
  publishedAt: "2026-11-01T09:00:00Z",
  workflowStatus: "draft",
  body: body("Original body text"),
  ...over,
});
async function publish(doc: { _id: string } & Record<string, unknown>) {
  const tx = sanity.transaction().createOrReplace(doc as never).delete(`drafts.${doc._id}`);
  await tx.commit();
  return (await sanity.getDocument(doc._id))!._rev;
}
const decision = async (id: string) =>
  (await db.query(`SELECT * FROM "Approval" WHERE "objectId" = $1`, [id])).rows[0];
const auditCount = async (id: string) =>
  Number((await db.query(`SELECT count(*) FROM "ApprovalAudit" WHERE "objectId" = $1`, [id])).rows[0].count);
const setFailure = async (request: APIRequestContext, failMutations: boolean) =>
  request.post(`${process.env.SANITY_TEST_API_HOST}/__control`, { data: { failMutations } });

const row = (page: Page, id: string) => page.locator(`li[data-post-id="${id}"]`);
const section = (page: Page, name: string) => page.getByRole("region", { name: new RegExp(`^${name} \\(`) });
const reviews = (page: Page) => page.goto("/admin/blog-reviews");

async function waitUntil(check: () => Promise<boolean>, what: string, ms = CACHE_WINDOW_MS) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    if (await check()) return;
    await new Promise((r) => setTimeout(r, 3000));
  }
  throw new Error(`Timed out waiting for: ${what}`);
}

async function signIn(browser: Browser, email: string) {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("/admin/login");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL("**/admin/blog-reviews");
  return page;
}

async function setUpAccount(browser: Browser, email: string) {
  const site = process.env.WORKFLOW_BASE_URL ?? "http://localhost:4173";
  const link = execFileSync("node", ["scripts/admin-invite.mjs", email, site], { encoding: "utf8" }).trim();
  const page = await (await browser.newContext()).newPage();
  await page.goto(link);
  await page.getByLabel(/New password/).fill(PASSWORD);
  await page.getByLabel("Repeat it").fill(PASSWORD);
  await page.getByRole("button", { name: /Set password/ }).click();
  await page.waitForURL("**/admin/blog-reviews");
  await page.context().close();
}

test.describe.serial("blog approval workflow", () => {
  const A = `e2e-a-${RUN}`;
  const slugA = `e2e-test-post-a-${RUN}`;
  let checker: Page;
  let nonChecker: Page;
  let approveActionId = "";
  let revA = "";

  const publicStatus = async (request: APIRequestContext, slug: string) => (await request.get(`/blog/${slug}`)).status();
  const inList = async (request: APIRequestContext, slug: string) => (await (await request.get("/blog")).text()).includes(`/blog/${slug}`);
  const inSitemap = async (request: APIRequestContext, slug: string) => (await (await request.get("/sitemap.xml")).text()).includes(`/blog/${slug}`);

  test.beforeAll(async ({ browser }) => {
    for (const email of [...CHECKERS, NON_CHECKER]) await setUpAccount(browser, email);
    checker = await signIn(browser, CHECKERS[0]);
    nonChecker = await signIn(browser, NON_CHECKER);
  });

  test.afterAll(async () => {
    await db.end();
  });

  test("static posts keep working", async ({ request }) => {
    expect(await publicStatus(request, "virtual-cfo-services")).toBe(200);
    expect(await inList(request, "virtual-cfo-services")).toBe(true);
    expect(await inSitemap(request, "virtual-cfo-services")).toBe(true);
  });

  test("1. published post waits, is not public, and 404s", async ({ request }) => {
    revA = await publish(baseDoc(A, slugA));
    await reviews(checker);
    await expect(section(checker, "Waiting").locator(`li[data-post-id="${A}"]`)).toBeVisible();
    expect(await publicStatus(request, slugA)).toBe(404);
    expect(await inList(request, slugA)).toBe(false);
    expect(await inSitemap(request, slugA)).toBe(false);
  });

  test("2. a non-checker sees a read-only message and disabled buttons", async () => {
    await reviews(nonChecker);
    await expect(nonChecker.getByText(`${NON_CHECKER}`).first()).toBeVisible();
    await expect(nonChecker.getByRole("status")).toContainText(`${NON_CHECKER} is an admin but not a blog checker`);
    await expect(row(nonChecker, A).getByRole("button", { name: "Approve" })).toBeDisabled();
    await expect(row(nonChecker, A).getByRole("button", { name: "Reject" })).toBeDisabled();
  });

  test("preview shows the post plus what readers don't see", async () => {
    await checker.goto(`/admin/blog-reviews/preview/${A}`);
    await expect(checker.getByRole("heading", { level: 1, name: `[E2E TEST] ${slugA}` })).toBeVisible();
    await expect(checker.getByText("Original body text")).toBeVisible();
    await expect(checker.getByTestId("canonical")).toContainText(`/blog/${slugA}`);
    await expect(checker.getByText("Focus keyword")).toBeVisible();
    await expect(checker.getByText("Not set")).toBeVisible();
  });

  test("3. a checker approves: live on the next request", async ({ request }) => {
    await reviews(checker);
    checker.on("request", (r) => {
      const id = r.headers()["next-action"];
      if (id && !approveActionId) approveActionId = id;
    });
    await row(checker, A).getByRole("button", { name: "Approve" }).click();
    await expect(section(checker, "Approved").locator(`li[data-post-id="${A}"]`)).toBeVisible();
    expect(approveActionId).not.toBe("");

    expect(await publicStatus(request, slugA)).toBe(200);
    expect(await inList(request, slugA)).toBe(true);
    expect(await inSitemap(request, slugA)).toBe(true);
    expect(await decision(A)).toMatchObject({ state: "APPROVED", decidedBy: CHECKERS[0], objectRevision: revA });
    const live = (await sanity.getDocument(A))!;
    expect(live._rev).toBe(revA); // approving writes nothing to Sanity
    expect(live.workflowStatus).toBe("draft"); // and the unused status still says Draft
    expect(live.submittedBy).toBeUndefined();
    expect(await auditCount(A)).toBe(1);
  });

  test("approved revision offers neither Approve nor Reject", async () => {
    await expect(row(checker, A).getByRole("button", { name: "Approve" })).toHaveCount(0);
    await expect(row(checker, A).getByRole("button", { name: "Reject" })).toHaveCount(0);
  });

  test("2b. the server refuses a non-checker calling the action directly", async () => {
    const X = `e2e-x-${RUN}`;
    const rev = await publish(baseDoc(X, `e2e-test-post-x-${RUN}`));
    const site = process.env.WORKFLOW_BASE_URL ?? "http://localhost:4173";
    const response = await nonChecker.context().request.post(`${site}/admin/blog-reviews`, {
      headers: { "next-action": approveActionId, "content-type": "text/plain;charset=UTF-8", accept: "text/x-component", origin: site },
      data: JSON.stringify([{ postId: X, revision: rev }]),
    });
    expect(await response.text()).toContain(`${NON_CHECKER} is not a blog checker`);
    expect(await decision(X)).toBeUndefined();

    // The same forged call with no session at all.
    const anon = await nonChecker.context().browser()!.newContext();
    const anonResponse = await anon.request.post(`${site}/admin/blog-reviews`, {
      headers: { "next-action": approveActionId, "content-type": "text/plain;charset=UTF-8", accept: "text/x-component", origin: site },
      data: JSON.stringify([{ postId: X, revision: rev }]),
    });
    expect(await anonResponse.text()).toContain("session has expired");
    expect(await decision(X)).toBeUndefined();
    await anon.close();
    await sanity.delete(X);
  });

  test("4. editing a live post removes it; approval publishes the new version", async ({ request }) => {
    revA = await publish(baseDoc(A, slugA, { body: body("Edited body text") }));
    await reviews(checker);
    await expect(section(checker, "Waiting").locator(`li[data-post-id="${A}"]`)).toContainText("Edited since last decision");
    await waitUntil(
      async () => (await publicStatus(request, slugA)) === 404 && !(await inList(request, slugA)) && !(await inSitemap(request, slugA)),
      "edited post to leave page, list and sitemap",
    );

    await row(checker, A).getByRole("button", { name: "Approve" }).click();
    await expect(section(checker, "Approved").locator(`li[data-post-id="${A}"]`)).toBeVisible();
    const res = await request.get(`/blog/${slugA}`);
    expect(res.status()).toBe(200);
    expect(await res.text()).toContain("Edited body text");
  });

  test("5. an approval of a stale revision is refused", async () => {
    const B = `e2e-b-${RUN}`;
    const slugB = `e2e-test-post-b-${RUN}`;
    await publish(baseDoc(B, slugB));
    await reviews(checker);
    await expect(row(checker, B)).toBeVisible();
    await publish(baseDoc(B, slugB, { body: body("Edited after the checker opened it") })); // page still shows the old revision
    await row(checker, B).getByRole("button", { name: "Approve" }).click();
    await expect(row(checker, B).getByRole("alert")).toContainText("This post changed. Reload and review the latest version.");
    expect(await decision(B)).toBeUndefined();
    await sanity.delete(B);
  });

  test("6. a rejection returns it to the author; republishing returns it to Waiting", async ({ request }) => {
    const C = `e2e-c-${RUN}`;
    const slugC = `e2e-test-post-c-${RUN}`;
    const doc = baseDoc(C, slugC, { tags: ["kept-tag"] });
    await publish(doc);
    await reviews(checker);
    await row(checker, C).getByRole("button", { name: "Reject" }).click();
    await row(checker, C).getByLabel("What should the author change?").fill("Please fix the intro");
    await row(checker, C).getByRole("button", { name: "Confirm reject" }).click();
    await expect(section(checker, "Rejected").locator(`li[data-post-id="${C}"]`)).toContainText("Please fix the intro");

    expect(await publicStatus(request, slugC)).toBe(404);
    expect(await sanity.getDocument(C)).toBeUndefined();
    const draft = await sanity.getDocument(`drafts.${C}`);
    expect(draft).toMatchObject({ title: doc.title, tags: ["kept-tag"], reviewFeedback: { note: "Please fix the intro", by: CHECKERS[0] } });

    await expect(row(checker, C).getByRole("button", { name: "Approve" })).toHaveCount(0);
    await checker.goto(`/admin/blog-reviews/preview/${C}`);
    await expect(checker.getByRole("button", { name: "Approve" })).toHaveCount(0);
    await expect(checker.getByText(/sent back and is now a draft/)).toBeVisible();

    await publish({ ...doc }); // the author republishes; Studio clears the feedback
    await reviews(checker);
    await expect(section(checker, "Waiting").locator(`li[data-post-id="${C}"]`)).toBeVisible();
    await sanity.delete(C);
  });

  test("7. a failed Sanity write keeps the post off the site, warns, and offers a retry", async ({ request }) => {
    test.skip(!fake, "Needs the fake Sanity's failure switch; on a deployment, remove the write token instead");
    const D = `e2e-d-${RUN}`;
    const slugD = `e2e-test-post-d-${RUN}`;
    await publish(baseDoc(D, slugD));
    await reviews(checker);
    await setFailure(request, true);
    await row(checker, D).getByRole("button", { name: "Reject" }).click();
    await row(checker, D).getByLabel("What should the author change?").fill("Needs work");
    await row(checker, D).getByRole("button", { name: "Confirm reject" }).click();
    await expect(section(checker, "Rejected").locator(`li[data-post-id="${D}"]`)).toContainText("Not sent back yet");
    await expect(row(checker, D).getByRole("alert").filter({ hasText: "not sent back to the author yet" })).toBeVisible();
    expect(await publicStatus(request, slugD)).toBe(404);

    await row(checker, D).getByRole("button", { name: "Send back to author" }).click();
    await expect(row(checker, D).getByRole("alert").filter({ hasText: "Sanity refused" })).toBeVisible();

    await setFailure(request, false);
    await row(checker, D).getByRole("button", { name: "Send back to author" }).click();
    await expect.poll(() => sanity.getDocument(D)).toBeUndefined();
    await expect(row(checker, D).getByText("not sent back to the author yet")).toHaveCount(0);
    await expect(row(checker, D).getByRole("button")).toHaveCount(0);
    expect(await sanity.getDocument(`drafts.${D}`)).toMatchObject({ reviewFeedback: { note: "Needs work" } });
    await sanity.delete(`drafts.${D}`);
  });

  test("9. a deletion request removes the post; approving deletes it everywhere", async ({ request }) => {
    expect(await publicStatus(request, slugA)).toBe(200);
    await publish(baseDoc(A, slugA, { body: body("Edited body text"), deletionRequested: true }));
    await reviews(checker);
    const item = section(checker, "Waiting").locator(`li[data-post-id="${A}"]`);
    await expect(item).toContainText("Deletion requested");
    await waitUntil(
      async () => (await publicStatus(request, slugA)) === 404 && !(await inList(request, slugA)) && !(await inSitemap(request, slugA)),
      "deletion-requested post to leave page, list and sitemap",
    );

    if (fake) {
      await setFailure(request, true);
      await row(checker, A).getByRole("button", { name: "Approve deletion" }).click();
      await expect(row(checker, A).getByRole("button", { name: "Delete now" })).toBeVisible();
      await expect(row(checker, A).getByRole("alert").filter({ hasText: "still in Sanity" })).toBeVisible();
      expect(await publicStatus(request, slugA)).toBe(404);
      await setFailure(request, false);
      await row(checker, A).getByRole("button", { name: "Delete now" }).click();
    } else {
      await row(checker, A).getByRole("button", { name: "Approve deletion" }).click();
    }
    await expect(row(checker, A)).toHaveCount(0);
    expect(await sanity.getDocument(A)).toBeUndefined();
    expect(await publicStatus(request, slugA)).toBe(404);
    expect(await inList(request, slugA)).toBe(false);
    expect(await inSitemap(request, slugA)).toBe(false);
  });

  test("rejecting a deletion request sends it back, ticked, for the author to untick", async ({ request }) => {
    const E = `e2e-e-${RUN}`;
    const slugE = `e2e-test-post-e-${RUN}`;
    await publish(baseDoc(E, slugE, { deletionRequested: true }));
    await reviews(checker);
    await row(checker, E).getByRole("button", { name: "Reject" }).click();
    await row(checker, E).getByLabel("What should the author change?").fill("Keep this post");
    await row(checker, E).getByRole("button", { name: "Confirm reject" }).click();
    await expect(section(checker, "Rejected").locator(`li[data-post-id="${E}"]`)).toBeVisible();
    expect(await sanity.getDocument(`drafts.${E}`)).toMatchObject({ deletionRequested: true, reviewFeedback: { note: "Keep this post" } });
    expect(await publicStatus(request, slugE)).toBe(404);
    await sanity.delete(`drafts.${E}`);
    await reviews(checker);
    await expect(row(checker, E)).toHaveCount(0);
  });

  test("10. a post deleted directly in Sanity disappears within the cache window", async ({ request }) => {
    const F = `e2e-f-${RUN}`;
    const slugF = `e2e-test-post-f-${RUN}`;
    await publish(baseDoc(F, slugF));
    await reviews(checker);
    await row(checker, F).getByRole("button", { name: "Approve" }).click();
    await expect(section(checker, "Approved").locator(`li[data-post-id="${F}"]`)).toBeVisible();
    expect(await inList(request, slugF)).toBe(true);

    await sanity.delete(F);
    await reviews(checker);
    await expect(row(checker, F)).toHaveCount(0); // the queue is uncached
    await waitUntil(
      async () => (await publicStatus(request, slugF)) === 404 && !(await inList(request, slugF)) && !(await inSitemap(request, slugF)),
      "externally deleted post to leave list, page and sitemap",
    );
  });

  test("a post using every body type displays correctly, live and in the preview", async ({ browser, request }) => {
    const R = `e2e-rich-${RUN}`;
    const slugR = `e2e-test-post-rich-${RUN}`;
    const IMAGE = "public/images/blog/bookkeeping-workflow-for-accounting-firms.jpg";
    let assetId = "image-e2e-975x531-jpg";
    if (fake) {
      await sanity.createOrReplace({
        _id: assetId,
        _type: "sanity.imageAsset",
        url: "/images/blog/bookkeeping-workflow-for-accounting-firms.jpg",
        metadata: { dimensions: { width: 975, height: 531 } },
      } as never);
    } else {
      assetId = (await sanity.assets.upload("image", readFileSync(IMAGE), { filename: "e2e-test.jpg" }))._id;
    }
    const image = { _type: "image", asset: { _type: "reference", _ref: assetId } };
    const text = (style: string, value: string) => ({ _type: "block", _key: `${style}-k`, style, markDefs: [], children: [{ _type: "span", _key: "s", text: value, marks: [] }] });
    const item = (kind: string, value: string) => ({ ...text("normal", value), _key: value, listItem: kind, level: 1 });
    const link = (href: string, label: string) => ({
      _type: "block", _key: label, style: "normal",
      markDefs: [{ _key: "m", _type: "link", href }],
      children: [{ _type: "span", _key: "s", text: label, marks: ["m"] }],
    });
    const CLOSER = "</script><script>window.__pwned=1</script>";
    const rev = await publish(baseDoc(R, slugR, {
      title: `[E2E TEST] Every body type ${CLOSER}`,
      author: "E2E Test Author",
      category: "Test Category",
      tags: ["first-tag", "second-tag"],
      mainImage: { ...image, alt: "Main image alt" },
      faq: [{ _key: "f", _type: "faqItem", question: `E2E question ${CLOSER}`, answer: "E2E answer" }],
      body: [
        text("h2", "Owner's heading two"), text("h3", "Heading three"), text("h4", "Heading four"),
        text("normal", "Plain paragraph"), text("blockquote", "A quoted line"),
        { _type: "block", _key: "m", style: "normal", markDefs: [], children: [
          { _type: "span", _key: "b", text: "Bold words", marks: ["strong"] },
          { _type: "span", _key: "i", text: "Italic words", marks: ["em"] },
        ] },
        item("bullet", "Bullet one"), item("number", "Number one"),
        link("https://example.com/secure", "https link"), link("http://example.com/plain", "http link"),
        link("mailto:hello@example.com", "mail link"), link("tel:+15551234567", "phone link"),
        link("/pricing", "relative link"), link("javascript:window.__pwned=1", "unsafe link"),
        { _type: "table", _key: "t", rows: [
          { _type: "tableRow", _key: "a", cells: ["Header one", "Header two"] },
          { _type: "tableRow", _key: "b", cells: ["Cell one", "Cell two"] },
        ] },
        { ...image, _key: "inline", alt: "Inline image alt", caption: "Inline image caption" },
      ],
    }));

    const check = async (page: Page, shot: string) => {
      const prose = page.locator(".blog-prose");
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(prose.locator("h1")).toHaveCount(0);
      await expect(prose.locator("h2")).toHaveText("Owner's heading two");
      await expect(prose.locator("h3")).toHaveText("Heading three");
      await expect(prose.locator("h4")).toHaveText("Heading four");
      await expect(page.getByRole("navigation", { name: "Table of contents" }).getByRole("link", { name: "Owner's heading two" }).first()).toBeAttached();
      await expect(prose.locator("blockquote")).toHaveText("A quoted line");
      await expect(prose.locator("strong")).toHaveText("Bold words");
      await expect(prose.locator("em")).toHaveText("Italic words");
      await expect(prose.locator("ul > li")).toHaveText("Bullet one");
      await expect(prose.locator("ol > li")).toHaveText("Number one");
      for (const [label, href] of [
        ["https link", "https://example.com/secure"], ["http link", "http://example.com/plain"],
        ["mail link", "mailto:hello@example.com"], ["phone link", "tel:+15551234567"], ["relative link", "/pricing"],
      ]) await expect(prose.getByRole("link", { name: label })).toHaveAttribute("href", href);
      await expect(prose.getByText("unsafe link")).toBeVisible();
      await expect(prose.getByRole("link", { name: "unsafe link" })).toHaveCount(0);
      await expect(prose.locator("th")).toHaveText(["Header one", "Header two"]);
      await expect(prose.locator("td")).toHaveText(["Cell one", "Cell two"]);
      const inline = prose.locator("figure img");
      await expect(inline).toHaveAttribute("alt", "Inline image alt");
      await inline.scrollIntoViewIfNeeded();
      await expect.poll(() => inline.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
      await expect(prose.locator("figcaption")).toHaveText("Inline image caption");
      await expect(page.getByAltText("Main image alt").last()).toBeVisible();
      await expect(page.getByText("By E2E Test Author")).toBeVisible();
      await expect(page.getByText("Test Category").first()).toBeVisible();
      await expect(page.getByRole("list", { name: "Tags" }).getByRole("listitem")).toHaveText(["first-tag", "second-tag"]);
      await expect(page.getByRole("heading", { name: "Frequently asked questions" })).toBeVisible();
      await expect(page.getByText("E2E question").first()).toBeVisible();

      const ld = await page.locator('script[type="application/ld+json"]').allInnerTexts();
      const types = ld.map((t) => JSON.parse(t)["@type"]);
      expect(types).toEqual(expect.arrayContaining(["Article", "FAQPage", "BreadcrumbList"]));
      for (const t of ld) if (t.includes("__pwned")) expect(t).not.toContain("</script>");
      expect(await page.evaluate(() => (window as unknown as { __pwned?: number }).__pwned)).toBeUndefined();
      await page.screenshot({ path: `test-results/rich-post-${shot}.png`, fullPage: true });
    };

    await checker.goto(`/admin/blog-reviews/preview/${R}`);
    await check(checker, "preview");

    await reviews(checker);
    await row(checker, R).getByRole("button", { name: "Approve" }).click();
    await expect(section(checker, "Approved").locator(`li[data-post-id="${R}"]`)).toBeVisible();
    expect(await publicStatus(request, slugR)).toBe(200);

    const reader = await (await browser.newContext()).newPage();
    await reader.goto(`/blog/${slugR}`);
    await check(reader, "live");
    const live = (await sanity.getDocument(R))!;
    expect(live._rev).toBe(rev);
    expect(live.workflowStatus).toBe("draft");
    await reader.goto("/blog");
    await reader.getByRole("button", { name: "Test Category" }).click();
    await expect(reader.locator(`a[href="/blog/${slugR}"]`)).toBeVisible();
    await reader.context().close();
  });

  test("a post with only the required fields shows nothing for the empty ones", async ({ browser }) => {
    const M = `e2e-min-${RUN}`;
    const slugM = `e2e-test-post-min-${RUN}`;
    const required: Record<string, unknown> & { _id: string } = baseDoc(M, slugM);
    delete required.category;
    delete required.workflowStatus;
    await publish({ ...required, author: "  ", tags: [], faq: [] });
    await reviews(checker);
    await row(checker, M).getByRole("button", { name: "Approve" }).click();
    await expect(section(checker, "Approved").locator(`li[data-post-id="${M}"]`)).toBeVisible();

    const reader = await (await browser.newContext()).newPage();
    await reader.goto(`/blog/${slugM}`);
    await expect(reader.getByRole("heading", { level: 1 })).toContainText(slugM);
    await expect(reader.getByText(/^By /)).toHaveCount(0);
    await expect(reader.getByText(/\bmin read\b/)).toHaveCount(0);
    await expect(reader.getByRole("list", { name: "Tags" })).toHaveCount(0);
    await expect(reader.locator("#faq")).toHaveCount(0);
    await expect(reader.locator("main figure, .blog-prose img")).toHaveCount(0);
    const types = (await reader.locator('script[type="application/ld+json"]').allInnerTexts()).map((t) => JSON.parse(t)["@type"]);
    expect(types).not.toContain("FAQPage");
    await reader.context().close();
  });

  test("11. an older post with a bad slug never reaches the list", async ({ request }) => {
    const G = `e2e-g-${RUN}`;
    await publish(baseDoc(G, "/test"));
    await reviews(checker);
    await expect(row(checker, G)).toContainText("Invalid slug");
    await row(checker, G).getByRole("button", { name: "Approve" }).click();
    await expect(row(checker, G).getByRole("alert")).toContainText("slug can't form a working URL");
    expect(await inList(request, "/test")).toBe(false);
    await sanity.delete(G);
  });

  test("12. HTML tags: no overrides, and all overrides", async ({ request }) => {
    const H = `e2e-h-${RUN}`;
    const slugH = `e2e-test-post-h-${RUN}`;
    const I = `e2e-i-${RUN}`;
    const slugI = `e2e-test-post-i-${RUN}`;
    await publish(baseDoc(H, slugH, { metaTitle: "", ogTitle: "  ", ogDescription: "", canonicalOverride: "", focusKeyword: "hidden-focus-kw-h" }));
    await publish(
      baseDoc(I, slugI, {
        metaTitle: "Custom meta title",
        ogTitle: "Custom share title",
        ogDescription: "Custom share description",
        canonicalOverride: "https://elsewhere.example/original",
        focusKeyword: "hidden-focus-kw-i",
        faq: [{ _key: "q", question: "A test question?", answer: "A test answer." }],
      }),
    );
    await reviews(checker);
    await row(checker, I).getByRole("link", { name: "Preview" }).click();
    await expect(checker.getByTestId("canonical")).toContainText("Points to another site");
    await expect(checker.getByText("hidden-focus-kw-i")).toBeVisible();
    await reviews(checker);
    await row(checker, H).getByRole("button", { name: "Approve" }).click();
    await expect(section(checker, "Approved").locator(`li[data-post-id="${H}"]`)).toBeVisible();
    await row(checker, I).getByRole("button", { name: "Approve" }).click();
    await expect(section(checker, "Approved").locator(`li[data-post-id="${I}"]`)).toBeVisible();

    const site = "https://www.juriscfo.com";
    const plain = await (await request.get(`/blog/${slugH}`)).text();
    const title = `[E2E TEST] ${slugH}`;
    expect(plain).toContain(`<title>${title}</title>`);
    expect(plain).toContain(`<link rel="canonical" href="${site}/blog/${slugH}"/>`);
    expect(plain).toContain(`<meta property="og:title" content="${title}"/>`);
    expect(plain).toContain(`<meta property="og:description" content="Test description for ${slugH}"/>`);
    expect(plain).toContain(`<meta name="twitter:title" content="${title}"/>`);
    expect(plain).toContain(`<meta name="description" content="Test description for ${slugH}"/>`);
    expect(plain).toContain('"@type":"Article"');
    expect(plain).toContain('"@type":"BreadcrumbList"');
    expect(plain).not.toContain('"@type":"FAQPage"');
    expect(plain).not.toContain("hidden-focus-kw-h");

    const full = await (await request.get(`/blog/${slugI}`)).text();
    expect(full).toContain("<title>Custom meta title</title>");
    expect(full).toContain('<link rel="canonical" href="https://elsewhere.example/original"/>');
    expect(full).toContain('<meta property="og:title" content="Custom share title"/>');
    expect(full).toContain('<meta property="og:description" content="Custom share description"/>');
    expect(full).toContain('<meta name="twitter:title" content="Custom share title"/>');
    expect(full).toContain('<meta name="twitter:description" content="Custom share description"/>');
    expect(full).toContain('"@type":"FAQPage"');
    expect(full).not.toContain("hidden-focus-kw-i");
    expect((full.match(/<h1[\s>]/g) ?? []).length).toBe(1);

    await sanity.delete(H);
    await sanity.delete(I);
  });

  test("14. every checker can sign in and approve", async ({ browser }) => {
    for (const email of CHECKERS) {
      const J = `e2e-j-${email.split("@")[0]}-${RUN}`;
      await publish(baseDoc(J, `e2e-test-${email.split("@")[0]}-${RUN}`));
      const page = await signIn(browser, email);
      await expect(page.getByRole("status")).toHaveCount(0);
      await row(page, J).getByRole("button", { name: "Approve" }).click();
      await expect(section(page, "Approved").locator(`li[data-post-id="${J}"]`)).toBeVisible();
      expect(await decision(J)).toMatchObject({ state: "APPROVED", decidedBy: email });
      await sanity.delete(J);
      await page.context().close();
    }
  });

  test("the audit table refuses UPDATE, DELETE and TRUNCATE", async () => {
    await expect(db.query(`UPDATE "ApprovalAudit" SET "actor" = 'x'`)).rejects.toThrow(/append-only/);
    await expect(db.query(`DELETE FROM "ApprovalAudit"`)).rejects.toThrow(/append-only/);
    await expect(db.query(`TRUNCATE "ApprovalAudit"`)).rejects.toThrow(/append-only/);
  });

  test("checker emails must be lower case, and removing a row takes effect with no redeploy", async ({ browser }) => {
    await expect(db.query(`INSERT INTO "BlogChecker" ("email") VALUES ('Mixed@Jurislpo.com')`)).rejects.toThrow(/lowercase/);
    await db.query(`INSERT INTO "BlogChecker" ("email") VALUES ($1)`, [NON_CHECKER]);
    const page = await signIn(browser, NON_CHECKER);
    await expect(page.getByRole("status")).toHaveCount(0);
    await db.query(`DELETE FROM "BlogChecker" WHERE "email" = $1`, [NON_CHECKER]);
    await reviews(page);
    await expect(page.getByRole("status")).toContainText("not a blog checker");
    await page.context().close();
  });

  test("Studio and review pages are noindex and have no analytics", async ({ request }) => {
    for (const path of ["/studio", "/admin/login"]) {
      const res = await request.get(path);
      expect(res.headers()["x-robots-tag"]).toContain("noindex");
      const html = await res.text();
      expect(html).toContain('name="robots"');
      expect(html).not.toContain("googletagmanager");
    }
    expect(await (await request.get("/blog")).text()).toContain("googletagmanager");
  });

  test("unmatched URLs return 404", async ({ request }) => {
    expect((await request.get("/no-such-page")).status()).toBe(404);
    expect((await request.get("/blog/no-such-post")).status()).toBe(404);
  });
});
