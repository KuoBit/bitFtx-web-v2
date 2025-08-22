// /src/components/Brand.tsx
"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

/**
 * BitFtx Brand
 * Exports:
 *   - AnimatedLogo (PNG brain, old fade/slide + pulse)
 *   - LogoMark / LogoLockup (kept, not used in hero)
 *   - HeroMasthead (uses AnimatedLogo + Market Odds cards)
 */

// =============================
//  LOGO — Minimal "B" + Arrow (kept)
// =============================
export function LogoMark({ size = 48, animated = true }: { size?: number; animated?: boolean }) {
  const prefersReduced = useReducedMotion();
  const pulse = animated && !prefersReduced;
  const S = size;

  return (
    <svg width={S} height={S} viewBox="0 0 64 64" role="img" aria-label="BitFtx mark" className="inline-block">
      <defs>
        <linearGradient id="bf-grad" x1="0" x2="1">
          <stop offset="0%" stopColor="#00C58E" />
          <stop offset="100%" stopColor="#0F6FFF" />
        </linearGradient>
        <filter id="bf-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <line x1="22" y1="14" x2="22" y2="50" stroke="url(#bf-grad)" strokeWidth="4" strokeLinecap="round" />
      <path d="M22 18 H36 C44 18 46 30 36 30 H22" fill="none" stroke="url(#bf-grad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 34 H38 C48 34 48 50 36 50 H22" fill="none" stroke="url(#bf-grad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <motion.path
        d="M34 28 L44 20 L46 26"
        fill="none"
        stroke="#0F6FFF"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.8 }}
        animate={pulse ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
        transition={pulse ? { duration: 1, repeat: Infinity, repeatDelay: 2 } : {}}
        filter="url(#bf-glow)"
      />
    </svg>
  );
}

export function LogoLockup({ size = 40, animated = false }: { size?: number; animated?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2 select-none">
      <LogoMark size={size} animated={animated} />
      <span className="text-lg font-semibold tracking-tight">BitFtx</span>
    </div>
  );
}

// =============================
//  LOGO — PNG brain w/ old animation
// =============================
export function AnimatedLogo({
  size = 40,
  src = "/images/logo.png", // uses public/logo.png
  alt = "BitFtx Brain Logo",
  className = "",
}: {
  size?: number;
  src?: string;
  alt?: string;
  className?: string;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className={className}>
      <Image src={src} alt={alt} width={size} height={size} className="drop-shadow-lg animate-pulse" priority />
    </motion.div>
  );
}

// =============================
//  HERO MASTHEAD
// =============================
export function HeroMasthead() {
  const prefersReduced = useReducedMotion();
  const reduced = !!prefersReduced;

  return (
    <section className="relative isolate overflow-hidden">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[72rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,197,142,0.20),transparent_60%)] blur-2xl" />
        <div className="absolute bottom-0 left-0 h-[28rem] w-[56rem] rounded-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(15,111,255,0.18),transparent_60%)] blur-2xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
        {/* Logo + strapline */}
        <div className="flex items-center gap-3">
          <AnimatedLogo size={100} />
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">Predict • Trade • Earn</span>
        </div>

        {/* headline/copy/ctas */}
        <div className="mt-8 max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            The crypto prediction exchange
            <span className="block text-white/70">powered by real-time intelligence</span>
          </h1>
          <p className="mt-6 text-lg text-white/70">
            Create or join markets on crypto moves, events, and trends. Transparent on-chain settlement, low fees, and liquidity incentives.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="/app" className="rounded-xl bg-[#00C58E] px-5 py-3 font-medium text-[#031613] hover:bg-[#00A77A] transition">
              Launch App
            </a>
            <a href="/tokenomics" className="rounded-xl border border-white/15 px-5 py-3 font-medium text-white hover:bg-white/5 transition">
              Tokenomics
            </a>
          </div>
        </div>

        {/* Market Odds animation (Sample B) */}
        <div className="relative mt-14 rounded-3xl border border-white/10 bg-white/5 p-4">
          <HeroMarketOdds reduced={reduced} />
        </div>

        {/* trust badges */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Badge label="Audited" />
          <Badge label="Non-custodial" />
          <Badge label="Low fees" />
          <Badge label="Live incentives" />
        </div>
      </div>
    </section>
  );
}

function Badge({ label }: { label: string }) {
  return <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-sm text-white/80">{label}</div>;
}

