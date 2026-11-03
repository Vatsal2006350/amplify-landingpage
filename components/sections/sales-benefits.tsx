/** Content additions use the existing homepage section and card styles. */
export function ListingBenefits() {
  return (
    <section id="listings" className="inventory-section is-live">
      <div className="inventory-heading">
        <h2>
          Give shoppers the information
          <br />
          <em>they need to buy.</em>
        </h2>
        <p>
          Clear images help shoppers see the product. Useful details help them
          choose. Amplify turns incomplete catalog files into listings prepared
          for each marketplace.
        </p>
      </div>
      <div className="product-shot-row">
        <article className="product-shot">
          <div className="customer-proof-content">
            <p className="eyebrow">Before / product file</p>
            <h3>Men Shoes Brown</h3>
            <p>
              A basic photo and a short title. Missing details leave shoppers
              with questions, and missing marketplace fields create more work
              before launch.
            </p>
            <ul className="space-y-2 text-[14px] text-[var(--ink-muted)]">
              <li>Product type is unclear.</li>
              <li>Closure and product details are missing.</li>
              <li>Channel requirements still need checking.</li>
            </ul>
          </div>
        </article>
        <article className="product-shot">
          <div className="customer-proof-content">
            <p className="eyebrow">After / prepared for review</p>
            <h3>Men’s Brown Lace-Up Ankle Boots</h3>
            <p>
              A specific title helps shoppers understand what they are viewing.
              Clear imagery and structured details make the product easier to
              evaluate.
            </p>
            <ul className="space-y-2 text-[14px] text-[var(--ink-muted)]">
              <li>Show the product clearly in a prepared image.</li>
              <li>
                Explain the features supported by your product information.
              </li>
              <li>
                Check required fields against the selected marketplace template.
              </li>
            </ul>
          </div>
        </article>
      </div>
      <p className="mt-4 text-[12px] leading-relaxed text-[var(--ink-muted)]">
        Illustrative listing improvement. Your team confirms product facts and
        uncertain details before publishing. Conversion improvements are
        measured after launch.
      </p>
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
            label: "Less manual catalog work",
          },
          {
            title: "Update connected listings together.",
            body: "Set inventory in one workspace and push it to supported listings linked to your products. See which updates are verified and which need attention.",
            label: "Less repeated portal work",
          },
          {
            title: "Get answers without rebuilding reports.",
            body: "Ask what sold and what needs restocking using your sales and stock data. Inspect the sources behind the answer before deciding what to do next.",
            label: "Less time assembling reports",
          },
        ].map((item) => (
          <article className="customer-proof-card" key={item.title}>
            <div className="customer-proof-content">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <span>{item.label}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
