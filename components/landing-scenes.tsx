export const scenes = [
  function Scene0() {
    return (
      <>
        <div className="sequence-scene sequence-catalog">
          <div className="intake-sources">
            <span>
              <small>{"Excel"}</small>
              {"products.xlsx"}
            </span>
            <span>
              <small>{"ERP"}</small>
              {"Item export"}
            </span>
            <span>
              <small>{"Photos"}</small>
              {"Drop folder"}
            </span>
          </div>
          <div className="sequence-sheet">
            <div className="sequence-sheet-top">
              <span>{"Incoming catalog"}</span>
              <span>{"3 sources"}</span>
            </div>
            <div className="sequence-sheet-head">
              <span>{"IMAGE"}</span>
              <span>{"PRODUCT"}</span>
              <span>{"CAME FROM"}</span>
              <span>{"STATUS"}</span>
            </div>
            <div className="sequence-sheet-row sequence-sheet-primary">
              <img src="/images/products/source-shoe-boot.jpg" alt="" />
              <strong>{"Men Shoes Brown"}</strong>
              <span>{"Photo folder"}</span>
              <span className="sequence-status">{"Needs work"}</span>
            </div>
            <div className="sequence-sheet-row sequence-sheet-primary">
              <img src="/images/products/source-shoe-boot.jpg" alt="" />
              <strong>{"Brown boots · EU 39"}</strong>
              <span>{"ERP export"}</span>
              <span className="sequence-status-quiet">{"In file"}</span>
            </div>
            <div className="sequence-sheet-row sequence-sheet-primary">
              <img
                src="/images/products/source-shoe-boot.jpg"
                alt=""
              />
              <strong>{"Brown boots · EU 40"}</strong>
              <span>{"Supplier sheet"}</span>
              <span className="sequence-status-quiet">{"In file"}</span>
            </div>
          </div>
          <div className="sequence-intake-note">
            <span className="sequence-pulse"></span>
            <div>
              <strong>{"Catalog in"}</strong>
              <span>
                {"The sheet, the ERP, and the photos land in one list."}
              </span>
            </div>
          </div>
        </div>
      </>
    );
  },
  function Scene1() {
    return (
      <>
        <div className="sequence-scene sequence-listing">
          <div className="sequence-transformation">
            <div className="sequence-source-card">
              <div className="sequence-transformation-heading">
                <span>{"01 / SOURCE LISTING"}</span>
                <small>{"As received"}</small>
              </div>
              <img
                alt="Unstyled phone photo of the brown boots on a cluttered floor"
                src="/images/products/source-shoe-boot.jpg"
              />
              <div className="sequence-source-copy">
                <strong>{"Men Shoes Brown"}</strong>
                <span>{"No description · Missing attributes"}</span>
              </div>
            </div>
            <div
              className="sequence-processing"
              aria-label="Amplify prepares the product image, title, details, and marketplace fields"
            >
              <div className="sequence-processing-orbit">
                <span>{"✦"}</span>
              </div>
              <div className="sequence-processing-copy">
                {"Preparing"}
                <br />
                {"your listing"}
              </div>
              <div className="sequence-processing-arrow" aria-hidden="true">
                {"→"}
              </div>
            </div>
            <div className="sequence-finished-card">
              <div className="sequence-transformation-heading">
                <span>{"02 / CHANNEL-READY LISTING"}</span>
                <small>{"Review to publish"}</small>
              </div>
              <div className="sequence-finished-body">
                <div className="sequence-finished-image">
                  <img
                    alt="The full pair of boots in a clean product photograph"
                    src="/images/products/customer-shoe-boot.jpg"
                  />
                </div>
                <div className="sequence-finished-copy">
                  <h3>{"Men’s Brown Lace-Up Ankle Boots"}</h3>
                  <ul>
                    <li>{"Adjustable lace-up closure"}</li>
                    <li>{"Dark brown finish with stitched panels"}</li>
                    <li>{"Rounded toe and textured outsole"}</li>
                  </ul>
                  <p>
                    {
                      "Structured ankle boots for everyday wear. A lace-up front lets you adjust the fit."
                    }
                  </p>
                  <div>
                    <span>{"Brown"}</span>
                    <span>{"Ankle boot"}</span>
                    <span>{"Lace-up"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  },
  function Scene2() {
    return (
      <>
        <div className="sequence-scene sequence-ads">
          <div className="sequence-ad-label">
            <span>{"ONE PRODUCT"}</span>
            <span>{"→"}</span>
            <span>{"DIFFERENT CAMPAIGN DIRECTIONS"}</span>
          </div>
          <div className="sequence-ad-pair">
            <div className="sequence-ad-card sequence-ad-a">
              <img
                alt="Boot campaign on a rainy city street"
                src="/images/ads/boot-city.jpg"
              />
              <div>
                <span>{"CONCEPT A · CITY"}</span>
                <strong>{"Go further."}</strong>
                <small>{"Built for the long way."}</small>
              </div>
            </div>
            <div className="sequence-ad-card sequence-ad-b">
              <img
                alt="Boot campaign in a warm café"
                src="/images/ads/boot-cafe.jpg"
              />
              <div>
                <span>{"CONCEPT B · CAFÉ"}</span>
                <strong>
                  {"Make room"}
                  <br />
                  {"for the day."}
                </strong>
                <small>{"One pair. Plenty of plans."}</small>
              </div>
            </div>
          </div>
          <div className="sequence-ad-channels">
            <span>{"Prepare for marketplaces"}</span>
            <b>{"Shopify"}</b>
            <b>{"Amazon"}</b>
            <span className="sequence-ad-channel-divider"></span>
            <span>{"Connect Meta Ads to measure response"}</span>
          </div>
        </div>
      </>
    );
  },
  function Scene3() {
    return (
      <>
        <div className="sequence-scene sequence-results">
          <div className="sequence-test-card">
            <div className="sequence-card-heading">
              <span>{"Campaign ideas"}</span>
              <small>{"EXAMPLE"}</small>
            </div>
            <p>{"Illustrative click-through rates"}</p>
            <div className="sequence-option-grid">
              <div className="sequence-option sequence-option-a">
                <div className="sequence-option-art">
                  <img
                    alt="City rain ad concept for the brown boots"
                    src="/images/ads/boot-city.jpg"
                  />
                  <span>{"Go further."}</span>
                </div>
                <div className="sequence-option-meta">
                  <strong>{"City rain"}</strong>
                  <span>{"2.3%"}</span>
                </div>
                <div className="sequence-option-bar">
                  <i></i>
                </div>
              </div>
              <div className="sequence-option sequence-option-b">
                <div className="sequence-option-art">
                  <img
                    alt="Café ad concept for the brown boots"
                    src="/images/ads/boot-cafe.jpg"
                  />
                  <span>{"Make room for the day."}</span>
                </div>
                <div className="sequence-option-meta">
                  <strong>{"Café"}</strong>
                  <span>{"3.1%"}</span>
                </div>
                <div className="sequence-option-bar">
                  <i></i>
                </div>
              </div>
              <div className="sequence-option sequence-option-c">
                <div className="sequence-option-art">
                  <img
                    alt="Studio ad concept for the brown boots"
                    src="/images/ads/boot-studio.jpg"
                  />
                  <span>{"The everyday pair."}</span>
                </div>
                <div className="sequence-option-meta">
                  <strong>{"Studio"}</strong>
                  <span>{"2.7%"}</span>
                </div>
                <div className="sequence-option-bar">
                  <i></i>
                </div>
              </div>
              <div className="sequence-option sequence-option-d">
                <div className="sequence-option-art">
                  <img
                    alt="Trail ad concept for the brown boots"
                    src="/images/ads/boot-trail.jpg"
                  />
                  <span>{"Take the long way."}</span>
                </div>
                <div className="sequence-option-meta">
                  <strong>{"Trail"}</strong>
                  <span>{"3.4%"}</span>
                </div>
                <div className="sequence-option-bar">
                  <i></i>
                </div>
              </div>
            </div>
          </div>
          <div className="sequence-sales-card">
            <div className="sequence-card-heading">
              <span>{"Ask Amplify"}</span>
              <small>{"EXAMPLE"}</small>
            </div>
            <div className="sequence-ask-query">
              {
                "How are the brown boots selling? Is there enough stock for another campaign?"
              }
              <span
                className="sequence-typing-cursor"
                aria-hidden="true"
              ></span>
            </div>
            <div className="sequence-ask-response">
              <div className="sequence-sales-summary">
                <span>{"Boot sales this month"}</span>
                <strong>{"$42.8k"}</strong>
                <small>{"Sample data"}</small>
              </div>
              <div className="sequence-chart-heading">
                {"Boot sales by size"}
              </div>
              <div className="sequence-top-sku">
                <span>{"Brown boots · EU 38"}</span>
                <i>
                  <b></b>
                </i>
                <strong>{"132"}</strong>
              </div>
              <div className="sequence-top-sku">
                <span>{"Brown boots · EU 39"}</span>
                <i>
                  <b></b>
                </i>
                <strong>{"84"}</strong>
              </div>
              <div className="sequence-top-sku">
                <span>{"Brown boots · EU 40"}</span>
                <i>
                  <b></b>
                </i>
                <strong>{"61"}</strong>
              </div>
              <div className="sequence-chart-heading">{"Sales trend"}</div>
              <svg
                viewBox="0 0 450 160"
                preserveAspectRatio="none"
                role="img"
                aria-label="Example chart of sales rising over six weeks"
              >
                <path
                  className="sequence-chart-grid"
                  d="M0 35H450 M0 82H450 M0 128H450"
                ></path>
                <path
                  className="sequence-chart-area"
                  d="M0 139 C48 134 64 141 96 117 S156 124 191 99 S253 104 287 76 S348 91 377 48 S419 63 450 18 L450 160 L0 160 Z"
                  opacity="1"
                ></path>
                <path
                  className="sequence-chart-line"
                  d="M0 139 C48 134 64 141 96 117 S156 124 191 99 S253 104 287 76 S348 91 377 48 S419 63 450 18"
                  pathLength="1"
                  strokeDashoffset="0"
                  strokeDasharray="0.9999498984689126 1"
                ></path>
                <circle
                  cx="450"
                  cy="18"
                  r="5"
                  className="sequence-chart-point"
                  opacity="0.29698748447117396"
                ></circle>
              </svg>
              <div className="sequence-chart-axis">
                <span>{"WEEK 1"}</span>
                <span>{"WEEK 3"}</span>
                <span>{"WEEK 6"}</span>
              </div>
              <div className="sequence-stock">
                <span className="sequence-stock-dot"></span>
                {"Boots: stock is getting low "}
                <strong>{"Review PO draft →"}</strong>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  },
];
