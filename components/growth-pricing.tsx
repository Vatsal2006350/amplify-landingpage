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
    <section id="pricing" className="mx-auto max-w-[1200px] scroll-mt-[80px] px-4 py-16 sm:px-6 sm:py-24">
      <div className="max-w-[700px]">
        <p className="type-mono-label mb-4 text-[10px] text-[var(--orange)]">Pricing that grows with you</p>
        <h2 className="type-h2 text-[36px] leading-tight sm:text-[50px]">
          You grow.
          <br />
          <em className="text-[var(--orange)]">Then we get paid.</em>
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-[var(--ink-muted)]">
          No setup fee. No monthly platform fee. Pay only when sales increase
          above your agreed baseline.
        </p>
      </div>
      <div className="mt-10 grid overflow-hidden rounded-doc border border-[var(--ledger-strong)] lg:grid-cols-2">
        <div className="bg-[var(--paper-shade)] p-6 sm:p-8">
          <div className="font-sans text-[64px] font-semibold leading-none tracking-tight text-[var(--orange)]">
            {GROWTH_FEE_RATE * 100}
            <span>%</span>
          </div>
          <p className="mt-4 max-w-[340px] text-[16px] leading-relaxed">
            of additional sales, after deducting increases in advertising spend.
          </p>
          <ul className="my-7 space-y-3 text-[14px] leading-relaxed">
            <li>Start with a small product group on one channel.</li>
            <li>Agree on your baseline before work begins.</li>
            <li>See the calculation behind every fee.</li>
            <li>No increase means a $0 Amplify fee.</li>
          </ul>
          <a href={FOUNDER_CALL_URL} className="btn-press inline-flex items-center justify-center gap-4 rounded-doc bg-[var(--orange)] px-5 py-4 text-[13px] font-semibold text-[var(--paper)]">
            Start a growth pilot <span aria-hidden="true">↗</span>
          </a>
          <p className="mt-4 text-[12px] leading-relaxed text-[var(--ink-muted)]">
            90-day initial pilot. Cancel anytime. Advertising spend is paid
            separately.
          </p>
        </div>
        <div className="min-w-0 bg-[var(--paper-raised)] p-6 sm:p-8">
          <p className="type-mono-label mb-4 text-[10px] text-[var(--orange)]">See how it adds up</p>
          <h3 className="font-display text-[25px] leading-tight">Your growth. Your numbers.</h3>
          <p className="mb-6 mt-3 text-[12px] leading-relaxed text-[var(--ink-muted)]">
            Illustrative amounts in USD for the same four-week period. This is a
            fee example, not a forecast.
          </p>
          <div className="grid grid-cols-1 gap-4 min-[360px]:grid-cols-2">
            {[
              "Baseline net sales",
              "Current net sales",
              "Baseline ad spend",
              "Current ad spend",
            ].map((label, index) => (
              <label key={label} className="min-w-0 text-[12px] text-[var(--ink-muted)]">
                {label}
                <div className="mt-2 flex min-w-0 items-center gap-2 rounded-doc border border-[var(--ledger-strong)] bg-[var(--paper)] px-3 py-3 focus-within:outline focus-within:outline-2 focus-within:outline-[var(--orange)]">
                  <span aria-hidden="true">$</span>
                  <input
                    className="w-full min-w-0 bg-transparent text-[16px] text-[var(--ink)] outline-none"
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
            className="calculator-result mt-6 space-y-3 text-[12px] [&>div]:flex [&>div]:items-baseline [&>div]:justify-between [&>div]:gap-4 [&>div]:border-b [&>div]:border-[var(--ledger)] [&>div]:pb-3 [&_strong]:shrink-0"
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
                <div className="total-fee pt-3 text-[var(--orange)] [&>strong]:text-[26px]">
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
      <details className="mt-8">
        <summary className="cursor-pointer text-[15px] font-semibold">How the baseline and pilot work</summary>
        <div className="mt-5 grid gap-6 text-[13px] leading-relaxed text-[var(--ink-muted)] sm:grid-cols-2 [&_h4]:mb-2 [&_h4]:font-semibold [&_h4]:text-[var(--ink)]">
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
              cancellation fee. For a final partial period, sales and advertising baselines are prorated to its length. There are no fees on sales after
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
      </details>
    </section>
  );
}
