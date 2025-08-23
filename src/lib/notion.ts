// src/lib/notion.ts
import { Client } from "@notionhq/client";
import type {
  QueryDatabaseParameters,
  QueryDatabaseResponse,
  PageObjectResponse,
  PartialPageObjectResponse,
  BlockObjectResponse,
  PartialBlockObjectResponse,
  ListBlockChildrenResponse,
} from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
export const NOTION_DB_ID = process.env.NOTION_DB_ID as string;

// --- Public shape used by your app ---
export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  publish_date?: string;        // ISO date or undefined
  date?: string;                // compat alias for components using post.date
  tags: string[];
  author: string | null;
  excerpt: string | null;
  cover: string | null;
  notionUrl: string;            // for "View on Notion"
};

// ---------- Type guards & utilities ----------
function isFullPage(
  page: PageObjectResponse | PartialPageObjectResponse
): page is PageObjectResponse {
  return "properties" in page;
}

type PropertyMap = PageObjectResponse["properties"];

function pickKey(props: PropertyMap, candidates: string[]): string | null {
  for (const k of candidates) {
    if (k in props) return k;
  }
  return null;
}

function getTitle(props: PropertyMap, keys: string | string[]): string {
  const key = Array.isArray(keys) ? pickKey(props, keys) : keys;
  if (!key) return "";
  const p = props[key];
  if (!p || p.type !== "title") return "";
  return p.title.map((r) => r.plain_text).join("");
}

function getRichText(props: PropertyMap, keys: string | string[]): string {
  const key = Array.isArray(keys) ? pickKey(props, keys) : keys;
  if (!key) return "";
  const p = props[key];
  if (!p || p.type !== "rich_text") return "";
  return p.rich_text.map((r) => r.plain_text).join("");
}

function getCheckbox(props: PropertyMap, keys: string | string[]): boolean {
  const key = Array.isArray(keys) ? pickKey(props, keys) : keys;
  if (!key) return false;
  const p = props[key];
  return !!(p && p.type === "checkbox" && p.checkbox === true);
}

function getDate(
  props: PropertyMap,
  keys: string | string[]
): string | undefined {
  const key = Array.isArray(keys) ? pickKey(props, keys) : keys;
  if (!key) return undefined;
  const p = props[key];
  if (!p || p.type !== "date" || !p.date?.start) return undefined;
  return p.date.start;
}

function getMultiSelect(props: PropertyMap, keys: string | string[]): string[] {
  const key = Array.isArray(keys) ? pickKey(props, keys) : keys;
  if (!key) return [];
  const p = props[key];
  if (!p || p.type !== "multi_select") return [];
  return p.multi_select.map((m) => m.name);
}

function getAuthor(props: PropertyMap, keys: string | string[]): string | null {
  const key = Array.isArray(keys) ? pickKey(props, keys) : keys;
  if (!key) return null;
  const p = props[key];
  if (!p) return null;

  if (p.type === "people" && p.people.length > 0) {
    const first = p.people[0];
    // Notion Users often include a runtime 'name' not typed in endpoints
    // @ts-expect-error runtime property from Users API
    return (first as unknown as { name?: string; email?: string }).name ?? null;
  }
  if (p.type === "rich_text") {
    const txt = p.rich_text.map((r) => r.plain_text).join("").trim();
    return txt || null;
  }
  if (p.type === "title") {
    const txt = p.title.map((r) => r.plain_text).join("").trim();
    return txt || null;
  }
  return null;
}

