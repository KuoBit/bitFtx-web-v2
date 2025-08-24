// src/components/NotionBlocks.tsx
"use client";

import React from "react";
import type {
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

// Keep local structural type matching getBlocks()
export type FullBlock = BlockObjectResponse & { children?: FullBlock[] };

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
      return (
        <li className="ml-5 list-disc">
          <RichText richText={block.bulleted_list_item.rich_text} />
          {block.children && <List blocks={block.children} />}
        </li>
      );
    case "numbered_list_item":
      return (
        <li className="ml-5 list-decimal">
          <RichText richText={block.numbered_list_item.rich_text} />
          {block.children && <List blocks={block.children} />}
        </li>
      );
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

function List({ blocks }: { blocks: FullBlock[]; ordered?: boolean }) {
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
  return <div><List blocks={blocks} /></div>;
}
