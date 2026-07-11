'use client'

import { useState, useEffect } from 'react'
import { Perforation } from '../../components/doc/chrome'
import { SiteFooter } from '../../components/sections/footer'

const ACCENT = '#1D7A6D'
const RED = '#C8321E'
const BASE = 'var(--dk-bg)'
const SURFACE = 'var(--dk-raised)'
const BORDER = 'var(--dk-rule)'
const MUTED = 'var(--dk-muted)'
const SECONDARY = 'rgba(244,241,234,0.78)'
const D = 'var(--font-display)'
const M = 'var(--font-mono)'

function AmplifyLogo({ size = 32 }: { size?: number }) {
  return (
    <img
      src="/logo.png"
      alt="Amplify"
      style={{ width: size, height: size, borderRadius: 2, flexShrink: 0, objectFit: 'cover' }}
    />
  )
}

function SectionLabel({ n, text, centered = false }: { n: string; text: string; centered?: boolean }) {
  if (centered) {
    return (
      <div className="flex items-center justify-center gap-3 mb-12">
        <div style={{ width: 24, height: 1, background: ACCENT }} />
        <span className="type-mono-label" style={{ color: MUTED }}>{n} — {text}</span>
        <div style={{ width: 24, height: 1, background: ACCENT }} />
      </div>
    )
  }
  return (
    <div className="flex items-center gap-3 mb-12">
      <div style={{ width: 24, height: 1, background: ACCENT }} />
      <span className="type-mono-label" style={{ color: MUTED }}>{n} — {text}</span>
    </div>
  )
}

const DEMO_RESULT = {
  url: 'amazon.com/dp/B09V3KXJPB',
  product: 'Women\'s Classic Leather Loafers - Navy Blue',
  score: 42,
  issues: [
    { type: 'sizing', severity: 'critical', text: 'No size guide or fit info — 34% of returns cite "runs small"' },
    { type: 'description', severity: 'warning', text: 'Description is 89 chars (target: 300-1000). Missing materials, care instructions' },
    { type: 'images', severity: 'warning', text: 'Only 2 images. No lifestyle shots, no size reference' },
  ],
  returnRisk: {
    score: 'HIGH',
    topReasons: [
      { reason: 'Runs small', pct: 41 },
      { reason: 'Color mismatch', pct: 28 },
      { reason: 'Quality concerns', pct: 18 },
    ],
  },
  fix: {
    field: 'title',
    before: 'Women\'s Classic Leather Loafers - Navy Blue',
    after: 'Women\'s Classic Leather Loafers - Navy Blue (Runs Small, Order Half Size Up)',
  },
}

