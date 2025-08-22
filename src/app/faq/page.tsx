// /src/app/faq/page.tsx
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "FAQ — BitFtx",
  description:
    "Answers about BitFtx: prediction engine, markets, odds, settlement, safety, token utility, listing, fees, and more.",
};

type QA = { q: string; a: ReactNode; a_text: string };
type Cat = { id: string; title: string; items: QA[] };

// -------------------------------
// FAQ CONTENT
// -------------------------------
const CATS: Cat[] = [
  {
    id: "overview",
    title: "Overview",
    items: [
      {
        q: "What is BitFtx?",
        a: (
          <p>
            BitFtx is a non-custodial prediction exchange. Traders buy and sell exposure to
            future events (YES/NO outcomes or similar). Prices reflect live odds; when the
            outcome is resolved, winning positions receive on-chain payouts automatically.
          </p>
        ),
        a_text:
          "BitFtx is a non-custodial prediction exchange. Traders buy and sell exposure to future events. Prices reflect live odds, and on-chain settlement pays winners automatically.",
      },
      {
        q: "How does a prediction market differ from traditional betting?",
        a: (
          <p>
            Markets trade continuously like crypto pairs: you can enter or exit positions before
            resolution, and pricing is set by supply/demand and liquidity curves instead of fixed
            house odds. There’s no central custody—settlement happens by smart contracts.
          </p>
        ),
        a_text:
          "Prediction markets trade continuously; prices move with supply/demand and liquidity curves. Settlement is by smart contracts rather than a centralized house.",
      },
      {
        q: "Is BitFtx non-custodial?",
        a: (
          <p>
            Yes. You connect a wallet and trade directly through smart contracts. Funds are not
            held by BitFtx. See <Link href="/safety">Safety</Link> and{" "}
            <Link href="/transparency">Transparency</Link> for details.
          </p>
        ),
        a_text:
          "Yes. You connect a wallet and interact with smart contracts; funds are not held by BitFtx.",
      },
      {
        q: "Is this financial advice?",
        a: (
          <p>
            No. Markets reflect community expectations and are volatile. Nothing on this site is
            investment, legal, or tax advice. Only trade what you can afford to risk.
          </p>
        ),
        a_text:
          "No. Nothing here is investment, legal, or tax advice. Markets are volatile; only trade what you can afford to risk.",
      },
    ],
  },

  {
    id: "wallets-accounts",
    title: "Wallets & Accounts",
    items: [
      {
        q: "Do I need an account?",
        a: (
          <p>
            You don’t create a custodial account. You use a compatible wallet to connect,
            authorize, and trade. Your positions are tied to your wallet address.
          </p>
        ),
        a_text:
          "No custodial account. Connect a compatible wallet; positions are tied to your address.",
      },
      {
        q: "Which wallets are supported?",
        a: (
          <p>
            We support widely used EVM wallets first (e.g., browser wallets and mobile wallets
            via WalletConnect). Additional networks and wallets will be announced on{" "}
            <Link href="/links">Official Links</Link>.
          </p>
        ),
        a_text:
          "We support common EVM wallets first; more networks and wallets will be announced on Official Links.",
      },
      {
        q: "Are there regional restrictions?",
        a: (
          <p>
            Access may be geofenced where required by law. You’re responsible for complying with
            your local regulations. See <Link href="/legal/terms">Terms</Link> for allowed and
            restricted jurisdictions.
          </p>
        ),
        a_text:
          "Access may be geofenced. You must comply with local law. See Terms for jurisdiction details.",
      },
    ],
  },

  {
    id: "markets-odds",
    title: "Markets & Odds",
    items: [
      {
        q: "How are odds represented?",
        a: (
          <p>
            YES prices are quoted between 0 and 1 (or 0–100%). A price of 0.64 suggests the
            market-implied probability for YES is ~64%. The price can change until the market is
            resolved.
          </p>
        ),
        a_text:
          "YES prices are 0–1 (0–100%). A price of 0.64 implies ~64% probability for YES. Prices update until resolution.",
      },
      {
        q: "How are prices determined?",
        a: (
          <p>
            Prices move with order flow and liquidity curves. BitFtx uses on-chain mechanisms
            designed to keep markets liquid while reflecting real-time demand for YES vs NO.
            Detailed mechanics will be documented on{" "}
            <Link href="/transparency">Transparency</Link>.
          </p>
        ),
        a_text:
          "Prices move with order flow and liquidity curves. Detailed mechanics are documented on the Transparency page.",
      },
      {
        q: "Can I exit my position before resolution?",
        a: (
          <p>
            Yes. As long as there’s liquidity or counter-orders, you can sell your position to
            lock in gains or cut losses before the market resolves.
          </p>
        ),
        a_text:
          "Yes. You can close positions before resolution if there’s liquidity or counter-orders.",
      },
      {
        q: "What types of markets are available?",
        a: (
          <p>
            Binary (YES/NO) markets are supported first. Time-bounded event markets (e.g., “by
            Q4”, “this month”) and additional categories (macro, crypto, protocol milestones)
            are prioritized. New market types will be announced on{" "}
            <Link href="/links">Official Links</Link>.
          </p>
        ),
        a_text:
          "Binary YES/NO markets first, with time-bounded events and multiple categories. New types announced on Official Links.",
      },
    ],
  },

  {
    id: "trading-fees",
    title: "Trading & Fees",
    items: [
      {
        q: "What are the trading fees?",
        a: (
          <p>
            Fees are kept low and help fund liquidity incentives, operations, and security
            reviews. Exact schedules are published on{" "}
            <Link href="/tokenomics">Tokenomics</Link>. Holding or staking the token may reduce
            fees.
          </p>
        ),
        a_text:
          "Fees are low and fund incentives, operations, and security. Exact schedules are on Tokenomics; holding/staking may reduce fees.",
      },
      {
        q: "Are there gas fees?",
        a: (
          <p>
            Yes. On-chain transactions incur network gas fees. BitFtx optimizes interactions to
            minimize signatures and gas where possible.
          </p>
        ),
        a_text:
          "Yes. On-chain transactions have gas fees. We optimize to reduce signatures and gas where possible.",
      },
      {
        q: "Is there slippage?",
        a: (
          <p>
            Like any market, large orders can move the price. You can set slippage controls when
            placing orders to avoid fills outside your tolerance.
          </p>
        ),
        a_text:
          "Large orders may move price. Use slippage controls to cap execution tolerance.",
      },
    ],
  },

  {
    id: "settlement-oracles",
    title: "Settlement & Oracles",
    items: [
      {
        q: "How are markets resolved?",
        a: (
          <p>
            Every market specifies a resolution source and rules (e.g., specific data feeds,
            official announcements, or oracle frameworks). After the resolution time, outcomes
            are verified and the smart contracts distribute payouts automatically.
          </p>
        ),
        a_text:
          "Each market has clear resolution sources and rules. After resolution time, verification occurs and contracts distribute payouts automatically.",
      },
      {
        q: "What happens if the result is disputed or unclear?",
        a: (
          <p>
            Each market includes dispute rules. If data is ambiguous, a formal dispute process is
            triggered per the market’s terms. Final settlement follows the established process,
            which prioritizes objectivity and user protection.
          </p>
        ),
        a_text:
          "Disputes follow the market’s rules. Ambiguity triggers a process that aims for objective, user-protective settlement.",
      },
      {
        q: "When do payouts occur?",
        a: (
          <p>
            After the market’s resolution is finalized. Settlement is on-chain and typically
            happens shortly after final verification.
          </p>
        ),
        a_text:
          "After resolution is finalized. On-chain settlement occurs shortly after verification.",
      },
    ],
  },

  {
    id: "risk-safety",
    title: "Risk & Safety",
    items: [
      {
        q: "What are the main risks?",
        a: (
          <p>
            Market risk (price volatility), liquidity risk (difficulty exiting), oracle risk
            (incorrect or delayed data), and smart-contract risk. Never trade more than you can
            afford to lose.
          </p>
        ),
        a_text:
          "Risks include price volatility, liquidity, oracle issues, and smart contract risk. Only trade what you can afford to lose.",
      },
      {
        q: "Has BitFtx been audited?",
        a: (
          <p>
            Smart contracts undergo security reviews and independent audits prior to major
            releases. Audit reports will be published on{" "}
            <Link href="/transparency">Transparency</Link>.
          </p>
        ),
        a_text:
          "Contracts undergo reviews and independent audits; reports will be published on the Transparency page.",
      },
      {
        q: "How do I verify official links and contract addresses?",
        a: (
          <p>
            Always use the <Link href="/links">Official Links</Link> page. Contract addresses and
            announcements are published there. Be cautious of look-alike domains and fake social
            accounts.
          </p>
        ),
        a_text:
          "Use the Official Links page to verify contract addresses and announcements. Beware of look-alike domains and fake socials.",
      },
    ],
  },

  {
    id: "token",
    title: "Token & Utility",
    items: [
      {
        q: "What is the BitFtx token used for?",
        a: (
          <p>
            The token is designed to power the protocol economy: potential <strong>fee
            reductions</strong> for holders/stakers, <strong>staking</strong> and liquidity
            incentives, and participation in <strong>governance</strong> and protocol growth
            programs. See <Link href="/tokenomics">Tokenomics</Link> for the latest design.
          </p>
        ),
        a_text:
          "Token utility includes fee reductions, staking/liquidity incentives, and governance participation. See Tokenomics for details.",
      },
      {
        q: "Is there staking?",
        a: (
          <p>
            Staking is planned to backstop liquidity, improve fee tiers, and align long-term
            incentives. Details (lockups, rewards, and risks) will be posted on{" "}
            <Link href="/tokenomics">Tokenomics</Link>.
          </p>
        ),
        a_text:
          "Staking is planned for liquidity support and fee tiers; full details will be on Tokenomics.",
      },
      {
        q: "Will there be an airdrop or referral program?",
        a: (
          <p>
            Airdrops and referrals may be used to bootstrap early adoption and reward
            contributions. If announced, eligibility and anti-sybil rules will be published on{" "}
            <Link href="/links">Official Links</Link>.
          </p>
        ),
        a_text:
          "Airdrops/referrals may occur; official rules will be announced on the Official Links page.",
      },
      {
        q: "When is the token generation event (TGE)?",
        a: (
          <p>
            The date and mechanics will be announced on <Link href="/links">Official Links</Link>.
            Beware of fake tokens and phishing—verify addresses before interacting.
          </p>
        ),
        a_text:
          "TGE timeline will be announced on Official Links. Beware of fake tokens; verify addresses.",
      },
      {
        q: "What is the token supply and distribution?",
        a: (
          <p>
            Final supply, allocations, and release schedules will be disclosed on{" "}
            <Link href="/tokenomics">Tokenomics</Link> prior to TGE. We aim for transparent,
            sustainable distribution with long-term alignment.
          </p>
        ),
        a_text:
          "Supply and allocations will be disclosed on Tokenomics before TGE with an emphasis on transparency and long-term alignment.",
      },
    ],
  },

  {
    id: "listing",
    title: "Listing & Exchanges",
    items: [
      {
        q: "Where will the token be listed?",
        a: (
          <p>
            Listings (DEX and CEX) will be announced on the <Link href="/links">Official Links</Link>{" "}
            page and social channels. Treat any unannounced listing as unverified.
          </p>
        ),
        a_text:
          "Listings will be announced on the Official Links page and social channels. Treat unannounced listings as unverified.",
      },
      {
        q: "What is the contract address?",
        a: (
          <p>
            The official contract address will be published on <Link href="/links">Official Links</Link>{" "}
            and <Link href="/transparency">Transparency</Link>. Do not trade tokens from addresses
            posted elsewhere.
          </p>
        ),
        a_text:
          "The official contract address will be published on Official Links and Transparency. Do not trust addresses from elsewhere.",
      },
      {
        q: "Are there region-specific listing limitations?",
        a: (
          <p>
            Exchange availability varies by jurisdiction. Always check the local compliance status
            of a venue before trading.
          </p>
        ),
        a_text:
          "Availability varies by jurisdiction. Check a venue’s local compliance status before trading.",
      },
    ],
  },

  {
    id: "developers",
    title: "Developers & Data",
    items: [
      {
        q: "Is there an API or SDK?",
        a: (
          <p>
            A lightweight read API and on-chain contract interfaces are planned. Starter examples,
            schemas, and rate limits will be documented on{" "}
            <Link href="/transparency">Transparency</Link>.
          </p>
        ),
        a_text:
          "A read API and on-chain contract interfaces are planned; details will be on the Transparency page.",
      },
      {
        q: "Can I build my own markets or integrations?",
        a: (
          <p>
            Yes—custom market creation, webhooks, and integration guides are planned. Follow{" "}
            <Link href="/links">Official Links</Link> for dev updates.
          </p>
        ),
        a_text:
          "Yes. Custom market creation and integration guides are planned. Updates will be on Official Links.",
      },
    ],
  },

  {
    id: "ops-legal",
    title: "Operations, Legal & Support",
    items: [
      {
        q: "Where can I report a bug or security issue?",
        a: (
          <p>
            Please use the channels listed on <Link href="/links">Official Links</Link>. For
            security-sensitive disclosures, use the dedicated contact there.
          </p>
        ),
        a_text:
          "Report issues via Official Links; use the security contact for sensitive disclosures.",
      },
      {
        q: "What’s the status page?",
        a: (
          <p>
            Real-time service health and incident history are available on{" "}
            <Link href="/status">Status</Link>.
          </p>
        ),
        a_text: "Service health and incidents are on the Status page.",
      },
      {
        q: "Where can I find legal terms and privacy policy?",
        a: (
          <p>
            See <Link href="/legal/terms">Terms</Link> and{" "}
            <Link href="/legal/privacy">Privacy</Link>. By using BitFtx you agree to the terms.
          </p>
        ),
        a_text:
          "See Terms and Privacy; using BitFtx implies agreement with the terms.",
      },
    ],
  },
];

