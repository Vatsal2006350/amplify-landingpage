'use client'

import { useState, useRef, useEffect } from 'react'

// Design tokens
const APP_URL = 'https://structa-rouge.vercel.app'

const ACCENT = '#C5F135'
const BASE = '#080808'
const SURFACE = '#111111'
const BORDER = 'rgba(255,255,255,0.07)'
const MUTED = 'rgba(255,255,255,0.55)'
const SECONDARY = 'rgba(255,255,255,0.75)'
const D = 'var(--font-display)'
const M = 'var(--font-mono)'

const PLATFORMS = [
  'Amazon', 'Shopify', 'TikTok Shop', 'Noon', 'Namshi',
  'Centrepoint', '6th Street', 'Trendyol', 'Walmart',
]

const STATS = [
  { value: '9+', label: 'Marketplace platforms' },
  { value: '30%', label: 'Avg. return rate reduction' },
  { value: '80hrs', label: 'Saved per catalog cycle' },
]

const PAIN_POINTS = [
  'Listing formats that don\'t transfer between platforms',
  'Compliance rules that change without warning',
  'Teams buried in operational busywork',
  'Returns from inaccurate or inconsistent product data',
]

const TESTIMONIALS = [
  {
    quote: "80+ hours saved on our last catalog cycle. Six marketplaces compiled in an afternoon — listings more accurate than manual work.",
    name: "Aman",
    role: "Head of Operations",
    company: "Geo Partnering LLC",
    initial: "A",
  },
  {
    quote: "Managing listings across multiple platforms used to eat our entire week. Structa handles it now — automatically.",
    name: "Operations Team",
    role: "E-Commerce",
    company: "Snackible",
    initial: "S",
  },
  {
    quote: "The compliance rules for each marketplace are different and constantly change. Structa tracks them so we don't have to.",
    name: "Catalog Team",
    role: "Marketplace Operations",
    company: "Beira Rio",
    initial: "B",
  },
]

const ALL_FEATURES = [
  {
    title: 'Transform product data into compliant listings.',
    body: 'Connect your catalog. Structa generates platform-compliant listings for every marketplace.',
  },
  {
    title: 'Sync updates across every channel.',
    body: 'Change once, update everywhere. No re-uploads or spreadsheets.',
  },
  {
    title: 'Fix listing errors before they become returns.',
    body: 'Scores SKUs by return risk, flags bad data, and proposes corrections.',
  },
  {
    title: 'Give your team back to strategy.',
    body: 'Structa handles operational work so merchandising focuses on growth.',
  },
]

function SectionLabel({ n, text, centered = false }: { n: string; text: string; centered?: boolean }) {
  if (centered) {
    return (
      <div className="flex items-center justify-center gap-3 mb-12" style={{ fontFamily: M }}>
        <div style={{ width: 24, height: 1, background: ACCENT }} />
        <span style={{ fontSize: 11, letterSpacing: '0.12em', color: MUTED }}>{n} — {text}</span>
        <div style={{ width: 24, height: 1, background: ACCENT }} />
      </div>
    )
  }
  return (
    <div className="flex items-center gap-3 mb-12" style={{ fontFamily: M }}>
      <div style={{ width: 24, height: 1, background: ACCENT }} />
      <span style={{ fontSize: 11, letterSpacing: '0.12em', color: MUTED }}>{n} — {text}</span>
    </div>
  )
}

