import { escapeHTML, toHTML, uriLooksSafe, type PortableTextHtmlComponents } from "@portabletext/to-html";

type ImageBlock = { url?: string | null; alt?: string | null; caption?: string | null; width?: number | null; height?: number | null };
type TableBlock = { rows?: { cells?: (string | null)[] | null }[] | null };

/** http, https, mailto, tel and relative links only. */
export function isSafeHref(href: unknown): href is string {
  return typeof href === "string" && href.trim() !== "" && uriLooksSafe(href);
}

const components: Partial<PortableTextHtmlComponents> = {
  block: {
    // A pasted H1 becomes an H2: the page's title is the only H1.
    h1: ({ children }) => `<h2>${children}</h2>`,
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href;
      if (!isSafeHref(href)) return children ?? "";
      const external = /^https?:\/\//i.test(href);
      return `<a href="${escapeHTML(href)}"${external ? ' rel="noopener noreferrer"' : ""}>${children}</a>`;
    },
  },
  types: {
    image: ({ value }: { value: ImageBlock }) => {
      if (!value?.url) return "";
      const size = value.width && value.height ? ` width="${Number(value.width)}" height="${Number(value.height)}"` : "";
      const img = `<img src="${escapeHTML(`${value.url}?w=1200&auto=format&fit=max`)}" alt="${escapeHTML(value.alt ?? "")}"${size} loading="lazy" />`;
      const caption = value.caption?.trim();
      return `<figure>${img}${caption ? `<figcaption>${escapeHTML(caption)}</figcaption>` : ""}</figure>`;
    },
    // @sanity/table has no header setting, so the first row of a longer table is the header.
    table: ({ value }: { value: TableBlock }) => {
      const rows = (value?.rows ?? []).map((row) => (row.cells ?? []).map((cell) => escapeHTML(cell ?? "")));
      if (rows.length === 0) return "";
      const line = (cells: string[], tag: "th" | "td") => `<tr>${cells.map((c) => `<${tag}>${c}</${tag}>`).join("")}</tr>`;
      if (rows.length === 1) return `<table><tbody>${line(rows[0], "td")}</tbody></table>`;
      const [first, ...rest] = rows;
      return `<table><thead>${line(first, "th")}</thead><tbody>${rest.map((r) => line(r, "td")).join("")}</tbody></table>`;
    },
  },
};

/** Body to the same HTML shape as the static posts, so `.blog-prose` and the table
 *  of contents work unchanged. All text is escaped by the renderer. */
export function portableTextToHtml(body: unknown[] | null | undefined): string {
  if (!Array.isArray(body) || body.length === 0) return "";
  return toHTML(body as Parameters<typeof toHTML>[0], { components, onMissingComponent: false });
}
