export const NAV_LINKS = [
  { label: 'Product', href: '#product-flow' },
  { label: 'Enrichment', href: '#enrichment' },
  { label: 'Integrations', href: '#integrations' },
]

export const USE_CASE_LINKS = [
  { label: 'Listing Ops', href: '/use-cases/listing-ops', detail: 'Generate marketplace files' },
  { label: 'Company Brain', href: '/use-cases/company-brain', detail: 'Ask sales and stock' },
  { label: 'Inventory', href: '/use-cases/inventory', detail: 'Read the channel ledger' },
  { label: 'Approvals', href: '/use-cases/approvals', detail: 'Review agent work' },
  { label: 'Marketplace files', href: '/use-cases/marketplace-files', detail: 'Invoice to XLSX' },
]

export const HOME_USE_CASES = [
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

export const ENRICHMENT_ROWS = [
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

export const PRODUCT_FLOW_TABS = [
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
      ['$42K', 'PO value'],
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
      ['Procurement Agent', 'Draft $42K PO', 'Review'],
      ['Merchandising Agent', 'Move weekend budget', 'Approve'],
      ['Listing Ops', 'Add fit copy to 12 SKUs', 'Approve'],
      ['Audit trail', 'Before/after logged', 'On'],
    ],
    chart: [38, 54, 63, 73, 88],
    decision: 'Approve the low-risk actions, edit the PO draft, and keep the audit trail attached.',
    action: 'Open approval queue',
  },
]
