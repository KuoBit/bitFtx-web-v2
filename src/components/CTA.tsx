import Link from "next/link";

export default function CTA() {
  return (
    <section className="mt-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8 text-center">
      <h3 className="text-2xl font-semibold">Ready for the V2 launch?</h3>
      <p className="mt-2 text-white/70">Check official links, wallets, and migration details.</p>
      <div className="mt-5 flex justify-center gap-3">
        <Link
          href="/links"
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium bg-emerald-500/90 hover:bg-emerald-400 text-black shadow shadow-emerald-500/20 transition"
        >
          Official Links
        </Link>
        <Link
          href="/transparency"
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium border border-white/10 bg-white/5 hover:bg-white/10 text-white transition"
        >
          Transparency
        </Link>
      </div>
    </section>
  );
}
