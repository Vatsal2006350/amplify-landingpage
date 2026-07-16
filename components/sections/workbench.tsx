'use client'

import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { PRODUCT_FLOW_TABS } from '../../lib/home-data'
import { StatusBracket } from '../doc/chrome'
import { Stamp } from '../doc/stamp'
import { CountUp } from '../motion-primitives'

function Logo({ size = 28 }: { size?: number }) {
  return (
    <img
      src="/logo.png"
      alt="Amplify"
      style={{ width: size, height: size, borderRadius: 2, objectFit: 'cover' }}
    />
  )
}

/* non-status mono chip — connected systems, file types */
function MonoChip({ label }: { label: string }) {
  return (
    <span
      className="type-mono-label inline-flex items-center whitespace-nowrap rounded-doc px-2 py-1"
      style={{ border: '1px solid var(--ledger)', color: 'var(--ink-muted)', fontSize: 10 }}
    >
      {label}
    </span>
  )
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="rounded-doc p-3"
      style={{ border: '1px solid var(--ledger)', background: 'var(--paper-raised)' }}
    >
      <div
        className="font-display leading-none"
        style={{ fontSize: 26, fontWeight: 540, color: 'var(--ink)' }}
      >
        <CountUp value={value} />
      </div>
      <div className="type-mono-label mt-1" style={{ color: 'var(--ink-muted)' }}>{label}</div>
    </div>
  )
}

/* 5-bar mini sparkline rendered from each tab's chart data */
function Sparkline({ data }: { data: number[] }) {
  return (
    <div aria-hidden className="flex h-8 items-end gap-[3px]">
      {data.map((value, index) => (
        <span
          key={index}
          style={{
            width: 6,
            height: `${Math.max(value, 8)}%`,
            background: index === data.length - 1 ? 'var(--orange)' : 'rgba(20,19,17,0.22)',
          }}
        />
      ))}
    </div>
  )
}

const SOURCE_FILES = ['master_item_sheet.xlsx', 'stock_snapshot.csv', 'confirmed_sales.xlsx', 'namshi_template.xlsx']

/* [field, source, value, status] */
const FIELD_ROWS: [string, string, string, string][] = [
  ['Product image', 'ImgBB album', '184 matched', 'ready'],
  ['Closure', 'image review', 'lace-up', 'ready'],
  ['Material', 'master sheet', 'needs check', 'review'],
  ['Target price', 'pricing sheet', 'manager approval', 'blocked'],
]

/* [sku, product, assets, status] */
const PREVIEW_ROWS: [string, string, string, string][] = [
  ['BR-772104-CAF', 'Leather Lace-Up Boot', '5 images', 'Ready'],
  ['BR-9011-CRM', 'Carryover Sandal', '3 images', 'Ready'],
  ['BR-772105-PRE', 'Patent Mary Jane', 'price approval', 'Review'],
  ['BR-772106-NDE', 'Comfort Mule', 'material check', 'Review'],
]

/* [sku, channel, status, action] */
const INVENTORY_ROWS: [string, string, string, string][] = [
  ['BR-772104-CAF', 'Amazon', 'low', '320 buy'],
  ['BR-9011-CRM', 'Noon', 'in stock', 'hold'],
  ['PMUK-GUSTO-120', 'Shopify', 'low', 'bundle SKU'],
  ['SM-TRAIN-001', 'Retail', 'ready', 'training pack'],
]

const PANEL: CSSProperties = {
  border: '1px solid var(--ledger)',
  background: 'var(--paper-raised)',
}

const NOTE: CSSProperties = {
  border: '1px solid var(--ledger)',
  background: 'var(--paper-shade)',
}

const columnHeader = (cols: [string, string][]) => (
  <div
    className="grid min-w-[520px] grid-cols-12 gap-3 px-3 py-2"
    style={{ borderBottom: '1px solid var(--ledger-strong)' }}
  >
    {cols.map(([label, span]) => (
      <span key={label} className={`type-mono-label ${span}`} style={{ fontSize: 9, color: 'var(--ink-faint)' }}>
        {label}
      </span>
    ))}
  </div>
)

