// src/app/press/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Press & Media Kit — BitFtx",
  description:
    "Press resources, brand guidelines, logos, colors, and media contacts for BitFtx.",
  openGraph: {
    title: "Press & Media Kit — BitFtx",
    description:
      "Press resources, brand guidelines, logos, colors, and media contacts for BitFtx.",
    url: "https://bitftx.com/press",
    type: "website",
  },
};

const LAST_UPDATED = "2025-08-27";

const COLORS = [
  { name: "BitFtx Emerald", value: "#34D399" },
  { name: "Jet Black", value: "#0B0B0C" },
  { name: "Slate", value: "#9CA3AF" },
  { name: "White", value: "#FFFFFF" },
];

const ASSETS = [
  {
    title: "Logo (SVG, dark)",
    url: "/media/bitftx-logo-dark.svg",
    note: "Preferred on light backgrounds.",
  },
  {
    title: "Logo (SVG, light)",
    url: "/media/bitftx-logo-light.svg",
    note: "Preferred on dark backgrounds.",
  },
  {
    title: "Icon (PNG 512×512)",
    url: "/media/bitftx-icon-512.png",
    note: "For avatars and small placements.",
  },
  {
    title: "Product screenshots (ZIP)",
    url: "/media/bitftx-screenshots.zip",
    note: "Homepage, markets, blog.",
  },
  {
    title: "Full media kit (ZIP)",
    url: "/media/bitftx-media-kit.zip",
    note: "Logos, colors, fonts, screenshots.",
  },
];

export default function PressPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-8">
        <h1 className="text-4xl font-semibold tracking-tight">Press & Media Kit</h1>
        <p className="mt-3 max-w-3xl text-white/70">
          Here’s everything you need to write about BitFtx — logos, colors, product screenshots, and
          brand guidelines. For interviews and quotes, reach us at{" "}
          <a className="text-emerald-300 hover:text-emerald-200" href="mailto:hello@bitftx.com">
            hello@bitftx.com
          </a>
          .
        </p>
        <div className="mt-2 text-xs text-white/50">Last updated: {LAST_UPDATED}</div>
      </section>

      {/* Boilerplate */}
      <section className="mx-auto max-w-5xl px-6 pb-12">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold">Boilerplate</h2>
          <p className="mt-2 text-white/70">
            BitFtx is building a global crypto prediction ecosystem — a simple, fast way to take
            positions on real-world questions and market outcomes. Powered by a vibrant community,
            transparent operations, and the BFTX token, BitFtx focuses on clarity, speed, and
            responsible growth.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="inline-flex items-center rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10"
            >
              Learn more →
            </Link>
            <Link
              href="/links"
              className="inline-flex items-center rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10"
            >
              Official links →
            </Link>
          </div>
        </div>
      </section>

      {/* Assets */}
      <section className="mx-auto max-w-5xl px-6 pb-12">
        <h2 className="text-2xl font-semibold">Brand assets</h2>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {ASSETS.map((a) => (
            <article
              key={a.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col"
            >
              <div className="font-semibold">{a.title}</div>
              <p className="mt-1 text-sm text-white/70">{a.note}</p>
              <div className="mt-4">
                <a
                  className="inline-flex items-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400"
                  href={a.url}
                >
                  Download
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Colors */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <h2 className="text-2xl font-semibold">Colors</h2>
        <div className="mt-4 grid gap-5 md:grid-cols-4">
          {COLORS.map((c) => (
            <div
              key={c.name}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="text-sm text-white/70">{c.name}</div>
              <div className="mt-2 h-16 w-full rounded-lg border border-white/10"
                   style={{ backgroundColor: c.value }} />
              <div className="mt-2 font-mono text-sm">{c.value}</div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-white/60">
          Please don’t stretch, skew, or recolor the logo. Leave enough padding (≥ the height of the
          “B” around the mark). Avoid busy photo backgrounds.
        </p>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Press & Media Kit — BitFtx",
            url: "https://bitftx.com/press",
            hasPart: ASSETS.map((a) => ({
              "@type": "MediaObject",
              name: a.title,
              contentUrl: `https://bitftx.com${a.url}`,
            })),
            about: {
              "@type": "Organization",
              name: "BitFtx",
              url: "https://bitftx.com",
            },
          }),
        }}
      />
    </main>
  );
}
