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
// Accept the full union that can appear in QueryDatabaseResponse.results
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
  return typeof maybeName === "string" && maybeName ? maybeName : null;
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
    getRichText(props, ["Slug", "slug"]) || getTitle(props, ["Slug", "slug"]); // if someone made slug a title in future
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
type FullBlock = BlockObjectResponse & { children?: FullBlock[] };

async function listChildrenOnce(blockId: string) {
  const out: BlockObjectResponse[] = [];
  let cursor: string | undefined = undefined;
  do {
    const resp = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    });
    // Only keep full blocks
    for (const b of resp.results) {
      if ((b as BlockObjectResponse).object === "block" && "type" in b) {
        out.push(b as BlockObjectResponse);
      }
    }
    cursor = resp.has_more ? resp.next_cursor ?? undefined : undefined;
  } while (cursor);
  return out;
}

// src/components/NotionBlocks.tsx
"use client";

import Image from "next/image";
import React from "react";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

// Match getBlocks return (adds children)
type FullBlock = BlockObjectResponse & { children?: FullBlock[] };

type Props = { blocks: FullBlock[] };

function RichText({ richText }: { richText: any[] }) {
  return (
    <>
      {richText?.map((t, i) => {
        const content = t.plain_text ?? "";
        let el: React.ReactNode = content;

        if (t.href) el = <a href={t.href} className="underline decoration-white/30 hover:decoration-white">{content}</a>;
        if (t.annotations?.code) el = <code className="rounded bg-white/10 px-1 py-0.5">{el}</code>;
        if (t.annotations?.bold) el = <strong>{el}</strong>;
        if (t.annotations?.italic) el = <em>{el}</em>;
        if (t.annotations?.underline) el = <span className="underline">{el}</span>;
        if (t.annotations?.strikethrough) el = <span className="line-through">{el}</span>;

        return <React.Fragment key={i}>{el}</React.Fragment>;
      })}
    </>
  );
}

function Block({ block }: { block: FullBlock }) {
  const { type } = block;

  switch (type) {
    case "paragraph": {
      const t = block.paragraph;
      if (!t?.rich_text?.length) return <div className="h-4" />;
      return <p className="mb-3 leading-7 text-white/90"><RichText richText={t.rich_text} /></p>;
    }
    case "heading_1":
      return <h1 className="mt-8 mb-4 text-3xl font-semibold"><RichText richText={block.heading_1.rich_text} /></h1>;
    case "heading_2":
      return <h2 className="mt-6 mb-3 text-2xl font-semibold"><RichText richText={block.heading_2.rich_text} /></h2>;
    case "heading_3":
      return <h3 className="mt-4 mb-2 text-xl font-semibold"><RichText richText={block.heading_3.rich_text} /></h3>;
    case "quote":
      return (
        <blockquote className="my-4 border-l-2 border-white/15 pl-4 text-white/80">
          <RichText richText={block.quote.rich_text} />
        </blockquote>
      );
    case "callout": {
      const c = block.callout;
      return (
        <div className="my-4 flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="select-none">{c.icon?.emoji ?? "💡"}</div>
          <div className="text-white/90"><RichText richText={c.rich_text} /></div>
        </div>
      );
    }
    case "bulleted_list_item":
      return <li className="ml-5 list-disc"><RichText richText={block.bulleted_list_item.rich_text} />{block.children && <List blocks={block.children} />}</li>;
    case "numbered_list_item":
      return <li className="ml-5 list-decimal"><RichText richText={block.numbered_list_item.rich_text} />{block.children && <List blocks={block.children} ordered /></li>;
    case "to_do":
      return (
        <div className="my-2 flex items-start gap-2">
          <input type="checkbox" disabled defaultChecked={block.to_do.checked} className="mt-1" />
          <div><RichText richText={block.to_do.rich_text} /></div>
        </div>
      );
    case "toggle":
      return (
        <details className="my-2 rounded-lg border border-white/10 p-3">
          <summary className="cursor-pointer font-medium"><RichText richText={block.toggle.rich_text} /></summary>
          {block.children && <div className="mt-3"><NotionBlocks blocks={block.children} /></div>}
        </details>
      );
    case "code":
      return (
        <pre className="my-4 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4">
          <code>{block.code.rich_text?.map((r) => r.plain_text).join("")}</code>
        </pre>
      );
    case "divider":
      return <hr className="my-6 border-white/10" />;
    case "image": {
      const img = block.image;
      const url = img.type === "external" ? img.external.url : img.file.url;
      const caption = img.caption?.map((r) => r.plain_text).join("");
      return (
        <figure className="my-6 overflow-hidden rounded-xl border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={caption || "image"} className="h-auto w-full object-cover" />
          {caption ? <figcaption className="p-2 text-center text-sm text-white/60">{caption}</figcaption> : null}
        </figure>
      );
    }
    case "embed":
      return (
        <div className="my-6 overflow-hidden rounded-xl border border-white/10">
          <iframe src={block.embed.url} className="aspect-video w-full" allowFullScreen />
        </div>
      );
    case "table": {
      const rows = block.children ?? [];
      return (
        <div className="my-6 overflow-x-auto">
          <table className="min-w-full border-collapse rounded-lg border border-white/10">
            <tbody>
              {rows.map((r) => {
                if (r.type !== "table_row") return null;
                return (
                  <tr key={r.id} className="border-b border-white/10">
                    {r.table_row.cells.map((cell, i) => (
                      <td key={i} className="px-3 py-2 align-top">
                        <RichText richText={cell} />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
    default:
      return null;
  }
}

function groupLists(blocks: FullBlock[]) {
  const out: Array<FullBlock | { type: "ul"; items: FullBlock[] } | { type: "ol"; items: FullBlock[] }> = [];
  let i = 0;
  while (i < blocks.length) {
    const b = blocks[i];
    if (b.type === "bulleted_list_item") {
      const group: FullBlock[] = [];
      while (i < blocks.length && blocks[i].type === "bulleted_list_item") {
        group.push(blocks[i] as FullBlock);
        i++;
      }
      out.push({ type: "ul", items: group });
      continue;
    }
    if (b.type === "numbered_list_item") {
      const group: FullBlock[] = [];
      while (i < blocks.length && blocks[i].type === "numbered_list_item") {
        group.push(blocks[i] as FullBlock);
        i++;
      }
      out.push({ type: "ol", items: group });
      continue;
    }
    out.push(b);
    i++;
  }
  return out;
}

function List({ blocks, ordered = false }: { blocks: FullBlock[]; ordered?: boolean }) {
  const grouped = groupLists(blocks);
  return (
    <>
      {grouped.map((g, idx) => {
        if ("type" in g && g.type === "ul") {
          return (
            <ul key={idx} className="my-2">
              {g.items.map((it) => <Block key={it.id} block={it} />)}
            </ul>
          );
        }
        if ("type" in g && g.type === "ol") {
          return (
            <ol key={idx} className="my-2">
              {g.items.map((it) => <Block key={it.id} block={it} />)}
            </ol>
          );
        }
        return <Block key={(g as FullBlock).id} block={g as FullBlock} />;
      })}
    </>
  );
}

export default function NotionBlocks({ blocks }: Props) {
  return <div>{<List blocks={blocks} />}</div>;
}


