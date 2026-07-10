'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useInView } from 'motion/react'
import { ConnectedWorkflow } from '../components/connected-workflow'
import { MotionCard, MotionShell, ProductStage, Reveal } from '../components/motion-primitives'

const ACCENT = '#18736A'
const SIGNAL = '#9EE078'
const BASE = '#F4F8F7'
const DARK = '#101613'
const INK = '#17212B'
const MUTED = 'rgba(255,255,255,0.58)'
const SOFT = 'rgba(255,255,255,0.78)'
const BORDER = 'rgba(23,33,29,0.12)'
const GLASS = 'rgba(255,255,255,0.055)'
const D = 'var(--font-display)'
const M = 'var(--font-mono)'

const L_BG = '#F4F8F7'
const L_SURFACE = '#EAF1EE'
const L_TEXT = '#17212B'
const L_MUTED = '#66736F'
const L_BORDER = 'rgba(23,33,29,0.12)'

const NAV_LINKS = [
  { label: 'Product', href: '#product-flow' },
  { label: 'Enrichment', href: '#enrichment' },
  { label: 'Integrations', href: '#integrations' },
]

const USE_CASE_LINKS = [
  { label: 'Listing Ops', href: '/use-cases/listing-ops', detail: 'Generate marketplace files' },
  { label: 'Company Brain', href: '/use-cases/company-brain', detail: 'Ask sales and stock' },
  { label: 'Inventory', href: '/use-cases/inventory', detail: 'Read the channel ledger' },
  { label: 'Approvals', href: '/use-cases/approvals', detail: 'Review agent work' },
  { label: 'Marketplace files', href: '/use-cases/marketplace-files', detail: 'Invoice to XLSX' },
]

const HOME_USE_CASES = [
  {
    title: 'Listing Ops',
    href: '/use-cases/listing-ops',
    metric: '184 SKU rows',
    body: 'Turn source files into marketplace-ready listings.',
  },
  {
    title: 'Company Brain',
    href: '/use-cases/company-brain',
    metric: '45K sales rows',
    body: 'Ask what changed and what deserves attention.',
  },
  {
    title: 'Inventory',
    href: '/use-cases/inventory',
    metric: '1,240 units',
    body: 'Plan restocks from velocity, cover, and lead time.',
  },
  {
    title: 'Approvals',
    href: '/use-cases/approvals',
    metric: '17 decisions',
    body: 'Review agent work before anything goes live.',
  },
  {
    title: 'Marketplace files',
    href: '/use-cases/marketplace-files',
    metric: '4 platforms',
    body: 'Convert supplier data into channel-ready files.',
  },
]

const ENRICHMENT_ROWS = [
  {
    field: 'Product image',
    before: 'https://i.ibb.co/772104/boot-01.jpg\nhttps://i.ibb.co/772104/boot-02.jpg',
    after: '/images/products/customer-shoe-boot.jpg',
    note: 'Image URLs become a reviewed, selected product asset.',
    kind: 'image',
  },
  {
    field: 'Title',
    before: 'Men Shoes Brown',
    after: 'Men’s Leather Lace-Up Ankle Boot - Brown',
    note: 'Product type, gender, material, construction, and color are made explicit.',
  },
  {
    field: 'Sole / heel',
    before: '-',
    after: 'Low stacked heel, rubber outsole',
    note: 'Image-derived details are mapped to marketplace attribute fields.',
  },
  {
    field: 'Closure',
    before: '-',
    after: 'Lace-up closure',
    note: 'Attribute inferred from the product image and reviewed before export.',
  },
  {
    field: 'Material',
    before: 'Synthetic',
    after: 'Leather upper, textile lining, rubber outsole',
    note: 'Generic material text becomes channel-ready structured data.',
  },
  {
    field: 'Sizing copy',
    before: 'Regular fit',
    after: 'Men’s EU sizing. Select your usual boot size.',
    note: 'Operational notes become clear PDP guidance.',
  },
]

const PRODUCT_FLOW_TABS = [
  {
    id: 'listings',
    label: 'Listing Ops',
    eyebrow: 'Template compile',
    title: 'Turn messy product files into approved channel listings.',
    body: 'Invoices, SKU sheets, product images, and channel templates become clean rows your team can review.',
    command: 'Build Namshi and 6th Street files',
    metrics: [
      ['184', 'SKUs'],
      ['37', 'fields filled'],
      ['4', 'checks'],
    ],
    steps: ['Read source files', 'Match images', 'Fill fields', 'Check rules', 'Queue review'],
    rows: [
      ['Supplier PI', 'Style, color, sizes', 'Synced'],
      ['Images', '5 URLs matched', 'Ready'],
      ['Namshi file', 'Attributes mapped', 'Mapped'],
      ['6th Street', 'Variants ready', 'Mapped'],
      ['Review', '4 fields need a check', 'Open'],
    ],
    chart: [32, 46, 58, 79, 92],
    decision: 'Confirm the four uncertain fields, then export both marketplace files.',
    action: 'Prepare XLSX files',
  },
  {
    id: 'brain',
    label: 'Company Brain',
    eyebrow: 'Retail planning',
    title: 'Ask what changed, why it moved, and what to do next.',
    body: 'Sales, returns, stock, pricing, and channel history sit in one operator-friendly view.',
    command: 'Explain last week sales by channel, category, and SKU',
    metrics: [
      ['+18%', 'Amazon sales'],
      ['-7%', 'Noon conversion'],
      ['12', 'SKUs'],
    ],
    steps: ['Pull sales', 'Group by SKU', 'Check stock', 'Add returns', 'Summarize'],
    rows: [
      ['Channel pivot', 'Amazon footwear +18%', 'Growth'],
      ['Size curve', 'EU 38 and 39 fastest', 'Watch'],
      ['Returns', 'Fit note missing', 'Fix'],
      ['Margin', 'No markdown needed', 'Hold'],
      ['Answer', 'Move stock to Amazon', 'Ready'],
    ],
    chart: [44, 52, 49, 68, 81],
    decision: 'Keep price steady, shift stock toward Amazon, and fix fit copy before the campaign.',
    action: 'Send actions to Sales Agent',
  },
  {
    id: 'forecast',
    label: 'Inventory',
    eyebrow: 'Channel ledger',
    title: 'Convert sales velocity into a buy plan.',
    body: 'Recent sales, days of cover, lead time, return risk, and channel stock become a clear buy recommendation.',
    command: 'Forecast the next buy with 21 day supplier lead time',
    metrics: [
      ['18', 'days cover'],
      ['1,240', 'units suggested'],
      ['AED 42K', 'PO value'],
    ],
    steps: ['Read sell-through', 'Check cover', 'Apply lead time', 'Protect margin', 'Draft buy'],
    rows: [
      ['BR-772104-CAF', '320 units, high confidence', 'Buy'],
      ['BR-9011-CRM', '180 units, steady carryover', 'Buy'],
      ['BR-772105-PRE', 'Slow size curve', 'Hold'],
      ['BR-772106-NDE', 'Bundle before reorder', 'Test'],
      ['Budget', 'Within monthly limit', 'Passed'],
    ],
    chart: [78, 70, 61, 52, 43],
    decision: 'Draft the PO for fast-moving carryover styles and hold the slower color.',
    action: 'Create purchase order draft',
  },
  {
    id: 'actions',
    label: 'Approvals',
    eyebrow: 'Inbox',
    title: 'Approve the work before anything goes live.',
    body: 'Listing, inventory, PO, and sales agents prepare actions with evidence, impact, and rollback notes.',
    command: 'Show every action waiting on merchandising approval',
    metrics: [
      ['9', 'actions queued'],
      ['3', 'agents ready'],
      ['0', 'auto writes'],
    ],
    steps: ['Review evidence', 'Check impact', 'Approve or edit', 'Apply', 'Measure'],
    rows: [
      ['Inventory Agent', 'Shift 220 units', 'Approve'],
      ['Procurement Agent', 'Draft AED 42K PO', 'Review'],
      ['Merchandising Agent', 'Move weekend budget', 'Approve'],
      ['Listing Ops', 'Add fit copy to 12 SKUs', 'Approve'],
      ['Audit trail', 'Before/after logged', 'On'],
    ],
    chart: [38, 54, 63, 73, 88],
    decision: 'Approve the low-risk actions, edit the PO draft, and keep the audit trail attached.',
    action: 'Open approval queue',
  },
]

type Status = 'idle' | 'loading' | 'success' | 'error'

function Logo({ size = 28 }: { size?: number }) {
  return <img src="/logo.png" alt="Amplify" style={{ width: size, height: size, borderRadius: 7, objectFit: 'cover' }} />
}

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
    </svg>
  )
}

