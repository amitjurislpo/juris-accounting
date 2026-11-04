import "dotenv/config";
import { defineConfig } from "prisma/config";

// `env()` from prisma/config throws when unset, which would break `prisma
// generate` on builds with no database, so read it directly.
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: { url: process.env.DATABASE_URL ?? "" },
});
