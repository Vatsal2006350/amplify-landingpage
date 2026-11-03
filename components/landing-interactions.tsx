"use client";
import { useEffect, useRef, useState } from "react";
import { scenes } from "./landing-scenes";
const steps = [
  {
    label: "Bring in your catalog",
    short: "Catalog",
    detail: "Start with the photos and product file you already have.",
  },
  {
    label: "Prepare better listings",
    short: "Listings",
    detail: "Add the images and details each channel needs.",
  },
  {
    label: "Create campaign variations",
    short: "Ads",
    detail: "Give customers a reason to click. Review before publishing.",
  },
  {
    label: "Plan the next sale",
    short: "Sales planning",
    detail: "Ask what sold and what needs restocking.",
  },
];
export function ProductJourney() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (
      !playing ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = window.setInterval(() => {
      const bounds = ref.current?.getBoundingClientRect();
      if (bounds && bounds.top < window.innerHeight && bounds.bottom > 0)
        setActive((value) => (value + 1) % steps.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [playing]);
  const Scene = scenes[active];
  return (
    <div className="journey-scroll-track" ref={ref}>
      <div className="journey-mobile">
        {steps.map((step, index) => (
          <article key={step.short}>
            <span>0{index + 1}</span>
            <h3>{step.label}</h3>
            <p>{step.detail}</p>
          </article>
        ))}
      </div>
      <div className="journey sequence">
        <div className="journey-topbar">
          <div className="journey-topbar-title">
            <strong className="journey-wordmark">Amplify</strong>
            <span>One product, from photo to order</span>
          </div>
          <div className="sequence-top-actions">
            <button
              className="sequence-play"
              type="button"
              aria-label={
                playing
                  ? "Pause product demonstration"
                  : "Play product demonstration"
              }
              onClick={() => setPlaying((value) => !value)}
            >
              {playing ? "Ⅱ" : "▶"}
            </button>
          </div>
        </div>
        <div className="sequence-body">
          <div
            className="sequence-nav"
            aria-label="Product demonstration steps"
          >
            <div className="sequence-nav-heading">One product. Every step.</div>
            {steps.map((step, index) => (
              <button
                key={step.short}
                type="button"
                aria-pressed={active === index}
                className={`sequence-step ${active === index ? "is-active" : ""}`}
                onClick={() => {
                  setActive(index);
                  setPlaying(false);
                }}
              >
                <span className="sequence-step-number">0{index + 1}</span>
                <span className="sequence-step-copy">
                  <strong>{step.label}</strong>
                  <span className="sequence-step-mobile">{step.short}</span>
                  <small>{step.detail}</small>
                </span>
              </button>
            ))}
          </div>
          <div className="sequence-stage" data-stage={active}>
            <div className="sequence-stage-meta">
              <span>{steps[active].short.toUpperCase()}</span>
              <span>0{active + 1} / 04</span>
            </div>
            <div className="sequence-scene-wrap">
              <Scene />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function UseCaseMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const outside = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("mousedown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  return (
    <div ref={ref} className="use-case-menu">
      <button
        type="button"
        className="use-case-trigger"
        aria-expanded={open}
        aria-controls="landing-use-cases"
        onClick={() => setOpen((value) => !value)}
      >
        Use cases <span aria-hidden="true">▾</span>
      </button>
      {open && (
        <div className="use-case-panel" id="landing-use-cases">
          <div className="use-case-panel-card">
            {[
              [
                "Images & ads",
                "/#images-ads",
                "Create assets from existing photos",
              ],
              [
                "Marketplace listings",
                "/#how-it-works",
                "Prepare your product for each channel",
              ],
              [
                "Sales & inventory",
                "/#inventory",
                "See what to promote or restock",
              ],
              [
                "Growth pilot pricing",
                "/pricing",
                "Pay only when sales increase",
              ],
            ].map(([label, href, description]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>
                {label}
                <small>{description}</small>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
