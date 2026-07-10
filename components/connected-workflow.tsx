'use client'

import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'

const ACCENT = '#18736A'
const SIGNAL = '#9EE078'
const DARK = '#101613'
const TEXT = '#17212B'
const MUTED = '#66736F'
const BORDER = 'rgba(23,33,29,0.12)'
const M = 'var(--font-mono)'

const SOURCES = [
  { name: 'Shopify', detail: 'Products + orders', src: '/logos/platforms/shopify.svg' },
  { name: 'ERP stock', detail: '1,240 inventory rows', mark: 'ER' },
  { name: 'Supplier PI', detail: 'Styles, sizes, and cost', mark: 'PI' },
  { name: 'Product images', detail: '184 matched assets', mark: 'IM' },
]

const OUTPUTS = [
  ['Namshi XLSX', 'Ready'],
  ['Amazon flat file', 'Ready'],
  ['Centrepoint UDA', 'Review'],
  ['Purchase order', 'Draft'],
]

function SourceRow({ item, index }: { item: (typeof SOURCES)[number]; index: number }) {
  return (
    <div className="flex items-center gap-3 border-b px-3 py-3 last:border-b-0" style={{ borderColor: BORDER }}>
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md border bg-white" style={{ borderColor: BORDER }}>
        {item.src ? <img src={item.src} alt="" className="max-h-5 max-w-6 object-contain" /> : <span className="text-[9px] font-bold" style={{ color: ACCENT, fontFamily: M }}>{item.mark}</span>}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[11px] font-semibold" style={{ color: TEXT }}>{item.name}</div>
        <div className="mt-0.5 truncate text-[9px]" style={{ color: MUTED }}>{item.detail}</div>
      </div>
      <span className="h-2 w-2 rounded-full" style={{ background: index === 2 ? '#f2b84b' : SIGNAL }} />
    </div>
  )
}

