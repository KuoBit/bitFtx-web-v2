"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * BitFtx Animated Logo & Hero
 * -------------------------------------------------------------
 * Drop this file in:  /src/components/Brand.tsx
 * Usage:
 *   import { AnimatedLogo, HeroMasthead } from "@/components/Brand";
 *   <AnimatedLogo size={40} />
 *   <HeroMasthead />
 *
 * Tailwind required (already in your project). No extra libs.
 */

// -----------------------------
// Animated BitFtx Logo
// -----------------------------
export function AnimatedLogo({
  size = 48,
  label = "BitFtx",
  animated = true,
}: {
  size?: number;
  label?: string;
  animated?: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const spin = animated && !prefersReduced;

  const S = size;
  const stroke = "#00C58E"; // primary
  const ring = "url(#bitftx-ring)";
  const accent = "#0F6FFF"; // secondary

  return (
    <div className="inline-flex items-center gap-2 select-none">
      <svg
        width={S}
        height={S}
        viewBox="0 0 64 64"
        role="img"
        aria-label={label}
        className="drop-shadow-[0_0_12px_rgba(0,197,142,0.25)]"
      >
        <defs>
          <radialGradient id="bitftx-ring" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#00C58E" stopOpacity=".95" />
            <stop offset="60%" stopColor="#00C58E" stopOpacity=".35" />
            <stop offset="100%" stopColor="#00C58E" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bitftx-stroke" x1="0" x2="1">
            <stop offset="0%" stopColor="#00C58E" />
            <stop offset="100%" stopColor="#0F6FFF" />
          </linearGradient>
        </defs>

        {/* Glow ring */}
        <circle cx="32" cy="32" r="28" fill={ring} />
        {/* Thin outer outline for crispness */}
        <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.08)" />

        {/* Neural network nodes */}
        <g stroke="url(#bitftx-stroke)" strokeWidth="1.5" opacity="0.9">
          <path d="M14 36 C20 20, 44 20, 50 36" fill="none" />
          <path d="M14 28 C24 44, 40 44, 50 28" fill="none" />
          <path d="M20 22 C28 18, 36 18, 44 22" fill="none" />
          <path d="M20 42 C28 46, 36 46, 44 42" fill="none" />
        </g>

        {/* B monogram with upward arrow (prediction/growth) */}
        <g>
          <path
            d="M26 16 v32"
            stroke={stroke}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M26 20 h8 a6 6 0 0 1 0 12 h-8 M26 36 h10 a7 7 0 0 1 0 14 h-10"
            fill="none"
            stroke="url(#bitftx-stroke)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Arrow */}
          <path d="M36 24 L42 18 L44 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/>
        </g>

        {/* Orbiting prediction dot */}
        <motion.g
          animate={spin ? { rotate: 360 } : { rotate: 0 }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          style={{ originX: 32, originY: 32 }}
        >
          <circle cx="32" cy="7" r="3" fill={accent} />
          <circle cx="32" cy="7" r="6" fill="none" stroke="rgba(255,255,255,0.12)" />
        </motion.g>
      </svg>

      {/* Wordmark (optional) */}
      <span className="hidden sm:inline text-lg font-semibold tracking-tight">
        BitFtx
      </span>
    </div>
  );
}

// -----------------------------
// Hero Masthead Animation
// -----------------------------
export function HeroMasthead() {
  const prefersReduced = useReducedMotion();
  const duration = prefersReduced ? 0 : 9;

  return (
    <section className="relative isolate overflow-hidden">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[72rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,197,142,0.20),transparent_60%)] blur-2xl" />
        <div className="absolute bottom-0 left-0 h-[28rem] w-[56rem] rounded-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(15,111,255,0.18),transparent_60%)] blur-2xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="flex items-center gap-3">
          <AnimatedLogo size={56} />
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">Predict • Trade • Earn</span>
        </div>

        <div className="mt-8 max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            The crypto prediction exchange
            <span className="block text-white/70">powered by real‑time intelligence</span>
          </h1>
          <p className="mt-6 text-lg text-white/70">
            Create or join markets on crypto moves, events, and trends. Transparent on‑chain settlement, low fees, and liquidity incentives.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="/app" className="rounded-xl bg-[#00C58E] px-5 py-3 font-medium text-[#031613] hover:bg-[#00A77A] transition">Launch App</a>
            <a href="/tokenomics" className="rounded-xl border border-white/15 px-5 py-3 font-medium text-white hover:bg-white/5 transition">Tokenomics</a>
          </div>
        </div>

        {/* Animated canvas area */}
        <div className="relative mt-14 rounded-3xl border border-white/10 bg-white/5 p-4">
          <AnimatedMarketViz reduced={prefersReduced} />
        </div>

        {/* Social proof row (placeholders) */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Badge label="Audited" />
          <Badge label="Non‑custodial" />
          <Badge label="Low fees" />
          <Badge label="Live incentives" />
        </div>
      </div>
    </section>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-sm text-white/80">
      {label}
    </div>
  );
}

