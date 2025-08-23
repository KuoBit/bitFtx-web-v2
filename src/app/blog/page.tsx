// /src/app/blog/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/lib/notion";

export const metadata = {
  title: "Blog — BitFtx",
  description: "Updates, product notes, and announcements from BitFtx.",
};

// Revalidate Notion signed URLs every 5 minutes
export const revalidate = 300;

function fmtDate(d?: string) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  } catch {
    return d;
  }
}

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">Blog</h1>
        <p className="mt-2 text-white/70">Announcements and updates.</p>
      </header>

      {posts.length === 0 ? (
        <p className="text-white/60">No posts yet.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.id} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
              {p.cover ? (
                <Link href={`/blog/${p.slug}`}>
                  <Image
                    src={p.cover}
                    alt={p.title}
                    width={800}
                    height={480}
                    className="h-40 w-full object-cover"
                  />
                </Link>
              ) : null}
              <div className="p-4">
                <div className="text-xs text-white/60">{fmtDate(p.date)}</div>
                <h2 className="mt-1 text-lg font-medium">
                  <Link href={`/blog/${p.slug}`} className="hover:underline">
                    {p.title}
                  </Link>
                </h2>
                {p.excerpt ? (
                  <p className="mt-2 text-sm text-white/70 line-clamp-3">{p.excerpt}</p>
                ) : null}
                {p.tags?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/70">
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
