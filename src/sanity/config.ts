import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { table } from "@sanity/table";
import { resolveDocumentActions } from "./documentActions";
import { dataset, projectId } from "./env";
import { post } from "./schemas/post";

/** Sanity is for writing only. Publish makes a post reviewable; a checker on
 *  /admin/blog-reviews makes it public. No Sanity workflow features are used. */
export default defineConfig({
  name: "default",
  title: "Juris CFO Blog",
  basePath: "/studio",
  // Studio throws on an empty id. The page shows a notice before it gets this far.
  projectId: projectId || "unconfigured",
  dataset,
  plugins: [structureTool(), table()],
  schema: { types: [post] },
  document: { actions: resolveDocumentActions },
});