// -----------------------------
// Animated Market Visualization (SVG)
// -----------------------------
function AnimatedMarketViz({ reduced = false }: { reduced?: boolean }) {
  // Simple candlesticks + flowing prediction curve + rotating orbit dots
  return (
    <div className="relative">
      <svg
        viewBox="0 0 1200 380"
        className="h-[42vh] w-full rounded-2xl bg-gradient-to-b from-white/5 to-white/0"
        aria-label="BitFtx market visualization"
      >
        <defs>
          <linearGradient id="strokeGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#00C58E" />
            <stop offset="100%" stopColor="#0F6FFF" />
          </linearGradient>
          <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,197,142,0.18)" />
            <stop offset="100%" stopColor="rgba(15,111,255,0.00)" />
          </linearGradient>
        </defs>

        {/* Subtle grid */}
        <Grid />

        {/* Candlesticks */}
        <Candles reduced={reduced} />

        {/* Flowing prediction curve */}
        <PredictionCurve reduced={reduced} />

        {/* Orbiting signals */}
        <Orbiters reduced={reduced} />
      </svg>
    </div>
  );
}

function Grid() {
  const lines = Array.from({ length: 9 }).map((_, i) => (
    <line key={i} x1={0} x2={1200} y1={40 + i * 34} y2={40 + i * 34} stroke="rgba(255,255,255,0.08)" />
  ));
  return <g>{lines}</g>;
}

function Candles({ reduced }: { reduced: boolean }) {
  // Synthetic series for visuals only
  const data = [
    { x: 40, o: 190, h: 220, l: 180, c: 210 },
    { x: 90, o: 205, h: 230, l: 195, c: 220 },
    { x: 140, o: 218, h: 240, l: 210, c: 212 },
    { x: 190, o: 212, h: 238, l: 200, c: 235 },
    { x: 240, o: 234, h: 260, l: 230, c: 252 },
    { x: 290, o: 250, h: 275, l: 245, c: 260 },
    { x: 340, o: 255, h: 290, l: 250, c: 285 },
    { x: 390, o: 286, h: 305, l: 275, c: 280 },
    { x: 440, o: 278, h: 310, l: 270, c: 300 },
    { x: 490, o: 300, h: 330, l: 295, c: 320 },
    { x: 540, o: 318, h: 345, l: 310, c: 340 },
    { x: 590, o: 338, h: 360, l: 330, c: 355 },
  ];

  return (
    <g>
      {data.map((d, i) => {
        const up = d.c >= d.o;
        const color = up ? "#00C58E" : "#E43D4E";
        return (
          <g key={i}>
            <line x1={d.x} x2={d.x} y1={d.h} y2={d.l} stroke={color} strokeOpacity={0.6} />
            <motion.rect
              x={d.x - 6}
              y={Math.min(d.o, d.c)}
              width={12}
              height={Math.max(3, Math.abs(d.c - d.o))}
              rx={2}
              fill={color}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 0.8, scaleY: 1 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              transform-origin={`${d.x} ${Math.min(d.o, d.c)}`}
            />
          </g>
        );
      })}
    </g>
  );
}

function PredictionCurve({ reduced }: { reduced: boolean }) {
  // Curve path
  const d =
    "M20,300 C140,260 180,240 240,252 C320,270 360,220 420,240 C520,278 600,220 700,250 C800,280 900,220 1080,260";

  return (
    <g>
      <motion.path
        d={d}
        fill="url(#fillGrad)"
        stroke="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2 }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke="url(#strokeGrad)"
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray="8 8"
        animate={reduced ? {} : { strokeDashoffset: [0, -160] }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
      />
    </g>
  );
}

function Orbiters({ reduced }: { reduced: boolean }) {
  return (
    <g>
      <motion.circle
        cx={1060}
        cy={90}
        r={6}
        fill="#0F6FFF"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      />
      <motion.g
        style={{ originX: 800, originY: 140 }}
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
      >
        <circle cx={800} cy={140} r={40} fill="none" stroke="rgba(255,255,255,0.1)" />
        <circle cx={840} cy={140} r={5} fill="#00C58E" />
      </motion.g>
    </g>
  );
}

// -----------------------------
// Preview block (for Canvas demo only)
// -----------------------------
export default function Preview() {
  return (
    <div className="min-h-screen bg-[#07090B] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex items-center justify-between">
          <AnimatedLogo size={48} />
          <a className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/5" href="#">Docs</a>
        </div>
      </div>
      <HeroMasthead />
    </div>
  );
}
