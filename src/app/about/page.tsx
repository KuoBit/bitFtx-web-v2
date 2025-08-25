// src/app/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — BitFtx",
  description:
    "BitFtx is building a global crypto prediction ecosystem — markets on real-world questions, powered by the BFTX token and a vibrant community.",
  openGraph: {
    title: "About — BitFtx",
    description:
      "BitFtx is building a global crypto prediction ecosystem — markets on real-world questions, powered by the BFTX token and a vibrant community.",
    url: "https://bitftx.com/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-10">
        <h1 className="text-4xl font-semibold tracking-tight">About BitFtx</h1>
        <p className="mt-3 max-w-3xl text-white/70">
          We’re building a global crypto prediction ecosystem — a simple, fast way to
          take positions on real-world questions and market outcomes. Our mission is to
          make information markets mainstream: transparent, accessible, and fun.
        </p>
      </section>

      {/* What we’re building */}
      <section className="mx-auto max-w-5xl px-6 pb-14">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">Prediction Exchange</h3>
            <p className="mt-2 text-white/70">
              Trade “Yes/No” or outcome shares on crypto, tech, sports, and world events.
              Designed for speed, clarity, and real utility — not noise.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">BFTX Token</h3>
            <p className="mt-2 text-white/70">
              The BitFtx ecosystem token for fees, rewards, referrals, and future staking
              mechanics. Community earns BFTX via quests, airdrops, and contributions.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">Community & Transparency</h3>
            <p className="mt-2 text-white/70">
              We publish updates, ship in the open, and let the community influence what
              markets launch next. Signal over noise — always.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="mx-auto max-w-5xl px-6 pb-14">
        <h2 className="text-2xl font-semibold">Our Principles</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {[
            ["User First", "Latency, fees, and UX matter more than buzzwords."],
            ["Be Real", "Markets reflect reality — we focus on credible, verifiable outcomes."],
            ["Open by Default", "Roadmaps, token utilities, and changes are communicated clearly."],
            ["Community Wins", "Reward the people who build, moderate, and evangelize."],
            ["Security & Compliance", "We ship with care, protect users, and respect local laws."],
          ].map(([title, desc]) => (
            <li key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-lg font-semibold">{title}</div>
              <p className="mt-1 text-white/70">{desc}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Journey / Milestones */}
      <section className="mx-auto max-w-5xl px-6 pb-14">
        <h2 className="text-2xl font-semibold">The Journey</h2>
        <div className="mt-4 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-xs text-white/50">Phase 1</div>
            <div className="mt-1 font-medium">Community & Token</div>
            <p className="mt-2 text-white/70">
              Brand launch, socials, airdrop, referrals, and BFTX liquidity. First set of
              markets drafted and validated with the community.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-xs text-white/50">Phase 2</div>
            <div className="mt-1 font-medium">MVP Exchange</div>
            <p className="mt-2 text-white/70">
              Web app for trading event outcomes, wallet auth, fast quotes, and clear P&L.
              Progressive rollout with risk controls and market reviews.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-xs text-white/50">Phase 3</div>
            <div className="mt-1 font-medium">Scale & Partnerships</div>
            <p className="mt-2 text-white/70">
              Creator-led markets, deeper liquidity, analytics, and regional partnerships
              to expand responsibly.
            </p>
          </div>
        </div>
      </section>

      {/* Contact + Social */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold">Say Hello</h2>
          <p className="mt-2 text-white/70">
            Media or partnerships? We’d love to connect. For careers, check{" "}
            <Link href="/careers" className="text-emerald-300 hover:text-emerald-200">
              open roles
            </Link>
            .
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <div className="text-sm font-medium text-white/80">Email</div>
              <ul className="mt-1 text-white/70">
                <li>
                  General:{" "}
                  <a className="text-emerald-300 hover:text-emerald-200" href="mailto:hello@bitftx.com">
                    hello@bitftx.com
                  </a>
                </li>
                <li>
                  Careers:{" "}
                  <a className="text-emerald-300 hover:text-emerald-200" href="mailto:hr@bitftx.com">
                    hr@bitftx.com
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-medium text-white/80">Social</div>
              <ul className="mt-1 space-y-1 text-white/70">
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
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/careers"
              className="inline-flex items-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400"
            >
              We’re hiring →
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10"
            >
              Read the blog
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-xs text-white/50">
          Disclaimer: BitFtx is building in a rapidly evolving regulatory landscape.
          Access to certain features may vary by region. Nothing here is financial advice.
        </p>
      </section>

      {/* Organization JSON-LD for SEO */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "BitFtx",
            url: "https://bitftx.com",
            sameAs: [
              "https://x.com/BitFtxOfficial",
              "https://t.me/BitFtxOfficial",
              "https://discord.gg/bitftx",
            ],
            contactPoint: [
              {
                "@type": "ContactPoint",
                email: "hello@bitftx.com",
                contactType: "customer support",
                availableLanguage: ["English"],
              },
              {
                "@type": "ContactPoint",
                email: "hr@bitftx.com",
                contactType: "human resources",
                availableLanguage: ["English"],
              },
            ],
          }),
        }}
      />
    </main>
  );
}
