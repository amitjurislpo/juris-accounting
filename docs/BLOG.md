# Blog: how publishing works

Authors write in Sanity Studio. Nothing is public until a checker approves that exact
version on the site's own review page.

| | URL |
|---|---|
| Studio | `/studio` |
| Review page | `/admin/blog-reviews` |
| Admin login | `/admin/login` |
| Public blog | `/blog` |

## The rule

A Sanity post is public only if its latest approval is "approved" **and** was made at the
post's current Sanity revision (`_rev`), and it has a valid slug and no deletion request.
Any edit changes the revision, so the post leaves the site until it is approved again. If
the approval lookup fails, no Sanity post is shown. Static posts in `src/content/blogPosts`
don't go through this and always show.

## People

**Authors** are Sanity project members. Invite them at sanity.io/manage > the project >
Members > Invite. They log in at `/studio`. Sanity's Free plan offers only the Administrator
and Viewer roles, so on that plan authors must be **Administrators** (a Viewer can't write);
on a paid plan use **Editor**. An Administrator can delete posts outside the Studio and manage
tokens and members, but no Sanity role can approve a post: approval lives in this site's database.

**Checkers** need two things, both with the same lower-case email:

1. An admin account. To create one, or to reset a password:
   ```bash
   DATABASE_URL=... npm run admin:invite -- someone@jurislpo.com https://www.juriscfo.com
   ```
   This prints a one-time link, valid 7 days, where they choose their password.
2. A row in the checker table. No redeploy is needed either way:
   ```sql
   INSERT INTO "BlogChecker" ("email") VALUES ('someone@jurislpo.com');
   DELETE FROM "BlogChecker" WHERE "email" = 'someone@jurislpo.com';
   ```

An admin who isn't in the table sees the review page read-only. A Sanity role, even
administrator, gives no approval rights.

**Keep authors out of the checker table.** Sanity gives no reliable link between an author
and a site account, so this separation is what stops self-approval. It is a rule for people
to follow: nothing can enforce it per post.

## Lifecycle

| Author or checker does | Result |
|---|---|
| Author publishes | Waiting. Not public. |
| Checker approves | Live on the next request. Nothing is written to Sanity. |
| Author edits a live post | Waiting, and off the site within about 60 seconds. |
| Checker rejects | Published document deleted and a draft with the feedback created, in one Sanity transaction. |
| Sanity write fails on reject | Still off the site. Warning and "Send back to author" on the review page. |
| Author ticks "Request deletion", publishes | Off the site within about 60 seconds, marked on the review page. |
| Checker approves a deletion | Deleted from Sanity. If that fails: still off the site, with "Delete now". |
| Checker rejects a deletion | Back to the author as a draft. Untick and publish; needs a new approval. |

Publishing in the Studio clears old feedback, so it can't look current afterwards.

## Decisions I made that you may want to know

- **Slug clash:** a static post wins. A Sanity post using a static slug can't be approved, and the review page marks it.
- **Rejecting requires feedback,** so the author always learns why.
- **No Sanity CDN, for any read.** A lagging CDN could pair a fresh approval with an old revision and hide the post. Next's 60-second cache already limits reads.
- **Limit:** a project admin can still delete through sanity.io or the API; the Studio can't prevent that. The post leaves the list, page and sitemap within the cache window, and the queue at once. The audit history stays.
- **Limit:** after an author deletes a rejected draft, the row leaves "Rejected" only if `SANITY_API_READ_TOKEN` is set.
- **404s:** the blog routes sit outside the site's `loading.tsx` on purpose. A loading boundary starts the response early, turning a missing post into HTTP 200.

## Database and deployment

- `vercel.json` makes Vercel run `npm run vercel-build` (`scripts/vercel-build.sh`). The project has no build command override in its dashboard.
- Only production builds migrate, so a preview can't change a shared database. A failed migration fails the build and the current deployment stays live. A production build with no `DATABASE_URL` also fails, by design.
- Migrations need a direct or session connection. `DIRECT_URL` is used if set. Otherwise port 6543 is rewritten to 5432, only for that command.
- The first migration also seeds the checkers and their admin accounts, with `ON CONFLICT DO NOTHING`, so it is safe to run twice.
- This site had no database before, so the P3005 baselining problem doesn't apply as long as the database is new. Don't point it at a database that already has tables.
- `ApprovalAudit` is append-only: database triggers refuse UPDATE, DELETE and TRUNCATE.

## Tests

```bash
npm test                              # unit tests
sh scripts/test-workflow-local.sh     # whole workflow: local Postgres + fake Sanity
```

To run the same workflow against a deployment and the real Sanity project, with a clearly
separate test dataset if you can:

```bash
WORKFLOW_BASE_URL=https://... DATABASE_URL=... \
NEXT_PUBLIC_SANITY_PROJECT_ID=... NEXT_PUBLIC_SANITY_DATASET=... \
WORKFLOW_SANITY_TOKEN=<editor token> npm run test:workflow
```

This creates and deletes `e2e-*` posts titled `[E2E TEST]`, creates the admin account
`e2e-noncheck@jurislpo.com`, and **resets the passwords of all three checkers** while setting
them up, so re-invite them afterwards. Audit lines stay, because the table is append-only.
Scenario 7 is skipped there; to test it, remove the write token from a deployment.

## Studio fields

The form lists fields 1-20 from JurisLPO's `sanity/schemas/post.ts` in the same order, then
`subtitle`, `readTime` and `trending`, which only this site's pages display. Check for drift
with `npm run schema:compare -- <path to JurisLPO's post.ts>`.

- `workflowStatus` and `submittedBy` are read-only and unused: nothing writes them and the site
  never reads them. Writing to a published post would change its revision and cancel its approval.
- Category is free text. Text naming a site category ("payroll") joins that category; anything
  else gets its own filter button on `/blog`.
- A table's first row is shown as its header (`@sanity/table` has no header setting), unless the
  table has only one row.
- Nothing is shown for an empty optional field. Static posts keep their "Juris CFO team" byline.

## Costs

Everything can run on free plans. Limits as checked on 2026-11-04; confirm before relying on them.

- **Database:** Neon's Free plan: no card, 0.5 GB and 100 compute-hours a month per project. It
  sleeps after 5 idle minutes and wakes by itself. If the monthly limit is reached, it stops until
  the next cycle: Sanity posts leave the site (fail closed) and static posts keep working. Use
  its pooled connection as `DATABASE_URL` and its direct connection as `DIRECT_URL`.
- **Sanity:** Free plan: public dataset only, Administrator and Viewer member roles. In a public
  dataset anyone with the project ID can read published posts through Sanity's API, including ones
  not yet approved. Drafts stay private.
