// /src/app/safety/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Safety — BitFtx",
  description:
    "Stay safe on BitFtx: non-custodial basics, wallet hygiene, phishing avoidance, approvals, contract verification, incidents and reporting.",
};

const UPDATED = "August 23, 2025";

export default function SafetyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">Safety</h1>
        <p className="mt-2 text-white/70">Last updated: {UPDATED}</p>
        <p className="mt-4 text-white/70">
          BitFtx is a <strong>non-custodial</strong> prediction exchange. You control your wallet and
          interact directly with smart contracts. This page explains how to use BitFtx safely,
          verify official resources, avoid scams, and report issues.
        </p>
      </header>

      {/* Quick nav */}
      <nav aria-label="Page sections" className="mb-10">
        <ul className="flex flex-wrap gap-2 text-sm">
          {[
            ["noncustodial", "1. Non-custodial basics"],
            ["verify", "2. Verify official links & contracts"],
            ["risks", "3. Common risks & how to avoid"],
            ["wallet", "4. Wallet hygiene checklist"],
            ["signing", "5. Signing safely (messages & tx)"],
            ["approvals", "6. On-chain approvals & revocation"],
            ["contracts", "7. Smart-contract risk & audits"],
            ["compliance", "8. Eligibility & compliance"],
            ["incidents", "9. Incidents & status"],
            ["reporting", "10. Report security issues"],
            ["resources", "11. Resources"],
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

      <section id="noncustodial" className="prose prose-invert mb-10">
        <h2>1. Non-custodial basics</h2>
        <ul>
          <li><strong>You control your keys.</strong> BitFtx never holds your funds or keys and will <em>never</em> ask for your seed phrase.</li>
          <li><strong>Transactions are final.</strong> Blockchain operations are immutable; review everything before approving.</li>
          <li><strong>Use trusted wallets.</strong> Keep wallet software up to date; prefer official app stores and verified extensions.</li>
        </ul>
        <p className="text-white/60">
          Learn more: <Link href="/legal/privacy">Privacy</Link>, <Link href="/legal/terms">Terms</Link>.
        </p>
      </section>

      <section id="verify" className="prose prose-invert mb-10">
        <h2>2. Verify official links &amp; contracts</h2>
        <ul>
          <li>Bookmark our <Link href="/links">Official Links</Link> page — it’s the single source of truth for socials and contract addresses.</li>
          <li>Always check the full domain: <code>bitftx.com</code> / <code>staging.bitftx.com</code>. Beware of look-alike domains and DM links.</li>
          <li>Before interacting with a token or market contract, confirm the address via <Link href="/transparency">Transparency</Link> or Official Links.</li>
        </ul>
      </section>

      <section id="risks" className="prose prose-invert mb-10">
        <h2>3. Common risks &amp; how to avoid</h2>
        <ul>
          <li><strong>Phishing.</strong> Fake sites, popups, and DMs that ask you to connect or sign. Only use links from the Official Links page.</li>
          <li><strong>Seed-phrase theft.</strong> No team member will ever ask for your seed or private key. Store it offline; never type it into a website.</li>
          <li><strong>Malicious approvals.</strong> Signing unlimited token approvals to unknown contracts can drain funds later. Limit approvals and revoke unused ones (see below).</li>
          <li><strong>Fake airdrops &amp; listings.</strong> Treat unannounced “claims” or “early listings” as scams until confirmed on Official Links.</li>
          <li><strong>Smart-contract bugs.</strong> Audits reduce risk but cannot eliminate it. Only risk what you can afford to lose.</li>
        </ul>
      </section>

      <section id="wallet" className="prose prose-invert mb-10">
        <h2>4. Wallet hygiene checklist</h2>
        <ul>
          <li>Prefer a <strong>hardware wallet</strong> for significant funds; keep a smaller hot wallet for daily use.</li>
          <li>Use a unique browser profile for crypto; disable unneeded extensions.</li>
          <li>Enable wallet <strong>auto-lock</strong> and set a strong password/PIN.</li>
          <li>Write your seed phrase on paper/steel; store offline in at least two secure locations.</li>
          <li>Turn on OS/browser security updates and use reputable antivirus where applicable.</li>
          <li>For shared devices, always <strong>lock or sign out</strong> after use.</li>
        </ul>
      </section>

      <section id="signing" className="prose prose-invert mb-10">
        <h2>5. Signing safely (messages &amp; transactions)</h2>
        <ul>
          <li><strong>Read prompts.</strong> Wallets show what you’re signing — check spender address, token, amount, and network.</li>
          <li><strong>Message signatures</strong> can prove wallet ownership; <strong>transaction signatures</strong> move funds or set permissions.</li>
          <li>If a signature looks unreadable, cancel and verify the request from the dApp UI first.</li>
          <li>When in doubt, <strong>reject</strong> and re-open using a verified link from <Link href="/links">Official Links</Link>.</li>
        </ul>
      </section>

      <section id="approvals" className="prose prose-invert mb-10">
        <h2>6. On-chain approvals &amp; revocation</h2>
        <p>
          Many ERC-20 tokens require a one-time <em>approval</em> to let a contract move tokens on your behalf.
          Use these guidelines:
        </p>
        <ul>
          <li><strong>Limit scope.</strong> Approve only the amount needed when possible, not unlimited allowances.</li>
          <li><strong>Review spenders.</strong> Confirm the <code>spender</code> address matches the official BitFtx contract or a verified integration.</li>
          <li><strong>Revoke unused approvals.</strong> Periodically review and revoke allowances you no longer need using your wallet or a reputable approval manager.</li>
        </ul>
      </section>

      <section id="contracts" className="prose prose-invert mb-10">
        <h2>7. Smart-contract risk &amp; audits</h2>
        <ul>
          <li>BitFtx contracts undergo security reviews and independent audits prior to major releases.</li>
          <li>Audit reports and contract addresses will be published on <Link href="/transparency">Transparency</Link>.</li>
          <li>Audits reduce but do not eliminate risk. Start with small amounts and scale cautiously.</li>
        </ul>
      </section>

      <section id="compliance" className="prose prose-invert mb-10">
        <h2>8. Eligibility &amp; compliance</h2>
        <ul>
          <li>Use of BitFtx may be restricted in certain jurisdictions or for sanctioned persons/entities.</li>
          <li>You’re responsible for following local laws, including financial/securities/derivatives/gaming rules that may apply to prediction markets.</li>
          <li>See <Link href="/legal/terms">Terms</Link> for details and <Link href="/links">Official Links</Link> for any updates.</li>
        </ul>
      </section>

      <section id="incidents" className="prose prose-invert mb-10">
        <h2>9. Incidents &amp; status</h2>
        <ul>
          <li>Service health, incidents, and maintenance are posted on the <Link href="/status">Status</Link> page.</li>
          <li>During an incident, rely on Status and <Link href="/links">Official Links</Link> for verified updates — avoid unverified DMs.</li>
        </ul>
      </section>

      <section id="reporting" className="prose prose-invert mb-10">
        <h2>10. Report security issues</h2>
        <p>
          If you believe you’ve found a vulnerability, please contact us responsibly. Do not publicly
          disclose until we confirm a fix or mitigation.
        </p>
        <ul>
          <li>Email:{" "}
            <a href="mailto:security@bitftx.com" className="text-emerald-300 hover:text-emerald-200">
              security@bitftx.com
            </a>
          </li>
          <li>Include clear reproduction steps, the affected component/contract, and potential impact.</li>
          <li>If sensitive, mention encryption preference in your first email; we’ll coordinate a secure channel.</li>
        </ul>
      </section>

      <section id="resources" className="prose prose-invert">
        <h2>11. Resources</h2>
        <ul>
          <li><Link href="/links">Official Links</Link> — verified socials and announcements</li>
          <li><Link href="/transparency">Transparency</Link> — audits, contracts, changelogs</li>
          <li><Link href="/legal/terms">Terms of Use</Link> — rules of the platform</li>
          <li><Link href="/legal/privacy">Privacy Policy</Link> — data practices</li>
          <li><Link href="/faq">FAQ</Link> — quick answers about markets, odds, and settlement</li>
        </ul>
      </section>

      {/* Optional JSON-LD */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Safety — BitFtx",
            dateModified: UPDATED,
            publisher: { "@type": "Organization", name: "Kuobit Labs Pvt Ltd" },
          }),
        }}
      />
    </main>
  );
}
