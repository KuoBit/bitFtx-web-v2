import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BitFtx — V2 (Staging)",
  description: "BitFtx V2 website staging",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="min-h-full">
      <body className="min-h-screen bg-black text-white">
        <header className="border-b border-white/10">
          <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
            <div className="font-semibold">BitFtx</div>
            <nav className="flex gap-6 text-sm text-white/80">
              <a href="/" className="hover:text-white">Home</a>
              <a href="/tokenomics" className="hover:text-white">Tokenomics</a>
              <a href="/links" className="hover:text-white">Links</a>
              <a href="/transparency" className="hover:text-white">Transparency</a>
              <a href="/roadmap" className="hover:text-white">Roadmap</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
        <footer className="mt-16 border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-white/60">
            © {new Date().getFullYear()} BitFtx • All rights reserved
          </div>
        </footer>
      </body>
    </html>
  );
}