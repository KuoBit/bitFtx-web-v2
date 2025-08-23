// /src/app/how-it-works/page.tsx
import Link from "next/link";

export const metadata = {
  title: "How It Works — BitFtx",
  description:
    "How BitFtx works: non-custodial prediction markets on BSC, market odds, settlement, and the role of the BFTX token.",
};

const UPDATED = "August 23, 2025";

export default function HowItWorksPage() {
  // Simple JSON-LD for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "How It Works — BitFtx",
    dateModified: UPDATED,
    publisher: { "@type": "Organization", name: "Kuobit Labs Pvt Ltd" },
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">How It Works</h1>
        <p className="mt-2 text-white/70">Last updated: {UPDATED}</p>
        <p className="mt-4 text-white/70">
          BitFtx is a <strong>non-custodial prediction exchange</strong> on{" "}
          <strong>BNB Smart Chain (BSC)</strong>. You connect a wallet, pick a market, take a
          position on an outcome, and smart contracts handle settlement at resolution time.
          Markets are denominated in <strong>BFTX</strong>, the platform’s default currency.
        </p>
      </header>

      {/* Quick nav */}
      <nav aria-label="Page sections" className="mb-10">
        <ul className="flex flex-wrap gap-2 text-sm">
          {[
            ["overview", "Overview"],
            ["concepts", "Core Concepts"],
            ["flow", "Trading Flow"],
            ["odds", "Odds & Pricing"],
            ["resolution", "Resolution & Oracles"],
            ["fees", "Fees & Costs"],
            ["token", "BFTX Token Utility"],
            ["network", "Network & Wallets"],
            ["safety", "Safety Notes"],
            ["faq", "FAQ & Resources"],
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

      <section id="overview" className="prose prose-invert mb-10">
        <h2>Overview</h2>
        <p>
          Prediction markets turn <em>opinions</em> into tradable positions. Each market has one or
          more outcomes (e.g., “YES / NO”). The live price of an outcome reflects its{" "}
          <em>implied probability</em>, shaped by supply/demand and available liquidity. At the
          resolution time, the verified outcome is paid out; losing shares are worth zero.
        </p>
      </section>

      <section id="concepts" className="prose prose-invert mb-10">
        <h2>Core Concepts</h2>
        <ul>
          <li>
            <strong>Markets:</strong> Questions with resolvable outcomes and a clear end time.
          </li>
          <li>
            <strong>Outcome Shares:</strong> Tokens that represent a claim on an outcome’s payout
            (e.g., YES or NO).
          </li>
          <li>
            <strong>Price = Probability:</strong> A price of 0.62 implies ~62% likelihood (subject
            to liquidity depth and spread).
          </li>
          <li>
            <strong>Liquidity:</strong> Funds available to trade against; more liquidity = tighter
            spreads and smoother fills.
          </li>
          <li>
            <strong>Settlement:</strong> When the market resolves, winning outcome shares redeem;
            losers go to zero.
          </li>
        </ul>
      </section>

      <section id="flow" className="prose prose-invert mb-10">
        <h2>Trading Flow</h2>
        <ol>
          <li>
            <strong>Connect wallet:</strong> Use a compatible EVM wallet on BSC. You control your
            keys; BitFtx never holds funds.
          </li>
          <li>
            <strong>Fund in BFTX:</strong> Markets are denominated in <strong>BFTX</strong>
            . (Other quote assets may be considered later.)
          </li>
          <li>
            <strong>Choose market &amp; side:</strong> Review the question, resolution source,
            and end time. Buy outcome shares you believe will win.
          </li>
          <li>
            <strong>Manage position:</strong> Close early, rebalance, or hold to resolution.
          </li>
          <li>
            <strong>Resolve &amp; redeem:</strong> When the result is final, winning shares pay
            out in BFTX automatically; losing shares are worthless.
          </li>
        </ol>

        {/* Simple swimlane/flow diagram */}
        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
          <FlowDiagram />
        </div>
      </section>

      <section id="odds" className="prose prose-invert mb-10">
        <h2>Odds &amp; Pricing</h2>
        <p>
          Live odds are displayed as prices and implied probabilities. BitFtx uses{" "}
          <strong>automated pricing</strong> to keep markets tradable without custodial order
          books. Prices update as traders buy or sell outcome shares against available liquidity.
          The sum of outcome probabilities is ~100% (minus any spread from depth).
        </p>
        <p>
          Example: If <em>YES</em> trades at <code>0.64</code> and <em>NO</em> at{" "}
          <code>0.36</code>, the market implies ~64% chance of YES. If more traders buy YES, its
          price rises (probability increases) and NO falls.
        </p>

        {/* Odds demo */}
        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
          <OddsDemo yes={0.64} no={0.36} />
        </div>
      </section>

      <section id="resolution" className="prose prose-invert mb-10">
        <h2>Resolution &amp; Oracles</h2>
        <ul>
          <li>
            <strong>Resolution source:</strong> Each market defines a clear source (e.g., exchange
            price at timestamp, official announcement, or on-chain event).
          </li>
          <li>
            <strong>Process:</strong> When the end time passes and the source is available, the
            market is resolved and payouts are enabled on-chain.
          </li>
          <li>
            <strong>Disputes:</strong> If ambiguity occurs, markets may follow a published dispute
            policy; final settlement follows the established rules.
          </li>
        </ul>
        <p className="text-white/60">
          We’ll publish resolution rules and any oracle contracts on{" "}
          <Link href="/transparency">Transparency</Link>.
        </p>
      </section>

      <section id="fees" className="prose prose-invert mb-10">
        <h2>Fees &amp; Costs</h2>
        <ul>
          <li>
            <strong>Trading fee:</strong> <span className="text-emerald-300">0%</span> protocol
            fee on trades.
          </li>
          <li>
            <strong>Network gas:</strong> You pay BSC gas fees to submit transactions (go directly
            to validators, not BitFtx).
          </li>
          <li>
            <strong>Creator fees:</strong> If market-creation fees or bounties are introduced, they
            will be disclosed in-app (currently TBA).
          </li>
        </ul>
      </section>

      <section id="token" className="prose prose-invert mb-10">
        <h2>BFTX Token Utility</h2>
        <ul>
          <li>
            <strong>Default market currency:</strong> Markets are denominated and settle in{" "}
            <strong>BFTX</strong> for consistent UX and tight loops between trading and rewards.
          </li>
          <li>
            <strong>Growth programs:</strong> Campaigns, referrals, and community incentives are
            funded from dedicated allocations (see{" "}
            <Link href="/tokenomics">Tokenomics</Link>).
          </li>
          <li>
            <strong>Governance (optional, phased):</strong> Parameter voting (e.g., budgets,
            categories, oracle lists) may be introduced over time.
          </li>
        </ul>
        <p className="text-white/60">
          Token details: fixed supply 1B BFTX on BSC, no minting, not upgradable, 0% transfer tax.
          Contract and proofs will be published on{" "}
          <Link href="/transparency">Transparency</Link> at TGE.
        </p>
      </section>

      <section id="network" className="prose prose-invert mb-10">
        <h2>Network &amp; Wallets</h2>
        <ul>
          <li>
            <strong>Chain:</strong> BNB Smart Chain (BSC). You’ll need BNB for gas and BFTX to
            trade BitFtx markets.
          </li>
          <li>
            <strong>Wallets:</strong> Any EVM wallet that supports BSC (browser extensions, mobile
            wallets via WalletConnect, etc.).
          </li>
          <li>
            <strong>Non-custodial:</strong> You keep your keys. BitFtx never asks for your seed
            phrase or private key.
          </li>
        </ul>
      </section>

      <section id="safety" className="prose prose-invert mb-10">
        <h2>Safety Notes</h2>
        <ul>
          <li>
            <strong>No admin traps:</strong> Token has <em>no</em> pausable/blacklist/tax logic; LP
            tokens will be locked and published.
          </li>
          <li>
            <strong>Verify links:</strong> Always use{" "}
            <Link href="/links">Official Links</Link> and double-check contract addresses.
          </li>
          <li>
            <strong>Approvals:</strong> Approve only what you need; periodically revoke unused
            allowances.
          </li>
          <li>
            <strong>Start small:</strong> Prediction markets are volatile. Only risk what you can
            afford to lose.
          </li>
        </ul>
        <p className="text-white/60">
          More guidance on <Link href="/safety">Safety</Link> and legal terms in{" "}
          <Link href="/legal/terms">Terms</Link>.
        </p>
      </section>

      <section id="faq" className="prose prose-invert">
        <h2>FAQ &amp; Resources</h2>
        <ul>
          <li>
            <Link href="/faq">FAQ</Link> — quick answers about odds, settlement, and collateral.
          </li>
          <li>
            <Link href="/tokenomics">Tokenomics</Link> — allocations, vesting, and launch plan.
          </li>
          <li>
            <Link href="/transparency">Transparency</Link> — contracts, audits, and proofs.
          </li>
          <li>
            <Link href="/roadmap">Roadmap</Link> — public milestones and timelines.
          </li>
        </ul>
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(jsonLd)}
      </script>
    </main>
  );
}