export function ProductFlowWorkbench() {
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

  const renderListingOps = () => (
    <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-doc min-w-0 p-4" style={PANEL}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="type-mono-label" style={{ color: 'var(--ink-muted)' }}>Template Generator</div>
            <h3 className="font-display mt-1 leading-tight" style={{ fontSize: 24, fontWeight: 540, color: 'var(--ink)' }}>
              Centrepoint UAE output
            </h3>
          </div>
          <StatusBracket status="export ready" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Metric value="184" label="rows" />
          <Metric value="37" label="fields" />
          <Metric value="4" label="review" />
        </div>
        <div className="mt-4 rounded-doc" style={{ border: '1px solid var(--ledger)' }}>
          {/* desktop / tablet: ledger grid */}
          <div className="hidden overflow-x-auto sm:block">
            {columnHeader([
              ['Field', 'col-span-4'],
              ['Source', 'col-span-3'],
              ['Value', 'col-span-3'],
              ['Status', 'col-span-2 text-right'],
            ])}
            {FIELD_ROWS.map(([field, source, value, status]) => (
              <div
                key={field}
                className="grid min-w-[520px] grid-cols-12 gap-3 px-3 py-3 text-[12px] last:border-b-0"
                style={{ borderBottom: '1px solid var(--ledger)' }}
              >
                <span className="col-span-4 font-semibold" style={{ color: 'var(--ink)' }}>{field}</span>
                <span className="col-span-3 truncate" style={{ color: 'var(--ink-muted)' }}>{source}</span>
                <span className="col-span-3 truncate" style={{ color: 'var(--ink)' }}>{value}</span>
                <span className="col-span-2 text-right"><StatusBracket status={status} /></span>
              </div>
            ))}
          </div>
          {/* mobile: stacked ledger rows — every value stays visible */}
          <div className="sm:hidden">
            {FIELD_ROWS.map(([field, source, value, status]) => (
              <div key={field} className="px-3 py-3 last:border-b-0" style={{ borderBottom: '1px solid var(--ledger)' }}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[13px] font-semibold" style={{ color: 'var(--ink)' }}>{field}</span>
                  <StatusBracket status={status} className="shrink-0" />
                </div>
                <div className="mt-1 text-[12px] leading-snug">
                  <span style={{ color: 'var(--ink-muted)' }}>{source} → </span>
                  <span style={{ color: 'var(--ink)' }}>{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-doc min-w-0 p-4" style={PANEL}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="type-mono-label" style={{ color: 'var(--ink-muted)' }}>Workbook preview</div>
            <h3 className="font-display mt-1" style={{ fontSize: 20, fontWeight: 540, color: 'var(--ink)' }}>
              Generated rows before export
            </h3>
          </div>
          <div
            className="flex gap-1 rounded-doc p-1"
            style={{ border: '1px solid var(--ledger)', background: 'var(--paper-shade)' }}
          >
            {['Centrepoint', 'Namshi', '6th Street'].map((item, index) => (
              <span
                key={item}
                className="type-mono-label rounded-doc px-2 py-1"
                style={{
                  fontSize: 10,
                  background: index === 0 ? 'var(--ink)' : 'transparent',
                  color: index === 0 ? 'var(--dk-text)' : 'var(--ink-muted)',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-doc" style={{ border: '1px solid var(--ledger)' }}>
          {/* desktop / tablet: ledger grid */}
          <div className="hidden overflow-x-auto sm:block">
            {columnHeader([
              ['SKU', 'col-span-3'],
              ['Product', 'col-span-4'],
              ['Assets', 'col-span-3'],
              ['Status', 'col-span-2 text-right'],
            ])}
            {PREVIEW_ROWS.map((row, index) => (
              <div
                key={row[0]}
                className="grid min-w-[520px] grid-cols-12 gap-3 px-3 py-3 text-[12px] last:border-b-0"
                style={{
                  borderBottom: '1px solid var(--ledger)',
                  background: index === 0 ? 'var(--paper-shade)' : 'var(--paper-raised)',
                }}
              >
                <span className="col-span-3 truncate font-mono font-semibold" style={{ color: 'var(--ink)' }}>{row[0]}</span>
                <span className="col-span-4 truncate" style={{ color: 'var(--ink)' }}>{row[1]}</span>
                <span className="col-span-3 truncate" style={{ color: 'var(--ink-muted)' }}>{row[2]}</span>
                <span className="col-span-2 text-right"><StatusBracket status={row[3]} /></span>
              </div>
            ))}
          </div>
          {/* mobile: stacked ledger rows */}
          <div className="sm:hidden">
            {PREVIEW_ROWS.map(([sku, product, assets, status], index) => (
              <div
                key={sku}
                className="px-3 py-3 last:border-b-0"
                style={{
                  borderBottom: '1px solid var(--ledger)',
                  background: index === 0 ? 'var(--paper-shade)' : 'var(--paper-raised)',
                }}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="truncate font-mono text-[12px] font-semibold" style={{ color: 'var(--ink)' }}>{sku}</span>
                  <StatusBracket status={status} className="shrink-0" />
                </div>
                <div className="mt-1 text-[12px] leading-snug">
                  <span style={{ color: 'var(--ink)' }}>{product}</span>
                  <span style={{ color: 'var(--ink-muted)' }}> · {assets}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 rounded-doc p-3" style={NOTE}>
          <div className="type-mono-label" style={{ color: 'var(--ink-muted)' }}>Operator command</div>
          <div className="font-display mt-1" style={{ fontSize: 14, fontWeight: 540, color: 'var(--ink)' }}>
            Generate review workbook for blocked price and material fields.
          </div>
        </div>
      </section>
    </div>
  )

  const renderCompanyBrain = () => (
    <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
      <section className="rounded-doc min-w-0 p-4" style={PANEL}>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="type-mono-label" style={{ color: 'var(--ink-muted)' }}>Company Brain</div>
            <h3 className="font-display mt-1 leading-tight" style={{ fontSize: 24, fontWeight: 540, color: 'var(--ink)' }}>
              Retail planning snapshot
            </h3>
          </div>
          <StatusBracket status="run complete" />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric value="45K" label="sales rows" />
          <Metric value="7" label="source files" />
          <Metric value="90" label="agent recs" />
          <Metric value="82" label="health" />
        </div>
        <div className="mt-4 rounded-doc p-4" style={{ border: '1px solid var(--ledger)', background: 'var(--paper-raised)' }}>
          <div className="mb-3 flex items-center justify-between">
            <span className="type-mono-label" style={{ color: 'var(--ink-muted)' }}>MIS view</span>
            <span className="type-mono-label" style={{ color: 'var(--ink-muted)' }}>brand x channel</span>
          </div>
          <svg viewBox="0 0 460 150" className="h-[150px] w-full" aria-hidden="true">
            {[0, 1, 2, 3].map((line) => (
              <line key={line} x1="0" x2="460" y1={24 + line * 32} y2={24 + line * 32} stroke="rgba(20,19,17,0.08)" />
            ))}
            <path
              d="M18 114 L104 94 L190 102 L276 70 L362 48 L442 35 L442 138 L18 138 Z"
              fill="rgba(29,122,109,0.08)"
            />
            <path
              d="M18 114 L104 94 L190 102 L276 70 L362 48 L442 35"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {[18, 104, 190, 276, 362, 442].map((x, index) => (
              <circle
                key={x}
                cx={x}
                cy={[114, 94, 102, 70, 48, 35][index]}
                r="5"
                fill="var(--orange)"
                stroke="var(--ink)"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>
      </section>

      <section className="rounded-doc min-w-0 p-4" style={PANEL}>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="type-mono-label" style={{ color: 'var(--ink-muted)' }}>Action queue</div>
            <h3 className="font-display mt-1" style={{ fontSize: 20, fontWeight: 540, color: 'var(--ink)' }}>
              What the team should review
            </h3>
          </div>
          <StatusBracket status="approval gated" />
        </div>
        <div className="space-y-3">
          {[
            ['Save SKU and barcode join memory', 'Sales, stock, and listing files now share stable product identity.', 'Ready'],
            ['Review pricing wave for UAE', 'Top sellers do not need markdown; slower color needs bundle test.', 'Review'],
            ['Unblock supplier stock sync', 'Stock slice can publish after supplier policy is confirmed.', 'Open'],
            ['Send listing fixes to approvals', '12 SKUs need fit copy and material confirmation.', 'Ready'],
          ].map((item) => (
            <div
              key={item[0]}
              className="rounded-doc p-3"
              style={{
                border: '1px solid var(--ledger)',
                background: item[2] === 'Ready' ? 'var(--paper-shade)' : 'var(--paper-raised)',
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <h4 className="font-display" style={{ fontSize: 14, fontWeight: 540, color: 'var(--ink)' }}>{item[0]}</h4>
                <StatusBracket status={item[2]} />
              </div>
              <p className="mt-1 text-[12px] leading-[1.5]" style={{ color: 'var(--ink-muted)' }}>{item[1]}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )

  const renderInventory = () => (
    <div className="grid gap-4 xl:grid-cols-[1fr_0.82fr]">
      <section className="rounded-doc min-w-0 p-4" style={PANEL}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="type-mono-label" style={{ color: 'var(--ink-muted)' }}>Inventory ledger</div>
            <h3 className="font-display mt-1" style={{ fontSize: 24, fontWeight: 540, color: 'var(--ink)' }}>
              Positions by channel and SKU
            </h3>
          </div>
          <StatusBracket status="synced 4 min ago" />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric value="8" label="channels" />
          <Metric value="1,240" label="units to buy" />
          <Metric value="18" label="days cover" />
          <Metric value="42K" label="PO draft" />
        </div>
        <div className="mt-4 rounded-doc" style={{ border: '1px solid var(--ledger)' }}>
          {/* desktop / tablet: ledger grid */}
          <div className="hidden overflow-x-auto sm:block">
            {columnHeader([
              ['SKU', 'col-span-4'],
              ['Channel', 'col-span-2'],
              ['Status', 'col-span-3'],
              ['Action', 'col-span-3 text-right'],
            ])}
            {INVENTORY_ROWS.map((row, index) => (
              <div
                key={`${row[0]}-${row[1]}`}
                className="grid min-w-[520px] grid-cols-12 gap-3 px-3 py-3 text-[12px] last:border-b-0"
                style={{
                  borderBottom: '1px solid var(--ledger)',
                  background: index === 0 ? 'var(--paper-shade)' : 'var(--paper-raised)',
                }}
              >
                <span className="col-span-4 truncate font-mono font-semibold" style={{ color: 'var(--ink)' }}>{row[0]}</span>
                <span className="col-span-2" style={{ color: 'var(--ink-muted)' }}>{row[1]}</span>
                <span className="col-span-3"><StatusBracket status={row[2]} /></span>
                <span className="col-span-3 text-right font-semibold" style={{ color: 'var(--ink)' }}>{row[3]}</span>
              </div>
            ))}
          </div>
          {/* mobile: stacked ledger rows */}
          <div className="sm:hidden">
            {INVENTORY_ROWS.map(([sku, channel, status, action], index) => (
              <div
                key={`${sku}-${channel}`}
                className="px-3 py-3 last:border-b-0"
                style={{
                  borderBottom: '1px solid var(--ledger)',
                  background: index === 0 ? 'var(--paper-shade)' : 'var(--paper-raised)',
                }}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="truncate font-mono text-[12px] font-semibold" style={{ color: 'var(--ink)' }}>{sku}</span>
                  <StatusBracket status={status} className="shrink-0" />
                </div>
                <div className="mt-1 flex items-baseline justify-between gap-3 text-[12px] leading-snug">
                  <span style={{ color: 'var(--ink-muted)' }}>{channel}</span>
                  <span className="font-semibold" style={{ color: 'var(--ink)' }}>{action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-doc min-w-0 p-4" style={PANEL}>
        <div className="mb-4">
          <div className="type-mono-label" style={{ color: 'var(--ink-muted)' }}>Inventory Agent</div>
          <h3 className="font-display mt-1" style={{ fontSize: 20, fontWeight: 540, color: 'var(--ink)' }}>
            Suggested actions
          </h3>
        </div>
        <div className="space-y-3">
          {[
            ['Reorder carryover boots', '320 units, 21 day lead time', 'Approve'],
            ['Hold slow color', 'size curve under target', 'Hold'],
            ['Generate PO draft', '$42K to Beira Rio', 'Review'],
            ['Push channel stock', 'single pool with caps', 'Ready'],
          ].map((item) => (
            <div
              key={item[0]}
              className="rounded-doc p-3"
              style={{
                border: '1px solid var(--ledger)',
                background: item[2] === 'Approve' ? 'var(--paper-shade)' : 'var(--paper-raised)',
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <h4 className="font-display" style={{ fontSize: 14, fontWeight: 540, color: 'var(--ink)' }}>{item[0]}</h4>
                <StatusBracket status={item[2]} />
              </div>
              <p className="mt-1 text-[12px]" style={{ color: 'var(--ink-muted)' }}>{item[1]}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )

  const renderApprovals = () => (
    <div className="grid gap-4 xl:grid-cols-[0.82fr_1.18fr]">
      <section className="rounded-doc min-w-0 p-4" style={PANEL}>
        <div className="mb-4">
          <div className="type-mono-label" style={{ color: 'var(--ink-muted)' }}>Approval inbox</div>
          <h3 className="font-display mt-1" style={{ fontSize: 24, fontWeight: 540, color: 'var(--ink)' }}>
            Nothing writes live without review.
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Metric value="17" label="needs review" />
          <Metric value="12" label="listing blockers" />
          <Metric value="3" label="pricing blockers" />
          <Metric value="2" label="PO drafts" />
        </div>
        <div className="mt-4 rounded-doc p-3" style={NOTE}>
          <div className="type-mono-label" style={{ color: 'var(--ink-muted)' }}>Policy</div>
          <p className="mt-1 text-[13px] leading-[1.55]" style={{ color: 'var(--ink)' }}>
            Agents can prepare files, recommendations, and API payloads, but approvals stay with the operator.
          </p>
        </div>
      </section>

      <section className="rounded-doc min-w-0 p-4" style={PANEL}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display" style={{ fontSize: 20, fontWeight: 540, color: 'var(--ink)' }}>Pending decisions</h3>
          <StatusBracket status="seeded demo" />
        </div>
        <div className="space-y-3">
          {[
            ['Listing repair', 'BR-772105-PRE', 'Approve target price before Centrepoint export.', 'Approve'],
            ['Pricing exception', 'BR-9011-CRM', 'Keep price steady; markdown not recommended.', 'Needs info'],
            ['Replenishment RFQ', 'BR-772104-CAF', 'PO draft for 320 units from forecast.', 'Review'],
            ['AI ads action', 'PMUK-GUSTO-120', 'Bundle ad copy and SKU generator output ready.', 'Approve'],
          ].map((item) => (
            <div
              key={`${item[0]}-${item[1]}`}
              className="rounded-doc p-3"
              style={{ border: '1px solid var(--ledger)', background: 'var(--paper-raised)' }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="type-mono-label" style={{ color: 'var(--ink-muted)' }}>{item[0]}</div>
                  <h4 className="mt-1 font-mono text-[14px] font-semibold" style={{ color: 'var(--ink)' }}>{item[1]}</h4>
                  <p className="mt-1 text-[12px] leading-[1.45]" style={{ color: 'var(--ink-muted)' }}>{item[2]}</p>
                </div>
                <div className="flex gap-2">
                  <StatusBracket status={item[3]} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )

  return (
    <div
      className="doc-shadow rounded-doc overflow-hidden"
      style={{ border: '1px solid var(--ink)', background: 'var(--paper-shade)' }}
    >
      {/* header bar — stays dark, like a clipboard clamp */}
      <div
        className="flex items-center justify-between gap-4 px-4 py-3"
        style={{ background: 'var(--dk-bg)', borderBottom: '1px solid var(--ink)' }}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((hole) => (
              <span
                key={hole}
                aria-hidden
                className="h-2 w-2 rounded-full"
                style={{ background: 'var(--dk-raised)', border: '1px solid var(--dk-rule)' }}
              />
            ))}
          </div>
          <div
            className="hidden min-w-0 rounded-doc px-3 py-1.5 font-mono text-[11px] sm:block"
            style={{ border: '1px solid var(--dk-rule)', color: 'var(--dk-muted)' }}
          >
            app.use-amplify.com/geoomnii/{flow.label.toLowerCase().replaceAll(' ', '-')}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="type-mono-label whitespace-nowrap" style={{ color: 'var(--dk-muted)' }}>
            [ SEEDED WORKSPACE ]
          </span>
          <button
            type="button"
            className="type-mono-label rounded-doc px-3 py-1.5"
            style={{ background: 'var(--orange)', color: 'var(--paper)', fontWeight: 700 }}
          >
            Run
          </button>
        </div>
      </div>

      <div className="grid min-h-[640px] lg:grid-cols-[228px_1fr]" style={{ color: 'var(--ink)' }}>
        {/* sidebar — index cards */}
        <aside
          className="border-b p-4 lg:border-b-0 lg:border-r"
          style={{ background: 'var(--paper-raised)', borderColor: 'var(--ledger)' }}
        >
          <div className="mb-5 flex items-center gap-2">
            <Logo size={28} />
            <div>
              <div className="font-display" style={{ fontSize: 14, fontWeight: 540, color: 'var(--ink)' }}>Amplify</div>
              <div className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink-muted)' }}>Geoomnii workspace</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-1">
            {PRODUCT_FLOW_TABS.map((item) => {
              const selected = item.id === active
              return (
                <button
                  key={item.id}
                  id={`use-${item.id}`}
                  type="button"
                  onClick={() => selectFlow(item.id)}
                  className="rounded-doc px-3 py-3 text-left transition-colors"
                  style={{
                    borderTop: '1px solid transparent',
                    borderRight: '1px solid transparent',
                    borderBottom: '1px solid transparent',
                    borderLeft: selected ? '2px solid var(--orange)' : '2px solid transparent',
                    background: selected ? 'var(--paper-shade)' : 'transparent',
                  }}
                >
                  <div
                    className="type-mono-label"
                    style={{ fontSize: 9, color: selected ? 'var(--orange)' : 'var(--ink-faint)' }}
                  >
                    {item.eyebrow}
                  </div>
                  <div className="font-display mt-1" style={{ fontSize: 15, fontWeight: 520, color: 'var(--ink)' }}>
                    {item.label}
                  </div>
                </button>
              )
            })}
          </div>
          <div
            className="mt-5 hidden rounded-doc p-3 lg:block"
            style={{ border: '1px solid var(--ledger)', background: 'var(--paper-raised)' }}
          >
            <div className="type-mono-label mb-2" style={{ fontSize: 9, color: 'var(--ink-faint)' }}>
              Connected sources
            </div>
            <div className="space-y-1.5">
              {SOURCE_FILES.map((file) => (
                <div key={file} className="flex min-w-0 items-center gap-2">
                  <span
                    className="type-mono-label shrink-0 rounded-doc px-1 py-0.5"
                    style={{ fontSize: 8, border: '1px solid var(--ledger)', color: 'var(--ink-muted)' }}
                  >
                    {file.endsWith('.csv') ? 'CSV' : 'XLS'}
                  </span>
                  <span className="truncate font-mono text-[11px]" style={{ color: 'var(--ink-muted)' }}>
                    {file}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="min-w-0" style={{ background: 'var(--paper-shade)' }}>
          <div
            className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5"
            style={{ background: 'var(--paper-raised)', borderBottom: '1px solid var(--ledger)' }}
          >
            <div className="flex items-end gap-4">
              <div>
                <div className="type-mono-label" style={{ color: 'var(--orange)' }}>{flow.eyebrow}</div>
                <h3 className="font-display leading-tight" style={{ fontSize: 22, fontWeight: 540, color: 'var(--ink)' }}>
                  {flow.label}
                </h3>
              </div>
              <Sparkline data={flow.chart} />
            </div>
            <div className="flex flex-wrap gap-2">
              {['Logic ERP', 'Supplier PI', 'Marketplace XLSX', 'Approval logs'].map((item) => (
                <MonoChip key={item} label={item} />
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <AnimatePresence mode="wait">
              <m.div
                key={active}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {active === 'listings' && renderListingOps()}
                {active === 'brain' && renderCompanyBrain()}
                {active === 'forecast' && renderInventory()}
                {active === 'actions' && renderApprovals()}

                {/* operator decision — the human sign-off line */}
                <div
                  className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-doc p-4"
                  style={{ border: '1px solid var(--ledger)', background: 'var(--paper-raised)' }}
                >
                  <div className="min-w-0 flex-1">
                    <div className="type-mono-label" style={{ color: 'var(--ink-faint)' }}>OPERATOR DECISION</div>
                    <p className="font-display mt-1" style={{ fontSize: 17, fontWeight: 520, color: 'var(--ink)' }}>
                      {flow.decision}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                    <Stamp label="APPROVAL GATED" scale={0.62} />
                    <button
                      type="button"
                      className="btn-press type-mono-label rounded-doc px-4 py-2.5 text-left"
                      style={{ background: 'var(--orange)', color: 'var(--paper)', fontWeight: 700 }}
                    >
                      {flow.action}
                    </button>
                  </div>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
