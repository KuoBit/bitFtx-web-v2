// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BitFtx — V2",
  description: "BitFtx V2 website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-[#07090B] text-white`}>
        {/* Background accents */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-72 w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,197,142,0.20),transparent_60%)] blur-2xl" />
          <div className="absolute bottom-0 left-0 h-72 w-[40rem] rounded-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(15,111,255,0.18),transparent_60%)] blur-2xl" />
        </div>

        <Header />
        <main className="mx-auto max-w-6xl px-4 py-12">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
