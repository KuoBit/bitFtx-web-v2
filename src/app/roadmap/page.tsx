// /src/app/roadmap/page.tsx

import Link from "next/link";

export const metadata = {
  title: "Roadmap — BitFtx",
  description:
    "Public roadmap for BitFtx: website launch, token re-deploy, listings, market making, and mobile apps.",
};

const UPDATED = "August 23, 2025";

// ---------- Types ----------
type Status = "done" | "up-next" | "planned" | "tba";
type Milestone = {
  title: string;
  status: Status;
  window?: string; // e.g., "Q4 2025", "Sep 2025", "TBA"
  note?: string;
  link?: string; // optional public page link
};

// ---------- Public-facing milestones ----------
const MILESTONES: Milestone[] = [
  {
    title: "Website V2 (staging) launched",
    status: "done",
    window: "Aug 2025",
    link: "/",
  },
  {
    title: "Public website launch",
    status: "up-next",
    window: "Sep 2025",
  },
  {
    title: "BFTX token re-deploy on BSC (fixed supply, no upgrades)",
    status: "planned",
    window: "Q4 2025",
  },
  {
    title: "Token launch (TGE) & transparency post (addresses, proofs)",
    status: "planned",
    window: "Q4 2025",
    link: "/transparency",
  },
  {
    title: "DEX listing (initial pairs: BFTX/WBNB, BFTX/USDT)",
    status: "planned",
    window: "Q4 2025",
  },
  {
    title: "Market making program live",
    status: "planned",
    window: "Post-listing (Q4 2025–Q1 2026)",
  },
  {
    title: "Mobile apps — iOS TestFlight",
    status: "planned",
    window: "Q4 2025",
  },
  {
    title: "Mobile apps — Android Beta",
    status: "planned",
    window: "Q4 2025",
  },
  {
    title: "Mobile apps — iOS App Store",
    status: "tba",
    window: "Q1 2026 (target)",
  },
  {
    title: "Mobile apps — Google Play",
    status: "tba",
    window: "Q1 2026 (target)",
  },
  {
    title: "CEX listings (tiered rollout)",
    status: "tba",
    window: "TBA",
  },
];

// ---------- Helpers ----------
function progress(items: Milestone[]) {
  const total = items.length;
  const done = items.filter((m) => m.status === "done").length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  return { total, done, pct };
}

function statusStyles(s: Status) {
  switch (s) {
    case "done":
      return {
        dot: "bg-emerald-400 ring-emerald-400/30",
        pill: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
        label: "Done",
      };
    case "up-next":
      return {
        dot: "bg-sky-400 ring-sky-400/30",
        pill: "bg-sky-500/15 text-sky-300 border-sky-400/30",
        label: "Up next",
      };
    case "planned":
      return {
        dot: "bg-white/40 ring-white/20",
        pill: "bg-white/5 text-white/70 border-white/10",
        label: "Planned",
      };
    case "tba":
      return {
        dot: "bg-white/20 ring-white/10",
        pill: "bg-white/5 text-white/50 border-white/10",
        label: "TBA",
      };
  }
}

// ---------- Page ----------
export default function RoadmapPage() {
  const p = progress(MILESTONES);

  // Simple JSON-LD (ItemList) for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "BitFtx Public Roadmap",
    dateModified: UPDATED,
    itemListElement: MILESTONES.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.title,
      description: m.window ?? "",
    })),
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">Roadmap</h1>
        <p className="mt-2 text-white/70">
          Last updated: {UPDATED}. High-level milestones only; targets may shift with audits,
          listings, and app review timelines.
        </p>
      </header>

      {/* Progress */}
      <section className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm text-white/70">
              Overall progress ({p.done}/{p.total})
            </div>
            <div className="mt-1 h-2 w-64 overflow-hidden rounded bg-white/10">
              <div
                className="h-2 bg-emerald-400"
                style={{ width: `${p.pct}%` }}
                aria-label={`Progress ${p.pct}%`}
              />
            </div>
          </div>
          <div className="text-xs text-white/60">
            We publish proofs on{" "}
            <Link href="/transparency" className="text-emerald-300 hover:text-emerald-200">
              Transparency
            </Link>{" "}
            at each milestone.
          </div>
        </div>
      </section>

      {/* Vertical timeline */}
      <ol className="relative ml-4 border-l border-white/10">
        {MILESTONES.map((m, idx) => {
          const s = statusStyles(m.status);
          return (
            <li key={idx} className="mb-6 ml-6">
              <span
                className={`absolute -left-3 mt-1 h-3 w-3 rounded-full ring ${s.dot}`}
                aria-hidden
              />
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${s.pill}`}>
                  {s.label}
                </span>
                <h3 className="text-base font-medium">{m.title}</h3>
              </div>
              <div className="mt-1 text-sm text-white/60">
                {m.window ? <span>Target: {m.window}</span> : <span>Target: TBA</span>}
                {m.link ? (
                  <>
                    {" "}
                    ·{" "}
                    <Link href={m.link} className="text-emerald-300 hover:text-emerald-200">
                      Learn more →
                    </Link>
                  </>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>

      {/* JSON-LD */}
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(jsonLd)}
      </script>

      <footer className="mt-8 text-sm text-white/60">
        For verified announcements and addresses, always use{" "}
        <Link href="/links" className="text-emerald-300 hover:text-emerald-200">
          Official Links
        </Link>
        .
      </footer>
    </main>
  );
}
