import { describe, expect, it } from "vitest";
import { schemaFromUrl } from "../src/lib/dbSchema";

describe("schemaFromUrl", () => {
  it("reads ?schema= from a connection string", () => {
    expect(schemaFromUrl("postgresql://u:p@host:6543/postgres?sslmode=require&schema=juriscfo")).toBe("juriscfo");
  });
  it("is undefined when there is no schema, so Prisma keeps public", () => {
    expect(schemaFromUrl("postgresql://u:p@host:5432/neondb?sslmode=require")).toBeUndefined();
    expect(schemaFromUrl("postgresql://u:p@host:5432/neondb?schema=")).toBeUndefined();
  });
  it("is undefined for a string that is not a URL", () => {
    expect(schemaFromUrl("not a url")).toBeUndefined();
  });
});
