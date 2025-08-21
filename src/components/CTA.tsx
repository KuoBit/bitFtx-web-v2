import Link from "next/link";

export default function CTA() {
  return (
    <section className="mt-12 card p-6 md:p-8 text-center">
      <h3 className="text-2xl font-semibold">Ready for the V2 launch?</h3>
      <p className="mt-2 text-white/70">
        Check official links, wallets, and migration details.
      </p>
      <div className="mt-5 flex justify-center gap-3">
        <Link href="/links" className="btn btn-primary">Official Links</Link>
        <Link href="/transparency" className="btn btn-ghost">Transparency</Link>
      </div>
    </section>
  );
}
