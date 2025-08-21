export default function StatsStrip() {
  const items = [
    { label: "Supply", value: "1,000,000,000" },
    { label: "Tax", value: "0%" },
    { label: "Ownership", value: "Renounced / Multisig" },
    { label: "LP", value: "Locked" },
  ];
  return (
    <section className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map((i) => (
        <div key={i.label} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4">
          <div className="text-xs text-white/50">{i.label}</div>
          <div className="mt-1 text-lg font-medium">{i.value}</div>
        </div>
      ))}
    </section>
  );
}
