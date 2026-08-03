'use client'

import { useEffect, useRef, useState } from 'react'
import { m, useInView, useReducedMotion } from 'motion/react'

/**
 * The hero film. Six acts covering the whole operating loop, told with abstract
 * shapes instead of a fake app UI: a pile of unreadable paperwork becomes one
 * clean catalog, thin records get enriched, decisions get drafted and approved,
 * listings go live, and broken listings get caught and repaired after launch.
 *
 * Rule for this component: nothing on the stage is meant to be *read*. Sheets
 * are blurred placeholder bars, never fake data. The only readable copy is the
 * one large value line per act. That is the whole point of the section.
 */

const ACTS = [
  {
    kicker: 'INGESTION',
    line: 'Your week arrives as a pile of files.',
    sub: 'Supplier sheets, stock exports, price lists, product photos. All different, none ready.',
    ms: 3000,
  },
  {
    kicker: 'ONE CATALOG',
    line: 'Amplify reads every one of them.',
    sub: 'One clean catalog that stays current, without anyone rekeying a spreadsheet.',
    ms: 3000,
  },
  {
    kicker: 'ENRICHMENT',
    line: 'Thin records become complete listings.',
    sub: 'Missing attributes, sizing, materials, and images get filled in and traced back to source.',
    ms: 4200,
  },
  {
    kicker: 'DECISIONS',
    line: 'You get decisions, not dashboards.',
    sub: 'Each one drafted with its evidence. Nothing moves until you approve it.',
    ms: 4200,
  },
  {
    kicker: 'PUBLISHED',
    line: 'Approved work goes live everywhere.',
    sub: 'Listings, prices, and stock land on every channel you sell on.',
    ms: 3400,
  },
  {
    kicker: 'LISTING HEALTH',
    line: 'Broken listings get caught and fixed.',
    sub: 'Amplify keeps watching after launch, flags what breaks, and pushes the repair back through.',
    ms: 4800,
  },
]

/* deterministic layout — no Math.random, so server and client agree */
const SHEETS = [
  { scatter: { x: 4, y: 6, r: -9 }, grid: { x: 6, y: 8 }, w: 27, bars: 4, tag: 'XLSX' },
  { scatter: { x: 31, y: 1, r: 6 }, grid: { x: 37, y: 8 }, w: 27, bars: 3, tag: 'CSV' },
  { scatter: { x: 60, y: 9, r: -4 }, grid: { x: 68, y: 8 }, w: 27, bars: 4, tag: 'PDF' },
  { scatter: { x: 12, y: 34, r: 8 }, grid: { x: 6, y: 38 }, w: 27, bars: 3, tag: 'IMG' },
  { scatter: { x: 42, y: 30, r: -7 }, grid: { x: 37, y: 38 }, w: 27, bars: 4, tag: 'XLSX' },
  { scatter: { x: 68, y: 36, r: 5 }, grid: { x: 68, y: 38 }, w: 27, bars: 3, tag: 'CSV' },
  { scatter: { x: 2, y: 62, r: -5 }, grid: { x: 6, y: 68 }, w: 27, bars: 4, tag: 'IMG' },
  { scatter: { x: 34, y: 66, r: 9 }, grid: { x: 37, y: 68 }, w: 27, bars: 3, tag: 'XLSX' },
  { scatter: { x: 63, y: 60, r: -8 }, grid: { x: 68, y: 68 }, w: 27, bars: 4, tag: 'PDF' },
]

/** enrichment rows: `prefilled` rows arrived with a value, the rest get filled in */
const ENRICH_ROWS = [
  { label: 30, prefilled: true, fill: 62 },
  { label: 22, prefilled: false, fill: 88 },
  { label: 34, prefilled: false, fill: 71 },
  { label: 26, prefilled: true, fill: 54 },
  { label: 30, prefilled: false, fill: 92 },
]

const DECISIONS = [
  { verb: 'Reorder', object: 'the styles that keep selling out', tone: 'go' },
  { verb: 'Fix', object: 'the listings blocking your best channel', tone: 'warn' },
  { verb: 'Hold', object: 'the price. Markdown would cost you margin.', tone: 'calm' },
]

