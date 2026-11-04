import { CatalogFlowVisual } from "../catalog-flow-visual";

export function ListingBenefits() {
  return (
    <section id="listings" className="catalog-listings-section">
      <div className="catalog-listings-heading">
        <span>PRODUCT FILE → CHANNEL LISTING</span>
        <h2>
          Separate products.
          <br />
          <em>One kit listing.</em>
        </h2>
        <p>
          Five product rows become one bundle, ready for each channel.
        </p>
      </div>
      <CatalogFlowVisual />
    </section>
  );
}

export function OperationalBenefits() {
  return (
    <section id="less-work" className="customer-proof">
      <div className="customer-proof-heading">
        <h2>
          Grow without repeating the work
          <br />
          <em>on every channel.</em>
        </h2>
        <p className="mission-copy">
          Spend less time maintaining files and switching between portals. Put
          more attention into your products and the decisions that grow your
          business.
        </p>
      </div>
      <div className="customer-proof-grid">
        {[
          {
            title: "Prepare marketplace files once.",
            body: "Use your existing catalog to create channel-specific files. Review missing information instead of rebuilding the same product data for each marketplace.",
          },
          {
            title: "Update connected listings together.",
            body: "Set inventory in one workspace and push it to supported listings linked to your products. See which updates are verified and which need attention.",
          },
          {
            title: "Get answers without rebuilding reports.",
            body: "Ask what sold and what needs restocking using your sales and stock data. Inspect the sources behind the answer before deciding what to do next.",
          },
        ].map((item) => (
          <article className="customer-proof-card" key={item.title}>
            <div className="customer-proof-content">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
