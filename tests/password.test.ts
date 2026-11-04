import { describe, expect, it } from "vitest";
import { hashPassword, hashToken, newToken, verifyPassword } from "@/lib/admin/password";

describe("admin passwords", () => {
  it("verifies the right password only", async () => {
    const stored = await hashPassword("correct horse battery");
    expect(stored).not.toContain("correct");
    await expect(verifyPassword("correct horse battery", stored)).resolves.toBe(true);
    await expect(verifyPassword("wrong", stored)).resolves.toBe(false);
  });
  it("refuses an account with no password", async () => {
    await expect(verifyPassword("anything", null)).resolves.toBe(false);
  });
  it("makes distinct tokens and stores only hashes", () => {
    const token = newToken();
    expect(token).not.toBe(newToken());
    expect(hashToken(token)).toHaveLength(64);
    expect(hashToken(token)).not.toContain(token);
  });
});
