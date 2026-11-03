# Growth positioning and pricing

This revision uses the public homepage headed “Turn your catalog into more sales” as its design and messaging baseline. The repository default branch contained an older “Retail operations” homepage. Existing public product examples have been brought into the repository rather than replaced with fabricated performance results.

The homepage connects images and ads to marketplace listings, then sales and inventory decisions. Customer examples describe usage rather than claim measured growth. Metro remains identified as a listing pilot. Direct marketplace connections are distinguished from file exports.

## Growth pilot offer

- No setup fee or monthly platform fee.
- Initial 90-day pilot on an agreed product group and one channel.
- Eight complete weeks of usable sales history required.
- Four-week baseline: average weekly net sales over the previous eight complete weeks, multiplied by four. Known promotion and stockout adjustments are agreed in writing before starting.
- Net sales exclude shipping and taxes, after discounts and refunds.
- Fee: 5% × max(0, current net sales − baseline net sales − max(0, current ad spend − baseline ad spend)).
- Advertising is paid separately. Lower advertising spend does not increase chargeable growth.
- Cancel anytime without a cancellation fee. Prorate the sales and advertising baselines for a partial final period. No fees on sales after cancellation.
- Agree scope and refund reconciliation before enrollment. New launches require a separate offer.

The homepage and `/pricing` share the same pricing component and calculation. These are public marketing terms and a calculator, not a billing integration or an automated attribution engine. Booking continues to the existing founder calendar.

## Verification

- `npm test` (uses Node's TypeScript stripping; Node 22.18+ or 24).
- `npx tsc --noEmit`.
- `npm run build`.
- Browser checks at 1440px, 390px and 320px; no horizontal overflow.
- Checked journey selection and keyboard navigation, calculator edits and invalid inputs, all displayed images, `/pricing`, and the social image.

Review locally with `npm run dev -- --port 3187` or run the built site with `npm run start -- --port 3187`. Merge and deploy after reviewing the UI and commercial terms. The GitHub deployment metadata points at the older default-branch version while the public domain serves the sales-led version, so verify the hosting project and production branch before publishing.
