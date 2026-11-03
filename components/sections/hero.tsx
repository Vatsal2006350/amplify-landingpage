'use client'

import { Barcode, Rule, SizeRunGrid } from '../doc/chrome'
import { Stamp } from '../doc/stamp'
import { CountUp, MaskedWords, Reveal } from '../motion-primitives'
import { FOUNDER_CALL_URL } from '../../lib/growth-pricing'
import { HeroFlow } from './hero-flow'

const STATS = [
  { value: '5%', label: 'of qualifying sales growth' },
  { value: '90', label: 'day initial pilot' },
  { value: '$0', label: 'setup fee' },
  { value: '$0', label: 'fee when sales do not increase' },
]

export function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* masthead */}
        <div className="pt-8">
          <Rule variant="thick-thin" />
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
            <p className="type-mono-label" style={{ color: 'var(--ink-muted)' }}>
              00 / MANIFEST OF GOODS
            </p>
            <div className="hidden items-center gap-6 md:flex">
              <p className="type-mono-label" style={{ fontSize: 10, color: 'var(--ink-faint)' }}>
                DATE: 2026-07
              </p>
              <p className="type-mono-label" style={{ fontSize: 10, color: 'var(--ink-faint)' }}>
                CARRIER: AMPLIFY
              </p>
              <Barcode seed="AMP-2026-184" height={20} />
            </div>
          </div>
          <Rule variant="single" />
        </div>

        {/* notice line */}
        <Reveal>
          <a
            href="/audit"
            className="group mt-4 inline-flex flex-wrap items-center gap-2"
          >
            <span
              className="type-mono-label"
              style={{ fontSize: 11, color: 'var(--orange)', fontWeight: 700 }}
            >
              ▸ NOTICE: FREE AUDIT
            </span>
            <span
              className="type-mono-label underline decoration-1 underline-offset-4 transition-colors group-hover:text-safety"
              style={{ fontSize: 11, color: 'var(--ink-muted)' }}
            >
              GET QUICK FEEDBACK ON ANY PRODUCT PAGE ↗
            </span>
          </a>
        </Reveal>

        {/* headline */}
        <div className="mt-8 max-w-[900px]">
          <h1
            className="type-hero"
            style={{ fontSize: 'clamp(52px, 8.5vw, 112px)', color: 'var(--ink)' }}
          >
            <MaskedWords text="Turn your catalog into more sales." em={['more', 'sales.']} />
          </h1>
          <Reveal delay={0.3} className="mt-7 max-w-[560px]">
            <p className="text-[17px] leading-[1.65] sm:text-[18px]" style={{ color: 'var(--ink-muted)' }}>
              Create better images and ads. Prepare marketplace listings that help shoppers buy.
              Use sales and stock data to decide what to improve next.
            </p>
          </Reveal>
          <Reveal delay={0.42} className="mt-8 max-w-[560px]">
            <a href={FOUNDER_CALL_URL} className="btn-press inline-flex items-center justify-center gap-4 rounded-doc px-5 py-4 text-[13px] font-semibold" style={{ background: 'var(--orange)', color: 'var(--paper)' }}>See Amplify with your product <span aria-hidden="true">↗</span></a>
            <p className="type-mono-label mt-3" style={{ fontSize: 9, color: 'var(--ink-faint)' }}>
              NO SETUP FEE · PAY ONLY WHEN SALES INCREASE
            </p>
          </Reveal>
        </div>

        {/* the value film */}
        <Reveal delay={0.1} y={28} className="mt-14 sm:mt-16">
          <HeroFlow />
        </Reveal>

        {/* size-run stat strip */}
        <div className="mt-10 pb-16 sm:pb-20">
          <SizeRunGrid
            items={STATS.map((s) => ({
              value: s.value,
              label: s.label,
              note:
                s.value === '0' ? (
                  <span className="absolute right-3 top-3 hidden lg:inline-block">
                    <Stamp label="NO AUTO-WRITES" scale={0.5} rotate={6} />
                  </span>
                ) : undefined,
            }))}
            renderValue={(value) => <CountUp value={value} />}
          />
        </div>
      </div>
    </section>
  )
}
