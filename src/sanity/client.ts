import "server-only";

import { createClient, type ClientConfig } from "@sanity/client";
import { apiVersion, dataset, projectId, sanityConfigured } from "./env";

/**
 * Local end-to-end tests only: points the client at e2e/fake-sanity.mjs. Unset
 * everywhere else, including every Vercel environment.
 */
const testApiHost = process.env.SANITY_TEST_API_HOST?.trim();

/** Every read skips Sanity's CDN. A CDN read lagging a fresh publish would pair a
 *  new approval with an old revision and hide the post; Next's 60-second cache
 *  already keeps the public read rate to about one per minute. */
const base: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  ...(testApiHost ? { apiHost: testApiHost, useProjectHostname: false } : {}),
};

/** Public and review reads of published documents. Never sees drafts. */
export const readClient = sanityConfigured ? createClient({ ...base, perspective: "published" }) : null;

const readToken = process.env.SANITY_API_READ_TOKEN?.trim();

/** Review page only: can tell whether a rejected post's draft still exists. */
export const draftReadClient =
  sanityConfigured && readToken ? createClient({ ...base, perspective: "raw", token: readToken }) : null;

const writeToken = process.env.SANITY_API_WRITE_TOKEN?.trim();

/** Editor token, server-only, used only by lib/blog/studioWrite.ts. */
export const writeClient =
  sanityConfigured && writeToken ? createClient({ ...base, perspective: "raw", token: writeToken }) : null;
