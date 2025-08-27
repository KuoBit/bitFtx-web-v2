// src/app/ambassadors/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ambassadors — BitFtx",
  description:
    "Join the BitFtx Ambassador program. Grow the community, host events, and earn perks.",
  openGraph: {
    title: "Ambassadors — BitFtx",
    description:
      "Join the BitFtx Ambassador program. Grow the community, host events, and earn perks.",
    url: "https://bitftx.com/ambassadors",
    type: "website",
  },
};

const LAST_UPDATED = "2025-08-27";

const WHO = [
  "Crypto-native creators, community leaders, researchers, and meme lords.",
  "You run or moderate Telegram/Discord groups or host X Spaces.",
  "You can commit ~5–10 hrs/week to consistent, quality contributions.",
];

const RESPONSIBILITIES = [
  "Host or co-host monthly AMAs / X Spaces / workshops.",
  "Kickstart and moderate discussions on Telegram & Discord.",
  "Propose and help launch community-led markets and campaigns.",
  "Create short videos, threads, or guides that teach and convert.",
];

const PERKS = [
  "Early feature access & private roadmap syncs.",
  "Recognition: official role, profile highlight, and swag.",
  "Allowlist for select campaigns; performance-based rewards.",
  "Exclusive channels with the core team.",
];

const HOW_TO_APPLY = [
  "Name & handle(s) on X/Telegram/Discord",
  "Region & time zone",
  "Links to communities/content you run",
  "Why BitFtx? (2–3 lines)",
];

function mailtoApply() {
  const subject = encodeURIComponent("BitFtx Ambassador Application");
  const body = encodeURIComponent(
    [
      "Hi BitFtx Team,",
      "",
      "I’d like to apply for the Ambassador program.",
      "",
      `Name:`,
      `X / Telegram / Discord:`,
      `Region / Time zone:`,
      `Links (communities or content):`,
      "",
      `Why BitFtx (2–3 lines):`,
      "",
      "Thanks!",
    ].join("\n")
  );
  return `mailto:hr@bitftx.com?subject=${subject}&body=${body}`;
}

export default function AmbassadorsPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white">
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-8">
        <h1 className="text-4xl font-semibold tracking-tight">BitFtx Ambassadors</h1>
        <p className="mt-3 max-w-3xl text-white/70">
          Help build the global crypto prediction ecosystem. Ambassadors grow communities,
          host events, and create content that educates and converts — while earning
          recognition and rewards.
        </p>
        <div className="mt-2 text-xs text-white/50">Last updated: {LAST_UPDATED}</div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Who should apply</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-white/70">
              {WHO.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Responsibilities</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-white/70">
              {RESPONSIBILITIES.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Perks</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-white/70">
              {PERKS.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">How to apply</h2>
            <p className="mt-2 text-white/70">
              Email{" "}
              <a className="text-emerald-300 hover:text-emerald-200" href={mailtoApply()}>
                hr@bitftx.com
              </a>{" "}
              with the following:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-white/70">
              {HOW_TO_APPLY.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <a
              href={mailtoApply()}
              className="mt-4 inline-flex items-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400"
            >
              Apply via Email
            </a>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Ambassadors — BitFtx",
            url: "https://bitftx.com/ambassadors",
            potentialAction: {
              "@type": "ApplyAction",
              target: "mailto:hr@bitftx.com",
            },
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
