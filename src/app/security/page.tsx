// src/app/security/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security & Responsible Disclosure — BitFtx",
  description:
    "BitFtx security policy and responsible disclosure guidelines. Report vulnerabilities to security@bitftx.com.",
  openGraph: {
    title: "Security & Responsible Disclosure — BitFtx",
    description:
      "BitFtx security policy and responsible disclosure guidelines. Report vulnerabilities to security@bitftx.com.",
    url: "https://bitftx.com/security",
    type: "website",
  },
};

const LAST_UPDATED = "2025-08-27";

const SCOPE = [
  "bitftx.com primary web app and subdomains operated by BitFtx",
  "Public APIs and smart contracts published by BitFtx (once live)",
  "Official mobile/web clients published by BitFtx (once live)",
];

const OUT_OF_SCOPE = [
  "Third-party services and libraries we do not control",
  "Denial-of-Service (DoS), volumetric traffic, or spam",
  "Social engineering, phishing, or physical security",
  "Automated scans with no proven impact",
];

const RULES = [
  "Make a good-faith effort to avoid privacy violations, data destruction, and service disruption.",
  "Do not access or modify data that doesn’t belong to you.",
  "Give us a reasonable time to investigate and remediate before public disclosure.",
  "Do not use exploits to pivot, escalate, or exfiltrate beyond proof-of-concept.",
];

const SEVERITY = [
  { label: "Critical", example: "Draining funds, auth bypass, remote code execution", bounty: "TBA" },
  { label: "High", example: "Privilege escalation, significant data exposure", bounty: "TBA" },
  { label: "Medium", example: "Business logic flaw, CSRF with impact", bounty: "TBA" },
  { label: "Low", example: "Informational/debug issues without direct impact", bounty: "Thanks + swag" },
];

function mailtoReport() {
  const subject = encodeURIComponent("Security Report — BitFtx");
  const body = encodeURIComponent(
    [
      "Hi Security Team,",
      "",
      "Issue summary:",
      "-",
      "",
      "Steps to reproduce / PoC:",
      "-",
      "",
      "Impact assessment:",
      "-",
      "",
      "Your contact for follow-up:",
      "-",
    ].join("\n")
  );
  return `mailto:security@bitftx.com?subject=${subject}&body=${body}`;
}

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white">
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-8">
        <h1 className="text-4xl font-semibold tracking-tight">Security & Responsible Disclosure</h1>
        <p className="mt-3 max-w-3xl text-white/70">
          We value the security of our users and ecosystem. If you believe you’ve found a vulnerability,
          please report it responsibly. We’ll work with you to verify and fix issues quickly.
        </p>
        <div className="mt-2 text-xs text-white/50">Last updated: {LAST_UPDATED}</div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Scope</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-white/70">
              {SCOPE.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-white/60">
              For assets not owned by BitFtx, contact the respective vendor first.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Out of scope</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-white/70">
              {OUT_OF_SCOPE.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Rules of engagement</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-white/70">
              {RULES.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Severity & recognition</h2>
            <ul className="mt-2 space-y-2 text-white/70">
              {SEVERITY.map((s) => (
                <li key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-sm font-semibold">{s.label}</div>
                  <div className="text-sm">Example: {s.example}</div>
                  <div className="text-xs text-white/60">Recognition/Bounty: {s.bounty}</div>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-white/60">
              Bounty ranges will be announced alongside audits and smart-contract scope. Swag and public
              acknowledgments are available now for valid, helpful reports.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Report a vulnerability</h2>
          <p className="mt-2 text-white/70">
            Email{" "}
            <a className="text-emerald-300 hover:text-emerald-200" href={mailtoReport()}>
              security@bitftx.com
            </a>{" "}
            with a concise summary, impact, and reproducible steps. Please include links, screenshots,
            or proof-of-concept where relevant. We aim to acknowledge within 48 hours.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={mailtoReport()}
              className="inline-flex items-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400"
            >
              Email Security
            </a>
            <Link
              href="/safety"
              className="inline-flex items-center rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10"
            >
              Read Safety Guidelines
            </Link>
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
            name: "Security & Responsible Disclosure — BitFtx",
            url: "https://bitftx.com/security",
            potentialAction: {
              "@type": "ReportAction",
              target: "mailto:security@bitftx.com",
            },
            about: {
              "@type": "Organization",
              name: "BitFtx",
              url: "https://bitftx.com",
            },
            contactPoint: [
              {
                "@type": "ContactPoint",
                email: "security@bitftx.com",
                contactType: "security",
                availableLanguage: ["English"],
              },
            ],
          }),
        }}
      />
    </main>
  );
}
