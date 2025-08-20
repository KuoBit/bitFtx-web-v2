// src/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="mb-3 font-semibold">Product</div>
          <ul className="space-y-2 text-white/70">
            <li><Link href="/markets" className="hover:text-white">Markets</Link></li>
            <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
            <li><Link href="/tokenomics" className="hover:text-white">Tokenomics</Link></li>
            <li><Link href="/transparency" className="hover:text-white">Transparency</Link></li>
          </ul>
        </div>

        <div>
          <div className="mb-3 font-semibold">Company</div>
          <ul className="space-y-2 text-white/70">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
            <li><Link href="/roadmap" className="hover:text-white">Roadmap</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="mb-3 font-semibold">Resources</div>
          <ul className="space-y-2 text-white/70">
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/links" className="hover:text-white">Official Links</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/status" className="hover:text-white">Status</Link></li>
          </ul>
        </div>

        <div>
          <div className="mb-3 font-semibold">Legal</div>
          <ul className="space-y-2 text-white/70">
            <li><Link href="/safety" className="hover:text-white">Safety</Link></li>
            <li><Link href="/legal/terms" className="hover:text-white">Terms</Link></li>
            <li><Link href="/legal/privacy" className="hover:text-white">Privacy</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-white/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} BitFtx • All rights reserved</div>
          <div className="flex gap-4">
            {/* Swap these for real links */}
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">X</a>
            <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="hover:text-white">Telegram</a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
