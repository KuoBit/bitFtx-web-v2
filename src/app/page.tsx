import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import FeatureGrid from "@/components/FeatureGrid";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <div className="space-y-12">
      <Hero />
      <StatsStrip />
      <FeatureGrid />
      <CTA />
    </div>
  );
}
