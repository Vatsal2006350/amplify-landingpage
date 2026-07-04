'use client'

import { useEffect, useState } from 'react'

const ACCENT = '#C5F135'
const BASE = '#080808'
const INK = '#ffffff'
const MUTED = 'rgba(255,255,255,0.58)'
const SOFT = 'rgba(255,255,255,0.78)'
const BORDER = 'rgba(255,255,255,0.12)'
const GLASS = 'rgba(255,255,255,0.065)'
const D = 'var(--font-display)'
const M = 'var(--font-mono)'

const L_BG = '#fbfcf8'
const L_SURFACE = '#f1f4ec'
const L_TEXT = '#111111'
const L_MUTED = '#6c7168'
const L_BORDER = 'rgba(0,0,0,0.1)'

const NAV_LINKS = [
  { label: 'Product', href: '#product-flow' },
  { label: 'Platform', href: '#platform' },
  { label: 'Enrichment', href: '#enrichment' },
  { label: 'Integrations', href: '#integrations' },
]

const USE_CASE_LINKS = [
  { label: 'Listing Ops', href: '#use-listings', detail: 'Generate marketplace files' },
  { label: 'Company Brain', href: '#use-brain', detail: 'Ask sales and stock' },
  { label: 'Inventory', href: '#use-forecast', detail: 'Read the channel ledger' },
  { label: 'Approvals', href: '#use-actions', detail: 'Review agent work' },
  { label: 'Marketplace files', href: '#marketplace-files', detail: 'Invoice to XLSX' },
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

const WORKFLOW_CARDS = [
  {
    title: 'Template Generator',
    body: 'Master sheet + marketplace template + ImgBB album becomes a ready-to-submit XLSX.',
    tags: ['Namshi', '6th Street', 'Centrepoint', 'Amazon'],
  },
  {
    title: 'Image Intelligence',
    body: 'Extract closure, toe, heel band, color, outsole, and kids attributes from SKU images.',
    tags: ['Image checks', 'Attribute fill', 'Manager review', 'Validation'],
  },
  {
    title: 'Human Approval',
    body: 'Managers review evidence, diffs, and generated files before changes ship.',
    tags: ['Diffs', 'Audit trail', 'Rollback', 'Apply'],
  },
]

const INTEGRATIONS = [
  { name: 'Shopify', src: '/logos/platforms/shopify.svg', detail: 'Products + orders' },
  { name: 'Amazon', src: '/logos/platforms/amazon.svg', detail: 'Flat files + SP-API' },
  { name: 'Noon', src: '/logos/platforms/noon.svg', detail: 'Catalog + stock' },
  { name: 'Namshi', wordmark: 'namshi', detail: 'Seller templates' },
  { name: '6th Street', src: '/logos/platforms/sixth-street.png', detail: 'Marketplace files', dark: true },
  { name: 'Centrepoint', wordmark: 'centrepoint', detail: 'Retail feeds' },
  { name: 'Flipkart', src: '/logos/platforms/flipkart.svg', detail: 'Seller ops' },
  { name: 'Trendyol', src: '/logos/platforms/trendyol.svg', detail: 'Product feeds' },
]

const ORBIT = [
  { x: '50%', y: '6%' },
  { x: '82%', y: '21%' },
  { x: '92%', y: '52%' },
  { x: '77%', y: '82%' },
  { x: '50%', y: '94%' },
  { x: '23%', y: '82%' },
  { x: '8%', y: '52%' },
  { x: '18%', y: '21%' },
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
  const textColor = tone === 'light' ? L_MUTED : MUTED

  return (
    <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`} style={{ fontFamily: M }}>
      <span className="h-px w-8" style={{ background: ACCENT }} />
      <span className="text-[11px] uppercase" style={{ color: align === 'center' ? L_MUTED : textColor }}>
        {label}
      </span>
      {align === 'center' && <span className="h-px w-8" style={{ background: ACCENT }} />}
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
}: {
  email: string
  setEmail: (email: string) => void
  status: Status
  message: string
  onSubmit: () => void
  compact?: boolean
}) {
  if (status === 'success') {
    return (
      <div className="flex min-h-[52px] items-center gap-3 rounded-lg px-4" style={{ background: 'rgba(197,241,53,0.12)', border: `1px solid rgba(197,241,53,0.28)` }}>
        <span className="grid h-5 w-5 place-items-center rounded-full" style={{ background: ACCENT, color: BASE }}>
          <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 10 3 3 7-7" />
          </svg>
        </span>
        <span className="text-[12px]" style={{ color: ACCENT, fontFamily: M }}>{message}</span>
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
          background: 'rgba(255,255,255,0.07)',
          border: `1px solid rgba(255,255,255,0.14)`,
          boxShadow: '0 18px 60px rgba(0,0,0,0.28)',
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Work email"
          disabled={status === 'loading'}
          className="h-[52px] min-w-0 shrink-0 bg-transparent px-4 text-[14px] text-white outline-none placeholder:text-[rgba(255,255,255,0.46)] disabled:opacity-50 sm:flex-1"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="flex h-[52px] shrink-0 items-center justify-center gap-2 px-6 text-[12px] font-bold transition-opacity hover:opacity-90 disabled:opacity-55"
          style={{ background: ACCENT, color: BASE, fontFamily: M }}
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
  const stages = ['Sync', 'Detect', 'Recommend', 'Approve', 'Measure']
  const evidence = [
    ['Loop', 'Reason: too narrow', '28 returns'],
    ['Gorgias', 'Customer says size runs small', '14 tickets'],
    ['Shopify', 'BR-772104-CAF variant sales spike', 'Live'],
  ]

  return (
    <div className="relative">
      <div className="absolute -inset-px rounded-lg" style={{ background: `linear-gradient(135deg, rgba(197,241,53,0.48), rgba(255,255,255,0.08), rgba(75,150,255,0.24))` }} />
      <div
        className="relative overflow-hidden rounded-lg"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.15), rgba(255,255,255,0.055))',
          border: `1px solid ${BORDER}`,
          boxShadow: '0 34px 110px rgba(0,0,0,0.55)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
        }}
      >
        <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: BORDER }}>
          <div className="flex items-center gap-2">
            <Logo size={24} />
            <div>
              <div className="text-[13px] font-semibold text-white" style={{ fontFamily: D }}>Amplify Command Center</div>
              <div className="text-[10px] uppercase" style={{ color: MUTED, fontFamily: M }}>agentic commerce ops</div>
            </div>
          </div>
          <span className="rounded-md px-2 py-1 text-[10px] font-bold" style={{ background: 'rgba(197,241,53,0.14)', color: ACCENT, fontFamily: M }}>
            LIVE
          </span>
        </div>

        <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="border-b p-4 lg:border-b-0 lg:border-r" style={{ borderColor: BORDER }}>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] uppercase" style={{ color: MUTED, fontFamily: M }}>SKU issue</span>
              <span className="text-[10px]" style={{ color: ACCENT, fontFamily: M }}>needs approval</span>
            </div>
            <div className="rounded-lg border p-4" style={{ borderColor: BORDER, background: 'rgba(0,0,0,0.22)' }}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="text-[20px] font-semibold text-white" style={{ fontFamily: D }}>BR-772104-CAF</div>
                  <div className="mt-1 text-[12px]" style={{ color: MUTED }}>Men’s Leather Lace-Up Ankle Boot</div>
                </div>
                <div className="w-fit rounded-md px-2 py-1 text-[10px] font-bold" style={{ background: 'rgba(197,241,53,0.12)', color: ACCENT, fontFamily: M }}>
                  REVIEW REQUIRED
                </div>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {[
                  ['12.8%', 'returns'],
                  ['42', 'snippets'],
                  ['3', 'fields missing'],
                ].map(([value, label]) => (
                  <div key={label} className="min-w-0 rounded-md border p-3" style={{ borderColor: BORDER, background: 'rgba(255,255,255,0.045)' }}>
                    <div className="text-[20px] font-bold text-white" style={{ fontFamily: D }}>{value}</div>
                    <div className="text-[9px] uppercase" style={{ color: MUTED, fontFamily: M }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 overflow-hidden rounded-lg border" style={{ borderColor: BORDER, background: 'rgba(0,0,0,0.18)' }}>
              {evidence.map((row) => (
                <div key={row[1]} className="grid grid-cols-12 gap-2 border-b px-3 py-3 text-[11px] last:border-b-0" style={{ borderColor: BORDER }}>
                  <span className="col-span-3 font-semibold text-white">{row[0]}</span>
                  <span className="col-span-6 truncate" style={{ color: MUTED }}>{row[1]}</span>
                  <span className="col-span-3 text-right" style={{ color: ACCENT, fontFamily: M }}>{row[2]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] uppercase" style={{ color: MUTED, fontFamily: M }}>Agent run</span>
              <span className="text-[10px]" style={{ color: ACCENT, fontFamily: M }}>5 workers</span>
            </div>
            <div className="relative mb-4 grid grid-cols-5 gap-1">
              {stages.map((stage, index) => (
                <div key={stage} className="rounded-md border px-2 py-3 text-center" style={{ borderColor: index === 2 ? 'rgba(197,241,53,0.4)' : BORDER, background: index === 2 ? 'rgba(197,241,53,0.12)' : 'rgba(255,255,255,0.045)' }}>
                  <div className="mx-auto mb-2 h-2 w-2 rounded-full" style={{ background: index <= 2 ? ACCENT : 'rgba(255,255,255,0.22)' }} />
                  <div className="text-[9px] uppercase" style={{ color: index <= 2 ? '#fff' : MUTED, fontFamily: M }}>{stage}</div>
                </div>
              ))}
            </div>
            <div className="rounded-lg border p-4" style={{ borderColor: 'rgba(197,241,53,0.32)', background: 'rgba(197,241,53,0.09)' }}>
              <div className="mb-2 flex items-center gap-2 text-[10px] uppercase" style={{ color: ACCENT, fontFamily: M }}>
                <SparkIcon />
                Review package
              </div>
              <p className="text-[15px] font-semibold leading-snug text-white" style={{ fontFamily: D }}>
                Complete product imagery, material, closure, sole, and sizing attributes before channel export.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {['Evidence attached', 'Diff ready', 'Rollback safe', 'Impact tracked'].map((item) => (
                  <div key={item} className="rounded-md border px-3 py-2 text-[10px] uppercase" style={{ borderColor: BORDER, color: SOFT, fontFamily: M }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
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
            {[18, 104, 190, 276, 362, 442].map((x, index) => <circle key={x} cx={x} cy={[114, 94, 102, 70, 48, 35][index]} r="5" fill="#C5F135" stroke="#1D7A6D" strokeWidth="2" />)}
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
    <div className="overflow-hidden rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.16)', background: '#eef3ed', boxShadow: '0 34px 110px rgba(0,0,0,0.38)' }}>
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
          <button type="button" className="rounded-md px-3 py-1.5 text-[10px] font-bold uppercase" style={{ background: ACCENT, color: BASE, fontFamily: M }}>
            Run
          </button>
        </div>
      </div>

      <div className="grid min-h-[640px] lg:grid-cols-[228px_1fr]" style={{ color: L_TEXT }}>
        <aside className="border-b bg-[#f7faf6] p-4 lg:border-b-0 lg:border-r" style={{ borderColor: L_BORDER }}>
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
                  style={{ borderColor: selected ? '#b7dcbf' : 'transparent', background: selected ? '#eaf6e7' : 'transparent' }}
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

        <div className="min-w-0 bg-[#eef3ed]">
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
          <div className="text-[10px] uppercase" style={{ color: '#1a7a2e', fontFamily: M }}>Drag to compare</div>
          <h3 className="mt-1 text-[22px] font-semibold" style={{ color: L_TEXT, fontFamily: D }}>SKU record before and after enrichment</h3>
        </div>
        <span className="rounded-md px-2.5 py-1 text-[10px] font-bold uppercase" style={{ background: '#0d1209', color: ACCENT, fontFamily: M }}>
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
                <div className="mb-3 text-[10px] uppercase" style={{ color: '#1a7a2e', fontFamily: M }}>After</div>
                <div className="space-y-2">
                  {ENRICHMENT_ROWS.map((row) => (
                    <div key={row.field} className="rounded-lg border p-3" style={{ borderColor: 'rgba(26,122,46,0.18)', background: 'rgba(197,241,53,0.1)' }}>
                      <div className="mb-1 text-[10px] uppercase" style={{ color: '#1a7a2e', fontFamily: M }}>{row.field}</div>
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

function TemplateVisual() {
  const statusBadge = (label: string, tone: 'ready' | 'review' | 'blocked' = 'ready') => {
    const styles = {
      ready: { background: '#e8f7ed', color: '#137a3a', borderColor: '#bfe7cd' },
      review: { background: '#fff7db', color: '#9a6500', borderColor: '#ecd48a' },
      blocked: { background: '#fff0ef', color: '#b53a32', borderColor: '#efc5c0' },
    }[tone]

    return (
      <span className="rounded-md border px-2 py-1 text-[10px] font-semibold uppercase" style={{ ...styles, fontFamily: M }}>
        {label}
      </span>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border" style={{ borderColor: L_BORDER, background: '#eef3ed', boxShadow: '0 28px 86px rgba(0,0,0,0.12)' }}>
      <div className="flex items-center justify-between gap-4 border-b px-4 py-3" style={{ borderColor: L_BORDER, background: '#0d0f0c' }}>
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="hidden min-w-0 rounded-md border px-3 py-1.5 text-[11px] sm:block" style={{ borderColor: 'rgba(255,255,255,0.12)', color: MUTED, fontFamily: M }}>
            app.use-amplify.com/geoomnii/marketplace-files
          </div>
        </div>
        <button type="button" className="rounded-md px-3 py-1.5 text-[10px] font-bold uppercase" style={{ background: ACCENT, color: BASE, fontFamily: M }}>
          Export
        </button>
      </div>

      <div className="grid lg:grid-cols-[228px_1fr]">
        <aside className="border-b bg-[#f7faf6] p-4 lg:border-b-0 lg:border-r" style={{ borderColor: L_BORDER }}>
          <div className="mb-5 flex items-center gap-2">
            <Logo size={28} />
            <div>
              <div className="text-[14px] font-semibold" style={{ color: L_TEXT, fontFamily: D }}>Amplify</div>
              <div className="text-[10px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>Listing Ops</div>
            </div>
          </div>
          <div className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
            {[
              ['Source files', 'uploaded'],
              ['Template compile', 'active'],
              ['Image review', 'mapped'],
              ['Approval queue', '4 checks'],
            ].map(([label, detail], index) => (
              <div key={label} className="rounded-lg border px-3 py-3" style={{ borderColor: index === 1 ? '#b7dcbf' : 'transparent', background: index === 1 ? '#eaf6e7' : 'transparent' }}>
                <div className="text-[10px] uppercase" style={{ color: index === 1 ? '#1D7A6D' : L_MUTED, fontFamily: M }}>{detail}</div>
                <div className="mt-1 text-[14px] font-semibold" style={{ color: L_TEXT, fontFamily: D }}>{label}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 hidden rounded-lg border bg-white p-3 lg:block" style={{ borderColor: L_BORDER }}>
            <div className="mb-2 text-[10px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>Input files</div>
            <div className="space-y-1.5">
              {['supplier_invoice.xlsx', 'master_item_sheet.xlsx', 'imgbb_album.csv', 'centrepoint_template.xlsx'].map((file) => (
                <div key={file} className="truncate rounded-md bg-[#f3f6f0] px-2 py-1.5 text-[11px]" style={{ color: L_MUTED, fontFamily: M }}>{file}</div>
              ))}
            </div>
          </div>
        </aside>

        <div className="min-w-0 bg-[#eef3ed]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-white px-4 py-3 sm:px-5" style={{ borderColor: L_BORDER }}>
            <div>
              <div className="text-[10px] uppercase" style={{ color: '#1D7A6D', fontFamily: M }}>Marketplace files</div>
              <h3 className="text-[22px] font-semibold leading-tight" style={{ color: L_TEXT, fontFamily: D }}>Invoice to channel-ready XLSX</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Namshi', '6th Street', 'Centrepoint', 'Amazon'].map((item) => (
                <span key={item} className="rounded-md border px-2 py-1 text-[10px] font-semibold uppercase" style={{ borderColor: '#e2e8da', background: '#f3f5ef', color: '#646b5d', fontFamily: M }}>{item}</span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 p-4 sm:p-5 xl:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-lg border bg-white p-4" style={{ borderColor: L_BORDER }}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>Source normalization</div>
                  <h4 className="mt-1 text-[20px] font-semibold" style={{ color: L_TEXT, fontFamily: D }}>Supplier invoice expanded by size</h4>
                </div>
                {statusBadge('mapped', 'ready')}
              </div>
              <div className="overflow-hidden rounded-lg border" style={{ borderColor: L_BORDER }}>
                {[
                  ['772104', 'CAFÉ', '35', '12', 'hero'],
                  ['772104', 'CAFÉ', '36', '18', 'mapped'],
                  ['772104', 'CAFÉ', '37', '21', 'mapped'],
                  ['772105', 'PRETO', '38', '14', 'review'],
                ].map((row, index) => (
                  <div key={`${row[0]}-${row[2]}`} className="grid grid-cols-12 gap-3 border-b px-3 py-3 text-[12px] last:border-b-0" style={{ borderColor: L_BORDER, background: index === 0 ? '#f4faef' : '#fff' }}>
                    <span className="col-span-3 font-semibold" style={{ color: L_TEXT }}>{row[0]}</span>
                    <span className="col-span-3" style={{ color: L_TEXT }}>{row[1]}</span>
                    <span className="col-span-2" style={{ color: L_MUTED }}>{row[2]}</span>
                    <span className="col-span-2" style={{ color: L_MUTED }}>{row[3]}</span>
                    <span className="col-span-2 text-right" style={{ color: row[4] === 'review' ? '#9a6500' : '#137a3a', fontFamily: M }}>{row[4]}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {['HSN', 'Heel', 'Closure'].map((field) => (
                  <div key={field} className="rounded-md border px-3 py-2 text-center text-[10px] uppercase" style={{ borderColor: L_BORDER, color: L_MUTED, fontFamily: M }}>{field}</div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border bg-white p-4" style={{ borderColor: L_BORDER }}>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>Platform outputs</div>
                  <h4 className="mt-1 text-[20px] font-semibold" style={{ color: L_TEXT, fontFamily: D }}>Ready files with review blockers isolated</h4>
                </div>
                {statusBadge('ready XLSX', 'ready')}
              </div>
              <div className="space-y-2">
                {[
                  ['Namshi', 'closure, toe, heel, images', 'Ready', 'ready'],
                  ['6th Street', 'variant template and image URLs', 'Ready', 'ready'],
                  ['Centrepoint', 'UDA fields need approval', 'Review', 'review'],
                  ['Amazon', 'flat-file enum checks', 'Ready', 'ready'],
                ].map(([platform, detail, status, tone]) => (
                  <div key={platform} className="rounded-lg border p-3" style={{ borderColor: L_BORDER, background: status === 'Ready' ? '#f4faef' : '#fff' }}>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h5 className="text-[15px] font-semibold" style={{ color: L_TEXT, fontFamily: D }}>{platform}</h5>
                        <p className="mt-1 text-[12px]" style={{ color: L_MUTED }}>{detail}</p>
                      </div>
                      {statusBadge(status, tone as 'ready' | 'review')}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg border p-3" style={{ borderColor: '#cfe4dc', background: '#f7fbfa' }}>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] uppercase" style={{ color: '#1D7A6D', fontFamily: M }}>Namshi export fields</span>
                  {statusBadge('mapped', 'ready')}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {['Closure', 'Toe shape', 'Upper material', 'Image URLs'].map((field) => (
                    <span key={field} className="rounded-md border px-3 py-2 text-[10px] uppercase" style={{ borderColor: '#d9e8dd', color: L_MUTED, fontFamily: M }}>
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
function TransformationFlow() {
  const [activeOutput, setActiveOutput] = useState('Namshi')
  const masterRows = [
    ['772104', 'CAFÉ', '35', '12'],
    ['772104', 'CAFÉ', '36', '18'],
    ['772104', 'CAFÉ', '37', '21'],
    ['772104', 'CAFÉ', '38', '16'],
  ]

  const platforms = [
    { name: 'Namshi', detail: 'closure, toe, heel', fields: ['Closure', 'Toe shape', 'Upper material', 'Image URLs'], status: 'Ready' },
    { name: '6th Street', detail: 'variant template', fields: ['Gender segment', 'Color family', 'Size variants', 'Product images'], status: 'Ready' },
    { name: 'Centrepoint', detail: 'UDA fields', fields: ['Retail hierarchy', 'HSN code', 'Secondary color', 'Sole type'], status: 'Review' },
    { name: 'Amazon', detail: 'flat-file enum', fields: ['Browse node', 'Bullet copy', 'Search terms', 'Variation theme'], status: 'Ready' },
  ]
  const selectedPlatform = platforms.find((platform) => platform.name === activeOutput) || platforms[0]

  return (
    <div className="mb-4 overflow-hidden rounded-lg border" style={{ borderColor: L_BORDER, background: '#0d1209' }}>
      <div className="border-b px-4 py-3" style={{ borderColor: BORDER }}>
        <div className="text-[10px] uppercase" style={{ color: ACCENT, fontFamily: M }}>Transformation process</div>
        <h3 className="mt-1 text-[22px] font-semibold text-white" style={{ fontFamily: D }}>Invoice to master sheet to channel-ready files</h3>
      </div>
      <div className="grid gap-0 lg:grid-cols-[0.78fr_1.02fr_0.78fr]">
        <div className="border-b p-4 lg:border-b-0 lg:border-r" style={{ borderColor: BORDER }}>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] uppercase" style={{ color: MUTED, fontFamily: M }}>Supplier invoice</span>
            <span className="text-[10px]" style={{ color: ACCENT, fontFamily: M }}>wide format</span>
          </div>
          <div className="rounded-lg border bg-white p-3" style={{ borderColor: 'rgba(255,255,255,0.14)' }}>
            <div className="mb-3 grid grid-cols-4 gap-1 text-[9px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>
              <span>Style</span><span>Color</span><span>35</span><span>36</span>
            </div>
            {[
              ['772104', 'CAFE', '12', '18'],
              ['772105', 'PRETO', '8', '14'],
              ['772106', 'NUDE', '10', '16'],
            ].map((row) => (
              <div key={row.join('-')} className="grid grid-cols-4 gap-1 border-t py-2 text-[11px]" style={{ borderColor: L_BORDER, color: L_TEXT }}>
                {row.map((cell) => <span key={cell}>{cell}</span>)}
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg border p-3" style={{ borderColor: BORDER, background: 'rgba(255,255,255,0.045)' }}>
            <div className="text-[18px] font-semibold text-white" style={{ fontFamily: D }}>1 invoice line</div>
            <div className="mt-1 text-[11px] uppercase" style={{ color: MUTED, fontFamily: M }}>split by size, material, color</div>
          </div>
        </div>

        <div className="border-b p-4 lg:border-b-0 lg:border-r" style={{ borderColor: BORDER }}>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] uppercase" style={{ color: MUTED, fontFamily: M }}>Amplify master sheet</span>
            <span className="text-[10px]" style={{ color: ACCENT, fontFamily: M }}>tall SKU rows</span>
          </div>
          <div className="overflow-hidden rounded-lg border" style={{ borderColor: BORDER }}>
            <div className="grid grid-cols-12 bg-[rgba(197,241,53,0.12)] px-3 py-2 text-[9px] uppercase" style={{ color: ACCENT, fontFamily: M }}>
              <span className="col-span-3">Parent</span>
              <span className="col-span-3">Color</span>
              <span className="col-span-2">Size</span>
              <span className="col-span-2">Qty</span>
              <span className="col-span-2 text-right">Image</span>
            </div>
            {masterRows.map((row, index) => (
              <div key={`${row[0]}-${row[2]}`} className="grid grid-cols-12 border-t px-3 py-3 text-[11px]" style={{ borderColor: BORDER, background: index === 0 ? 'rgba(197,241,53,0.08)' : 'rgba(255,255,255,0.035)', color: SOFT }}>
                <span className="col-span-3 font-semibold text-white">{row[0]}</span>
                <span className="col-span-3">{row[1]}</span>
                <span className="col-span-2">{row[2]}</span>
                <span className="col-span-2">{row[3]}</span>
                <span className="col-span-2 text-right" style={{ color: ACCENT, fontFamily: M }}>{index === 0 ? 'hero' : 'mapped'}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {['HSN', 'Heel', 'Closure'].map((label) => (
              <div key={label} className="rounded-md border p-2 text-center text-[10px] uppercase" style={{ borderColor: BORDER, color: SOFT, fontFamily: M }}>
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] uppercase" style={{ color: MUTED, fontFamily: M }}>Platform outputs</span>
            <span className="text-[10px]" style={{ color: ACCENT, fontFamily: M }}>ready XLSX</span>
          </div>
          <div className="grid gap-2">
            {platforms.map((platform) => {
              const active = platform.name === selectedPlatform.name
              return (
              <button
                key={platform.name}
                type="button"
                onClick={() => setActiveOutput(platform.name)}
                className="rounded-lg border p-3 text-left transition-colors"
                style={{ borderColor: active ? 'rgba(197,241,53,0.36)' : BORDER, background: active ? 'rgba(197,241,53,0.1)' : 'rgba(255,255,255,0.045)' }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[15px] font-semibold text-white" style={{ fontFamily: D }}>{platform.name}</div>
                  <div className="text-[10px] uppercase" style={{ color: active ? ACCENT : MUTED, fontFamily: M }}>{platform.status}</div>
                </div>
                <div className="mt-1 text-[12px]" style={{ color: SOFT }}>{platform.detail}</div>
              </button>
            )})}
          </div>
          <div className="mt-3 rounded-lg border p-3" style={{ borderColor: 'rgba(197,241,53,0.28)', background: 'rgba(197,241,53,0.08)' }}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="text-[12px] font-semibold text-white" style={{ fontFamily: D }}>{selectedPlatform.name} export fields</div>
              <div className="text-[10px] uppercase" style={{ color: ACCENT, fontFamily: M }}>mapped</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {selectedPlatform.fields.map((field) => (
                <div key={field} className="rounded-md border px-2 py-2 text-[10px] uppercase" style={{ borderColor: BORDER, color: SOFT, fontFamily: M }}>
                  {field}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ImageEnhancementVisual() {
  return (
    <div className="mt-4 grid gap-3 rounded-lg border p-3 md:grid-cols-[0.92fr_1.08fr]" style={{ borderColor: L_BORDER, background: '#0d1209' }}>
      <div className="relative min-h-[330px] overflow-hidden rounded-lg bg-[#111]">
        <img src="/images/products/customer-shoe-boot.jpg" alt="Product image enhancement preview" className="absolute inset-0 h-full w-full object-cover" style={{ filter: 'saturate(0.72) contrast(0.82) brightness(0.62) blur(1px)' }} />
        <div className="absolute inset-y-0 right-0 w-[54%] overflow-hidden border-l" style={{ borderColor: 'rgba(197,241,53,0.7)' }}>
          <img src="/images/products/customer-shoe-boot.jpg" alt="" className="h-full w-full object-cover" style={{ filter: 'saturate(1.14) contrast(1.12) brightness(1.06)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(197,241,53,0.08), transparent 42%)' }} />
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase" style={{ color: ACCENT, fontFamily: M }}>Image enhancement</div>
            <div className="mt-1 text-[20px] font-semibold text-white" style={{ fontFamily: D }}>Raw supplier image to product-detail asset</div>
          </div>
          <div className="rounded-full border bg-white px-3 py-1.5 text-[10px] uppercase" style={{ borderColor: 'rgba(255,255,255,0.2)', color: L_TEXT, fontFamily: M }}>
            Before / after
          </div>
        </div>
      </div>
      <div className="grid content-center gap-2 p-2">
        {[
          ['Background and lighting cleanup', 'Make supplier images feel consistent across the product grid.'],
          ['Image-derived attributes', 'Detect closure, toe shape, heel style, secondary color, material cues, and variant details.'],
          ['Channel-ready exports', 'Attach the right URLs and metadata to each marketplace template row.'],
        ].map(([title, body], index) => (
          <div key={title} className="rounded-lg border p-4" style={{ borderColor: index === 0 ? 'rgba(197,241,53,0.36)' : BORDER, background: index === 0 ? 'rgba(197,241,53,0.1)' : 'rgba(255,255,255,0.045)' }}>
            <div className="mb-1 text-[10px] uppercase" style={{ color: index === 0 ? ACCENT : MUTED, fontFamily: M }}>{String(index + 1).padStart(2, '0')}</div>
            <h3 className="text-[16px] font-semibold text-white" style={{ fontFamily: D }}>{title}</h3>
            <p className="mt-2 text-[13px] leading-[1.6]" style={{ color: SOFT }}>{body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function IntegrationLogo({ item, small = false }: { item: (typeof INTEGRATIONS)[number]; small?: boolean }) {
  const dark = 'dark' in item && item.dark
  return (
    <div
      className={`${small ? 'h-[84px] w-[132px]' : 'h-[112px]'} rounded-lg border px-3 text-center`}
      style={{
        background: dark ? '#070707' : '#ffffff',
        borderColor: dark ? 'rgba(255,255,255,0.09)' : L_BORDER,
        boxShadow: small ? '0 16px 44px rgba(0,0,0,0.1)' : 'none',
      }}
    >
      <div className="flex h-full flex-col items-center justify-center">
        <div className="mb-2 flex h-8 items-center justify-center">
          {'src' in item ? (
            <img src={item.src} alt={`${item.name} logo`} className={`${small ? 'max-h-7 max-w-[104px]' : 'max-h-9 max-w-[124px]'} object-contain`} />
          ) : (
            <span className={`${small ? 'text-[17px]' : 'text-[21px]'} font-black`} style={{ color: dark ? '#fff' : L_TEXT, fontFamily: D }}>
              {item.wordmark}
            </span>
          )}
        </div>
        <div className="text-[9px] uppercase leading-tight" style={{ color: dark ? 'rgba(255,255,255,0.68)' : L_MUTED, fontFamily: M }}>
          {item.detail}
        </div>
      </div>
    </div>
  )
}

function IntegrationsOrbit() {
  return (
    <div className="relative mx-auto hidden h-[500px] max-w-[760px] lg:block">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 760 500" aria-hidden="true">
        <defs>
          <linearGradient id="orbitGlow" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#C5F135" stopOpacity="0.34" />
            <stop offset="52%" stopColor="#8BC6EC" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#C5F135" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <ellipse cx="380" cy="250" rx="304" ry="188" fill="#f0f6eb" />
        <ellipse cx="380" cy="250" rx="226" ry="132" fill="#fff" />
        <ellipse cx="380" cy="250" rx="136" ry="86" fill="none" stroke="url(#orbitGlow)" strokeWidth="38" />
        <ellipse cx="380" cy="250" rx="286" ry="176" fill="none" stroke="rgba(0,0,0,0.08)" />
        <ellipse cx="380" cy="250" rx="194" ry="112" fill="none" stroke="rgba(26,122,46,0.22)" strokeDasharray="6 9" />
        {ORBIT.map((pos) => (
          <line key={`${pos.x}-${pos.y}`} x1="380" y1="250" x2={pos.x} y2={pos.y} stroke="rgba(26,122,46,0.2)" strokeDasharray="5 8" />
        ))}
      </svg>

      <div className="absolute left-1/2 top-1/2 flex h-[164px] w-[228px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-lg border bg-white px-5 text-center" style={{ borderColor: L_BORDER, boxShadow: '0 24px 70px rgba(0,0,0,0.12)' }}>
        <Logo size={54} />
        <div className="mt-3 text-[12px] font-bold uppercase" style={{ color: '#1a7a2e', fontFamily: M }}>Amplify</div>
        <div className="mt-1 text-[15px] leading-snug" style={{ color: L_TEXT, fontFamily: D }}>
          One operating layer for every channel.
        </div>
      </div>

      {INTEGRATIONS.map((item, index) => (
        <div key={item.name} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: ORBIT[index].x, top: ORBIT[index].y }}>
          <IntegrationLogo item={item} small />
        </div>
      ))}
    </div>
  )
}

function IntegrationsSection() {
  return (
    <section id="integrations" className="scroll-mt-[96px]" style={{ background: L_BG, borderTop: `1px solid ${L_BORDER}` }}>
      <div className="mx-auto max-w-[1160px] px-5 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto mb-10 max-w-[760px] text-center">
          <SectionLabel label="Integrations" align="center" />
          <h2 className="mt-7 text-[clamp(30px,5vw,62px)] font-bold leading-[1.02]" style={{ color: L_TEXT, fontFamily: D }}>
            Keep the stack. Make the work smarter.
          </h2>
          <p className="mx-auto mt-5 max-w-[600px] text-[15px] leading-[1.7]" style={{ color: L_MUTED }}>
            Amplify works with APIs, exports, marketplace templates, supplier files, product images, and approval history.
          </p>
        </div>

        <IntegrationsOrbit />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:hidden">
          {INTEGRATIONS.map((item) => <IntegrationLogo key={item.name} item={item} />)}
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-2 rounded-lg border px-4 py-3" style={{ borderColor: L_BORDER, background: L_SURFACE }}>
          {['Shopify', 'Loop', 'Gorgias', 'ERP exports', 'Supplier PIs', 'ImgBB albums', 'Marketplace XLSX', 'Approval logs'].map((item) => (
            <span key={item} className="text-[10px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>{item}</span>
          ))}
        </div>
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
                <div className="mt-6 text-[10px] uppercase" style={{ color: ACCENT, fontFamily: M }}>Portfolio operations</div>
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
                    <span key={item} className="rounded-md px-2.5 py-1 text-[10px] font-bold uppercase" style={{ background: ACCENT, color: BASE, fontFamily: M }}>{item}</span>
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
                  <span key={item} className="rounded-md px-2.5 py-1 text-[10px] font-bold uppercase" style={{ background: ACCENT, color: BASE, fontFamily: M }}>{item}</span>
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
                    <span key={item} className="rounded-md px-2.5 py-1 text-[10px] font-bold uppercase" style={{ background: ACCENT, color: BASE, fontFamily: M }}>
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
    <main className="min-h-screen" style={{ background: BASE }}>
      <div className="fixed left-0 right-0 top-0 z-50 flex justify-center px-3 transition-all duration-300" style={{ paddingTop: scrolled ? 8 : 12 }}>
        <nav
          className="flex w-full items-center justify-between rounded-lg transition-all duration-300"
          style={{
            maxWidth: scrolled ? 900 : 1180,
            height: scrolled ? 48 : 58,
            padding: scrolled ? '0 8px 0 16px' : '0 10px 0 18px',
            background: scrolled ? 'rgba(14,14,14,0.86)' : 'rgba(8,8,8,0.72)',
            border: `1px solid ${BORDER}`,
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
            <a href="#cta" className="hidden h-9 items-center gap-2 rounded-lg px-4 text-[11px] font-bold transition-opacity hover:opacity-90 sm:flex" style={{ background: ACCENT, color: BASE, fontFamily: M }}>
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
            <a href="/audit" onClick={() => setMobileOpen(false)} className="mt-2 block rounded-lg px-3 py-3 text-[14px] font-bold" style={{ background: ACCENT, color: BASE, fontFamily: M }}>
              Free audit
            </a>
          </div>
        </div>
      )}

      <section className="relative overflow-hidden pt-[112px]" style={{ background: BASE }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)', backgroundSize: '54px 54px' }} />
        <div className="absolute inset-x-0 top-0 h-[760px] pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(197,241,53,0.17), transparent 34%, rgba(86,142,255,0.1) 72%, transparent)' }} />
        <div className="relative mx-auto max-w-[1180px] px-5 pb-16 sm:px-6 sm:pb-24">
          <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <a href="/audit" className="mb-7 inline-flex max-w-full flex-wrap items-center gap-2 rounded-lg px-3 py-2" style={{ background: 'rgba(197,241,53,0.08)', border: '1px solid rgba(197,241,53,0.2)' }}>
                <span className="shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold" style={{ background: ACCENT, color: BASE, fontFamily: M }}>FREE AUDIT</span>
                <span className="min-w-0 text-[10px] uppercase leading-[1.5] sm:text-[11px]" style={{ color: SOFT, fontFamily: M }}>Paste a product link and get quick listing feedback</span>
              </a>
              <SectionLabel label="AI operations for brand teams" />
              <h1 className="mt-6 max-w-[720px] text-[clamp(42px,5.8vw,80px)] font-bold leading-[0.98] text-white" style={{ fontFamily: D }}>
                Run catalog, inventory, and marketplace work from one AI workspace.
              </h1>
              <p className="mt-7 max-w-[590px] text-[16px] leading-[1.75] sm:text-[18px]" style={{ color: SOFT }}>
                Amplify connects product files, sales, returns, stock, images, and marketplace rules so operators can review fixes, forecasts, purchase orders, and sales actions before anything goes live.
              </p>
              <div className="mt-8">
                <WaitlistForm
                  email={email}
                  setEmail={setEmail}
                  status={status}
                  message={message}
                  onSubmit={() => handleSubmit(email, setStatus, setMessage, () => setEmail(''))}
                />
              </div>
              <div className="mt-5 flex flex-wrap gap-4 text-[11px] uppercase" style={{ color: MUTED, fontFamily: M }}>
                <span>Sales analysis</span>
                <span>Purchase order drafts</span>
                <span>Human approval</span>
              </div>
            </div>

            <div className="lg:pt-10">
              <HeroConsole />
            </div>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-4">
            {[
              ['5', 'specialized agents'],
              ['8+', 'channels supported'],
              ['45K+', 'SKUs normalized'],
              ['0', 'unapproved live writes'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-lg border px-4 py-4" style={{ borderColor: BORDER, background: 'rgba(255,255,255,0.045)' }}>
                <div className="text-[28px] font-bold text-white" style={{ fontFamily: D }}>{value}</div>
                <div className="mt-1 text-[10px] uppercase" style={{ color: MUTED, fontFamily: M }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CustomerSection />

      <section id="product-flow" className="scroll-mt-[96px]" style={{ background: '#0d0d0d', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="mx-auto max-w-[1160px] px-5 py-16 sm:px-6 sm:py-24">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
            <div>
              <SectionLabel label="Product preview" />
              <h2 className="mt-7 max-w-[720px] text-[clamp(32px,5vw,64px)] font-bold leading-[1.02] text-white" style={{ fontFamily: D }}>
                The product, embedded like an operator would use it.
              </h2>
            </div>
            <p className="text-[15px] leading-[1.75] sm:text-[17px]" style={{ color: SOFT }}>
              A seeded Geoomnii workspace showing Listing Ops, Company Brain, Inventory, and Approvals with real commerce inputs.
            </p>
          </div>
          <ProductFlowWorkbench />
        </div>
      </section>

      <section id="platform" className="scroll-mt-[96px]" style={{ background: '#0d0d0d', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="mx-auto grid max-w-[1160px] gap-8 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionLabel label="What it does" />
            <h2 className="mt-6 max-w-[580px] text-[clamp(30px,4.8vw,58px)] font-bold leading-[1.03] text-white" style={{ fontFamily: D }}>
              A real operating layer for catalog, sales analysis, forecasts, inventory, and purchase orders.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ['Sync the truth', 'Products, orders, returns, inventory, supplier PIs, SKU images, and marketplace files stay connected.'],
              ['Ask the company brain', 'Sales analysis, pivot-style breakdowns, return reasons, and stock movement are summarized in plain language.'],
              ['Prepare the output', 'Agents produce listing updates, replenishment plans, PO drafts, sales actions, and ready-to-submit marketplace XLSX files.'],
              ['Approve and learn', 'Managers approve, edit, apply, rollback when needed, and measure pre/post impact weekly.'],
            ].map(([title, body], index) => (
              <article key={title} className="rounded-lg border p-5" style={{ borderColor: BORDER, background: index === 2 ? 'rgba(197,241,53,0.08)' : GLASS }}>
                <div className="mb-4 text-[11px] uppercase" style={{ color: index === 2 ? ACCENT : MUTED, fontFamily: M }}>{String(index + 1).padStart(2, '0')}</div>
                <h3 className="mb-2 text-[18px] font-semibold text-white" style={{ fontFamily: D }}>{title}</h3>
                <p className="text-[13px] leading-[1.65]" style={{ color: SOFT }}>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="enrichment" className="scroll-mt-[96px]" style={{ background: L_BG }}>
        <div className="mx-auto max-w-[1160px] px-5 py-16 sm:px-6 sm:py-24">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <SectionLabel label="SKU enrichment" tone="light" />
              <h2 className="mt-7 max-w-[700px] text-[clamp(32px,5vw,64px)] font-bold leading-[1.02]" style={{ color: L_TEXT, fontFamily: D }}>
                Review a SKU record before and after enrichment.
              </h2>
            </div>
            <p className="text-[15px] leading-[1.75] sm:text-[17px]" style={{ color: L_MUTED }}>
              Source data, image links, and channel requirements become a governed SKU record with structured attributes and product imagery.
            </p>
          </div>
          <EnrichmentSlider />
        </div>
      </section>

      <section id="marketplace-files" className="scroll-mt-[96px]" style={{ background: L_BG }}>
        <div className="mx-auto max-w-[1160px] px-5 py-16 sm:px-6 sm:py-24">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <SectionLabel label="Marketplace files" tone="light" />
              <h2 className="mt-7 max-w-[700px] text-[clamp(32px,5vw,62px)] font-bold leading-[1.02]" style={{ color: L_TEXT, fontFamily: D }}>
                Marketplace files inside the same workspace.
              </h2>
            </div>
            <p className="text-[15px] leading-[1.75] sm:text-[17px]" style={{ color: L_MUTED }}>
              Operators move from product cleanup to channel-ready exports without leaving the app: invoices, master sheets, images, review blockers, and XLSX files stay connected.
            </p>
          </div>
          <TemplateVisual />
        </div>
      </section>

      <IntegrationsSection />

      <section id="cta" className="relative overflow-hidden" style={{ background: '#081008', borderTop: `1px solid ${BORDER}` }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(120deg, rgba(197,241,53,0.13), transparent 38%, rgba(255,255,255,0.04))' }} />
        <div className="relative mx-auto grid max-w-[1160px] gap-10 px-5 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1fr_0.76fr] lg:items-center">
          <div>
            <SectionLabel label="Early access" />
            <h2 className="mt-6 max-w-[760px] text-[clamp(34px,6vw,76px)] font-bold leading-[0.98] text-white" style={{ fontFamily: D }}>
              Show us the SKU workflow slowing your team down.
            </h2>
            <p className="mt-5 max-w-[560px] text-[16px] leading-[1.75]" style={{ color: SOFT }}>
              We will map the inputs, build the agent workflow, and make it repeatable enough for your team to run every week.
            </p>
          </div>
          <div className="rounded-lg border p-4" style={{ borderColor: BORDER, background: GLASS, backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
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
          </div>
        </div>
      </section>
    </main>
  )
}
