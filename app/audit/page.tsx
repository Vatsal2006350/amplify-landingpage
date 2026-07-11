'use client'

import { useState, useEffect } from 'react'
import { Barcode, Perforation } from '../../components/doc/chrome'
import { SiteFooter } from '../../components/sections/footer'

const ACCENT = '#1D7A6D'
const GREEN = '#4a7c59'
const RED = '#C8321E'
const BASE = 'var(--dk-bg)'
const SURFACE = 'var(--dk-raised)'
const BORDER = 'var(--dk-rule)'
const MUTED = 'var(--dk-muted)'
const SECONDARY = 'rgba(244,241,234,0.78)'
const D = 'var(--font-display)'
const M = 'var(--font-mono)'

interface ProductAudit {
  title: string
  url: string
  image: string | null
  price: string | null
  vendor: string | null
  qualityScore: number
  issues: Array<{ type: string; category: string; message: string }>
  issueCount: { errors: number; warnings: number; info: number }
  aiSummary?: string
}

interface StoreAudit {
  storeUrl: string
  storeName: string | null
  productCount: number
  averageScore: number
  scoreDistribution: { good: number; needsWork: number; poor: number }
  topIssues: Array<{ category: string; count: number; percentage: number }>
  products: ProductAudit[]
  mode: 'store' | 'product' | 'brand'
  platform: string
  aiPowered?: boolean
}

function AmplifyLogo({ size = 32 }: { size?: number }) {
  return (
    <img
      src="/logo.png"
      alt="Amplify"
      style={{ width: size, height: size, borderRadius: 2, flexShrink: 0, objectFit: 'cover' }}
    />
  )
}

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function ScoreBadge({ score, size = 'md' }: { score: number; size?: 'sm' | 'md' | 'lg' }) {
  const color = score >= 70 ? GREEN : score >= 40 ? ACCENT : RED
  const label = score >= 70 ? 'Good' : score >= 40 ? 'Needs Work' : 'Poor'
  const sizes = {
    sm: { w: 40, h: 40, font: 14, ring: 3 },
    md: { w: 56, h: 56, font: 18, ring: 3 },
    lg: { w: 100, h: 100, font: 32, ring: 4 },
  }
  const s = sizes[size]
  const circumference = (s.w - s.ring * 2) * Math.PI
  const filled = (score / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: s.w, height: s.h }}>
        <svg width={s.w} height={s.h} viewBox={`0 0 ${s.w} ${s.h}`} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={s.w / 2} cy={s.h / 2} r={(s.w - s.ring * 2) / 2} fill="none" stroke="rgba(244,241,234,0.08)" strokeWidth={s.ring} />
          <circle cx={s.w / 2} cy={s.h / 2} r={(s.w - s.ring * 2) / 2} fill="none" stroke={color} strokeWidth={s.ring}
            strokeDasharray={circumference} strokeDashoffset={circumference - filled} strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-bold" style={{ fontSize: s.font, color, fontFamily: D }}>{score}</span>
        </div>
      </div>
      {size === 'lg' && (
        <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color, fontFamily: M }}>{label}</span>
      )}
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: number | string; color?: string }) {
  return (
    <div className="rounded-doc p-4" style={{ background: 'rgba(244,241,234,0.03)', border: `1px solid ${BORDER}` }}>
      <div className="type-mono-label mb-1" style={{ fontSize: 10, color: MUTED }}>{label}</div>
      <div className="text-[28px] font-bold" style={{ color: color || 'var(--dk-text)', fontFamily: D }}>{value}</div>
    </div>
  )
}

function IssueBar({ category, count, total, maxCount }: { category: string; count: number; total: number; maxCount: number }) {
  const pct = Math.round((count / total) * 100)
  const barPct = Math.round((count / maxCount) * 100)
  const labels: Record<string, string> = {
    sizing: 'Missing Sizing Info',
    description: 'Short Description',
    title: 'Title Issues',
    images: 'Missing Images',
    material: 'No Materials Listed',
    care: 'No Care Instructions',
    tags: 'Low Tag Count',
    price: 'Missing Price',
    vendor: 'No Brand Info',
  }

  return (
    <div className="flex items-center gap-3 py-2">
      <span className="w-40 text-[12px] truncate" style={{ color: SECONDARY }}>{labels[category] || category}</span>
      <div className="flex-1 h-2 rounded-doc overflow-hidden" style={{ background: 'rgba(244,241,234,0.06)' }}>
        <div className="h-full rounded-doc" style={{ width: `${barPct}%`, background: pct > 60 ? RED : pct > 30 ? ACCENT : GREEN, transition: 'width 0.8s ease-out' }} />
      </div>
      <span className="w-12 text-right text-[11px] font-bold" style={{ color: MUTED, fontFamily: M }}>{pct}%</span>
    </div>
  )
}

