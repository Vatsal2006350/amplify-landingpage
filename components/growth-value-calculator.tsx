export function GrowthValueCalculator() {
  return (
    <section className="growth-value-section" aria-labelledby="growth-value-title">
      <div className="growth-value-heading">
        <h2 id="growth-value-title">
          Better ads and listings.
          <br />
          <em>Less repeat work.</em>
        </h2>
        <p>
          Create ads from your catalog, prepare channel listings, and use sales
          and stock to choose what to feature or reorder next.
        </p>
      </div>

      <div className="growth-compare" aria-label="Manual product work compared with Amplify">
        <article className="growth-compare-side growth-compare-manual">
          <header>
            <span className="growth-compare-mark" aria-hidden="true">×</span>
            <div>
              <span className="growth-compare-eyebrow">BEFORE</span>
              <h3>Doing it by hand</h3>
            </div>
          </header>
          <ul>
            <li><span aria-hidden="true">×</span><p>Create campaign assets one product at a time</p></li>
            <li><span aria-hidden="true">×</span><p>Re-enter product details for each channel</p></li>
            <li><span aria-hidden="true">×</span><p>Pull sales and stock from separate reports</p></li>
            <li><span aria-hidden="true">×</span><p>Decide what to feature or reorder manually</p></li>
          </ul>
        </article>

        <article className="growth-compare-side growth-compare-amplify">
          <header>
            <span className="growth-compare-mark" aria-hidden="true">✓</span>
            <div>
              <span className="growth-compare-eyebrow">WITH AMPLIFY</span>
              <h3>One connected workflow</h3>
            </div>
          </header>
          <ul>
            <li><span aria-hidden="true">✓</span><p>Generate campaign options from your catalog</p></li>
            <li><span aria-hidden="true">✓</span><p>Prepare channel listings from product details</p></li>
            <li><span aria-hidden="true">✓</span><p>Review sales and stock alongside your catalog</p></li>
            <li><span aria-hidden="true">✓</span><p>See what to promote, restock, or review next</p></li>
          </ul>
        </article>
      </div>

      <a className="button-primary growth-funnel-cta" href="https://cal.com/vatsal-shah-sbzsly/amplify-demo">
        Show me how to grow my sales <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
