import type { Metadata } from "next";
import { GrowthPricing } from "../../components/growth-pricing";
import { LandingFooter, LandingNav } from "../../components/landing-shell";
import "../landing.css";
export const metadata: Metadata = {
  title: "Amplify pricing | Pay only when sales increase",
  description:
    "No setup fee or monthly platform fee. Pay 5% of qualifying additional sales above an agreed baseline after deducting increases in ad spend.",
};
export default function PricingPage() {
  return (
    <main className="landing-page">
      <LandingNav />
      <GrowthPricing />
      <LandingFooter />
    </main>
  );
}
