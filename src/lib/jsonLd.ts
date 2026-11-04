/** Author text can contain "</script>"; JSON-LD must not be able to close its tag. */
export function safeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
