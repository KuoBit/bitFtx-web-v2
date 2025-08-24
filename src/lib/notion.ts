// src/lib/notion.ts
import { Client } from "@notionhq/client";
import type {
  QueryDatabaseParameters,
  QueryDatabaseResponse,
  PageObjectResponse,
  PartialPageObjectResponse,
  BlockObjectResponse,
  PartialBlockObjectResponse,
  UserObjectResponse,
  PartialUserObjectResponse,
  GroupObjectResponse,
  DatabaseObjectResponse,
  PartialDatabaseObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
export const NOTION_DB_ID = process.env.NOTION_DB_ID as string;

// --- Public shape used by your app ---
export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  publish_date?: string; // ISO date or undefined
  date?: string;         // compat alias for components using post.date
  tags: string[];
  author: string | null;
  excerpt: string | null;
  cover: string | null;
  notionUrl: string;     // for "View on Notion"
};

// ---------- Type guards & utilities ----------
function isFullPage(
  v:
    | PageObjectResponse
    | PartialPageObjectResponse
    | DatabaseObjectResponse
    | PartialDatabaseObjectResponse
): v is PageObjectResponse {
  return v.object === "page" && "properties" in v;
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

// --- People/Author helpers ---
type AnyPerson = UserObjectResponse | PartialUserObjectResponse | GroupObjectResponse;

function isUserObject(
  u: AnyPerson
): u is UserObjectResponse | PartialUserObjectResponse {
  return u.object === "user";
}

function extractUserName(
  u: UserObjectResponse | PartialUserObjectResponse
): string | null {
  const maybeName = (u as { name?: string }).name;
  return typeof maybeName === "string" && !!maybeName ? maybeName : null;
}

function getAuthor(props: PropertyMap, keys: string | string[]): string | null {
  const key = Array.isArray(keys) ? pickKey(props, keys) : keys;
  if (!key) return null;
  const p = props[key];
  if (!p) return null;

  if (p.type === "people" && p.people.length > 0) {
    const first = p.people[0] as AnyPerson;
    if (isUserObject(first)) {
      const name = extractUserName(first);
      if (name) return name;
    }
    return null;
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

  // Exact DB names with light fallbacks
  const title = getTitle(props, ["Title", "title"]);
  const slug =
    getRichText(props, ["Slug", "slug"]) || getTitle(props, ["Slug", "slug"]);
  const published = getCheckbox(props, ["Published", "published"]);
  const publish_date = getDate(props, ["Publish_Date", "publish_date", "Date"]);
  const tags = getMultiSelect(props, ["Tags", "tags"]);
  const author = getAuthor(props, ["Author", "author"]);

  const excerptTxt =
    getRichText(props, ["excerpt", "Excerpt", "summary", "Summary"]);
  const excerpt = excerptTxt ? excerptTxt.trim() : null;

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
    date: publish_date, // alias
    tags,
    author,
    excerpt,
    cover,
    notionUrl: page.url,
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
    filter: { and: [{ property: "Published", checkbox: { equals: true } }] },
    sorts: [{ property: "Publish_Date", direction: "descending" }],
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
        { property: "Slug", rich_text: { equals: slugValue } },
        { property: "Published", checkbox: { equals: true } },
      ],
    },
    page_size: 1,
  });
  return results[0] ?? null;
}

// ---------- Blocks (content) ----------
function isFullBlock(
  b: BlockObjectResponse | PartialBlockObjectResponse
): b is BlockObjectResponse {
  return (b as BlockObjectResponse).object === "block" && "type" in b;
}

// --- Recursive blocks fetcher (returns blocks with children) ---
export type FullBlock = BlockObjectResponse & { children?: FullBlock[] };

async function listChildrenOnce(blockId: string) {
  const out: BlockObjectResponse[] = [];
  let cursor: string | undefined = undefined;
  do {
    const resp = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    });
    for (const b of resp.results) {
      if (isFullBlock(b)) out.push(b);
    }
    cursor = resp.has_more ? resp.next_cursor ?? undefined : undefined;
  } while (cursor);
  return out;
}

export async function getBlocks(pageId: string): Promise<FullBlock[]> {
  const top = await listChildrenOnce(pageId);

  async function hydrate(block: BlockObjectResponse): Promise<FullBlock> {
    let children: FullBlock[] | undefined;

    if (block.type === "synced_block" && block.synced_block.synced_from?.block_id) {
      const sourceChildren = await listChildrenOnce(block.synced_block.synced_from.block_id);
      children = await Promise.all(sourceChildren.map(hydrate));
    } else if (block.has_children) {
      const kids = await listChildrenOnce(block.id);
      children = await Promise.all(kids.map(hydrate));
    }

    return { ...(block as FullBlock), children };
  }

  return Promise.all(top.map(hydrate));
}
