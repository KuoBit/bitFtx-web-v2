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

// Notion property readers (flexible to different naming)
function getTitleProp(page: PageObjectResponse, nameA = "Title", nameB = "Name") {
  const propA = page.properties[nameA as keyof typeof page.properties];
  const propB = page.properties[nameB as keyof typeof page.properties];
  const p = (propA ?? propB) as PageObjectResponse["properties"][string] | undefined;
  if (p && p.type === "title") return rtToPlain(p.title);
  return "Untitled";
}

function getRichText(page: PageObjectResponse, key: string): string | undefined {
  const prop = page.properties[key as keyof typeof page.properties] as
    | PageObjectResponse["properties"][string]
    | undefined;
  if (prop && prop.type === "rich_text") {
    const txt = rtToPlain(prop.rich_text);
    return txt ? txt : undefined;
  }
  return undefined;
}

function getDate(page: PageObjectResponse, keyA = "PublishedAt", keyB = "Date"): string | undefined {
  const pa = page.properties[keyA as keyof typeof page.properties] as
    | PageObjectResponse["properties"][string]
    | undefined;
  const pb = page.properties[keyB as keyof typeof page.properties] as
    | PageObjectResponse["properties"][string]
    | undefined;
  const p = (pa ?? pb);
  if (p && p.type === "date") return p.date?.start ?? undefined;
  return undefined;
}

function getCheckbox(page: PageObjectResponse, key = "Published"): boolean | undefined {
  const prop = page.properties[key as keyof typeof page.properties] as
    | PageObjectResponse["properties"][string]
    | undefined;
  if (prop && prop.type === "checkbox") return prop.checkbox;
  return undefined;
}

function getMultiSelect(
  page: PageObjectResponse,
  key = "Tags"
): string[] {
  const prop = page.properties[key as keyof typeof page.properties] as
    | PageObjectResponse["properties"][string]
    | undefined;
  if (prop && prop.type === "multi_select") {
    return prop.multi_select.map((t) => t.name).filter(Boolean);
  }
  return [];
}

// ---------- Mappers ----------
function mapPost(page: PageObjectResponse): Post {
  const title = getTitleProp(page);
  const slugRaw = getRichText(page, "Slug");
  const date = getDate(page);
  const excerpt = getRichText(page, "Excerpt");
  const tags = getMultiSelect(page, "Tags");
  const cover = coverFrom(page);

  const slug = (slugRaw?.trim().toLowerCase() || page.id.replace(/-/g, "")) as string;

  return {
    id: page.id,
    slug,
    title,
    excerpt,
    date,
    tags,
    cover,
    notionUrl: page.url,
  };
}

// ---------- Public API ----------
export async function getPosts(): Promise<Post[]> {
  const res = await notion.databases.query({
    database_id: DB_ID,
    // If your DB has no "Published" checkbox, remove this filter:
    filter: { property: "Published", checkbox: { equals: true } } as any, // filter typing is very strict; safe to cast here
    sorts: [
      { property: "PublishedAt", direction: "descending" } as any,
      { property: "Date", direction: "descending" } as any,
    ],
    page_size: 50,
  });

  const pages = res.results
    .filter(isFullPage)
    // if a DB page is not published (or missing property), skip
    .filter((p) => getCheckbox(p, "Published") !== false);

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

    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return blocks;
}
