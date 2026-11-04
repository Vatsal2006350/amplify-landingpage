import type { Metadata } from "next";
import { GrowthPricing } from "../../components/growth-pricing";
import { LandingFooter, LandingNav } from "../../components/landing-shell";
import "../landing.css";
export const metadata: Metadata = {
  title: "Amplify pricing | Pay only when sales increase",
  description:
    "Amplify takes 5% of qualifying sales growth after subtracting increases in ad spend. Use the calculator to see your fee and what you keep.",
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
