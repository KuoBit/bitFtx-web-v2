// /src/app/legal/privacy/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — BitFtx",
  description:
    "Privacy Policy for BitFtx by Kuobit Labs Pvt Ltd: how we collect, use, share, and protect data for the BitFtx prediction exchange.",
};

const UPDATED = "August 23, 2025";

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">Privacy Policy</h1>
        <p className="mt-2 text-white/70">Last updated: {UPDATED}</p>
        <p className="mt-4 text-white/70">
          This Privacy Policy explains how <strong>Kuobit Labs Pvt Ltd</strong> (“<strong>we</strong>,” “<strong>us</strong>,”
          “<strong>our</strong>”) collects, uses, discloses, and protects information in connection with the BitFtx
          prediction exchange (“<strong>BitFtx</strong>,” the “<strong>Service</strong>”). Please read this policy carefully. By
          accessing or using BitFtx, you agree to the practices described here.
        </p>
      </header>

      {/* Quick nav */}
      <nav aria-label="Page sections" className="mb-10">
        <ul className="flex flex-wrap gap-2 text-sm">
          {[
            ["summary", "Summary"],
            ["scope", "Scope & Controller"],
            ["data", "What We Collect"],
            ["use", "How We Use Data"],
            ["legal-bases", "Legal Bases"],
            ["share", "Sharing & Disclosures"],
            ["cookies", "Cookies & Similar Tech"],
            ["blockchain", "On-Chain & Immutable Data"],
            ["security", "Security"],
            ["retention", "Data Retention"],
            ["rights", "Your Rights & Choices"],
            ["intl", "International Transfers"],
            ["children", "Children’s Privacy"],
            ["changes", "Changes to this Policy"],
            ["contact", "Contact"],
          ].map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="inline-block rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/80 hover:bg-white/10"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="summary" className="prose prose-invert mb-10">
        <h2>Summary (at a glance)</h2>
        <ul>
          <li>We are a <strong>non-custodial</strong> prediction exchange: you connect a wallet; we do not hold your private keys.</li>
          <li>We process <strong>public blockchain data</strong> (wallet addresses, transactions) and <strong>basic technical data</strong> (logs, device info) to operate and secure the Service.</li>
          <li>We use <strong>cookies/analytics</strong> to improve performance, detect abuse, and understand usage. You can manage preferences.</li>
          <li>Some data is <strong>immutable on-chain</strong> and cannot be altered or deleted by us.</li>
          <li>We do <strong>not sell</strong> personal information. We may share with service providers, analytics, and as legally required.</li>
        </ul>
      </section>

      <section id="scope" className="prose prose-invert mb-10">
        <h2>Scope &amp; Controller</h2>
        <p>
          This Policy applies to the BitFtx website, app, smart-contract interfaces, and related
          services we operate (collectively, the “Service”). For purposes of data protection laws,
          the controller of personal data is <strong>Kuobit Labs Pvt Ltd</strong>. Some services (e.g., wallet
          providers, block explorers, or exchanges) are third-party and governed by their own
          policies.
        </p>
      </section>

      <section id="data" className="prose prose-invert mb-10">
        <h2>Information We Collect</h2>
        <h3>1) Information you provide</h3>
        <ul>
          <li><strong>Support &amp; communications:</strong> messages you send us (e.g., email, forms, community channels).</li>
          <li><strong>Optional KYC/verification (if enabled):</strong> when required by law or venue rules, we or partners may collect identity info for compliance. Details will be provided at the point of collection.</li>
        </ul>
        <h3>2) Wallet &amp; on-chain data</h3>
        <ul>
          <li><strong>Wallet address(es)</strong>, signatures, transactions, approvals, balances, and interactions with BitFtx smart contracts.</li>
          <li><strong>Public blockchain metadata</strong> derived from indexers and node providers.</li>
        </ul>
        <h3>3) Device &amp; usage data</h3>
        <ul>
          <li><strong>Log data:</strong> IP address, timestamps, user-agent, referrer, error diagnostics, performance metrics.</li>
          <li><strong>Device data:</strong> type, OS, browser; approximate location inferred from IP (city/country).</li>
          <li><strong>Product analytics:</strong> page views, clicks, session duration, feature usage (often aggregated/pseudonymized).</li>
        </ul>
        <h3>4) Cookies &amp; local storage</h3>
        <ul>
          <li><strong>Essential:</strong> security, session continuity, rate-limiting, preferences (e.g., reduced-motion).</li>
          <li><strong>Performance:</strong> analytics, load balancing.</li>
          <li><strong>Optional:</strong> marketing/attribution if/when used (off by default unless consented in relevant regions).</li>
        </ul>
      </section>

      <section id="use" className="prose prose-invert mb-10">
        <h2>How We Use Information</h2>
        <ul>
          <li><strong>Operate the Service:</strong> run core features (markets, pricing, settlement), maintain uptime and compatibility.</li>
          <li><strong>Security &amp; abuse prevention:</strong> fraud detection, DDoS mitigation, rate-limiting, incident response.</li>
          <li><strong>Compliance:</strong> comply with laws, court orders, sanctions; implement geofencing where required.</li>
          <li><strong>Improvements &amp; analytics:</strong> debug issues, measure performance, improve UX.</li>
          <li><strong>Communications:</strong> respond to support requests, share product updates (where permitted).</li>
          <li><strong>Programs:</strong> referrals, incentives, airdrops, or staking (if applicable) per published terms.</li>
        </ul>
      </section>

      <section id="legal-bases" className="prose prose-invert mb-10">
        <h2>Legal Bases (where applicable)</h2>
        <ul>
          <li><strong>Performance of contract</strong> (provide the Service you request).</li>
          <li><strong>Legitimate interests</strong> (operate, secure, improve BitFtx, prevent abuse).</li>
          <li><strong>Consent</strong> (e.g., non-essential cookies/marketing where required).</li>
          <li><strong>Legal obligation</strong> (e.g., tax, accounting, AML/KYC where applicable).</li>
        </ul>
      </section>

      <section id="share" className="prose prose-invert mb-10">
        <h2>Sharing &amp; Disclosures</h2>
        <ul>
          <li><strong>Service providers:</strong> hosting, security, analytics, customer support, email delivery, blockchain RPC/indexers.</li>
          <li><strong>Compliance &amp; legal:</strong> to comply with law, protect rights, investigate fraud or security incidents.</li>
          <li><strong>Program partners:</strong> referrals, incentives, or listings (as applicable).</li>
          <li><strong>Corporate events:</strong> merger, acquisition, financing, or asset sale (subject to this Policy or successor notice).</li>
        </ul>
        <p>We do <strong>not sell</strong> personal information.</p>
      </section>

      <section id="cookies" className="prose prose-invert mb-10">
        <h2>Cookies &amp; Similar Technologies</h2>
        <p>
          We use cookies, localStorage, and similar technologies to provide essential functionality,
          remember preferences, and perform analytics. You can manage preferences in your browser.
          Where required, we request consent for non-essential cookies. Learn more in{" "}
          <Link href="/legal/terms">Terms</Link>.
        </p>
      </section>

      <section id="blockchain" className="prose prose-invert mb-10">
        <h2>On-Chain &amp; Immutable Data</h2>
        <p>
          Interactions with public blockchains are by design <strong>transparent and immutable</strong>. Your wallet
          address, transactions, and balances may be publicly visible forever and indexable by
          third parties. We cannot edit or delete on-chain data. If you exercise a privacy right
          (e.g., deletion), we will remove or minimize <em>off-chain</em> records we control and, where
          possible, unlink or pseudonymize associations with your address.
        </p>
      </section>

      <section id="security" className="prose prose-invert mb-10">
        <h2>Security</h2>
        <p>
          We apply administrative, technical, and organizational measures appropriate to the risk,
          including access controls, encryption in transit, logging, and monitoring. No method of
          transmission or storage is 100% secure. <strong>We never request your private keys or seed phrase.</strong>
        </p>
      </section>

      <section id="retention" className="prose prose-invert mb-10">
        <h2>Data Retention</h2>
        <p>
          We keep personal data only as long as necessary for the purposes described in this Policy
          (e.g., to operate the Service, meet legal obligations, resolve disputes). Typical
          diagnostics/log data is retained for ~12–24 months, unless a longer period is required
          for security or legal reasons.
        </p>
      </section>

      <section id="rights" className="prose prose-invert mb-10">
        <h2>Your Rights &amp; Choices</h2>
        <p>
          Depending on where you live, you may have rights such as: access, correction, deletion,
          portability, restriction, objection, and withdrawal of consent. California residents may
          also have the right to opt-out of “sale”/“sharing” (as defined by CPRA) and to limit use of
          sensitive personal information. We honor requests to the extent required by law.
        </p>
        <p className="mt-2">
          To make a request, contact us at{" "}
          <a href="mailto:privacy@bitftx.com" className="text-emerald-300 hover:text-emerald-200">
            privacy@bitftx.com
          </a>{" "}
          (or use the options listed on{" "}
          <Link href="/links" className="text-emerald-300 hover:text-emerald-200">
            Official Links
          </Link>
          ). We may ask you to verify your request and prove control of a wallet address where
          relevant.
        </p>
      </section>

      <section id="intl" className="prose prose-invert mb-10">
        <h2>International Data Transfers</h2>
        <p>
          We may process and store information in countries other than your own. When transferring
          personal data internationally, we use appropriate safeguards (e.g., Standard Contractual
          Clauses where applicable) and implement measures to protect your data in line with this Policy.
        </p>
      </section>

      <section id="children" className="prose prose-invert mb-10">
        <h2>Children’s Privacy</h2>
        <p>
          BitFtx is intended for adults. We do not knowingly collect personal information from
          children under the age required by applicable law (e.g., 18). If you believe a child has
          provided us information, contact{" "}
          <a href="mailto:privacy@bitftx.com" className="text-emerald-300 hover:text-emerald-200">
            privacy@bitftx.com
          </a>{" "}
          to request deletion.
        </p>
      </section>

      <section id="changes" className="prose prose-invert mb-10">
        <h2>Changes to this Policy</h2>
        <p>
          We may update this Policy from time to time. We will post the updated version here and
          adjust the “Last updated” date. Significant changes may be announced via the Service or
          official channels.
        </p>
      </section>

      <section id="contact" className="prose prose-invert">
        <h2>Contact</h2>
        <p>
          For questions about this Policy, contact{" "}
          <a href="mailto:privacy@bitftx.com" className="text-emerald-300 hover:text-emerald-200">
            privacy@bitftx.com
          </a>
          . For verified channels, see{" "}
          <Link href="/links" className="text-emerald-300 hover:text-emerald-200">
            Official Links
          </Link>
          .
        </p>
        <p className="text-white/70">
          Controller: <strong>Kuobit Labs Pvt Ltd</strong>
        </p>
      </section>

      {/* Optional JSON-LD to help search engines identify the page */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Privacy Policy — BitFtx",
            dateModified: UPDATED,
            publisher: { "@type": "Organization", name: "Kuobit Labs Pvt Ltd" },
          }),
        }}
      />
    </main>
  );
}
