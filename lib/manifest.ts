// Deterministic document ephemera — never Math.random()/Date.now() in render.
export const MANIFEST_NO = 'MANIFEST NO. AMP-2026-184'
export const DOC_REV = 'REV. 2026-07'
export const ORIGIN = 'ORIGIN: SAN FRANCISCO, USA'
export const CARRIER = 'CARRIER: AMPLIFY'
export const NAV_HEIGHT = 60
export const NAV_HEIGHT_SCROLLED = 52

// Seeded pseudo-random positions/rotations for the chip pile (SSR-safe).
export const CHIP_SEEDS = [
  0.13, 0.87, 0.42, 0.66, 0.29, 0.94, 0.51, 0.08, 0.73, 0.35,
  0.6, 0.19, 0.81, 0.47, 0.02, 0.9, 0.56, 0.25, 0.69, 0.38,
]
