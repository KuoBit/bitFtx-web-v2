// src/lib/notion-x.ts
import { NotionAPI } from "notion-client";
import { Client } from "@notionhq/client";
import type {
  QueryDatabaseParameters,
  QueryDatabaseResponse,
  PageObjectResponse,
  PropertyItemObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import type { ExtendedRecordMap, Block } from "notion-types";

const notionPublic = new NotionAPI(); // unofficial (recordMap)
const notionOfficial = new Client({ auth: process.env.NOTION_TOKEN });

export const NOTION_DB_ID =
  process.env.NOTION_DB_ID || process.env.NOTION_DATABASE_ID || "";

// ---- Types
export type PostMeta = {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string | null;
  preview: string;
  cover?: string | null;
};

// ---------- Helpers for metadata extraction (typed, no any)
type PropertyMap = PageObjectResponse["properties"];

function pickKey(props: PropertyMap, candidates: string[]): string | null {
  for (const k of candidates) if (k in props) return k;
  return null;
}

function getTitle(props: PropertyMap, keys: string[]): string {
  const key = pickKey(props, keys);
  if (!key) return "";
  const p = props[key];
  if (!p || p.type !== "title") return "";
  return p.title.map((r) => r.plain_text).join("").trim();
}

function getRichText(props: PropertyMap, keys: string[]): string {
  const key = pickKey(props, keys);
  if (!key) return "";
  const p = props[key];
  if (!p || p.type !== "rich_text") return "";
  return p.rich_text.map((r) => r.plain_text).join("").trim();
}

function getCheckbox(props: PropertyMap, keys: string[]): boolean {
  const key = pickKey(props, keys);
  if (!key) return false;
  const p = props[key];
  return !!(p && p.type === "checkbox" && p.checkbox);
}

function getDate(props: PropertyMap, keys: string[]): string {
  const key = pickKey(props, keys);
  if (!key) return "";
  const p = props[key];
  if (!p || p.type !== "date") return "";
  return p.date?.start ?? "";
}

function getFirstPersonName(props: PropertyMap, keys: string[]): string | null {
  const key = pickKey(props, keys);
  if (!key) return null;
  const p = props[key];
  if (!p) return null;
  if (p.type === "people" && p.people.length) {
    const maybe = (p.people[0] as unknown as { name?: string }).name;
    if (typeof maybe === "string" && maybe.trim()) return maybe.trim();
  }
  if (p.type === "rich_text") {
    const t = p.rich_text.map((r) => r.plain_text).join("").trim();
    return t || null;
  }
  return null;
}

function isFullPage(
  r: QueryDatabaseResponse["results"][number]
): r is PageObjectResponse {
  return r.object === "page" && "properties" in r;
}

// ---------- Meta fetchers
export async function getPublishedMeta(): Promise<PostMeta[]> {
  const resp = await notionOfficial.databases.query({
    database_id: NOTION_DB_ID,
    filter: { property: "Published", checkbox: { equals: true } },
    sorts: [{ property: "Publish_Date", direction: "descending" }],
  } as Omit<QueryDatabaseParameters, "database_id"> & { database_id: string });

  return resp.results.filter(isFullPage).map((p) => {
    const props = p.properties;

    const slug = getRichText(props, ["Slug", "slug"]);
    const title = getTitle(props, ["Title", "title"]) || "Untitled";
    const date = getDate(props, ["Publish_Date", "publish_date", "Date"]) || p.created_time;
    const author = getFirstPersonName(props, ["Author", "author"]);
    const preview =
      getRichText(props, ["Preview", "preview"]) ||
      getRichText(props, ["Excerpt", "excerpt"]);

    // cover: prefer page.cover, otherwise first files/url prop named Cover/Hero
    let cover: string | null = null;
    if (p.cover) {
      cover =
        p.cover.type === "external"
          ? p.cover.external.url
          : p.cover.file?.url ?? null;
    } else {
      const coverKey = pickKey(props, ["Cover", "cover", "Hero", "hero"]);
      if (coverKey) {
        const prop = props[coverKey];
        if (prop.type === "files" && prop.files.length) {
          const f = prop.files[0];
          cover =
            f.type === "external" ? f.external?.url ?? null : f.file?.url ?? null;
        } else if (prop.type === "url") {
          cover = prop.url ?? null;
        }
      }
    }

    return { id: p.id, slug, title, date, author, preview, cover };
  });
}

export async function getPublishedSlugs(): Promise<string[]> {
  const rows = await getPublishedMeta();
  return rows.map((m) => m.slug).filter(Boolean);
}

export async function getMetaBySlug(slug: string): Promise<PostMeta | null> {
  const all = await getPublishedMeta();
  const hit = all.find((m) => m.slug === slug);
  return hit || null;
}

// ---------- Content (recordMap) via notion-client
export async function getRecordMap(pageId: string): Promise<ExtendedRecordMap> {
  const recordMap = (await notionPublic.getPage(pageId)) as ExtendedRecordMap;

  // Filter out Notion internal “property_*” & collection wrappers — fully typed, no `any`
  const entries = Object.entries(recordMap.block ?? {});
  const filtered = entries.filter(([, wrapper]) => {
    // wrapper is { role, value }, value is Block
    const value = (wrapper as { value?: Block }).value;
    const type = value?.type ?? "";
    const parentTable = (value as Extract<Block, { type: "page" }>)?.parent_table;

    const isInternal =
      type.startsWith("property_") ||
      type === "collection_view_page" ||
      (type === "page" && parentTable === "collection");

    return !isInternal;
  });

  return {
    ...recordMap,
    block: Object.fromEntries(filtered),
    collection: {},
    collection_query: {},
    collection_view: {},
    schema: {},
  };
}
