'use client'

import { useEffect, useRef, useState } from 'react'
import {
  animate,
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react'
import { StatusBracket } from './doc/chrome'

const SOURCES = [
  { name: 'Shopify', detail: 'Products + orders', src: '/logos/platforms/shopify.svg' },
  { name: 'ERP stock', detail: '1,240 inventory rows', mark: 'ER' },
  { name: 'Supplier PI', detail: 'Styles, sizes, and cost', mark: 'PI' },
  { name: 'Product images', detail: '184 matched assets', mark: 'IM' },
]

const OUTPUTS: Array<[string, string]> = [
  ['Namshi XLSX', 'Ready'],
  ['Amazon flat file', 'Ready'],
  ['Centrepoint UDA', 'Review'],
  ['Purchase order', 'Draft'],
]

const PIPELINE: Array<[string, string, string]> = [
  ['Normalize SKU identity', 'Complete', 'LISTING AGENT'],
  ['Resolve channel attributes', 'Complete', 'LISTING AGENT'],
  ['Check inventory cover', 'Running', 'INVENTORY AGENT'],
  ['Prepare approved outputs', 'Queued', 'PROCUREMENT AGENT'],
]

function PunchedHoles() {
  return (
    <div className="flex gap-2" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: 'var(--paper)', boxShadow: 'inset 0 0 0 1px var(--ledger-strong)' }}
        />
      ))}
    </div>
  )
}

function PanelLabel({ children }: { children: string }) {
  return (
    <div className="border-b px-4 py-3" style={{ borderColor: 'var(--ledger)' }}>
      <p className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink-muted)' }}>
        {children}
      </p>
    </div>
  )
}

