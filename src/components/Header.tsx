"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatedLogo } from "@/components/Brand";

type NavItem = { label: string; href: string };

const coreNav: NavItem[] = [
  { label: "Tokenomics", href: "/tokenomics" },
  { label: "Transparency", href: "/transparency" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Blog", href: "/blog" },
];

const moreNav: { section: string; items: NavItem[] }[] = [
  {
    section: "Users",
    items: [
      { label: "Airdrop", href: "/airdrop" },
      { label: "Referrals", href: "/referrals" },
      { label: "Staking", href: "/staking" },
      { label: "Leaderboard", href: "/leaderboard" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Status", href: "/status" },
    ],
  },
  {
    section: "Prediction",
    items: [
      { label: "Markets", href: "/markets" },
    ],
  },
  {
    section: "Project",
    items: [
      { label: "Links (Official)", href: "/links" },
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Safety", href: "/safety" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Privacy", href: "/legal/privacy" },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/50">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
      <div className="flex items-center gap-3">
  <Link href="/" aria-label="BitFtx home" className="flex items-center">
    <AnimatedLogo size={40} />
  </Link>
  <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-300">
    Staging
  </span>
</div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          {coreNav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white">{item.label}</Link>
          ))}

          <div className="relative">
            <button
              className="hover:text-white"
              onClick={() => setMoreOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={moreOpen}
            >
              More ▾
            </button>
            {moreOpen && (
              <div
                className="absolute right-0 mt-2 w-[520px] rounded-xl border border-white/10 bg-black/95 p-4 shadow-xl"
                onMouseLeave={() => setMoreOpen(false)}
                role="menu"
              >
                <div className="grid grid-cols-3 gap-4">
                  {moreNav.map((group) => (
                    <div key={group.section}>
                      <div className="mb-2 text-xs uppercase tracking-wide text-white/50">{group.section}</div>
                      <ul className="space-y-1">
                        {group.items.map((i) => (
                          <li key={i.href}>
                            <Link
                              href={i.href}
                              className="block rounded px-2 py-1 text-sm text-white/80 hover:bg-white/5 hover:text-white"
                              onClick={() => setMoreOpen(false)}
                            >
                              {i.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/links"
            className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
          >
            Official Links
          </Link>
        </nav>

        {/* Mobile */}
        <button
          className="md:hidden rounded-lg border border-white/10 px-3 py-1.5 text-sm"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
        >
          Menu
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Link href="/" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10" onClick={() => setMobileOpen(false)}>Home</Link>
              {coreNav.map((i) => (
                <Link key={i.href} href={i.href} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10" onClick={() => setMobileOpen(false)}>
                  {i.label}
                </Link>
              ))}
              <Link href="/links" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10" onClick={() => setMobileOpen(false)}>Official Links</Link>
            </div>

            <div className="pt-2">
              <div className="mb-2 text-xs uppercase tracking-wide text-white/50">More</div>
              <div className="grid grid-cols-2 gap-2">
                {moreNav.flatMap((g) => g.items).map((i) => (
                  <Link key={i.href} href={i.href} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10" onClick={() => setMobileOpen(false)}>
                    {i.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