function DemoTerminal() {
  const [step, setStep] = useState(0)
  const [typing, setTyping] = useState('')
  const fullCommand = 'npx amplify-audit https://amazon.com/dp/B09V3KXJPB'

  useEffect(() => {
    if (step === 0) {
      let i = 0
      const interval = setInterval(() => {
        setTyping(fullCommand.slice(0, i + 1))
        i++
        if (i >= fullCommand.length) {
          clearInterval(interval)
          setTimeout(() => setStep(1), 600)
        }
      }, 35)
      return () => clearInterval(interval)
    }
    if (step === 1) {
      setTimeout(() => setStep(2), 800)
    }
    if (step === 2) {
      setTimeout(() => setStep(3), 600)
    }
    if (step === 3) {
      setTimeout(() => setStep(4), 500)
    }
  }, [step])

  return (
    <div className="w-full rounded-doc overflow-hidden" style={{ background: SURFACE, border: `1px solid ${BORDER}`, boxShadow: '6px 6px 0 rgba(0,0,0,0.4)' }}>
      {/* Plate bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: BORDER, background: 'rgba(244,241,234,0.02)' }}>
        <div className="w-3 h-3 rounded-full" style={{ background: 'var(--dk-raised)', border: `1px solid ${BORDER}` }} />
        <div className="w-3 h-3 rounded-full" style={{ background: 'var(--dk-raised)', border: `1px solid ${BORDER}` }} />
        <div className="w-3 h-3 rounded-full" style={{ background: 'var(--dk-raised)', border: `1px solid ${BORDER}` }} />
        <span className="type-mono-label ml-3" style={{ fontSize: 10, color: MUTED }}>PLATE 01 — TERMINAL</span>
      </div>

      {/* Terminal content */}
      <div className="p-5 space-y-3" style={{ fontFamily: M, fontSize: 13, lineHeight: 1.7 }}>
        {/* Command line */}
        <div className="flex items-center gap-2">
          <span style={{ color: ACCENT }}>$</span>
          <span style={{ color: 'var(--dk-text)' }}>{typing}</span>
          {step === 0 && <span className="animate-pulse" style={{ color: ACCENT }}>▊</span>}
        </div>

        {step >= 1 && (
          <div className="space-y-1 animate-fade-in" style={{ color: MUTED }}>
            <div><span style={{ color: ACCENT }}>⟳</span> Fetching product data...</div>
          </div>
        )}

        {step >= 2 && (
          <div className="space-y-1 animate-fade-in" style={{ color: MUTED }}>
            <div><span style={{ color: ACCENT }}>⟳</span> Running quality analysis...</div>
            <div><span style={{ color: ACCENT }}>⟳</span> Classifying return risk...</div>
          </div>
        )}

        {step >= 3 && (
          <div className="animate-fade-in space-y-3 mt-4">
            {/* Score */}
            <div className="flex items-center gap-3">
              <span style={{ color: MUTED }}>Quality Score:</span>
              <span className="text-[18px] font-bold" style={{ color: RED }}>{DEMO_RESULT.score}/100</span>
              <span className="px-2 py-0.5 rounded-doc text-[10px] font-bold" style={{ background: 'rgba(200,50,30,0.18)', color: RED }}>NEEDS WORK</span>
            </div>

            {/* Issues */}
            <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 12 }}>
              <div className="type-mono-label mb-2" style={{ color: MUTED }}>Issues Found</div>
              {DEMO_RESULT.issues.map((issue, i) => (
                <div key={i} className="flex items-start gap-2 py-1">
                  <span style={{ color: issue.severity === 'critical' ? RED : ACCENT, fontSize: 12 }}>
                    {issue.severity === 'critical' ? '●' : '▲'}
                  </span>
                  <span style={{ color: SECONDARY, fontSize: 12 }}>{issue.text}</span>
                </div>
              ))}
            </div>

            {/* Return Risk */}
            <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 12 }}>
              <div className="type-mono-label mb-2" style={{ color: MUTED }}>Return Risk Analysis</div>
              {DEMO_RESULT.returnRisk.topReasons.map((r, i) => (
                <div key={i} className="flex items-center gap-3 py-0.5">
                  <span className="w-28 text-[12px] truncate" style={{ color: SECONDARY }}>{r.reason}</span>
                  <div className="flex-1 h-1.5 rounded-doc overflow-hidden" style={{ background: 'rgba(244,241,234,0.06)' }}>
                    <div className="h-full rounded-doc" style={{ width: `${r.pct}%`, background: i === 0 ? RED : i === 1 ? ACCENT : MUTED }} />
                  </div>
                  <span className="text-[11px] w-8 text-right" style={{ color: MUTED }}>{r.pct}%</span>
                </div>
              ))}
            </div>

            {/* Recommended Fix */}
            <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 12 }}>
              <div className="type-mono-label mb-2" style={{ color: MUTED }}>Top Recommendation</div>
              <div className="rounded-doc p-3" style={{ background: 'rgba(244,241,234,0.03)', border: `1px solid ${BORDER}` }}>
                <div className="text-[11px] mb-1" style={{ color: RED }}>
                  <span style={{ textDecoration: 'line-through' }}>{DEMO_RESULT.fix.before}</span>
                </div>
                <div className="text-[11px]" style={{ color: ACCENT }}>
                  {DEMO_RESULT.fix.after}
                </div>
              </div>
            </div>
          </div>
        )}

        {step >= 4 && (
          <div className="animate-fade-in mt-2">
            <div className="text-[11px]" style={{ color: MUTED }}>
              <span style={{ color: ACCENT }}>✓</span> Full report saved to <span style={{ color: 'var(--dk-text)' }}>./audit-report.json</span>
            </div>
            <div className="text-[11px] mt-1" style={{ color: MUTED }}>
              Want to auto-fix across all channels? → <span style={{ color: ACCENT }}>amplify.so</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
  return (
    <div className="rounded-doc overflow-hidden" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
      <div className="flex items-center justify-between px-4 py-2 border-b" style={{ borderColor: BORDER }}>
        <span className="type-mono-label" style={{ fontSize: 10, color: MUTED }}>{language}</span>
        <button className="text-[10px] px-2 py-1 rounded-doc" style={{ color: MUTED, fontFamily: M, border: `1px solid ${BORDER}` }}>Copy</button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-[13px] leading-relaxed" style={{ fontFamily: M, color: SECONDARY }}>{code}</code>
      </pre>
    </div>
  )
}

const MODULES = [
  {
    name: 'Listing Quality Scorer',
    desc: 'Programmatic PDP analysis. Title length, description completeness, missing sizing info, tag validation. No API key needed.',
    loc: '~400 lines',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    name: 'Return Reason Classifier',
    desc: '98 semantic keywords across 6 categories: sizing, quality, color mismatch, description gap, missing info. Hybrid keyword + LLM.',
    loc: '~300 lines',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 12l4-4 4 4 4-4" />
      </svg>
    ),
  },
  {
    name: 'SKU Health Scorer',
    desc: 'Weighted composite: return rate (40%), ticket rate (20%), keyword signals (25%), reason concentration via Shannon entropy (15%).',
    loc: '~150 lines',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20" />
        <circle cx="12" cy="12" r="6" />
      </svg>
    ),
  },
  {
    name: 'Recommendation Engine',
    desc: 'Generates structured JSON diffs: before/after for title, description, tags. Impact estimates with confidence scoring.',
    loc: '~400 lines',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18M3 12h18" />
        <path d="M12 8l-4 4h8l-4-4z" />
      </svg>
    ),
  },
]

