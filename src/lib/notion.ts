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

  // Accept common variants of property names
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
function isValidationErrorForMissingProp(e: unknown) {
  return (
    typeof e === "object" &&
    e !== null &&
    "code" in e &&
    // @ts-ignore
    e.code === "validation_error" &&
    // @ts-ignore
    typeof e.message === "string" &&
    // @ts-ignore
    /Could not find property with name or id/i.test(e.message)
  );
}

async function queryMap(params: Omit<QueryDatabaseParameters, "database_id"> = {}) {
  const response: QueryDatabaseResponse = await notion.databases.query({
    database_id: NOTION_DB_ID,
    ...params,
  });
  return response.results.filter(isFullPage).map(pageToPost);
}

// Try several filter variants; skip those that 400 due to missing props.
async function tryQueryVariants(
  variants: Array<Omit<QueryDatabaseParameters, "database_id">>
) {
  for (const v of variants) {
    try {
      const rows = await queryMap(v);
      return rows;
    } catch (e) {
      if (isValidationErrorForMissingProp(e)) {
        // Try next variant
        continue;
      }
      throw e;
    }
  }
  // If all variants failed due to missing props, fetch all and filter client-side
  const all = await queryMap();
  return all;
}

export async function getAllPublishedPosts() {
  const publishKeys = ["Published", "published"];
  const variants = publishKeys.map((k) => ({
    filter: { and: [{ property: k as any, checkbox: { equals: true } }] },
    // avoid relying on a specific date prop for sorting
    sorts: [{ timestamp: "created_time" as const, direction: "descending" as const }],
  }));

  let rows = await tryQueryVariants(variants);
  // Client-side filter if we had to fall back
  rows = rows.filter((r) => r.published);
  // Sort latest first (stable even if no Publish_Date)
  rows.sort((a, b) => {
    const da = a.publish_date ? Date.parse(a.publish_date) : 0;
    const db = b.publish_date ? Date.parse(b.publish_date) : 0;
    return db - da;
  });
  return rows;
}

// Compatibility alias used by your pages
export async function getPosts() {
  return getAllPublishedPosts();
}

export async function getPostBySlug(slugValue: string) {
  const publishKeys = ["Published", "published"] as const;
  const slugKeys = ["Slug", "slug"] as const;

  const variants: Array<Omit<QueryDatabaseParameters, "database_id">> = [];
  for (const s of slugKeys) {
    for (const p of publishKeys) {
      variants.push({
        filter: {
          and: [
            { property: s as any, rich_text: { equals: slugValue } },
            { property: p as any, checkbox: { equals: true } },
          ],
        },
        page_size: 1,
      });
    }
    // also try without Published filter, in case DB has no Published column
    variants.push({
      filter: { and: [{ property: s as any, rich_text: { equals: slugValue } }] },
      page_size: 1,
    });
  }

  let rows = await tryQueryVariants(variants);
  if (rows.length > 0) return rows[0];

  // Last resort: fetch all, then find by slug client-side (case-insensitive)
  const all = await queryMap();
  const normalized = slugValue.trim().toLowerCase();
  const match =
    all.find((r) => (r.slug || "").trim().toLowerCase() === normalized && r.published) ??
    all.find((r) => (r.slug || "").trim().toLowerCase() === normalized);
  return match ?? null;
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

