/** The Postgres schema named by `?schema=` in a connection string, or undefined (Prisma then
 *  uses "public"). Lets this site live in its own schema inside a shared database, the same
 *  way `prisma migrate deploy` reads it from the URL. */
export function schemaFromUrl(connectionString: string): string | undefined {
  try {
    const schema = new URL(connectionString).searchParams.get("schema")?.trim();
    return schema || undefined;
  } catch {
    return undefined;
  }
}