const ARCH_LAYERS = [
  {
    label: 'OPEN SOURCE',
    color: ACCENT,
    items: ['Listing Scorer', 'Return Classifier', 'SKU Scorer', 'Recommendation Engine'],
  },
  {
    label: 'AMPLIFY PLATFORM',
    color: 'rgba(244,241,234,0.4)',
    items: ['Multi-Marketplace Sync', 'Continuous Monitoring', 'Auto-Apply Pipeline', 'Impact Measurement'],
  },
]

export default function OpenSourcePage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: BASE }}>

      {/* Nav */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-out"
        style={{ padding: scrolled ? '8px 12px' : '12px 12px' }}
      >
        <nav
          className="flex items-center justify-between transition-all duration-500 ease-out w-full"
          style={{
            maxWidth: scrolled ? 680 : 1200,
            height: scrolled ? 48 : 52,
            padding: scrolled ? '0 6px 0 16px' : '0 8px 0 20px',
            background: scrolled ? 'var(--dk-raised)' : 'var(--dk-bg)',
            borderRadius: 2,
            border: `1px solid ${BORDER}`,
          }}
        >
          <div className="flex items-center gap-4 md:gap-8">
            <a href="/" className="flex items-center gap-2">
              <AmplifyLogo size={scrolled ? 22 : 24} />
              <span className="text-[14px] font-semibold text-dk-text transition-all duration-500" style={{ fontFamily: D }}>
                Amplify
              </span>
            </a>
            <div className="hidden md:flex items-center gap-6">
              {[
                { label: 'Home', href: '/' },
                { label: 'Modules', href: '#modules' },
                { label: 'Architecture', href: '#architecture' },
              ].map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-[12px] transition-colors duration-200"
                  style={{ color: SECONDARY, fontFamily: M, letterSpacing: '0.03em' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--dk-text)')}
                  onMouseLeave={e => (e.currentTarget.style.color = SECONDARY as string)}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://github.com/Vatsal2006350/amplify-audit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[11px] font-bold transition-all duration-500 hover:opacity-85"
              style={{
                background: 'var(--dk-text)',
                color: 'var(--ink)',
                fontFamily: M,
                letterSpacing: '0.06em',
                borderRadius: 2,
                padding: scrolled ? '7px 14px' : '8px 16px',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              <span className="hidden sm:inline">GITHUB</span>
            </a>
          </div>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden" style={{ background: BASE }}>
        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(rgba(244,241,234,0.04) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />

        <div className="relative max-w-[1100px] mx-auto w-full px-5 sm:px-6 pt-[110px] sm:pt-[140px] md:pt-[160px] pb-[60px] sm:pb-[80px]">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-doc text-[11px] font-bold"
              style={{ background: ACCENT + '14', color: ACCENT, border: `1px solid ${ACCENT}33`, fontFamily: M, letterSpacing: '0.08em' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              OPEN SOURCE
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display animate-fade-up mb-5 sm:mb-6"
            style={{
              fontVariationSettings: "'opsz' 96",
              fontSize: 'clamp(30px, 6vw, 76px)',
              fontWeight: 540,
              lineHeight: 1.07,
              letterSpacing: '-0.015em',
              color: 'var(--dk-text)',
              maxWidth: 800,
            }}
          >
            Audit any product listing.{' '}
            <span style={{ color: ACCENT }}>Instantly.</span>
          </h1>

          {/* Subtext */}
          <p
            className="animate-fade-up mb-8 sm:mb-12 text-[15px] sm:text-[18px]"
            style={{ lineHeight: 1.7, color: SECONDARY, maxWidth: 560, animationDelay: '0.1s' }}
          >
            Paste a product URL. Get a quality score, return risk assessment, and AI-generated improvements. Free, open source, no account required.
          </p>

          {/* Install command */}
          <div className="animate-fade-up flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-16" style={{ animationDelay: '0.15s' }}>
            <div
              className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-doc overflow-x-auto max-w-full"
              style={{ background: 'rgba(244,241,234,0.04)', border: `1px solid ${BORDER}` }}
            >
              <span style={{ color: ACCENT, fontFamily: M, fontSize: 13 }}>$</span>
              <code className="text-[12px] sm:text-[14px] whitespace-nowrap" style={{ color: 'var(--dk-text)', fontFamily: M }}>npx amplify-audit {'<product-url>'}</code>
            </div>
            <a
              href="https://github.com/Vatsal2006350/amplify-audit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-doc text-[13px] font-bold transition-opacity hover:opacity-85"
              style={{ background: ACCENT, color: 'var(--paper)', fontFamily: M }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              Star on GitHub
            </a>
          </div>

          {/* Demo terminal */}
          <div className="animate-fade-up max-w-[720px]" style={{ animationDelay: '0.2s' }}>
            <DemoTerminal />
          </div>
        </div>
      </section>

      <Perforation tone="ink" />

      {/* What you get */}
      <section id="modules" style={{ background: BASE }}>
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 py-16 sm:py-28">
          <SectionLabel n="01" text="WHAT&rsquo;S INCLUDED" />
          <div className="mb-10 sm:mb-16">
            <h2 className="font-display text-[clamp(24px,4vw,48px)] leading-[1.08] text-dk-text mb-4 sm:mb-5"
              style={{ fontVariationSettings: "'opsz' 96", letterSpacing: '-0.015em', fontWeight: 540 }}>
              Four production-grade modules.<br className="hidden sm:inline" />
              <span style={{ color: ACCENT }}>Zero vendor lock-in.</span>
            </h2>
            <p className="text-[16px] leading-[1.75] max-w-[500px]" style={{ color: SECONDARY }}>
              Extracted from the Amplify platform. Each module works standalone or composes into a full audit pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MODULES.map((mod, i) => (
              <div
                key={mod.name}
                className="rounded-doc p-6 flex flex-col gap-4 transition-all duration-300"
                style={{ background: SURFACE, border: `1px solid ${BORDER}` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = ACCENT + '33')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = BORDER)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-doc flex items-center justify-center" style={{ background: ACCENT + '14', border: `1px solid ${ACCENT}22` }}>
                      {mod.icon}
                    </div>
                    <div>
                      <h3 className="text-[14px] font-semibold text-dk-text" style={{ fontFamily: D }}>{mod.name}</h3>
                      <span className="text-[10px]" style={{ color: MUTED, fontFamily: M }}>{mod.loc}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-doc" style={{ background: ACCENT + '14', color: ACCENT, fontFamily: M }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-[14px] leading-[1.7]" style={{ color: SECONDARY }}>{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Perforation tone="ink" />

      {/* Code examples */}
      <section style={{ background: BASE }}>
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 py-16 sm:py-28">
          <SectionLabel n="02" text="USAGE" />
          <div className="mb-16">
            <h2 className="font-display text-[clamp(28px,4vw,48px)] leading-[1.06] text-dk-text mb-5"
              style={{ fontVariationSettings: "'opsz' 96", letterSpacing: '-0.015em', fontWeight: 540 }}>
              npm install. Import. Ship.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="type-mono-label mb-4" style={{ color: ACCENT }}>CLI — Zero config</div>
              <CodeBlock
                language="bash"
                code={`# Audit a single product
npx amplify-audit https://amazon.com/dp/B09V3KXJPB

# Audit with return data
npx amplify-audit \\
  --product ./product.json \\
  --returns ./returns.csv

# Output as JSON for CI/CD
npx amplify-audit <url> --format json`}
              />
            </div>

            <div className="space-y-3">
              <div className="type-mono-label mb-4" style={{ color: ACCENT }}>Library — Full control</div>
              <CodeBlock
                language="typescript"
                code={`import { audit } from 'amplify-audit'

const report = await audit({
  url: 'https://amazon.com/dp/B09V3KXJPB',
  // Optional: include return data
  returns: returnData,
})

console.log(report.score)        // 42
console.log(report.issues)       // [{ type, severity, text }]
console.log(report.returnRisk)   // { score, topReasons }
console.log(report.fixes)        // [{ field, before, after }]`}
              />
            </div>
          </div>
        </div>
      </section>

      <Perforation tone="ink" />

      {/* Architecture */}
      <section id="architecture" style={{ background: BASE }}>
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 py-16 sm:py-28">
          <SectionLabel n="03" text="ARCHITECTURE" centered />
          <h2 className="font-display text-center text-[clamp(28px,4vw,48px)] leading-[1.06] text-dk-text mb-5"
            style={{ fontVariationSettings: "'opsz' 96", letterSpacing: '-0.015em', fontWeight: 540 }}>
            Open core. Full pipeline behind it.
          </h2>
          <p className="text-center text-[16px] leading-[1.75] max-w-[520px] mx-auto mb-16" style={{ color: SECONDARY }}>
            The audit tools give you the analysis. The Amplify platform gives you continuous monitoring, auto-fix, and multi-channel sync.
          </p>

          {/* Architecture diagram */}
          <div className="max-w-[700px] mx-auto space-y-4">
            {ARCH_LAYERS.map((layer) => (
              <div key={layer.label} className="rounded-doc p-6" style={{ background: SURFACE, border: `1px solid ${layer.color === ACCENT ? ACCENT + '33' : BORDER}` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full" style={{ background: layer.color }} />
                  <span className="type-mono-label font-bold" style={{ fontSize: 10, color: layer.color }}>{layer.label}</span>
                  {layer.label === 'OPEN SOURCE' && (
                    <span className="text-[9px] px-2 py-0.5 rounded-doc" style={{ background: ACCENT + '14', color: ACCENT, fontFamily: M }}>FREE</span>
                  )}
                  {layer.label === 'AMPLIFY PLATFORM' && (
                    <span className="text-[9px] px-2 py-0.5 rounded-doc" style={{ background: 'rgba(244,241,234,0.06)', color: MUTED, fontFamily: M }}>MANAGED</span>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {layer.items.map((item) => (
                    <div
                      key={item}
                      className="rounded-doc px-3 py-2.5 text-center text-[12px]"
                      style={{
                        background: layer.color === ACCENT ? ACCENT + '0a' : 'rgba(244,241,234,0.03)',
                        border: `1px solid ${layer.color === ACCENT ? ACCENT + '22' : BORDER}`,
                        color: layer.color === ACCENT ? ACCENT : MUTED,
                        fontFamily: M,
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Arrow between layers */}
            <div className="flex justify-center py-2">
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-6" style={{ background: `linear-gradient(to bottom, ${ACCENT}44, rgba(244,241,234,0.16))` }} />
                <span className="text-[10px]" style={{ color: MUTED, fontFamily: M }}>powers</span>
                <div className="w-px h-6" style={{ background: `linear-gradient(to bottom, rgba(244,241,234,0.16), transparent)` }} />
              </div>
            </div>

            {/* Amplify platform CTA */}
            <div className="rounded-doc p-6 text-center" style={{ background: 'rgba(29,122,109,0.06)', border: `1px solid ${ACCENT}22` }}>
              <p className="text-[14px] mb-4" style={{ color: SECONDARY }}>
                The audit finds the problems. <strong style={{ color: 'var(--dk-text)' }}>Amplify fixes them across every channel, automatically.</strong>
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-doc text-[12px] font-bold transition-opacity hover:opacity-90"
                style={{ background: ACCENT, color: 'var(--paper)', fontFamily: M }}
              >
                Try Amplify Platform
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Perforation tone="ink" />

      {/* Use cases */}
      <section style={{ background: BASE }}>
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 py-16 sm:py-28">
          <SectionLabel n="04" text="USE CASES" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Shopify Store Audit',
                desc: 'Run amplify-audit on your entire Shopify catalog. Get a prioritized list of listings that need attention — sorted by return risk.',
                cmd: 'npx amplify-audit --shopify mystore.myshopify.com',
              },
              {
                title: 'Amazon Listing Check',
                desc: 'Paste any Amazon product URL and get instant scoring. Compare your listings against category benchmarks.',
                cmd: 'npx amplify-audit https://amazon.com/dp/...',
              },
              {
                title: 'CI/CD Quality Gate',
                desc: 'Add listing quality checks to your deployment pipeline. Fail builds when listing scores drop below threshold.',
                cmd: 'amplify-audit --ci --min-score 70',
              },
            ].map((uc) => (
              <div key={uc.title} className="rounded-doc p-6 flex flex-col gap-4" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
                <h3 className="text-[15px] font-semibold text-dk-text" style={{ fontFamily: D }}>{uc.title}</h3>
                <p className="text-[14px] leading-[1.7] flex-1" style={{ color: SECONDARY }}>{uc.desc}</p>
                <div className="rounded-doc px-3 py-2 text-[11px]" style={{ background: 'rgba(244,241,234,0.03)', border: `1px solid ${BORDER}`, color: ACCENT, fontFamily: M }}>
                  $ {uc.cmd}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Perforation tone="ink" />

      {/* Bottom CTA */}
      <section className="relative overflow-hidden" style={{ background: BASE }}>
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 py-16 sm:py-28 relative text-center">
          <h2 className="font-display leading-[1.06] text-dk-text mb-6"
            style={{ fontVariationSettings: "'opsz' 96", fontSize: 'clamp(32px,4.5vw,58px)', letterSpacing: '-0.015em', fontWeight: 540 }}>
            Start auditing in 30 seconds.
          </h2>
          <p className="text-[16px] leading-[1.75] max-w-[480px] mx-auto mb-10" style={{ color: SECONDARY }}>
            No account. No API key. Just one command.
          </p>

          <div className="flex flex-col items-center gap-5">
            <div
              className="inline-flex items-center gap-3 px-6 py-4 rounded-doc"
              style={{ background: 'rgba(244,241,234,0.04)', border: `1px solid ${BORDER}` }}
            >
              <span style={{ color: ACCENT, fontFamily: M, fontSize: 16 }}>$</span>
              <code className="text-[16px]" style={{ color: 'var(--dk-text)', fontFamily: M }}>npx amplify-audit {'<your-product-url>'}</code>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Vatsal2006350/amplify-audit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-doc text-[13px] font-bold transition-opacity hover:opacity-85"
                style={{ background: 'var(--dk-text)', color: 'var(--ink)', fontFamily: M }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                View on GitHub
              </a>
              <a
                href="/"
                className="px-6 py-3 rounded-doc text-[13px] font-bold transition-opacity hover:opacity-85"
                style={{ color: ACCENT, fontFamily: M, border: `1px solid ${ACCENT}44` }}
              >
                Try Amplify Platform
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter tone="ink" />
    </div>
  )
}
