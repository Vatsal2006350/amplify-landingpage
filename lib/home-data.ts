export const NAV_LINKS = [
  { label: 'How it works', href: '#how-it-works' },
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

/* The interactive workbench tabs. Only the fields the workbench actually renders
   live here — the old copy blocks (title/body/command/steps/rows) were unused. */
export const PRODUCT_FLOW_TABS = [
  {
    id: 'listings',
    label: 'Listing Ops',
    eyebrow: 'Template compile',
    chart: [32, 46, 58, 79, 92],
    decision: 'Confirm the four uncertain fields, then export both marketplace files.',
    action: 'Prepare XLSX files',
  },
  {
    id: 'brain',
    label: 'Company Brain',
    eyebrow: 'Retail planning',
    chart: [44, 52, 49, 68, 81],
    decision: 'Keep price steady and shift stock toward Amazon.',
    action: 'Send to Sales Agent',
  },
  {
    id: 'forecast',
    label: 'Inventory',
    eyebrow: 'Channel ledger',
    chart: [78, 70, 61, 52, 43],
    decision: 'Draft the PO for fast movers and hold the slower color.',
    action: 'Create PO draft',
  },
  {
    id: 'actions',
    label: 'Approvals',
    eyebrow: 'Inbox',
    chart: [38, 54, 63, 73, 88],
    decision: 'Approve the low-risk actions and edit the PO draft.',
    action: 'Open approval queue',
  },
]
