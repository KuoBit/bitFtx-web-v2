// src/app/careers/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers — BitFtx",
  description:
    "Join BitFtx and help build a global crypto prediction ecosystem. Open roles in Marketing and Community.",
  openGraph: {
    title: "Careers — BitFtx",
    description:
      "Join BitFtx and help build a global crypto prediction ecosystem. Open roles in Marketing and Community.",
    url: "https://bitftx.com/careers",
    type: "website",
  },
};

type Job = {
  id: string;
  title: string;
  dept: "Marketing" | "Community";
  location: string;
  type: "Full-time" | "Contract" | "Part-time";
  mode: "Remote" | "Hybrid" | "Onsite";
  summary: string;
  responsibilities: string[];
  requirements: string[];
  posted: string; // ISO date
};

const TODAY = "2025-08-25";

const JOBS: Job[] = [
  {
    id: "marketing-lead-growth",
    title: "Marketing Lead — Growth & Performance",
    dept: "Marketing",
    location: "Remote-first (UK/Europe time zones preferred)",
    type: "Full-time",
    mode: "Remote",
    summary:
      "Own acquisition and activation across paid, social, influencers, and partnerships. Turn BitFtx into a crypto household name.",
    responsibilities: [
      "Own growth strategy across paid, social, and partnerships",
      "Plan and run ROI-positive campaigns on X (Twitter), Telegram, YouTube, Reddit",
      "Build creator/influencer funnels and referral loops",
      "Set up tracking, A/B tests, and dashboards; report weekly KPIs",
    ],
    requirements: [
      "3–6 years in high-growth marketing (crypto/fintech/web3 preferred)",
      "Strong with performance channels (X Ads, Google, influencers)",
      "Comfortable with analytics, attribution, and creative iteration",
      "Excellent written English; meme-savvy a plus",
    ],
    posted: TODAY,
  },
  {
    id: "performance-marketer",
    title: "Performance Marketer — Paid Social",
    dept: "Marketing",
    location: "Remote-first",
    type: "Contract",
    mode: "Remote",
    summary:
      "Hands-on campaign executor for paid social. You’ll launch, optimize, and scale ads with crisp creatives and sharp targeting.",
    responsibilities: [
      "Launch and optimize paid campaigns on X, Meta, and Reddit",
      "Test creatives, audiences, and landing page variants",
      "Own daily budgets, pacing, and performance reporting",
      "Collaborate with design for thumb-stopping creatives",
    ],
    requirements: [
      "2–4 years running paid social; crypto/web3 experience is a plus",
      "Proficient with tracking pixels, UTM discipline, and LTV/CPA thinking",
      "Can ideate and brief fast-turnaround creatives",
      "Comfort with spreadsheets and reporting cadence",
    ],
    posted: TODAY,
  },
  {
    id: "community-manager",
    title: "Community Manager — Telegram & X",
    dept: "Community",
    location: "Remote-first (EMEA/Asia time zones welcome)",
    type: "Full-time",
    mode: "Remote",
    summary:
      "Be the voice of BitFtx. You’ll grow and energize our Telegram & X communities, run events, and keep the vibes high.",
    responsibilities: [
      "Moderate Telegram & Discord; respond to user queries",
      "Plan AMAs, raids, contests, and meme drives with KPIs",
      "Spin up content with the marketing team; surface product feedback",
      "Define community guidelines and escalate issues tactfully",
    ],
    requirements: [
      "1–3 years in community or social roles (crypto-native preferred)",
      "Strong written English; can communicate crisply and positively",
      "Understands crypto culture, memes, and Telegram mechanics",
      "Comfort working some evenings/weekends during key pushes",
    ],
    posted: TODAY,
  },
];

function mailtoHref(job: Job) {
  const subject = encodeURIComponent(`Application: ${job.title} — ${job.dept}`);
  const body = encodeURIComponent(
    [
      `Hi BitFtx Team,`,
      ``,
      `I’d like to apply for the ${job.title} role.`,
      ``,
      `Name:`,
      `Location:`,
      `LinkedIn / X / Portfolio:`,
      `Notice Period (if any):`,
      ``,
      `Brief: (2–3 lines about why you're a fit)`,
      ``,
      `Thanks!`,
    ].join("\n")
  );
  return `mailto:hr@bitftx.com?subject=${subject}&body=${body}`;
}

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-10">
        <h1 className="text-4xl font-semibold tracking-tight">Careers at BitFtx</h1>
        <p className="mt-3 text-white/70 max-w-2xl">
          We’re building a global crypto prediction ecosystem. If you’re hungry, creative,
          and data-driven, come build with us.
        </p>
      </section>

      {/* Open roles */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-medium">Open roles</h2>
          <Link
            href="mailto:hr@bitftx.com?subject=General%20Application%20—%20BitFtx"
            className="text-emerald-300 hover:text-emerald-200"
          >
            Don’t see your role? Email us →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {JOBS.map((job) => (
            <article
              key={job.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/[0.08] transition"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/70">
                  {job.dept}
                </span>
              </div>
              <div className="mt-2 text-sm text-white/60">
                {job.location} · {job.mode} · {job.type}
              </div>
              <p className="mt-3 text-white/80">{job.summary}</p>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-white/80">Responsibilities</h4>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/70">
                  {job.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-white/80">Requirements</h4>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/70">
                  {job.requirements.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <a
                  href={mailtoHref(job)}
                  className="inline-flex items-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400"
                >
                  Apply via Email
                </a>
                <span className="text-xs text-white/50">Posted {job.posted}</span>
              </div>
            </article>
          ))}
        </div>

        {/* General applications */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-lg font-semibold">General applications</h3>
          <p className="mt-2 text-white/70">
            If you’re exceptional and don’t see your exact role here, send a short note with
            links to your work to{" "}
            <a className="text-emerald-300 hover:text-emerald-200" href="mailto:hr@bitftx.com">
              hr@bitftx.com
            </a>
            . Tell us how you can move the needle in the next 90 days.
          </p>
        </div>
      </section>

      {/* Structured data for SEO (JobPosting) */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            JOBS.map((job) => ({
              "@context": "https://schema.org",
              "@type": "JobPosting",
              title: job.title,
              description: `${job.summary}\n\nResponsibilities:\n- ${job.responsibilities.join(
                "\n- "
              )}\n\nRequirements:\n- ${job.requirements.join("\n- ")}`,
              datePosted: job.posted,
              employmentType: job.type,
              hiringOrganization: {
                "@type": "Organization",
                name: "BitFtx",
                sameAs: "https://bitftx.com",
              },
              jobLocationType: job.mode === "Remote" ? "TELECOMMUTE" : "ON_SITE",
              applicantLocationRequirements: {
                "@type": "Country",
                name: "Global",
              },
              directApply: true,
            })),
          ),
        }}
      />
    </main>
  );
}
