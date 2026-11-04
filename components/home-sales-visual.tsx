"use client";

import { useEffect, useRef, useState } from "react";

const request = "Create Instagram ads for my best-selling products";

const ads = [
  {
    name: "Aila sandal",
    image: "/images/ads/customer-examples/geoomnii-aila.png",
    alt: "Generated Aila sandal ad with festive styling and the sandal in view",
    shape: "portrait",
  },
  {
    name: "Allyson heel",
    image: "/images/ads/customer-examples/geoomnii-allyson.png",
    alt: "Generated Allyson heel ad with a festive campaign setting",
    shape: "portrait",
  },
  {
    name: "Chilli Vinegar",
    image: "/images/ads/customer-examples/gusto-chilli-vinegar.png",
    alt: "Generated chilli vinegar ad with the bottles and a prepared dish",
    shape: "square",
  },
];

export function HomeSalesVisual() {
  const visual = useRef<HTMLDivElement>(null);
  const [typedLength, setTypedLength] = useState(0);
  const [phase, setPhase] = useState("idle");

  useEffect(() => {
    const element = visual.current;
    if (!element) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setTypedLength(request.length);
      setPhase("ready");
      return;
    }

    let timers: ReturnType<typeof setTimeout>[] = [];
    let interval: ReturnType<typeof setInterval> | undefined;
    let started = false;
    let typed = 0;
    const start = () => {
      if (started) return;
      started = true;
      setTypedLength(0);
      setPhase("typing");
      interval = setInterval(() => {
        typed += 1;
        setTypedLength(Math.min(typed, request.length));
        if (typed >= request.length) {
          if (interval) clearInterval(interval);
          timers.push(setTimeout(() => setPhase("submitted"), 350));
          timers.push(setTimeout(() => setPhase("generating"), 850));
          timers.push(setTimeout(() => setPhase("ready"), 2700));
        }
      }, 34);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      className="bulk-ads-visual"
      data-phase={phase}
      ref={visual}
      aria-label="Ask Amplify to create ads using product catalog and sales data"
    >
      <header className="bulk-ads-topbar">
        <span className="bulk-ads-brand">
          <img src="/logo.png" alt="" />
          <strong>Ask Amplify</strong>
        </span>
        <span className="bulk-ads-workspace">Catalog · 3 products</span>
      </header>

      <div className="bulk-ads-workflow">
        <section className="bulk-ads-ask" aria-label="Ask Amplify for ads">
          <div className="bulk-ads-prompt">
            <p aria-label={request}>{request.slice(0, typedLength)}</p>
            {(phase === "typing" || phase === "idle") && <span className="bulk-ads-cursor" aria-hidden="true" />}
            <span className="bulk-ads-send" aria-hidden="true">↑</span>
            <span className={`bulk-ads-enter${phase === "submitted" ? " is-pressed" : ""}`} aria-hidden="true">↵</span>
          </div>
          <div className="bulk-ads-source">
            <div className="bulk-ads-source-icon" aria-hidden="true">↗</div>
            <div><strong>Using sales + product photos</strong><span>Top-selling products matched to their catalog images</span></div>
            <span className="bulk-ads-source-check" aria-hidden="true">✓</span>
          </div>
        </section>

        <div className="bulk-ads-connector" aria-hidden="true">
          <span>{phase === "generating" ? <i /> : "→"}</span>
        </div>

        <section className="bulk-ads-results" aria-label="Generated customer ads">
          <div className="bulk-ads-results-head">
            <strong>{phase === "ready" ? "Ads ready to review" : phase === "generating" ? "Creating product ads" : "Your ad request"}</strong>
            <span className="bulk-ads-live-status" aria-live="polite">
              {phase === "ready" ? "3 products" : phase === "generating" ? "Matching products to campaign scenes" : phase === "submitted" ? "Request sent" : "Ready to create"}
            </span>
          </div>
          {phase === "ready" ? (
            <div className="bulk-ads-card-grid">
              {ads.map((ad, index) => (
                <article className={`bulk-ad-card bulk-ad-card-${index + 1}`} key={ad.name}>
                  <div className={`bulk-ad-image bulk-ad-image-${ad.shape}`}>
                    <img src={ad.image} alt={ad.alt} />
                  </div>
                  <div className="bulk-ad-card-copy">
                    <strong>{ad.name}</strong>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={`bulk-ads-creation-state${phase === "generating" ? " is-generating" : ""}`} aria-hidden="true">
              <div className="bulk-ads-creation-copy">
                <span className="bulk-ads-creation-spark">✦</span>
                <div>
                  <strong>{phase === "generating" ? "Building each creative" : phase === "submitted" ? "Using your catalog" : "Your product photos and sales data"}</strong>
                  <span>{phase === "generating" ? "Creating a different ad for each product" : "One request can prepare ads for several products"}</span>
                </div>
              </div>
              <div className="bulk-ads-scan-track"><span /></div>
              <div className="bulk-ads-skeleton-grid"><i /><i /><i /></div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
