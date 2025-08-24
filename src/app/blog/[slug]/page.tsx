// /src/app/blog/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getBlocks, getPostBySlug, getPosts } from "@/lib/notion";
import NotionBlocks from "@/components/NotionBlocks";

// Refresh signed URLs & content every 5 minutes
export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts
    .filter((p) => p.slug) // guard against empty slugs
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: unknown) {
  const { params } = props as { params: { slug: string } };
  const post = await getPostBySlug(params.slug);
  return {
    title: post ? `${post.title} — BitFtx Blog` : "Post — BitFtx Blog",
    description: post?.excerpt ?? "BitFtx blog post",
    openGraph: post?.cover
      ? { images: [{ url: post.cover, width: 1200, height: 630 }] }
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
    return d;
  }
}

export default async function BlogPostPage(props: unknown) {
  const { params } = props as { params: { slug: string } };

  const post = await getPostBySlug(params.slug);
  if (!post) {
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

  const blocks = await getBlocks(post.id);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <article>
        <header className="mb-6">
          <div className="text-xs text-white/60">{fmtDate(post.date)}</div>
          <h1 className="mt-1 text-3xl font-semibold">{post.title}</h1>
          {post.excerpt ? <p className="mt-2 text-white/70">{post.excerpt}</p> : null}
          {post.tags?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </header>

        {post.cover ? (
          <div className="mb-8 overflow-hidden rounded-xl border border-white/10">
            <Image
              src={post.cover}
              alt={post.title}
              width={1200}
              height={630}
              className="h-auto w-full object-cover"
              priority
              unoptimized
            />
          </div>
        ) : null}

        <NotionBlocks blocks={blocks} />

        <footer className="mt-10 flex items-center justify-between text-sm text-white/60">
          <Link href="/blog" className="text-emerald-300 hover:text-emerald-200">
            ← Back to Blog
          </Link>
          <a
            href={post.notionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
            title="View on Notion"
          >
            View on Notion ↗
          </a>
        </footer>
      </article>
    </main>
  );
}