function SourceRow({ item, index }: { item: (typeof SOURCES)[number]; index: number }) {
  return (
    <div
      className="flex items-center gap-3 border-b px-3 py-3 last:border-b-0"
      style={{ borderColor: 'var(--ledger)' }}
    >
      <div
        className="grid h-9 w-9 shrink-0 place-items-center rounded-doc border"
        style={{ borderColor: 'var(--ledger)', background: 'var(--paper)' }}
      >
        {item.src ? (
          <img src={item.src} alt="" className="max-h-5 max-w-6 object-contain" />
        ) : (
          <span className="type-mono-label" style={{ fontSize: 9, fontWeight: 700, color: 'var(--ink)' }}>
            {item.mark}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[11px] font-semibold" style={{ color: 'var(--ink)' }}>{item.name}</div>
        <div className="mt-0.5 truncate text-[9px]" style={{ color: 'var(--ink-muted)' }}>{item.detail}</div>
      </div>
      <StatusBracket status={index === 2 ? 'Review' : 'Synced'} className="shrink-0" />
    </div>
  )
}

export function ConnectedWorkflow() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  // one time-based progress value drives the whole route: it plays automatically
  // when the section enters the viewport, and the RUN button replays it
  const progress = useMotionValue(0)
  const [running, setRunning] = useState(false)
  const inView = useInView(containerRef, { once: true, amount: 0.3 })

  const runRoute = () => {
    if (running) return
    setRunning(true)
    progress.jump(0)
    animate(progress, 1, {
      duration: 3.2,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => setRunning(false),
    })
  }

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) {
      progress.jump(1)
      return
    }
    runRoute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduceMotion])
  const sourceX = useTransform(progress, [0.04, 0.3], [-30, 0])
  const sourceOpacity = useTransform(progress, [0.04, 0.25], [0.35, 1])
  const coreScale = useTransform(progress, [0.12, 0.45, 0.82], [0.97, 1, 1.012])
  const coreY = useTransform(progress, [0.12, 0.45], [18, 0])
  const connectionScale = useTransform(progress, [0.2, 0.62], [0, 1])
  const outputX = useTransform(progress, [0.36, 0.7], [30, 0])
  const outputOpacity = useTransform(progress, [0.36, 0.68], [0.25, 1])
  const runScale = useTransform(progress, [0.2, 0.72], [0.12, 1])

  return (
    <div ref={containerRef} className="relative">
      <div>
        <div className="relative w-full">
          {/* dashed ink routing line behind the panels */}
          <m.svg
            aria-hidden="true"
            className="absolute left-[18%] right-[18%] top-1/2 hidden h-px w-[64%] origin-left lg:block"
            style={{ scaleX: reduceMotion ? 1 : connectionScale }}
            preserveAspectRatio="none"
            viewBox="0 0 100 1"
          >
            <line
              x1="0"
              y1="0.5"
              x2="100"
              y2="0.5"
              stroke="var(--ink)"
              strokeWidth="1"
              strokeDasharray="4 3"
              vectorEffect="non-scaling-stroke"
            />
          </m.svg>

          <div
            className="relative overflow-hidden rounded-doc"
            style={{ border: '1px solid var(--ink)', background: 'var(--paper)' }}
          >
            {/* document plate header */}
            <div
              className="flex items-center justify-between gap-4 border-b px-4 py-3"
              style={{ borderColor: 'var(--ink)', background: 'var(--paper-shade)' }}
            >
              <div className="flex min-w-0 items-center gap-3">
                <PunchedHoles />
                <span className="type-mono-label truncate" style={{ fontSize: 10, color: 'var(--ink-muted)' }}>
                  PLATE 05 — CONNECTED RUN
                </span>
              </div>
              <button
                type="button"
                onClick={runRoute}
                disabled={running}
                className="btn-press type-mono-label flex h-8 shrink-0 items-center gap-2 rounded-doc px-3 disabled:opacity-70"
                style={{ fontSize: 10, fontWeight: 700, background: 'var(--orange)', color: 'var(--paper)' }}
              >
                {running ? (
                  <>
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: 'var(--paper)' }} />
                    ROUTING…
                  </>
                ) : (
                  '▸ RUN THE ROUTE'
                )}
              </button>
            </div>

            <div className="grid gap-3 p-3 lg:grid-cols-[0.72fr_1.22fr_0.78fr]" style={{ background: 'var(--paper-shade)' }}>
              {/* ORIGIN */}
              <m.aside
                className="doc-shadow rounded-doc"
                style={{
                  border: '1px solid var(--ink)',
                  background: 'var(--paper-raised)',
                  x: reduceMotion ? 0 : sourceX,
                  opacity: reduceMotion ? 1 : sourceOpacity,
                }}
              >
                <PanelLabel>ORIGIN — SOURCE DOCUMENTS</PanelLabel>
                <div>{SOURCES.map((item, index) => <SourceRow key={item.name} item={item} index={index} />)}</div>
                <div
                  className="m-3 rounded-doc border p-3"
                  style={{ borderColor: 'var(--ledger)', background: 'var(--paper)' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink-muted)' }}>Identity match</span>
                    <span className="type-mono-label tabular" style={{ fontSize: 9, fontWeight: 700, color: 'var(--ink)' }}>96%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden" style={{ background: 'var(--paper-shade)' }}>
                    <m.div
                      className="h-full origin-left"
                      style={{ scaleX: reduceMotion ? 1 : runScale, background: 'var(--orange)' }}
                    />
                  </div>
                </div>
              </m.aside>

              {/* SORTING FACILITY */}
              <m.main
                className="doc-shadow min-w-0 rounded-doc"
                style={{
                  border: '1px solid var(--ink)',
                  background: 'var(--paper-raised)',
                  scale: reduceMotion ? 1 : coreScale,
                  y: reduceMotion ? 0 : coreY,
                }}
              >
                <PanelLabel>SORTING FACILITY — AMPLIFY OPERATING LAYER</PanelLabel>
                <div className="flex flex-col gap-2 border-b px-4 py-3 sm:flex-row sm:items-start sm:justify-between" style={{ borderColor: 'var(--ledger)' }}>
                  <div>
                    <h3 className="font-display text-[20px]" style={{ fontWeight: 540, color: 'var(--ink)' }}>
                      Catalog + inventory run
                    </h3>
                    <p className="type-mono-label mt-1" style={{ fontSize: 8, color: 'var(--ink-muted)' }}>
                      3 AGENTS ON DUTY · EVERY WRITE APPROVAL-GATED
                    </p>
                  </div>
                  <StatusBracket status="Approval gated" className="shrink-0" />
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-3" style={{ border: '1px solid var(--ledger)' }}>
                    {[['184', 'SKU rows'], ['37', 'Fields filled'], ['4', 'Review']].map(([value, label], index) => (
                      <div key={label} className="px-3 py-3" style={{ borderLeft: index > 0 ? '1px solid var(--ledger)' : undefined }}>
                        <div className="font-display tabular text-[22px] leading-none" style={{ fontWeight: 540, color: 'var(--ink)' }}>{value}</div>
                        <p className="type-mono-label mt-1.5" style={{ fontSize: 8, color: 'var(--ink-muted)' }}>{label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3" style={{ border: '1px solid var(--ledger)' }}>
                    {PIPELINE.map(([label, state, agent], index) => (
                      <div
                        key={label}
                        className="flex items-center gap-3 border-b px-3 py-2.5 last:border-b-0"
                        style={{ borderColor: 'var(--ledger)' }}
                      >
                        <span
                          className="type-mono-label shrink-0"
                          style={{ color: index === 2 ? 'var(--orange)' : index < 2 ? 'var(--ink)' : 'var(--ink-faint)' }}
                          aria-hidden="true"
                        >
                          {index < 2 ? '[x]' : index === 2 ? '[▸]' : '[ ]'}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[11px] font-semibold" style={{ color: 'var(--ink)' }}>{label}</span>
                          <span className="type-mono-label block" style={{ fontSize: 7, color: index === 2 ? 'var(--orange)' : 'var(--ink-faint)' }}>
                            {agent}
                          </span>
                        </span>
                        <StatusBracket status={state} className="shrink-0" />
                      </div>
                    ))}
                  </div>
                  <div
                    className="mt-3 px-3 py-3"
                    style={{ borderLeft: '3px solid var(--orange)', background: 'var(--paper-shade)' }}
                  >
                    <p className="type-mono-label" style={{ fontSize: 8, color: 'var(--orange)' }}>Operator decision</p>
                    <div className="mt-1 text-[12px] font-semibold" style={{ color: 'var(--ink)' }}>
                      Publish ready listings and review four exceptions.
                    </div>
                  </div>
                </div>
              </m.main>

              {/* DESTINATIONS */}
              <m.aside
                className="doc-shadow rounded-doc"
                style={{
                  border: '1px solid var(--ink)',
                  background: 'var(--paper-raised)',
                  x: reduceMotion ? 0 : outputX,
                  opacity: reduceMotion ? 1 : outputOpacity,
                }}
              >
                <PanelLabel>DESTINATIONS — APPROVED OUTPUTS</PanelLabel>
                <div className="p-3">
                  <div className="space-y-2">
                    {OUTPUTS.map(([name, status], index) => (
                      <div
                        key={name}
                        className="rounded-doc border p-3"
                        style={{
                          borderColor: index === 0 ? 'var(--ink)' : 'var(--ledger)',
                          background: 'var(--paper)',
                        }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate text-[11px] font-semibold" style={{ color: 'var(--ink)' }}>{name}</span>
                          <StatusBracket status={status} className="shrink-0" />
                        </div>
                        <div className="mt-2 h-1 overflow-hidden" style={{ background: 'var(--paper-shade)' }}>
                          <div
                            className="h-full"
                            style={{ background: 'var(--orange)', width: index < 2 ? '100%' : index === 2 ? '45%' : '15%' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 rounded-doc p-3" style={{ background: 'var(--dk-bg)' }}>
                    <p className="type-mono-label" style={{ fontSize: 8, color: 'var(--orange)' }}>Control stays with you</p>
                    <div className="mt-2 text-[11px] leading-relaxed" style={{ color: 'var(--dk-muted)' }}>
                      Evidence, impact, and rollback context stay attached to every action.
                    </div>
                  </div>
                </div>
              </m.aside>
            </div>
          </div>

          <div className="mx-auto mt-4 flex max-w-[720px] items-center justify-center gap-3 text-center">
            <span aria-hidden="true" className="h-px w-10" style={{ background: 'var(--ledger-strong)' }} />
            <span className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink-faint)' }}>Sources in · agents sort · approved files out — press run to replay</span>
            <span aria-hidden="true" className="h-px w-10" style={{ background: 'var(--ledger-strong)' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
