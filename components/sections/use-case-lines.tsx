'use client'

import { useRef } from 'react'
import { m, stagger, useReducedMotion } from 'motion/react'
import { HOME_USE_CASES } from '../../lib/home-data'
import { DocHeader, Rule } from '../doc/chrome'
import { useReveal } from '../motion-primitives'

export function UseCaseLines() {
  const reduced = useReducedMotion()
  const listRef = useRef<HTMLDivElement>(null)
  const revealed = useReveal(listRef, { amount: 0.15 })

  return (
    <section id="use-cases" className="scroll-mt-[80px]">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24">
        <DocHeader index="05 / LINE ITEMS" meta={['PAGE 6 OF 6', 'SCHEDULE A']} />
        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2
            className="type-h2 lg:col-span-7"
            style={{ fontSize: 'clamp(32px, 4vw, 50px)', color: 'var(--ink)' }}
          >
            Built for the work your team <em>repeats.</em>
          </h2>
          <p className="text-[15px] leading-[1.7] lg:col-span-5" style={{ color: 'var(--ink-muted)' }}>
            Open a focused workspace for each operational job.
          </p>
        </div>

        <div className="mt-12">
          {/* header row */}
          <div
            className="hidden grid-cols-[52px_1.1fr_0.7fr_1.4fr_44px] gap-4 pb-2 md:grid"
            aria-hidden
          >
            {['NO.', 'DESCRIPTION', 'QTY / METRIC', 'NOTES', ''].map((h, i) => (
              <span
                key={i}
                className="type-mono-label"
                style={{ fontSize: 9, color: 'var(--ink-faint)' }}
              >
                {h}
              </span>
            ))}
          </div>
          <Rule variant="thick-thin" />
          <m.div
            ref={listRef}
            initial={reduced ? undefined : 'hidden'}
            animate={reduced || revealed ? 'show' : undefined}
            transition={{ delayChildren: stagger(0.07) }}
          >
            {HOME_USE_CASES.map((item, index) => (
              <m.a
                key={item.href}
                href={item.href}
                className="group grid grid-cols-[52px_1fr_44px] items-baseline gap-4 py-5 transition-colors hover:bg-paper-shade md:grid-cols-[52px_1.1fr_0.7fr_1.4fr_44px] md:py-6"
                style={{ borderBottom: '1px solid var(--ledger)' }}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <span className="type-mono-label" style={{ fontSize: 11, color: 'var(--ink-faint)' }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0">
                  <span
                    className="font-display text-[22px] leading-tight underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-safety md:text-[26px]"
                    style={{ color: 'var(--ink)', fontWeight: 530 }}
                  >
                    {item.title}
                  </span>
                  <span
                    className="type-mono-label mt-1 block md:hidden"
                    style={{ fontSize: 10, color: 'var(--ink-muted)' }}
                  >
                    {item.metric.toUpperCase()}
                  </span>
                </span>
                <span
                  className="type-mono-label tabular hidden md:inline"
                  style={{ fontSize: 12, color: 'var(--ink)' }}
                >
                  {item.metric.toUpperCase()}
                </span>
                <span
                  className="hidden text-[14px] leading-[1.6] md:inline"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  {item.body}
                </span>
                <span
                  aria-hidden
                  className="justify-self-end transition-transform group-hover:translate-x-1.5"
                  style={{ color: 'var(--orange)', fontSize: 20 }}
                >
                  ↗
                </span>
              </m.a>
            ))}
          </m.div>
        </div>
      </div>
    </section>
  )
}