function StructaLogo({ size = 32 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size, background: ACCENT, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
    >
      <svg style={{ width: size * 0.5, height: size * 0.5, color: BASE }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M12 9v6" />
      </svg>
    </div>
  )
}

function PlatformMarquee() {
  const items = [...PLATFORMS, ...PLATFORMS, ...PLATFORMS]
  const duped = [...items, ...items]
  return (
    <div id="platforms" style={{ background: L_BG, borderBottom: `1px solid ${L_BORDER}` }}>
      <div className="text-center pt-10 pb-5">
        <span style={{ fontSize: 11, letterSpacing: '0.12em', color: L_MUTED, fontFamily: M }}>
          WORKS WITH EVERY PLATFORM YOU SELL ON
        </span>
      </div>
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: `linear-gradient(to right, ${L_BG}, transparent)`, zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: `linear-gradient(to left, ${L_BG}, transparent)`, zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ display: 'flex', alignItems: 'center', animation: 'marquee 32s linear infinite', width: 'max-content' }}>
          {duped.map((name, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 0, flexShrink: 0 }}>
              <span style={{ fontFamily: M, fontSize: 11, letterSpacing: '0.14em', color: L_MUTED, whiteSpace: 'nowrap', textTransform: 'uppercase', padding: '18px 28px' }}>
                {name}
              </span>
              <div style={{ width: 3, height: 3, borderRadius: '50%', background: L_ACCENT, opacity: 0.4, flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const L_BG = '#ffffff'
const L_SURFACE = '#f7f7f8'
const L_BORDER = 'rgba(0,0,0,0.08)'
const L_TEXT = '#111111'
const L_SECONDARY = '#555555'
const L_MUTED = '#999999'
const L_ACCENT = '#1a7a2e'

const MOCKUP_BAR = (
  <div className="flex items-center gap-2 px-3 py-2.5 border-b" style={{ background: L_SURFACE, borderColor: L_BORDER }}>
    <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
    <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
    <div className="w-2 h-2 rounded-full bg-[#28c840]" />
    <div className="ml-2 flex-1 h-3 rounded max-w-[140px]" style={{ background: 'rgba(0,0,0,0.05)' }} />
  </div>
)

function FeedGeneratorScreen() {
  return (
    <div className="w-full h-full rounded-2xl flex flex-col overflow-hidden" style={{ background: L_BG, border: `1px solid ${L_BORDER}`, boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
      {MOCKUP_BAR}
      <div className="flex-1 p-4 flex gap-4 min-h-0">
        <div className="flex flex-col gap-1.5 w-[100px] flex-shrink-0">
          <div className="flex items-center gap-2 py-1.5">
            <div className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold" style={{ background: L_ACCENT, color: '#fff', fontFamily: M }}>S</div>
            <span className="text-[10px] font-semibold" style={{ fontFamily: D, color: L_TEXT }}>Structa</span>
          </div>
          <div className="py-1.5 px-2 rounded text-[10px] font-medium" style={{ background: L_ACCENT + '14', color: L_ACCENT, fontFamily: M }}>⊞ Feed Generator</div>
          <div className="py-1.5 px-2 rounded text-[10px]" style={{ color: L_MUTED, fontFamily: M }}>⟳ Fixes</div>
          <div className="py-1.5 px-2 rounded text-[10px]" style={{ color: L_MUTED, fontFamily: M }}>◈ Amazon Listings</div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[12px] font-semibold mb-1" style={{ fontFamily: D, color: L_TEXT }}>Feed Generator</h3>
          <p className="text-[10px] mb-3" style={{ color: L_SECONDARY, lineHeight: 1.5 }}>Upload your master sheet and platform template. Pipeline produces a ready-to-submit feed.</p>
          <div className="text-[9px] uppercase tracking-wider mb-2" style={{ color: L_MUTED, fontFamily: M }}>Platform</div>
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            {['Centrepoint', 'Namshi', '6th Street', 'Trendyol', 'Amazon'].map((p) => (
              <div key={p} className="py-1.5 px-2 rounded text-[10px] border text-center" style={{ borderColor: p === 'Centrepoint' ? L_ACCENT : L_BORDER, background: p === 'Centrepoint' ? L_ACCENT + '12' : 'transparent', color: p === 'Centrepoint' ? L_ACCENT : L_SECONDARY, fontFamily: M }}>{p}</div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg p-3 border border-dashed" style={{ borderColor: L_BORDER, background: L_SURFACE }}>
              <div className="text-[10px] font-semibold mb-0.5" style={{ color: L_TEXT }}>Master Sheet</div>
              <div className="text-[9px] mb-2" style={{ color: L_MUTED }}>Your product data (XLSX)</div>
              <div className="inline-block py-1 px-2 rounded text-[9px] font-bold" style={{ background: L_ACCENT, color: '#fff', fontFamily: M }}>Choose File</div>
            </div>
            <div className="rounded-lg p-3 border border-dashed" style={{ borderColor: L_BORDER, background: L_SURFACE }}>
              <div className="text-[10px] font-semibold mb-0.5" style={{ color: L_TEXT }}>Platform Template</div>
              <div className="text-[9px] mb-2" style={{ color: L_MUTED }}>Marketplace template (XLSX)</div>
              <div className="inline-block py-1 px-2 rounded text-[9px] font-bold" style={{ background: L_ACCENT, color: '#fff', fontFamily: M }}>Choose File</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FixesScreen() {
  const fixes = [
    { tag: 'Sizing', tagBg: '#fff8ec', tagColor: '#c47a00', sku: '2015-1501-20554', title: 'Fix sizing expectations for Emma-MOLEKINHA Junior Girls Sneakers', rate: '30.0%', reduction: '-12%' },
    { tag: 'Missing Info', tagBg: '#eff3fd', tagColor: '#3a6fd4', sku: 'FORMAL-001-42', title: 'Enhance product description for Classic Formal Leather Shoes', rate: '20.0%', reduction: '-8%' },
    { tag: 'Missing Info', tagBg: '#eff3fd', tagColor: '#3a6fd4', sku: 'LOAFER-NAVY-40', title: 'Improve color description for Casual Loafers - Navy Blue', rate: '18.0%', reduction: '-6%' },
  ]
  return (
    <div className="w-full h-full rounded-2xl flex flex-col overflow-hidden" style={{ background: L_BG, border: `1px solid ${L_BORDER}`, boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
      {MOCKUP_BAR}
      <div className="flex-1 p-4 overflow-auto">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="text-[12px] font-semibold mb-0.5" style={{ fontFamily: D, color: L_TEXT }}>Fixes</h3>
            <p className="text-[10px]" style={{ color: L_MUTED }}>AI-recommended PDP improvements to reduce returns</p>
          </div>
          <div className="py-1.5 px-3 rounded text-[10px] font-bold flex-shrink-0" style={{ background: L_ACCENT, color: '#fff', fontFamily: M }}>Run Analysis</div>
        </div>
        <div className="flex gap-2 mb-2">
          {['All (3)', 'sizing (1)', 'missing info (1)'].map((label, i) => (
            <span key={label} className="py-1 px-2 rounded-full text-[9px] border" style={{ borderColor: i === 0 ? L_ACCENT : L_BORDER, background: i === 0 ? L_ACCENT + '14' : 'transparent', color: i === 0 ? L_ACCENT : L_MUTED, fontFamily: M }}>{label}</span>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {fixes.map((f) => (
            <div key={f.sku} className="rounded-lg p-3 flex items-start gap-2 border" style={{ background: L_SURFACE, borderColor: L_BORDER }}>
              <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,0,0,0.04)', border: `1px solid ${L_BORDER}` }}>📦</div>
              <div className="min-w-0 flex-1">
                <span className="inline-block text-[8px] font-semibold uppercase px-1.5 py-0.5 rounded mb-1" style={{ background: f.tagBg, color: f.tagColor }}>{f.tag}</span>
                <span className="text-[9px] ml-1" style={{ color: L_MUTED }}>{f.sku}</span>
                <div className="text-[11px] font-medium leading-tight mt-0.5" style={{ color: L_TEXT }}>{f.title.slice(0, 52)}…</div>
                <div className="flex gap-3 mt-1.5 text-[10px]" style={{ color: L_SECONDARY }}>
                  <span>Return rate <strong style={{ color: '#ef4444' }}>{f.rate}</strong></span>
                  <span>Est. reduction <strong style={{ color: L_ACCENT }}>{f.reduction}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FixDetailScreen() {
  return (
    <div className="w-full h-full rounded-2xl flex flex-col overflow-hidden" style={{ background: L_BG, border: `1px solid ${L_BORDER}`, boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
      {MOCKUP_BAR}
      <div className="flex-1 p-4 overflow-auto flex gap-4 min-h-0">
        <div className="flex-1 min-w-0">
          <div className="text-[10px] mb-2" style={{ color: L_ACCENT, fontFamily: M }}>← Back to Fixes</div>
          <h3 className="text-[11px] font-semibold mb-2 leading-tight" style={{ fontFamily: D, color: L_TEXT }}>Fix sizing expectations for Emma-MOLEKINHA Junior Girls Sneakers</h3>
          <div className="flex gap-2 mb-2 flex-wrap">
            <span className="text-[9px]" style={{ color: L_MUTED }}>SKU: 2015-1501-20554</span>
            <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ background: '#fff8ec', color: '#c47a00' }}>sizing</span>
            <span className="text-[10px] font-bold" style={{ color: '#ef4444' }}>30.0% return rate</span>
          </div>
          <div className="rounded-lg p-2.5 mb-2 border" style={{ background: L_SURFACE, borderColor: L_BORDER }}>
            <div className="text-[9px] uppercase tracking-wider mb-1" style={{ color: L_MUTED, fontFamily: M }}>Diagnosis</div>
            <p className="text-[10px] leading-relaxed" style={{ color: L_SECONDARY }}><strong style={{ color: L_TEXT }}>High return rate (30%) driven by sizing.</strong> Customers report the shoes run small. Add clear sizing guidance to title and description.</p>
          </div>
          <div className="rounded-lg p-2.5 mb-2 border" style={{ background: L_SURFACE, borderColor: L_BORDER }}>
            <div className="text-[9px] uppercase tracking-wider mb-1" style={{ color: L_MUTED, fontFamily: M }}>Proposed Changes</div>
            <div className="grid grid-cols-2 gap-2">
              <div><div className="text-[8px] mb-0.5" style={{ color: '#ef4444' }}>Before</div><div className="text-[10px] p-1.5 rounded" style={{ background: 'rgba(239,68,68,0.08)', color: L_MUTED, textDecoration: 'line-through' }}>Emma-MOLEKINHA Junior Girls Sneakers</div></div>
              <div><div className="text-[8px] mb-0.5" style={{ color: L_ACCENT }}>After</div><div className="text-[10px] p-1.5 rounded border" style={{ background: L_ACCENT + '0d', borderColor: L_ACCENT + '33', color: L_ACCENT }}>…Sneakers (Runs Small – Size Up Recommended)</div></div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 py-2 px-2.5 rounded text-[10px] font-bold text-center" style={{ background: L_ACCENT, color: '#fff', fontFamily: M }}>Approve & Apply</div>
            <div className="py-2 px-2.5 rounded text-[10px] border" style={{ borderColor: L_BORDER, color: L_SECONDARY, fontFamily: M }}>Snooze</div>
          </div>
        </div>
        <div className="w-[100px] flex-shrink-0 border-l pl-3" style={{ borderColor: L_BORDER }}>
          <div className="text-[9px] font-semibold mb-2" style={{ color: L_TEXT }}>Evidence</div>
          <div className="text-[8px] uppercase tracking-wider mb-1.5" style={{ color: L_MUTED, fontFamily: M }}>Themes</div>
          <div className="flex flex-wrap gap-1 mb-2">
            {['runs small', 'too small', 'too tight'].map((t) => <span key={t} className="px-1.5 py-0.5 rounded text-[9px] border" style={{ borderColor: L_BORDER, color: L_SECONDARY }}>{t}</span>)}
          </div>
          <div className="text-[8px] uppercase tracking-wider mb-1" style={{ color: L_MUTED, fontFamily: M }}>Return breakdown</div>
          <div className="space-y-1">
            {[{ label: 'runs small', w: '80%' }, { label: 'too tight', w: '60%' }].map((r) => (
              <div key={r.label} className="flex items-center gap-2">
                <span className="text-[9px] w-14 truncate" style={{ color: L_SECONDARY }}>{r.label}</span>
                <div className="flex-1 h-1 rounded overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}><div className="h-full rounded" style={{ width: r.w, background: '#ef4444' }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function AmazonListingsScreen() {
  const rows = [
    { sku: 'PUM-RSX-001-EU42-BLK', product: 'PUMA RS-X³ Puzzle Sneake...', chips: ['Black/White', 'EU 42', '$129.99'], status: ['Done', 'AI'] },
    { sku: 'ADI-UB22-EU43-WHT', product: 'Adidas Ultraboost 22...', chips: ['White', 'EU 43', '$189.99'], status: ['Done', 'AI'] },
    { sku: 'NKE-AF1-EU41-BLK', product: 'Nike Air Force 1 \'07...', chips: ['Black', 'EU 41', '$109.99'], status: ['Done', 'AI'] },
  ]
  return (
    <div className="w-full h-full rounded-2xl flex flex-col overflow-hidden" style={{ background: L_BG, border: `1px solid ${L_BORDER}`, boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
      {MOCKUP_BAR}
      <div className="flex-1 p-4 overflow-auto min-h-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold" style={{ fontFamily: D, color: L_TEXT }}>amazon_test_fixture.xlsx</span>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ background: L_ACCENT + '14', color: L_ACCENT, border: `1px solid ${L_ACCENT}33`, fontFamily: M }}>Done</span>
          </div>
          <div className="py-1 px-2 rounded text-[9px] font-bold" style={{ background: L_ACCENT, color: '#fff', fontFamily: M }}>✦ Enrich with AI</div>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[{ label: 'Total', val: '8' }, { label: 'Pending', val: '0', faint: true }, { label: 'Valid', val: '8', green: true }, { label: 'Errors', val: '0', faint: true }].map((s) => (
            <div key={s.label} className="rounded-lg p-2 border text-center" style={{ background: L_SURFACE, borderColor: L_BORDER }}>
              <div className="text-[8px] uppercase tracking-wider mb-0.5" style={{ color: L_MUTED, fontFamily: M }}>{s.label}</div>
              <div className="text-[16px] font-bold" style={{ color: s.green ? L_ACCENT : s.faint ? L_MUTED : L_TEXT, fontFamily: D }}>{s.val}</div>
            </div>
          ))}
        </div>
        <div className="rounded-lg border overflow-hidden" style={{ borderColor: L_BORDER }}>
          <div className="grid grid-cols-12 gap-2 px-3 py-2 text-[9px] uppercase tracking-wider border-b" style={{ background: L_SURFACE, borderColor: L_BORDER, color: L_MUTED, fontFamily: M }}>
            <span className="col-span-1">#</span><span className="col-span-3">SKU</span><span className="col-span-3">Product</span><span className="col-span-3">Details</span><span className="col-span-2">Status</span>
          </div>
          {rows.map((r, i) => (
            <div key={r.sku} className="grid grid-cols-12 gap-2 px-3 py-2 border-b items-center text-[10px]" style={{ borderColor: L_BORDER }}>
              <span className="col-span-1" style={{ color: L_MUTED }}>{i + 1}</span>
              <span className="col-span-3" style={{ color: L_ACCENT, fontFamily: M }}>{r.sku}</span>
              <span className="col-span-3 truncate" style={{ color: L_SECONDARY }}>{r.product}</span>
              <span className="col-span-3 flex gap-1 flex-wrap">
                {r.chips.map((c) => <span key={c} className="px-1.5 py-0.5 rounded border text-[9px]" style={{ borderColor: L_BORDER, color: L_SECONDARY }}>{c}</span>)}
              </span>
              <span className="col-span-2 flex gap-1">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ background: L_ACCENT + '14', color: L_ACCENT, fontFamily: M }}>Done</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6', fontFamily: M }}>AI</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductVisual({ index }: { index: number }) {
  const screens = [FeedGeneratorScreen, FixesScreen, FixDetailScreen, AmazonListingsScreen]
  const Screen = screens[index] ?? FeedGeneratorScreen
  return <Screen />
}

function FeatureSection() {
  const [active, setActive] = useState(0)

  return (
    <section id="solution" style={{ background: L_BG }}>
      <div className="max-w-[1100px] mx-auto px-6 py-28">
        <div className="flex items-center gap-3 mb-12" style={{ fontFamily: M }}>
          <div style={{ width: 24, height: 1, background: L_ACCENT }} />
          <span style={{ fontSize: 11, letterSpacing: '0.12em', color: L_MUTED }}>02 — HOW IT WORKS</span>
        </div>
        <div className="mb-16">
          <h2 className="text-[clamp(28px,4vw,52px)] font-bold leading-[1.06] mb-5"
            style={{ fontFamily: D, letterSpacing: '-0.04em', fontWeight: 800, color: L_TEXT }}>
            One AI layer. Every marketplace.<br />Zero manual work.
          </h2>
          <p className="text-[16px] leading-[1.75] max-w-[500px]" style={{ color: L_SECONDARY }}>
            Sits between your catalog and every channel — standardizing, optimizing, and syncing listings automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="flex flex-col">
            {ALL_FEATURES.map((f, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                className="py-7 border-b cursor-pointer transition-all duration-300"
                style={{
                  borderColor: active === i ? L_ACCENT + '44' : L_BORDER,
                  paddingLeft: active === i ? 16 : 0,
                }}
              >
                <div className="flex items-start gap-5">
                  <span style={{ fontFamily: M, fontSize: 11, color: active === i ? L_ACCENT : L_MUTED, flexShrink: 0, marginTop: 3, letterSpacing: '0.05em', transition: 'color 0.3s ease' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold mb-2 leading-snug transition-colors duration-300 ease-out"
                      style={{ color: active === i ? L_TEXT : 'rgba(0,0,0,0.35)', fontFamily: D }}>
                      {f.title}
                    </h3>
                    <div
                      className="transition-all duration-400 ease-out"
                      style={{
                        maxHeight: active === i ? 200 : 0,
                        opacity: active === i ? 1 : 0,
                        overflow: 'hidden',
                      }}
                    >
                      <p className="text-[14px] leading-[1.75]" style={{ color: L_SECONDARY }}>
                        {f.body}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block">
            <div style={{ height: 440 }}>
              <div className="relative h-full">
                {ALL_FEATURES.map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 transition-all duration-500 ease-out"
                    style={{
                      opacity: active === i ? 1 : 0,
                      transform: `translateY(${active === i ? 0 : 12}px) scale(${active === i ? 1 : 0.97})`,
                      pointerEvents: active === i ? 'auto' : 'none',
                    }}
                  >
                    <ProductVisual index={i} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [ctaEmail, setCtaEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [ctaStatus, setCtaStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [ctaMessage, setCtaMessage] = useState('')
  const heroRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  async function handleSubmit(
    emailValue: string,
    setStatusFn: (s: 'idle' | 'loading' | 'success' | 'error') => void,
    setMessageFn: (m: string) => void,
    clearEmailFn: () => void,
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
        setMessageFn(data.message)
        clearEmailFn()
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
    <div className="min-h-screen" style={{ background: BASE }}>

      {/* Nav — floating pill */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-out"
        style={{ padding: scrolled ? '12px 16px' : '16px 16px' }}
      >
        <nav
          className="flex items-center justify-between transition-all duration-500 ease-out"
          style={{
            width: scrolled ? 'min(680px, calc(100% - 32px))' : 'min(1200px, calc(100% - 32px))',
            height: scrolled ? 52 : 56,
            padding: scrolled ? '0 6px 0 20px' : '0 8px 0 24px',
            background: scrolled ? 'rgba(18,18,18,0.85)' : 'rgba(8,8,8,0.8)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: scrolled ? 9999 : 16,
            border: `1px solid ${scrolled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)'}`,
            boxShadow: scrolled
              ? '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04) inset'
              : '0 4px 20px rgba(0,0,0,0.2)',
          }}
        >
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2">
              <StructaLogo size={scrolled ? 22 : 24} />
              <span className="text-[14px] font-semibold text-white transition-all duration-500" style={{ fontFamily: D }}>
                Structa
              </span>
            </a>
            <div className="hidden md:flex items-center gap-6">
              {[
                { label: 'How it works', href: '#solution' },
                { label: 'Pricing', href: '#pricing' },
              ].map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-[12px] transition-colors duration-200"
                  style={{ color: SECONDARY, fontFamily: M, letterSpacing: '0.03em' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = SECONDARY)}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`${APP_URL}/auth/login`}
              className="text-[11px] font-bold transition-all duration-500 hover:opacity-85"
              style={{
                background: ACCENT,
                color: BASE,
                fontFamily: M,
                letterSpacing: '0.06em',
                borderRadius: 9999,
                padding: scrolled ? '8px 18px' : '9px 20px',
              }}
            >
              GET STARTED
            </a>
          </div>
        </nav>
      </div>

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: BASE }}
      >
        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.032) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />
        {/* Lime glow */}
        <div style={{
          position: 'absolute', bottom: '5%', left: '5%',
          width: 900, height: 700, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(197,241,53,0.055) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        <div className="relative max-w-[1100px] mx-auto w-full px-6" style={{ paddingTop: 180, paddingBottom: 120 }}>
          {/* Top label */}
          <div className="flex items-center gap-3 mb-8" style={{ fontFamily: M }}>
            <div style={{ width: 24, height: 1, background: ACCENT }} />
            <span style={{ fontSize: 11, letterSpacing: '0.12em', color: MUTED }}>
              AI CATALOG OPERATIONS — EARLY ACCESS
            </span>
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-up mb-8"
            style={{
              fontFamily: D,
              fontSize: 'clamp(46px, 7.5vw, 96px)',
              fontWeight: 800,
              lineHeight: 1.03,
              letterSpacing: '-0.04em',
              color: '#fff',
              maxWidth: 940,
            }}
          >
            The AI operations manager for e-commerce teams.
          </h1>

          {/* Subtext */}
          <p
            className="animate-fade-up mb-10"
            style={{ fontSize: 18, lineHeight: 1.7, color: SECONDARY, maxWidth: 520, animationDelay: '0.1s' }}
          >
            Automates listings, compliance, and catalog management across every marketplace.
          </p>

          {/* CTA */}
          <div className="animate-fade-up flex flex-col items-start gap-3" style={{ animationDelay: '0.2s' }}>
            {status === 'success' ? (
              <div className="flex items-center gap-3 h-[52px] px-6 rounded-md" style={{ background: ACCENT + '18', border: `1px solid ${ACCENT}44` }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill={ACCENT}/><path d="M6 10l3 3 5-5" stroke={BASE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="text-[13px] font-medium" style={{ color: ACCENT, fontFamily: M }}>{message}</span>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); handleSubmit(email, setStatus, setMessage, () => setEmail('')) }}
                className="flex items-center overflow-hidden"
                style={{ border: `1px solid rgba(255,255,255,0.1)`, background: 'rgba(255,255,255,0.04)', borderRadius: 6 }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Work email"
                  disabled={status === 'loading'}
                  className="h-[52px] px-5 text-[14px] focus:outline-none bg-transparent text-white placeholder:text-[rgba(255,255,255,0.5)] disabled:opacity-50"
                  style={{ minWidth: 240 }}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="h-[52px] px-7 text-[12px] font-bold whitespace-nowrap transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ background: ACCENT, color: BASE, fontFamily: M, letterSpacing: '0.07em' }}
                >
                  {status === 'loading' ? 'JOINING...' : 'JOIN WAITLIST'}
                </button>
              </form>
            )}
            {status === 'error' && (
              <p className="text-[12px]" style={{ color: '#ef4444', fontFamily: M }}>{message}</p>
            )}
          </div>
          <p className="mt-4 text-[11px]" style={{ color: MUTED, fontFamily: M, letterSpacing: '0.06em' }}>
            NO CREDIT CARD REQUIRED
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: MUTED }}>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8" cy="7" r="2" fill="currentColor" className="animate-bounce" />
          </svg>
        </div>
      </section>

      {/* Testimonials + Logo bar */}
      <section style={{ background: L_BG }}>
        <div className="max-w-[1100px] mx-auto px-6 py-20">
          {/* Testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="rounded-xl p-6 flex flex-col gap-5"
                style={{ background: L_SURFACE, border: `1px solid ${L_BORDER}` }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[14px] flex-shrink-0"
                    style={{ background: L_ACCENT + '14', color: L_ACCENT, fontFamily: D, border: `1px solid ${L_ACCENT}33` }}
                  >
                    {t.initial}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold truncate" style={{ fontFamily: D, color: L_TEXT }}>{t.name}</div>
                    <div className="text-[11px] truncate" style={{ color: L_MUTED, fontFamily: M }}>{t.company}</div>
                  </div>
                </div>
                <p className="text-[14px] leading-[1.75] flex-1" style={{ color: L_SECONDARY }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="text-[10px] uppercase tracking-wider pt-3" style={{ color: L_MUTED, fontFamily: M, borderTop: `1px solid ${L_BORDER}` }}>
                  {t.role}
                </div>
              </div>
            ))}
          </div>

          {/* Logo bar */}
          <div className="pt-8" style={{ borderTop: `1px solid ${L_BORDER}` }}>
            <div className="text-center mb-6">
              <span style={{ fontSize: 11, color: L_MUTED, fontFamily: M, letterSpacing: '0.12em' }}>TRUSTED BY</span>
            </div>
            <div className="flex items-center justify-center gap-12 flex-wrap">
              {[
                { src: '/logos/beira-rio.png', alt: 'Beira Rio', h: 40, href: 'https://www.calcadosbeirario.com.br' },
                { src: '/logos/snackible.png', alt: 'Snackible', h: 44, href: 'https://snackible.com' },
                { src: '/logos/geoomnii.png', alt: 'Geoomnii', h: 36, href: 'https://www.instagram.com/geoomnii/' },
              ].map((logo) => (
                <a
                  key={logo.alt}
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity duration-200"
                  style={{ opacity: 0.7 }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    style={{ height: logo.h, width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: L_BG, borderTop: `1px solid ${L_BORDER}`, borderBottom: `1px solid ${L_BORDER}` }}>
        <div className="max-w-[900px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="py-12"
                style={{
                  paddingLeft: i > 0 ? 48 : 0,
                  paddingRight: i < STATS.length - 1 ? 48 : 0,
                  borderLeft: i > 0 ? `1px solid ${L_BORDER}` : 'none',
                }}
              >
                <div className="text-[54px] font-bold leading-none mb-2.5" style={{ fontFamily: D, letterSpacing: '-0.04em', color: L_TEXT }}>
                  {s.value}
                </div>
                <div className="text-[11px] tracking-[0.12em] uppercase" style={{ fontFamily: M, color: L_MUTED }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform marquee */}
      <PlatformMarquee />

      {/* Problem */}
      <section style={{ background: '#0D0D0D' }}>
        <div className="max-w-[1100px] mx-auto px-6 py-28">
          <SectionLabel n="01" text="THE PROBLEM" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-[clamp(24px,3.5vw,46px)] font-bold leading-[1.1] text-white mb-6"
                style={{ fontFamily: D, letterSpacing: '-0.035em', fontWeight: 800 }}>
                Selling on Amazon, Shopify, and TikTok Shop shouldn&apos;t require three different workflows.
              </h2>
              <p className="text-[16px] leading-[1.75]" style={{ color: SECONDARY }}>
                Each platform has its own format and rules. Teams patch it together with spreadsheets and manual uploads — leading to errors and hours that don&apos;t scale.
              </p>
            </div>
            <div className="flex flex-col">
              {PAIN_POINTS.map((point, i) => (
                <div key={point} className="flex items-start gap-5 py-5 border-b" style={{ borderColor: BORDER }}>
                  <span style={{ fontFamily: M, fontSize: 11, color: ACCENT, flexShrink: 0, marginTop: 2, letterSpacing: '0.05em' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[14px] leading-[1.7]" style={{ color: SECONDARY }}>
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution / Features */}
      <FeatureSection />

      {/* Pricing */}
      <section id="pricing" style={{ background: '#0D0D0D', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-[1100px] mx-auto px-6 py-28">
          <SectionLabel n="03" text="PRICING" centered />
          <h2 className="text-center text-[clamp(28px,4vw,52px)] font-bold leading-[1.06] mb-4 text-white"
            style={{ fontFamily: D, letterSpacing: '-0.04em', fontWeight: 800 }}>
            Start free. Scale when ready.
          </h2>
          <p className="text-center text-[16px] leading-[1.75] max-w-[480px] mx-auto mb-16" style={{ color: SECONDARY }}>
            Try everything Structa offers — no commitment, no credit card.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[820px] mx-auto">
            {/* Free Trial */}
            <div className="rounded-2xl p-8 flex flex-col" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: ACCENT + '18', border: `1px solid ${ACCENT}33` }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-white" style={{ fontFamily: D }}>Starter</div>
                  <div className="text-[11px]" style={{ color: MUTED, fontFamily: M }}>14-DAY FREE TRIAL</div>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-[42px] font-bold text-white" style={{ fontFamily: D, letterSpacing: '-0.03em' }}>$0</span>
                <span className="text-[14px] ml-1" style={{ color: MUTED }}>/&thinsp;14 days</span>
              </div>

              <div className="flex flex-col gap-3.5 mb-8 flex-1">
                {[
                  'Full platform access',
                  'Up to 500 SKUs',
                  'All marketplace integrations',
                  'AI-powered listing generation',
                  'Return risk scoring',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill={ACCENT + '22'} />
                      <path d="M5 8l2 2 4-4" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[14px]" style={{ color: SECONDARY }}>{item}</span>
                  </div>
                ))}
              </div>

              <a
                href="#cta"
                className="w-full h-[48px] flex items-center justify-center text-[12px] font-bold rounded-lg transition-opacity hover:opacity-90"
                style={{ background: ACCENT, color: BASE, fontFamily: M, letterSpacing: '0.06em' }}
              >
                GET STARTED
              </a>
              <p className="text-center mt-3 text-[11px]" style={{ color: MUTED, fontFamily: M }}>No credit card required</p>
            </div>

            {/* Enterprise */}
            <div className="rounded-2xl p-8 flex flex-col relative overflow-hidden" style={{ background: SURFACE, border: `1px solid ${ACCENT}33` }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${ACCENT}66, transparent)` }} />

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: ACCENT + '18', border: `1px solid ${ACCENT}33` }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-white" style={{ fontFamily: D }}>Enterprise</div>
                  <div className="text-[11px]" style={{ color: MUTED, fontFamily: M }}>CUSTOM PLAN</div>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-[42px] font-bold text-white" style={{ fontFamily: D, letterSpacing: '-0.03em' }}>Custom</span>
              </div>

              <div className="flex flex-col gap-3.5 mb-8 flex-1">
                {[
                  'Unlimited SKUs',
                  'Dedicated account manager',
                  'Custom integrations & API',
                  'Priority support & SLA',
                  'Team onboarding & training',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill={ACCENT + '22'} />
                      <path d="M5 8l2 2 4-4" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[14px]" style={{ color: SECONDARY }}>{item}</span>
                  </div>
                ))}
              </div>

              <a
                href="mailto:hello@structa.ai"
                className="w-full h-[48px] flex items-center justify-center text-[12px] font-bold rounded-lg transition-all hover:opacity-90"
                style={{ background: 'transparent', color: ACCENT, fontFamily: M, letterSpacing: '0.06em', border: `1px solid ${ACCENT}44` }}
              >
                CONTACT US
              </a>
              <p className="text-center mt-3 text-[11px]" style={{ color: MUTED, fontFamily: M }}>We&apos;ll build a plan for your team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section id="cta" className="relative overflow-hidden" style={{ background: '#09110A', borderTop: `1px solid ${BORDER}` }}>
        {/* Lime glow */}
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(197,241,53,0.06) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        {/* Giant ghost arrow */}
        <div style={{
          position: 'absolute', bottom: '-8%', right: '-2%',
          fontFamily: D, fontWeight: 800,
          fontSize: 'clamp(180px, 28vw, 400px)',
          letterSpacing: '-0.06em', lineHeight: 0.85,
          color: 'transparent',
          WebkitTextStroke: `1px rgba(197,241,53,0.07)`,
          pointerEvents: 'none', userSelect: 'none',
        }}>→</div>

        <div className="max-w-[1100px] mx-auto px-6 py-28 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
            <div>
              <SectionLabel n="04" text="EARLY ACCESS" />
              <h2 className="font-bold leading-[1.04] text-white mb-6"
                style={{ fontFamily: D, fontSize: 'clamp(32px,4.5vw,58px)', letterSpacing: '-0.04em', fontWeight: 800 }}>
                Be the first to run a fully automated catalog.
              </h2>
              <p className="text-[16px] leading-[1.75]" style={{ color: SECONDARY }}>
                Join the waitlist. We&apos;ll reach out personally — no spam.
              </p>
            </div>
            <div className="flex flex-col md:pt-16">
              {ctaStatus === 'success' ? (
                <div className="mb-5 flex items-center gap-3 h-[54px] px-6 rounded-lg" style={{ background: ACCENT + '18', border: `1px solid ${ACCENT}44` }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill={ACCENT}/><path d="M6 10l3 3 5-5" stroke={BASE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="text-[13px] font-medium" style={{ color: ACCENT, fontFamily: M }}>{ctaMessage}</span>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSubmit(ctaEmail, setCtaStatus, setCtaMessage, () => setCtaEmail('')) }}
                  className="mb-5 overflow-hidden"
                  style={{ border: `1px solid rgba(255,255,255,0.1)`, background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}
                >
                  <input
                    type="email"
                    value={ctaEmail}
                    onChange={(e) => setCtaEmail(e.target.value)}
                    placeholder="Work email"
                    disabled={ctaStatus === 'loading'}
                    className="w-full h-[54px] px-5 text-[14px] focus:outline-none bg-transparent text-white placeholder:text-[rgba(255,255,255,0.5)] disabled:opacity-50"
                  />
                  <div style={{ height: 1, background: BORDER }} />
                  <button
                    type="submit"
                    disabled={ctaStatus === 'loading'}
                    className="w-full h-[54px] text-[12px] font-bold transition-opacity hover:opacity-90 disabled:opacity-60"
                    style={{ background: ACCENT, color: BASE, fontFamily: M, letterSpacing: '0.08em' }}
                  >
                    {ctaStatus === 'loading' ? 'REQUESTING...' : 'REQUEST EARLY ACCESS'}
                  </button>
                </form>
              )}
              {ctaStatus === 'error' && (
                <p className="text-[12px] mb-3" style={{ color: '#ef4444', fontFamily: M }}>{ctaMessage}</p>
              )}
              <div className="flex items-center gap-5">
                <a href={`${APP_URL}/auth/login`} className="text-[12px] transition-colors hover:text-white" style={{ color: SECONDARY, fontFamily: M, letterSpacing: '0.04em' }}>
                  Try Structa now →
                </a>
                <span style={{ color: MUTED, fontSize: 11, fontFamily: M, letterSpacing: '0.04em' }}>No credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
