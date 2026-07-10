'use client'

import { m, useReducedMotion } from 'motion/react'

/**
 * Global SVG filter defs for stamp ink-bleed. Mount once in layout.
 */
export function DocDefs() {
  return (
    <svg aria-hidden width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <filter id="ink-bleed" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" />
        </filter>
      </defs>
    </svg>
  )
}

export function Stamp({
  label,
  color = 'var(--stamp)',
  animated = false,
  scale = 1,
  rotate = -6,
  className = '',
}: {
  label: string
  color?: string
  animated?: boolean
  scale?: number
  rotate?: number
  className?: string
}) {
  const reduced = useReducedMotion()

  const face = (
    <span
      className="type-mono-label inline-block whitespace-nowrap px-4 py-2"
      style={{
        color,
        border: `2px solid ${color}`,
        outline: `1px solid ${color}`,
        outlineOffset: 3,
        fontSize: 13 * scale,
        fontWeight: 700,
        letterSpacing: '0.12em',
        filter: 'url(#ink-bleed)',
        maskImage:
          'radial-gradient(ellipse 120% 90% at 40% 50%, black 55%, rgba(0,0,0,0.72) 100%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 120% 90% at 40% 50%, black 55%, rgba(0,0,0,0.72) 100%)',
      }}
    >
      {label}
    </span>
  )

  if (!animated || reduced) {
    return (
      <span className={`inline-block ${className}`} style={{ transform: `rotate(${rotate}deg)` }}>
        {face}
      </span>
    )
  }

  return (
    <m.span
      className={`inline-block ${className}`}
      initial={{ scale: 2.6, opacity: 0, rotate: rotate - 8 }}
      whileInView={{
        scale: [2.6, 0.94, 1.02, 1],
        opacity: [0, 1, 1, 1],
        rotate: [rotate - 8, rotate, rotate, rotate],
      }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, times: [0, 0.55, 0.75, 1], ease: [0.34, 1.56, 0.64, 1] }}
    >
      {face}
    </m.span>
  )
}
