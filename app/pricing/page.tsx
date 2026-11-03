import type { Metadata } from "next";
import { GrowthPricing } from "../../components/growth-pricing";
import { GrowthFooter, GrowthNav } from "../../components/growth-home";
import "../growth.css";
export const metadata: Metadata = {
  title: "Amplify pricing | Pay only when sales increase",
  description:
    "No setup fee or monthly platform fee. Pay 5% of additional sales above an agreed baseline, after deducting increases in ad spend. Start a 90-day growth pilot.",
};
export default function PricingPage() {
  return (
    <main className="growth-site">
      <GrowthNav />
      <GrowthPricing />
      <GrowthFooter />
    </main>
  );
}
