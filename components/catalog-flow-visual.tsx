"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

const productRows = [
  ["Millet Mix", "Component"],
  ["Pancake Syrup", "Component"],
  ["Spatula", "Component"],
  ["Bowl", "Component"],
  ["Pan", "Component"],
];

const listingFields = [
  ["Product title", "Pancake Baking Kit"],
  ["Product details", "Millet mix, syrup, spatula, bowl and pan"],
  ["Product description", "A five-piece kit for making pancakes at home."],
];

const kitPhoto = "/images/customers/gusto-samples/pancake-kit-white-background.jpg";

export function CatalogFlowVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const connector = useTransform(scrollYProgress, [0.12, 0.58], [0, 1]);

  return (
    <div className="catalog-flow" ref={ref}>
      <article className="catalog-flow-source">
        <div className="catalog-flow-card-head">
          <span>01 / PRODUCT FILE</span>
          <span className="catalog-file-pill"><b aria-hidden="true">▦</b> products.xlsx</span>
        </div>
        <div className="catalog-source-table" role="table" aria-label="Gusto Foods kit components in a product file">
          <div className="catalog-source-row catalog-source-labels" role="row">
            <span role="columnheader">PRODUCT</span>
            <span role="columnheader">TYPE</span>
          </div>
          {productRows.map(([name, type]) => (
            <div className="catalog-source-row" role="row" key={name}>
              <span role="cell">{name}</span>
              <span role="cell">{type}</span>
            </div>
          ))}
        </div>
        <div className="catalog-source-product">
          <img src={kitPhoto} alt="Gusto Foods pancake kit photographed on a white background" />
          <div>
            <span>SOURCE PRODUCT PHOTO</span>
            <strong>Gusto Foods</strong>
            <small>Five separate items, packed as one kit</small>
          </div>
          <span className="catalog-source-check" aria-hidden="true">✓</span>
        </div>
      </article>

      <div className="catalog-flow-bridge" aria-hidden="true">
        <svg viewBox="0 0 96 160" preserveAspectRatio="none">
          <path className="catalog-bridge-track" d="M3 80 C 34 80, 40 80, 76 80" />
          <m.path
            className="catalog-bridge-line"
            d="M3 80 C 34 80, 40 80, 76 80"
            style={reducedMotion ? { pathLength: 1 } : { pathLength: connector }}
          />
          <path className="catalog-bridge-arrow" d="M68 72 L78 80 L68 88" />
          <circle className="catalog-bridge-dot" cx="14" cy="80" r="4" />
        </svg>
        <span>Group components</span>
      </div>

      <article className="catalog-flow-listing">
        <div className="catalog-flow-card-head">
          <span>02 / READY TO REVIEW</span>
          <span className="catalog-review-status"><i /> Check before publish</span>
        </div>
        <div className="catalog-listing-main">
          <div className="catalog-listing-photo">
            <img src={kitPhoto} alt="Pancake Baking Kit with its contents, photographed on white" />
            <span>GUSTO FOODS</span>
          </div>
          <div className="catalog-listing-copy">
            <span className="catalog-listing-eyebrow">PRODUCT LISTING</span>
            <h3>Pancake Baking Kit</h3>
            <div className="catalog-bundle-summary">5 components <span aria-hidden="true">→</span> 1 kit listing</div>
            <div className="catalog-listing-fields">
              {listingFields.map(([label, value]) => (
                <div className="catalog-listing-field" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="catalog-channel-row">
          <span>PREPARE FOR</span>
          <b>Shopify</b>
          <b>Amazon IN</b>
          <b>Flipkart</b>
        </div>
      </article>
    </div>
  );
}
