import { FOUNDER_CALL_URL, GROWTH_FEE_RATE } from "../lib/growth-pricing";

const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export function GrowthPricing() {
  const addedSales = 6000;
  const addedAdSpend = 2000;
  const growthAfterAds = addedSales - addedAdSpend;
  const fee = growthAfterAds * GROWTH_FEE_RATE;
  const brandKeeps = growthAfterAds - fee;

  return (
    <section id="pricing" className="growth-pricing-section scroll-mt-[80px]">
      <div className="growth-pricing-intro">
        <p className="type-mono-label">Performance pricing</p>
        <h2>
          Pay only when sales grow.
          <br />
          <em>5% of the growth.</em>
        </h2>
        <p className="growth-pricing-copy">
          We take 5% of qualifying sales growth after any increase in ad spend.
          You keep the other 95%.
        </p>
        <a href={FOUNDER_CALL_URL} className="button-primary growth-pricing-cta">
          Book a call <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="growth-pricing-example" aria-label="Pricing calculation illustration">
        <div className="growth-pricing-example-head">
          <span>One simple calculation</span>
          <strong>5% fee on growth after added ad spend</strong>
        </div>
        <div className="growth-pricing-equation">
          <div className="growth-pricing-equation-item">
            <span>Additional net sales</span>
            <strong>{money(addedSales)}</strong>
          </div>
          <span className="growth-pricing-operator" aria-hidden="true">−</span>
          <div className="growth-pricing-equation-item">
            <span>Additional ad spend</span>
            <strong>{money(addedAdSpend)}</strong>
          </div>
          <span className="growth-pricing-operator" aria-hidden="true">=</span>
          <div className="growth-pricing-equation-item growth-pricing-growth">
            <span>Growth after ad spend</span>
            <strong>{money(growthAfterAds)}</strong>
          </div>
        </div>
        <div className="growth-pricing-outcome">
          <div>
            <span>Amplify fee · 5%</span>
            <strong>{money(fee)}</strong>
          </div>
          <div className="growth-pricing-kept">
            <span>You keep</span>
            <strong>{money(brandKeeps)}</strong>
          </div>
        </div>
        <p className="growth-pricing-note">
          Illustration: $6,000 more net sales and $2,000 more ad spend.
        </p>
      </div>
    </section>
  );
}
