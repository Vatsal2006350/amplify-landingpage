'use client'

import { useRef } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { DocHeader } from '../doc/chrome'
import { useReveal } from '../motion-primitives'

/**
 * Integrations as a ring: Amplify in the middle, everything it connects to
 * orbiting around it.
 *
 * Everything on the ring is sized as a percentage of the square container, so
 * the whole diagram scales as one piece instead of fixed-px tiles crowding a
 * shrinking circle on mobile. Centering translates live on static wrappers —
 * motion writes its own `transform` and would otherwise discard them, which is
 * what threw the tiles off the circle.
 */

type Node = { name: string; src?: string; mark?: string; dark?: boolean }

/* clockwise from the top */
const NODES: Node[] = [
  { name: 'Amazon', src: '/logos/platforms/amazon.svg' },
  { name: 'Shopify', src: '/logos/platforms/shopify.svg' },
  { name: 'Noon', src: '/logos/platforms/noon.svg' },
  { name: 'Trendyol', src: '/logos/platforms/trendyol.svg' },
  /* this asset is a pure-white logo, so it only reads on an ink chip */
  { name: '6th Street', src: '/logos/platforms/sixth-street.png', dark: true },
  { name: 'Flipkart', src: '/logos/platforms/flipkart.svg' },
  { name: 'Namshi', mark: 'namshi' },
  { name: 'Your ERP', mark: 'ERP' },
  { name: 'Sheets', mark: 'SHEETS' },
  { name: 'Supplier files', mark: 'XLSX' },
]

const BOX = 520
const CENTER = BOX / 2
const RADIUS = 200

/* percentages of the square container, so the ring scales as one piece */
const TILE_W = 18
const TILE_H = 11

function nodePosition(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  return {
    left: ((CENTER + Math.cos(angle) * RADIUS) / BOX) * 100,
    top: ((CENTER + Math.sin(angle) * RADIUS) / BOX) * 100,
  }
}

export function Integrations() {
  const reduced = useReducedMotion()
  const ringRef = useRef<HTMLDivElement>(null)
  const revealed = useReveal(ringRef, { amount: 0.25 })
  const show = reduced || revealed

  return (
    <section id="integrations" className="scroll-mt-[80px]">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24">
        <DocHeader index="04 / ROUTING" meta={['PAGE 5 OF 6', 'VIA: YOUR STACK']} />
        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2
            className="type-h2 lg:col-span-7"
            style={{ fontSize: 'clamp(32px, 4vw, 50px)', color: 'var(--ink)' }}
          >
            Keep the stack. Make the work <em>smarter.</em>
          </h2>
          <p className="text-[15px] leading-[1.7] lg:col-span-5" style={{ color: 'var(--ink-muted)' }}>
            Nothing to rip out and nothing to migrate. Amplify sits in the middle of the systems and
            files your team already works from.
          </p>
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <div
            ref={ringRef}
            className="relative w-full max-w-[520px]"
            style={{ aspectRatio: '1 / 1' }}
          >
            <svg
              viewBox={`0 0 ${BOX} ${BOX}`}
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                fill="none"
                stroke="var(--ledger-strong)"
                strokeWidth="1"
                strokeDasharray="3 6"
              />
              {NODES.map((node, index) => {
                const angle = (index / NODES.length) * Math.PI * 2 - Math.PI / 2
                /* stop the spoke short of both the centre card and the tile */
                const x1 = CENTER + Math.cos(angle) * 78
                const y1 = CENTER + Math.sin(angle) * 78
                const x2 = CENTER + Math.cos(angle) * (RADIUS - 34)
                const y2 = CENTER + Math.sin(angle) * (RADIUS - 34)
                return (
                  <m.line
                    key={node.name}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="var(--ledger-strong)"
                    strokeWidth="1"
                    strokeDasharray="2 4"
                    initial={reduced ? false : { opacity: 0 }}
                    animate={show ? { opacity: 1 } : undefined}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
                  />
                )
              })}
            </svg>

            {/* Amplify at the centre */}
            <div
              className="absolute"
              style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <m.div
                className="rounded-doc flex flex-col items-center gap-1 px-3 py-2.5 sm:gap-1.5 sm:px-4 sm:py-3"
                style={{
                  background: 'var(--paper-raised)',
                  border: '1px solid var(--ink)',
                  boxShadow: '4px 4px 0 var(--ink)',
                }}
                initial={reduced ? false : { opacity: 0, scale: 0.86 }}
                animate={show ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <img
                  src="/logo.png"
                  alt="Amplify"
                  className="h-6 w-6 rounded-[2px] object-cover sm:h-8 sm:w-8"
                />
                <span
                  className="font-display text-[13px] leading-none sm:text-[16px]"
                  style={{ color: 'var(--ink)', fontWeight: 580 }}
                >
                  Amplify
                </span>
                <span
                  className="type-mono-label whitespace-nowrap"
                  style={{ fontSize: 6.5, color: 'var(--ink-faint)' }}
                >
                  APPROVAL GATED
                </span>
              </m.div>
            </div>

            {/* the ring of connected systems */}
            {NODES.map((node, index) => {
              const { left, top } = nodePosition(index, NODES.length)
              return (
                <div
                  key={node.name}
                  className="absolute"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    width: `${TILE_W}%`,
                    height: `${TILE_H}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <m.div
                    className="rounded-doc grid h-full w-full place-items-center overflow-hidden px-1.5"
                    style={{
                      background: node.dark ? 'var(--dk-bg)' : 'var(--paper-raised)',
                      border: `1px solid ${node.dark ? 'var(--ink)' : 'var(--ledger-strong)'}`,
                    }}
                    initial={reduced ? false : { opacity: 0, scale: 0.8 }}
                    animate={show ? { opacity: 1, scale: 1 } : undefined}
                    transition={{
                      duration: 0.45,
                      delay: 0.25 + index * 0.055,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {node.src ? (
                      <img
                        src={node.src}
                        alt={node.name}
                        className="max-h-[58%] max-w-[82%] object-contain"
                      />
                    ) : (
                      <span
                        className="font-display truncate text-[10px] leading-none sm:text-[13px]"
                        style={{ color: 'var(--ink)', fontWeight: 620 }}
                      >
                        {node.mark}
                      </span>
                    )}
                  </m.div>
                </div>
              )
            })}
          </div>
        </div>

        <p
          className="type-mono-label mt-8 text-center"
          style={{ fontSize: 9, color: 'var(--ink-faint)' }}
        >
          READS FROM YOUR SYSTEMS · WRITES BACK ONLY AFTER YOU APPROVE
        </p>
      </div>
    </section>
  )
}
