// /src/lib/notion.ts
import { Client } from "@notionhq/client";
import type {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  PageObjectResponse,
  PartialPageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_TOKEN! });
const DB_ID = process.env.NOTION_BLOG_DB!;

// ---------- Public types ----------
export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  date?: string;
  tags: string[];
  cover?: string | null;
  author?: string;
  notionUrl: string;
};

// ---------- Type guards / utils ----------
function isFullPage(
  p: PageObjectResponse | PartialPageObjectResponse
): p is PageObjectResponse {
  return (p as PageObjectResponse).object === "page" && "properties" in p;
}

function isFullBlock(
  b: BlockObjectResponse | PartialBlockObjectResponse
): b is BlockObjectResponse {
  return (b as BlockObjectResponse).object === "block" && "type" in b;
}

function rtToPlain(rt: RichTextItemResponse[] | undefined): string {
  if (!rt) return "";
  return rt.map((r) => r.plain_text ?? "").join("");
}

function coverFrom(page: PageObjectResponse): string | null {
  const c = page.cover;
  if (!c) return null;
  if (c.type === "external") return c.external.url;
  if (c.type === "file") return c.file.url; // time-limited; we revalidate the page
  return null;
}

// ----- Notion property readers (case-sensitive to your DB) -----
function getTitle(page: PageObjectResponse): string {
  const p = page.properties["Title"];
  if (p && p.type === "title") return rtToPlain(p.title) || "Untitled";
  return "Untitled";
}

function getRichText(page: PageObjectResponse, key: string): string | undefined {
  const prop = page.properties[key as keyof typeof page.properties];
  if (prop && typeof prop === "object" && "type" in prop && (prop as any).type === "rich_text") {
    const txt = rtToPlain((prop as any).rich_text as RichTextItemResponse[]);
    return txt || undefined;
  }
  return undefined;
}

function getDate(page: PageObjectResponse, key = "publish_date"): string | undefined {
  const prop = page.properties[key as keyof typeof page.properties];
  if (prop && typeof prop === "object" && "type" in prop && (prop as any).type === "date") {
    return (prop as any).date?.start ?? undefined;
  }
  return undefined;
}

function getCheckbox(page: PageObjectResponse, key = "published"): boolean | undefined {
  const prop = page.properties[key as keyof typeof page.properties];
  if (prop && typeof prop === "object" && "type" in prop && (prop as any).type === "checkbox") {
    return (prop as any).checkbox as boolean;
  }
  return undefined;
}

function getMultiSelect(page: PageObjectResponse, key = "tags"): string[] {
  const prop = page.properties[key as keyof typeof page.properties];
  if (prop && typeof prop === "object" && "type" in prop && (prop as any).type === "multi_select") {
    return ((prop as any).multi_select as { name: string }[]).map((t) => t.name).filter(Boolean);
  }
  return [];
}

function getAuthor(page: PageObjectResponse, key = "Author"): string | undefined {
  // Commonly a "people" property; if yours is rich_text, change to getRichText(page, "Author")
  const prop = page.properties[key as keyof typeof page.properties];
  if (prop && typeof prop === "object" && "type" in prop) {
    if ((prop as any).type === "people") {
      const people = (prop as any).people as Array<{ name?: string; person?: unknown }>;
      const names = people.map((p) => p?.name).filter(Boolean) as string[];
      return names.join(", ") || undefined;
    }
    if ((prop as any).type === "rich_text") {
      const txt = rtToPlain((prop as any).rich_text);
      return txt || undefined;
    }
  }
  return undefined;
}

// ---------- Mappers ----------
function mapPost(page: PageObjectResponse): Post {
  const title = getTitle(page);
  const slugRaw = getRichText(page, "slug"); // lower-case per your DB
  const date = getDate(page, "publish_date"); // lower-case per your DB
  const excerpt = getRichText(page, "excerpt"); // optional; if you have one
  const tags = getMultiSelect(page, "tags"); // lower-case per your DB
  const author = getAuthor(page, "Author"); // case-sensitive
  const cover = coverFrom(page);

  const slug = (slugRaw?.trim().toLowerCase() || page.id.replace(/-/g, "")) as string;

  return {
    id: page.id,
    slug,
    title,
    excerpt,
    date,
    tags,
    author,
    cover,
    notionUrl: page.url,
  };
}

// ---------- Public API ----------
export async function getPosts(): Promise<Post[]> {
  type QueryParams = Parameters<typeof notion.databases.query>[0];

  // typed filter/sorts for your exact property names
  const filter: NonNullable<QueryParams["filter"]> = {
    property: "published",
    checkbox: { equals: true },
  };

  const sorts: NonNullable<QueryParams["sorts"]> = [
    { property: "publish_date", direction: "descending" },
  ];

  const res = await notion.databases.query({
    database_id: DB_ID,
    filter,
    sorts,
    page_size: 50,
  });

  const pages = res.results
    .filter(isFullPage)
    .filter((p) => getCheckbox(p, "published") !== false);

  return pages.map(mapPost);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getBlocks(pageId: string): Promise<BlockObjectResponse[]> {
  const blocks: BlockObjectResponse[] = [];
  let cursor: string | undefined = undefined;

  do {
    const res = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 50,
    });

    res.results.forEach((b) => {
      if (isFullBlock(b)) blocks.push(b);
    });

    cursor = res.has_more ? res.next_cursor ?? undefined : undefined;
  } while (cursor);

  return blocks;
}