export function ConnectedWorkflow() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const progress = useSpring(scrollYProgress, { stiffness: 105, damping: 28, restDelta: 0.001 })
  const sourceX = useTransform(progress, [0.04, 0.3], [-30, 0])
  const sourceOpacity = useTransform(progress, [0.04, 0.25], [0.35, 1])
  const coreScale = useTransform(progress, [0.12, 0.45, 0.82], [0.97, 1, 1.012])
  const coreY = useTransform(progress, [0.12, 0.45], [18, 0])
  const connectionScale = useTransform(progress, [0.2, 0.62], [0, 1])
  const outputX = useTransform(progress, [0.36, 0.7], [30, 0])
  const outputOpacity = useTransform(progress, [0.36, 0.68], [0.25, 1])
  const runScale = useTransform(progress, [0.2, 0.72], [0.12, 1])

  return (
    <div ref={containerRef} className="relative lg:min-h-[125vh]">
      <div className="lg:sticky lg:top-[82px] lg:flex lg:h-[calc(100vh-96px)] lg:min-h-[620px] lg:max-h-[760px] lg:items-center">
        <div className="relative w-full">
          <m.div
            aria-hidden="true"
            className="absolute left-[18%] right-[18%] top-1/2 hidden h-px origin-left lg:block"
            style={{ scaleX: reduceMotion ? 1 : connectionScale, background: 'linear-gradient(90deg, rgba(24,115,106,0.2), #18736A 50%, rgba(24,115,106,0.2))' }}
          />
          <div className="relative overflow-hidden rounded-xl border bg-white" style={{ borderColor: BORDER, boxShadow: '0 36px 110px rgba(15,31,28,0.14)' }}>
            <div className="flex items-center justify-between gap-4 border-b px-4 py-3" style={{ borderColor: 'rgba(255,255,255,0.1)', background: DARK }}>
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex gap-1.5" aria-hidden="true"><span className="h-2.5 w-2.5 rounded-full bg-[#ff6b62]" /><span className="h-2.5 w-2.5 rounded-full bg-[#ffc34a]" /><span className="h-2.5 w-2.5 rounded-full bg-[#48c96c]" /></div>
                <span className="hidden truncate rounded-md border px-3 py-1.5 text-[9px] sm:block" style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.58)', fontFamily: M }}>app.use-amplify.com/workspace/connected-run</span>
              </div>
              <span className="rounded-md px-2.5 py-1 text-[9px] font-bold uppercase" style={{ background: SIGNAL, color: DARK, fontFamily: M }}>Live run</span>
            </div>

            <div className="grid bg-[#edf3f0] lg:grid-cols-[0.72fr_1.22fr_0.78fr]">
              <m.aside
                className="border-b bg-[#f8fbf9] lg:border-b-0 lg:border-r"
                style={{ borderColor: BORDER, x: reduceMotion ? 0 : sourceX, opacity: reduceMotion ? 1 : sourceOpacity }}
              >
                <div className="border-b px-4 py-4" style={{ borderColor: BORDER }}>
                  <div className="text-[9px] uppercase" style={{ color: ACCENT, fontFamily: M }}>Connected inputs</div>
                  <h3 className="mt-1 text-[16px] font-semibold" style={{ color: TEXT }}>Source data</h3>
                </div>
                <div>{SOURCES.map((item, index) => <SourceRow key={item.name} item={item} index={index} />)}</div>
                <div className="m-3 rounded-lg border bg-white p-3" style={{ borderColor: BORDER }}>
                  <div className="flex items-center justify-between text-[9px] uppercase" style={{ color: MUTED, fontFamily: M }}><span>Identity match</span><span style={{ color: ACCENT }}>96%</span></div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e2ebe7]"><m.div className="h-full origin-left rounded-full" style={{ scaleX: reduceMotion ? 1 : runScale, background: ACCENT }} /></div>
                </div>
              </m.aside>

              <m.main
                className="min-w-0 p-4 sm:p-5"
                style={{ scale: reduceMotion ? 1 : coreScale, y: reduceMotion ? 0 : coreY }}
              >
                <div className="rounded-lg border bg-white" style={{ borderColor: BORDER, boxShadow: '0 18px 48px rgba(15,31,28,0.08)' }}>
                  <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-start sm:justify-between" style={{ borderColor: BORDER }}>
                    <div><div className="text-[9px] uppercase" style={{ color: ACCENT, fontFamily: M }}>Amplify operating layer</div><h3 className="mt-1 text-[20px] font-semibold" style={{ color: TEXT }}>Catalog + inventory run</h3></div>
                    <span className="w-fit rounded-md border px-2.5 py-1 text-[9px] font-semibold uppercase" style={{ borderColor: '#bde5dc', background: '#eaf8f5', color: ACCENT, fontFamily: M }}>Approval gated</span>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-3 gap-2">
                      {[['184', 'SKU rows'], ['37', 'fields filled'], ['4', 'review']].map(([value, label]) => <div key={label} className="rounded-lg border bg-[#f8fbf9] p-3" style={{ borderColor: BORDER }}><div className="text-[22px] font-semibold" style={{ color: TEXT }}>{value}</div><div className="mt-1 text-[8px] uppercase" style={{ color: MUTED, fontFamily: M }}>{label}</div></div>)}
                    </div>
                    <div className="mt-3 overflow-hidden rounded-lg border" style={{ borderColor: BORDER }}>
                      {[['Normalize SKU identity', 'Complete'], ['Resolve channel attributes', 'Complete'], ['Check inventory cover', 'Running'], ['Prepare approved outputs', 'Queued']].map(([label, state], index) => (
                        <div key={label} className="grid grid-cols-[28px_1fr_auto] items-center gap-3 border-b bg-white px-3 py-3 last:border-b-0" style={{ borderColor: BORDER }}>
                          <span className="grid h-6 w-6 place-items-center rounded-full text-[9px] font-semibold" style={{ background: index < 2 ? ACCENT : index === 2 ? SIGNAL : '#e7eeeb', color: index < 2 ? '#fff' : TEXT }}>{index < 2 ? '✓' : index + 1}</span>
                          <span className="text-[11px] font-semibold" style={{ color: TEXT }}>{label}</span>
                          <span className="text-[8px] uppercase" style={{ color: index === 2 ? ACCENT : MUTED, fontFamily: M }}>{state}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 rounded-lg border p-3" style={{ borderColor: '#b9dcd4', background: '#edf8f5' }}>
                      <div className="text-[8px] uppercase" style={{ color: ACCENT, fontFamily: M }}>Operator decision</div>
                      <div className="mt-1 text-[12px] font-semibold" style={{ color: TEXT }}>Publish ready listings and review four exceptions.</div>
                    </div>
                  </div>
                </div>
              </m.main>

              <m.aside
                className="border-t bg-[#f8fbf9] lg:border-l lg:border-t-0"
                style={{ borderColor: BORDER, x: reduceMotion ? 0 : outputX, opacity: reduceMotion ? 1 : outputOpacity }}
              >
                <div className="border-b px-4 py-4" style={{ borderColor: BORDER }}>
                  <div className="text-[9px] uppercase" style={{ color: ACCENT, fontFamily: M }}>Prepared actions</div>
                  <h3 className="mt-1 text-[16px] font-semibold" style={{ color: TEXT }}>Approved outputs</h3>
                </div>
                <div className="p-3">
                  <div className="space-y-2">
                    {OUTPUTS.map(([name, status], index) => (
                      <div key={name} className="rounded-lg border bg-white p-3" style={{ borderColor: index === 0 ? '#9bd9cd' : BORDER }}>
                        <div className="flex items-center justify-between gap-3"><span className="text-[11px] font-semibold" style={{ color: TEXT }}>{name}</span><span className="text-[8px] uppercase" style={{ color: status === 'Ready' ? ACCENT : MUTED, fontFamily: M }}>{status}</span></div>
                        <div className="mt-2 h-1 rounded-full" style={{ background: index < 2 ? SIGNAL : '#dfe7e3' }} />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 rounded-lg p-3 text-white" style={{ background: DARK }}>
                    <div className="text-[8px] uppercase" style={{ color: SIGNAL, fontFamily: M }}>Control stays with you</div>
                    <div className="mt-2 text-[11px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.76)' }}>Evidence, impact, and rollback context stay attached to every action.</div>
                  </div>
                </div>
              </m.aside>
            </div>
          </div>
          <div className="mx-auto mt-4 flex max-w-[720px] items-center justify-center gap-3 text-center text-[9px] uppercase" style={{ color: MUTED, fontFamily: M }}><span className="h-px w-10" style={{ background: ACCENT }} />Scroll to follow the run<span className="h-px w-10" style={{ background: ACCENT }} /></div>
        </div>
      </div>
    </div>
  )
}
