import SocialLinks from "@/components/SocialLinks";
import { EXCHANGE_LINKS } from "@/data/links";

export const metadata = {
  title: "Official Links — BitFtx",
  description: "Verified BitFtx links including socials and exchange listings.",
};

export default function OfficialLinksPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Official Links</h1>
      <p className="mt-2 text-white/70">
        Bookmark this page. If a link isn’t listed here, treat it as unverified.
      </p>

      <section className="mt-8">
        <h2 className="text-xl font-medium">Social</h2>
        <p className="mt-1 text-white/70">Follow our official channels:</p>
        <div className="mt-3">
          <SocialLinks />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-medium">Exchanges</h2>
        {EXCHANGE_LINKS.length === 0 ? (
          <p className="mt-1 text-white/60">Exchange listings will appear here once live.</p>
        ) : (
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {EXCHANGE_LINKS.map((ex) => (
              <li key={ex.name}>
                <a
                  href={ex.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
                >
                  <span className="text-white/80">{ex.name}</span>
                  <span className="text-xs text-white/60">Visit →</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
