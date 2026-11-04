"use client";
import { useEffect, useRef, useState } from "react";
import { scenes } from "./landing-scenes";
const steps = [
  {
    label: "Start with your product",
    short: "Catalog",
    detail: "Upload your existing photos and catalog files.",
  },
  {
    label: "Make it ready to sell",
    short: "Listings",
    detail:
      "Create product images and prepare the details each marketplace needs.",
  },
  {
    label: "Give customers a reason to click",
    short: "Ads",
    detail: "Generate campaign creative variations for your team to review.",
  },
  {
    label: "Decide what happens next",
    short: "Sales planning",
    detail: "See sales performance and identify stock that needs attention.",
  },
];
export function ProductJourney() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = ref.current;
    const demo = demoRef.current;
    if (!track || !demo) return;
    const pinned = window.matchMedia(
      "(min-width: 641px) and (min-height: 650px)",
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame: number | null = null;
    const update = () => {
      frame = null;
      if (!pinned.matches || reducedMotion.matches) {
        demo.querySelectorAll<HTMLElement>('[data-scene], [data-heading], [data-step]').forEach(element => {
          element.style.removeProperty('--scene-weight');
          element.style.removeProperty('--scene-offset');
        });
        demo.style.removeProperty('--journey-progress');
        return;
      }
      const start =
        track.getBoundingClientRect().top +
        window.scrollY -
        parseFloat(getComputedStyle(demo).top);
      const distance = track.offsetHeight - demo.offsetHeight;
      if (distance <= 0) return;
      const progress = Math.max(
        0,
        Math.min(1, (window.scrollY - start) / distance),
      );
      const position = progress * (steps.length - 1);
      demo.style.setProperty("--journey-progress", String(progress));
      // Keep the active scene discrete. Hysteresis prevents trackpad jitter at
      // a boundary while allowing a quick swipe to move directly to its target.
      setActive((previous) => {
        let next = previous;
        while (position > next + 0.58 && next < steps.length - 1) next++;
        while (position < next - 0.58 && next > 0) next--;
        return next;
      });
    };
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(track);
    observer.observe(demo);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    pinned.addEventListener("change", schedule);
    reducedMotion.addEventListener("change", schedule);
    schedule();
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      pinned.removeEventListener("change", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, []);

  const moveToStep = (index: number) => {
    const track = ref.current;
    const demo = demoRef.current;
    if (!track || !demo) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const distance = track.offsetHeight - demo.offsetHeight;
    const sticky = getComputedStyle(demo).position === "sticky";
    if (!sticky || distance <= 0 || reducedMotion) {
      setActive(Math.min(index, steps.length - 1));
      return;
    }
    const start =
      track.getBoundingClientRect().top +
      window.scrollY -
      parseFloat(getComputedStyle(demo).top);
    // Each shortcut lands where its scene is fully in view.
    const offset =
      index >= steps.length
        ? distance + 80
        : index === 0
          ? 0
          : (distance * index) / (steps.length - 1);
    window.scrollTo({ top: start + offset, behavior: "smooth" });
  };
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
      <div className="journey sequence" ref={demoRef}>
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
                active === steps.length - 1
                  ? "Continue below product demonstration"
                  : "Next product demonstration step"
              }
              onClick={() => moveToStep(active + 1)}
            >
              <span aria-hidden="true">↓</span>
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
                data-step={index}
                type="button"
                aria-pressed={active === index}
                className={`sequence-step ${active === index ? "is-active" : ""}`}
                onClick={() => moveToStep(index)}
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
              <div className="sequence-heading-stack" aria-hidden="true">
                {steps.map((step, index) => (
                  <span
                    key={step.short}
                    data-heading={index}
                    className={active === index ? "is-active" : ""}
                  >
                    {step.short.toUpperCase()}
                  </span>
                ))}
              </div>
              <span
                className="sequence-scroll-progress"
                role="progressbar"
                aria-label="Product journey progress"
                aria-valuemin={1}
                aria-valuemax={4}
                aria-valuenow={active + 1}
              >
                <i />
              </span>
            </div>
            <div className="sequence-scene-wrap">
              {scenes.map((Scene, index) => (
                <div
                  key={index}
                  data-scene={index}
                  className={`sequence-scene-layer ${active === index ? "is-active" : ""}`}
                  aria-hidden={active !== index}
                  inert={active !== index}
                >
                  <Scene />
                </div>
              ))}
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
                "Marketplace listings",
                "/use-cases/listing-ops",
                "Prepare product details for each channel",
              ],
              [
                "Sales & inventory",
                "/use-cases/inventory",
                "See what sold and what needs restocking",
              ],
              [
                "Ask Amplify",
                "/use-cases/company-brain",
                "Get answers from your business data",
              ],
              [
                "Approvals",
                "/use-cases/approvals",
                "Review actions before they go live",
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
