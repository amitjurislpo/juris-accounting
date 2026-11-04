import { createHash, randomBytes, scrypt, timingSafeEqual } from "node:crypto";

const N = 2 ** 15;
const r = 8;
const p = 1;
const KEY_LENGTH = 64;
const MAX_MEM = 128 * N * r * 2;

function derive(password: string, salt: Buffer, n: number, rr: number, pp: number, length: number): Promise<Buffer> {
  return new Promise((resolve, reject) =>
    scrypt(password.normalize("NFKC"), salt, length, { N: n, r: rr, p: pp, maxmem: MAX_MEM }, (err, key) =>
      err ? reject(err) : resolve(key),
    ),
  );
}

/** Format: scrypt$N$r$p$salt$key (base64url). */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await derive(password, salt, N, r, p, KEY_LENGTH);
  return ["scrypt", N, r, p, salt.toString("base64url"), key.toString("base64url")].join("$");
}

export async function verifyPassword(password: string, stored: string | null | undefined): Promise<boolean> {
  // Same work whether or not the account has a password, so timing reveals nothing.
  const parts = stored?.split("$") ?? [];
  if (parts.length !== 6 || parts[0] !== "scrypt") {
    await derive(password, randomBytes(16), N, r, p, KEY_LENGTH);
    return false;
  }
  const expected = Buffer.from(parts[5], "base64url");
  const actual = await derive(password, Buffer.from(parts[4], "base64url"), +parts[1], +parts[2], +parts[3], expected.length);
  return timingSafeEqual(actual, expected);
}

export const newToken = () => randomBytes(32).toString("base64url");
export const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");
