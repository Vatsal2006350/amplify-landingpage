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
  story: Array<{ label: string; title: string; body: string }>
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
    story: [
      { label: 'Source control', title: 'Start with the files suppliers already send.', body: 'Invoices, item masters, image albums, and channel templates stay visible and versioned in one run.' },
      { label: 'Listing intelligence', title: 'See the exact rows and attributes that need attention.', body: 'Amplify maps images, fills channel fields, checks template rules, and separates ready rows from review work.' },
      { label: 'Approved output', title: 'Ship the clean file, not another spreadsheet project.', body: 'Operators confirm uncertain values, then export Namshi, 6th Street, Centrepoint, or Amazon files with evidence attached.' },
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
    story: [
      { label: 'One retail model', title: 'Bring sales, stock, returns, and pricing together.', body: 'Company Brain joins SKU identity across every uploaded source before it answers a business question.' },
      { label: 'Decision context', title: 'Move from a number to the reason behind it.', body: 'Channel movement, size curves, return signals, and margin context sit beside the answer instead of across pivot tabs.' },
      { label: 'Agent handoff', title: 'Turn the answer into work your team can approve.', body: 'Send listing, inventory, pricing, or sales actions directly into an approval queue with the underlying evidence.' },
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
    story: [
      { label: 'Channel ledger', title: 'See available stock and demand in one place.', body: 'ERP stock, marketplace positions, confirmed sales, and supplier lead times resolve into one channel ledger.' },
      { label: 'Buy planning', title: 'Know what to buy, hold, bundle, or move.', body: 'Days of cover, velocity, size curves, return risk, and lead time create a recommendation operators can inspect.' },
      { label: 'Purchase action', title: 'Draft the PO without giving up control.', body: 'Amplify prepares quantities and value by supplier, while the merchandising manager reviews every proposed buy.' },
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
    story: [
      { label: 'Shared inbox', title: 'Put every agent decision in one review queue.', body: 'Listing changes, replenishment drafts, pricing exceptions, and ad actions arrive in a consistent operator inbox.' },
      { label: 'Evidence first', title: 'Review the diff, source, and expected impact.', body: 'Each action keeps its evidence and before-and-after state close, so approval never depends on a black box.' },
      { label: 'Controlled execution', title: 'Approve, edit, or hold before anything ships.', body: 'Every outcome is logged with the operator, timestamp, output, and rollback context.' },
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
    story: [
      { label: 'Invoice expansion', title: 'Turn supplier rows into complete SKU variants.', body: 'Sizes, colors, materials, and image references expand from supplier format into clean marketplace rows.' },
      { label: 'Template validation', title: 'Check each channel before the upload fails.', body: 'Marketplace-specific fields and enums are validated against the active Namshi, 6th Street, Centrepoint, and Amazon templates.' },
      { label: 'Ready XLSX', title: 'Export the right file for every destination.', body: 'Operators download reviewed channel files while source inputs, approvals, and output history remain linked.' },
    ],
    proof: 'The same surface supports Geoomnii marketplace work and PMUK bundle/catalog operations.',
  },
]

export function getUseCase(slug: string) {
  return USE_CASES.find((useCase) => useCase.slug === slug)
}
