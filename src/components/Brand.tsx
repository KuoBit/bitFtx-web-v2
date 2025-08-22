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
 *   - HeroMasthead (uses AnimatedLogo before the hero viz)
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
  src = "/images/logo.png", // ⬅️ uses public/logo.png
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
        {/* ⬇️ Use the same animated PNG logo before the hero */}
        <div className="flex items-center gap-3">
          <AnimatedLogo size={100} /> {/* was <LogoLockup size={56} /> */}
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">Predict • Trade • Earn</span>
        </div>

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

        <div className="relative mt-14 rounded-3xl border border-white/10 bg-white/5 p-4">
          <AnimatedMarketViz reduced={reduced} />
        </div>

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
//  HERO SVG Animation (unchanged)
// =============================
function AnimatedMarketViz({ reduced = false }: { reduced?: boolean }) {
  return (
    <div className="relative">
      <svg viewBox="0 0 1200 380" className="h-[42vh] w-full rounded-2xl bg-gradient-to-b from-white/5 to-white/0" aria-label="BitFtx market visualization">
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
        <Grid />
        <Candles />
        <PredictionCurve reduced={reduced} />
        <Orbiters reduced={reduced} />
      </svg>
    </div>
  );
}

function Grid() {
  const lines = Array.from({ length: 9 }).map((_, i) => <line key={i} x1={0} x2={1200} y1={40 + i * 34} y2={40 + i * 34} stroke="rgba(255,255,255,0.08)" />);
  return <g>{lines}</g>;
}

function Candles() {
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
              style={{ transformOrigin: `${d.x}px ${Math.min(d.o, d.c)}px` }} // ✅ correct prop in React
            />
          </g>
        );
      })}
    </g>
  );
}

function PredictionCurve({ reduced }: { reduced: boolean }) {
  const d = "M20,300 C140,260 180,240 240,252 C320,270 360,220 420,240 C520,278 600,220 700,250 C800,280 900,220 1080,260";
  return (
    <g>
      <motion.path d={d} fill="url(#fillGrad)" stroke="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2 }} />
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
      <motion.circle cx={1060} cy={90} r={6} fill="#0F6FFF" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} />
      <motion.g style={{ originX: 800, originY: 140 }} animate={reduced ? {} : { rotate: 360 }} transition={{ repeat: Infinity, duration: 14, ease: "linear" }}>
        <circle cx={800} cy={140} r={40} fill="none" stroke="rgba(255,255,255,0.1)" />
        <circle cx={840} cy={140} r={5} fill="#00C58E" />
      </motion.g>
    </g>
  );
}

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