/* ============================
   Lightweight SVG components
   ============================ */

function OddsDemo({ yes, no }: { yes: number; no: number }) {
  const yesPct = Math.round(yes * 100);
  const noPct = Math.round(no * 100);
  return (
    <div>
      <div className="mb-2 text-sm text-white/70">
        Example market: <span className="text-white">Will BTC close above $100k in 2025?</span>
      </div>
      <div className="rounded-lg border border-white/10 bg-black/30 p-3">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-emerald-300">YES · {yes.toFixed(2)} ({yesPct}%)</span>
          <span className="text-white/60">NO · {no.toFixed(2)} ({noPct}%)</span>
        </div>
        <svg viewBox="0 0 100 8" className="w-full">
          <rect x="0" y="0" width={yesPct} height="8" fill="rgb(16,185,129)" />
          <rect x={yesPct} y="0" width={100 - yesPct} height="8" fill="rgba(255,255,255,0.25)" />
        </svg>
        <div className="mt-2 text-xs text-white/50">Implied probabilities update as people trade.</div>
      </div>
    </div>
  );
}

function FlowDiagram() {
  // Simple 4-step swimlane with icons
  const steps = [
    { label: "Connect wallet", hint: "You control keys" },
    { label: "Pick market", hint: "Review rules & source" },
    { label: "Trade outcome", hint: "Price ↔ probability" },
    { label: "Resolve & redeem", hint: "Winners paid in BFTX" },
  ] as const;

  return (
    <div className="grid gap-4 sm:grid-cols-4">
      {steps.map((s, i) => (
        <div key={i} className="rounded-lg border border-white/10 bg-black/30 p-3">
          <div className="mb-2 text-sm font-medium">{s.label}</div>
          <svg viewBox="0 0 64 32" className="mb-2 h-8 w-full">
            <circle cx="16" cy="16" r="6" fill={i === 0 ? "rgb(16,185,129)" : "rgba(255,255,255,0.3)"} />
            <rect x="28" y="12" width="20" height="8" rx="2" fill={i === 1 ? "rgb(16,185,129)" : "rgba(255,255,255,0.3)"} />
            <path d="M4 16 H60" stroke="rgba(255,255,255,0.15)" />
          </svg>
          <div className="text-xs text-white/60">{s.hint}</div>
        </div>
      ))}
    </div>
  );
}
