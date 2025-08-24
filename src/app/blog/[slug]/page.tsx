// src/app/blog/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import NotionXRenderer from "@/components/NotionXRenderer";
import { getMetaBySlug, getPublishedSlugs, getRecordMap } from "@/lib/notion-x";

// Refresh every 5 minutes (for signed file URLs)
export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getPublishedSlugs();
  return slugs.filter(Boolean).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const meta = await getMetaBySlug(params.slug);
  return {
    title: meta ? `${meta.title} — BitFtx Blog` : "Post — BitFtx Blog",
    description: meta?.preview || "BitFtx blog post",
    openGraph: meta?.cover
      ? { images: [{ url: meta.cover, width: 1200, height: 630 }] }
      : undefined,
  };
}

function fmtDate(d?: string) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return d || "";
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const meta = await getMetaBySlug(params.slug);
  if (!meta) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-semibold">Post not found</h1>
        <p className="mt-2 text-white/70">
          The post you’re looking for doesn’t exist. Go back to the{" "}
          <Link href="/blog" className="text-emerald-300 hover:text-emerald-200">
            Blog
          </Link>
          .
        </p>
      </main>
    );
  }

  const recordMap = await getRecordMap(meta.id);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <article>
        <header className="mb-6">
          <div className="text-xs text-white/60">{fmtDate(meta.date)}</div>
          <h1 className="mt-1 text-3xl font-semibold">{meta.title}</h1>
          {meta.preview ? <p className="mt-2 text-white/70">{meta.preview}</p> : null}
          {meta.author ? <div className="mt-1 text-white/60 text-sm">By {meta.author}</div> : null}
        </header>

        {meta.cover ? (
          <div className="mb-8 overflow-hidden rounded-xl border border-white/10">
            <Image
              src={meta.cover}
              alt={meta.title}
              width={1200}
              height={630}
              className="h-auto w-full object-cover"
              priority
              unoptimized
            />
          </div>
        ) : null}

        {/* Notion content */}
        <div className="prose prose-invert max-w-none">
          <NotionXRenderer recordMap={recordMap} />
        </div>

        <footer className="mt-10 flex items-center justify-between text-sm text-white/60">
          <Link href="/blog" className="text-emerald-300 hover:text-emerald-200">
            ← Back to Blog
          </Link>
        </footer>
      </article>
    </main>
  );
}