function ProductCard({ product }: { product: ProductAudit }) {
  const [expanded, setExpanded] = useState(false)
  const scoreColor = product.qualityScore >= 70 ? GREEN : product.qualityScore >= 40 ? ACCENT : RED

  return (
    <div
      className="rounded-doc overflow-hidden cursor-pointer transition-all duration-200"
      style={{ background: SURFACE, border: `1px solid ${expanded ? scoreColor + '44' : BORDER}` }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center gap-3 p-3">
        <div className="w-12 h-12 rounded-doc flex-shrink-0 overflow-hidden" style={{ background: 'rgba(244,241,234,0.04)' }}>
          {product.image ? (
            <img src={product.image} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[18px]">📦</div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-medium text-dk-text truncate">{product.title}</div>
          <div className="flex items-center gap-2 mt-0.5">
            {product.price && <span className="text-[11px]" style={{ color: MUTED, fontFamily: M }}>${product.price}</span>}
            {product.issueCount.errors > 0 && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-doc font-bold" style={{ background: 'rgba(200,50,30,0.16)', color: RED, fontFamily: M }}>
                {product.issueCount.errors} error{product.issueCount.errors > 1 ? 's' : ''}
              </span>
            )}
            {product.issueCount.warnings > 0 && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-doc font-bold" style={{ background: 'rgba(29,122,109,0.12)', color: ACCENT, fontFamily: M }}>
                {product.issueCount.warnings} warning{product.issueCount.warnings > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
        <ScoreBadge score={product.qualityScore} size="sm" />
      </div>
      {expanded && (product.issues.length > 0 || product.aiSummary) && (
        <div className="px-3 pb-3 pt-1 space-y-1" style={{ borderTop: `1px solid ${BORDER}` }}>
          {product.aiSummary && (
            <div className="flex items-start gap-2 py-1.5 px-2 rounded-doc mb-1" style={{ background: 'rgba(29,122,109,0.06)', border: '1px solid rgba(29,122,109,0.2)' }}>
              <span className="text-[10px] mt-0.5 flex-shrink-0" style={{ color: ACCENT }}>AI</span>
              <span className="text-[12px]" style={{ color: SECONDARY }}>{product.aiSummary}</span>
            </div>
          )}
          {product.issues.map((issue, i) => (
            <div key={i} className="flex items-start gap-2 py-1">
              <span style={{ color: issue.type === 'error' ? RED : issue.type === 'warning' ? ACCENT : MUTED, fontSize: 10, marginTop: 2 }}>
                {issue.type === 'error' ? '●' : issue.type === 'warning' ? '▲' : '○'}
              </span>
              <span className="text-[12px]" style={{ color: SECONDARY }}>{issue.message}</span>
            </div>
          ))}
          {product.url && (
            <a href={product.url} target="_blank" rel="noopener noreferrer"
              className="inline-block mt-2 text-[11px] transition-opacity hover:opacity-80"
              style={{ color: ACCENT, fontFamily: M }}
              onClick={(e) => e.stopPropagation()}
            >
              View product →
            </a>
          )}
        </div>
      )}
    </div>
  )
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-doc overflow-hidden" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
      <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <span className="type-mono-label" style={{ fontSize: 10, color: MUTED }}>{language}</span>
        <button onClick={handleCopy} className="text-[10px] px-2 py-1 rounded-doc transition-all" style={{ color: copied ? ACCENT : MUTED, fontFamily: M, background: copied ? ACCENT + '14' : 'transparent' }}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-[13px] leading-relaxed" style={{ fontFamily: M, color: SECONDARY }}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

export default function AuditPage() {
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')
  const [result, setResult] = useState<StoreAudit | null>(null)
  const [filter, setFilter] = useState<'all' | 'poor' | 'needsWork' | 'good'>('all')
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState<'cli' | 'node' | 'ci'>('cli')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  async function runAudit() {
    if (!url.trim()) return
    setStatus('loading')
    setError('')
    setResult(null)

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus('error')
        setError(data.error || 'Something went wrong')
        return
      }
      setResult(data)
      setStatus('done')
    } catch {
      setStatus('error')
      setError('Failed to connect. Please try again.')
    }
  }

  const filteredProducts = result?.products.filter((p) => {
    if (filter === 'poor') return p.qualityScore < 40
    if (filter === 'needsWork') return p.qualityScore >= 40 && p.qualityScore < 70
    if (filter === 'good') return p.qualityScore >= 70
    return true
  }) || []

  const codeExamples = {
    cli: `# Install globally
npm install -g amplify-audit

# Audit a Shopify store
amplify-audit https://allbirds.com

# Audit an Amazon product
amplify-audit https://amazon.com/dp/B09V3K...

# JSON output for CI pipelines
amplify-audit https://yourstore.com --json --min-score 60`,
    node: `import { audit } from 'amplify-audit'

// Audit any product URL
const report = await audit('https://allbirds.com/products/wool-runners')

console.log(report.qualityScore)  // 72
console.log(report.issues)        // [{ type: 'warning', ... }]
console.log(report.recommendations) // [{ field: 'description', ... }]`,
    ci: `# .github/workflows/audit.yml
name: Listing Quality Gate
on: [push]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install -g amplify-audit
      - run: amplify-audit $STORE_URL --json --min-score 60
        env:
          STORE_URL: \${{ secrets.STORE_URL }}`,
  }

  return (
    <div className="min-h-screen" style={{ background: BASE }}>

      {/* Nav */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center" style={{ padding: '8px 12px' }}>
        <nav className="flex items-center justify-between w-full" style={{
          maxWidth: 1200,
          height: 48,
          padding: '0 6px 0 16px',
          background: scrolled ? 'var(--dk-raised)' : 'var(--dk-bg)',
          borderRadius: 2,
          border: `1px solid ${BORDER}`,
          transition: 'background 0.5s ease',
        }}>
          <a href="/" className="flex items-center gap-2">
            <AmplifyLogo size={22} />
            <span className="text-[14px] font-semibold text-dk-text" style={{ fontFamily: D }}>Amplify</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-doc hidden sm:inline" style={{ background: ACCENT + '14', color: ACCENT, fontFamily: M }}>AUDIT</span>
          </a>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="https://github.com/Vatsal2006350/amplify-audit" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-[11px] font-bold transition-opacity hover:opacity-80" style={{ color: SECONDARY, fontFamily: M }}>
              <GithubIcon size={14} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a href="/" className="text-[11px] font-bold px-3 sm:px-4 py-2 rounded-doc" style={{ background: ACCENT, color: 'var(--paper)', fontFamily: M }}>
              Get Amplify
            </a>
          </div>
        </nav>
      </div>

      {/* Hero + Input */}
      <div className="pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-6">
        <div className="max-w-[700px] mx-auto text-center">
          {status === 'idle' && (
            <>
              {/* Open source badge */}
              <a
                href="https://github.com/Vatsal2006350/amplify-audit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mb-5 sm:mb-6 px-3 py-1.5 rounded-doc transition-all duration-200 hover:border-[rgba(244,241,234,0.3)]"
                style={{ background: 'rgba(244,241,234,0.04)', border: `1px solid ${BORDER}` }}
              >
                <GithubIcon size={12} />
                <span className="text-[11px]" style={{ color: SECONDARY, fontFamily: M }}>Open source on GitHub</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-doc" style={{ background: ACCENT + '14', color: ACCENT, fontFamily: M }}>MIT</span>
              </a>

              <div className="mb-5 flex justify-center">
                <Barcode seed="AMP-AUDIT" tone="ink" height={22} />
              </div>

              <h1 className="font-display text-[clamp(28px,5vw,56px)] text-dk-text mb-3 sm:mb-4 animate-fade-up" style={{ fontVariationSettings: "'opsz' 96", fontWeight: 540, letterSpacing: '-0.015em', lineHeight: 1.1 }}>
                Audit any product listing.
              </h1>
              <p className="text-[15px] sm:text-[16px] mb-6 sm:mb-8 animate-fade-up" style={{ color: SECONDARY, animationDelay: '0.1s' }}>
                Paste any URL. We detect the platform and scan every product we find.
              </p>
            </>
          )}

          <form onSubmit={(e) => { e.preventDefault(); runAudit() }} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <div className="flex-1 relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="allbirds.com, amazon.ae/s?k=nike..."
                disabled={status === 'loading'}
                className="w-full h-[48px] sm:h-[56px] pl-4 sm:pl-5 pr-4 text-[14px] sm:text-[15px] rounded-doc focus:outline-none bg-transparent text-dk-text placeholder:text-[rgba(244,241,234,0.35)] disabled:opacity-50"
                style={{ border: `1px solid rgba(244,241,234,0.2)`, background: 'rgba(244,241,234,0.04)' }}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading' || !url.trim()}
              className="h-[48px] sm:h-[56px] px-6 sm:px-8 rounded-doc text-[13px] font-bold whitespace-nowrap transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: ACCENT, color: 'var(--paper)', fontFamily: M }}
            >
              {status === 'loading' ? 'Scanning...' : 'Audit'}
            </button>
          </form>

          {status === 'loading' && (
            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: `${ACCENT}33`, borderTopColor: ACCENT }} />
              <p className="text-[13px]" style={{ color: MUTED, fontFamily: M }}>Detecting platform, finding products, running AI analysis...</p>
              <p className="text-[11px]" style={{ color: MUTED }}>We auto-detect brands and scan all products. AI analysis powered by Claude.</p>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-6 px-5 py-3 rounded-doc inline-flex items-center gap-2" style={{ background: 'rgba(200,50,30,0.14)', border: '1px solid rgba(200,50,30,0.3)' }}>
              <span className="text-[13px]" style={{ color: RED }}>{error}</span>
            </div>
          )}

          {status === 'idle' && (
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {[
                  'Shopify stores',
                  'Amazon search pages',
                  'Any product URL',
                ].map((t) => (
                  <span key={t} className="text-[11px]" style={{ color: MUTED, fontFamily: M }}>{t}</span>
                ))}
              </div>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {[
                  { label: 'allbirds.com', desc: 'Full Shopify catalog' },
                  { label: 'amazon.ae/s?k=nike', desc: 'All Nike on Amazon UAE' },
                  { label: 'amazon.com/dp/B09...', desc: 'Single product' },
                ].map((ex) => (
                  <button
                    key={ex.label}
                    onClick={() => setUrl(ex.label)}
                    className="px-3 py-1.5 rounded-doc text-[11px] transition-all hover:border-[rgba(244,241,234,0.3)]"
                    style={{ background: 'rgba(244,241,234,0.03)', border: `1px solid ${BORDER}`, color: SECONDARY, fontFamily: M }}
                    title={ex.desc}
                  >
                    {ex.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="px-6 pb-12 animate-fade-up">
          <div className="max-w-[1100px] mx-auto">

            {/* Mode indicator */}
            {result.mode === 'product' && (
              <div className="mb-4 text-center">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-doc text-[11px]" style={{ background: 'rgba(244,241,234,0.04)', border: `1px solid ${BORDER}`, color: MUTED, fontFamily: M }}>
                  Single product analysis — paste a store URL or use Brand Search for bulk analysis
                </span>
              </div>
            )}
            {result.mode === 'brand' && (
              <div className="mb-4 text-center">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-doc text-[11px]" style={{ background: 'rgba(29,122,109,0.08)', border: `1px solid ${ACCENT}22`, color: ACCENT, fontFamily: M }}>
                  Detected brand &quot;{result.storeName}&quot; — found {result.productCount} products on Amazon
                </span>
              </div>
            )}

            {/* Overview bar */}
            <div className="rounded-doc p-6 mb-6" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
              <div className="flex items-center gap-8 flex-wrap">
                <ScoreBadge score={result.averageScore} size="lg" />
                <div className="flex-1 min-w-0">
                  <h2 className="text-[20px] font-bold text-dk-text mb-1" style={{ fontFamily: D }}>
                    {result.storeName || (() => { try { return new URL(result.storeUrl).hostname } catch { return result.storeUrl } })()}
                  </h2>
                  <p className="text-[13px]" style={{ color: MUTED, fontFamily: M }}>
                    {result.productCount} product{result.productCount !== 1 ? 's' : ''} scanned
                    {result.platform !== 'unknown' && (
                      <span className="ml-2 px-1.5 py-0.5 rounded-doc text-[9px] uppercase" style={{ background: 'rgba(244,241,234,0.06)', color: MUTED }}>
                        {result.platform}
                      </span>
                    )}
                    {result.aiPowered && (
                      <span className="ml-2 px-1.5 py-0.5 rounded-doc text-[9px] uppercase font-bold" style={{ background: 'rgba(29,122,109,0.12)', color: ACCENT }}>
                        AI-powered
                      </span>
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <StatCard label="Good" value={result.scoreDistribution.good} color={GREEN} />
                  <StatCard label="Needs Work" value={result.scoreDistribution.needsWork} color={ACCENT} />
                  <StatCard label="Poor" value={result.scoreDistribution.poor} color={RED} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Top Issues */}
              <div className="lg:col-span-1">
                <div className="rounded-doc p-5" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
                  <h3 className="text-[13px] font-bold text-dk-text mb-4" style={{ fontFamily: D }}>Top Issues</h3>
                  {result.topIssues.map((issue) => (
                    <IssueBar key={issue.category} category={issue.category} count={issue.count} total={result.productCount} maxCount={result.topIssues[0]?.count || 1} />
                  ))}
                </div>

                <div className="mt-4 rounded-doc p-5" style={{ background: 'rgba(29,122,109,0.06)', border: `1px solid ${ACCENT}22` }}>
                  <p className="text-[13px] mb-3" style={{ color: SECONDARY }}>
                    Want to <strong style={{ color: 'var(--dk-text)' }}>auto-fix</strong> these issues across your entire catalog?
                  </p>
                  <a href="/" className="inline-block px-4 py-2 rounded-doc text-[12px] font-bold" style={{ background: ACCENT, color: 'var(--paper)', fontFamily: M }}>
                    Try Amplify Platform
                  </a>
                </div>
              </div>

              {/* Right: Product grid */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  {([
                    { key: 'all', label: `All (${result.productCount})` },
                    { key: 'poor', label: `Poor (${result.scoreDistribution.poor})` },
                    { key: 'needsWork', label: `Needs Work (${result.scoreDistribution.needsWork})` },
                    { key: 'good', label: `Good (${result.scoreDistribution.good})` },
                  ] as const).map((tab) => (
                    <button key={tab.key} onClick={() => setFilter(tab.key)}
                      className="px-3 py-1.5 rounded-doc text-[11px] font-bold transition-all"
                      style={{
                        background: filter === tab.key ? ACCENT + '14' : 'transparent',
                        color: filter === tab.key ? ACCENT : MUTED,
                        border: `1px solid ${filter === tab.key ? ACCENT + '33' : BORDER}`,
                        fontFamily: M,
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  {filteredProducts.map((product, i) => (
                    <ProductCard key={i} product={product} />
                  ))}
                  {filteredProducts.length === 0 && (
                    <div className="text-center py-12 text-[13px]" style={{ color: MUTED }}>
                      No products match this filter.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Perforation tone="ink" />

      {/* Open Source + Developer Section */}
      <div className="px-6 py-20">
        <div className="max-w-[1100px] mx-auto">

          {/* Section header */}
          <div className="flex items-center gap-3 mb-12">
            <div style={{ width: 24, height: 1, background: ACCENT }} />
            <span className="type-mono-label" style={{ color: MUTED }}>OPEN SOURCE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: text */}
            <div>
              <h2 className="font-display text-[clamp(28px,4vw,44px)] text-dk-text mb-5" style={{ fontVariationSettings: "'opsz' 96", fontWeight: 540, letterSpacing: '-0.015em', lineHeight: 1.1 }}>
                Built for developers.<br />
                <span style={{ color: ACCENT }}>Open source.</span>
              </h2>
              <p className="text-[16px] leading-relaxed mb-8" style={{ color: SECONDARY }}>
                The same scoring engine that powers this tool is available as an npm package. Run audits from your terminal, integrate into CI/CD, or build custom tooling on top.
              </p>

              {/* Quick stats */}
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: ACCENT }} />
                  <span className="text-[12px]" style={{ color: MUTED, fontFamily: M }}>MIT Licensed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: ACCENT }} />
                  <span className="text-[12px]" style={{ color: MUTED, fontFamily: M }}>Zero dependencies</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: ACCENT }} />
                  <span className="text-[12px]" style={{ color: MUTED, fontFamily: M }}>TypeScript</span>
                </div>
              </div>

              {/* Module cards */}
              <div className="space-y-3">
                {[
                  { name: 'Listing Quality Analyzer', desc: 'Scores title, description, images, sizing info, material, care instructions' },
                  { name: 'Return Reason Classifier', desc: '98-keyword semantic classifier across 5 categories (sizing, quality, etc.)' },
                  { name: 'SKU Health Scorer', desc: 'Shannon entropy-based fixability scoring for return-driving products' },
                  { name: 'Fix Recommender', desc: 'Deterministic recommendations by issue type — no API key required' },
                ].map((mod) => (
                  <div key={mod.name} className="flex items-start gap-3 p-3 rounded-doc" style={{ background: 'rgba(244,241,234,0.02)', border: `1px solid ${BORDER}` }}>
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: ACCENT }} />
                    <div>
                      <div className="text-[13px] font-medium text-dk-text">{mod.name}</div>
                      <div className="text-[12px] mt-0.5" style={{ color: MUTED }}>{mod.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex items-center gap-3 mt-8">
                <a
                  href="https://github.com/Vatsal2006350/amplify-audit"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-doc text-[12px] font-bold transition-opacity hover:opacity-90"
                  style={{ background: 'var(--dk-text)', color: 'var(--ink)', fontFamily: M }}
                >
                  <GithubIcon size={16} />
                  Star on GitHub
                </a>
              </div>
            </div>

            {/* Right: code examples */}
            <div>
              {/* Install command */}
              <div className="rounded-doc p-4 mb-4 flex items-center justify-between" style={{ background: SURFACE, border: `1px solid ${ACCENT}33` }}>
                <div className="flex items-center gap-3">
                  <span className="text-[11px]" style={{ color: ACCENT, fontFamily: M }}>$</span>
                  <code className="text-[14px]" style={{ color: 'var(--dk-text)', fontFamily: M }}>npm install amplify-audit</code>
                </div>
                <button
                  onClick={() => { navigator.clipboard.writeText('npm install amplify-audit') }}
                  className="text-[10px] px-2 py-1 rounded-doc transition-all hover:opacity-80"
                  style={{ color: MUTED, fontFamily: M }}
                >
                  Copy
                </button>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 mb-3">
                {([
                  { key: 'cli', label: 'CLI' },
                  { key: 'node', label: 'Node.js' },
                  { key: 'ci', label: 'CI/CD' },
                ] as const).map((tab) => (
                  <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                    className="px-3 py-1.5 rounded-doc text-[11px] font-bold transition-all"
                    style={{
                      background: activeTab === tab.key ? ACCENT + '14' : 'transparent',
                      color: activeTab === tab.key ? ACCENT : MUTED,
                      fontFamily: M,
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <CodeBlock code={codeExamples[activeTab]} language={activeTab === 'ci' ? 'yaml' : activeTab === 'cli' ? 'bash' : 'typescript'} />

              {/* Architecture note */}
              <div className="mt-6 p-4 rounded-doc" style={{ background: 'rgba(29,122,109,0.06)', border: `1px solid ${ACCENT}22` }}>
                <div className="type-mono-label mb-2" style={{ color: ACCENT }}>Open-core model</div>
                <p className="text-[12px] leading-relaxed" style={{ color: SECONDARY }}>
                  The audit engine is free and open source. The full <a href="/" className="underline" style={{ color: 'var(--dk-text)' }}>Amplify platform</a> adds AI-powered auto-fixes, Shopify sync, return tracking, and multi-channel management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Perforation tone="ink" />

      {/* Footer */}
      <SiteFooter tone="ink" />
    </div>
  )
}
