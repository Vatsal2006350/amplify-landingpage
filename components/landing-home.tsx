import { LandingNav, LandingFooter } from "./landing-shell";
import { ProductJourney } from "./landing-interactions";
import { GrowthPricing } from "./growth-pricing";
import { GrowthValueCalculator } from "./growth-value-calculator";
import { CreativeExamples } from "./sections/creative-examples";
import { HomeSalesVisual } from "./home-sales-visual";
import { LandingLoopVisual } from "./landing-loop";
import { ListingBenefits } from "./sections/sales-benefits";
export function LandingHome() {
  return (
    <main className="landing-page">
      <LandingNav />
      <section className="hero-section">
        <div className="hero-copy">
          <h1>
            {"Turn your catalog"}
            <br />
            {"into "}
            <em>{"more sales."}</em>
          </h1>
          <p className="hero-description">
            {
              "Turn catalog photos into ads and listings shoppers can understand. Use sales and stock to decide what to promote next."
            }
          </p>
          <div className="hero-actions">
            <a
              className="button-primary"
              href="https://cal.com/vatsal-shah-sbzsly/amplify-demo"
            >
              {"Book a call "}
              <span aria-hidden="true">{"↗"}</span>
            </a>
            <a className="text-link" href="#how-it-works">
              {"See how it works "}
              <span aria-hidden="true">{"↓"}</span>
            </a>
          </div>
        </div>
        <div id="how-it-works">
          <ProductJourney />
        </div>
      </section>
      <CreativeExamples />
      <ListingBenefits />
      <section id="connections" className="connections-section">
        <div className="connections-copy">
          <h2>
            {"Prepare once."}
            <br />
            <em>{"Sell across channels."}</em>
          </h2>
          <p>
            {
              "Connect supported stores and marketplaces directly. Prepare reviewed upload files for channels without a direct connection. Available updates depend on your account permissions."
            }
          </p>
        </div>
        <div
          className="connection-map"
          aria-label="Amplify connects product work to commerce channels"
        >
          <div className="connection-hub">
            <img src="/logo.png" alt="" />
            <strong>{"Amplify"}</strong>
            <small>{"Your catalog"}</small>
          </div>
          <div className="connection-line" aria-hidden="true"></div>
          <div className="connection-channels">
            <span>
              <img src="/logos/platforms/shopify.svg" alt="Shopify" />
            </span>
            <span>
              <img src="/logos/platforms/amazon.svg" alt="Amazon" />
            </span>
            <span>
              <img src="/logos/platforms/flipkart.svg" alt="Flipkart" />
            </span>
            <span>
              <img src="/logos/platforms/noon.svg" alt="noon" />
            </span>
            <span>
              <img src="/logos/platforms/trendyol.svg" alt="Trendyol" />
            </span>
            <span className="connection-sixth">
              <img src="/logos/platforms/sixth-street.png" alt="6thStreet" />
            </span>
            <span className="connection-name">{"namshi"}</span>
            <span>
              <img src="/logos/platforms/walmart.svg" alt="Walmart" />
            </span>
            <span>
              <img src="/logos/platforms/meta.svg" alt="Meta Ads" />
            </span>
          </div>
        </div>
        <p className="channel-note">
          {
            "Direct connections: Shopify, Amazon and Flipkart. Marketplace-file preparation includes Noon, Trendyol, Namshi, Centrepoint and 6thStreet. Ad publishing requires a supported, connected advertising account."
          }
        </p>
      </section>
      <section
        className="customer-proof"
        aria-label="Teams working with Amplify"
      >
        <div className="customer-proof-heading">
          <h2>
            {"How brands use "}
            <em>{"Amplify."}</em>
          </h2>
          <p className="mission-copy">
            {"We help brands turn great products into growing businesses."}
          </p>
        </div>
        <div className="customer-proof-grid">
          <a
            className="customer-proof-card"
            href="https://www.geoomnii.com/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="customer-proof-image">
              <img
                src="/images/products/customer-shoe-boot.jpg"
                alt="Footwear catalog example"
              />
            </div>
            <div className="customer-proof-content">
              <div className="customer-proof-logo">
                <img src="/logos/geoomnii.png" alt="Geoomnii" />
              </div>
              <h3>
                {"Turn a large footwear catalog into channel-ready listings."}
              </h3>
              <p>
                {
                  "Geoomnii works across marketplaces with different listing requirements. Amplify brings product files and images into channel-specific exports, with gaps visible for the team to review."
                }
              </p>
              <span>{"CATALOG · MARKETPLACE FILES"}</span>
            </div>
          </a>
          <a
            className="customer-proof-card"
            href="https://gustoindia.in/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="customer-proof-image">
              <img
                src="/images/customers/pmuk-gusto-hot-sauce.png"
                alt="Gusto Foods product creative"
              />
            </div>
            <div className="customer-proof-content">
              <div className="customer-proof-logo">
                <img src="/logos/gusto-foods.jpg" alt="Gusto Foods" />
              </div>
              <h3>{"Bring food-catalog stock and campaign work together."}</h3>
              <p>
                {
                  "Gusto manages products sold as singles and bundles across channels. Amplify supports stock updates and sales reporting alongside campaign creative preparation."
                }
              </p>
              <span>{"INVENTORY · CREATIVES"}</span>
            </div>
          </a>
          <a
            className="customer-proof-card"
            href="https://metrobrands.com/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="customer-proof-image customer-proof-metro">
              <img src="/logos/metro-brands.png" alt="Metro Brands" />
              <span>{"LISTING PILOT"}</span>
            </div>
            <div className="customer-proof-content">
              <div className="customer-proof-logo">
                <img src="/logos/metro-brands.png" alt="Metro Brands" />
              </div>
              <h3>{"Review footwear listings before they go live."}</h3>
              <p>
                {
                  "Metro Brands is running a focused listing pilot. Amplify helps review product details and marketplace readiness within the pilot’s agreed catalog-only scope."
                }
              </p>
              <span>{"LISTING PILOT"}</span>
            </div>
          </a>
        </div>
      </section>
      <section id="inventory" className="inventory-section is-live">
        <div className="inventory-heading">
          <h2>
            {"Make ads for the products"}
            <br />
            <em>{"people already buy."}</em>
          </h2>
          <p>
            {
              "Ask Amplify for a batch of product ads using your catalog and sales. Review each creative before it goes out."
            }
          </p>
        </div>
        <HomeSalesVisual />
      </section>
      <GrowthValueCalculator />
      <GrowthPricing />
      <section id="early-access" className="early-access-section">
        <div className="early-access-inner">
          <div>
            <h2>
              {"See what’s holding"}
              <br />
              <em>{"your products back."}</em>
            </h2>
            <p>
              {
                "Bring one product. We’ll show you how Amplify can improve its images and marketplace listing, then discuss a growth pilot."
              }
            </p>
          </div>
          <div className="early-access-art-column">
            <LandingLoopVisual />
            <a
              className="button-primary"
              href="https://cal.com/vatsal-shah-sbzsly/amplify-demo"
            >
              {"Book a call "}
              <span aria-hidden="true">{"↗"}</span>
            </a>
          </div>
        </div>
      </section>
      <LandingFooter />
    </main>
  );
}
