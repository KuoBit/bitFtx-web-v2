export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">BitFtx V2 — Staging</h1>
      <p className="text-white/70 max-w-2xl">
        This is the staging site for the BitFtx V2 relaunch.
        We’ll add the trust dashboard, tokenomics, and /links page here next.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-white/10 p-4">
          <div className="text-sm text-white/60 mb-1">Status</div>
          <div className="font-medium">Website V2 scaffold live</div>
        </div>
        <div className="rounded-xl border border-white/10 p-4">
          <div className="text-sm text-white/60 mb-1">Token</div>
          <div className="font-medium">V2 deployment planned</div>
        </div>
        <div className="rounded-xl border border-white/10 p-4">
          <div className="text-sm text-white/60 mb-1">Next</div>
          <div className="font-medium">Add /links & tokenomics pages</div>
        </div>
      </div>
    </div>
  );
}