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
  { label: 'Platform', href: '#platform' },
  { label: 'Product Flow', href: '#product-flow' },
  { label: 'Enrichment', href: '#enrichment' },
  { label: 'Agents', href: '#agents' },
  { label: 'Integrations', href: '#integrations' },
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

const AGENT_TABS = [
  {
    id: 'diagnosis',
    label: 'Diagnosis',
    title: 'Prioritize the SKUs that need review.',
    body: 'The Diagnosis Agent combines Shopify orders, Loop returns, Gorgias tickets, and product evidence to rank the SKUs most likely to need a fix.',
    command: 'Show SKUs with missing product attributes',
    metrics: ['12.8% return rate', '42 evidence snippets', '6 fixes pending'],
    score: 72,
    chart: [64, 46, 78, 52, 86],
    fields: [
      ['Material', 'Missing', 'review'],
      ['Closure', 'Inferred', 'ready'],
      ['Image set', 'Needs review', 'review'],
      ['Sizing note', 'Missing', 'review'],
    ],
    rows: [
      ['BR-772104-CAF', 'Missing material detail', 'High'],
      ['BR-772105-PRE', 'Image review needed', 'Med'],
      ['BR-772106-NDE', 'Size guidance missing', 'Med'],
    ],
  },
  {
    id: 'listing',
    label: 'Listings',
    title: 'Prepare listing updates with evidence.',
    body: 'The Listing Automation Agent proposes titles, bullets, attributes, tags, and channel files with a before/after diff your team can approve.',
    command: 'Create a listing update for BR-772104-CAF',
    metrics: ['Title diff', 'Attribute fill', 'Size guidance'],
    score: 88,
    chart: [48, 62, 74, 86, 92],
    fields: [
      ['Title', 'Updated', 'ready'],
      ['Tags', 'Updated', 'ready'],
      ['Size note', 'Added', 'ready'],
      ['Product image', 'Selected', 'ready'],
    ],
    rows: [
      ['body_html', 'Add sizing guidance', 'Ready'],
      ['tags', 'ankle boot, leather', 'Ready'],
      ['metafield:size_note', 'EU boot sizing', 'Ready'],
    ],
  },
  {
    id: 'inventory',
    label: 'Inventory',
    title: 'Turn stock, velocity, and lead time into restock decisions.',
    body: 'The Inventory Agent flags low stock, dead stock, overstock, and replenishment needs using category-level context and supplier lead times.',
    command: 'Build restock suggestions with 21 day lead time',
    metrics: ['18 days cover', '1,240 units', 'Manager approval'],
    score: 61,
    chart: [88, 76, 52, 38, 42],
    fields: [
      ['Days cover', '18 days', 'review'],
      ['Sales velocity', 'Rising', 'ready'],
      ['Lead time', '21 days', 'ready'],
      ['PO quantity', '320 units', 'review'],
    ],
    rows: [
      ['BR-772104-CAF', 'Restock 320', 'Approve'],
      ['BR-9011-CRM', 'Hold', 'Healthy'],
      ['BR-772105-PRE', 'Markdown risk', 'Review'],
    ],
  },
  {
    id: 'purchase',
    label: 'PO Creator',
    title: 'Draft purchase orders from forecast and inventory signals.',
    body: 'The Purchase Order Creator turns sell-through, days cover, supplier lead time, and budget limits into a PO draft for manager approval.',
    command: 'Create a PO draft for Beira Rio carryover styles',
    metrics: ['AED 42K draft', '18 day lead time', 'Manager approval'],
    score: 83,
    chart: [44, 58, 63, 71, 87],
    fields: [
      ['Supplier', 'Beira Rio', 'ready'],
      ['Buy window', 'Next 30 days', 'ready'],
      ['Budget check', 'Within limit', 'ready'],
      ['PO quantity', '1,240 units', 'review'],
    ],
    rows: [
      ['BR-772104-CAF', 'Add 320 units', 'Draft'],
      ['BR-9011-CRM', 'Add 180 units', 'Draft'],
      ['BR-772105-PRE', 'Hold buy', 'Review'],
    ],
  },
  {
    id: 'sales',
    label: 'Sales',
    title: 'Find revenue moves without living in pivot tables.',
    body: 'The Sales Agent reads channel sales, margin, returns, and stock position so merchandising can act on the right SKUs first.',
    command: 'Explain last week sales movement by channel',
    metrics: ['Amazon +18%', 'Noon -7%', '3 actions ready'],
    score: 76,
    chart: [52, 68, 61, 74, 82],
    fields: [
      ['Top channel', 'Amazon', 'ready'],
      ['Slow channel', 'Noon', 'review'],
      ['Margin', 'Protected', 'ready'],
      ['Action', 'Bundle test', 'review'],
    ],
    rows: [
      ['BR-772104-CAF', 'Feature on Amazon', 'Approve'],
      ['BR-772106-NDE', 'Bundle with care kit', 'Draft'],
      ['BR-772105-PRE', 'Move budget from Noon', 'Review'],
    ],
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
    label: 'Listing automation',
    eyebrow: 'Weekly catalog run',
    title: 'Create marketplace-ready listings from the files your team already uses.',
    body: 'Supplier invoices, master sheets, product images, and marketplace templates become clean SKU rows with the right attributes filled in.',
    command: 'Build Namshi and 6th Street files for the new Beira Rio drop',
    metrics: [
      ['184', 'SKU rows created'],
      ['37', 'attributes filled'],
      ['4', 'manager checks'],
    ],
    steps: ['Read supplier PI', 'Normalize sizes and colors', 'Match images to SKUs', 'Fill marketplace fields', 'Queue manager review'],
    rows: [
      ['Supplier PI', 'Style, color, sizes, quantities', 'Synced'],
      ['Image folder', '5 URLs matched to BR-772104', 'Ready'],
      ['Namshi template', 'Closure, toe, heel, material', 'Mapped'],
      ['6th Street file', 'Variants and image URLs', 'Mapped'],
      ['Manager review', '4 fields need confirmation', 'Open'],
    ],
    chart: [32, 46, 58, 79, 92],
    decision: 'Export after confirming sole type and secondary color for 4 SKUs.',
    action: 'Prepare channel XLSX files',
  },
  {
    id: 'brain',
    label: 'Company Brain',
    eyebrow: 'Analysis workspace',
    title: 'Ask the company brain what changed and why.',
    body: 'Sales, returns, stock, pricing, product data, and channel history sit in one operator-friendly view instead of scattered spreadsheets.',
    command: 'Explain last week sales by channel, category, and SKU',
    metrics: [
      ['+18%', 'Amazon footwear sales'],
      ['-7%', 'Noon conversion'],
      ['12', 'SKUs driving change'],
    ],
    steps: ['Pull sales by channel', 'Group by SKU and size', 'Compare to inventory', 'Attach return reasons', 'Summarize the movement'],
    rows: [
      ['Pivot: channel x category', 'Amazon footwear up 18%', 'Growth'],
      ['Pivot: SKU x size', 'EU 38 and 39 sold through fastest', 'Watch'],
      ['Returns overlay', 'BR-772104 fit notes missing', 'Fix'],
      ['Margin view', 'Markdown not needed on top sellers', 'Hold'],
      ['Operator answer', 'Push stock to Amazon before weekend', 'Ready'],
    ],
    chart: [44, 52, 49, 68, 81],
    decision: 'Keep price steady, move available inventory toward Amazon, and fix fit copy before the weekend campaign.',
    action: 'Send actions to Sales Agent',
  },
  {
    id: 'forecast',
    label: 'Forecasting',
    eyebrow: 'What to buy next',
    title: 'Turn sales velocity into a buy plan.',
    body: 'Amplify forecasts demand using recent sales, days of cover, supplier lead time, return risk, and the stock already sitting in each channel.',
    command: 'Forecast the next buy with 21 day supplier lead time',
    metrics: [
      ['18', 'days cover'],
      ['1,240', 'units suggested'],
      ['AED 42K', 'PO value'],
    ],
    steps: ['Calculate sell-through', 'Check days cover', 'Apply supplier lead time', 'Protect margin', 'Draft buy plan'],
    rows: [
      ['BR-772104-CAF', '320 units, high confidence', 'Buy'],
      ['BR-9011-CRM', '180 units, steady carryover', 'Buy'],
      ['BR-772105-PRE', 'Hold due to slow size curve', 'Hold'],
      ['BR-772106-NDE', 'Bundle test before reorder', 'Test'],
      ['Budget guardrail', 'Within monthly buy limit', 'Passed'],
    ],
    chart: [78, 70, 61, 52, 43],
    decision: 'Draft the PO for fast-moving carryover styles and hold the slower color until the bundle test finishes.',
    action: 'Create purchase order draft',
  },
  {
    id: 'actions',
    label: 'Agent actions',
    eyebrow: 'Approval queue',
    title: 'Approve the work before agents touch live systems.',
    body: 'Inventory, purchase order, listing, and sales agents prepare actions with evidence, impact, and rollback notes so operators stay in control.',
    command: 'Show every action waiting on merchandising approval',
    metrics: [
      ['9', 'actions queued'],
      ['3', 'agents ready'],
      ['0', 'live writes without approval'],
    ],
    steps: ['Review evidence', 'Check impact', 'Approve or edit', 'Apply to channel', 'Measure result'],
    rows: [
      ['Inventory Agent', 'Shift 220 units to Amazon FBA', 'Approve'],
      ['PO Creator', 'Draft Beira Rio PO for AED 42K', 'Review'],
      ['Sales Agent', 'Move Noon budget to Amazon weekend push', 'Approve'],
      ['Listing Agent', 'Add fit guidance to 12 SKUs', 'Approve'],
      ['Audit trail', 'Every change logged with before/after', 'On'],
    ],
    chart: [38, 54, 63, 73, 88],
    decision: 'Approve three low-risk actions now, edit the PO draft, and keep every write attached to a before/after record.',
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
  const chartPath = flow.chart
    .map((value, index) => {
      const x = 12 + index * 46
      const y = 102 - value * 0.72
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  return (
    <div className="overflow-hidden rounded-lg border" style={{ borderColor: BORDER, background: '#101010', boxShadow: '0 34px 110px rgba(0,0,0,0.34)' }}>
      <div className="border-b px-4 py-3 sm:px-5" style={{ borderColor: BORDER }}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Logo size={30} />
            <div>
              <div className="text-[15px] font-semibold text-white" style={{ fontFamily: D }}>Amplify operator workspace</div>
              <div className="text-[10px] uppercase" style={{ color: MUTED, fontFamily: M }}>Catalog, sales, inventory, and approvals</div>
            </div>
          </div>
          <div className="rounded-md px-2.5 py-1 text-[10px] uppercase" style={{ background: 'rgba(197,241,53,0.12)', color: ACCENT, fontFamily: M }}>
            Approval-first agents
          </div>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCT_FLOW_TABS.map((item) => {
            const selected = item.id === flow.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                className="rounded-lg border px-3 py-3 text-left transition-transform hover:-translate-y-0.5"
                style={{ borderColor: selected ? 'rgba(197,241,53,0.4)' : BORDER, background: selected ? 'rgba(197,241,53,0.11)' : 'rgba(255,255,255,0.045)' }}
              >
                <div className="text-[10px] uppercase" style={{ color: selected ? ACCENT : MUTED, fontFamily: M }}>{item.eyebrow}</div>
                <div className="mt-1 text-[15px] font-semibold text-white" style={{ fontFamily: D }}>{item.label}</div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-[0.38fr_0.62fr]">
        <aside className="border-b p-4 sm:p-5 lg:border-b-0 lg:border-r" style={{ borderColor: BORDER }}>
          <div className="overflow-hidden rounded-lg border bg-white p-2" style={{ borderColor: BORDER }}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[#eef1ea]">
              <img src="/images/products/customer-shoe-boot.jpg" alt="Product in Amplify workspace" className="h-full w-full object-cover" />
              <div className="absolute bottom-3 left-3 rounded-md px-2 py-1 text-[10px] font-bold uppercase" style={{ background: ACCENT, color: BASE, fontFamily: M }}>
                Active SKU
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-lg border p-4" style={{ borderColor: 'rgba(197,241,53,0.3)', background: 'rgba(197,241,53,0.08)' }}>
            <div className="mb-2 flex items-center gap-2 text-[10px] uppercase" style={{ color: ACCENT, fontFamily: M }}>
              <SparkIcon />
              Operator request
            </div>
            <p className="text-[18px] font-semibold leading-snug text-white" style={{ fontFamily: D }}>{flow.command}</p>
          </div>

          <div className="mt-4 rounded-lg border p-4" style={{ borderColor: BORDER, background: 'rgba(255,255,255,0.04)' }}>
            <div className="mb-4 text-[10px] uppercase" style={{ color: MUTED, fontFamily: M }}>Run timeline</div>
            <div className="space-y-3">
              {flow.steps.map((step, index) => (
                <div key={step} className="grid grid-cols-[24px_1fr] gap-3">
                  <div className="flex flex-col items-center">
                    <span className="grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold" style={{ background: index < 4 ? ACCENT : 'rgba(255,255,255,0.08)', color: index < 4 ? BASE : SOFT, fontFamily: M }}>
                      {index + 1}
                    </span>
                    {index < flow.steps.length - 1 && <span className="mt-1 h-5 w-px" style={{ background: index < 3 ? 'rgba(197,241,53,0.42)' : BORDER }} />}
                  </div>
                  <div className="pt-0.5 text-[13px] leading-snug" style={{ color: index < 4 ? '#fff' : SOFT }}>{step}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {['Shopify', 'ERP export', 'Returns', 'Supplier PI', 'Marketplace templates'].map((item) => (
              <span key={item} className="rounded-md border px-2 py-1.5 text-[10px] uppercase" style={{ borderColor: BORDER, color: SOFT, fontFamily: M }}>
                {item}
              </span>
            ))}
          </div>
        </aside>

        <div className="p-3 sm:p-5">
          <div className="max-h-[680px] overflow-y-auto pr-1">
            <div className="rounded-lg border p-4 sm:p-5" style={{ borderColor: BORDER, background: 'rgba(255,255,255,0.035)' }}>
              <div className="text-[10px] uppercase" style={{ color: ACCENT, fontFamily: M }}>{flow.eyebrow}</div>
              <h3 className="mt-2 max-w-[680px] text-[32px] font-semibold leading-[1.04] text-white sm:text-[42px]" style={{ fontFamily: D }}>{flow.title}</h3>
              <p className="mt-4 max-w-[680px] text-[15px] leading-[1.7]" style={{ color: SOFT }}>{flow.body}</p>

              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                {flow.metrics.map(([value, label]) => (
                  <div key={label} className="rounded-lg border p-4" style={{ borderColor: BORDER, background: 'rgba(0,0,0,0.2)' }}>
                    <div className="text-[28px] font-bold text-white" style={{ fontFamily: D }}>{value}</div>
                    <div className="mt-1 text-[10px] uppercase leading-tight" style={{ color: MUTED, fontFamily: M }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 grid gap-3 xl:grid-cols-[0.92fr_1.08fr]">
              <div className="rounded-lg border p-4" style={{ borderColor: BORDER, background: 'rgba(255,255,255,0.035)' }}>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="text-[10px] uppercase" style={{ color: MUTED, fontFamily: M }}>Analysis result</div>
                  <div className="rounded-md px-2 py-1 text-[10px] uppercase" style={{ background: 'rgba(197,241,53,0.1)', color: ACCENT, fontFamily: M }}>Live model</div>
                </div>
                <svg viewBox="0 0 210 112" className="h-[150px] w-full" aria-hidden="true">
                  <defs>
                    <linearGradient id={`flowFill-${flow.id}`} x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#C5F135" stopOpacity="0.32" />
                      <stop offset="100%" stopColor="#C5F135" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  {[0, 1, 2].map((line) => (
                    <line key={line} x1="0" x2="210" y1={24 + line * 30} y2={24 + line * 30} stroke="rgba(255,255,255,0.08)" />
                  ))}
                  <path d={`${chartPath} L 196 106 L 12 106 Z`} fill={`url(#flowFill-${flow.id})`} />
                  <path d={chartPath} fill="none" stroke={ACCENT} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  {flow.chart.map((value, index) => (
                    <circle key={`${flow.id}-${index}`} cx={12 + index * 46} cy={102 - value * 0.72} r="4" fill={ACCENT} />
                  ))}
                </svg>
                <div className="mt-3 rounded-lg border p-3" style={{ borderColor: 'rgba(197,241,53,0.28)', background: 'rgba(197,241,53,0.08)' }}>
                  <div className="mb-1 text-[10px] uppercase" style={{ color: ACCENT, fontFamily: M }}>Recommended decision</div>
                  <p className="text-[14px] leading-[1.6] text-white">{flow.decision}</p>
                </div>
              </div>

              <div className="rounded-lg border p-4" style={{ borderColor: BORDER, background: 'rgba(255,255,255,0.035)' }}>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="text-[10px] uppercase" style={{ color: MUTED, fontFamily: M }}>Decision queue</div>
                  <div className="text-[10px] uppercase" style={{ color: ACCENT, fontFamily: M }}>{flow.action}</div>
                </div>
                <div className="overflow-hidden rounded-lg border" style={{ borderColor: BORDER }}>
                  {flow.rows.map((row, index) => {
                    const state = row[2]
                    const highlighted = ['Ready', 'Mapped', 'Growth', 'Buy', 'Approve', 'Passed', 'On'].includes(state)
                    return (
                      <div key={row.join('-')} className="grid grid-cols-12 gap-2 border-b px-3 py-3 text-[11px] last:border-b-0" style={{ borderColor: BORDER, background: index === 0 ? 'rgba(197,241,53,0.08)' : 'rgba(255,255,255,0.035)' }}>
                        <span className="col-span-4 truncate font-semibold text-white">{row[0]}</span>
                        <span className="col-span-5 truncate" style={{ color: SOFT }}>{row[1]}</span>
                        <span className="col-span-3 text-right" style={{ color: highlighted ? ACCENT : SOFT, fontFamily: M }}>{state}</span>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {['Evidence attached', 'Impact checked', 'Rollback notes'].map((item) => (
                    <div key={item} className="rounded-md border px-3 py-2 text-[10px] uppercase" style={{ borderColor: BORDER, color: SOFT, fontFamily: M }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {[
                ['Operator keeps control', 'Every action is a draft until the team approves it.'],
                ['Company memory stays attached', 'Decisions use product, channel, sales, returns, and supplier context.'],
                ['Weekly work gets repeatable', 'The same flow can run for the next drop, brand, or marketplace.'],
              ].map(([title, body]) => (
                <div key={title} className="rounded-lg border p-4" style={{ borderColor: BORDER, background: 'rgba(0,0,0,0.18)' }}>
                  <h4 className="text-[15px] font-semibold text-white" style={{ fontFamily: D }}>{title}</h4>
                  <p className="mt-2 text-[12px] leading-[1.6]" style={{ color: SOFT }}>{body}</p>
                </div>
              ))}
            </div>
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

function AgentTabs() {
  const [active, setActive] = useState('listing')
  const tab = AGENT_TABS.find((item) => item.id === active) || AGENT_TABS[1]
  const chartPath = tab.chart
    .map((value, index) => {
      const x = 8 + index * 46
      const y = 94 - value * 0.72
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  return (
    <div className="grid gap-6 lg:grid-cols-[0.52fr_1.48fr] lg:items-start">
      <div className="grid gap-2">
        {AGENT_TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            className="rounded-lg border p-4 text-left transition-transform hover:-translate-y-0.5"
            style={{ borderColor: item.id === active ? 'rgba(197,241,53,0.36)' : BORDER, background: item.id === active ? 'rgba(197,241,53,0.1)' : GLASS }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-[18px] font-semibold text-white" style={{ fontFamily: D }}>{item.label}</div>
              <span className="text-[10px] uppercase" style={{ color: item.id === active ? ACCENT : MUTED, fontFamily: M }}>Agent</span>
            </div>
            <p className="mt-2 text-[13px] leading-[1.55]" style={{ color: SOFT }}>{item.title}</p>
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border" style={{ borderColor: BORDER, background: '#151515', boxShadow: '0 30px 90px rgba(0,0,0,0.3)' }}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4" style={{ borderColor: BORDER }}>
          <div className="flex items-center gap-3">
            <Logo size={28} />
            <div>
              <div className="text-[15px] font-semibold text-white" style={{ fontFamily: D }}>{tab.label} Agent</div>
              <div className="text-[10px] uppercase" style={{ color: MUTED, fontFamily: M }}>Product operations workspace</div>
            </div>
          </div>
          <div className="rounded-md px-2.5 py-1 text-[10px] uppercase" style={{ background: 'rgba(197,241,53,0.12)', color: ACCENT, fontFamily: M }}>
            Approval required
          </div>
        </div>

        <div className="grid gap-0 xl:grid-cols-[0.72fr_1.28fr]">
          <div className="border-b p-5 xl:border-b-0 xl:border-r" style={{ borderColor: BORDER }}>
            <div className="grid gap-4 md:grid-cols-[160px_1fr] xl:grid-cols-1">
              <div className="overflow-hidden rounded-lg border bg-white p-2" style={{ borderColor: BORDER }}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[#eef1ea]">
                  <img src="/images/products/customer-shoe-boot.jpg" alt="Men's leather lace-up ankle boot" className="h-full w-full object-cover" />
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase" style={{ color: MUTED, fontFamily: M }}>Active SKU</div>
                <h3 className="mt-1 text-[28px] font-semibold leading-[1.05] text-white" style={{ fontFamily: D }}>BR-772104-CAF</h3>
                <p className="mt-2 text-[13px] leading-[1.6]" style={{ color: SOFT }}>
                  Men’s Leather Lace-Up Ankle Boot. Source invoice, image set, channel rules, and approval history are attached.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg border p-4" style={{ borderColor: 'rgba(197,241,53,0.3)', background: 'rgba(197,241,53,0.08)' }}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="text-[10px] uppercase" style={{ color: ACCENT, fontFamily: M }}>Agent instruction</div>
                <SparkIcon />
              </div>
              <div className="text-[16px] font-semibold text-white" style={{ fontFamily: D }}>{tab.command}</div>
            </div>

            <div className="mt-4 grid gap-2">
              {tab.fields.map(([field, value, state]) => (
                <div key={field} className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5" style={{ borderColor: BORDER, background: 'rgba(255,255,255,0.045)' }}>
                  <div>
                    <div className="text-[10px] uppercase" style={{ color: MUTED, fontFamily: M }}>{field}</div>
                    <div className="mt-0.5 text-[13px] font-semibold text-white" style={{ fontFamily: D }}>{value}</div>
                  </div>
                  <span className="rounded-md px-2 py-1 text-[9px] uppercase" style={{ background: state === 'ready' ? 'rgba(197,241,53,0.12)' : 'rgba(255,255,255,0.08)', color: state === 'ready' ? ACCENT : SOFT, fontFamily: M }}>
                    {state}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5">
            <div className="grid gap-3 md:grid-cols-[1fr_0.88fr]">
              <div className="rounded-lg border p-4" style={{ borderColor: BORDER, background: 'rgba(255,255,255,0.035)' }}>
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-[10px] uppercase" style={{ color: MUTED, fontFamily: M }}>Attribute readiness</div>
                  <div className="rounded-md px-2 py-1 text-[10px] uppercase" style={{ background: 'rgba(197,241,53,0.1)', color: ACCENT, fontFamily: M }}>Live run</div>
                </div>
                <div className="grid items-center gap-4 sm:grid-cols-[104px_1fr]">
                  <div className="relative h-[104px] w-[104px]">
                    <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
                      <circle cx="60" cy="60" r="44" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
                      <circle cx="60" cy="60" r="44" fill="none" stroke={ACCENT} strokeWidth="12" pathLength="100" strokeDasharray={`${tab.score} 100`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[24px] font-semibold text-white" style={{ fontFamily: D }}>{tab.score}%</span>
                      <span className="text-[9px] uppercase" style={{ color: MUTED, fontFamily: M }}>Ready</span>
                    </div>
                  </div>
                  <svg viewBox="0 0 200 100" className="h-[104px] w-full" aria-hidden="true">
                    <defs>
                      <linearGradient id={`agentFill-${tab.id}`} x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#C5F135" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="#C5F135" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>
                    <path d={`${chartPath} L 192 96 L 8 96 Z`} fill={`url(#agentFill-${tab.id})`} />
                    <path d={chartPath} fill="none" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    {tab.chart.map((value, index) => (
                      <circle key={`${tab.id}-${index}`} cx={8 + index * 46} cy={94 - value * 0.72} r="3.5" fill={ACCENT} />
                    ))}
                    {[0, 1, 2].map((line) => (
                      <line key={line} x1="0" x2="200" y1={24 + line * 28} y2={24 + line * 28} stroke="rgba(255,255,255,0.08)" />
                    ))}
                  </svg>
                </div>
              </div>

              <div className="rounded-lg border p-4" style={{ borderColor: BORDER, background: 'rgba(255,255,255,0.035)' }}>
                <div className="mb-3 text-[10px] uppercase" style={{ color: MUTED, fontFamily: M }}>Evidence sources</div>
                <div className="space-y-2">
                  {['Supplier invoice parsed', 'Image set reviewed', 'Return evidence checked', 'Channel template loaded'].map((item, index) => (
                    <div key={item} className="flex items-center gap-2 text-[12px]" style={{ color: SOFT }}>
                      <span className="h-2 w-2 rounded-full" style={{ background: index < 3 ? ACCENT : 'rgba(255,255,255,0.24)' }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-4">
              {['Invoice', 'Images', 'Channel rules', 'Approval'].map((stage, index) => (
                <div key={stage} className="rounded-lg border px-3 py-3" style={{ borderColor: index < 3 ? 'rgba(197,241,53,0.22)' : BORDER, background: index < 3 ? 'rgba(197,241,53,0.07)' : 'rgba(255,255,255,0.035)' }}>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: index < 3 ? ACCENT : 'rgba(255,255,255,0.24)' }} />
                    <span className="text-[9px] uppercase" style={{ color: index < 3 ? ACCENT : MUTED, fontFamily: M }}>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="text-[12px] font-semibold text-white" style={{ fontFamily: D }}>{stage}</div>
                </div>
              ))}
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-[1fr_0.92fr]">
              <div className="rounded-lg border p-4" style={{ borderColor: BORDER, background: 'rgba(0,0,0,0.18)' }}>
                <div className="mb-3 text-[10px] uppercase" style={{ color: MUTED, fontFamily: M }}>Proposed update</div>
                <div className="grid gap-2">
                  {[
                    ['Title', 'Men Shoes Brown', 'Men’s Leather Lace-Up Ankle Boot - Brown'],
                    ['Closure', '-', 'Lace-up closure'],
                    ['Material', 'Synthetic', 'Leather upper, rubber outsole'],
                  ].map(([field, before, after]) => (
                    <div key={field} className="rounded-md border p-3" style={{ borderColor: BORDER, background: 'rgba(255,255,255,0.035)' }}>
                      <div className="mb-2 text-[10px] uppercase" style={{ color: MUTED, fontFamily: M }}>{field}</div>
                      <div className="grid gap-2 text-[12px] sm:grid-cols-2">
                        <div className="rounded-md px-2 py-2" style={{ background: 'rgba(255,255,255,0.05)', color: MUTED }}>{before}</div>
                        <div className="rounded-md px-2 py-2" style={{ background: 'rgba(197,241,53,0.1)', color: '#fff' }}>{after}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border p-4" style={{ borderColor: BORDER, background: 'rgba(0,0,0,0.18)' }}>
                <div className="mb-3 text-[10px] uppercase" style={{ color: MUTED, fontFamily: M }}>Output queue</div>
                <div className="overflow-hidden rounded-lg border" style={{ borderColor: BORDER }}>
                  {tab.rows.map((row, index) => (
                    <div key={row.join('-')} className="grid grid-cols-12 gap-3 border-b px-3 py-3 text-[11px] last:border-b-0" style={{ borderColor: BORDER, background: index === 0 ? 'rgba(197,241,53,0.08)' : 'rgba(255,255,255,0.035)' }}>
                      <span className="col-span-3 truncate font-semibold text-white">{row[0]}</span>
                      <span className="col-span-6 truncate" style={{ color: SOFT }}>{row[1]}</span>
                      <span className="col-span-3 text-right" style={{ color: ACCENT, fontFamily: M }}>{row[2]}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {tab.metrics.map((metric) => (
                    <div key={metric} className="rounded-md border px-2 py-2 text-[9px] uppercase" style={{ borderColor: BORDER, color: SOFT, fontFamily: M }}>
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TemplateVisual() {
  return (
    <div className="rounded-lg border bg-white p-4" style={{ borderColor: L_BORDER, boxShadow: '0 24px 70px rgba(0,0,0,0.11)' }}>
      <TransformationFlow />
      <div className="grid gap-3 md:grid-cols-3">
        {WORKFLOW_CARDS.map((card, index) => (
          <article key={card.title} className="rounded-lg border p-4" style={{ borderColor: index === 1 ? 'rgba(26,122,46,0.25)' : L_BORDER, background: index === 1 ? 'rgba(197,241,53,0.11)' : L_SURFACE }}>
            <div className="mb-5 flex items-center justify-between">
              <span className="text-[10px] uppercase" style={{ color: index === 1 ? '#1a7a2e' : L_MUTED, fontFamily: M }}>{String(index + 1).padStart(2, '0')}</span>
              <span className="h-2 w-2 rounded-full" style={{ background: index <= 1 ? '#1a7a2e' : 'rgba(0,0,0,0.18)' }} />
            </div>
            <h3 className="text-[19px] font-semibold" style={{ color: L_TEXT, fontFamily: D }}>{card.title}</h3>
            <p className="mt-3 min-h-[66px] text-[13px] leading-[1.6]" style={{ color: L_MUTED }}>{card.body}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {card.tags.map((tag) => (
                <span key={tag} className="rounded-md border px-2 py-1 text-[9px] uppercase" style={{ borderColor: L_BORDER, color: L_MUTED, fontFamily: M }}>
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <ImageEnhancementVisual />
      <div className="mt-4 overflow-hidden rounded-lg border" style={{ borderColor: L_BORDER }}>
        <div className="grid grid-cols-12 bg-[#0d1209] px-3 py-2 text-[9px] uppercase" style={{ color: ACCENT, fontFamily: M }}>
          <span className="col-span-2">SKU</span>
          <span className="col-span-2">Image</span>
          <span className="col-span-2">Closure</span>
          <span className="col-span-2">Toe</span>
          <span className="col-span-2">Heel</span>
          <span className="col-span-2 text-right">Status</span>
        </div>
        {[
          ['BR-772104-CAF', '5 URLs', 'Lace-up', 'Round', 'Low', 'Ready'],
          ['BR-772105-PRE', '5 URLs', 'Lace-up', 'Round', 'Low', 'Ready'],
          ['BR-772106-NDE', '4 URLs', 'Slip-on', 'Round', 'Flat', 'Review'],
        ].map((row) => (
          <div key={row[0]} className="grid grid-cols-12 border-t px-3 py-3 text-[11px]" style={{ borderColor: L_BORDER, color: L_TEXT }}>
            {row.map((cell, index) => (
              <span key={`${row[0]}-${cell}`} className={`${index === 0 ? 'col-span-2 font-semibold' : 'col-span-2'} ${index === row.length - 1 ? 'text-right' : ''}`} style={{ color: index === row.length - 1 ? '#1a7a2e' : undefined, fontFamily: index === row.length - 1 ? M : undefined }}>
                {cell}
              </span>
            ))}
          </div>
        ))}
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
            Compact stories from operators using Amplify to connect catalog, stock, training, ads, supplier files, and marketplace outputs.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <article className="relative min-h-[430px] overflow-hidden rounded-lg border p-5 sm:p-6" style={{ borderColor: L_BORDER, background: '#ffffff', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
            <div className="absolute inset-x-0 top-0 h-28" style={{ background: 'linear-gradient(120deg, rgba(197,241,53,0.26), rgba(255,255,255,0), rgba(26,122,46,0.1))' }} />
            <div className="relative flex h-full min-h-[382px] flex-col justify-between">
              <div>
                <div className="mb-5 inline-flex rounded-lg px-3 py-2 text-[18px] font-black" style={{ background: L_SURFACE, color: L_TEXT, fontFamily: D }}>PMUK</div>
                <div className="mb-5 text-[10px] uppercase" style={{ color: '#2f7c43', fontFamily: M }}>Food ecommerce ops</div>
                <h3 className="text-[28px] font-semibold leading-[1.08]" style={{ color: L_TEXT, fontFamily: D }}>
                  Inventory, bundle SKUs, and AI ad actions in one queue.
                </h3>
                <p className="mt-4 text-[14px] leading-[1.65]" style={{ color: L_MUTED }}>
                  PMUK uses Amplify to keep stock decisions, bundle generation, and ad recommendations moving with manager approval.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-8">
                {['Inventory management', 'Bundle SKU generator', 'AI ads management'].map((item) => (
                  <span key={item} className="rounded-md px-2.5 py-1 text-[10px] font-bold uppercase" style={{ background: ACCENT, color: BASE, fontFamily: M }}>{item}</span>
                ))}
              </div>
            </div>
          </article>

          <article
            className="relative min-h-[430px] overflow-hidden rounded-lg border p-5 sm:p-6"
            style={{
              borderColor: 'rgba(0,0,0,0.12)',
              backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.72)), url("/images/customers/shoemart-store.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 24px 68px rgba(0,0,0,0.2)',
            }}
          >
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.22) 34%, rgba(0,0,0,0.86))' }} />
            <div className="relative flex h-full min-h-[382px] flex-col justify-between">
              <div>
                <div className="inline-flex rounded-lg bg-white px-4 py-2 text-[20px] font-black tracking-[0.16em]" style={{ color: L_TEXT, fontFamily: D }}>
                  SHOEMART
                </div>
                <div className="mt-4 text-[10px] uppercase" style={{ color: 'rgba(255,255,255,0.72)', fontFamily: M }}>Retail training enablement</div>
              </div>
              <div>
                <div className="mb-5 flex flex-wrap gap-2">
                  {['Tutorial videos', 'Sales associate training', 'Launch readiness'].map((item) => (
                    <span key={item} className="rounded-md px-2.5 py-1 text-[10px] font-bold uppercase" style={{ background: ACCENT, color: BASE, fontFamily: M }}>
                      {item}
                    </span>
                  ))}
                </div>
                <p className="text-[25px] font-semibold leading-[1.14] text-white" style={{ fontFamily: D }}>
                  Shoe Mart turns product knowledge into training videos and store-ready selling guidance.
                </p>
                <p className="mt-4 text-[13px] leading-[1.65]" style={{ color: 'rgba(255,255,255,0.72)' }}>
                  Launch notes, product stories, and retail SOPs become repeatable tutorials for sales associates across footwear teams.
                </p>
              </div>
            </div>
          </article>

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
                  Distributed footwear catalog, stock, and listing work without rebuilding every sheet.
                </h3>
                <p className="mt-4 text-[13px] leading-[1.65]" style={{ color: 'rgba(255,255,255,0.68)' }}>
                  Geoomnii organizes Beira Rio item masters, supplier stock slices, product images, and marketplace templates into approved outputs.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['8 Beira Rio brands', '8 online platforms', 'Approved feeds'].map((item) => (
                    <span key={item} className="rounded-md px-2.5 py-1 text-[10px] font-bold uppercase" style={{ background: ACCENT, color: BASE, fontFamily: M }}>{item}</span>
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
            {NAV_LINKS.map((link) => (
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
          </div>
        </div>
      )}

      <section className="relative overflow-hidden pt-[112px]" style={{ background: BASE }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)', backgroundSize: '54px 54px' }} />
        <div className="absolute inset-x-0 top-0 h-[760px] pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(197,241,53,0.17), transparent 34%, rgba(86,142,255,0.1) 72%, transparent)' }} />
        <div className="relative mx-auto max-w-[1180px] px-5 pb-16 sm:px-6 sm:pb-24">
          <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <a href="#enrichment" className="mb-7 inline-flex max-w-full flex-wrap items-center gap-2 rounded-lg px-3 py-2" style={{ background: 'rgba(197,241,53,0.08)', border: '1px solid rgba(197,241,53,0.2)' }}>
                <span className="shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold" style={{ background: ACCENT, color: BASE, fontFamily: M }}>NEW</span>
                <span className="min-w-0 text-[10px] uppercase leading-[1.5] sm:text-[11px]" style={{ color: SOFT, fontFamily: M }}>Listings, company brain, forecasting, agent actions</span>
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
              <SectionLabel label="Product flow" />
              <h2 className="mt-7 max-w-[720px] text-[clamp(32px,5vw,64px)] font-bold leading-[1.02] text-white" style={{ fontFamily: D }}>
                See the actual operator flow, from listing automation to approved actions.
              </h2>
            </div>
            <p className="text-[15px] leading-[1.75] sm:text-[17px]" style={{ color: SOFT }}>
              The workspace is organized around the work a brand team repeats every week: clean listings, answer sales questions, forecast what to buy, and approve agent actions.
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

      <section id="agents" className="scroll-mt-[96px]" style={{ background: BASE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="mx-auto max-w-[1160px] px-5 py-16 sm:px-6 sm:py-24">
          <div className="mb-10 max-w-[760px]">
            <SectionLabel label="Agent workspaces" />
            <h2 className="mt-7 text-[clamp(32px,5vw,64px)] font-bold leading-[1.02] text-white" style={{ fontFamily: D }}>
              Specialized agents for recurring commerce workflows.
            </h2>
            <p className="mt-5 max-w-[620px] text-[15px] leading-[1.75]" style={{ color: SOFT }}>
              Diagnosis, Listings, Inventory, PO Creator, and Sales are separate enough to feel trustworthy, but connected through the same company brain.
            </p>
          </div>
          <AgentTabs />
        </div>
      </section>

      <section style={{ background: L_BG }}>
        <div className="mx-auto max-w-[1160px] px-5 py-16 sm:px-6 sm:py-24">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <SectionLabel label="Marketplace files" tone="light" />
              <h2 className="mt-7 max-w-[700px] text-[clamp(32px,5vw,62px)] font-bold leading-[1.02]" style={{ color: L_TEXT, fontFamily: D }}>
                From invoices and product images to marketplace-ready files.
              </h2>
            </div>
            <p className="text-[15px] leading-[1.75] sm:text-[17px]" style={{ color: L_MUTED }}>
              Built from the actual Structa pipeline: supplier invoices, master sheets, SKU image albums, attribute checks, manager review, and final XLSX exports.
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
