'use client'

import { useState, useEffect, useRef } from 'react'

const PLATFORMS = [
  'Centrepoint', 'Namshi', '6th Street', 'Trendyol', 'FirstCry',
  'Amazon', 'Noon', 'Shopify',
]

const STATS = [
  { value: '9+', label: 'Marketplace platforms' },
  { value: '30%', label: 'Avg. return rate reduction' },
  { value: '80hrs', label: 'Saved per catalog cycle' },
]

const LISTING_FEATURES = [
  {
    title: 'Accurate attributes from product images.',
    body: 'Structa reads your photos to infer size guides, materials, occasions, and colours. No manual entry.',
  },
  {
    title: 'One master sheet. Every platform.',
    body: 'Upload once. Structa maps to every marketplace template automatically and produces a ready-to-submit feed.',
  },
  {
    title: 'Catch listings before they cause returns.',
    body: 'Every SKU scored by return rate, support tickets, and customer language. Problems surfaced early, with the exact correction.',
  },
]

const BUYING_FEATURES = [
  {
    title: 'Review a diff. Click approve.',
    body: 'AI proposes the exact listing change, backed by customer evidence. See before and after, then ship it live in one click.',
  },
  {
    title: 'Every change is logged with rollback.',
    body: 'Full audit trail on every edit. Revert anything, instantly. Know exactly what changed and when.',
  },
  {
    title: 'Listing performance informs purchase orders.',
    body: 'What sells stays in stock. What drives returns gets fixed or cut. Structa closes the loop between listings and buying.',
  },
]

function StructaLogo({ size = 32, light = false }: { size?: number; light?: boolean }) {
  return (
    <div
      className="bg-gradient-to-br from-[#1D7A6D] to-[#2A9D8F] rounded-lg flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <svg className="text-white" style={{ width: size * 0.5, height: size * 0.5 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M12 9v6" />
      </svg>
    </div>
  )
}

