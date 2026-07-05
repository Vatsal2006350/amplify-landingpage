export type UseCase = {
  slug: string
  label: string
  navDetail: string
  eyebrow: string
  headline: string
  summary: string
  appLabel: string
  command: string
  sources: string[]
  metrics: Array<[string, string]>
  steps: string[]
  tableTitle: string
  tableRows: Array<[string, string, string, 'Ready' | 'Review' | 'Blocked' | 'Open']>
  actions: Array<[string, string, 'Ready' | 'Review' | 'Blocked' | 'Open']>
  proof: string
}

export const USE_CASES: UseCase[] = [
  {
    slug: 'listing-ops',
    label: 'Listing Ops',
    navDetail: 'Generate marketplace files',
    eyebrow: 'Catalog operations',
    headline: 'Turn messy product files into approved channel listings.',
    summary: 'Supplier invoices, item masters, product images, and marketplace templates become clean SKU rows with evidence attached for review.',
    appLabel: 'Template compile',
    command: 'Build Namshi and 6th Street files for the new Beira Rio drop',
    sources: ['supplier_invoice.xlsx', 'master_item_sheet.xlsx', 'imgbb_album.csv', 'namshi_template.xlsx'],
    metrics: [['184', 'SKU rows'], ['37', 'fields filled'], ['4', 'checks'], ['2', 'exports']],
    steps: ['Read source files', 'Match images', 'Fill channel fields', 'Check rules', 'Queue review'],
    tableTitle: 'Generated listing rows',
    tableRows: [
      ['BR-772104-CAF', 'Leather Lace-Up Boot', 'Images mapped', 'Ready'],
      ['BR-9011-CRM', 'Carryover Sandal', 'Flat file ready', 'Ready'],
      ['BR-772105-PRE', 'Patent Mary Jane', 'Price approval', 'Review'],
      ['BR-772106-NDE', 'Comfort Mule', 'Material check', 'Review'],
    ],
    actions: [
      ['Export Namshi file', 'Closure, toe, heel, and image URLs mapped.', 'Ready'],
      ['Prepare 6th Street variant file', 'Size rows and image URLs are synced.', 'Ready'],
      ['Ask manager about material', 'Four SKUs need final material confirmation.', 'Review'],
    ],
    proof: 'Used by Geoomnii to keep Beira Rio catalog, stock, and marketplace feeds moving across online channels.',
  },
  {
    slug: 'company-brain',
    label: 'Company Brain',
    navDetail: 'Ask sales and stock',
    eyebrow: 'Retail analysis',
    headline: 'Ask what changed, why it moved, and what to do next.',
    summary: 'Sales, returns, stock, pricing, channel history, and SKU identity sit in one operator-friendly view instead of scattered pivot tables.',
    appLabel: 'Analysis workspace',
    command: 'Explain last week sales by channel, category, and SKU',
    sources: ['confirmed_sales.xlsx', 'stock_snapshot.csv', 'returns_export.csv', 'sku_master.xlsx'],
    metrics: [['45K', 'sales rows'], ['7', 'source files'], ['90', 'recommendations'], ['82', 'health score']],
    steps: ['Join SKU identity', 'Group by channel', 'Compare movement', 'Find drivers', 'Send actions'],
    tableTitle: 'Movement drivers',
    tableRows: [
      ['Amazon', '+18% footwear sales', 'Hero boots moved', 'Ready'],
      ['Noon', '-7% conversion', 'Size curve issue', 'Review'],
      ['Returns', 'Fit note missing', 'Copy fix needed', 'Open'],
      ['Margin', 'Protected', 'No markdown needed', 'Ready'],
    ],
    actions: [
      ['Send sales action', 'Shift budget toward Amazon hero styles.', 'Ready'],
      ['Fix fit copy', 'Add size guidance before the weekend campaign.', 'Ready'],
      ['Review Noon conversion', 'Check stock split and variant completeness.', 'Review'],
    ],
    proof: 'Merchandising managers can ask business questions without rebuilding a weekly MIS workbook.',
  },
  {
    slug: 'inventory',
    label: 'Inventory',
    navDetail: 'Read the channel ledger',
    eyebrow: 'Inventory planning',
    headline: 'Turn channel stock and sales velocity into buy decisions.',
    summary: 'Amplify reads stock positions, sell-through, lead times, and supplier constraints so operators can decide what to buy, hold, or move.',
    appLabel: 'Inventory ledger',
    command: 'Build restock suggestions with 21 day supplier lead time',
    sources: ['logic_erp_stock.csv', 'marketplace_stock.csv', 'confirmed_sales.xlsx', 'supplier_lead_times.xlsx'],
    metrics: [['8', 'channels'], ['1,240', 'units to buy'], ['18', 'days cover'], ['42K', 'PO draft']],
    steps: ['Read stock', 'Calculate cover', 'Check velocity', 'Apply lead time', 'Draft action'],
    tableTitle: 'Stock decisions',
    tableRows: [
      ['BR-772104-CAF', 'Amazon low stock', 'Buy 320 units', 'Review'],
      ['BR-9011-CRM', 'Healthy cover', 'Hold buy', 'Ready'],
      ['PMUK-GUSTO-120', 'Bundle demand', 'Create bundle SKU', 'Ready'],
      ['SM-TRAIN-001', 'Launch pack', 'Training ready', 'Ready'],
    ],
    actions: [
      ['Draft PO', 'AED 42K replenishment draft for Beira Rio.', 'Review'],
      ['Hold slow color', 'Size curve is below target for reorder.', 'Ready'],
      ['Push channel stock', 'Sync stock with channel caps applied.', 'Ready'],
    ],
    proof: 'PMUK-style inventory, bundle SKU, and ad-action work stays tied to manager approval.',
  },
  {
    slug: 'approvals',
    label: 'Approvals',
    navDetail: 'Review agent work',
    eyebrow: 'Human approval',
    headline: 'Let agents prepare the work, then approve before anything goes live.',
    summary: 'Every listing update, PO draft, pricing suggestion, stock push, and ad action keeps evidence, diffs, and rollback context attached.',
    appLabel: 'Approval inbox',
    command: 'Review pending listing, inventory, and ad actions',
    sources: ['approval_log.json', 'listing_diffs.xlsx', 'po_drafts.xlsx', 'ad_actions.csv'],
    metrics: [['17', 'needs review'], ['12', 'listing blockers'], ['3', 'pricing blockers'], ['2', 'PO drafts']],
    steps: ['Review evidence', 'Compare diff', 'Edit if needed', 'Approve action', 'Log outcome'],
    tableTitle: 'Pending decisions',
    tableRows: [
      ['Listing repair', 'BR-772105-PRE', 'Target price approval', 'Ready'],
      ['Pricing exception', 'BR-9011-CRM', 'Keep price steady', 'Review'],
      ['Replenishment RFQ', 'BR-772104-CAF', 'PO draft ready', 'Review'],
      ['AI ads action', 'PMUK-GUSTO-120', 'Bundle ad copy', 'Ready'],
    ],
    actions: [
      ['Approve listing repair', 'Centrepoint export can ship after target price.', 'Ready'],
      ['Send PO draft', 'Inventory agent prepared the buy recommendation.', 'Review'],
      ['Publish ad action', 'Bundle copy and SKU generator output ready.', 'Ready'],
    ],
    proof: 'Non-technical operators stay in control while agents do the repetitive prep.',
  },
  {
    slug: 'marketplace-files',
    label: 'Marketplace files',
    navDetail: 'Invoice to XLSX',
    eyebrow: 'Channel-ready exports',
    headline: 'Marketplace files inside the same workspace.',
    summary: 'Operators move from product cleanup to channel-ready exports without leaving the app: invoices, master sheets, images, review blockers, and XLSX files stay connected.',
    appLabel: 'Marketplace files',
    command: 'Convert supplier invoice and product images into channel-ready XLSX exports',
    sources: ['supplier_invoice.xlsx', 'master_item_sheet.xlsx', 'imgbb_album.csv', 'centrepoint_template.xlsx'],
    metrics: [['4', 'platforms'], ['184', 'rows mapped'], ['3', 'ready files'], ['1', 'review blocker']],
    steps: ['Expand invoice rows', 'Map SKU images', 'Fill UDA fields', 'Validate template', 'Export XLSX'],
    tableTitle: 'Platform outputs',
    tableRows: [
      ['Namshi', 'Closure, toe, heel, images', 'Ready XLSX', 'Ready'],
      ['6th Street', 'Variant template', 'Ready XLSX', 'Ready'],
      ['Centrepoint', 'UDA fields', 'Approval needed', 'Review'],
      ['Amazon', 'Flat-file enums', 'Ready XLSX', 'Ready'],
    ],
    actions: [
      ['Export Namshi', 'Mapped fields and image URLs are ready.', 'Ready'],
      ['Review Centrepoint UDA', 'One attribute group needs operator confirmation.', 'Review'],
      ['Archive evidence', 'Source files, decisions, and final outputs stay linked.', 'Ready'],
    ],
    proof: 'The same surface supports Geoomnii marketplace work and PMUK bundle/catalog operations.',
  },
]

export function getUseCase(slug: string) {
  return USE_CASES.find((useCase) => useCase.slug === slug)
}