const CHANNELS: { name: string; src?: string; mark?: string }[] = [
  { name: 'Amazon', src: '/logos/platforms/amazon.svg' },
  { name: 'Shopify', src: '/logos/platforms/shopify.svg' },
  { name: 'Noon', src: '/logos/platforms/noon.svg' },
  { name: 'Namshi', mark: 'namshi' },
  { name: 'Centrepoint', mark: 'CENTREPOINT' },
  { name: '6th Street', mark: '6TH STREET' },
]

/** which channels break in the listing-health act */
const BREAKS = [1, 4]

/** one unreadable document — placeholder bars only, never fake data */
function Sheet({
  sheet,
  act,
  index,
}: {
  sheet: (typeof SHEETS)[number]
  act: number
  index: number
}) {
  const scattered = act === 0
  const receding = act >= 2

  return (
    <m.div
      className="absolute rounded-doc"
      style={{
        width: `${sheet.w}%`,
        background: 'var(--paper-raised)',
        border: '1px solid var(--ledger-strong)',
        transformOrigin: 'center',
      }}
      initial={false}
      animate={{
        left: `${scattered ? sheet.scatter.x : sheet.grid.x}%`,
        top: `${scattered ? sheet.scatter.y : sheet.grid.y}%`,
        rotate: scattered ? sheet.scatter.r : 0,
        filter: scattered ? 'blur(3px)' : receding ? 'blur(2px)' : 'blur(0px)',
        opacity: receding ? 0.12 : 1,
        scale: receding ? 0.94 : 1,
        boxShadow: scattered
          ? '5px 6px 0 rgba(20,19,17,0.07)'
          : '2px 2px 0 rgba(20,19,17,0.05)',
      }}
      transition={{
        duration: 0.85,
        delay: scattered ? 0 : index * 0.045,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        className="flex items-center justify-between px-2.5 py-1.5"
        style={{ borderBottom: '1px solid var(--ledger)' }}
      >
        <m.span
          className="h-1.5 rounded-full"
          animate={{
            width: scattered ? 26 : 34,
            background: scattered ? 'var(--ledger-strong)' : 'var(--orange)',
          }}
          transition={{ duration: 0.6, delay: index * 0.045 }}
        />
        <span className="type-mono-label" style={{ fontSize: 7, color: 'var(--ink-faint)' }}>
          {sheet.tag}
        </span>
      </div>
      <div className="space-y-1.5 px-2.5 py-2.5">
        {Array.from({ length: sheet.bars }).map((_, bar) => (
          <m.span
            key={bar}
            className="block h-1.5 rounded-full"
            animate={{
              width: scattered ? `${58 + ((index * 7 + bar * 13) % 38)}%` : '100%',
              background: scattered ? 'rgba(20,19,17,0.16)' : 'rgba(20,19,17,0.28)',
            }}
            transition={{ duration: 0.6, delay: index * 0.045 + bar * 0.025 }}
          />
        ))}
      </div>
    </m.div>
  )
}

/** ACT 3 — one thin record fills itself out. Shapes only, plus the real product shot. */
function EnrichmentCard({ reduced }: { reduced: boolean | null }) {
  return (
    <m.div
      className="rounded-doc mx-auto w-full max-w-[560px] overflow-hidden"
      style={{
        background: 'var(--paper-raised)',
        border: '1px solid var(--ink)',
        boxShadow: '4px 4px 0 rgba(20,19,17,0.1)',
      }}
      initial={reduced ? false : { opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="flex items-center justify-between px-3.5 py-2 sm:px-4"
        style={{ borderBottom: '1px solid var(--ledger)', background: 'var(--paper-shade)' }}
      >
        <span className="type-mono-label" style={{ fontSize: 8, color: 'var(--ink-faint)' }}>
          ONE SKU RECORD
        </span>
        <m.span
          className="type-mono-label"
          style={{ fontSize: 8, color: 'var(--orange)', fontWeight: 700 }}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 2.1 }}
        >
          ✓ CHANNEL READY
        </m.span>
      </div>

      <div className="flex gap-3 p-3.5 sm:gap-4 sm:p-4">
        {/* the product shot resolving in */}
        <div
          className="relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-doc sm:h-[96px] sm:w-[96px]"
          style={{ border: '1px dashed var(--ledger-strong)', background: 'var(--paper-shade)' }}
        >
          <m.img
            src="/images/products/customer-shoe-boot.jpg"
            alt=""
            className="h-full w-full object-cover"
            initial={reduced ? false : { opacity: 0, filter: 'blur(6px)', scale: 1.08 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* fields filling in, one after another */}
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 sm:gap-2.5">
          {ENRICH_ROWS.map((row, index) => (
            <div key={index} className="flex items-center gap-2.5">
              <span
                className="h-1.5 shrink-0 rounded-full"
                style={{ width: row.label, background: 'rgba(20,19,17,0.22)' }}
              />
              {row.prefilled ? (
                <m.span
                  className="h-1.5 rounded-full"
                  initial={false}
                  animate={{ background: 'rgba(20,19,17,0.34)', width: `${row.fill}%` }}
                />
              ) : (
                <div
                  className="relative h-[18px] flex-1 overflow-hidden rounded-doc"
                  style={{ border: '1px dashed var(--ledger-strong)' }}
                >
                  <m.span
                    className="absolute inset-y-[3px] left-[3px] rounded-full"
                    style={{ background: 'rgba(29,122,109,0.32)' }}
                    initial={reduced ? false : { width: 0 }}
                    animate={{ width: `${row.fill}%` }}
                    transition={{
                      duration: 0.5,
                      delay: 0.75 + index * 0.34,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </m.div>
  )
}

/** ACT 5 + 6 — the channel wall. `health` mode breaks two listings, then repairs them. */
function ChannelWall({ health, reduced }: { health: boolean; reduced: boolean | null }) {
  return (
    <div className="grid grid-cols-2 content-center gap-2.5 sm:grid-cols-3 sm:gap-3">
      {CHANNELS.map((channel, index) => {
        const breaks = health && BREAKS.includes(index)
        return (
          <m.div
            key={channel.name}
            className="rounded-doc relative flex min-h-[74px] flex-col justify-between p-3 sm:min-h-[96px] sm:p-4"
            initial={reduced ? false : { opacity: 0, y: 22, scale: 0.94 }}
            animate={
              breaks
                ? {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    borderColor: ['var(--ink)', 'var(--stamp)', 'var(--stamp)', 'var(--orange)'],
                  }
                : { opacity: 1, y: 0, scale: 1, borderColor: 'var(--ink)' }
            }
            transition={
              breaks
                ? { duration: 3.6, times: [0, 0.18, 0.62, 0.78], ease: 'linear' }
                : { duration: 0.5, delay: 0.15 + index * 0.1, ease: [0.22, 1, 0.36, 1] }
            }
            /* borderColor animates, so the border must be declared as a style, not a class */
            style={{ background: 'var(--paper-raised)', borderWidth: 1, borderStyle: 'solid' }}
          >
            <div className="flex h-7 items-center sm:h-8">
              {channel.src ? (
                <img
                  src={channel.src}
                  alt=""
                  className="max-h-6 max-w-[86px] object-contain object-left sm:max-h-7"
                />
              ) : (
                <span
                  className="font-display text-[14px] sm:text-[17px]"
                  style={{ color: 'var(--ink)', fontWeight: 620 }}
                >
                  {channel.mark}
                </span>
              )}
            </div>

            {/* healthy state */}
            <m.span
              className="type-mono-label flex items-center gap-1.5"
              style={{ fontSize: 9, color: 'var(--orange)', fontWeight: 700 }}
              initial={reduced ? false : { opacity: 0 }}
              animate={breaks ? { opacity: [1, 0, 0, 1] } : { opacity: 1 }}
              transition={
                breaks
                  ? { duration: 3.6, times: [0, 0.18, 0.7, 0.82], ease: 'linear' }
                  : { duration: 0.3, delay: 0.45 + index * 0.1 }
              }
            >
              <span
                className="grid h-3.5 w-3.5 place-items-center rounded-full"
                style={{ background: 'var(--orange)', color: 'var(--paper)', fontSize: 8 }}
              >
                ✓
              </span>
              {breaks ? 'FIXED' : 'LIVE'}
            </m.span>

            {/* the broken window */}
            {breaks && (
              <m.span
                className="type-mono-label absolute bottom-3 left-3 flex items-center gap-1.5 sm:bottom-4 sm:left-4"
                style={{ fontSize: 9, color: 'var(--stamp)', fontWeight: 700 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3.6, times: [0, 0.2, 0.62, 0.72], ease: 'linear' }}
              >
                <m.span
                  className="grid h-3.5 w-3.5 place-items-center rounded-full"
                  style={{ background: 'var(--stamp)', color: 'var(--paper)', fontSize: 8 }}
                  animate={{ scale: [1, 1.18, 1] }}
                  transition={{ repeat: Infinity, duration: 1.1 }}
                >
                  !
                </m.span>
                ISSUE FOUND
              </m.span>
            )}
          </m.div>
        )
      })}
    </div>
  )
}

export function HeroFlow() {
  const stageRef = useRef<HTMLDivElement>(null)
  /* Only play once the film is genuinely the thing being looked at. A low
     threshold starts the sequence while the reader is still on the headline,
     which is why it looked stuck on the first beat. */
  const inView = useInView(stageRef, { amount: 0.5, margin: '0px 0px -12% 0px' })
  const reduced = useReducedMotion()
  const [act, setAct] = useState(0)
  const [paused, setPaused] = useState(false)
  const playing = Boolean(inView) && !paused && !reduced

  useEffect(() => {
    if (reduced) {
      setAct(ACTS.length - 1)
      return
    }
    if (!playing) return
    const timer = window.setTimeout(
      () => setAct((current) => (current + 1) % ACTS.length),
      ACTS[act].ms,
    )
    return () => window.clearTimeout(timer)
  }, [act, playing, reduced])

  const current = ACTS[act]

  return (
    <div
      ref={stageRef}
      id="how-it-works"
      className="doc-shadow rounded-doc scroll-mt-[80px] overflow-hidden"
      style={{ border: '1px solid var(--ink)', background: 'var(--paper-raised)' }}
    >
      {/* act selector — the current segment fills over the act's duration, so the
          film always reads as playing rather than frozen */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5"
        style={{ borderBottom: '1px solid var(--ledger-strong)', background: 'var(--paper-shade)' }}
      >
        <span className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink-faint)' }}>
          HOW AMPLIFY WORKS
        </span>
        <div className="flex items-center gap-1.5">
          {ACTS.map((item, index) => (
            <button
              key={item.kicker}
              type="button"
              onClick={() => {
                setAct(index)
                setPaused(true)
              }}
              aria-label={item.line}
              className="h-1 w-6 overflow-hidden rounded-full sm:w-9"
              style={{ background: 'var(--ledger-strong)' }}
            >
              <m.span
                key={`${index}-${act}-${playing}`}
                className="block h-full origin-left"
                initial={{ scaleX: index < act ? 1 : 0 }}
                animate={{ scaleX: index <= act ? 1 : 0 }}
                transition={
                  index === act && playing
                    ? { duration: ACTS[act].ms / 1000, ease: 'linear' }
                    : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
                }
                style={{ background: 'var(--orange)' }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* the value line — the only thing here that is meant to be read.
          keyed remount rather than AnimatePresence: an exit-then-enter swap can
          wedge mid-transition and leave this block empty, and this block going
          blank defeats the whole section. */}
      <div className="min-h-[168px] px-4 pb-5 pt-6 sm:min-h-[190px] sm:px-8 sm:pb-6 sm:pt-8">
        <m.div
          key={act}
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="type-mono-label"
            style={{ fontSize: 10, color: 'var(--orange)', fontWeight: 700 }}
          >
            {current.kicker}
          </p>
          <h3
            className="type-h2 mt-2 max-w-[760px]"
            style={{ fontSize: 'clamp(26px, 3.4vw, 42px)', color: 'var(--ink)' }}
          >
            {current.line}
          </h3>
          <p
            className="mt-2.5 max-w-[560px] text-[14px] leading-[1.6] sm:text-[15px]"
            style={{ color: 'var(--ink-muted)' }}
          >
            {current.sub}
          </p>
        </m.div>
      </div>

      {/* the stage — abstract shapes only */}
      <div
        className="relative min-h-[330px] overflow-hidden sm:min-h-[400px]"
        style={{ background: 'var(--paper-shade)', borderTop: '1px solid var(--ledger)' }}
        aria-hidden
      >
        <div className="absolute inset-0 p-4 sm:p-6">
          <div className="relative h-full w-full">
            {SHEETS.map((sheet, index) => (
              <Sheet key={index} sheet={sheet} act={act} index={index} />
            ))}

            {/* scan sweep as the pile resolves into one catalog */}
            {act === 1 && !reduced && (
              <m.span
                className="absolute inset-y-0 w-24"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(29,122,109,0.28), transparent)',
                }}
                initial={{ left: '-15%', opacity: 0 }}
                animate={{ left: '105%', opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.4, ease: 'linear', delay: 0.3 }}
              />
            )}

            {act === 2 && (
              <div key="enrich" className="absolute inset-0 flex items-center">
                <EnrichmentCard reduced={reduced} />
              </div>
            )}

            {act === 3 && (
              <m.div
                key="decisions"
                className="absolute inset-0 flex flex-col justify-center gap-2.5 sm:gap-3"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {DECISIONS.map((decision, index) => (
                  <m.div
                    key={decision.verb}
                    className="rounded-doc flex items-center gap-3 px-3.5 py-3 sm:gap-4 sm:px-5 sm:py-3.5"
                    style={{
                      background: 'var(--paper-raised)',
                      border: '1px solid var(--ink)',
                      boxShadow: '3px 3px 0 rgba(20,19,17,0.1)',
                    }}
                    initial={reduced ? false : { opacity: 0, x: -28, scale: 0.97 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + index * 0.18,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <span
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full sm:h-8 sm:w-8"
                      style={{
                        background:
                          decision.tone === 'go'
                            ? 'var(--orange)'
                            : decision.tone === 'warn'
                              ? 'var(--stamp)'
                              : 'var(--ink)',
                        color: 'var(--paper)',
                        fontSize: 13,
                      }}
                    >
                      {decision.tone === 'go' ? '↑' : decision.tone === 'warn' ? '!' : '='}
                    </span>
                    <span className="min-w-0">
                      <span
                        className="font-display text-[16px] sm:text-[19px]"
                        style={{ color: 'var(--ink)', fontWeight: 560 }}
                      >
                        {decision.verb}{' '}
                      </span>
                      <span
                        className="text-[13px] sm:text-[15px]"
                        style={{ color: 'var(--ink-muted)' }}
                      >
                        {decision.object}
                      </span>
                    </span>
                  </m.div>
                ))}

                <m.div
                  className="mt-1 flex items-center justify-center gap-3"
                  initial={reduced ? false : { opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, delay: 0.95, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <span
                    className="type-mono-label rounded-doc px-3.5 py-2"
                    style={{
                      border: '2px solid var(--orange)',
                      color: 'var(--orange)',
                      fontSize: 11,
                      fontWeight: 700,
                      transform: 'rotate(-2deg)',
                      background: 'var(--paper-raised)',
                    }}
                  >
                    ✓ YOU APPROVE, THEN IT RUNS
                  </span>
                </m.div>
              </m.div>
            )}

            {act >= 4 && (
              <div key={`channels-${act}`} className="absolute inset-0 flex flex-col justify-center">
                <ChannelWall health={act === 5} reduced={reduced} />
              </div>
            )}
          </div>
        </div>

        {/* stage caption, so the abstraction is never ambiguous */}
        <span
          className="type-mono-label pointer-events-none absolute bottom-2.5 left-4 sm:left-6"
          style={{ fontSize: 8, color: 'var(--ink-faint)' }}
        >
          {
            [
              'INBOUND · UNSTRUCTURED',
              'ONE CATALOG · STRUCTURED',
              'ENRICHED · FIELD BY FIELD',
              'DRAFTED FOR YOUR APPROVAL',
              'PUBLISHED ACROSS CHANNELS',
              'MONITORED · REPAIRED · RESYNCED',
            ][act]
          }
        </span>
      </div>
    </div>
  )
}
