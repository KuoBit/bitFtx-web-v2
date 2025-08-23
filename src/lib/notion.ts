// src/lib/notion.ts
import { Client } from "@notionhq/client";
import type {
  QueryDatabaseParameters,
  QueryDatabaseResponse,
  PageObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

// If you store NOTION_TOKEN / NOTION_DB_ID in .env.local
const notion = new Client({ auth: process.env.NOTION_TOKEN });
export const NOTION_DB_ID = process.env.NOTION_DB_ID as string;

// ----- Types you use across the app -----
export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  publish_date: string | null; // ISO date (YYYY-MM-DD) or null
  tags: string[];
  author: string | null;
};

// ----- Type guards & helpers -----
function isFullPage(
  page: PageObjectResponse | PartialPageObjectResponse
): page is PageObjectResponse {
  return "properties" in page;
}

type PropertyMap = PageObjectResponse["properties"];

/** Safely get a "Title" property as string */
function getTitle(props: PropertyMap, key: string): string {
  const p = props[key];
  if (!p || p.type !== "title") return "";
  return p.title.map((r) => r.plain_text).join("");
}

/** Safely get a "Rich Text" property as string */
function getRichText(props: PropertyMap, key: string): string {
  const p = props[key];
  if (!p || p.type !== "rich_text") return "";
  return p.rich_text.map((r) => r.plain_text).join("");
}

/** Safely get a "Checkbox" property as boolean */
function getCheckbox(props: PropertyMap, key: string): boolean {
  const p = props[key];
  return !!(p && p.type === "checkbox" && p.checkbox === true);
}

/** Safely get a "Date" property as YYYY-MM-DD (start) or null */
function getDate(props: PropertyMap, key: string): string | null {
  const p = props[key];
  if (!p || p.type !== "date" || !p.date?.start) return null;
  return p.date.start;
}

/** Safely get a "Multi-select" property as string[] */
function getMultiSelect(props: PropertyMap, key: string): string[] {
  const p = props[key];
  if (!p || p.type !== "multi_select") return [];
  return p.multi_select.map((m) => m.name);
}

/** Safely get a "People" or "Rich Text" author as string (fallback to first person name) */
function getAuthor(props: PropertyMap, key: string): string | null {
  const p = props[key];
  if (!p) return null;

  if (p.type === "people" && p.people.length > 0) {
    // The API does not always include person name in a simple place; fallback to plain email if needed.
    const first = p.people[0];
    // name can be absent; you may enrich via Users API if you want.
    // @ts-expect-error: user.name is not typed in endpoints bundle, but often present at runtime.
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

/** Map a Notion page to your BlogPost shape */
export function pageToPost(page: PageObjectResponse): BlogPost {
  const props = page.properties;

  const title = getTitle(props, "Title");
  const slug =
    getRichText(props, "slug") || // if slug is rich_text
    getTitle(props, "slug"); // or sometimes teams make slug a title – handle both

  const published = getCheckbox(props, "published");
  const publish_date = getDate(props, "publish_date");
  const tags = getMultiSelect(props, "tags");
  const author = getAuthor(props, "Author");

  return {
    id: page.id,
    title,
    slug,
    published,
    publish_date,
    tags,
    author,
  };
}

// ----- Public API functions ----- //

export async function queryPosts(params: Omit<QueryDatabaseParameters, "database_id"> = {}) {
  const response: QueryDatabaseResponse = await notion.databases.query({
    database_id: NOTION_DB_ID,
    ...params,
  });

  // Only keep full pages and map
  const posts: BlogPost[] = response.results
    .filter(isFullPage)
    .map((p) => pageToPost(p));

  return posts;
}

export async function getAllPublishedPosts() {
  return queryPosts({
    filter: {
      and: [
        { property: "published", checkbox: { equals: true } },
      ],
    },
    sorts: [
      { property: "publish_date", direction: "descending" },
    ],
  });
}

export async function getPostBySlug(slug: string) {
  const results = await queryPosts({
    filter: {
      and: [
        {
          property: "slug",
          rich_text: { equals: slug },
        },
        { property: "published", checkbox: { equals: true } },
      ],
    },
    page_size: 1,
  });

  return results[0] ?? null;
}
