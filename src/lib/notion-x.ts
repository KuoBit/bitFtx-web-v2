// src/lib/notion-x.ts
import { NotionAPI } from "notion-client";
import { Client } from "@notionhq/client";
import type {
  QueryDatabaseResponse,
  PageObjectResponse,
  QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints";

const notionPublic = new NotionAPI(); // unofficial (recordMap)
const notionOfficial = new Client({ auth: process.env.NOTION_TOKEN });

export const NOTION_DB_ID = process.env.NOTION_DB_ID || process.env.NOTION_DATABASE_ID || "";

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

function isFullPage(p: QueryDatabaseResponse["results"][number]): p is PageObjectResponse {
  return p.object === "page" && "properties" in p;
}

// Safe extractors for common field names
function getText(rt?: { plain_text?: string }[]): string {
  return (rt?.map((r) => r.plain_text).join("") || "").trim();
}

export async function getPublishedMeta(): Promise<PostMeta[]> {
  const resp = await notionOfficial.databases.query({
    database_id: NOTION_DB_ID,
    filter: { property: "Published", checkbox: { equals: true } },
    sorts: [{ property: "Publish_Date", direction: "descending" }],
  } as Omit<QueryDatabaseParameters, "database_id"> & { database_id: string });

  return resp.results.filter(isFullPage).map((p) => {
    const pr = p.properties as any;
    const slug = getText(pr?.Slug?.rich_text || []);
    const title = getText(pr?.Title?.title || []) || "Untitled";
    const date = pr?.Publish_Date?.date?.start || p.created_time || "";
    const author =
      pr?.Author?.people?.[0]?.name ||
      getText(pr?.Author?.rich_text || []) ||
      null;

    const preview =
      getText(pr?.Preview?.rich_text || []) ||
      getText(pr?.Excerpt?.rich_text || []) ||
      "";

    // cover: prefer page.cover, otherwise first files/url prop named Cover/Hero
    let cover: string | null = null;
    if (p.cover) {
      cover =
        p.cover.type === "external" ? p.cover.external.url : p.cover.file?.url || null;
    } else {
      const f = pr?.Cover ?? pr?.Hero ?? null;
      if (f?.type === "files" && Array.isArray(f.files) && f.files.length) {
        const first = f.files[0];
        cover =
          first.type === "external" ? first.external?.url : first.file?.url || null;
      } else if (f?.type === "url") {
        cover = f.url || null;
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

export async function getRecordMap(pageId: string) {
  // Full content via unofficial API (react-notion-x)
  const recordMap = await notionPublic.getPage(pageId);

  // Optional: strip Notion internal “property_*” and collection wrappers (as you did before)
  const filteredBlocks = Object.fromEntries(
    Object.entries(recordMap.block || {}).filter(([_, blk]: any) => {
      const t = blk?.value?.type || "";
      return !(
        t.startsWith("property_") ||
        t === "collection_view_page" ||
        (t === "page" && blk?.value?.parent_table === "collection")
      );
    })
  );

  return { ...recordMap, block: filteredBlocks, collection: {}, collection_query: {}, collection_view: {}, schema: {} };
}