function SectionLabel({ label, align = 'left', tone = 'dark' }: { label: string; align?: 'left' | 'center'; tone?: 'dark' | 'light' }) {
  const textColor = tone === 'light' ? L_MUTED : 'rgba(255,255,255,0.58)'

  return (
    <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`} style={{ fontFamily: M }}>
      <span className="h-px w-8" style={{ background: tone === 'light' ? ACCENT : SIGNAL }} />
      <span className="text-[11px] uppercase" style={{ color: align === 'center' ? L_MUTED : textColor }}>
        {label}
      </span>
      {align === 'center' && <span className="h-px w-8" style={{ background: tone === 'light' ? ACCENT : SIGNAL }} />}
    </div>
  )
}

function WaitlistForm({
  email,
  setEmail,
  status,
  message,
  onSubmit,
  compact = false,
  tone = 'dark',
}: {
  email: string
  setEmail: (email: string) => void
  status: Status
  message: string
  onSubmit: () => void
  compact?: boolean
  tone?: 'light' | 'dark'
}) {
  if (status === 'success') {
    return (
      <div className="flex min-h-[52px] items-center gap-3 rounded-lg px-4" style={{ background: '#eaf8f5', border: '1px solid #bde5dc' }}>
        <span className="grid h-5 w-5 place-items-center rounded-full" style={{ background: SIGNAL, color: DARK }}>
          <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 10 3 3 7-7" />
          </svg>
        </span>
        <span className="text-[12px]" style={{ color: tone === 'light' ? ACCENT : SIGNAL, fontFamily: M }}>{message}</span>
      </div>
    )
  }

  return (
    <div className="w-full">
      <form
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
        }}
        className={`flex w-full overflow-hidden rounded-lg ${compact ? 'flex-col sm:flex-row' : 'flex-col sm:max-w-[540px] sm:flex-row'}`}
        style={{
          background: tone === 'light' ? '#ffffff' : 'rgba(255,255,255,0.07)',
          border: `1px solid ${tone === 'light' ? L_BORDER : 'rgba(255,255,255,0.14)'}`,
          boxShadow: tone === 'light' ? '0 18px 52px rgba(15,31,28,0.1)' : '0 18px 60px rgba(0,0,0,0.28)',
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Work email"
          disabled={status === 'loading'}
          className="amplify-email h-[52px] min-w-0 shrink-0 bg-transparent px-4 text-[14px] outline-none disabled:opacity-50 sm:flex-1"
          data-tone={tone}
          style={{ color: tone === 'light' ? INK : '#fff' }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="flex h-[52px] shrink-0 items-center justify-center gap-2 px-6 text-[12px] font-bold transition-opacity hover:opacity-90 disabled:opacity-55"
          style={{ background: tone === 'light' ? ACCENT : SIGNAL, color: tone === 'light' ? '#fff' : DARK, fontFamily: M }}
        >
          {status === 'loading' ? 'REQUESTING' : 'REQUEST EARLY ACCESS'}
          {status !== 'loading' && <ArrowIcon />}
        </button>
      </form>
      {status === 'error' && <p className="mt-2 text-[12px] text-red-400" style={{ fontFamily: M }}>{message}</p>}
    </div>
  )
}

function HeroConsole() {
  const filmRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [filmPhase, setFilmPhase] = useState(0)
  const [typedChars, setTypedChars] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const isFilmInView = useInView(filmRef, { amount: 0.15, margin: '0px 0px -60% 0px' })
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
    <div ref={filmRef} className="relative overflow-hidden rounded-xl border bg-white text-left" style={{ borderColor: L_BORDER, boxShadow: '0 34px 100px rgba(15,31,28,0.18)' }}>
      <div className="flex items-center justify-between border-b bg-white px-4 py-3" style={{ borderColor: L_BORDER }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#dce5e0]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#dce5e0]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#9ee078]" />
          </div>
          <span className="hidden text-[11px] sm:inline" style={{ color: L_MUTED, fontFamily: M }}>app.use-amplify.com/workspace/{filmPhase === 4 ? 'listing-ops/publish' : filmPhase >= 2 ? 'company-brain/ask' : 'listing-ops/overview'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden gap-1 sm:flex" aria-label={`Product film scene ${filmPhase + 1} of 5`}>
            {[0, 1, 2, 3, 4].map((phase) => (
              <button key={phase} type="button" onClick={() => setFilmPhase(phase)} aria-label={`Show product film scene ${phase + 1}`} className="h-1 w-5 overflow-hidden rounded-full bg-[#dce5e0]">
                <m.span className="block h-full origin-left" animate={{ scaleX: phase <= filmPhase ? 1 : 0 }} style={{ background: ACCENT }} />
              </button>
            ))}
          </div>
          <span className="rounded-md border px-2.5 py-1 text-[10px] font-semibold" style={{ borderColor: '#bde5dc', background: '#eaf8f5', color: ACCENT, fontFamily: M }}>LIVE PRODUCT</span>
        </div>
      </div>

      <m.div
        className="grid min-h-[560px] md:grid-cols-[190px_minmax(0,1fr)]"
        animate={isDesktop && filmPhase === 1 ? { scale: 1.13, x: 22 } : { scale: 1, x: 0 }}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: '12% 48%' }}
      >
        <aside className="relative hidden flex-col bg-[#101613] p-4 text-white md:flex">
          <div className="mb-7 flex items-center gap-2.5">
            <Logo size={30} />
            <div>
              <div className="text-[13px] font-semibold">Amplify</div>
              <div className="text-[9px] uppercase" style={{ color: '#9fb4aa', fontFamily: M }}>Retail workspace</div>
            </div>
          </div>
          <div className="space-y-1.5">
            {['Overview', 'Listing', 'Company Brain', 'Inventory', 'Approvals'].map((item) => {
              const selected = filmPhase === 4 ? item === 'Listing' : filmPhase >= 1 ? item === 'Company Brain' : item === 'Listing'
              return (
                <button key={item} type="button" onClick={() => item === 'Company Brain' ? setFilmPhase(2) : item === 'Listing' ? setFilmPhase(0) : undefined} className="relative w-full rounded-lg border px-3 py-2.5 text-left text-[11px] font-semibold" style={{ borderColor: selected ? '#436050' : 'transparent', background: selected ? '#1a241f' : 'transparent', color: selected ? '#f7fbf8' : '#9fb4aa', boxShadow: filmPhase === 1 && item === 'Company Brain' ? '0 0 0 1px rgba(158,224,120,0.42), 0 0 34px rgba(158,224,120,0.16)' : 'none' }}>
                  {item}
                  {filmPhase === 1 && item === 'Company Brain' && <m.span className="absolute right-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full" initial={{ scale: 0 }} animate={{ scale: [0, 1.4, 1] }} style={{ background: SIGNAL }} />}
                </button>
              )
            })}
          </div>
          <div className="mt-auto rounded-lg border p-3" style={{ borderColor: '#28352f', background: '#151d19' }}>
            <div className="text-[9px] uppercase" style={{ color: '#9fb4aa', fontFamily: M }}>Connected</div>
            <div className="mt-2 flex items-center gap-2 text-[11px]">
              <span className="h-2 w-2 rounded-full bg-[#9ee078]" />
              4 source files
            </div>
          </div>
        </aside>

        <div className="relative min-w-0 overflow-hidden bg-[#eef3f1]">
          <div className="flex min-h-[54px] items-center justify-between border-b bg-[#f8fbf9] px-4 sm:px-5" style={{ borderColor: '#dce5e0' }}>
            <div className="text-[11px]" style={{ color: L_MUTED }}><span className="font-semibold" style={{ color: L_TEXT }}>Listing</span> / Overview</div>
            <div className="flex items-center gap-2 text-[10px]" style={{ color: L_MUTED, fontFamily: M }}>
              <span className="h-2 w-2 rounded-full bg-[#2c9a68]" />
              SYNCED 2M AGO
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="text-[10px] font-semibold uppercase" style={{ color: ACCENT, fontFamily: M }}>Marketplace readiness</div>
                <h3 className="mt-1 text-[24px] font-semibold leading-tight sm:text-[28px]" style={{ color: L_TEXT }}>Prepare this week&apos;s listings</h3>
                <p className="mt-1 text-[12px] sm:text-[13px]" style={{ color: L_MUTED }}>Supplier data in. Review workbook out.</p>
              </div>
              <button type="button" className="h-9 rounded-lg px-3 text-[11px] font-semibold text-white" style={{ background: ACCENT }}>
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
                    className="relative min-h-[72px] overflow-hidden rounded-lg border px-3 py-2.5 text-left transition-colors"
                    style={{ borderColor: selected ? '#69ab9f' : '#d8e2dd', background: selected ? '#e7f7f3' : '#fff' }}
                  >
                    <span className="flex items-center gap-2 text-[11px] font-semibold" style={{ color: selected ? ACCENT : L_TEXT }}>
                      <span className="grid h-5 w-5 place-items-center rounded-full text-[9px]" style={{ background: complete || selected ? ACCENT : '#eef3f1', color: complete || selected ? '#fff' : L_MUTED }}>{complete ? '✓' : index + 1}</span>
                      {stage.label}
                    </span>
                    <span className="mt-1.5 block text-[9px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>{stage.detail}</span>
                    {selected && <span className="hero-demo-progress absolute inset-x-0 bottom-0 h-[2px]" style={{ background: ACCENT }} />}
                  </button>
                )
              })}
            </div>

            <div className="mt-4 grid gap-3 xl:grid-cols-[minmax(0,1.25fr)_minmax(240px,0.75fr)]">
              <section className="overflow-hidden rounded-lg border bg-white" style={{ borderColor: '#d8e2dd' }}>
                <div className="flex items-center justify-between border-b px-3.5 py-3" style={{ borderColor: '#e2e9e5' }}>
                  <div>
                    <div className="text-[11px] font-semibold" style={{ color: L_TEXT }}>Launch board</div>
                    <div className="text-[9px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>8 marketplace outputs</div>
                  </div>
                  <span className="rounded-md px-2 py-1 text-[9px] font-semibold uppercase" style={{ background: '#e8f7ed', color: '#137a3a' }}>184 ready</span>
                </div>
                <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.7fr] border-b px-3.5 py-2 text-[8px] uppercase" style={{ borderColor: '#e2e9e5', color: L_MUTED, fontFamily: M }}>
                  <span>Platform</span><span>Rows</span><span>Review</span><span className="text-right">Status</span>
                </div>
                {platforms.map((row, index) => (
                  <div key={row[0]} className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.7fr] items-center border-b px-3.5 py-3 text-[10px] last:border-b-0 sm:text-[11px]" style={{ borderColor: '#e2e9e5', background: activeStep === 2 && index === 2 ? '#fff8ea' : '#fff' }}>
                    <span className="font-semibold" style={{ color: L_TEXT }}>{row[0]}</span>
                    <span style={{ color: '#137a3a' }}>{row[1]}</span>
                    <span style={{ color: row[2] === '0 review' ? L_MUTED : '#9a6500' }}>{row[2]}</span>
                    <span className="text-right font-semibold" style={{ color: row[3] === 'Ready' ? '#137a3a' : '#9a6500' }}>{row[3]}</span>
                  </div>
                ))}
              </section>

              <section className="rounded-lg border bg-white p-3.5" style={{ borderColor: '#d8e2dd' }}>
                <div className="text-[9px] font-semibold uppercase" style={{ color: ACCENT, fontFamily: M }}>Current run</div>
                <div className="mt-2 text-[17px] font-semibold leading-snug" style={{ color: L_TEXT }}>{stages[activeStep].detail}</div>
                <div className="mt-4 space-y-2">
                  {[
                    ['Supplier PI', 'Synced'],
                    ['Product images', activeStep > 0 ? '184 matched' : 'Queued'],
                    ['Channel templates', activeStep > 1 ? 'Checked' : 'Waiting'],
                    ['Review workbook', activeStep === 3 ? 'Ready' : 'Preparing'],
                  ].map(([label, value], index) => (
                    <div key={label} className="flex items-center justify-between gap-3 rounded-md px-2.5 py-2" style={{ background: index <= activeStep ? '#edf8f5' : '#f5f7f6' }}>
                      <span className="truncate text-[10px]" style={{ color: L_TEXT }}>{label}</span>
                      <span className="shrink-0 text-[9px] font-semibold uppercase" style={{ color: index <= activeStep ? ACCENT : L_MUTED, fontFamily: M }}>{value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 rounded-lg border p-3" style={{ borderColor: '#bde5dc', background: '#f1faf8' }}>
                  <div className="flex items-center gap-2 text-[9px] font-semibold uppercase" style={{ color: ACCENT, fontFamily: M }}><SparkIcon /> Next action</div>
                  <p className="mt-1.5 text-[11px] leading-relaxed" style={{ color: L_MUTED }}>{activeStep < 2 ? 'Amplify is preparing the review queue.' : activeStep === 2 ? 'Confirm four Centrepoint material fields.' : 'Approved marketplace files are ready.'}</p>
                </div>
              </section>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {filmPhase >= 2 && filmPhase < 4 && (
              <m.div
                key="company-brain-film"
                className="absolute inset-0 z-20 flex flex-col bg-[#eef3f1]"
                initial={{ opacity: 0, x: 70, scale: 0.985 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 42, scale: 0.99 }}
                transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex min-h-[54px] items-center justify-between border-b bg-[#f8fbf9] px-4 sm:px-5" style={{ borderColor: '#dce5e0' }}>
                  <div className="text-[11px]" style={{ color: L_MUTED }}><span className="font-semibold" style={{ color: L_TEXT }}>Company Brain</span> / Operator chat</div>
                  <div className="flex items-center gap-2 text-[9px] uppercase" style={{ color: ACCENT, fontFamily: M }}><span className="h-2 w-2 rounded-full" style={{ background: SIGNAL }} />Live data</div>
                </div>

                <div className="grid min-h-0 flex-1 gap-3 p-3 sm:p-4 lg:grid-cols-[0.78fr_1.22fr]">
                  <section className="flex min-h-[250px] flex-col rounded-lg border bg-white" style={{ borderColor: '#d8e2dd' }}>
                    <div className="border-b px-3.5 py-3" style={{ borderColor: '#e2e9e5' }}>
                      <div className="text-[9px] uppercase" style={{ color: ACCENT, fontFamily: M }}>Ask Amplify</div>
                      <div className="mt-1 text-[14px] font-semibold" style={{ color: L_TEXT }}>Retail analysis chat</div>
                    </div>
                    <div className="flex flex-1 flex-col justify-end gap-2.5 p-3.5">
                      {filmPhase === 3 && (
                        <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="ml-auto max-w-[92%] rounded-lg px-3 py-2.5 text-[11px] leading-relaxed text-white" style={{ background: ACCENT }}>
                          {brainQuery}
                        </m.div>
                      )}
                      {filmPhase === 3 && (
                        <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="max-w-[94%] rounded-lg border bg-[#f8fbf9] px-3 py-2.5 text-[11px] leading-relaxed" style={{ borderColor: '#d8e2dd', color: L_TEXT }}>
                          Amazon grew 18%. Hero boots converted better, stock stayed available, and returns held flat.
                        </m.div>
                      )}
                      <div className="mt-1 rounded-lg border bg-white p-3" style={{ borderColor: filmPhase === 2 ? '#79bdb1' : '#d8e2dd', boxShadow: filmPhase === 2 ? '0 0 0 3px rgba(24,115,106,0.08)' : 'none' }}>
                        <div className="min-h-[38px] text-[11px] leading-relaxed" style={{ color: typedChars ? L_TEXT : L_MUTED }}>
                          {filmPhase === 2 ? brainQuery.slice(0, typedChars) : 'Ask about sales, stock, returns, or margin'}
                          {filmPhase === 2 && <m.span className="ml-0.5 inline-block h-3 w-px align-middle" animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ background: ACCENT }} />}
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-[8px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>45K sales rows connected</span>
                          <m.span animate={filmPhase === 2 && typedChars === brainQuery.length ? { scale: [1, 1.08, 1] } : { scale: 1 }} className="rounded-md px-2.5 py-1.5 text-[8px] font-bold uppercase text-white" style={{ background: ACCENT, fontFamily: M }}>Run analysis</m.span>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="min-h-[250px] rounded-lg border bg-white p-3.5" style={{ borderColor: '#d8e2dd' }}>
                    <AnimatePresence mode="wait">
                      {filmPhase === 2 ? (
                        <m.div key="analysis-loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full min-h-[240px] flex-col justify-center">
                          <div className="text-[9px] uppercase" style={{ color: ACCENT, fontFamily: M }}>Company Brain is working</div>
                          <h3 className="mt-2 text-[20px] font-semibold" style={{ color: L_TEXT }}>Joining sales, stock, and returns.</h3>
                          <div className="mt-5 space-y-2.5">
                            {[82, 64, 91].map((width, index) => <div key={width} className="h-9 overflow-hidden rounded-md bg-[#edf3f0]"><m.div className="h-full" initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ repeat: Infinity, duration: 1.4, delay: index * 0.16 }} style={{ width: `${width}%`, background: 'linear-gradient(90deg, transparent, rgba(24,115,106,0.12), transparent)' }} /></div>)}
                          </div>
                          <div className="mt-4 flex items-center gap-2 text-[9px] uppercase" style={{ color: L_MUTED, fontFamily: M }}><span className="h-2 w-2 rounded-full" style={{ background: SIGNAL }} />Checking channel movement</div>
                        </m.div>
                      ) : (
                        <m.div key="analysis-result" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.62 }}>
                          <div className="flex items-start justify-between gap-3"><div><div className="text-[9px] uppercase" style={{ color: ACCENT, fontFamily: M }}>Movement drivers</div><h3 className="mt-1 text-[19px] font-semibold" style={{ color: L_TEXT }}>Amazon footwear sales +18%</h3></div><span className="rounded-md px-2 py-1 text-[8px] font-bold uppercase" style={{ background: '#e8f7ed', color: '#137a3a', fontFamily: M }}>Answered</span></div>
                          <div className="mt-3 grid grid-cols-3 gap-2">
                            {[['+24%', 'hero boots'], ['98%', 'in stock'], ['Flat', 'returns']].map(([value, label], index) => <m.div key={label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 + index * 0.1 }} className="rounded-lg border bg-[#f8fbf9] p-2.5" style={{ borderColor: '#d8e2dd' }}><div className="text-[17px] font-semibold" style={{ color: L_TEXT }}>{value}</div><div className="mt-1 text-[8px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>{label}</div></m.div>)}
                          </div>
                          <div className="mt-3 rounded-lg border p-3" style={{ borderColor: '#d8e2dd', background: '#f8fbf9' }}>
                            <div className="flex h-[72px] items-end gap-2">
                              {[36, 44, 40, 55, 68, 82].map((height, index) => <m.span key={height} className="flex-1 rounded-t-sm" initial={{ height: 4 }} animate={{ height }} transition={{ delay: 0.28 + index * 0.08, duration: 0.55 }} style={{ background: index === 5 ? SIGNAL : '#87bdb3' }} />)}
                            </div>
                          </div>
                          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }} className="mt-3 rounded-lg border p-3" style={{ borderColor: '#9bd9cd', background: '#edf8f5' }}>
                            <div className="text-[8px] uppercase" style={{ color: ACCENT, fontFamily: M }}>Recommended action</div>
                            <div className="mt-1 text-[11px] font-semibold" style={{ color: L_TEXT }}>Keep price steady and move stock toward Amazon.</div>
                            <div className="mt-2 flex gap-2"><span className="rounded-md bg-white px-2 py-1 text-[8px]" style={{ color: ACCENT, fontFamily: M }}>Evidence attached</span><span className="rounded-md px-2 py-1 text-[8px] text-white" style={{ background: ACCENT, fontFamily: M }}>Send to sales agent</span></div>
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
                className="absolute inset-0 z-20 flex flex-col bg-[#eef3f1]"
                initial={{ opacity: 0, x: 70, scale: 0.985 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 42, scale: 0.99 }}
                transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex min-h-[54px] items-center justify-between border-b bg-[#f8fbf9] px-4 sm:px-5" style={{ borderColor: '#dce5e0' }}>
                  <div className="text-[11px]" style={{ color: L_MUTED }}><span className="font-semibold" style={{ color: L_TEXT }}>Listing Ops</span> / Publish everywhere</div>
                  <m.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="flex items-center gap-2 text-[9px] font-semibold uppercase" style={{ color: '#137a3a', fontFamily: M }}><span className="grid h-4 w-4 place-items-center rounded-full bg-[#dff4e6]">✓</span>Approval complete</m.div>
                </div>

                <div className="grid min-h-0 flex-1 content-start gap-3 p-3 sm:p-4 lg:grid-cols-[0.82fr_1.18fr] lg:content-stretch">
                  <section className="relative min-h-[170px] overflow-hidden rounded-lg border bg-white p-3 sm:min-h-[220px] sm:p-3.5" style={{ borderColor: '#d8e2dd' }}>
                    <div className="text-[9px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>Before Amplify</div>
                    <h3 className="mt-1 text-[14px] font-semibold sm:text-[17px]" style={{ color: L_TEXT }}>Workbook handoffs, every week</h3>
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
                          className="absolute inset-x-1 flex h-8 items-center justify-between rounded-md border bg-[#fbfcfb] px-2 shadow-sm sm:inset-x-3 sm:h-11 sm:px-3"
                          style={{ borderColor: '#d8e2dd' }}
                        >
                          <span className="flex min-w-0 items-center gap-2 text-[8px] sm:text-[10px]" style={{ color: L_TEXT, fontFamily: M }}><span className="grid h-5 w-5 shrink-0 place-items-center rounded bg-[#e8f2ed] text-[7px] font-bold sm:h-6 sm:w-6 sm:text-[8px]" style={{ color: ACCENT }}>XLS</span><span className="truncate">{String(name)}</span></span>
                          <span className="h-2 w-2 rounded-full bg-[#e6a43b]" />
                        </m.div>
                      ))}
                    </div>
                    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.18 }} className="mt-2 flex items-center justify-between rounded-lg border px-3 py-2 sm:mt-3 sm:py-2.5" style={{ borderColor: '#d8e2dd', background: '#f8fbf9' }}>
                      <span className="text-[10px] font-semibold" style={{ color: L_TEXT }}>11 file handoffs</span>
                      <span className="text-[8px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>Manual upkeep</span>
                    </m.div>
                  </section>

                  <section className="flex min-h-[270px] flex-col rounded-lg border bg-white p-3 sm:min-h-[280px] sm:p-3.5" style={{ borderColor: '#d8e2dd' }}>
                    <div className="flex items-start justify-between gap-3">
                      <div><div className="text-[9px] uppercase" style={{ color: ACCENT, fontFamily: M }}>One approved publish</div><h3 className="mt-1 text-[17px] font-semibold" style={{ color: L_TEXT }}>184 products, all channels</h3></div>
                      <m.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.25 }} className="shrink-0 rounded-md px-2.5 py-2 text-[8px] font-bold uppercase text-white" style={{ background: ACCENT, fontFamily: M }}>Publish 184</m.span>
                    </div>

                    <div className="relative my-3 h-1 overflow-hidden rounded-full bg-[#e6eeea]">
                      <m.div className="absolute inset-y-0 left-0 rounded-full" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ delay: 1.4, duration: 1.75, ease: [0.22, 1, 0.36, 1] }} style={{ background: ACCENT }} />
                    </div>

                    <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3">
                      {[
                        { name: 'Amazon', src: '/logos/platforms/amazon.svg', status: 'Live' },
                        { name: 'Shopify', src: '/logos/platforms/shopify.svg', status: 'Synced' },
                        { name: 'Best Buy', mark: 'BEST BUY', status: 'Live', tone: '#fff200' },
                        { name: 'Walmart', mark: 'Walmart ✦', status: 'Live', tone: '#eaf4ff' },
                        { name: 'Noon', src: '/logos/platforms/noon.svg', status: 'Synced' },
                        { name: 'Namshi', mark: 'namshi', status: 'Ready', tone: '#f3f5f4' },
                      ].map((channel, index) => (
                        <m.div key={channel.name} initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 2.05 + index * 0.26, duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="flex min-h-[52px] flex-col justify-between rounded-lg border p-2 sm:min-h-[70px] sm:p-2.5" style={{ borderColor: '#d8e2dd', background: '#fbfcfb' }}>
                          <div className="flex h-7 items-center">
                            {channel.src ? <img src={channel.src} alt={channel.name} className="max-h-6 max-w-[78px] object-contain object-left" /> : <span className="rounded px-1.5 py-1 text-[9px] font-extrabold" style={{ color: channel.name === 'Walmart' ? '#0874c9' : L_TEXT, background: channel.tone, fontFamily: channel.name === 'Namshi' ? D : M }}>{channel.mark}</span>}
                          </div>
                          <div className="flex items-center justify-between gap-2"><span className="text-[8px]" style={{ color: L_MUTED }}>{channel.name}</span><span className="flex items-center gap-1 text-[7px] font-bold uppercase" style={{ color: '#137a3a', fontFamily: M }}><span className="h-1.5 w-1.5 rounded-full bg-[#2c9a68]" />{channel.status}</span></div>
                        </m.div>
                      ))}
                    </div>

                    <m.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.9, duration: 0.55 }} className="mt-3 flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5" style={{ borderColor: '#9bd9cd', background: '#edf8f5' }}>
                      <div><div className="text-[9px] font-semibold" style={{ color: L_TEXT }}>Published once. Maintained continuously.</div><div className="mt-0.5 text-[8px]" style={{ color: L_MUTED }}>Listings, price, stock, and availability stay in sync.</div></div>
                      <m.span animate={{ opacity: [0.35, 1, 0.35] }} transition={{ repeat: Infinity, duration: 1.8 }} className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: SIGNAL }} />
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

function ProductFlowWorkbench() {
  const [active, setActive] = useState(PRODUCT_FLOW_TABS[0].id)
  const flow = PRODUCT_FLOW_TABS.find((item) => item.id === active) || PRODUCT_FLOW_TABS[0]

  useEffect(() => {
    const setFlowFromHash = () => {
      const requested = window.location.hash.replace('#use-', '')
      if (PRODUCT_FLOW_TABS.some((item) => item.id === requested)) {
        setActive(requested)
      }
    }

    setFlowFromHash()
    window.addEventListener('hashchange', setFlowFromHash)
    return () => window.removeEventListener('hashchange', setFlowFromHash)
  }, [])

  const selectFlow = (id: string) => {
    setActive(id)
    window.history.replaceState(null, '', `#use-${id}`)
  }

  const badge = (label: string, tone: 'ready' | 'warn' | 'blocked' | 'neutral' = 'neutral') => {
    const styles = {
      ready: { background: '#e8f7ed', color: '#137a3a', borderColor: '#bfe7cd' },
      warn: { background: '#fff7db', color: '#9a6500', borderColor: '#ecd48a' },
      blocked: { background: '#fff0ef', color: '#b53a32', borderColor: '#efc5c0' },
      neutral: { background: '#f3f5ef', color: '#646b5d', borderColor: '#e2e8da' },
    }[tone]

    return (
      <span key={label} className="inline-flex items-center rounded-md border px-2 py-1 text-[10px] font-semibold uppercase" style={{ ...styles, fontFamily: M }}>
        {label}
      </span>
    )
  }

  const metric = (value: string, label: string, tone: 'dark' | 'light' = 'light') => (
    <div className="rounded-lg border p-3" style={{ borderColor: tone === 'dark' ? 'rgba(255,255,255,0.12)' : L_BORDER, background: tone === 'dark' ? 'rgba(255,255,255,0.05)' : '#fff' }}>
      <div className="text-[24px] font-semibold leading-none" style={{ color: tone === 'dark' ? '#fff' : L_TEXT, fontFamily: D }}>{value}</div>
      <div className="mt-1 text-[10px] uppercase" style={{ color: tone === 'dark' ? MUTED : L_MUTED, fontFamily: M }}>{label}</div>
    </div>
  )

  const sourceFiles = ['master_item_sheet.xlsx', 'stock_snapshot.csv', 'confirmed_sales.xlsx', 'namshi_template.xlsx']

  const renderListingOps = () => (
    <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-lg border bg-white p-4" style={{ borderColor: L_BORDER }}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase" style={{ color: '#1D7A6D', fontFamily: M }}>Template Generator</div>
            <h3 className="mt-1 text-[24px] font-semibold leading-tight" style={{ color: L_TEXT, fontFamily: D }}>Centrepoint UAE output</h3>
          </div>
          {badge('export ready', 'ready')}
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {metric('184', 'rows')}
          {metric('37', 'fields')}
          {metric('4', 'review')}
        </div>
        <div className="mt-4 overflow-hidden rounded-lg border" style={{ borderColor: L_BORDER }}>
          {[
            ['Product image', 'ImgBB album', '184 matched', 'ready'],
            ['Closure', 'image review', 'lace-up', 'ready'],
            ['Material', 'master sheet', 'needs check', 'warn'],
            ['Target price', 'pricing sheet', 'manager approval', 'blocked'],
          ].map(([field, source, value, tone]) => (
            <div key={field} className="grid grid-cols-12 gap-3 border-b px-3 py-3 text-[12px] last:border-b-0" style={{ borderColor: L_BORDER }}>
              <span className="col-span-4 font-semibold" style={{ color: L_TEXT }}>{field}</span>
              <span className="col-span-3 truncate" style={{ color: L_MUTED }}>{source}</span>
              <span className="col-span-3 truncate" style={{ color: L_TEXT }}>{value}</span>
              <span className="col-span-2 text-right">{badge(tone === 'ready' ? 'ready' : tone === 'warn' ? 'review' : 'blocked', tone as 'ready' | 'warn' | 'blocked')}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border bg-white p-4" style={{ borderColor: L_BORDER }}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>Workbook preview</div>
            <h3 className="mt-1 text-[20px] font-semibold" style={{ color: L_TEXT, fontFamily: D }}>Generated rows before export</h3>
          </div>
          <div className="flex gap-1 rounded-md border bg-[#f7faf6] p-1" style={{ borderColor: L_BORDER }}>
            {['Centrepoint', 'Namshi', '6th Street'].map((item, index) => (
              <span key={item} className="rounded px-2 py-1 text-[10px] font-semibold" style={{ background: index === 0 ? '#1D7A6D' : 'transparent', color: index === 0 ? '#fff' : L_MUTED, fontFamily: M }}>{item}</span>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border" style={{ borderColor: L_BORDER }}>
          {[
            ['BR-772104-CAF', 'Leather Lace-Up Boot', '5 images', 'Ready'],
            ['BR-9011-CRM', 'Carryover Sandal', '3 images', 'Ready'],
            ['BR-772105-PRE', 'Patent Mary Jane', 'price approval', 'Review'],
            ['BR-772106-NDE', 'Comfort Mule', 'material check', 'Review'],
          ].map((row, index) => (
            <div key={row[0]} className="grid grid-cols-12 gap-3 border-b px-3 py-3 text-[12px] last:border-b-0" style={{ borderColor: L_BORDER, background: index === 0 ? '#f4faef' : '#fff' }}>
              <span className="col-span-3 truncate font-semibold" style={{ color: L_TEXT }}>{row[0]}</span>
              <span className="col-span-4 truncate" style={{ color: L_TEXT }}>{row[1]}</span>
              <span className="col-span-3 truncate" style={{ color: L_MUTED }}>{row[2]}</span>
              <span className="col-span-2 text-right">{badge(row[3], row[3] === 'Ready' ? 'ready' : 'warn')}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border p-3" style={{ borderColor: '#cfe4dc', background: '#f7fbfa' }}>
          <div className="text-[10px] uppercase" style={{ color: '#1D7A6D', fontFamily: M }}>Operator command</div>
          <div className="mt-1 text-[14px] font-semibold" style={{ color: L_TEXT, fontFamily: D }}>Generate review workbook for blocked price and material fields.</div>
        </div>
      </section>
    </div>
  )

  const renderCompanyBrain = () => (
    <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
      <section className="rounded-lg border bg-white p-4" style={{ borderColor: L_BORDER }}>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase" style={{ color: '#1D7A6D', fontFamily: M }}>Company Brain</div>
            <h3 className="mt-1 text-[24px] font-semibold leading-tight" style={{ color: L_TEXT, fontFamily: D }}>Retail planning snapshot</h3>
          </div>
          {badge('run complete', 'ready')}
        </div>
        <div className="grid gap-2 sm:grid-cols-4">
          {metric('45K', 'sales rows')}
          {metric('7', 'source files')}
          {metric('90', 'agent recs')}
          {metric('82', 'health')}
        </div>
        <div className="mt-4 rounded-lg border p-4" style={{ borderColor: L_BORDER, background: '#fbfcf8' }}>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>MIS view</span>
            <span className="text-[10px] uppercase" style={{ color: '#1D7A6D', fontFamily: M }}>brand x channel</span>
          </div>
          <svg viewBox="0 0 460 150" className="h-[150px] w-full" aria-hidden="true">
            {[0, 1, 2, 3].map((line) => <line key={line} x1="0" x2="460" y1={24 + line * 32} y2={24 + line * 32} stroke="rgba(0,0,0,0.08)" />)}
            <path d="M18 114 L104 94 L190 102 L276 70 L362 48 L442 35" fill="none" stroke="#1D7A6D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18 114 L104 94 L190 102 L276 70 L362 48 L442 35 L442 138 L18 138 Z" fill="rgba(29,122,109,0.12)" />
            {[18, 104, 190, 276, 362, 442].map((x, index) => <circle key={x} cx={x} cy={[114, 94, 102, 70, 48, 35][index]} r="5" fill={SIGNAL} stroke={ACCENT} strokeWidth="2" />)}
          </svg>
        </div>
      </section>

      <section className="rounded-lg border bg-white p-4" style={{ borderColor: L_BORDER }}>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>Action queue</div>
            <h3 className="mt-1 text-[20px] font-semibold" style={{ color: L_TEXT, fontFamily: D }}>What the team should review</h3>
          </div>
          {badge('approval gated', 'neutral')}
        </div>
        <div className="space-y-3">
          {[
            ['Save SKU and barcode join memory', 'Sales, stock, and listing files now share stable product identity.', 'Ready'],
            ['Review pricing wave for UAE', 'Top sellers do not need markdown; slower color needs bundle test.', 'Review'],
            ['Unblock supplier stock sync', 'Stock slice can publish after supplier policy is confirmed.', 'Open'],
            ['Send listing fixes to approvals', '12 SKUs need fit copy and material confirmation.', 'Ready'],
          ].map((item) => (
            <div key={item[0]} className="rounded-lg border p-3" style={{ borderColor: L_BORDER, background: item[2] === 'Ready' ? '#f4faef' : '#fff' }}>
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-[14px] font-semibold" style={{ color: L_TEXT, fontFamily: D }}>{item[0]}</h4>
                {badge(item[2], item[2] === 'Ready' ? 'ready' : item[2] === 'Review' ? 'warn' : 'neutral')}
              </div>
              <p className="mt-1 text-[12px] leading-[1.5]" style={{ color: L_MUTED }}>{item[1]}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )

  const renderInventory = () => (
    <div className="grid gap-4 xl:grid-cols-[1fr_0.82fr]">
      <section className="rounded-lg border bg-white p-4" style={{ borderColor: L_BORDER }}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase" style={{ color: '#1D7A6D', fontFamily: M }}>Inventory ledger</div>
            <h3 className="mt-1 text-[24px] font-semibold" style={{ color: L_TEXT, fontFamily: D }}>Positions by channel and SKU</h3>
          </div>
          {badge('synced 4 min ago', 'ready')}
        </div>
        <div className="grid gap-2 sm:grid-cols-4">
          {metric('8', 'channels')}
          {metric('1,240', 'units to buy')}
          {metric('18', 'days cover')}
          {metric('42K', 'PO draft')}
        </div>
        <div className="mt-4 overflow-hidden rounded-lg border" style={{ borderColor: L_BORDER }}>
          {[
            ['BR-772104-CAF', 'Amazon', 'low', '320 buy'],
            ['BR-9011-CRM', 'Noon', 'in stock', 'hold'],
            ['PMUK-GUSTO-120', 'Shopify', 'low', 'bundle SKU'],
            ['SM-TRAIN-001', 'Retail', 'ready', 'training pack'],
          ].map((row, index) => (
            <div key={`${row[0]}-${row[1]}`} className="grid grid-cols-12 gap-3 border-b px-3 py-3 text-[12px] last:border-b-0" style={{ borderColor: L_BORDER, background: index === 0 ? '#fffaf0' : '#fff' }}>
              <span className="col-span-4 truncate font-semibold" style={{ color: L_TEXT }}>{row[0]}</span>
              <span className="col-span-2" style={{ color: L_MUTED }}>{row[1]}</span>
              <span className="col-span-3">{badge(row[2], row[2] === 'low' ? 'warn' : 'ready')}</span>
              <span className="col-span-3 text-right font-semibold" style={{ color: L_TEXT }}>{row[3]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border bg-white p-4" style={{ borderColor: L_BORDER }}>
        <div className="mb-4">
          <div className="text-[10px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>Inventory Agent</div>
          <h3 className="mt-1 text-[20px] font-semibold" style={{ color: L_TEXT, fontFamily: D }}>Suggested actions</h3>
        </div>
        <div className="space-y-3">
          {[
            ['Reorder carryover boots', '320 units, 21 day lead time', 'Approve'],
            ['Hold slow color', 'size curve under target', 'Hold'],
            ['Generate PO draft', 'AED 42K to Beira Rio', 'Review'],
            ['Push channel stock', 'single pool with caps', 'Ready'],
          ].map((item) => (
            <div key={item[0]} className="rounded-lg border p-3" style={{ borderColor: L_BORDER, background: item[2] === 'Approve' ? '#f4faef' : '#fff' }}>
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-[14px] font-semibold" style={{ color: L_TEXT, fontFamily: D }}>{item[0]}</h4>
                {badge(item[2], item[2] === 'Approve' || item[2] === 'Ready' ? 'ready' : item[2] === 'Review' ? 'warn' : 'neutral')}
              </div>
              <p className="mt-1 text-[12px]" style={{ color: L_MUTED }}>{item[1]}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )

  const renderApprovals = () => (
    <div className="grid gap-4 xl:grid-cols-[0.82fr_1.18fr]">
      <section className="rounded-lg border bg-white p-4" style={{ borderColor: L_BORDER }}>
        <div className="mb-4">
          <div className="text-[10px] uppercase" style={{ color: '#1D7A6D', fontFamily: M }}>Approval inbox</div>
          <h3 className="mt-1 text-[24px] font-semibold" style={{ color: L_TEXT, fontFamily: D }}>Nothing writes live without review.</h3>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {metric('17', 'needs review')}
          {metric('12', 'listing blockers')}
          {metric('3', 'pricing blockers')}
          {metric('2', 'PO drafts')}
        </div>
        <div className="mt-4 rounded-lg border p-3" style={{ borderColor: '#cfe4dc', background: '#f7fbfa' }}>
          <div className="text-[10px] uppercase" style={{ color: '#1D7A6D', fontFamily: M }}>Policy</div>
          <p className="mt-1 text-[13px] leading-[1.55]" style={{ color: L_TEXT }}>Agents can prepare files, recommendations, and API payloads, but approvals stay with the operator.</p>
        </div>
      </section>

      <section className="rounded-lg border bg-white p-4" style={{ borderColor: L_BORDER }}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[20px] font-semibold" style={{ color: L_TEXT, fontFamily: D }}>Pending decisions</h3>
          {badge('seeded demo', 'neutral')}
        </div>
        <div className="space-y-3">
          {[
            ['Listing repair', 'BR-772105-PRE', 'Approve target price before Centrepoint export.', 'Approve'],
            ['Pricing exception', 'BR-9011-CRM', 'Keep price steady; markdown not recommended.', 'Needs info'],
            ['Replenishment RFQ', 'BR-772104-CAF', 'PO draft for 320 units from forecast.', 'Review'],
            ['AI ads action', 'PMUK-GUSTO-120', 'Bundle ad copy and SKU generator output ready.', 'Approve'],
          ].map((item) => (
            <div key={`${item[0]}-${item[1]}`} className="rounded-lg border p-3" style={{ borderColor: L_BORDER }}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>{item[0]}</div>
                  <h4 className="mt-1 text-[14px] font-semibold" style={{ color: L_TEXT, fontFamily: D }}>{item[1]}</h4>
                  <p className="mt-1 text-[12px] leading-[1.45]" style={{ color: L_MUTED }}>{item[2]}</p>
                </div>
                <div className="flex gap-2">
                  {badge(item[3], item[3] === 'Approve' ? 'ready' : item[3] === 'Review' ? 'warn' : 'neutral')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )

  return (
    <div className="overflow-hidden rounded-xl border" style={{ borderColor: L_BORDER, background: '#eef3f1', boxShadow: '0 28px 84px rgba(15,31,28,0.14)' }}>
      <div className="flex items-center justify-between gap-4 border-b px-4 py-3" style={{ borderColor: L_BORDER, background: '#0d0f0c' }}>
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="hidden min-w-0 rounded-md border px-3 py-1.5 text-[11px] sm:block" style={{ borderColor: 'rgba(255,255,255,0.12)', color: MUTED, fontFamily: M }}>
            app.use-amplify.com/geoomnii/{flow.label.toLowerCase().replaceAll(' ', '-')}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {badge('seeded workspace', 'neutral')}
          <button type="button" className="rounded-md px-3 py-1.5 text-[10px] font-bold uppercase text-white" style={{ background: ACCENT, fontFamily: M }}>
            Run
          </button>
        </div>
      </div>

      <div className="grid min-h-[640px] lg:grid-cols-[228px_1fr]" style={{ color: L_TEXT }}>
        <aside className="border-b bg-[#f8fbf9] p-4 lg:border-b-0 lg:border-r" style={{ borderColor: L_BORDER }}>
          <div className="mb-5 flex items-center gap-2">
            <Logo size={28} />
            <div>
              <div className="text-[14px] font-semibold" style={{ color: L_TEXT, fontFamily: D }}>Amplify</div>
              <div className="text-[10px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>Geoomnii workspace</div>
            </div>
          </div>
          <div className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
            {PRODUCT_FLOW_TABS.map((item) => {
              const selected = item.id === active
              return (
                <button
                  key={item.id}
                  id={`use-${item.id}`}
                  type="button"
                  onClick={() => selectFlow(item.id)}
                  className="rounded-lg border px-3 py-3 text-left transition-colors"
                  style={{ borderColor: selected ? '#9bd9cd' : 'transparent', background: selected ? '#eaf8f5' : 'transparent' }}
                >
                  <div className="text-[10px] uppercase" style={{ color: selected ? '#1D7A6D' : L_MUTED, fontFamily: M }}>{item.eyebrow}</div>
                  <div className="mt-1 text-[14px] font-semibold" style={{ color: L_TEXT, fontFamily: D }}>{item.label}</div>
                </button>
              )
            })}
          </div>
          <div className="mt-5 hidden rounded-lg border bg-white p-3 lg:block" style={{ borderColor: L_BORDER }}>
            <div className="mb-2 text-[10px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>Connected sources</div>
            <div className="space-y-1.5">
              {sourceFiles.map((file) => (
                <div key={file} className="truncate rounded-md bg-[#f3f6f0] px-2 py-1.5 text-[11px]" style={{ color: L_MUTED, fontFamily: M }}>{file}</div>
              ))}
            </div>
          </div>
        </aside>

        <div className="min-w-0 bg-[#eef3f1]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-white px-4 py-3 sm:px-5" style={{ borderColor: L_BORDER }}>
            <div>
              <div className="text-[10px] uppercase" style={{ color: '#1D7A6D', fontFamily: M }}>{flow.eyebrow}</div>
              <h3 className="text-[22px] font-semibold leading-tight" style={{ color: L_TEXT, fontFamily: D }}>{flow.label}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Logic ERP', 'Supplier PI', 'Marketplace XLSX', 'Approval logs'].map((item) => badge(item, 'neutral'))}
            </div>
          </div>

          <div className="p-4 sm:p-5">
            {active === 'listings' && renderListingOps()}
            {active === 'brain' && renderCompanyBrain()}
            {active === 'forecast' && renderInventory()}
            {active === 'actions' && renderApprovals()}
          </div>
        </div>
      </div>
    </div>
  )
}

function EnrichmentSlider() {
  const [position, setPosition] = useState(45)
  const renderBeforeValue = (row: (typeof ENRICHMENT_ROWS)[number]) => {
    if ('kind' in row && row.kind === 'image') {
      return (
        <div className="space-y-1.5">
          {row.before.split('\n').map((url) => (
            <div key={url} className="truncate rounded-md border px-2 py-2 text-[11px]" style={{ borderColor: L_BORDER, background: '#f7f8f4', color: L_MUTED, fontFamily: M }}>
              {url}
            </div>
          ))}
        </div>
      )
    }

    return <div className="min-h-[38px] text-[13px] font-semibold" style={{ color: row.before === '-' ? '#b34a4a' : L_TEXT, fontFamily: D }}>{row.before}</div>
  }

  const renderAfterValue = (row: (typeof ENRICHMENT_ROWS)[number]) => {
    if ('kind' in row && row.kind === 'image') {
      return (
        <div className="grid grid-cols-[76px_1fr] gap-3">
          <div className="relative aspect-square overflow-hidden rounded-md bg-white">
            <img src={row.after} alt="Enhanced product asset" className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-semibold leading-snug" style={{ color: L_TEXT, fontFamily: D }}>Selected hero image</div>
            <div className="mt-1 text-[11px] leading-snug" style={{ color: L_MUTED }}>Background checked, sharpened, and attached to the SKU.</div>
          </div>
        </div>
      )
    }

    return <div className="min-h-[38px] text-[13px] font-semibold" style={{ color: L_TEXT, fontFamily: D }}>{row.after}</div>
  }

  return (
    <div className="mx-auto max-w-[1080px] rounded-lg border bg-white p-3 sm:p-4" style={{ borderColor: L_BORDER, boxShadow: '0 26px 80px rgba(0,0,0,0.1)' }}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-1">
        <div>
          <div className="text-[10px] uppercase" style={{ color: ACCENT, fontFamily: M }}>Drag to compare</div>
          <h3 className="mt-1 text-[22px] font-semibold" style={{ color: L_TEXT, fontFamily: D }}>SKU record before and after enrichment</h3>
        </div>
        <span className="rounded-md px-2.5 py-1 text-[10px] font-bold uppercase" style={{ background: DARK, color: SIGNAL, fontFamily: M }}>
          Slide to compare
        </span>
      </div>

      <div className="relative overflow-hidden rounded-lg border" style={{ borderColor: L_BORDER, background: L_SURFACE }}>
        <div className="relative min-h-[640px] overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-2">
              <div className="p-4 sm:p-5">
                <div className="mb-3 text-[10px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>Before</div>
                <div className="space-y-2">
                  {ENRICHMENT_ROWS.map((row) => (
                    <div key={row.field} className="rounded-lg border bg-white p-3" style={{ borderColor: L_BORDER }}>
                      <div className="mb-1 text-[10px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>{row.field}</div>
                      {renderBeforeValue(row)}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <div className="mb-3 text-[10px] uppercase" style={{ color: ACCENT, fontFamily: M }}>After</div>
                <div className="space-y-2">
                  {ENRICHMENT_ROWS.map((row) => (
                    <div key={row.field} className="rounded-lg border p-3" style={{ borderColor: '#bde5dc', background: '#edf8f5' }}>
                      <div className="mb-1 text-[10px] uppercase" style={{ color: ACCENT, fontFamily: M }}>{row.field}</div>
                      {renderAfterValue(row)}
                      <div className="mt-2 text-[11px] leading-snug" style={{ color: L_MUTED }}>{row.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}>
              <div className="h-full bg-white" style={{ width: 'calc(100vw + 900px)' }}>
                <div className="w-full p-4 sm:p-5" style={{ maxWidth: 720 }}>
                  <div className="mb-3 text-[10px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>Before</div>
                  <div className="space-y-2">
                    {ENRICHMENT_ROWS.map((row) => (
                      <div key={row.field} className="rounded-lg border bg-white p-3" style={{ borderColor: L_BORDER }}>
                        <div className="mb-1 text-[10px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>{row.field}</div>
                        {renderBeforeValue(row)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-y-0 z-20 w-px" style={{ left: `${position}%`, background: '#0d1209' }} />
            <div className="absolute top-1/2 z-20 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border bg-white" style={{ left: `clamp(22px, ${position}%, calc(100% - 22px))`, borderColor: L_BORDER, boxShadow: '0 14px 30px rgba(0,0,0,0.18)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m8 7-5 5 5 5" />
                <path d="m16 7 5 5-5 5" />
              </svg>
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

function IntegrationsSection() {
  return (
    <section id="integrations" className="scroll-mt-[96px]" style={{ background: L_BG, borderTop: `1px solid ${L_BORDER}` }}>
      <div className="mx-auto max-w-[1160px] px-5 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto mb-10 max-w-[760px] text-center">
          <SectionLabel label="Integrations" align="center" tone="light" />
          <h2 className="mt-6 text-[clamp(30px,4vw,50px)] font-bold leading-[1.06]" style={{ color: L_TEXT, fontFamily: D }}>
            Keep the stack. Make the work smarter.
          </h2>
          <p className="mx-auto mt-5 max-w-[600px] text-[15px] leading-[1.7]" style={{ color: L_MUTED }}>
            Amplify works with APIs, exports, marketplace templates, supplier files, product images, and approval history.
          </p>
        </div>

        <ConnectedWorkflow />
      </div>
    </section>
  )
}

function CustomerSection() {
  return (
    <section id="customers" className="scroll-mt-[96px]" style={{ background: L_BG, borderTop: `1px solid ${L_BORDER}`, borderBottom: `1px solid ${L_BORDER}` }}>
      <div className="mx-auto max-w-[1160px] px-5 py-14 sm:px-6 sm:py-20">
        <div className="mb-9 grid gap-5 lg:grid-cols-[0.92fr_0.58fr] lg:items-end">
          <div>
            <SectionLabel label="Hear from brands who love it" tone="light" />
            <h2 className="mt-6 max-w-[760px] text-[clamp(34px,5.2vw,64px)] font-bold leading-[1.02]" style={{ color: L_TEXT, fontFamily: D }}>
              Proof from teams moving real inventory.
            </h2>
          </div>
          <p className="text-[15px] leading-[1.75]" style={{ color: L_MUTED }}>
            Three operator stories across catalog, inventory, ads, training, and marketplace outputs.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <article className="relative min-h-[430px] overflow-hidden rounded-lg border p-5 sm:p-6" style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#0f0f0f', boxShadow: '0 20px 60px rgba(0,0,0,0.14)' }}>
            <div className="absolute inset-x-0 top-0 h-[190px] overflow-hidden">
              <img src="/images/products/customer-shoe-boot.jpg" alt="" className="h-full w-full object-cover" style={{ filter: 'saturate(0.86) contrast(0.9) brightness(0.52)' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.18), #0f0f0f)' }} />
            </div>
            <div className="relative flex h-full min-h-[382px] flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-lg bg-white px-3 py-2">
                    <img src="/logos/geoomnii.png" alt="Geoomnii" className="h-7 w-auto object-contain" />
                  </span>
                  <span className="rounded-lg bg-white px-3 py-2">
                    <img src="/logos/beira-rio.png" alt="Beira Rio" className="h-7 w-auto object-contain" />
                  </span>
                </div>
                <div className="mt-6 text-[10px] uppercase" style={{ color: SIGNAL, fontFamily: M }}>Portfolio operations</div>
              </div>
              <div>
                <h3 className="text-[27px] font-semibold leading-[1.12] text-white" style={{ fontFamily: D }}>
                  Catalog, stock, and marketplace files for Beira Rio teams.
                </h3>
                <p className="mt-4 text-[13px] leading-[1.65]" style={{ color: 'rgba(255,255,255,0.68)' }}>
                  Item masters, stock slices, product images, and templates become approved outputs.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['Catalog ops', 'Stock sync', 'Marketplace feeds'].map((item) => (
                    <span key={item} className="rounded-md px-2.5 py-1 text-[10px] font-bold uppercase" style={{ background: SIGNAL, color: DARK, fontFamily: M }}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <article
            className="relative min-h-[430px] overflow-hidden rounded-lg border p-5 sm:p-6"
            style={{
              borderColor: 'rgba(0,0,0,0.1)',
              backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.52), rgba(255,255,255,0.82) 52%, rgba(255,255,255,0.94)), url("/images/customers/pmuk-gusto-hot-sauce.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              boxShadow: '0 22px 62px rgba(120,42,54,0.12)',
            }}
          >
            <div className="relative flex h-full min-h-[382px] flex-col justify-between">
              <div>
                <div className="mb-5 inline-flex rounded-lg px-3 py-2 text-[18px] font-black" style={{ background: 'rgba(255,255,255,0.86)', color: L_TEXT, fontFamily: D, boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}>PMUK</div>
                <div className="mb-5 text-[10px] uppercase" style={{ color: '#8a2d3c', fontFamily: M }}>Gusto food ecommerce ops</div>
                <h3 className="text-[28px] font-semibold leading-[1.08]" style={{ color: L_TEXT, fontFamily: D }}>
                  Inventory, bundle SKUs, and AI ad actions in one queue.
                </h3>
                <p className="mt-4 text-[14px] leading-[1.65]" style={{ color: L_MUTED }}>
                  Stock decisions, bundle SKUs, and ad recommendations stay ready for manager approval.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-8">
                {['Inventory', 'Bundle SKUs', 'AI ads'].map((item) => (
                  <span key={item} className="rounded-md px-2.5 py-1 text-[10px] font-bold uppercase" style={{ background: SIGNAL, color: DARK, fontFamily: M }}>{item}</span>
                ))}
              </div>
            </div>
          </article>

          <article
            className="relative min-h-[430px] overflow-hidden rounded-lg border p-5 sm:p-6"
            style={{
              borderColor: 'rgba(0,0,0,0.12)',
              backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.3) 38%, rgba(0,0,0,0.88)), url("/images/customers/shoemart-interior.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 24px 68px rgba(0,0,0,0.2)',
            }}
          >
            <div className="relative flex h-full min-h-[382px] flex-col justify-between">
              <div>
                <div className="inline-flex rounded-lg px-4 py-2 text-[25px] font-black tracking-[0.2em]" style={{ color: '#fff', fontFamily: D, background: 'rgba(0,0,0,0.46)', boxShadow: '0 14px 36px rgba(0,0,0,0.32)' }}>
                  SHOEMART
                </div>
                <div className="mt-4 text-[10px] uppercase" style={{ color: 'rgba(255,255,255,0.72)', fontFamily: M }}>Retail training enablement</div>
              </div>
              <div>
                <p className="text-[25px] font-semibold leading-[1.14] text-white" style={{ fontFamily: D }}>
                  Product training for Shoe Mart store teams.
                </p>
                <p className="mt-4 text-[13px] leading-[1.65]" style={{ color: 'rgba(255,255,255,0.72)' }}>
                  Launch notes and selling guidance become repeatable tutorials for sales associates.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['Training videos', 'Store teams', 'Launch readiness'].map((item) => (
                    <span key={item} className="rounded-md px-2.5 py-1 text-[10px] font-bold uppercase" style={{ background: SIGNAL, color: DARK, fontFamily: M }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [ctaEmail, setCtaEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [ctaStatus, setCtaStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [ctaMessage, setCtaMessage] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  async function handleSubmit(
    emailValue: string,
    setStatusFn: (status: Status) => void,
    setMessageFn: (message: string) => void,
    clearEmail: () => void,
  ) {
    if (!emailValue.trim()) return
    setStatusFn('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailValue }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatusFn('success')
        setMessageFn(data.message || 'You are on the list.')
        clearEmail()
      } else {
        setStatusFn('error')
        setMessageFn(data.error || 'Something went wrong')
      }
    } catch {
      setStatusFn('error')
      setMessageFn('Something went wrong. Please try again.')
    }
  }

  return (
    <MotionShell>
    <main className="min-h-screen" style={{ background: BASE }}>
      <div className="fixed left-0 right-0 top-0 z-50 flex justify-center px-3 transition-all duration-300" style={{ paddingTop: scrolled ? 8 : 12 }}>
        <nav
          className="flex w-full items-center justify-between rounded-lg transition-all duration-300"
          style={{
            maxWidth: scrolled ? 900 : 1180,
            height: scrolled ? 48 : 58,
            padding: scrolled ? '0 8px 0 16px' : '0 10px 0 18px',
            background: scrolled ? 'rgba(16,22,19,0.9)' : 'rgba(16,22,19,0.82)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 16px 50px rgba(0,0,0,0.28)',
          }}
        >
          <a href="/" className="flex items-center gap-2">
            <Logo size={scrolled ? 23 : 26} />
            <span className="text-[14px] font-semibold text-white" style={{ fontFamily: D }}>Amplify</span>
          </a>
          <div className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.slice(0, 1).map((link) => (
              <a key={link.href} href={link.href} className="text-[12px] transition-colors hover:text-white" style={{ color: SOFT, fontFamily: M }}>
                {link.label}
              </a>
            ))}
            <div className="group relative">
              <button type="button" className="flex items-center gap-1 text-[12px] transition-colors hover:text-white" style={{ color: SOFT, fontFamily: M }}>
                Use cases
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: MUTED }}>
                  <path d="M3 5l3 3 3-3" />
                </svg>
              </button>
              <div className="pointer-events-none absolute left-1/2 top-full z-20 w-[292px] -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                <div className="overflow-hidden rounded-lg border p-2" style={{ background: 'rgba(14,14,14,0.96)', borderColor: BORDER, boxShadow: '0 24px 70px rgba(0,0,0,0.38)', backdropFilter: 'blur(22px)', WebkitBackdropFilter: 'blur(22px)' }}>
                  {USE_CASE_LINKS.map((link) => (
                    <a key={link.href} href={link.href} className="block rounded-md px-3 py-3 transition-colors hover:bg-white/5">
                      <span className="block text-[12px] font-semibold text-white" style={{ fontFamily: D }}>{link.label}</span>
                      <span className="mt-0.5 block text-[10px] uppercase" style={{ color: MUTED, fontFamily: M }}>{link.detail}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            {NAV_LINKS.slice(1).map((link) => (
              <a key={link.href} href={link.href} className="text-[12px] transition-colors hover:text-white" style={{ color: SOFT, fontFamily: M }}>
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a href="#cta" className="hidden h-9 items-center gap-2 rounded-lg px-4 text-[11px] font-bold transition-opacity hover:opacity-90 sm:flex" style={{ background: SIGNAL, color: DARK, fontFamily: M }}>
              GET EARLY ACCESS
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              className="grid h-9 w-9 place-items-center rounded-lg md:hidden"
              style={{ background: 'rgba(255,255,255,0.07)', color: '#fff' }}
              aria-label="Toggle navigation"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                {mobileOpen ? (
                  <>
                    <path d="M4 4l10 10" />
                    <path d="M14 4 4 14" />
                  </>
                ) : (
                  <>
                    <path d="M3 5h12" />
                    <path d="M3 9h12" />
                    <path d="M3 13h12" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button aria-label="Close navigation" className="absolute inset-0 h-full w-full" style={{ background: 'rgba(0,0,0,0.62)', backdropFilter: 'blur(10px)' }} onClick={() => setMobileOpen(false)} />
          <div className="absolute left-3 right-3 top-[72px] rounded-lg border p-3" style={{ background: 'rgba(16,16,16,0.96)', borderColor: BORDER }}>
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-3 text-[14px] text-white" style={{ fontFamily: M }}>
                {link.label}
              </a>
            ))}
            <div className="my-2 h-px" style={{ background: BORDER }} />
            <div className="px-3 pb-1 pt-2 text-[10px] uppercase" style={{ color: MUTED, fontFamily: M }}>Use cases</div>
            {USE_CASE_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-3 text-[14px] text-white" style={{ fontFamily: M }}>
                {link.label}
              </a>
            ))}
            <a href="/audit" onClick={() => setMobileOpen(false)} className="mt-2 block rounded-lg px-3 py-3 text-[14px] font-bold" style={{ background: SIGNAL, color: DARK, fontFamily: M }}>
              Free audit
            </a>
          </div>
        </div>
      )}

      <section className="relative overflow-hidden pt-[116px]" style={{ background: BASE }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(24,115,106,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(24,115,106,0.055) 1px, transparent 1px)', backgroundSize: '56px 56px', maskImage: 'linear-gradient(to bottom, black, transparent 76%)' }} />
        <div className="absolute inset-x-0 top-0 h-[620px] pointer-events-none" style={{ background: 'linear-gradient(140deg, rgba(158,224,120,0.18), transparent 34%, rgba(24,115,106,0.09) 72%, transparent)' }} />
        <div className="relative mx-auto max-w-[1180px] px-5 pb-16 sm:px-6 sm:pb-24">
          <Reveal className="mx-auto max-w-[920px] text-center" y={18}>
            <a href="/audit" className="mb-7 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-lg border bg-white px-3 py-2" style={{ borderColor: '#cfe0d9', boxShadow: '0 10px 32px rgba(15,31,28,0.06)' }}>
              <span className="shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold" style={{ background: SIGNAL, color: DARK, fontFamily: M }}>FREE AUDIT</span>
              <span className="min-w-0 text-[10px] uppercase leading-[1.5] sm:text-[11px]" style={{ color: L_MUTED, fontFamily: M }}>Get quick feedback on any product page</span>
            </a>
            <div className="flex justify-center"><SectionLabel label="Retail operations for brand teams" tone="light" /></div>
            <h1 className="mx-auto mt-6 max-w-[900px] text-[clamp(40px,7vw,78px)] font-bold leading-[1.01]" style={{ color: INK, fontFamily: D }}>
              Retail operations,<br className="hidden sm:block" /> finally in one place.
            </h1>
            <p className="mx-auto mt-6 max-w-[680px] text-[16px] leading-[1.65] sm:text-[18px]" style={{ color: L_MUTED }}>
              Turn product files, sales, and stock into ready listings, clear decisions, and approved actions.
            </p>
            <div className="mx-auto mt-7 max-w-[540px]">
              <WaitlistForm
                email={email}
                setEmail={setEmail}
                status={status}
                message={message}
                tone="light"
                onSubmit={() => handleSubmit(email, setStatus, setMessage, () => setEmail(''))}
              />
            </div>
          </Reveal>

          <ProductStage className="mt-12 sm:mt-14" delay={0.12}>
            <HeroConsole />
          </ProductStage>

          <Reveal className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4" delay={0.18} y={12}>
            {[
              ['184', 'SKU rows prepared'],
              ['8+', 'channels supported'],
              ['4', 'fields to review'],
              ['0', 'unapproved writes'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-lg border bg-white px-4 py-4" style={{ borderColor: L_BORDER }}>
                <div className="text-[25px] font-semibold" style={{ color: INK, fontFamily: D }}>{value}</div>
                <div className="mt-1 text-[9px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>{label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CustomerSection />

      <section id="product-flow" className="scroll-mt-[96px]" style={{ background: '#EAF1EE', borderTop: `1px solid ${L_BORDER}`, borderBottom: `1px solid ${L_BORDER}` }}>
        <div className="mx-auto max-w-[1160px] px-5 py-14 sm:px-6 sm:py-20">
          <Reveal className="mb-10 grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-end" y={16}>
            <div>
              <SectionLabel label="Explore the product" tone="light" />
              <h2 className="mt-6 max-w-[720px] text-[clamp(30px,4.2vw,52px)] font-bold leading-[1.06]" style={{ color: L_TEXT, fontFamily: D }}>
                One workspace. Four operating views.
              </h2>
            </div>
            <p className="max-w-[560px] text-[15px] leading-[1.65] sm:text-[16px]" style={{ color: L_MUTED }}>
              Switch between the same views your catalog, merchandising, and inventory teams use.
            </p>
          </Reveal>
          <ProductStage><ProductFlowWorkbench /></ProductStage>
        </div>
      </section>

      <section id="enrichment" className="scroll-mt-[96px]" style={{ background: L_BG }}>
        <div className="mx-auto max-w-[1160px] px-5 py-16 sm:px-6 sm:py-24">
          <Reveal className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end" y={16}>
            <div>
              <SectionLabel label="SKU enrichment" tone="light" />
              <h2 className="mt-6 max-w-[700px] text-[clamp(30px,4vw,50px)] font-bold leading-[1.06]" style={{ color: L_TEXT, fontFamily: D }}>
                See every change before it ships.
              </h2>
            </div>
            <p className="max-w-[560px] text-[15px] leading-[1.65] sm:text-[16px]" style={{ color: L_MUTED }}>
              Compare the source record with the structured marketplace output.
            </p>
          </Reveal>
          <ProductStage><EnrichmentSlider /></ProductStage>
        </div>
      </section>

      <section id="use-cases" className="scroll-mt-[96px]" style={{ background: L_BG }}>
        <div className="mx-auto max-w-[1160px] px-5 py-16 sm:px-6 sm:py-24">
          <Reveal className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end" y={16}>
            <div>
              <SectionLabel label="Use cases" tone="light" />
              <h2 className="mt-6 max-w-[700px] text-[clamp(30px,4vw,50px)] font-bold leading-[1.06]" style={{ color: L_TEXT, fontFamily: D }}>
                Built for the work your team repeats.
              </h2>
            </div>
            <p className="max-w-[560px] text-[15px] leading-[1.65] sm:text-[16px]" style={{ color: L_MUTED }}>
              Open a focused workspace for each operational job.
            </p>
          </Reveal>
          <div className="grid gap-3 md:grid-cols-5">
            {HOME_USE_CASES.map((item, index) => (
              <MotionCard key={item.href} delay={index * 0.055}>
                <a href={item.href} className="group block min-h-[210px] rounded-lg border bg-white p-4" style={{ borderColor: index === 0 ? '#b7dcbf' : L_BORDER, boxShadow: index === 0 ? '0 22px 60px rgba(29,122,109,0.12)' : 'none' }}>
                  <div className="mb-8 flex items-center justify-between gap-3">
                    <span className="text-[10px] uppercase" style={{ color: index === 0 ? '#1D7A6D' : L_MUTED, fontFamily: M }}>{item.metric}</span>
                    <span className="grid h-7 w-7 place-items-center rounded-md border transition-colors group-hover:bg-[#111] group-hover:text-white" style={{ borderColor: L_BORDER, color: L_TEXT }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M3 8h10" />
                        <path d="m9 4 4 4-4 4" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="text-[19px] font-semibold leading-tight" style={{ color: L_TEXT, fontFamily: D }}>{item.title}</h3>
                  <p className="mt-3 text-[13px] leading-[1.55]" style={{ color: L_MUTED }}>{item.body}</p>
                </a>
              </MotionCard>
            ))}
          </div>
        </div>
      </section>

      <IntegrationsSection />

      <section id="cta" className="relative overflow-hidden" style={{ background: DARK, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(120deg, rgba(158,224,120,0.13), transparent 38%, rgba(255,255,255,0.04))' }} />
        <div className="relative mx-auto grid max-w-[1160px] gap-10 px-5 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1fr_0.76fr] lg:items-center">
          <Reveal>
            <SectionLabel label="Early access" />
            <h2 className="mt-6 max-w-[680px] text-[clamp(34px,5vw,60px)] font-bold leading-[1.02] text-white" style={{ fontFamily: D }}>
              Bring us your messiest workflow.
            </h2>
            <p className="mt-5 max-w-[520px] text-[16px] leading-[1.65]" style={{ color: SOFT }}>
              We will turn it into a repeatable, approval-ready process.
            </p>
          </Reveal>
          <Reveal className="rounded-lg border p-4" style={{ borderColor: 'rgba(255,255,255,0.14)', background: GLASS, backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }} delay={0.1} x={18} y={8}>
            <WaitlistForm
              email={ctaEmail}
              setEmail={setCtaEmail}
              status={ctaStatus}
              message={ctaMessage}
              compact
              onSubmit={() => handleSubmit(ctaEmail, setCtaStatus, setCtaMessage, () => setCtaEmail(''))}
            />
            <div className="mt-4 flex flex-wrap gap-3 text-[10px] uppercase" style={{ color: MUTED, fontFamily: M }}>
              <span>No credit card</span>
              <span>Setup help included</span>
              <span>Built around your current stack</span>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
    </MotionShell>
  )
}
