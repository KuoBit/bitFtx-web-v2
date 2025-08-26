// src/app/contact/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact — BitFtx",
  description:
    "Get in touch with the BitFtx team — general inquiries, partnerships, careers, security, and legal/privacy.",
  openGraph: {
    title: "Contact — BitFtx",
    description:
      "Get in touch with the BitFtx team — general inquiries, partnerships, careers, security, and legal/privacy.",
    url: "https://bitftx.com/contact",
    type: "website",
  },
};

const LAST_UPDATED = "2025-08-26";

const CONTACTS = [
  {
    title: "General",
    email: "hello@bitftx.com",
    summary: "Questions, feedback, media, or anything not listed below.",
    cta: "Email hello@bitftx.com",
  },
  {
    title: "Partnerships",
    email: "hello@bitftx.com",
    summary: "Creators, integrations, market sponsorships, exchanges, wallets.",
    cta: "Partner with us",
  },
  {
    title: "Careers",
    email: "hr@bitftx.com",
    summary:
      "Open roles in Marketing & Community. If you’re exceptional, write to us anyway.",
    cta: "Email hr@bitftx.com",
  },
  {
    title: "Security / Bug Bounty",
    email: "security@bitftx.com",
    summary:
      "Report vulnerabilities responsibly. Don’t disclose publicly until we confirm a fix/mitigation.",
    cta: "Email security@bitftx.com",
  },
  {
    title: "Legal & Privacy",
    email: "legal@bitftx.com",
    summary:
      "Terms, privacy, data rights, takedowns. For privacy requests, you can also use privacy@bitftx.com.",
    cta: "Email legal@bitftx.com",
  },
];

function mailto(subject: string, to: string) {
  const s = encodeURIComponent(subject);
  return `mailto:${to}?subject=${s}`;
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white">
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-8">
        <h1 className="text-4xl font-semibold tracking-tight">Contact BitFtx</h1>
        <p className="mt-3 max-w-3xl text-white/70">
          We’re easy to reach. Choose the lane that fits best, or just write to{" "}
          <a className="text-emerald-300 hover:text-emerald-200" href="mailto:hello@bitftx.com">
            hello@bitftx.com
          </a>
          .
        </p>
        <div className="mt-2 text-xs text-white/50">Last updated: {LAST_UPDATED}</div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid gap-5 md:grid-cols-2">
          {CONTACTS.map((c) => (
            <article
              key={c.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/[0.08] transition"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{c.title}</h2>
                <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/70">
                  {c.email}
                </span>
              </div>
              <p className="mt-2 text-white/70">{c.summary}</p>
              <div className="mt-4">
                <a
                  className="inline-flex items-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400"
                  href={mailto(`BitFtx — ${c.title}`, c.email)}
                >
                  {c.cta}
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-lg font-semibold">Official channels</h3>
          <p className="mt-2 text-white/70">
            Always verify links on our{" "}
            <Link href="/links" className="text-emerald-300 hover:text-emerald-200">
              Official Links
            </Link>{" "}
            page. Beware of DMs and look-alike domains.
          </p>
          <ul className="mt-3 space-y-1 text-white/70">
            <li>
              X (Twitter):{" "}
              <a
                className="text-emerald-300 hover:text-emerald-200"
                href="https://x.com/BitFtxOfficial"
                target="_blank"
                rel="noreferrer"
              >
                @BitFtxOfficial
              </a>
            </li>
            <li>
              Telegram:{" "}
              <a
                className="text-emerald-300 hover:text-emerald-200"
                href="https://t.me/BitFtxOfficial"
                target="_blank"
                rel="noreferrer"
              >
                t.me/BitFtxOfficial
              </a>
            </li>
            <li>
              Discord:{" "}
              <a
                className="text-emerald-300 hover:text-emerald-200"
                href="https://discord.gg/bitftx"
                target="_blank"
                rel="noreferrer"
              >
                discord.gg/bitftx
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* ContactPage + Organization contact points for SEO */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact — BitFtx",
            url: "https://bitftx.com/contact",
            mainEntity: {
              "@type": "Organization",
              name: "BitFtx",
              url: "https://bitftx.com",
              sameAs: [
                "https://x.com/BitFtxOfficial",
                "https://t.me/BitFtxOfficial",
                "https://discord.gg/bitftx",
              ],
              contactPoint: [
                { "@type": "ContactPoint", email: "hello@bitftx.com", contactType: "customer support", availableLanguage: ["English"] },
                { "@type": "ContactPoint", email: "hr@bitftx.com", contactType: "human resources", availableLanguage: ["English"] },
                { "@type": "ContactPoint", email: "security@bitftx.com", contactType: "security", availableLanguage: ["English"] },
                { "@type": "ContactPoint", email: "legal@bitftx.com", contactType: "legal", availableLanguage: ["English"] },
                { "@type": "ContactPoint", email: "privacy@bitftx.com", contactType: "privacy", availableLanguage: ["English"] },
              ],
            },
          }),
        }}
      />
    </main>
  );
}
