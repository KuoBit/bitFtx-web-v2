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

// ----- App types -----
export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  publish_date: string | null;
  tags: string[];
  author: string | null;
};

// ----- Helpers -----
function isFullPage(
  page: PageObjectResponse | PartialPageObjectResponse
): page is PageObjectResponse {
  return "properties" in page;
}

type PropertyMap = PageObjectResponse["properties"];

function getTitle(props: PropertyMap, key: string): string {
  const p = props[key];
  if (!p || p.type !== "title") return "";
  return p.title.map((r) => r.plain_text).join("");
}

function getRichText(props: PropertyMap, key: string): string {
  const p = props[key];
  if (!p || p.type !== "rich_text") return "";
  return p.rich_text.map((r) => r.plain_text).join("");
}

function getCheckbox(props: PropertyMap, key: string): boolean {
  const p = props[key];
  return !!(p && p.type === "checkbox" && p.checkbox === true);
}

function getDate(props: PropertyMap, key: string): string | null {
  const p = props[key];
  if (!p || p.type !== "date" || !p.date?.start) return null;
  return p.date.start;
}

function getMultiSelect(props: PropertyMap, key: string): string[] {
  const p = props[key];
  if (!p || p.type !== "multi_select") return [];
  return p.multi_select.map((m) => m.name);
}

function getAuthor(props: PropertyMap, key: string): string | null {
  const p = props[key];
  if (!p) return null;

  if (p.type === "people" && p.people.length > 0) {
    const first = p.people[0];
    // name/email are not in the exported endpoint typings; allow at runtime
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

export function pageToPost(page: PageObjectResponse): BlogPost {
  const props = page.properties;

  const title = getTitle(props, "Title");
  const slug =
    getRichText(props, "slug") ||
    getTitle(props, "slug");

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

// ----- Queries -----
export async function queryPosts(
  params: Omit<QueryDatabaseParameters, "database_id"> = {}
) {
  const response: QueryDatabaseResponse = await notion.databases.query({
    database_id: NOTION_DB_ID,
    ...params,
  });

  const posts: BlogPost[] = response.results
    .filter(isFullPage)
    .map((p) => pageToPost(p));

  return posts;
}

export async function getAllPublishedPosts() {
  return queryPosts({
    filter: {
      and: [{ property: "published", checkbox: { equals: true } }],
    },
    sorts: [{ property: "publish_date", direction: "descending" }],
  });
}

// Compatibility alias for your pages
export async function getPosts() {
  return getAllPublishedPosts();
}

export async function getPostBySlug(slug: string) {
  const results = await queryPosts({
    filter: {
      and: [
        { property: "slug", rich_text: { equals: slug } },
        { property: "published", checkbox: { equals: true } },
      ],
    },
    page_size: 1,
  });

  return results[0] ?? null;
}

// ----- Blocks (for rendering page content) -----
export async function getBlocks(pageId: string) {
  const blocks: Array<BlockObjectResponse | PartialBlockObjectResponse> = [];
  let cursor: string | undefined = undefined;

  do {
    const resp: ListBlockChildrenResponse =
      await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
        page_size: 100,
      });

    blocks.push(...resp.results);
    cursor = resp.has_more ? resp.next_cursor ?? undefined : undefined;
  } while (cursor);

  return blocks;
}