// -------------------------------
// PAGE
// -------------------------------
export default function FAQPage() {
  // JSON-LD for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CATS.flatMap((cat) =>
      cat.items.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a_text },
      }))
    ),
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">Frequently Asked Questions</h1>
        <p className="mt-2 text-white/70">
          Everything about BitFtx—prediction engine, markets, settlement, safety, token utility, and listings.
        </p>
      </header>

      {/* In-page nav */}
      <nav aria-label="FAQ sections" className="mb-8">
        <ul className="flex flex-wrap gap-2 text-sm">
          {CATS.map((c) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                className="inline-block rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/80 hover:bg-white/10"
              >
                {c.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {CATS.map((cat) => (
        <section key={cat.id} id={cat.id} aria-labelledby={`${cat.id}-title`} className="mb-10 scroll-mt-24">
          <h2 id={`${cat.id}-title`} className="text-2xl font-semibold">
            {cat.title}
          </h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {cat.items.map((qa, i) => (
              <details
                key={i}
                className="group rounded-xl border border-white/10 bg-white/5 p-4 open:bg-white/7.5"
              >
                <summary className="cursor-pointer list-none font-medium">
                  {qa.q}
                </summary>
                <div className="prose prose-invert mt-2 text-sm text-white/80">
                  {qa.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      ))}

      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(jsonLd)}
      </script>

      <footer className="mt-10 text-sm text-white/60">
        Didn’t find what you’re looking for?{" "}
        <Link href="/contact" className="text-emerald-300 hover:text-emerald-200">
          Contact us
        </Link>{" "}
        or check{" "}
        <Link href="/links" className="text-emerald-300 hover:text-emerald-200">
          Official Links
        </Link>
        .
      </footer>
    </main>
  );
}
