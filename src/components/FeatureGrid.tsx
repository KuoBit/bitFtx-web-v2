import { ShieldCheck, Lock, Wallet, LineChart } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Audited Patterns",
    desc: "OpenZeppelin ERC‑20, no pause/mint/tax. Minimal, boring, safe.",
  },
  {
    icon: Lock,
    title: "LP Locked",
    desc: "Liquidity locked with public link. No rug switches.",
  },
  {
    icon: Wallet,
    title: "Public Wallets",
    desc: "Treasury, vesting, growth — all published and tracked.",
  },
  {
    icon: LineChart,
    title: "Transparency",
    desc: "Live holders, LP depth, and Safe actions on one page.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold">Built for trust</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="card p-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-xl bg-white/10 p-2">
                <Icon size={18} />
              </div>
              <div>
                <div className="font-medium">{title}</div>
                <div className="mt-1 text-sm text-white/70">{desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