function PlaceholderScreen({ index, dark = false }: { index: number; dark?: boolean }) {
  const screens = [
    { label: 'Listing Generator', color: '#1D7A6D' },
    { label: 'Feed Export', color: '#0e6b5f' },
    { label: 'Issue Detection', color: '#1D7A6D' },
    { label: 'Fix Review', color: '#166359' },
    { label: 'Impact Dashboard', color: '#1D7A6D' },
    { label: 'Buying Intelligence', color: '#0e6b5f' },
  ]
  const s = screens[index % screens.length]
  const bg = dark ? '#111' : '#f8faf9'
  const cardBg = dark ? '#1a1a1a' : '#fff'
  const borderColor = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
  const barBg = dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'
  const lineBg = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'

  return (
    <div className="w-full h-full rounded-2xl flex flex-col overflow-hidden" style={{ background: bg, border: `1px solid ${borderColor}`, boxShadow: dark ? '0 32px 80px rgba(0,0,0,0.5)' : '0 24px 60px rgba(0,0,0,0.08)' }}>
      <div className="flex items-center gap-1.5 px-4 py-3 border-b" style={{ background: barBg, borderColor }}>
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-4 flex-1 h-4 rounded-md max-w-[180px]" style={{ background: lineBg }} />
      </div>
      <div className="flex-1 p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold" style={{ background: s.color }}>S</div>
            <div className="h-2.5 rounded w-24" style={{ background: lineBg }} />
          </div>
          <div className="h-6 rounded-md px-3 flex items-center text-white text-[10px] font-medium" style={{ background: s.color }}>Export</div>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-xl p-3" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
              <div className="h-4 rounded w-10 mb-2" style={{ background: s.color + '30' }} />
              <div className="h-2 rounded mb-1" style={{ background: lineBg }} />
              <div className="h-2 rounded w-3/4" style={{ background: lineBg }} />
            </div>
          ))}
        </div>
        <div className="flex-1 rounded-xl p-3 flex flex-col gap-0" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
          <div className="flex items-center gap-2 py-2 border-b text-[10px] font-semibold" style={{ borderColor, color: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}>
            <span className="flex-1">SKU</span><span className="w-16">Return rate</span><span className="w-12">Status</span>
          </div>
          {[
            { sku: 'EMMA-001', rate: '38%', status: 'Fix', high: true },
            { sku: 'FORMAL-042', rate: '20%', status: 'Fix', high: false },
            { sku: 'LOAFER-48', rate: '20%', status: 'Fix', high: false },
            { sku: 'BOOT-019', rate: '9%', status: 'OK', high: false },
            { sku: 'SNKR-77', rate: '5%', status: 'OK', high: false },
          ].map((row, i) => (
            <div key={i} className="flex items-center gap-2 py-2 border-b" style={{ borderColor }}>
              <span className="flex-1 text-[11px] font-mono" style={{ color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>{row.sku}</span>
              <span className="w-16 text-[11px]" style={{ color: row.high ? '#ef4444' : (dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)') }}>{row.rate}</span>
              <span className="w-12 h-5 rounded-full flex items-center justify-center text-[9px] font-semibold text-white" style={{ background: row.status === 'Fix' ? s.color : '#9ca3af' }}>{row.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FeatureSection({
  label,
  headline,
  subheadline,
  features,
  screenOffset = 0,
  dark = false,
}: {
  label: string
  headline: string
  subheadline: string
  features: { title: string; body: string }[]
  screenOffset?: number
  dark?: boolean
}) {
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setActive(0)
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const bg = dark ? '#0a0a0a' : '#fff'
  const textPrimary = dark ? '#fff' : '#0f0f0f'
  const textMuted = dark ? 'rgba(255,255,255,0.35)' : '#9ca3af'
  const textBody = dark ? 'rgba(255,255,255,0.55)' : '#6b7280'
  const borderColor = dark ? 'rgba(255,255,255,0.06)' : '#f0f0f0'
  const activeBorder = '#1D7A6D'

  return (
    <section ref={sectionRef} style={{ background: bg, borderTop: `1px solid ${borderColor}` }}>
      <div className="max-w-[1100px] mx-auto px-6 py-28">
        <div className="mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: '#2A9D8F' }}>{label}</p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.035em] leading-[1.08] mb-4" style={{ color: textPrimary }}>
            {headline}
          </h2>
          <p className="text-[17px] leading-[1.7] max-w-[500px]" style={{ color: textBody }}>{subheadline}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="flex flex-col gap-0">
            {features.map((f, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="text-left py-6 border-b transition-all duration-200"
                style={{ borderColor }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-0.5 self-stretch rounded-full flex-shrink-0 transition-all duration-300 mt-1"
                    style={{ background: active === i ? activeBorder : 'transparent', minHeight: 20 }}
                  />
                  <div>
                    <h3
                      className="text-[16px] font-semibold mb-2 leading-snug transition-colors duration-200"
                      style={{ color: active === i ? textPrimary : textMuted }}
                    >
                      {f.title}
                    </h3>
                    <p
                      className="text-[14px] leading-[1.7] transition-all duration-300"
                      style={{
                        color: textBody,
                        maxHeight: active === i ? 120 : 0,
                        opacity: active === i ? 1 : 0,
                        overflow: 'hidden',
                      }}
                    >
                      {f.body}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="relative" style={{ height: 440 }}>
            {features.map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-all duration-500"
                style={{
                  opacity: active === i ? 1 : 0,
                  transform: `translateY(${active === i ? 0 : 12}px) scale(${active === i ? 1 : 0.98})`,
                  pointerEvents: active === i ? 'auto' : 'none',
                }}
              >
                <PlaceholderScreen index={screenOffset + i} dark={dark} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [heroVisible, setHeroVisible] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)

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
    <div className="min-h-screen">

      {/* ─── Navbar ─── */}
      <nav
        className="fixed top-0 w-full z-50 transition-all duration-300"
        style={{
          background: heroVisible ? 'rgba(5,5,5,0)' : 'rgba(255,255,255,0.94)',
          borderBottom: heroVisible ? '1px solid transparent' : '1px solid #e5e7eb',
          backdropFilter: heroVisible ? 'none' : 'blur(20px)',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-10">
            <a href="/" className="flex items-center gap-2.5">
              <StructaLogo size={28} />
              <span
                className="text-[15px] font-semibold tracking-tight transition-colors duration-300"
                style={{ color: heroVisible ? '#fff' : '#0f0f0f' }}
              >
                Structa
              </span>
            </a>
            <div className="hidden md:flex items-center gap-7">
              {['Listings', 'Returns', 'Platforms'].map(l => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  className="text-[13px] transition-colors duration-300"
                  style={{ color: heroVisible ? 'rgba(255,255,255,0.45)' : '#6b7280' }}
                  onMouseEnter={e => (e.currentTarget.style.color = heroVisible ? '#fff' : '#0f0f0f')}
                  onMouseLeave={e => (e.currentTarget.style.color = heroVisible ? 'rgba(255,255,255,0.45)' : '#6b7280')}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
          <a
            href="#cta"
            className="text-[13px] font-medium px-5 py-2.5 rounded-full transition-all duration-300"
            style={{
              background: heroVisible ? '#1D7A6D' : '#0f0f0f',
              color: '#fff',
            }}
          >
            Request access
          </a>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
        style={{ background: '#050505' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full blur-[140px]" style={{ background: 'radial-gradient(ellipse, rgba(29,122,109,0.18) 0%, transparent 70%)' }} />
        </div>

        <div className="relative max-w-[860px] mx-auto text-center">
          <h1 className="text-[clamp(52px,8vw,96px)] font-bold leading-[0.92] tracking-[-0.04em] text-white mb-8 animate-fade-up">
            Precision listing management<br />
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>for modern retail teams.</span>
          </h1>

          <p className="text-[18px] sm:text-[20px] leading-[1.65] mb-12 animate-fade-up max-w-[540px] mx-auto" style={{ color: 'rgba(255,255,255,0.45)', animationDelay: '0.1s' }}>
            Structa generates accurate product listings, identifies what is driving returns, and ships the fix.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-[420px] mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Work email"
              className="w-full sm:flex-1 h-[50px] px-5 rounded-full text-[14px] focus:outline-none transition-all"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
            />
            <button
              className="w-full sm:w-auto h-[50px] px-8 text-[14px] font-medium rounded-full whitespace-nowrap transition-all"
              style={{ background: '#1D7A6D', color: '#fff' }}
            >
              Request access
            </button>
          </div>
          <p className="mt-5 text-[12px]" style={{ color: 'rgba(255,255,255,0.2)', animationDelay: '0.4s' }}>
            No credit card required
          </p>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: 'rgba(255,255,255,0.2)' }}>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8" cy="7" r="2" fill="currentColor" className="animate-bounce" />
          </svg>
        </div>
      </section>

      {/* ─── Stats bar ─── */}
      <section style={{ background: '#0a0a0a', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-[900px] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-[56px] font-bold tracking-[-0.04em] text-white leading-none mb-2">{s.value}</div>
              <div className="text-[13px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Platform bar ─── */}
      <section style={{ background: '#0a0a0a', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-[1000px] mx-auto px-6 py-12">
          <p className="text-center text-[10px] uppercase tracking-[0.25em] font-medium mb-9" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Built for teams selling on
          </p>
          <div className="flex items-center justify-center gap-10 sm:gap-14 flex-wrap">
            {PLATFORMS.map((name) => (
              <span key={name} className="text-[12px] font-bold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Descriptor bridge ─── */}
      <section style={{ background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
        <div className="max-w-[720px] mx-auto px-6 py-24 text-center">
          <h2 className="text-[clamp(24px,3.5vw,40px)] font-bold tracking-[-0.03em] leading-[1.15] text-[#0f0f0f]">
            Where catalog operations teams fix product listings, reduce returns, and make smarter buying decisions.
          </h2>
        </div>
      </section>

      {/* ─── Listing feature section ─── */}
      <div id="listings">
        <FeatureSection
          label="Product Listings"
          headline="Accurate at scale."
          subheadline="From image to published listing. Structa handles attribute extraction, template mapping, and quality control automatically."
          features={LISTING_FEATURES}
          screenOffset={0}
          dark={false}
        />
      </div>

      {/* ─── Returns feature section ─── */}
      <div id="returns">
        <FeatureSection
          label="Returns and Buying"
          headline="Fix listings. Inform buying."
          subheadline="Every return is a signal. Structa reads them, proposes corrections, and feeds that intelligence into your purchase decisions."
          features={BUYING_FEATURES}
          screenOffset={3}
          dark={true}
        />
      </div>

      {/* ─── Testimonial ─── */}
      <section style={{ background: '#fff', borderTop: '1px solid #f0f0f0' }}>
        <div className="max-w-[1100px] mx-auto px-6 py-28">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-center mb-14" style={{ color: '#2A9D8F' }}>
            Hear from Structa customers
          </p>
          <div className="max-w-[700px] mx-auto">
            <div className="rounded-2xl p-10" style={{ background: '#f9fafb', border: '1px solid #f0f0f0' }}>
              <p className="text-[20px] sm:text-[22px] font-medium leading-[1.55] text-[#374151] mb-8">
                "We saved over 80 hours on our last catalog cycle. Six marketplaces compiled in an afternoon, and the listings came out more accurate than anything we produced manually."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#e8f5f3] flex items-center justify-center text-[#1D7A6D] font-bold text-[15px]">A</div>
                <div>
                  <div className="text-[14px] font-semibold text-[#0f0f0f]">Aman</div>
                  <div className="text-[13px] text-[#9ca3af]">Head of Operations, Geo Partnering LLC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Platforms ─── */}
      <section id="platforms" style={{ background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
        <div className="max-w-[800px] mx-auto px-6 py-28 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: '#2A9D8F' }}>Platforms</p>
          <h2 className="text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.035em] leading-[1.1] text-[#0f0f0f] mb-5">
            Every marketplace. One workflow.
          </h2>
          <p className="text-[16px] text-[#6b7280] max-w-[480px] mx-auto leading-relaxed mb-12">
            Platform-specific field mappings, banner rows, and category-conditional attributes built in. Or bring any custom template.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {PLATFORMS.map((p) => (
              <span
                key={p}
                className="px-5 py-2.5 rounded-full text-[13px] font-medium cursor-default transition-all"
                style={{ border: '1px solid #e5e7eb', background: '#fff', color: '#374151' }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section id="cta" style={{ background: '#050505' }}>
        <div className="max-w-[660px] mx-auto px-6 py-36 text-center">
          <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ position: 'absolute' }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px]" style={{ background: 'radial-gradient(ellipse, rgba(29,122,109,0.15) 0%, transparent 70%)' }} />
          </div>
          <h2 className="text-[clamp(32px,5vw,58px)] font-bold tracking-[-0.04em] leading-[1.05] text-white mb-6 relative">
            See it with your own catalog.
          </h2>
          <p className="text-[17px] leading-[1.7] mb-12 relative" style={{ color: 'rgba(255,255,255,0.4)' }}>
            No integrations required to start. Upload a master sheet and see your first compiled feed in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative">
            <a
              href="#"
              className="h-[50px] px-10 inline-flex items-center text-[14px] font-medium rounded-full transition-all"
              style={{ background: '#1D7A6D', color: '#fff' }}
            >
              Request access
            </a>
            <a
              href="#"
              className="h-[50px] px-10 inline-flex items-center text-[14px] font-medium rounded-full transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }}
            >
              Book a walkthrough
            </a>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-[1100px] mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between gap-10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <StructaLogo size={26} />
                <span className="text-[14px] font-semibold text-white">Structa</span>
              </div>
              <p className="text-[13px] max-w-[220px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Product listing management for modern retail teams.
              </p>
            </div>
            <div className="flex gap-16">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.25)' }}>Product</p>
                {['Listings', 'Returns', 'Platforms', 'Pricing'].map(l => (
                  <a key={l} href="#" className="block text-[13px] mb-2.5 transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}>{l}</a>
                ))}
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.25)' }}>Company</p>
                {['About', 'Contact', 'Privacy', 'Terms'].map(l => (
                  <a key={l} href="#" className="block text-[13px] mb-2.5 transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}>{l}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.2)' }}>© {new Date().getFullYear()} Structa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
