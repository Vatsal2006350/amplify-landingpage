import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateGrowthFee } from "../lib/growth-pricing.ts";
test("charges 5% of growth after additional ad spend", () => {
  assert.deepEqual(calculateGrowthFee(20000, 26000, 2000, 4000), {
    additionalSales: 6000,
    additionalAdSpend: 2000,
    chargeableGrowth: 4000,
    fee: 200,
  });
});
test("no growth, declining sales and growth entirely funded by extra spend produce no fee", () => {
  for (const [sales, spend] of [
    [20000, 2000],
    [18000, 2000],
    [26000, 8000],
    [26000, 9000],
  ])
    assert.equal(calculateGrowthFee(20000, sales, 2000, spend).fee, 0);
});
test("reduced ad spend does not increase the sales-growth fee", () => {
  assert.equal(calculateGrowthFee(20000, 26000, 2000, 1000).fee, 300);
});
test("rounds fees to currency precision", () => {
  assert.equal(calculateGrowthFee(100, 123.45, 0, 0).fee, 1.17);
});
test("rejects missing, negative or non-finite measurements", () => {
  for (const invalid of [-1, NaN, Infinity])
    for (let index = 0; index < 4; index++) {
      const values: [number, number, number, number] = [
        20000, 26000, 2000, 4000,
      ];
      values[index] = invalid;
      assert.throws(() => calculateGrowthFee(...values));
    }
});
