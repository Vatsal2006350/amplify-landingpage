'use client'

import { useState } from 'react'
import { ENRICHMENT_ROWS } from '../../lib/home-data'
import { DocHeader } from '../doc/chrome'
import { Stamp } from '../doc/stamp'
import { ProductStage } from '../motion-primitives'

type Row = (typeof ENRICHMENT_ROWS)[number]

function BeforeValue({ row }: { row: Row }) {
  if ('kind' in row && row.kind === 'image') {
    return (
      <div className="space-y-1.5">
        {row.before.split('\n').map((url) => (
          <div
            key={url}
            className="truncate rounded-doc px-2 py-2 font-mono text-[11px]"
            style={{
              border: '1px solid var(--ledger)',
              background: 'var(--paper-shade)',
              color: 'var(--ink-muted)',
            }}
          >
            {url}
          </div>
        ))}
      </div>
    )
  }

  if (row.before === '-') {
    return (
      <div
        className="type-mono-label min-h-[38px]"
        style={{ fontSize: 12, color: 'var(--stamp)', fontWeight: 700 }}
      >
        — NOT DECLARED —
      </div>
    )
  }

  return (
    <div
      className="min-h-[38px] font-mono text-[13px]"
      style={{ color: 'var(--ink)' }}
    >
      {row.before}
    </div>
  )
}

function AfterValue({ row }: { row: Row }) {
  if ('kind' in row && row.kind === 'image') {
    return (
      <div className="grid grid-cols-[76px_1fr] gap-3">
        <div className="relative aspect-square overflow-hidden rounded-doc" style={{ border: '1px solid var(--ledger)' }}>
          <img src={row.after} alt="Enhanced product asset" className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0">
          <div className="font-display text-[14px] leading-snug" style={{ color: 'var(--ink)', fontWeight: 540 }}>
            Selected hero image
          </div>
          <div className="mt-1 text-[11.5px] leading-snug" style={{ color: 'var(--ink-muted)' }}>
            Background checked, sharpened, and attached to the SKU.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[38px] text-[13.5px] font-medium" style={{ color: 'var(--ink)' }}>
      {row.after}
    </div>
  )
}

function BeforePane() {
  return (
    <div className="w-full p-4 sm:p-5" style={{ maxWidth: 720 }}>
      <div className="mb-3 flex items-center justify-between">
        <span className="type-mono-label" style={{ fontSize: 10, color: 'var(--ink-muted)' }}>
          AS FILED — SOURCE RECORD
        </span>
      </div>
      <div className="space-y-2">
        {ENRICHMENT_ROWS.map((row) => (
          <div
            key={row.field}
            className="rounded-doc p-3"
            style={{ border: '1px solid var(--ledger)', background: 'var(--paper)' }}
          >
            <div className="type-mono-label mb-1.5" style={{ fontSize: 9, color: 'var(--ink-faint)' }}>
              {row.field.toUpperCase()}
            </div>
            <BeforeValue row={row} />
          </div>
        ))}
      </div>
    </div>
  )
}

function EnrichmentSlider() {
  const [position, setPosition] = useState(45)

  return (
    <div
      className="doc-shadow mx-auto max-w-[1080px] rounded-doc"
      style={{ border: '1px solid var(--ink)', background: 'var(--paper-raised)' }}
    >
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
        <div className="flex items-center gap-4">
          <span className="type-mono-label hidden sm:inline" style={{ fontSize: 10, color: 'var(--ink-muted)' }}>
            ◂ SLIDE TO COMPARE ▸
          </span>
          <Stamp label="6 FIELDS AMENDED" scale={0.62} rotate={4} />
        </div>
      </div>

      <div className="relative overflow-hidden" style={{ background: 'var(--paper-shade)' }}>
        <div className="relative min-h-[640px] overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-2">
            <div className="p-4 sm:p-5">
              <div className="type-mono-label mb-3" style={{ fontSize: 10, color: 'var(--ink-muted)' }}>
                AS FILED — SOURCE RECORD
              </div>
              <div className="space-y-2">
                {ENRICHMENT_ROWS.map((row) => (
                  <div
                    key={row.field}
                    className="rounded-doc p-3"
                    style={{ border: '1px solid var(--ledger)', background: 'var(--paper)' }}
                  >
                    <div className="type-mono-label mb-1.5" style={{ fontSize: 9, color: 'var(--ink-faint)' }}>
                      {row.field.toUpperCase()}
                    </div>
                    <BeforeValue row={row} />
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 sm:p-5">
              <div className="type-mono-label mb-3" style={{ fontSize: 10, color: 'var(--orange)', fontWeight: 700 }}>
                AS AMENDED — CHANNEL READY
              </div>
              <div className="space-y-2">
                {ENRICHMENT_ROWS.map((row) => (
                  <div
                    key={row.field}
                    className="rounded-doc p-3"
                    style={{ border: '1px solid var(--ledger-strong)', background: 'var(--paper-raised)' }}
                  >
                    <div className="mb-1.5 flex items-center justify-between gap-3">
                      <span className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink-faint)' }}>
                        {row.field.toUpperCase()}
                      </span>
                      <span
                        className="type-mono-label"
                        style={{ fontSize: 8, color: 'var(--orange)', fontWeight: 700 }}
                      >
                        AMENDED
                      </span>
                    </div>
                    <AfterValue row={row} />
                    <div className="mt-2 text-[11px] leading-snug" style={{ color: 'var(--ink-faint)' }}>
                      {row.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* clipped before-pane overlay */}
          <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}>
            <div className="h-full" style={{ width: 'calc(100vw + 900px)', background: 'var(--paper-shade)' }}>
              <BeforePane />
            </div>
          </div>

          {/* perforated divider + handle */}
          <div
            aria-hidden
            className="absolute inset-y-0 z-20 w-px"
            style={{
              left: `${position}%`,
              backgroundImage:
                'repeating-linear-gradient(to bottom, var(--ink) 0 6px, transparent 6px 12px)',
            }}
          />
          <div
            aria-hidden
            className="absolute top-1/2 z-20 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
            style={{
              left: `clamp(24px, ${position}%, calc(100% - 24px))`,
              background: 'var(--ink)',
              color: 'var(--paper)',
              boxShadow: '3px 3px 0 rgba(20,19,17,0.25)',
            }}
          >
            <span className="type-mono-label" style={{ fontSize: 8, fontWeight: 700 }}>
              DRAG
            </span>
          </div>
          <input
            aria-label="Compare SKU enrichment before and after"
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
          />
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
            Compare the source record with the structured marketplace output.
          </p>
        </div>
        <ProductStage className="mt-10">
          <EnrichmentSlider />
        </ProductStage>
      </div>
    </section>
  )
}