// =============================
//  HERO — Market Cards + Odds (Sample B)
//  (Random odds now; can be wired to live data later.)
// =============================
type MarketCard = { id: string; title: string; odds: number; trend: "up" | "down" };

function HeroMarketOdds({ reduced = false }: { reduced?: boolean }) {
  const [cards, setCards] = React.useState<MarketCard[]>(() => [
    { id: "m1", title: "BTC > $100k by Q4?", odds: rand(55, 75), trend: "up" },
    { id: "m2", title: "ETH ETF approved?", odds: rand(45, 65), trend: "down" },
    { id: "m3", title: "Fed cuts this month?", odds: rand(35, 55), trend: "down" },
  ]);

  // Gently nudge odds every few seconds
  React.useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      setCards((prev) =>
        prev.map((c) => {
          const delta = (Math.random() * 2 - 1) * 2; // -2..+2
          let next = clamp(Math.round(c.odds + delta), 12, 92);
          const trend: "up" | "down" = next > c.odds ? "up" : next < c.odds ? "down" : c.trend;
          return { ...c, odds: next, trend };
        })
      );
    }, 2800);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <div className="relative">
      {/* soft gradient top overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent" />

      <div className="flex flex-col items-center gap-5 md:flex-row md:items-stretch md:justify-center">
        {cards.map((c, i) => (
          <motion.div
            key={c.id}
            className="w-full max-w-[18.5rem] rounded-2xl border border-white/10 bg-[#0D1117] p-4 shadow-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm text-white/70">Market</div>
              <TrendPill trend={c.trend} />
            </div>
            <div className="mt-1 font-medium leading-snug">{c.title}</div>

            <motion.div
              className="mt-4 rounded-lg border border-white/10 p-3"
              animate={
                reduced
                  ? undefined
                  : { boxShadow: ["0 0 0 rgba(0,0,0,0)", "0 0 24px rgba(0,197,142,0.25)", "0 0 0 rgba(0,0,0,0)"] }
              }
              transition={{ repeat: Infinity, duration: 3.6 }}
            >
              <div className="text-xs text-white/60">Current odds</div>
              <div className="flex items-end gap-2">
                <motion.div
                  key={c.odds} // animate when value changes
                  initial={{ scale: 0.98, opacity: 0.9 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="text-3xl font-semibold text-emerald-300"
                >
                  {c.odds}%
                </motion.div>
                <div className="text-xs text-white/50">({c.trend === "up" ? "rising" : "falling"})</div>
              </div>

              {/* tiny progress bar vibe */}
              <div className="mt-3 h-1.5 w-full rounded-full bg-white/10">
                <motion.div
                  className="h-1.5 rounded-full"
                  style={{ background: "linear-gradient(90deg,#00C58E,#0F6FFF)" }}
                  animate={reduced ? { width: `${c.odds}%` } : { width: [`${c.odds - 5}%`, `${c.odds}%`] }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </motion.div>

            <div className="mt-4 flex items-center justify-between">
              <a href="/markets" className="text-sm text-emerald-300 hover:text-emerald-200">
                View market →
              </a>
              <button className="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-white hover:bg-white/5">Predict</button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* subtle hint chip */}
      <motion.div
        className="pointer-events-none mx-auto mt-5 w-max rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
        animate={reduced ? undefined : { scale: [1, 0.98, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        Randomized demo odds — live feed coming soon
      </motion.div>
    </div>
  );
}

function TrendPill({ trend }: { trend: "up" | "down" }) {
  const up = trend === "up";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${
        up ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : "border-red-400/30 bg-red-400/10 text-red-300"
      }`}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
        {up ? (
          <path d="M1 6 L5 2 L9 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        ) : (
          <path d="M1 4 L5 8 L9 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        )}
      </svg>
      {up ? "Up" : "Down"}
    </span>
  );
}

// =============================
//  Preview (kept for local dev)
// =============================
export default function Preview() {
  return (
    <div className="min-h-screen bg-[#07090B] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex items-center justify-between">
          <LogoLockup size={48} />
          <a className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/5" href="#">
            Docs
          </a>
        </div>
      </div>
      <HeroMasthead />
    </div>
  );
}

// =============================
//  utils
// =============================
function rand(min: number, max: number) {
  return Math.round(min + Math.random() * (max - min));
}
function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
