// /src/lib/notion.ts
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN! });
const DB_ID = process.env.NOTION_BLOG_DB!;

// ---- Types we use in the app ----
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

function rtToPlain(rt?: any[]): string {
  if (!rt) return "";
  return rt.map((r) => r?.plain_text ?? "").join("");
}

function coverFrom(page: any): string | null {
  const c = page.cover;
  if (!c) return null;
  if (c.type === "external") return c.external.url;
  if (c.type === "file") return c.file.url; // time-limited; page revalidates often
  return null;
}

function prop<T = any>(page: any, name: string): T | undefined {
  return page.properties?.[name];
}

// Map a Notion page to our Post model (flexible to property names)
function mapPost(page: any): Post {
  const titleProp = prop(page, "Title") ?? prop(page, "Name");
  const slugProp = prop(page, "Slug");
  const dateProp = prop(page, "PublishedAt") ?? prop(page, "Date");
  const excerptProp = prop(page, "Excerpt");
  const tagsProp = prop(page, "Tags");

  const title = rtToPlain(titleProp?.title) || "Untitled";
  const slug =
    (slugProp?.rich_text && rtToPlain(slugProp.rich_text).trim()) ||
    page.id.replace(/-/g, "");
  const date = dateProp?.date?.start ?? null;
  const excerpt = excerptProp?.rich_text?.length ? rtToPlain(excerptProp.rich_text) : undefined;

  const tags =
    tagsProp?.multi_select?.map((t: any) => t?.name).filter(Boolean) ?? [];

  return {
    id: page.id,
    slug,
    title,
    excerpt,
    date: date ?? undefined,
    tags,
    cover: coverFrom(page),
    notionUrl: page.url,
  };
}

export async function getPosts(): Promise<Post[]> {
  const res = await notion.databases.query({
    database_id: DB_ID,
    filter: {
      and: [
        // Use whichever property you had before; fallback to no filter if missing
        { property: "Published", checkbox: { equals: true } } as any,
      ],
    },
    sorts: [
      { property: "PublishedAt", direction: "descending" } as any,
      { property: "Date", direction: "descending" } as any,
    ],
    page_size: 50,
  });

  return res.results.map(mapPost);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  // Fast path: get all posts and find (keeps code simple & cached via revalidate)
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

// ---- Blocks (simple, covers common content) ----
export async function getBlocks(pageId: string) {
  const blocks: any[] = [];
  let cursor: string | undefined = undefined;

  do {
    const res = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 50,
    });
    blocks.push(...res.results);
    cursor = res.has_more ? res.next_cursor ?? undefined : undefined;
  } while (cursor);

  return blocks;
}
