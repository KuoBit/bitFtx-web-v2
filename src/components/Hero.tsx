"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <motion.h1
            className="text-4xl md:text-5xl font-semibold leading-tight"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            BitFtx V2 — Transparent token + prediction markets (soon)
          </motion.h1>
          <motion.p
            className="mt-4 text-white/70"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            Clean tokenomics, locked liquidity, public wallets, and a
            phased rollout for markets. Track everything in real‑time on our
            Transparency page.
          </motion.p>

          <motion.div
            className="mt-6 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
          >
            <Link href="/links" className="btn btn-primary">
              Official Links
            </Link>
            <Link href="/tokenomics" className="btn btn-ghost">
              View Tokenomics
            </Link>
          </motion.div>

          <motion.div
            className="mt-6 flex items-center gap-6 text-xs text-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.24 }}
          >
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              LP Lock at launch
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-blue-400 animate-pulse" />
              Multisig + timelock
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative aspect-[4/3] rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-3 md:p-4"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Replace with your logo/visual later */}
          <div className="absolute -top-8 -right-8 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(0,197,142,0.35),transparent_60%)] blur-xl" />
          <div className="absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(15,111,255,0.35),transparent_60%)] blur-xl" />
          <div className="relative z-10 h-full w-full grid place-items-center">
            <Image
              src="/next.svg"
              width={160}
              height={160}
              alt="BitFtx Hero Placeholder"
              className="opacity-70"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
