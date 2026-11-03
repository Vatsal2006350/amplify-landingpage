/** Public growth-pilot terms. All amounts use the same currency and period. */
export const GROWTH_FEE_RATE = 0.05;
export const PILOT_DAYS = 90;
export const FOUNDER_CALL_URL =
  "https://cal.com/vatsal-shah-sbzsly/amplify-demo";
export function calculateGrowthFee(
  baselineSales: number,
  currentSales: number,
  baselineAdSpend: number,
  currentAdSpend: number,
) {
  const amounts = [
    baselineSales,
    currentSales,
    baselineAdSpend,
    currentAdSpend,
  ];
  if (amounts.some((value) => !Number.isFinite(value) || value < 0))
    throw new Error("Enter non-negative amounts in the same currency.");
  const additionalSales = currentSales - baselineSales;
  const additionalAdSpend = Math.max(0, currentAdSpend - baselineAdSpend);
  const chargeableGrowth = Math.max(0, additionalSales - additionalAdSpend);
  return {
    additionalSales,
    additionalAdSpend,
    chargeableGrowth,
    fee: Math.round(chargeableGrowth * GROWTH_FEE_RATE * 100) / 100,
  };
}
