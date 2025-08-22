// /src/app/legal/terms/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Terms of Use — BitFtx",
  description:
    "Terms of Use for BitFtx by Kuobit Labs Pvt Ltd. Read the rules for using the BitFtx prediction exchange.",
};

const UPDATED = "August 23, 2025";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">Terms of Use</h1>
        <p className="mt-2 text-white/70">Last updated: {UPDATED}</p>
        <p className="mt-4 text-white/70">
          These Terms of Use (“<strong>Terms</strong>”) govern your access to and use of the BitFtx
          prediction exchange and related websites, applications, interfaces, and services
          (collectively, “<strong>BitFtx</strong>” or the “<strong>Service</strong>”), operated by{" "}
          <strong>Kuobit Labs Pvt Ltd</strong> (“<strong>Company</strong>,” “we,” “us,” or “our”). By accessing or
          using BitFtx, you agree to these Terms. If you do not agree, do not use the Service.
        </p>
      </header>

      {/* Quick nav */}
      <nav aria-label="Page sections" className="mb-10">
        <ul className="flex flex-wrap gap-2 text-sm">
          {[
            ["acceptance", "1. Acceptance & Changes"],
            ["eligibility", "2. Eligibility & Restricted Use"],
            ["noncustodial", "3. Non-Custodial Service & Wallets"],
            ["markets", "4. Markets, Trading & Risk"],
            ["fees", "5. Fees, Gas & Taxes"],
            ["settlement", "6. Resolution, Oracles & Disputes"],
            ["compliance", "7. Compliance & Sanctions"],
            ["ip", "8. Intellectual Property"],
            ["thirdparty", "9. Third-Party Links & Services"],
            ["disclaimers", "10. Disclaimers"],
            ["liability", "11. Limitation of Liability"],
            ["indemnity", "12. Indemnity"],
            ["termination", "13. Suspension & Termination"],
            ["law", "14. Governing Law & Forum"],
            ["misc", "15. Miscellaneous"],
            ["contact", "16. Contact"],
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

      <section id="acceptance" className="prose prose-invert mb-10">
        <h2>1. Acceptance &amp; Changes</h2>
        <p>
          By using BitFtx, you confirm that you have read, understood, and agreed to these Terms,
          as well as our <Link href="/legal/privacy">Privacy Policy</Link>. We may update these
          Terms from time to time. We will post the updated version here and adjust the “Last
          updated” date. Your continued use of the Service after changes constitute acceptance of
          the revised Terms.
        </p>
      </section>

      <section id="eligibility" className="prose prose-invert mb-10">
        <h2>2. Eligibility &amp; Restricted Use</h2>
        <ul>
          <li>You must be at least the age of majority in your jurisdiction (typically 18+).</li>
          <li>
            You may not use BitFtx if you are prohibited by applicable law, are on any sanctions
            list, or are located in any jurisdiction where use of the Service is restricted.
          </li>
          <li>
            We may implement geofencing or other controls. Attempting to circumvent such controls
            (e.g., via VPN or proxies) is prohibited.
          </li>
          <li>
            You are responsible for ensuring your use complies with all laws, including financial,
            securities, derivatives, and gaming laws applicable to you.
          </li>
        </ul>
      </section>

      <section id="noncustodial" className="prose prose-invert mb-10">
        <h2>3. Non-Custodial Service &amp; Wallets</h2>
        <p>
          BitFtx is a <strong>non-custodial</strong> interface to smart contracts. You connect a
          compatible wallet to interact with the Service. We do not control your private keys or
          hold your funds. You are solely responsible for safeguarding your wallet, seed phrase,
          and private keys. We will never request your seed phrase.
        </p>
      </section>

      <section id="markets" className="prose prose-invert mb-10">
        <h2>4. Markets, Trading &amp; Risk</h2>
        <ul>
          <li>
            <strong>Market Structure.</strong> BitFtx enables trading in prediction markets (e.g.,
            YES/NO outcomes). Prices reflect supply/demand and liquidity curves.
          </li>
          <li>
            <strong>Volatility.</strong> Digital assets and prediction markets are volatile. You
            may lose some or all of your stake. Only risk what you can afford to lose.
          </li>
          <li>
            <strong>Execution &amp; Liquidity.</strong> Orders may experience slippage, partial
            fills, or fail due to network conditions or insufficient liquidity.
          </li>
          <li>
            <strong>No Advice.</strong> Content on BitFtx is for informational purposes only and
            does not constitute investment, legal, tax, or other advice.
          </li>
          <li>
            <strong>Local Laws.</strong> You are responsible for determining whether a market or
            trade is permitted in your jurisdiction.
          </li>
        </ul>
        <p>
          For more background, see{" "}
          <Link href="/how-it-works">How it Works</Link> and{" "}
          <Link href="/safety">Safety</Link>.
        </p>
      </section>

      <section id="fees" className="prose prose-invert mb-10">
        <h2>5. Fees, Gas &amp; Taxes</h2>
        <ul>
          <li>
            <strong>Protocol &amp; Trading Fees.</strong> Fees are displayed in-app or described in{" "}
            <Link href="/tokenomics">Tokenomics</Link>. We may adjust fees over time.
          </li>
          <li>
            <strong>Network Gas.</strong> On-chain interactions incur network (gas) fees paid to
            validators/miners, not to us.
          </li>
          <li>
            <strong>Taxes.</strong> You are solely responsible for all taxes arising from your
            activities on BitFtx.
          </li>
        </ul>
      </section>

      <section id="settlement" className="prose prose-invert mb-10">
        <h2>6. Resolution, Oracles &amp; Disputes</h2>
        <ul>
          <li>
            Each market defines resolution sources and rules. After the resolution time, outcomes
            are verified and smart contracts distribute payouts.
          </li>
          <li>
            If results are disputed or ambiguous, the market’s dispute rules apply. Final
            settlement follows the established process.
          </li>
          <li>
            Blockchain data is public and immutable. We cannot alter or delete on-chain records.
          </li>
        </ul>
        <p>
          Further details will be published on{" "}
          <Link href="/transparency">Transparency</Link>.
        </p>
      </section>

      <section id="compliance" className="prose prose-invert mb-10">
        <h2>7. Compliance &amp; Sanctions</h2>
        <ul>
          <li>
            You agree not to use BitFtx in violation of economic sanctions or export controls.
          </li>
          <li>
            We may require additional checks (e.g., KYC/identity verification) where mandated by
            law or venue rules. Failure to satisfy requirements may result in restricted access.
          </li>
          <li>
            We may limit, suspend, or terminate access where we reasonably believe there is a legal
            or policy violation, fraud, or security risk.
          </li>
        </ul>
      </section>

      <section id="ip" className="prose prose-invert mb-10">
        <h2>8. Intellectual Property</h2>
        <p>
          BitFtx, including text, graphics, logos, and software (excluding open-source libraries
          and on-chain code licensed separately), is owned by us or our licensors and protected by
          applicable laws. You are granted a limited, revocable, non-exclusive, non-transferable
          license to use the Service solely as permitted by these Terms.
        </p>
      </section>

      <section id="thirdparty" className="prose prose-invert mb-10">
        <h2>9. Third-Party Links &amp; Services</h2>
        <p>
          BitFtx may link to third-party websites, wallets, or services. We do not control and are
          not responsible for third-party content, policies, or practices. Use third-party services
          at your own risk. Verify official resources via{" "}
          <Link href="/links">Official Links</Link>.
        </p>
      </section>

      <section id="disclaimers" className="prose prose-invert mb-10">
        <h2>10. Disclaimers</h2>
        <ul>
          <li>
            THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE,” WITHOUT WARRANTIES OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT.
          </li>
          <li>
            WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE,
            OR THAT DEFECTS WILL BE CORRECTED.
          </li>
          <li>
            WE DO NOT WARRANT OR GUARANTEE OUTCOMES, PRICES, OR ANY PARTICULAR RESULTS FROM USING
            THE SERVICE.
          </li>
        </ul>
      </section>

      <section id="liability" className="prose prose-invert mb-10">
        <h2>11. Limitation of Liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL THE COMPANY OR ITS AFFILIATES,
          DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, DATA, GOODWILL,
          OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATED TO YOUR USE OF (OR INABILITY TO USE)
          THE SERVICE.
        </p>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR AGGREGATE LIABILITY FOR ANY CLAIMS RELATING TO
          THE SERVICE SHALL NOT EXCEED THE GREATER OF (A) USD 100 OR (B) THE TOTAL AMOUNT OF FEES
          YOU PAID TO US FOR THE SERVICE IN THE 12 MONTHS PRECEDING THE EVENT GIVING RISE TO THE
          CLAIM. THE FOREGOING LIMITATIONS APPLY EVEN IF A REMEDY FAILS OF ITS ESSENTIAL PURPOSE.
        </p>
      </section>

      <section id="indemnity" className="prose prose-invert mb-10">
        <h2>12. Indemnity</h2>
        <p>
          You agree to defend, indemnify, and hold harmless the Company and its affiliates,
          officers, directors, employees, and agents from and against any claims, liabilities,
          damages, losses, and expenses (including reasonable legal and accounting fees) arising
          out of or in any way connected with your access to or use of the Service or your
          violation of these Terms or applicable law.
        </p>
      </section>

      <section id="termination" className="prose prose-invert mb-10">
        <h2>13. Suspension &amp; Termination</h2>
        <p>
          We may suspend or terminate your access to the Service at any time with or without
          notice if we reasonably believe: (i) you have violated these Terms or applicable law;
          (ii) you present a fraud, security, or legal risk; or (iii) we discontinue the Service.
          Upon termination, provisions that by their nature should survive (e.g., intellectual
          property, disclaimers, limitations of liability, indemnity, governing law) shall survive.
        </p>
      </section>

      <section id="law" className="prose prose-invert mb-10">
        <h2>14. Governing Law &amp; Forum</h2>
        <p>
          These Terms are governed by the laws of India, without regard to conflict-of-laws
          principles. You agree to the exclusive jurisdiction of the courts located in Bengaluru,
          Karnataka, India, to resolve any dispute arising from or relating to these Terms or the
          Service, except where applicable law provides otherwise. (If you prefer a different venue,
          contact us to update this clause.)
        </p>
      </section>

      <section id="misc" className="prose prose-invert mb-10">
        <h2>15. Miscellaneous</h2>
        <ul>
          <li>
            <strong>Entire Agreement.</strong> These Terms, together with the{" "}
            <Link href="/legal/privacy">Privacy Policy</Link>, constitute the entire agreement
            between you and us regarding the Service.
          </li>
          <li>
            <strong>Severability.</strong> If any provision is found unenforceable, the remaining
            provisions will remain in full force and effect.
          </li>
          <li>
            <strong>No Waiver.</strong> Our failure to enforce any right or provision of these
            Terms will not be deemed a waiver of such right or provision.
          </li>
          <li>
            <strong>Assignment.</strong> You may not assign these Terms without our prior written
            consent. We may assign these Terms in connection with a merger, acquisition, or sale of
            assets.
          </li>
          <li>
            <strong>Notices.</strong> We may provide notices via the Service, email, or official
            channels listed on <Link href="/links">Official Links</Link>.
          </li>
        </ul>
      </section>

      <section id="contact" className="prose prose-invert">
        <h2>16. Contact</h2>
        <p>
          For questions about these Terms, contact{" "}
          <a href="mailto:legal@bitftx.com" className="text-emerald-300 hover:text-emerald-200">
            legal@bitftx.com
          </a>
          . For verified channels, see{" "}
          <Link href="/links" className="text-emerald-300 hover:text-emerald-200">
            Official Links
          </Link>
          .
        </p>
        <p className="text-white/70">
          Operator: <strong>Kuobit Labs Pvt Ltd</strong>
        </p>
      </section>

      {/* Optional JSON-LD */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Terms of Use — BitFtx",
            dateModified: UPDATED,
            publisher: { "@type": "Organization", name: "Kuobit Labs Pvt Ltd" },
          }),
        }}
      />
    </main>
  );
}
