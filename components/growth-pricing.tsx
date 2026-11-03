"use client";
import { useState } from "react";
import {
  calculateGrowthFee,
  FOUNDER_CALL_URL,
  GROWTH_FEE_RATE,
} from "../lib/growth-pricing";
const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
export function GrowthPricing() {
  const [values, setValues] = useState(["20000", "26000", "2000", "4000"]);
  const valid = values.every(
    (value) =>
      value.trim() !== "" &&
      Number.isFinite(Number(value)) &&
      Number(value) >= 0,
  );
  const result = valid
    ? calculateGrowthFee(
        Number(values[0]),
        Number(values[1]),
        Number(values[2]),
        Number(values[3]),
      )
    : null;
  return (
    <section id="pricing" className="growth-pricing section-wrap">
      <div className="section-heading">
        <p className="eyebrow">Pricing that grows with you</p>
        <h2>
          You grow.
          <br />
          <em>Then we get paid.</em>
        </h2>
        <p>
          No setup fee. No monthly platform fee. Pay only when sales increase
          above your agreed baseline.
        </p>
      </div>
      <div className="pricing-layout">
        <div className="pricing-offer">
          <div className="pricing-rate">
            {GROWTH_FEE_RATE * 100}
            <span>%</span>
          </div>
          <p className="rate-caption">
            of additional sales, after deducting increases in advertising spend.
          </p>
          <ul className="plain-checks">
            <li>Start with a small product group on one channel.</li>
            <li>Agree on your baseline before work begins.</li>
            <li>See the calculation behind every fee.</li>
            <li>No increase means a $0 Amplify fee.</li>
          </ul>
          <a href={FOUNDER_CALL_URL} className="button-primary">
            Start a growth pilot <span aria-hidden="true">↗</span>
          </a>
          <p className="small-note">
            90-day initial pilot. Cancel anytime. Advertising spend is paid
            separately.
          </p>
        </div>
        <div className="fee-calculator">
          <p className="eyebrow">See how it adds up</p>
          <h3>Your growth. Your numbers.</h3>
          <p className="calculator-intro">
            Illustrative amounts in USD for the same four-week period. This is a
            fee example, not a forecast.
          </p>
          <div className="calculator-fields">
            {[
              "Baseline net sales",
              "Current net sales",
              "Baseline ad spend",
              "Current ad spend",
            ].map((label, index) => (
              <label key={label}>
                {label}
                <div className="money-field">
                  <span aria-hidden="true">$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    inputMode="decimal"
                    value={values[index]}
                    aria-invalid={
                      values[index].trim() === "" ||
                      !Number.isFinite(Number(values[index])) ||
                      Number(values[index]) < 0
                    }
                    onChange={(event) =>
                      setValues((previous) =>
                        previous.map((value, i) =>
                          i === index ? event.target.value : value,
                        ),
                      )
                    }
                  />
                </div>
              </label>
            ))}
          </div>
          <div
            className="calculator-result"
            aria-live="polite"
            aria-atomic="true"
          >
            {result ? (
              <>
                <div>
                  <span>Additional net sales</span>
                  <strong>{money(result.additionalSales)}</strong>
                </div>
                <div>
                  <span>Less additional ad spend</span>
                  <strong>{money(result.additionalAdSpend)}</strong>
                </div>
                <div>
                  <span>Growth used to calculate your fee</span>
                  <strong>{money(result.chargeableGrowth)}</strong>
                </div>
                <div className="total-fee">
                  <span>Your Amplify fee · 5%</span>
                  <strong>{money(result.fee)}</strong>
                </div>
              </>
            ) : (
              <p>
                Enter a non-negative amount in each field to calculate your fee.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="pricing-details">
        <h3>Agreed up front. Measured transparently.</h3>
        <div className="terms-grid">
          <div>
            <h4>A baseline you can inspect</h4>
            <p>
              We use average weekly net sales over the previous eight complete
              weeks, multiplied by four. Before starting, we agree in writing on
              any adjustments for known promotions or stockouts and record the
              baseline ad spend.
            </p>
          </div>
          <div>
            <h4>A clearly defined comparison</h4>
            <p>
              We measure the agreed products on one channel in four-week
              periods. Net sales means product revenue after discounts and
              refunds, excluding taxes and shipping. Increased advertising spend
              is deducted before applying the 5% fee.
            </p>
          </div>
          <div>
            <h4>A bounded first commitment</h4>
            <p>
              The initial pilot lasts 90 days. Cancel anytime with no
              cancellation fee. Any final partial period uses a baseline
              prorated to its length. There are no fees on sales after
              cancellation.
            </p>
          </div>
          <div>
            <h4>For products with sales history</h4>
            <p>
              This offer starts with established products with eight complete
              weeks of usable history. New launches need a separately agreed
              offer. We agree the product scope and how returns are reconciled
              before you start.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
