'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useInView } from 'motion/react'
import { StatusBracket } from '../doc/chrome'

function Logo({ size = 28 }: { size?: number }) {
  return <img src="/logo.png" alt="Amplify" style={{ width: size, height: size, borderRadius: 2, objectFit: 'cover' }} />
}

function SparkIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
    </svg>
  )
}

export function HeroConsole() {
  const filmRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [filmPhase, setFilmPhase] = useState(0)
  const [typedChars, setTypedChars] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const isFilmInView = useInView(filmRef, { amount: 0.15, margin: '0px 0px -400px 0px' })
  const brainQuery = 'Why did Amazon footwear sales grow last week?'
  const stages = [
    { label: 'Data', detail: '4 sources connected' },
    { label: 'Scan', detail: '8 channels checked' },
    { label: 'Review', detail: '4 fields need review' },
    { label: 'Export', detail: 'Workbook ready' },
  ]
  const platforms = [
    ['Namshi', '182 ready', '2 review', 'Ready'],
    ['6th Street', '184 ready', '0 review', 'Ready'],
    ['Centrepoint', '180 ready', '4 review', 'Review'],
    ['Amazon', '184 ready', '0 review', 'Ready'],
  ]

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!isFilmInView) return
    if (filmPhase !== 0) return
    const interval = window.setInterval(() => setActiveStep((step) => Math.min(step + 1, stages.length - 1)), 2300)
    return () => window.clearInterval(interval)
  }, [filmPhase, isFilmInView, stages.length])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!isFilmInView) {
      setFilmPhase(0)
      setActiveStep(0)
      setTypedChars(0)
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFilmPhase(4)
      setTypedChars(brainQuery.length)
      return
    }
    const durations = [9600, 2400, 5200, 6800, 8000]
    const timeout = window.setTimeout(() => setFilmPhase((phase) => (phase + 1) % durations.length), durations[filmPhase])
    return () => window.clearTimeout(timeout)
  }, [brainQuery.length, filmPhase, isFilmInView])

  useEffect(() => {
    if (!isFilmInView) return
    if (filmPhase < 2) {
      setTypedChars(0)
      return
    }
    if (filmPhase > 2) {
      setTypedChars(brainQuery.length)
      return
    }
    const interval = window.setInterval(() => {
      setTypedChars((count) => {
        if (count >= brainQuery.length) {
          window.clearInterval(interval)
          return count
        }
        return count + 1
      })
    }, 44)
    return () => window.clearInterval(interval)
  }, [brainQuery.length, filmPhase, isFilmInView])

  useEffect(() => {
    if (filmPhase === 0) setActiveStep(0)
  }, [filmPhase])

  return (
    <div ref={filmRef} className="doc-shadow rounded-doc relative overflow-hidden text-left" style={{ background: 'var(--paper-raised)', border: '1px solid var(--ink)' }}>
      <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: 'var(--ledger)', background: 'var(--paper-raised)' }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full" style={{ background: 'var(--paper-shade)', border: '1px solid var(--ledger-strong)' }} />
            <span className="h-2 w-2 rounded-full" style={{ background: 'var(--paper-shade)', border: '1px solid var(--ledger-strong)' }} />
            <span className="h-2 w-2 rounded-full" style={{ background: 'var(--paper-shade)', border: '1px solid var(--ledger-strong)' }} />
          </div>
          <span className="type-mono-label hidden sm:inline" style={{ color: 'var(--ink-faint)' }}>app.use-amplify.com/workspace/{filmPhase === 4 ? 'listing-ops/publish' : filmPhase >= 2 ? 'company-brain/ask' : 'listing-ops/overview'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden gap-1 sm:flex" aria-label={`Product film scene ${filmPhase + 1} of 5`}>
            {[0, 1, 2, 3, 4].map((phase) => (
              <button key={phase} type="button" onClick={() => setFilmPhase(phase)} aria-label={`Show product film scene ${phase + 1}`} className="h-1 w-5 overflow-hidden rounded-full" style={{ background: 'var(--ledger)' }}>
                <m.span className="block h-full origin-left" animate={{ scaleX: phase <= filmPhase ? 1 : 0 }} style={{ background: 'var(--orange)' }} />
              </button>
            ))}
          </div>
          <span className="type-mono-label rounded-doc border px-2.5 py-1" style={{ borderColor: 'var(--ink)', color: 'var(--ink)', fontSize: 10 }}>PLATE 01 — LIVE PRODUCT</span>
        </div>
      </div>

      <m.div
        className="grid min-h-[560px] md:grid-cols-[190px_minmax(0,1fr)]"
        animate={isDesktop && filmPhase === 1 ? { scale: 1.13, x: 22 } : { scale: 1, x: 0 }}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: '12% 48%' }}
      >
        <aside className="relative hidden flex-col p-4 md:flex" style={{ background: 'var(--dk-bg)', color: 'var(--dk-text)' }}>
          <div className="mb-7 flex items-center gap-2.5">
            <Logo size={30} />
            <div>
              <div className="text-[13px] font-semibold">Amplify</div>
              <div className="type-mono-label" style={{ fontSize: 9, color: 'var(--dk-muted)' }}>Retail workspace</div>
            </div>
          </div>
          <div className="space-y-1.5">
            {['Overview', 'Listing', 'Company Brain', 'Inventory', 'Approvals'].map((item) => {
              const selected = filmPhase === 4 ? item === 'Listing' : filmPhase >= 1 ? item === 'Company Brain' : item === 'Listing'
              return (
                <button key={item} type="button" onClick={() => item === 'Company Brain' ? setFilmPhase(2) : item === 'Listing' ? setFilmPhase(0) : undefined} className="rounded-doc relative w-full border px-3 py-2.5 text-left text-[11px] font-semibold" style={{ borderColor: selected ? 'var(--dk-rule)' : 'transparent', background: selected ? 'var(--dk-raised)' : 'transparent', color: selected ? 'var(--dk-text)' : 'var(--dk-muted)', boxShadow: filmPhase === 1 && item === 'Company Brain' ? '0 0 0 1px rgba(255,77,0,0.42), 0 0 34px rgba(255,77,0,0.16)' : 'none' }}>
                  {selected && <span aria-hidden className="absolute inset-y-0 left-0 w-[2px]" style={{ background: 'var(--orange)' }} />}
                  {item}
                  {filmPhase === 1 && item === 'Company Brain' && <m.span className="absolute right-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full" initial={{ scale: 0 }} animate={{ scale: [0, 1.4, 1] }} style={{ background: 'var(--orange)' }} />}
                </button>
              )
            })}
          </div>
          <div className="rounded-doc mt-auto border p-3" style={{ borderColor: 'var(--dk-rule)', background: 'var(--dk-raised)' }}>
            <div className="type-mono-label" style={{ fontSize: 9, color: 'var(--dk-muted)' }}>Connected</div>
            <div className="mt-2 flex items-center gap-2 text-[11px]">
              <span className="h-2 w-2 rounded-full" style={{ background: 'var(--orange)' }} />
              4 source files
            </div>
          </div>
        </aside>

        <div className="relative min-w-0 overflow-hidden" style={{ background: 'var(--paper-shade)' }}>
          <div className="flex min-h-[54px] items-center justify-between border-b px-4 sm:px-5" style={{ borderColor: 'var(--ledger)', background: 'var(--paper-raised)' }}>
            <div className="text-[11px]" style={{ color: 'var(--ink-muted)' }}><span className="font-semibold" style={{ color: 'var(--ink)' }}>Listing</span> / Overview</div>
            <div className="type-mono-label flex items-center gap-2" style={{ fontSize: 10, color: 'var(--ink-muted)' }}>
              <span className="h-2 w-2 rounded-full" style={{ background: 'var(--ink)' }} />
              SYNCED 2M AGO
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="type-mono-label" style={{ fontSize: 10, color: 'var(--ink)' }}>Marketplace readiness</div>
                <h3 className="font-display mt-1 text-[24px] leading-tight sm:text-[28px]" style={{ fontWeight: 520, color: 'var(--ink)' }}>Prepare this week&apos;s listings</h3>
                <p className="mt-1 text-[12px] sm:text-[13px]" style={{ color: 'var(--ink-muted)' }}>Supplier data in. Review workbook out.</p>
              </div>
              <button type="button" className="rounded-doc h-9 px-3 text-[11px] font-semibold" style={{ background: 'var(--orange)', color: 'var(--ink)' }}>
                {activeStep === 0 && 'Add source files'}
                {activeStep === 1 && 'Scanning 8 channels'}
                {activeStep === 2 && 'Open review workbook'}
                {activeStep === 3 && 'Export files'}
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 lg:grid-cols-4">
              {stages.map((stage, index) => {
                const selected = index === activeStep
                const complete = index < activeStep
                return (
                  <button
                    key={stage.label}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    className="rounded-doc relative min-h-[72px] overflow-hidden border px-3 py-2.5 text-left transition-colors"
                    style={{ borderColor: selected ? 'var(--ink)' : 'var(--ledger)', background: 'var(--paper-raised)' }}
                  >
                    <span className="flex items-center gap-2 text-[11px] font-semibold" style={{ color: 'var(--ink)' }}>
                      <span className="tabular grid h-5 w-5 place-items-center rounded-full text-[9px]" style={{ background: complete || selected ? 'var(--orange)' : 'var(--paper-shade)', color: complete || selected ? 'var(--ink)' : 'var(--ink-muted)' }}>{complete ? '✓' : index + 1}</span>
                      {stage.label}
                    </span>
                    <span className="type-mono-label mt-1.5 block" style={{ fontSize: 9, color: 'var(--ink-muted)' }}>{stage.detail}</span>
                    {selected && <span className="hero-demo-progress absolute inset-x-0 bottom-0 h-[2px]" style={{ background: 'var(--orange)' }} />}
                  </button>
                )
              })}
            </div>

            <div className="mt-4 grid gap-3 xl:grid-cols-[minmax(0,1.25fr)_minmax(240px,0.75fr)]">
              <section className="rounded-doc overflow-hidden border" style={{ borderColor: 'var(--ledger)', background: 'var(--paper-raised)' }}>
                <div className="flex items-center justify-between border-b px-3.5 py-3" style={{ borderColor: 'var(--ledger)' }}>
                  <div>
                    <div className="text-[11px] font-semibold" style={{ color: 'var(--ink)' }}>Launch board</div>
                    <div className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink-muted)' }}>8 marketplace outputs</div>
                  </div>
                  <span className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink)' }}>184 ready</span>
                </div>
                <div className="type-mono-label grid grid-cols-[1.2fr_0.8fr_0.8fr_0.7fr] border-b px-3.5 py-2" style={{ fontSize: 8, borderColor: 'var(--ledger)', color: 'var(--ink-muted)' }}>
                  <span>Platform</span><span>Rows</span><span>Review</span><span className="text-right">Status</span>
                </div>
                {platforms.map((row, index) => (
                  <div key={row[0]} className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.7fr] items-center border-b px-3.5 py-3 text-[10px] last:border-b-0 sm:text-[11px]" style={{ borderColor: 'var(--ledger)', background: activeStep === 2 && index === 2 ? 'rgba(255,77,0,0.08)' : 'var(--paper-raised)' }}>
                    <span className="font-semibold" style={{ color: 'var(--ink)' }}>{row[0]}</span>
                    <span className="tabular" style={{ color: 'var(--ink)' }}>{row[1]}</span>
                    <span className="tabular" style={{ color: row[2] === '0 review' ? 'var(--ink-muted)' : 'var(--orange)' }}>{row[2]}</span>
                    <span className="text-right"><StatusBracket status={row[3]} className="!text-[9px]" /></span>
                  </div>
                ))}
              </section>

              <section className="rounded-doc border p-3.5" style={{ borderColor: 'var(--ledger)', background: 'var(--paper-raised)' }}>
                <div className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink)' }}>Current run</div>
                <div className="font-display mt-2 text-[17px] leading-snug" style={{ fontWeight: 520, color: 'var(--ink)' }}>{stages[activeStep].detail}</div>
                <div className="mt-4 space-y-2">
                  {[
                    ['Supplier PI', 'Synced'],
                    ['Product images', activeStep > 0 ? '184 matched' : 'Queued'],
                    ['Channel templates', activeStep > 1 ? 'Checked' : 'Waiting'],
                    ['Review workbook', activeStep === 3 ? 'Ready' : 'Preparing'],
                  ].map(([label, value], index) => (
                    <div key={label} className="rounded-doc flex items-center justify-between gap-3 px-2.5 py-2" style={{ background: index <= activeStep ? 'var(--paper-shade)' : 'transparent', border: '1px solid var(--ledger)' }}>
                      <span className="truncate text-[10px]" style={{ color: 'var(--ink)' }}>{label}</span>
                      <span className="type-mono-label shrink-0" style={{ fontSize: 9, color: index <= activeStep ? 'var(--ink)' : 'var(--ink-muted)' }}>{value}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-doc mt-3 border p-3" style={{ borderColor: 'var(--ledger)', background: 'var(--paper-shade)' }}>
                  <div className="type-mono-label flex items-center gap-2" style={{ fontSize: 9, color: 'var(--ink)' }}><SparkIcon /> Next action</div>
                  <p className="mt-1.5 text-[11px] leading-relaxed" style={{ color: 'var(--ink-muted)' }}>{activeStep < 2 ? 'Amplify is preparing the review queue.' : activeStep === 2 ? 'Confirm four Centrepoint material fields.' : 'Approved marketplace files are ready.'}</p>
                </div>
              </section>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {filmPhase >= 2 && filmPhase < 4 && (
              <m.div
                key="company-brain-film"
                className="absolute inset-0 z-20 flex flex-col"
                style={{ background: 'var(--paper-shade)' }}
                initial={{ opacity: 0, x: 70, scale: 0.985 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 42, scale: 0.99 }}
                transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex min-h-[54px] items-center justify-between border-b px-4 sm:px-5" style={{ borderColor: 'var(--ledger)', background: 'var(--paper-raised)' }}>
                  <div className="text-[11px]" style={{ color: 'var(--ink-muted)' }}><span className="font-semibold" style={{ color: 'var(--ink)' }}>Company Brain</span> / Operator chat</div>
                  <div className="type-mono-label flex items-center gap-2" style={{ fontSize: 9, color: 'var(--ink)' }}><span className="h-2 w-2 rounded-full" style={{ background: 'var(--orange)' }} />Live data</div>
                </div>

                <div className="grid min-h-0 flex-1 gap-3 p-3 sm:p-4 lg:grid-cols-[0.78fr_1.22fr]">
                  <section className="rounded-doc flex min-h-[250px] flex-col border" style={{ borderColor: 'var(--ledger)', background: 'var(--paper-raised)' }}>
                    <div className="border-b px-3.5 py-3" style={{ borderColor: 'var(--ledger)' }}>
                      <div className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink)' }}>Ask Amplify</div>
                      <div className="font-display mt-1 text-[14px]" style={{ fontWeight: 520, color: 'var(--ink)' }}>Retail analysis chat</div>
                    </div>
                    <div className="flex flex-1 flex-col justify-end gap-2.5 p-3.5">
                      {filmPhase === 3 && (
                        <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-doc ml-auto max-w-[92%] px-3 py-2.5 text-[11px] leading-relaxed" style={{ background: 'var(--ink)', color: 'var(--paper-raised)' }}>
                          {brainQuery}
                        </m.div>
                      )}
                      {filmPhase === 3 && (
                        <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="rounded-doc max-w-[94%] border px-3 py-2.5 text-[11px] leading-relaxed" style={{ borderColor: 'var(--ledger)', background: 'var(--paper-raised)', color: 'var(--ink)' }}>
                          Amazon grew 18%. Hero boots converted better, stock stayed available, and returns held flat.
                        </m.div>
                      )}
                      <div className="rounded-doc mt-1 border p-3" style={{ borderColor: filmPhase === 2 ? 'var(--orange)' : 'var(--ledger)', background: 'var(--paper-raised)' }}>
                        <div className="min-h-[38px] text-[11px] leading-relaxed" style={{ color: typedChars ? 'var(--ink)' : 'var(--ink-muted)' }}>
                          {filmPhase === 2 ? brainQuery.slice(0, typedChars) : 'Ask about sales, stock, returns, or margin'}
                          {filmPhase === 2 && <m.span className="ml-0.5 inline-block h-3 w-px align-middle" animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ background: 'var(--ink)' }} />}
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="type-mono-label" style={{ fontSize: 8, color: 'var(--ink-muted)' }}>45K sales rows connected</span>
                          <m.span animate={filmPhase === 2 && typedChars === brainQuery.length ? { scale: [1, 1.08, 1] } : { scale: 1 }} className="type-mono-label rounded-doc px-2.5 py-1.5" style={{ fontSize: 8, fontWeight: 700, background: 'var(--orange)', color: 'var(--ink)' }}>Run analysis</m.span>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="rounded-doc min-h-[250px] border p-3.5" style={{ borderColor: 'var(--ledger)', background: 'var(--paper-raised)' }}>
                    <AnimatePresence mode="wait">
                      {filmPhase === 2 ? (
                        <m.div key="analysis-loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full min-h-[240px] flex-col justify-center">
                          <div className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink)' }}>Company Brain is working</div>
                          <h3 className="font-display mt-2 text-[20px]" style={{ fontWeight: 520, color: 'var(--ink)' }}>Joining sales, stock, and returns.</h3>
                          <div className="mt-5 space-y-2.5">
                            {[82, 64, 91].map((width, index) => <div key={width} className="rounded-doc h-9 overflow-hidden" style={{ background: 'var(--paper-shade)' }}><m.div className="h-full" initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ repeat: Infinity, duration: 1.4, delay: index * 0.16 }} style={{ width: `${width}%`, background: 'linear-gradient(90deg, transparent, rgba(255,77,0,0.12), transparent)' }} /></div>)}
                          </div>
                          <div className="type-mono-label mt-4 flex items-center gap-2" style={{ fontSize: 9, color: 'var(--ink-muted)' }}><span className="h-2 w-2 rounded-full" style={{ background: 'var(--orange)' }} />Checking channel movement</div>
                        </m.div>
                      ) : (
                        <m.div key="analysis-result" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.62 }}>
                          <div className="flex items-start justify-between gap-3"><div><div className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink)' }}>Movement drivers</div><h3 className="font-display tabular mt-1 text-[19px]" style={{ fontWeight: 520, color: 'var(--ink)' }}>Amazon footwear sales +18%</h3></div><StatusBracket status="Answered" className="shrink-0" /></div>
                          <div className="mt-3 grid grid-cols-3 gap-2">
                            {[['+24%', 'hero boots'], ['98%', 'in stock'], ['Flat', 'returns']].map(([value, label], index) => <m.div key={label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 + index * 0.1 }} className="rounded-doc border p-2.5" style={{ borderColor: 'var(--ledger)', background: 'var(--paper-raised)' }}><div className="font-display tabular text-[17px]" style={{ fontWeight: 520, color: 'var(--ink)' }}>{value}</div><div className="type-mono-label mt-1" style={{ fontSize: 8, color: 'var(--ink-muted)' }}>{label}</div></m.div>)}
                          </div>
                          <div className="rounded-doc mt-3 border p-3" style={{ borderColor: 'var(--ledger)', background: 'var(--paper-raised)' }}>
                            <div className="flex h-[72px] items-end gap-2">
                              {[36, 44, 40, 55, 68, 82].map((height, index) => <m.span key={height} className="flex-1" initial={{ height: 4 }} animate={{ height }} transition={{ delay: 0.28 + index * 0.08, duration: 0.55 }} style={{ background: index === 5 ? 'var(--orange)' : 'rgba(20,19,17,0.25)' }} />)}
                            </div>
                          </div>
                          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }} className="rounded-doc mt-3 border p-3" style={{ borderColor: 'var(--ledger)', background: 'var(--paper-shade)' }}>
                            <div className="type-mono-label" style={{ fontSize: 8, color: 'var(--ink)' }}>Recommended action</div>
                            <div className="mt-1 text-[11px] font-semibold" style={{ color: 'var(--ink)' }}>Keep price steady and move stock toward Amazon.</div>
                            <div className="mt-2 flex gap-2"><span className="type-mono-label rounded-doc border px-2 py-1" style={{ fontSize: 8, borderColor: 'var(--ledger)', background: 'var(--paper-raised)', color: 'var(--ink)' }}>Evidence attached</span><span className="type-mono-label rounded-doc px-2 py-1" style={{ fontSize: 8, background: 'var(--orange)', color: 'var(--ink)' }}>Send to sales agent</span></div>
                          </m.div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </section>
                </div>
              </m.div>
            )}
            {filmPhase === 4 && (
              <m.div
                key="publish-film"
                className="absolute inset-0 z-20 flex flex-col"
                style={{ background: 'var(--paper-shade)' }}
                initial={{ opacity: 0, x: 70, scale: 0.985 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 42, scale: 0.99 }}
                transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex min-h-[54px] items-center justify-between border-b px-4 sm:px-5" style={{ borderColor: 'var(--ledger)', background: 'var(--paper-raised)' }}>
                  <div className="text-[11px]" style={{ color: 'var(--ink-muted)' }}><span className="font-semibold" style={{ color: 'var(--ink)' }}>Listing Ops</span> / Publish everywhere</div>
                  <m.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="type-mono-label flex items-center gap-2" style={{ fontSize: 9, color: 'var(--ink)' }}><span className="grid h-4 w-4 place-items-center rounded-full" style={{ background: 'var(--paper-shade)', border: '1px solid var(--ledger-strong)' }}>✓</span>Approval complete</m.div>
                </div>

                <div className="grid min-h-0 flex-1 content-start gap-3 p-3 sm:p-4 lg:grid-cols-[0.82fr_1.18fr] lg:content-stretch">
                  <section className="rounded-doc relative min-h-[170px] overflow-hidden border p-3 sm:min-h-[220px] sm:p-3.5" style={{ borderColor: 'var(--ledger)', background: 'var(--paper-raised)' }}>
                    <div className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink-muted)' }}>Before Amplify</div>
                    <h3 className="font-display mt-1 text-[14px] sm:text-[17px]" style={{ fontWeight: 520, color: 'var(--ink)' }}>Workbook handoffs, every week</h3>
                    <div className="relative mx-auto mt-2 h-[68px] max-w-[300px] sm:mt-4 sm:h-[136px]">
                      {[
                        ['supplier_PI.xlsx', -7, -15, 14],
                        ['marketplace_mapping_v12.xlsx', 6, 13, 38],
                        ['amazon_flatfile_FINAL.xlsx', -3, -5, 64],
                        ['stock_update.csv', 2, 7, 90],
                      ].map(([name, rotate, x, y], index) => (
                        <m.div
                          key={String(name)}
                          initial={{ opacity: 0, x: isDesktop ? Number(x) - 45 : -24, y: isDesktop ? Number(y) + 18 : index * 14 + 10, rotate: isDesktop ? Number(rotate) * 1.8 : 0 }}
                          animate={{ opacity: 1, x: isDesktop ? Number(x) : 0, y: isDesktop ? Number(y) : index * 14, rotate: isDesktop ? Number(rotate) : 0 }}
                          transition={{ delay: 0.24 + index * 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                          className="rounded-doc absolute inset-x-1 flex h-8 items-center justify-between border px-2 sm:inset-x-3 sm:h-11 sm:px-3"
                          style={{ borderColor: 'var(--ledger)', background: 'var(--paper-raised)' }}
                        >
                          <span className="font-mono flex min-w-0 items-center gap-2 text-[8px] sm:text-[10px]" style={{ color: 'var(--ink)' }}><span className="rounded-doc grid h-5 w-5 shrink-0 place-items-center text-[7px] font-bold sm:h-6 sm:w-6 sm:text-[8px]" style={{ background: 'var(--paper-shade)', color: 'var(--ink)' }}>XLS</span><span className="truncate">{String(name)}</span></span>
                          <span className="h-2 w-2 rounded-full" style={{ background: 'var(--orange)' }} />
                        </m.div>
                      ))}
                    </div>
                    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.18 }} className="rounded-doc mt-2 flex items-center justify-between border px-3 py-2 sm:mt-3 sm:py-2.5" style={{ borderColor: 'var(--ledger)', background: 'var(--paper-shade)' }}>
                      <span className="tabular text-[10px] font-semibold" style={{ color: 'var(--ink)' }}>11 file handoffs</span>
                      <span className="type-mono-label" style={{ fontSize: 8, color: 'var(--ink-muted)' }}>Manual upkeep</span>
                    </m.div>
                  </section>

                  <section className="rounded-doc flex min-h-[270px] flex-col border p-3 sm:min-h-[280px] sm:p-3.5" style={{ borderColor: 'var(--ledger)', background: 'var(--paper-raised)' }}>
                    <div className="flex items-start justify-between gap-3">
                      <div><div className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink)' }}>One approved publish</div><h3 className="font-display tabular mt-1 text-[17px]" style={{ fontWeight: 520, color: 'var(--ink)' }}>184 products, all channels</h3></div>
                      <m.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.25 }} className="type-mono-label rounded-doc shrink-0 px-2.5 py-2" style={{ fontSize: 8, fontWeight: 700, background: 'var(--orange)', color: 'var(--ink)' }}>Publish 184</m.span>
                    </div>

                    <div className="relative my-3 h-1 overflow-hidden" style={{ background: 'var(--ledger)' }}>
                      <m.div className="absolute inset-y-0 left-0" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ delay: 1.4, duration: 1.75, ease: [0.22, 1, 0.36, 1] }} style={{ background: 'var(--orange)' }} />
                    </div>

                    <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3">
                      {[
                        { name: 'Amazon', src: '/logos/platforms/amazon.svg', status: 'Live' },
                        { name: 'Shopify', src: '/logos/platforms/shopify.svg', status: 'Synced' },
                        { name: 'Best Buy', mark: 'BEST BUY', status: 'Live', tone: '#fff200' },
                        { name: 'Walmart', mark: 'Walmart ✦', status: 'Live', tone: '#eaf4ff' },
                        { name: 'Noon', src: '/logos/platforms/noon.svg', status: 'Synced' },
                        { name: 'Namshi', mark: 'namshi', status: 'Ready', tone: 'var(--paper-shade)' },
                      ].map((channel, index) => (
                        <m.div key={channel.name} initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 2.05 + index * 0.26, duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="rounded-doc flex min-h-[52px] flex-col justify-between border p-2 sm:min-h-[70px] sm:p-2.5" style={{ borderColor: 'var(--ledger)', background: 'var(--paper-raised)' }}>
                          <div className="flex h-7 items-center">
                            {channel.src ? <img src={channel.src} alt={channel.name} className="max-h-6 max-w-[78px] object-contain object-left" /> : <span className={`rounded-doc px-1.5 py-1 text-[9px] font-extrabold ${channel.name === 'Namshi' ? 'font-display' : 'font-mono'}`} style={{ color: channel.name === 'Walmart' ? '#0874c9' : 'var(--ink)', background: channel.tone }}>{channel.mark}</span>}
                          </div>
                          <div className="flex items-center justify-between gap-2"><span className="text-[8px]" style={{ color: 'var(--ink-muted)' }}>{channel.name}</span><span className="type-mono-label whitespace-nowrap" style={{ fontSize: 7, color: 'var(--ink)' }}>[ {channel.status.toUpperCase()} ]</span></div>
                        </m.div>
                      ))}
                    </div>

                    <m.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.9, duration: 0.55 }} className="rounded-doc mt-3 flex items-center justify-between gap-3 border px-3 py-2.5" style={{ borderColor: 'var(--ink)', background: 'var(--paper-shade)' }}>
                      <div><div className="text-[9px] font-semibold" style={{ color: 'var(--ink)' }}>Published once. Maintained continuously.</div><div className="mt-0.5 text-[8px]" style={{ color: 'var(--ink-muted)' }}>Listings, price, stock, and availability stay in sync.</div></div>
                      <m.span animate={{ opacity: [0.35, 1, 0.35] }} transition={{ repeat: Infinity, duration: 1.8 }} className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: 'var(--orange)' }} />
                    </m.div>
                  </section>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </m.div>
    </div>
  )
}