// --- Cover helpers ---
function getPageCoverUrl(page: PageObjectResponse): string | null {
  const c = page.cover;
  if (!c) return null;
  if (c.type === "external") return c.external.url ?? null;
  if (c.type === "file") return c.file.url ?? null;
  return null;
}
function getFilesFirstUrl(
  props: PropertyMap,
  keys: string | string[]
): string | null {
  const key = Array.isArray(keys) ? pickKey(props, keys) : keys;
  if (!key) return null;
  const p = props[key];
  if (!p || p.type !== "files" || !p.files.length) return null;
  const f = p.files[0];
  if (f.type === "file") return f.file?.url ?? null;
  if (f.type === "external") return f.external?.url ?? null;
  return null;
}
function getUrlProp(props: PropertyMap, keys: string | string[]): string | null {
  const key = Array.isArray(keys) ? pickKey(props, keys) : keys;
  if (!key) return null;
  const p = props[key];
  if (!p || p.type !== "url") return null;
  return p.url ?? null;
}

// ---------- Mapper ----------
export function pageToPost(page: PageObjectResponse): BlogPost {
  const props = page.properties;

  // Canonical fields (with soft casing fallbacks)
  const title = getTitle(props, ["Title", "title"]);
  const slug =
    getRichText(props, ["slug", "Slug"]) || getTitle(props, ["slug", "Slug"]);
  const published = getCheckbox(props, ["published", "Published"]);
  const publish_date = getDate(props, [
    "publish_date",
    "Publish Date",
    "Publish date",
    "Date",
  ]);
  const tags = getMultiSelect(props, ["tags", "Tags"]);
  const author = getAuthor(props, ["Author", "author"]);

  // Optional extras used by your pages
  const excerptTxt =
    getRichText(props, ["excerpt", "Excerpt", "summary", "Summary"]);
  const excerpt = excerptTxt ? excerptTxt.trim() : null;

  // Cover: page cover first, else property (files/url) under "cover"/"Cover"/"Hero"
  const coverFromPage = getPageCoverUrl(page);
  const coverFromProp =
    getFilesFirstUrl(props, ["cover", "Cover", "Hero", "hero"]) ||
    getUrlProp(props, ["cover", "Cover", "Hero", "hero"]);
  const cover = coverFromPage || coverFromProp;

  return {
    id: page.id,
    title,
    slug,
    published,
    publish_date,
    date: publish_date, // compatibility alias
    tags,
    author,
    excerpt,
    cover,
    notionUrl: page.url, // Notion workspace URL (works if page is shared/public)
  };
}

// ---------- Queries ----------
export async function queryPosts(
  params: Omit<QueryDatabaseParameters, "database_id"> = {}
) {
  const response: QueryDatabaseResponse = await notion.databases.query({
    database_id: NOTION_DB_ID,
    ...params,
  });
  return response.results.filter(isFullPage).map(pageToPost);
}

export async function getAllPublishedPosts() {
  return queryPosts({
    filter: { and: [{ property: "published", checkbox: { equals: true } }] },
    sorts: [{ property: "publish_date", direction: "descending" }],
  });
}

// Compatibility alias used by your pages
export async function getPosts() {
  return getAllPublishedPosts();
}

export async function getPostBySlug(slugValue: string) {
  const results = await queryPosts({
    filter: {
      and: [
        { property: "slug", rich_text: { equals: slugValue } },
        { property: "published", checkbox: { equals: true } },
      ],
    },
    page_size: 1,
  });
  return results[0] ?? null;
}

// ---------- Blocks (content) ----------
// Type guard to keep only full blocks
function isFullBlock(
  b: BlockObjectResponse | PartialBlockObjectResponse
): b is BlockObjectResponse {
  return (b as BlockObjectResponse).object === "block" && "type" in b;
}

export async function getBlocks(pageId: string): Promise<BlockObjectResponse[]> {
  const blocks: Array<BlockObjectResponse | PartialBlockObjectResponse> = [];
  let cursor: string | undefined = undefined;

  do {
    const resp: ListBlockChildrenResponse = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    });
    blocks.push(...resp.results);
    cursor = resp.has_more ? resp.next_cursor ?? undefined : undefined;
  } while (cursor);

  // Return only full blocks to satisfy NotionBlocks' prop types
  return blocks.filter(isFullBlock);
}
