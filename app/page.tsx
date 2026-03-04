'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

// Design tokens
const ACCENT = '#C5F135'
const BASE = '#080808'
const SURFACE = '#111111'
const BORDER = 'rgba(255,255,255,0.07)'
const MUTED = 'rgba(255,255,255,0.18)'
const SECONDARY = 'rgba(255,255,255,0.45)'
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
  'Merchandising teams buried in operational busywork',
  'Returns driven by inaccurate or inconsistent product data',
]

const ALL_FEATURES = [
  {
    title: 'Transform product data into compliant listings.',
    body: 'Connect your catalog and Structa automatically generates correctly formatted, platform-compliant listings for every marketplace you sell on.',
  },
  {
    title: 'Sync updates across every channel.',
    body: 'Change once, update everywhere. No re-uploads, no spreadsheets. Every channel stays in sync automatically as your catalog evolves.',
  },
  {
    title: 'Fix listing errors before they become returns.',
    body: 'Structa scores every SKU by return risk, flags inaccurate data, and proposes the exact correction before it costs you.',
  },
  {
    title: 'Give your team back to strategy.',
    body: 'Stop your best people from doing data entry. Structa handles the operational work so merchandising teams focus on decisions that grow revenue.',
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
    <div style={{ overflow: 'hidden', background: BASE, borderBottom: `1px solid ${BORDER}`, position: 'relative' }}>
      {/* Fade edges */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: `linear-gradient(to right, ${BASE}, transparent)`, zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: `linear-gradient(to left, ${BASE}, transparent)`, zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ display: 'flex', alignItems: 'center', animation: 'marquee 32s linear infinite', width: 'max-content' }}>
        {duped.map((name, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 0, flexShrink: 0 }}>
            <span style={{ fontFamily: M, fontSize: 11, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.18)', whiteSpace: 'nowrap', textTransform: 'uppercase', padding: '18px 28px' }}>
              {name}
            </span>
            <div style={{ width: 3, height: 3, borderRadius: '50%', background: ACCENT, opacity: 0.35, flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  )
}

const MOCKUP_BAR = (
  <div className="flex items-center gap-2 px-3 py-2.5 border-b" style={{ background: SURFACE, borderColor: BORDER }}>
    <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
    <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
    <div className="w-2 h-2 rounded-full bg-[#28c840]" />
    <div className="ml-2 flex-1 h-3 rounded max-w-[140px]" style={{ background: 'rgba(255,255,255,0.06)' }} />
  </div>
)

function FeedGeneratorScreen() {
  return (
    <div className="w-full h-full rounded-2xl flex flex-col overflow-hidden" style={{ background: '#0C0C0C', border: `1px solid ${BORDER}`, boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}>
      {MOCKUP_BAR}
      <div className="flex-1 p-4 flex gap-4 min-h-0">
        <div className="flex flex-col gap-1.5 w-[100px] flex-shrink-0">
          <div className="flex items-center gap-2 py-1.5">
            <div className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold" style={{ background: ACCENT, color: BASE, fontFamily: M }}>S</div>
            <span className="text-[10px] font-semibold text-white" style={{ fontFamily: D }}>Structa</span>
          </div>
          <div className="py-1.5 px-2 rounded text-[10px] font-medium" style={{ background: ACCENT + '22', color: ACCENT, fontFamily: M }}>⊞ Feed Generator</div>
          <div className="py-1.5 px-2 rounded text-[10px]" style={{ color: MUTED, fontFamily: M }}>⟳ Fixes</div>
          <div className="py-1.5 px-2 rounded text-[10px]" style={{ color: MUTED, fontFamily: M }}>◈ Amazon Listings</div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[12px] font-semibold text-white mb-1" style={{ fontFamily: D }}>Feed Generator</h3>
          <p className="text-[10px] mb-3" style={{ color: SECONDARY, lineHeight: 1.5 }}>Upload your master sheet and platform template. Pipeline produces a ready-to-submit feed.</p>
          <div className="text-[9px] uppercase tracking-wider mb-2" style={{ color: MUTED, fontFamily: M }}>Platform</div>
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            {['Centrepoint', 'Namshi', '6th Street', 'Trendyol', 'Amazon'].map((p) => (
              <div key={p} className="py-1.5 px-2 rounded text-[10px] border text-center" style={{ borderColor: p === 'Centrepoint' ? ACCENT : BORDER, background: p === 'Centrepoint' ? ACCENT + '18' : 'transparent', color: p === 'Centrepoint' ? ACCENT : SECONDARY, fontFamily: M }}>{p}</div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg p-3 border border-dashed" style={{ borderColor: BORDER, background: 'rgba(255,255,255,0.02)' }}>
              <div className="text-[10px] font-semibold text-white mb-0.5">Master Sheet</div>
              <div className="text-[9px] mb-2" style={{ color: MUTED }}>Your product data (XLSX)</div>
              <div className="inline-block py-1 px-2 rounded text-[9px] font-bold" style={{ background: ACCENT, color: BASE, fontFamily: M }}>Choose File</div>
            </div>
            <div className="rounded-lg p-3 border border-dashed" style={{ borderColor: BORDER, background: 'rgba(255,255,255,0.02)' }}>
              <div className="text-[10px] font-semibold text-white mb-0.5">Platform Template</div>
              <div className="text-[9px] mb-2" style={{ color: MUTED }}>Marketplace template (XLSX)</div>
              <div className="inline-block py-1 px-2 rounded text-[9px] font-bold" style={{ background: ACCENT, color: BASE, fontFamily: M }}>Choose File</div>
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
    <div className="w-full h-full rounded-2xl flex flex-col overflow-hidden" style={{ background: '#0C0C0C', border: `1px solid ${BORDER}`, boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}>
      {MOCKUP_BAR}
      <div className="flex-1 p-4 overflow-auto">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="text-[12px] font-semibold text-white mb-0.5" style={{ fontFamily: D }}>Fixes</h3>
            <p className="text-[10px]" style={{ color: MUTED }}>AI-recommended PDP improvements to reduce returns</p>
          </div>
          <div className="py-1.5 px-3 rounded text-[10px] font-bold flex-shrink-0" style={{ background: ACCENT, color: BASE, fontFamily: M }}>Run Analysis</div>
        </div>
        <div className="flex gap-2 mb-2">
          {['All (3)', 'sizing (1)', 'missing info (1)'].map((label, i) => (
            <span key={label} className="py-1 px-2 rounded-full text-[9px] border" style={{ borderColor: i === 0 ? ACCENT : BORDER, background: i === 0 ? ACCENT + '22' : 'transparent', color: i === 0 ? ACCENT : MUTED, fontFamily: M }}>{label}</span>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {fixes.map((f) => (
            <div key={f.sku} className="rounded-lg p-3 flex items-start gap-2 border" style={{ background: SURFACE, borderColor: BORDER }}>
              <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${BORDER}` }}>📦</div>
              <div className="min-w-0 flex-1">
                <span className="inline-block text-[8px] font-semibold uppercase px-1.5 py-0.5 rounded mb-1" style={{ background: f.tagBg, color: f.tagColor }}>{f.tag}</span>
                <span className="text-[9px] ml-1" style={{ color: MUTED }}>{f.sku}</span>
                <div className="text-[11px] font-medium text-white leading-tight mt-0.5">{f.title.slice(0, 52)}…</div>
                <div className="flex gap-3 mt-1.5 text-[10px]" style={{ color: SECONDARY }}>
                  <span>Return rate <strong style={{ color: '#ef4444' }}>{f.rate}</strong></span>
                  <span>Est. reduction <strong style={{ color: ACCENT }}>{f.reduction}</strong></span>
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
    <div className="w-full h-full rounded-2xl flex flex-col overflow-hidden" style={{ background: '#0C0C0C', border: `1px solid ${BORDER}`, boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}>
      {MOCKUP_BAR}
      <div className="flex-1 p-4 overflow-auto flex gap-4 min-h-0">
        <div className="flex-1 min-w-0">
          <div className="text-[10px] mb-2" style={{ color: ACCENT, fontFamily: M }}>← Back to Fixes</div>
          <h3 className="text-[11px] font-semibold text-white mb-2 leading-tight" style={{ fontFamily: D }}>Fix sizing expectations for Emma-MOLEKINHA Junior Girls Sneakers</h3>
          <div className="flex gap-2 mb-2 flex-wrap">
            <span className="text-[9px]" style={{ color: MUTED }}>SKU: 2015-1501-20554</span>
            <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ background: '#fff8ec', color: '#c47a00' }}>sizing</span>
            <span className="text-[10px] font-bold" style={{ color: '#ef4444' }}>30.0% return rate</span>
          </div>
          <div className="rounded-lg p-2.5 mb-2 border" style={{ background: SURFACE, borderColor: BORDER }}>
            <div className="text-[9px] uppercase tracking-wider mb-1" style={{ color: MUTED, fontFamily: M }}>Diagnosis</div>
            <p className="text-[10px] leading-relaxed" style={{ color: SECONDARY }}><strong className="text-white">High return rate (30%) driven by sizing.</strong> Customers report the shoes run small. Add clear sizing guidance to title and description.</p>
          </div>
          <div className="rounded-lg p-2.5 mb-2 border" style={{ background: SURFACE, borderColor: BORDER }}>
            <div className="text-[9px] uppercase tracking-wider mb-1" style={{ color: MUTED, fontFamily: M }}>Proposed Changes</div>
            <div className="grid grid-cols-2 gap-2">
              <div><div className="text-[8px] mb-0.5" style={{ color: '#ef4444' }}>Before</div><div className="text-[10px] p-1.5 rounded" style={{ background: 'rgba(239,68,68,0.1)', color: MUTED, textDecoration: 'line-through' }}>Emma-MOLEKINHA Junior Girls Sneakers</div></div>
              <div><div className="text-[8px] mb-0.5" style={{ color: ACCENT }}>After</div><div className="text-[10px] p-1.5 rounded border" style={{ background: ACCENT + '12', borderColor: ACCENT + '44', color: ACCENT }}>…Sneakers (Runs Small – Size Up Recommended)</div></div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 py-2 px-2.5 rounded text-[10px] font-bold text-center" style={{ background: ACCENT, color: BASE, fontFamily: M }}>Approve & Apply</div>
            <div className="py-2 px-2.5 rounded text-[10px] border" style={{ borderColor: BORDER, color: SECONDARY, fontFamily: M }}>Snooze</div>
          </div>
        </div>
        <div className="w-[100px] flex-shrink-0 border-l pl-3" style={{ borderColor: BORDER }}>
          <div className="text-[9px] font-semibold text-white mb-2">Evidence</div>
          <div className="text-[8px] uppercase tracking-wider mb-1.5" style={{ color: MUTED, fontFamily: M }}>Themes</div>
          <div className="flex flex-wrap gap-1 mb-2">
            {['runs small', 'too small', 'too tight'].map((t) => <span key={t} className="px-1.5 py-0.5 rounded text-[9px] border" style={{ borderColor: BORDER, color: SECONDARY }}>{t}</span>)}
          </div>
          <div className="text-[8px] uppercase tracking-wider mb-1" style={{ color: MUTED, fontFamily: M }}>Return breakdown</div>
          <div className="space-y-1">
            {[{ label: 'runs small', w: '80%' }, { label: 'too tight', w: '60%' }].map((r) => (
              <div key={r.label} className="flex items-center gap-2">
                <span className="text-[9px] w-14 truncate" style={{ color: SECONDARY }}>{r.label}</span>
                <div className="flex-1 h-1 rounded overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}><div className="h-full rounded" style={{ width: r.w, background: '#ef4444' }} /></div>
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
    <div className="w-full h-full rounded-2xl flex flex-col overflow-hidden" style={{ background: '#0C0C0C', border: `1px solid ${BORDER}`, boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}>
      {MOCKUP_BAR}
      <div className="flex-1 p-4 overflow-auto min-h-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-white" style={{ fontFamily: D }}>amazon_test_fixture.xlsx</span>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ background: ACCENT + '22', color: ACCENT, border: `1px solid ${ACCENT}44`, fontFamily: M }}>Done</span>
          </div>
          <div className="py-1 px-2 rounded text-[9px] font-bold" style={{ background: ACCENT, color: BASE, fontFamily: M }}>✦ Enrich with AI</div>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[{ label: 'Total', val: '8' }, { label: 'Pending', val: '0', faint: true }, { label: 'Valid', val: '8', green: true }, { label: 'Errors', val: '0', faint: true }].map((s) => (
            <div key={s.label} className="rounded-lg p-2 border text-center" style={{ background: SURFACE, borderColor: BORDER }}>
              <div className="text-[8px] uppercase tracking-wider mb-0.5" style={{ color: MUTED, fontFamily: M }}>{s.label}</div>
              <div className="text-[16px] font-bold" style={{ color: s.green ? ACCENT : s.faint ? MUTED : '#fff', fontFamily: D }}>{s.val}</div>
            </div>
          ))}
        </div>
        <div className="rounded-lg border overflow-hidden" style={{ borderColor: BORDER }}>
          <div className="grid grid-cols-12 gap-2 px-3 py-2 text-[9px] uppercase tracking-wider border-b" style={{ background: SURFACE, borderColor: BORDER, color: MUTED, fontFamily: M }}>
            <span className="col-span-1">#</span><span className="col-span-3">SKU</span><span className="col-span-3">Product</span><span className="col-span-3">Details</span><span className="col-span-2">Status</span>
          </div>
          {rows.map((r, i) => (
            <div key={r.sku} className="grid grid-cols-12 gap-2 px-3 py-2 border-b items-center text-[10px]" style={{ borderColor: BORDER }}>
              <span className="col-span-1" style={{ color: MUTED }}>{i + 1}</span>
              <span className="col-span-3" style={{ color: ACCENT, fontFamily: M }}>{r.sku}</span>
              <span className="col-span-3 truncate" style={{ color: SECONDARY }}>{r.product}</span>
              <span className="col-span-3 flex gap-1 flex-wrap">
                {r.chips.map((c) => <span key={c} className="px-1.5 py-0.5 rounded border text-[9px]" style={{ borderColor: BORDER, color: SECONDARY }}>{c}</span>)}
              </span>
              <span className="col-span-2 flex gap-1">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ background: ACCENT + '22', color: ACCENT, fontFamily: M }}>Done</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ background: 'rgba(59,130,246,0.2)', color: '#60a5fa', fontFamily: M }}>AI</span>
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

function ScrollFeatureSection() {
  const [active, setActive] = useState(0)
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    // Use a generous rootMargin so the "active" zone is the middle ~50% of viewport — section changes as you scroll into it naturally
    const rootMargin = '-25% 0px -25% 0px'
    featureRefs.current.forEach((ref, index) => {
      if (!ref) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(index)
        },
        { rootMargin, threshold: 0.2 }
      )
      observer.observe(ref)
      observers.push(observer)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <section id="solution" style={{ background: '#0D0D0D', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1100px] mx-auto px-6 pt-28 pb-28">
        <SectionLabel n="02" text="HOW IT WORKS" />
        <div className="mb-16">
          <h2 className="text-[clamp(28px,4vw,52px)] font-bold leading-[1.06] mb-5 text-white"
            style={{ fontFamily: D, letterSpacing: '-0.04em', fontWeight: 800 }}>
            One AI layer. Every marketplace.<br />Zero manual work.
          </h2>
          <p className="text-[16px] leading-[1.75] max-w-[500px]" style={{ color: SECONDARY }}>
            Structa sits between your product catalog and every channel you sell on — standardizing, optimizing, and syncing listings automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="flex flex-col">
            {ALL_FEATURES.map((f, i) => (
              <div
                key={i}
                ref={(el) => { featureRefs.current[i] = el }}
                onClick={() => setActive(i)}
                className="py-8 border-b cursor-pointer"
                style={{ borderColor: BORDER }}
              >
                <div className="flex items-start gap-5">
                  <span style={{ fontFamily: M, fontSize: 11, color: active === i ? ACCENT : MUTED, flexShrink: 0, marginTop: 3, letterSpacing: '0.05em' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold mb-2 leading-snug transition-colors duration-500 ease-out"
                      style={{ color: active === i ? '#fff' : 'rgba(255,255,255,0.28)', fontFamily: D }}>
                      {f.title}
                    </h3>
                    <p className="text-[14px] leading-[1.75] transition-all duration-600 ease-out"
                      style={{
                        color: SECONDARY,
                        maxHeight: active === i ? 200 : 0,
                        opacity: active === i ? 1 : 0,
                        overflow: 'hidden',
                      }}>
                      {f.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block">
            <div className="sticky top-[100px]" style={{ height: 440 }}>
              <div className="relative h-full">
                {ALL_FEATURES.map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 transition-all duration-700 ease-out"
                    style={{
                      opacity: active === i ? 1 : 0,
                      transform: `translateY(${active === i ? 0 : 20}px) scale(${active === i ? 1 : 0.96})`,
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
  const [heroVisible, setHeroVisible] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen" style={{ background: BASE }}>

      {/* Nav */}
      <nav
        className="fixed top-0 w-full z-50 transition-all duration-300"
        style={{
          background: heroVisible ? 'transparent' : 'rgba(8,8,8,0.96)',
          borderBottom: heroVisible ? '1px solid transparent' : `1px solid ${BORDER}`,
          backdropFilter: heroVisible ? 'none' : 'blur(20px)',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-10">
            <a href="/" className="flex items-center gap-2.5">
              <StructaLogo size={26} />
              <span className="text-[15px] font-semibold text-white" style={{ fontFamily: D }}>
                Structa
              </span>
            </a>
            <div className="hidden md:flex items-center gap-7">
              {[
                { label: 'How it works', href: '#solution' },
                { label: 'Platforms', href: '#platforms' },
              ].map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-[12px] transition-colors duration-200"
                  style={{ color: SECONDARY, fontFamily: M, letterSpacing: '0.04em' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = SECONDARY)}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <a
            href="#cta"
            className="text-[11px] font-bold px-5 py-2.5 transition-opacity hover:opacity-85"
            style={{
              background: ACCENT,
              color: BASE,
              fontFamily: M,
              letterSpacing: '0.08em',
              borderRadius: 4,
            }}
          >
            JOIN WAITLIST
          </a>
        </div>
      </nav>

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
          <div className="flex items-center gap-3 mb-12" style={{ fontFamily: M }}>
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
            The AI operations manage for e-commerce teams.
          </h1>

          {/* Subtext */}
          <p
            className="animate-fade-up mb-10"
            style={{ fontSize: 18, lineHeight: 1.7, color: SECONDARY, maxWidth: 520, animationDelay: '0.1s' }}
          >
            Structa is the AI operations layer for e-commerce teams — automating listings, compliance, and catalog management across every marketplace you sell on.
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
                  className="h-[52px] px-5 text-[14px] focus:outline-none bg-transparent text-white placeholder:text-[rgba(255,255,255,0.25)] disabled:opacity-50"
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

          <div className="mt-16 animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <p className="text-[10px] uppercase tracking-[0.2em] mb-6" style={{ color: MUTED, fontFamily: M }}>
              Trusted by teams at
            </p>
            <div className="flex items-center justify-center gap-5">
              {[
                { src: '/logos/beira-rio.png', alt: 'Beira Rio', href: 'https://beirario.com.br', h: 22 },
                { src: '/logos/snackible.png', alt: 'Snackible', href: 'https://snackible.com', h: 30 },
                { src: '/logos/geoomnii.png', alt: 'Geoomnii', href: 'https://geopartnering.com', h: 20 },
              ].map((logo) => (
                <a
                  key={logo.alt}
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center hover:opacity-90 transition-opacity duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: `1px solid rgba(255,255,255,0.08)`,
                    borderRadius: 8,
                    padding: '10px 20px',
                  }}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    style={{ height: logo.h, width: 'auto', objectFit: 'contain' }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: MUTED }}>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8" cy="7" r="2" fill="currentColor" className="animate-bounce" />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: '#0D0D0D', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-[900px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="py-12"
                style={{
                  paddingLeft: i > 0 ? 48 : 0,
                  paddingRight: i < STATS.length - 1 ? 48 : 0,
                  borderLeft: i > 0 ? `1px solid ${BORDER}` : 'none',
                }}
              >
                <div className="text-[54px] font-bold leading-none mb-2.5 text-white" style={{ fontFamily: D, letterSpacing: '-0.04em' }}>
                  {s.value}
                </div>
                <div className="text-[11px] tracking-[0.12em] uppercase" style={{ fontFamily: M, color: MUTED }}>
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
      <section style={{ background: '#0D0D0D', borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-[1100px] mx-auto px-6 py-28">
          <SectionLabel n="01" text="THE PROBLEM" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-[clamp(24px,3.5vw,46px)] font-bold leading-[1.1] text-white mb-6"
                style={{ fontFamily: D, letterSpacing: '-0.035em', fontWeight: 800 }}>
                Selling on Amazon, Shopify, and TikTok Shop shouldn&apos;t require three different workflows.
              </h2>
              <p className="text-[16px] leading-[1.75]" style={{ color: SECONDARY }}>
                Every platform has its own listing format, compliance rules, and performance requirements. Most teams patch this together with spreadsheets, manual uploads, and tribal knowledge. That means errors, missed optimizations, and hours of work that never scale.
              </p>
            </div>
            <div className="flex flex-col">
              {PAIN_POINTS.map((point, i) => (
                <div key={point} className="flex items-start gap-5 py-5 border-b" style={{ borderColor: BORDER }}>
                  <span style={{ fontFamily: M, fontSize: 11, color: ACCENT, flexShrink: 0, marginTop: 2, letterSpacing: '0.05em' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[14px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution / Features */}
      <ScrollFeatureSection />

      {/* Testimonial */}
      <section style={{ background: '#0D0D0D', borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-[900px] mx-auto px-6 py-28">
          <SectionLabel n="04" text="EARLY PARTNERS" />
          <blockquote
            className="mb-10 text-white"
            style={{ fontFamily: D, fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 500, lineHeight: 1.5, letterSpacing: '-0.02em' }}
          >
            &ldquo;We saved over 80 hours on our last catalog cycle. Six marketplaces compiled in an afternoon, and the listings came out more accurate than anything we produced manually.&rdquo;
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[15px]"
              style={{ background: ACCENT, color: BASE, fontFamily: D }}>A</div>
            <div>
              <div className="text-[14px] font-semibold text-white" style={{ fontFamily: D }}>Aman</div>
              <div className="text-[11px] tracking-[0.08em]" style={{ fontFamily: M, color: MUTED }}>
                HEAD OF OPERATIONS, GEO PARTNERING LLC
              </div>
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
              <SectionLabel n="06" text="EARLY ACCESS" />
              <h2 className="font-bold leading-[1.04] text-white mb-6"
                style={{ fontFamily: D, fontSize: 'clamp(32px,4.5vw,58px)', letterSpacing: '-0.04em', fontWeight: 800 }}>
                Be the first to run a fully automated catalog.
              </h2>
              <p className="text-[16px] leading-[1.75]" style={{ color: SECONDARY }}>
                We&apos;re onboarding a small group of early partners. Join the waitlist and we&apos;ll reach out personally. No spam — just a real conversation about your catalog.
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
                    className="w-full h-[54px] px-5 text-[14px] focus:outline-none bg-transparent text-white placeholder:text-[rgba(255,255,255,0.25)] disabled:opacity-50"
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
                <a href="#" className="text-[12px] transition-colors hover:text-white" style={{ color: SECONDARY, fontFamily: M, letterSpacing: '0.04em' }}>
                  Book a walkthrough →
                </a>
                <span style={{ color: MUTED, fontSize: 11, fontFamily: M, letterSpacing: '0.04em' }}>No credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: BASE, borderTop: `1px solid rgba(255,255,255,0.1)` }}>
        {/* Links row */}
        <div style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between gap-6 flex-wrap">
            <div className="flex items-center gap-7 flex-wrap">
              {['How it works', 'Platforms', 'Pricing', 'About', 'Contact', 'Privacy', 'Terms'].map(l => (
                <a key={l} href="#" className="transition-colors hover:text-white" style={{ color: SECONDARY, fontFamily: M, fontSize: 11, letterSpacing: '0.05em' }}>{l}</a>
              ))}
            </div>
            <div className="flex items-center gap-2.5">
              <StructaLogo size={18} />
              <span style={{ fontFamily: M, fontSize: 10, color: MUTED, letterSpacing: '0.08em' }}>AI CATALOG OPERATIONS</span>
            </div>
          </div>
        </div>

        {/* Giant wordmark */}
        <div style={{ padding: '16px 16px 0', overflow: 'hidden' }}>
          <div style={{
            fontFamily: D,
            fontWeight: 800,
            fontSize: 'clamp(80px, 17vw, 240px)',
            letterSpacing: '-0.055em',
            lineHeight: 0.88,
            color: 'transparent',
            WebkitTextStroke: `1px rgba(255,255,255,0.07)`,
            userSelect: 'none',
          }}>
            STRUCTA
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: `1px solid ${BORDER}`, padding: '12px 24px' }}>
          <div className="max-w-[1100px] mx-auto flex items-center justify-between">
            <p style={{ fontFamily: M, fontSize: 11, color: MUTED, letterSpacing: '0.05em' }}>
              &copy; {new Date().getFullYear()} STRUCTA. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
