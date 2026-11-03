# Positioning and pricing in the current public website layout

Uses the layout shown at use-amplify.com: centered Instrument Serif headline, light background, rounded green buttons and the dark green four-stage product demonstration. The repository default branch had a different document-style design. The homepage markup, demo scenes and CSS were recovered from the public website so this change follows the selected design rather than redesigning it.

Keeps the existing channel, customer and inventory section layouts. Updates the mission and supporting copy in place. Places creative examples after the hero and adds listing before-and-after content plus a section explaining reduced operational work, using existing section and card styles. Customer stories explain each brand’s use. Navigation follows images/ads, listings and sales/inventory. All booking buttons say Book a call. Pricing retains the agreed offer. The product demo follows native scrolling through steps 1–4, continuously blends and drifts adjacent scenes through fractional scroll progress inside a stable frame and releases after the fourth step. Headings and sidebar emphasis blend with the scenes, while a progress line replaces the changing stage counter. Step buttons move to each scene’s fully visible position; the arrow advances or continues below. The sticky card is capped at 720px and disabled on short screens or for reduced motion. Mobile retains the live layout's stacked step cards.

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
- Browser checks cover desktop and phone layouts.
- Check existing demo controls, navigation anchors, calculator edits and invalid inputs, displayed images and `/pricing`.

Review locally with `npm run dev -- --port 3187` or run the built site with `npm run start -- --port 3187`. Review against the screenshot and commercial terms before merging and deploying. The GitHub deployment metadata points at the older default-branch version while the public domain serves the sales-led version, so verify the hosting project and production branch before publishing.

Scroll regression checks: forward and reverse stage selection at 1440×900, 1440×768 and 1000×1100; stable sticky position and height; actual wheel scrolling releases after step 4; manual step navigation; phone, short-screen and reduced-motion fallbacks.

Continuous-motion checks: sampled full, quarter and halfway positions between scenes in both directions at three viewport sizes. Verified proportional opacity and opposing horizontal offsets, constant sticky size, end release and manual shortcut alignment. Mobile and reduced-motion fallbacks remain in normal page flow.
