"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

const loopNodes = [
  { title: "Product data", className: "loop-node-data" },
  { title: "Listings", className: "loop-node-listings" },
  { title: "Ads", className: "loop-node-ads" },
  { title: "Sales & stock", className: "loop-node-sales" },
];

export function LandingLoopVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const draw = useTransform(scrollYProgress, [0.12, 0.68], [0, 1]);
  const drift = useTransform(scrollYProgress, [0, 1], [18, -18]);

  return (
    <div className="landing-loop-art" ref={ref} role="img" aria-label="Product data connects to listings, ads, and sales and stock planning">
      <svg className="landing-loop-orbits" viewBox="0 0 520 300" fill="none" aria-hidden="true">
        <ellipse className="landing-loop-orbit landing-loop-orbit-back" cx="260" cy="150" rx="204" ry="91" transform="rotate(-13 260 150)" />
        <ellipse className="landing-loop-orbit landing-loop-orbit-front" cx="260" cy="150" rx="204" ry="91" transform="rotate(13 260 150)" />
        <m.path
          className="landing-loop-path"
          d="M70 127 C 108 35, 236 32, 302 66 C 379 104, 425 128, 417 180 C 409 229, 337 263, 265 231 C 192 200, 120 228, 82 187 C 59 163, 55 147, 70 127Z"
          style={reducedMotion ? { pathLength: 1 } : { pathLength: draw }}
        />
        <m.circle className="landing-loop-signal" cx="70" cy="127" r="4" style={reducedMotion ? undefined : { y: drift }} />
      </svg>
      <div className="landing-loop-center">
        <div className="landing-loop-center-float">
          <img src="/logo.png" alt="" />
          <span>Amplify</span>
          <small>One connected workflow</small>
        </div>
      </div>
      {loopNodes.map((node, index) => (
        <m.div
          className={`landing-loop-node ${node.className}`}
          key={node.title}
        >
          <i aria-hidden="true">{["⌁", "▤", "↗", "◌"][index]}</i>
          <span>{node.title}</span>
        </m.div>
      ))}
      <span className="landing-loop-star landing-loop-star-a" aria-hidden="true">✳</span>
      <span className="landing-loop-star landing-loop-star-b" aria-hidden="true">✳</span>
      <span className="landing-loop-star landing-loop-star-c" aria-hidden="true">✳</span>
    </div>
  );
}
