"use client";
import { useState } from "react";
import { GrowthPricing } from "./growth-pricing";
import { FOUNDER_CALL_URL } from "../lib/growth-pricing";
const steps = [
  {
    title: "Start with your product",
    short: "Your product",
    body: "Bring the photos and catalog files you already have.",
    image: "/images/products/source-shoe-boot.jpg",
    alt: "Original brown boot product photograph",
    caption: "Your existing photo is the starting point.",
  },
  {
    title: "Make it ready to sell",
    short: "Better listings",
    body: "Create product images and prepare the details each marketplace requires.",
    image: "/images/products/customer-shoe-boot.jpg",
    alt: "Prepared brown boot product image",
    caption: "Clear imagery and useful details, ready for review.",
  },
  {
    title: "Give customers a reason to click",
    short: "Images & ads",
    body: "Create campaign variations from the same product, ready for your team to review.",
    image: "/images/ads/boot-city.jpg",
    alt: "Brown boot campaign creative in a city setting",
    caption:
      "A campaign creative variation. Performance is measured after launch.",
  },
  {
    title: "Decide what happens next",
    short: "Sales & stock",
    body: "Use sales and stock data to see what to improve, promote or restock.",
    image: "/images/product/ask-attention.jpg",
    alt: "Ask Amplify showing products that need inventory attention",
    caption: "A real food-catalog example of sales and stock decisions.",
  },
];
export function GrowthNav() {
  return (
    <header className="simple-nav">
      <a href="/" className="brand-mark" aria-label="Amplify home">
        <img src="/logo.png" alt="" />
        <span>Amplify</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="/#images-ads">Images & ads</a>
        <a href="/#listings">Listings</a>
        <a href="/#inventory">Sales & inventory</a>
        <a href="/#pricing">Pricing</a>
      </nav>
      <a className="nav-cta" href={FOUNDER_CALL_URL}>
        See it with your product <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
export function GrowthFooter() {
  return (
    <footer className="simple-footer">
      <a href="/" className="brand-mark">
        <img src="/logo.png" alt="" />
        <span>Amplify</span>
      </a>
      <p>Helping brands turn great products into growing businesses.</p>
      <div>
        <a href="/pricing">Pricing</a>
        <a href="/privacy">Privacy</a>
        <span>© {new Date().getFullYear()} Amplify</span>
      </div>
    </footer>
  );
}
export function GrowthHome() {
  const [active, setActive] = useState(0);
  return (
    <main className="growth-site">
      <GrowthNav />
      <section className="hero-section section-wrap">
        <p className="eyebrow">
          For brands selling across stores and marketplaces
        </p>
        <h1>
          Turn your catalog
          <br />
          into <em>more sales.</em>
        </h1>
        <p className="hero-description">
          Create better product images and ads. Build marketplace listings that
          help shoppers buy. Use your sales and stock data to decide what to
          improve next.
        </p>
        <div className="hero-actions">
          <a className="button-primary" href={FOUNDER_CALL_URL}>
            See Amplify with your product <span aria-hidden="true">↗</span>
          </a>
          <a className="text-link" href="#pricing">
            Pay only when sales increase <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="product-journey" id="how-it-works">
          <div className="journey-topbar">
            <strong>One product. More ways to sell it.</strong>
            <span>From your first photo to your next decision</span>
          </div>
          <div className="journey-body">
            <div
              role="tablist"
              aria-label="Product journey"
              className="journey-nav"
            >
              {steps.map((step, index) => (
                <button
                  key={step.short}
                  role="tab"
                  id={`journey-tab-${index}`}
                  aria-controls={`journey-panel-${index}`}
                  aria-selected={active === index}
                  tabIndex={active === index ? 0 : -1}
                  className={active === index ? "is-active" : ""}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => {
                    const next =
                      event.key === "ArrowDown" || event.key === "ArrowRight"
                        ? (index + 1) % steps.length
                        : event.key === "ArrowUp" || event.key === "ArrowLeft"
                          ? (index + steps.length - 1) % steps.length
                          : event.key === "Home"
                            ? 0
                            : event.key === "End"
                              ? steps.length - 1
                              : null;
                    if (next !== null) {
                      event.preventDefault();
                      setActive(next);
                      document.getElementById(`journey-tab-${next}`)?.focus();
                    }
                  }}
                >
                  <span className="step-index">0{index + 1}</span>
                  <span>
                    <strong>{step.title}</strong>
                    <small>{step.body}</small>
                  </span>
                </button>
              ))}
            </div>
            {steps.map((step, index) => (
              <div
                key={step.short}
                hidden={active !== index}
                role="tabpanel"
                id={`journey-panel-${index}`}
                aria-labelledby={`journey-tab-${index}`}
                tabIndex={0}
                className={`journey-stage ${index === 3 ? "journey-data" : ""}`}
              >
                <span className="eyebrow">
                  {step.short} · 0{index + 1} / 04
                </span>
                <img src={step.image} alt={step.alt} />
                <p>{step.caption}</p>
              </div>
            ))}
          </div>
          <p className="journey-note">
            The boot images show one product across creative stages. Sales and
            inventory screenshots show a separate live food catalog; they are
            not results for the boot.
          </p>
        </div>
      </section>
      <section className="section-wrap creative-section" id="images-ads">
        <div className="section-heading">
          <p className="eyebrow">Product Studio & AI Ads</p>
          <h2>
            One product photo.
            <br />
            <em>More ways to sell it.</em>
          </h2>
          <p>
            Create marketplace images and campaign variations from photos you
            already have. Give your team more creative options without arranging
            a new shoot for every campaign.
          </p>
        </div>
        <div className="creative-gallery">
          <figure className="source-photo">
            <span className="image-tag">Your starting photo</span>
            <img
              src="/images/products/source-shoe-boot.jpg"
              alt="Original boot photograph"
              loading="lazy"
            />
            <figcaption>Start with what you have.</figcaption>
          </figure>
          <figure>
            <span className="image-tag">Product image</span>
            <img
              src="/images/products/customer-shoe-boot.jpg"
              alt="Prepared boot product image"
              loading="lazy"
            />
            <figcaption>Prepare it for your product page.</figcaption>
          </figure>
          <figure>
            <span className="image-tag">Campaign creative</span>
            <img
              src="/images/ads/boot-cafe.jpg"
              alt="Boot campaign creative with a cafe setting"
              loading="lazy"
            />
            <figcaption>Explore a new campaign direction.</figcaption>
          </figure>
        </div>
        <p className="small-note">
          Review generated assets before use. Publishing is available for
          supported, connected Meta and Google Ads accounts. Meta ads are
          created paused; your team controls activation and budget.
        </p>
      </section>
      <section className="section-wrap listing-section" id="listings">
        <div className="section-heading">
          <p className="eyebrow">Marketplace listings</p>
          <h2>
            Give shoppers the information
            <br />
            <em>they need to buy.</em>
          </h2>
          <p>
            Turn incomplete product files into clear listings tailored to each
            marketplace. Review uncertain details before publishing or
            exporting.
          </p>
        </div>
        <div className="listing-comparison">
          <article className="listing-before">
            <span className="eyebrow">The starting point</span>
            <h3>Men Shoes Brown</h3>
            <p>A photo. A short title. Missing product details.</p>
            <dl>
              <div>
                <dt>Closure</dt>
                <dd>Missing</dd>
              </div>
              <div>
                <dt>Product description</dt>
                <dd>Missing</dd>
              </div>
              <div>
                <dt>Channel requirements</dt>
                <dd>Unchecked</dd>
              </div>
            </dl>
          </article>
          <span className="comparison-arrow" aria-hidden="true">
            ↗
          </span>
          <article className="listing-after">
            <span className="eyebrow">Prepared for review</span>
            <h3>Men’s Brown Lace-Up Ankle Boot</h3>
            <p>
              A clearer title and structured information help shoppers
              understand the product.
            </p>
            <dl>
              <div>
                <dt>Closure</dt>
                <dd>Lace-up, subject to review</dd>
              </div>
              <div>
                <dt>Product description</dt>
                <dd>Prepared from supplied product facts</dd>
              </div>
              <div>
                <dt>Channel requirements</dt>
                <dd>Validated against the selected template</dd>
              </div>
            </dl>
          </article>
        </div>
        <p className="small-note">
          Illustrative listing transformation. Material, sizing and other
          factual claims need supplier evidence or operator confirmation.
        </p>
      </section>
      <section className="connections-section section-wrap" id="connections">
        <div className="section-heading">
          <p className="eyebrow">Your channels, connected</p>
          <h2>
            Prepare once.
            <br />
            <em>Sell across channels.</em>
          </h2>
          <p>
            Connect supported stores and marketplaces directly. Where a direct
            connection is unavailable, prepare reviewed files for your team to
            upload.
          </p>
        </div>
        <div className="channel-groups">
          <div>
            <h3>Direct connections</h3>
            <div className="channel-logos">
              {["shopify", "amazon", "flipkart"].map((name) => (
                <img
                  key={name}
                  src={`/logos/platforms/${name}.svg`}
                  alt={
                    name === "shopify"
                      ? "Shopify"
                      : name === "amazon"
                        ? "Amazon"
                        : "Flipkart"
                  }
                  loading="lazy"
                />
              ))}
            </div>
            <p>
              Sales and supported listing or inventory updates, according to the
              permissions in your account.
            </p>
          </div>
          <div>
            <h3>Marketplace-ready files</h3>
            <div className="channel-logos">
              <img src="/logos/platforms/noon.svg" alt="Noon" loading="lazy" />
              <img
                src="/logos/platforms/trendyol.svg"
                alt="Trendyol"
                loading="lazy"
              />
              <span>Namshi</span>
              <span>Centrepoint</span>
              <span>6thStreet</span>
            </div>
            <p>
              Channel-specific templates and exports, reviewed before your team
              submits them.
            </p>
          </div>
        </div>
      </section>
      <section className="customer-proof section-wrap">
        <div className="section-heading">
          <p className="eyebrow">Real work, real brands</p>
          <h2>
            How brands use <em>Amplify.</em>
          </h2>
          <p>
            We help brands turn great products into growing businesses. Here is
            where that work starts.
          </p>
        </div>
        <div className="customer-proof-grid">
          <a
            href="https://www.geoomnii.com/"
            target="_blank"
            rel="noreferrer"
            className="customer-proof-card"
          >
            <img
              className="customer-image"
              src="/images/products/customer-shoe-boot.jpg"
              alt="Footwear catalog example"
              loading="lazy"
            />
            <div>
              <img
                className="customer-logo"
                src="/logos/geoomnii.png"
                alt="Geoomnii"
                loading="lazy"
              />
              <h3>Get footwear listings ready for each channel.</h3>
              <p>
                Prepare marketplace files from product data and images, with
                gaps visible for review.
              </p>
              <span className="eyebrow">Catalog & marketplace files</span>
            </div>
          </a>
          <a
            href="https://gustoindia.in/"
            target="_blank"
            rel="noreferrer"
            className="customer-proof-card"
          >
            <img
              className="customer-image"
              src="/images/customers/pmuk-gusto-hot-sauce.png"
              alt="Gusto Foods hot sauce creative"
              loading="lazy"
            />
            <div>
              <img
                className="customer-logo"
                src="/logos/gusto-foods.jpg"
                alt="Gusto Foods"
                loading="lazy"
              />
              <h3>Connect stock decisions with campaign work.</h3>
              <p>
                Manage product stock and bundles while creating campaign assets
                from the food catalog.
              </p>
              <span className="eyebrow">Inventory & creatives</span>
            </div>
          </a>
          <a
            href="https://metrobrands.com/"
            target="_blank"
            rel="noreferrer"
            className="customer-proof-card"
          >
            <div className="metro-pilot">
              <img
                src="/logos/metro-brands.png"
                alt="Metro Brands"
                loading="lazy"
              />
              <span className="image-tag">Listing pilot</span>
            </div>
            <div>
              <h3>Prepare richer footwear listings.</h3>
              <p>
                A focused listing pilot for product detail and marketplace
                readiness.
              </p>
              <span className="eyebrow">Listing pilot</span>
            </div>
          </a>
        </div>
      </section>
      <section className="inventory-section section-wrap" id="inventory">
        <div className="section-heading">
          <p className="eyebrow">Sales insights & inventory</p>
          <h2>
            What should you promote?
            <br />
            <em>What needs restocking?</em>
          </h2>
          <p>
            See what sells and which products need attention. Use available
            stock to inform what you advertise, and update supported marketplace
            listings linked to your products.
          </p>
        </div>
        <figure className="product-shot">
          <img
            src="/images/product/ask-attention.jpg"
            alt="Ask Amplify identifying stockouts and excess stock in a food catalog"
            loading="lazy"
          />
          <figcaption>
            <strong>Find the stock that needs attention.</strong>
            <span>
              A real food-catalog example. The figures belong to that business.
            </span>
          </figcaption>
        </figure>
        <div className="product-shot-row">
          <figure className="product-shot">
            <img
              src="/images/product/ask-ads.jpg"
              alt="Campaign workspace and an answer about products ready to advertise"
              loading="lazy"
            />
            <figcaption>
              <strong>Choose what is ready to promote.</strong>
              <span>Use stock context alongside campaign preparation.</span>
            </figcaption>
          </figure>
          <figure className="product-shot">
            <img
              src="/images/product/best-sellers.jpg"
              alt="Best-selling products ranked by units in a food catalog"
              loading="lazy"
            />
            <figcaption>
              <strong>See what actually sold.</strong>
              <span>Ask questions grounded in your connected sales data.</span>
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="operations-section section-wrap">
        <div className="section-heading">
          <p className="eyebrow">Less work behind every sale</p>
          <h2>
            Grow without repeating the work
            <br />
            <em>on every channel.</em>
          </h2>
        </div>
        <div className="operations-grid">
          <article>
            <span className="eyebrow">01 / Prepare</span>
            <h3>Fewer spreadsheets to rebuild.</h3>
            <p>
              Turn existing product files into channel-specific exports, with
              missing information flagged for review.
            </p>
          </article>
          <article>
            <span className="eyebrow">02 / Update</span>
            <h3>Fewer portals to repeat yourself in.</h3>
            <p>
              Update inventory on supported, connected listings using the
              product mappings your team maintains.
            </p>
          </article>
          <article>
            <span className="eyebrow">03 / Understand</span>
            <h3>Less time assembling reports.</h3>
            <p>
              Ask about sales and stock in one workspace, with the underlying
              sources close to the answer.
            </p>
          </article>
        </div>
      </section>
      <GrowthPricing />
      <section className="early-access-section section-wrap">
        <p className="eyebrow">Start with one product</p>
        <h2>
          See what’s holding
          <br />
          <em>your products back.</em>
        </h2>
        <p>
          Bring one product. We’ll show you how Amplify can improve its images
          and marketplace listing, then discuss whether a growth pilot fits.
        </p>
        <a className="button-primary" href={FOUNDER_CALL_URL}>
          See Amplify with your product <span aria-hidden="true">↗</span>
        </a>
        <p className="small-note">
          No setup fee. No monthly platform fee. Pay only when sales increase
          under your agreed pilot terms.
        </p>
      </section>
      <GrowthFooter />
    </main>
  );
}
