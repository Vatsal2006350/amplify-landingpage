'use client'

import { useEffect, useRef, useState } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Barcode, Rule, SizeRunGrid } from '../doc/chrome'
import { Stamp } from '../doc/stamp'
import { CountUp, MaskedWords, Reveal } from '../motion-primitives'
import { WaitlistForm } from '../waitlist-form'
import { HeroConsole } from './hero-console'

const STATS = [
  { value: '35K', label: 'SKU rows enriched' },
  { value: '8+', label: 'channels supported' },
  { value: '45K', label: 'sales rows analyzed' },
  { value: '0', label: 'unapproved writes' },
]

function SpecCard() {
  return (
    <div
      className="relative rounded-doc p-5"
      style={{
        background: 'var(--paper-raised)',
        border: '1px solid var(--ledger-strong)',
        transform: 'rotate(-2deg)',
        boxShadow: '6px 6px 0 rgba(20,19,17,0.08)',
      }}
    >
      {/* photo corners */}
      {[
        { top: -1, left: -1, borderWidth: '14px 0 0 14px' },
        { top: -1, right: -1, borderWidth: '0 14px 14px 0' },
        { bottom: -1, left: -1, borderWidth: '14px 0 0 14px', transform: 'scaleY(-1)' },
        { bottom: -1, right: -1, borderWidth: '0 14px 14px 0', transform: 'scaleY(-1)' },
      ].map((corner, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute h-0 w-0"
          style={{
            ...corner,
            borderStyle: 'solid',
            borderColor: 'var(--ink) transparent transparent var(--ink)',
            opacity: 0.85,
          } as React.CSSProperties}
        />
      ))}
      <p className="type-mono-label" style={{ fontSize: 10, color: 'var(--orange)', fontWeight: 700 }}>
        RETAIL OPERATIONS FOR BRAND TEAMS
      </p>
      <div className="mt-4 space-y-0">
        {[
          ['CONTENTS', 'LISTINGS, DECISIONS, ACTIONS'],
          ['HANDLING', 'HUMAN-APPROVED'],
          ['CHANNELS', '8+'],
        ].map(([k, v]) => (
          <div
            key={k}
            className="flex items-baseline justify-between gap-4 py-2.5"
            style={{ borderBottom: '1px solid var(--ledger)' }}
          >
            <span className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink-faint)' }}>
              {k}:
            </span>
            <span
              className="type-mono-label text-right"
              style={{ fontSize: 10, color: 'var(--ink)' }}
            >
              {v}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-end justify-between gap-4">
        <Barcode seed="AMP-SPEC-01" height={22} caption="*AMP-SPEC-01*" />
        <Stamp label="RECEIVED" scale={0.6} rotate={8} />
      </div>
    </div>
  )
}

export function Hero() {
  const sleeveRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  const { scrollYProgress } = useScroll({
    target: sleeveRef,
    offset: ['start end', 'start 25%'],
  })
  const consoleY = useTransform(scrollYProgress, [0, 1], [90, 0])
  const consoleRotate = useTransform(scrollYProgress, [0, 1], [1.4, 0])
  const consoleClip = useTransform(
    scrollYProgress,
    [0, 1],
    ['inset(4% 3% 26% 3%)', 'inset(0% 0% 0% 0%)'],
  )
  const sleeveOpacity = useTransform(scrollYProgress, [0.55, 0.95], [1, 0])

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

        {/* headline grid */}
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-8">
            <h1
              className="type-hero"
              style={{ fontSize: 'clamp(52px, 8.5vw, 112px)', color: 'var(--ink)' }}
            >
              <MaskedWords text="Retail operations, finally in one place." em={['finally']} />
            </h1>
            <Reveal delay={0.3} className="mt-7 max-w-[560px]">
              <p className="text-[17px] leading-[1.65] sm:text-[18px]" style={{ color: 'var(--ink-muted)' }}>
                Turn product files, sales, and stock into ready listings, clear decisions, and
                approved actions.
              </p>
            </Reveal>
            <Reveal delay={0.42} className="mt-8 max-w-[560px]">
              <WaitlistForm tone="paper" />
              <p className="type-mono-label mt-3" style={{ fontSize: 9, color: 'var(--ink-faint)' }}>
                NO CREDIT CARD · PROCESSED ON RECEIPT
              </p>
            </Reveal>
          </div>
          <div className="hidden lg:col-span-4 lg:block lg:pt-6">
            <Reveal delay={0.5} x={16} y={8}>
              <SpecCard />
            </Reveal>
          </div>
        </div>

        {/* console pulled from its document sleeve */}
        <div ref={sleeveRef} className="relative mt-14 sm:mt-16">
          <div
            aria-hidden
            className="absolute inset-x-6 -top-4 flex h-12 items-start justify-between rounded-doc px-4 pt-2"
            style={{ background: 'var(--paper-shade)', border: '1px solid var(--ledger)' }}
          >
            <m.span
              className="type-mono-label"
              style={{
                fontSize: 9,
                color: 'var(--ink-faint)',
                opacity: reduced || !isDesktop ? 1 : sleeveOpacity,
              }}
            >
              ENCLOSURE: PLATE 01 — LIVE PRODUCT FILM
            </m.span>
          </div>
          {reduced || !isDesktop ? (
            /* mobile / reduced-motion: always visible — the clip-path sleeve scrub is desktop-only.
               Must never set opacity here: this branch renders first on desktop too (isDesktop
               starts false), and a stale inline opacity would survive the branch swap. */
            <div key="console-static" className="relative">
              <HeroConsole />
            </div>
          ) : (
            <m.div
              key="console-scrub"
              className="relative"
              style={{ y: consoleY, rotate: consoleRotate, clipPath: consoleClip }}
            >
              <HeroConsole />
            </m.div>
          )}
        </div>

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
