'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { ENRICHMENT_ROWS } from '../../lib/home-data'
import { DocHeader } from '../doc/chrome'
import { Stamp } from '../doc/stamp'
import { ProductStage } from '../motion-primitives'

type Row = (typeof ENRICHMENT_ROWS)[number]
type Phase = 'idle' | 'running' | 'done'

const STEP_MS = 950
const AGENT_STEPS = [
  'READING SOURCE FILE…',
  'MATCHING PRODUCT IMAGES…',
  'INFERRING ATTRIBUTES FROM IMAGES…',
  'FILLING CHANNEL FIELDS…',
  'CHECKING MARKETPLACE RULES…',
  'QUEUEING FOR REVIEW…',
]

/** raw spreadsheet cell text for the "before" state */
function rawValue(row: Row) {
  if ('kind' in row && row.kind === 'image') return row.before.split('\n')[0] + ' …'
  return row.before
}

function EnrichedCard({ row, index }: { row: Row; index: number }) {
  const isImage = 'kind' in row && row.kind === 'image'
  return (
    <m.div
      layout
      initial={{ opacity: 0, x: 24, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-doc p-3.5"
      style={{ border: '1px solid var(--ledger-strong)', background: 'var(--paper-raised)' }}
    >
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <span className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink-faint)' }}>
          {String(index + 1).padStart(2, '0')} · {row.field.toUpperCase()}
        </span>
        <span className="type-mono-label" style={{ fontSize: 8, color: 'var(--orange)', fontWeight: 700 }}>
          AMENDED
        </span>
      </div>
      {isImage ? (
        <div className="grid grid-cols-[64px_1fr] gap-3">
          <div className="relative aspect-square overflow-hidden rounded-doc" style={{ border: '1px solid var(--ledger)' }}>
            <img src={row.after} alt="Enriched product asset" className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0">
            <div className="font-display text-[14px] leading-snug" style={{ color: 'var(--ink)', fontWeight: 540 }}>
              Selected hero image
            </div>
            <div className="mt-1 text-[11px] leading-snug" style={{ color: 'var(--ink-muted)' }}>
              Background checked, sharpened, and attached to the SKU.
            </div>
          </div>
        </div>
      ) : (
        <div className="text-[13.5px] font-medium leading-snug" style={{ color: 'var(--ink)' }}>
          {row.after}
        </div>
      )}
      <div className="mt-2 text-[10.5px] leading-snug" style={{ color: 'var(--ink-faint)' }}>
        {row.note}
      </div>
    </m.div>
  )
}

function EnrichmentRun() {
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('idle')
  const [count, setCount] = useState(0)
  const timer = useRef<number>(0)

  // reduced motion: show final state immediately
  useEffect(() => {
    if (reduced) {
      setPhase('done')
      setCount(ENRICHMENT_ROWS.length)
    }
  }, [reduced])

  useEffect(() => {
    if (phase !== 'running') return
    if (count >= ENRICHMENT_ROWS.length) {
      setPhase('done')
      return
    }
    timer.current = window.setTimeout(() => setCount((c) => c + 1), STEP_MS)
    return () => window.clearTimeout(timer.current)
  }, [phase, count])

  const start = () => {
    setCount(0)
    setPhase('running')
  }
  const reset = () => {
    window.clearTimeout(timer.current)
    setCount(0)
    setPhase('idle')
  }

  const progress = count / ENRICHMENT_ROWS.length

  return (
    <div
      className="doc-shadow mx-auto max-w-[1120px] rounded-doc"
      style={{ border: '1px solid var(--ink)', background: 'var(--paper-raised)' }}
    >
      {/* plate header */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-5"
        style={{ borderBottom: '1px solid var(--ledger-strong)' }}
      >
        <div>
          <div className="type-mono-label" style={{ fontSize: 10, color: 'var(--orange)', fontWeight: 700 }}>
            DECLARATION — AS FILED / AS AMENDED
          </div>
          <h3 className="font-display mt-1 text-[22px]" style={{ color: 'var(--ink)', fontWeight: 530 }}>
            SKU record before and after enrichment
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait">
            {phase === 'idle' && !reduced && (
              <m.button
                key="run"
                type="button"
                onClick={start}
                exit={{ opacity: 0, scale: 0.95 }}
                className="btn-press type-mono-label rounded-doc flex h-11 items-center gap-2 px-5"
                style={{ background: 'var(--orange)', color: 'var(--paper)', fontSize: 12, fontWeight: 700 }}
              >
                ▸ RUN ENRICHMENT
              </m.button>
            )}
            {phase === 'running' && (
              <m.div
                key="progress"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <span
                  aria-hidden
                  className="conic-ring h-4 w-4 rounded-full"
                  style={{ maskImage: 'radial-gradient(circle, transparent 40%, black 45%)', WebkitMaskImage: 'radial-gradient(circle, transparent 40%, black 45%)' }}
                />
                <span className="type-mono-label" style={{ fontSize: 10, color: 'var(--orange)', fontWeight: 700 }}>
                  {AGENT_STEPS[Math.min(count, AGENT_STEPS.length - 1)]}
                </span>
              </m.div>
            )}
            {phase === 'done' && (
              <m.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4">
                <Stamp label="6 FIELDS AMENDED" animated={!reduced} scale={0.62} rotate={4} />
                {!reduced && (
                  <button
                    type="button"
                    onClick={reset}
                    className="type-mono-label rounded-doc h-9 whitespace-nowrap px-3"
                    style={{ border: '1px solid var(--ink)', color: 'var(--ink)', fontSize: 10, fontWeight: 700 }}
                  >
                    ↺ RUN AGAIN
                  </button>
                )}
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* agent progress rule */}
      <div className="h-[3px] w-full" style={{ background: 'var(--paper-shade)' }} aria-hidden>
        <m.div
          className="h-full origin-left"
          style={{ background: 'var(--orange)' }}
          animate={{ scaleX: phase === 'idle' ? 0 : progress }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="grid md:grid-cols-2" style={{ background: 'var(--paper-shade)' }}>
        {/* LEFT — the raw spreadsheet, as received */}
        <div className="p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="type-mono-label" style={{ fontSize: 10, color: 'var(--ink-muted)' }}>
              AS FILED — supplier_master_sheet.xlsx
            </span>
            <span
              className="type-mono-label rounded-doc px-1.5 py-0.5"
              style={{ fontSize: 8, border: '1px solid var(--ledger-strong)', color: 'var(--ink-faint)' }}
            >
              XLSX
            </span>
          </div>
          {/* spreadsheet chrome */}
          <div className="overflow-hidden rounded-doc" style={{ border: '1px solid var(--ledger-strong)', background: '#fff' }}>
            <div
              className="grid grid-cols-[28px_1.1fr_2fr] border-b text-center"
              style={{ borderColor: 'var(--ledger)', background: 'var(--paper-shade)' }}
            >
              <span className="type-mono-label py-1.5" style={{ fontSize: 9, color: 'var(--ink-faint)' }} />
              {['A', 'B'].map((col) => (
                <span
                  key={col}
                  className="type-mono-label border-l py-1.5"
                  style={{ fontSize: 9, color: 'var(--ink-faint)', borderColor: 'var(--ledger)' }}
                >
                  {col}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-[28px_1.1fr_2fr]" style={{ background: 'var(--paper-shade)' }}>
              <span className="type-mono-label border-b py-2 text-center" style={{ fontSize: 9, color: 'var(--ink-faint)', borderColor: 'var(--ledger)' }}>
                1
              </span>
              {['FIELD', 'VALUE'].map((h) => (
                <span key={h} className="type-mono-label border-b border-l px-2.5 py-2" style={{ fontSize: 9, color: 'var(--ink-muted)', fontWeight: 700, borderColor: 'var(--ledger)' }}>
                  {h}
                </span>
              ))}
            </div>
            {ENRICHMENT_ROWS.map((row, i) => {
              const state = i < count ? 'enriched' : phase === 'running' && i === count ? 'scanning' : 'raw'
              return (
                <m.div
                  key={row.field}
                  className="grid grid-cols-[28px_1.1fr_2fr] bg-white"
                  animate={{
                    backgroundColor:
                      state === 'scanning'
                        ? 'rgba(29,122,109,0.10)'
                        : state === 'enriched'
                          ? 'rgba(29,122,109,0.045)'
                          : '#ffffff',
                  }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="type-mono-label border-b py-2.5 text-center" style={{ fontSize: 9, color: 'var(--ink-faint)', borderColor: 'var(--ledger)' }}>
                    {i + 2}
                  </span>
                  <span className="border-b border-l px-2.5 py-2.5 font-mono text-[11px]" style={{ color: 'var(--ink)', borderColor: 'var(--ledger)' }}>
                    {row.field}
                  </span>
                  <span className="relative min-w-0 border-b border-l px-2.5 py-2.5 font-mono text-[11px]" style={{ borderColor: 'var(--ledger)' }}>
                    <span
                      className="block truncate transition-opacity"
                      style={{
                        color: row.before === '-' ? 'var(--stamp)' : 'var(--ink-muted)',
                        opacity: state === 'enriched' ? 0.45 : 1,
                        textDecorationLine: state === 'enriched' ? 'line-through' : 'none',
                        textDecorationColor: 'var(--orange)',
                      }}
                    >
                      {row.before === '-' ? '— EMPTY —' : rawValue(row)}
                    </span>
                    {state === 'enriched' && (
                      <span className="type-mono-label absolute right-2 top-1/2 -translate-y-1/2" style={{ fontSize: 8, color: 'var(--orange)', fontWeight: 700 }}>
                        [ ENRICHED ]
                      </span>
                    )}
                    {state === 'scanning' && (
                      <m.span
                        aria-hidden
                        className="absolute inset-y-0 left-0 w-8"
                        style={{ background: 'linear-gradient(90deg, transparent, rgba(29,122,109,0.22), transparent)' }}
                        animate={{ x: [0, 220] }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                      />
                    )}
                  </span>
                </m.div>
              )
            })}
          </div>
          <p className="type-mono-label mt-3" style={{ fontSize: 9, color: 'var(--ink-faint)' }}>
            RECEIVED FROM SUPPLIER · 184 ROWS · SHOWING SKU BR-772104-CAF
          </p>
        </div>

        {/* RIGHT — enriched declaration cards land as the agent works */}
        <div className="p-4 sm:p-5 md:border-l" style={{ borderColor: 'var(--ledger-strong)' }}>
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="type-mono-label" style={{ fontSize: 10, color: 'var(--orange)', fontWeight: 700 }}>
              AS AMENDED — CHANNEL READY
            </span>
            <span className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink-faint)' }}>
              {count}/6 FIELDS
            </span>
          </div>
          {count === 0 ? (
            <div
              className="flex min-h-[300px] flex-col items-center justify-center gap-3 rounded-doc text-center"
              style={{ border: '1px dashed var(--ledger-strong)' }}
            >
              <span className="type-mono-label" style={{ fontSize: 10, color: 'var(--ink-faint)' }}>
                {phase === 'running' ? 'AGENT IS READING THE SOURCE FILE' : 'AWAITING ENRICHMENT RUN'}
              </span>
              <span className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink-faint)' }}>
                AMPLIFY LISTING AGENT · APPROVAL GATED
              </span>
            </div>
          ) : (
            <div className="space-y-2.5">
              {ENRICHMENT_ROWS.slice(0, count).map((row, i) => (
                <EnrichedCard key={row.field} row={row} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function Enrichment() {
  return (
    <section id="enrichment" className="scroll-mt-[80px]">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24">
        <DocHeader index="03 / CUSTOMS DECLARATION" meta={['PAGE 4 OF 7', 'FORM AMP-03']} />
        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2
            className="type-h2 lg:col-span-7"
            style={{ fontSize: 'clamp(32px, 4vw, 50px)', color: 'var(--ink)' }}
          >
            See every change <em>before</em> it ships.
          </h2>
          <p className="text-[15px] leading-[1.7] lg:col-span-5" style={{ color: 'var(--ink-muted)' }}>
            This is the raw sheet a supplier actually sends. Run the agent and watch it become a
            channel-ready record — every field traced, nothing published without review.
          </p>
        </div>
        <ProductStage className="mt-10">
          <EnrichmentRun />
        </ProductStage>
      </div>
    </section>
  )
}
