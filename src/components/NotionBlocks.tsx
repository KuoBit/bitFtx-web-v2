// /src/components/NotionBlocks.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type {
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

function rtToPlain(rt: RichTextItemResponse[] | undefined): string {
  if (!rt) return "";
  return rt.map((r) => r.plain_text ?? "").join("");
}

export default function NotionBlocks({ blocks }: { blocks: BlockObjectResponse[] }) {
  return (
    <div className="prose prose-invert max-w-none">
      {blocks.map((b) => {
        const t = b.type;

        if (t === "paragraph") {
          const text = b.paragraph.rich_text;
          return <p key={b.id}>{rtToPlain(text)}</p>;
        }

        if (t === "heading_1") {
          return <h2 key={b.id}>{rtToPlain(b.heading_1.rich_text)}</h2>;
        }
        if (t === "heading_2") {
          return <h3 key={b.id}>{rtToPlain(b.heading_2.rich_text)}</h3>;
        }
        if (t === "heading_3") {
          return <h4 key={b.id}>{rtToPlain(b.heading_3.rich_text)}</h4>;
        }

        if (t === "bulleted_list_item") {
          return <li key={b.id}>{rtToPlain(b.bulleted_list_item.rich_text)}</li>;
        }
        if (t === "numbered_list_item") {
          return <li key={b.id}>{rtToPlain(b.numbered_list_item.rich_text)}</li>;
        }

        if (t === "quote") {
          return <blockquote key={b.id}>{rtToPlain(b.quote.rich_text)}</blockquote>;
        }

        if (t === "code") {
          const lang = b.code.language ?? "text";
          const text = rtToPlain(b.code.rich_text);
          return (
            <pre key={b.id} className="rounded-lg border border-white/10 bg-black/40 p-4">
              <code className={`language-${lang}`}>{text}</code>
            </pre>
          );
        }

        if (t === "image") {
          const img = b.image;
          const url = img.type === "external" ? img.external.url : img.file?.url;
          const caption = rtToPlain(img.caption);
          if (!url) return <div key={b.id} />;
          return (
            <figure key={b.id} className="my-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={caption || "image"} className="rounded-lg" />
              {caption ? <figcaption className="mt-2 text-sm text-white/60">{caption}</figcaption> : null}
            </figure>
          );
        }

        if (t === "divider") {
          return <hr key={b.id} />;
        }

        if (t === "callout") {
          return (
            <div key={b.id} className="my-4 rounded-lg border border-white/10 bg-white/5 p-3 text-sm">
              {rtToPlain(b.callout.rich_text)}
            </div>
          );
        }

        // Fallback for text-capable blocks we didn't explicitly branch for
        const anyRichText =
          (t in b && (b as any)[t]?.rich_text) as RichTextItemResponse[] | undefined;
        const md = rtToPlain(anyRichText);
        if (md) {
          return (
            <ReactMarkdown key={b.id} remarkPlugins={[remarkGfm]}>
              {md}
            </ReactMarkdown>
          );
        }

        return <div key={b.id} />;
      })}
    </div>
  );
}
