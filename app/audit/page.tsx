'use client'

import { useState, useEffect } from 'react'

const ACCENT = '#C5F135'
const BASE = '#080808'
const SURFACE = '#111111'
const BORDER = 'rgba(255,255,255,0.07)'
const MUTED = 'rgba(255,255,255,0.55)'
const SECONDARY = 'rgba(255,255,255,0.75)'
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
    <div style={{ width: size, height: size, background: ACCENT, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg style={{ width: size * 0.5, height: size * 0.5, color: BASE }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M12 9v6" />
      </svg>
    </div>
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
  const color = score >= 70 ? '#22c55e' : score >= 40 ? '#f59e0b' : '#ef4444'
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
          <circle cx={s.w / 2} cy={s.h / 2} r={(s.w - s.ring * 2) / 2} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={s.ring} />
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
    <div className="rounded-lg p-4" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}` }}>
      <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: MUTED, fontFamily: M }}>{label}</div>
      <div className="text-[28px] font-bold" style={{ color: color || '#fff', fontFamily: D }}>{value}</div>
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
      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div className="h-full rounded-full" style={{ width: `${barPct}%`, background: pct > 60 ? '#ef4444' : pct > 30 ? '#f59e0b' : ACCENT, transition: 'width 0.8s ease-out' }} />
      </div>
      <span className="w-12 text-right text-[11px] font-bold" style={{ color: MUTED, fontFamily: M }}>{pct}%</span>
    </div>
  )
}

function ProductCard({ product }: { product: ProductAudit }) {
  const [expanded, setExpanded] = useState(false)
  const scoreColor = product.qualityScore >= 70 ? '#22c55e' : product.qualityScore >= 40 ? '#f59e0b' : '#ef4444'

  return (
    <div
      className="rounded-lg overflow-hidden cursor-pointer transition-all duration-200"
      style={{ background: SURFACE, border: `1px solid ${expanded ? scoreColor + '44' : BORDER}` }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center gap-3 p-3">
        <div className="w-12 h-12 rounded flex-shrink-0 overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
          {product.image ? (
            <img src={product.image} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[18px]">📦</div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-medium text-white truncate">{product.title}</div>
          <div className="flex items-center gap-2 mt-0.5">
            {product.price && <span className="text-[11px]" style={{ color: MUTED, fontFamily: M }}>${product.price}</span>}
            {product.issueCount.errors > 0 && (
              <span className="text-[9px] px-1.5 py-0.5 rounded font-bold" style={{ background: 'rgba(239,68,68,0.12)', color: '#ef4444', fontFamily: M }}>
                {product.issueCount.errors} error{product.issueCount.errors > 1 ? 's' : ''}
              </span>
            )}
            {product.issueCount.warnings > 0 && (
              <span className="text-[9px] px-1.5 py-0.5 rounded font-bold" style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b', fontFamily: M }}>
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
            <div className="flex items-start gap-2 py-1.5 px-2 rounded mb-1" style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)' }}>
              <span className="text-[10px] mt-0.5 flex-shrink-0" style={{ color: '#8b5cf6' }}>AI</span>
              <span className="text-[12px]" style={{ color: SECONDARY }}>{product.aiSummary}</span>
            </div>
          )}
          {product.issues.map((issue, i) => (
            <div key={i} className="flex items-start gap-2 py-1">
              <span style={{ color: issue.type === 'error' ? '#ef4444' : issue.type === 'warning' ? '#f59e0b' : MUTED, fontSize: 10, marginTop: 2 }}>
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
    <div className="rounded-lg overflow-hidden" style={{ background: '#0a0a0a', border: `1px solid ${BORDER}` }}>
      <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <span className="text-[10px] uppercase tracking-wider" style={{ color: MUTED, fontFamily: M }}>{language}</span>
        <button onClick={handleCopy} className="text-[10px] px-2 py-1 rounded transition-all" style={{ color: copied ? ACCENT : MUTED, fontFamily: M, background: copied ? ACCENT + '14' : 'transparent' }}>
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
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center" style={{ padding: '12px 16px' }}>
        <nav className="flex items-center justify-between" style={{
          width: 'min(1200px, calc(100% - 32px))',
          height: 52,
          padding: '0 6px 0 20px',
          background: 'rgba(18,18,18,0.85)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: scrolled ? 9999 : 16,
          border: `1px solid rgba(255,255,255,0.1)`,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          transition: 'border-radius 0.5s ease',
        }}>
          <a href="/" className="flex items-center gap-2">
            <AmplifyLogo size={22} />
            <span className="text-[14px] font-semibold text-white" style={{ fontFamily: D }}>Amplify</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: ACCENT + '14', color: ACCENT, fontFamily: M }}>AUDIT</span>
          </a>
          <div className="flex items-center gap-3">
            <a href="https://github.com/Vatsal2006350/amplify-audit" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-[11px] font-bold transition-opacity hover:opacity-80" style={{ color: SECONDARY, fontFamily: M }}>
              <GithubIcon size={14} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a href="https://www.npmjs.com/package/amplify-audit" target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold transition-opacity hover:opacity-80" style={{ color: SECONDARY, fontFamily: M }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z"/></svg>
              npm
            </a>
            <a href="/" className="text-[11px] font-bold px-4 py-2 rounded-full" style={{ background: ACCENT, color: BASE, fontFamily: M }}>
              Get Amplify
            </a>
          </div>
        </nav>
      </div>

      {/* Hero + Input */}
      <div className="pt-24 pb-8 px-6">
        <div className="max-w-[700px] mx-auto text-center">
          {status === 'idle' && (
            <>
              {/* Open source badge */}
              <a
                href="https://github.com/Vatsal2006350/amplify-audit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full transition-all duration-200 hover:border-[rgba(255,255,255,0.2)]"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <GithubIcon size={12} />
                <span className="text-[11px]" style={{ color: SECONDARY, fontFamily: M }}>Open source on GitHub</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: ACCENT + '14', color: ACCENT, fontFamily: M }}>MIT</span>
              </a>

              <h1 className="text-[clamp(32px,5vw,56px)] font-bold text-white mb-4 animate-fade-up" style={{ fontFamily: D, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                Audit any product listing.
              </h1>
              <p className="text-[16px] mb-8 animate-fade-up" style={{ color: SECONDARY, animationDelay: '0.1s' }}>
                Paste any URL. We detect the platform and scan every product we find.
              </p>
            </>
          )}

          <form onSubmit={(e) => { e.preventDefault(); runAudit() }} className="flex items-center gap-2 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <div className="flex-1 relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="allbirds.com, amazon.ae/s?k=nike, amazon.com/dp/..."
                disabled={status === 'loading'}
                className="w-full h-[56px] pl-5 pr-4 text-[15px] rounded-lg focus:outline-none bg-transparent text-white placeholder:text-[rgba(255,255,255,0.3)] disabled:opacity-50"
                style={{ border: `1px solid rgba(255,255,255,0.12)`, background: 'rgba(255,255,255,0.04)' }}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading' || !url.trim()}
              className="h-[56px] px-8 rounded-lg text-[13px] font-bold whitespace-nowrap transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: ACCENT, color: BASE, fontFamily: M }}
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
            <div className="mt-6 px-5 py-3 rounded-lg inline-flex items-center gap-2" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <span className="text-[13px]" style={{ color: '#ef4444' }}>{error}</span>
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
                    className="px-3 py-1.5 rounded-lg text-[11px] transition-all hover:border-[rgba(255,255,255,0.15)]"
                    style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`, color: SECONDARY, fontFamily: M }}
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
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px]" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${BORDER}`, color: MUTED, fontFamily: M }}>
                  Single product analysis — paste a store URL or use Brand Search for bulk analysis
                </span>
              </div>
            )}
            {result.mode === 'brand' && (
              <div className="mb-4 text-center">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px]" style={{ background: 'rgba(197,241,53,0.06)', border: `1px solid ${ACCENT}22`, color: ACCENT, fontFamily: M }}>
                  Detected brand &quot;{result.storeName}&quot; — found {result.productCount} products on Amazon
                </span>
              </div>
            )}

            {/* Overview bar */}
            <div className="rounded-xl p-6 mb-6" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
              <div className="flex items-center gap-8 flex-wrap">
                <ScoreBadge score={result.averageScore} size="lg" />
                <div className="flex-1 min-w-0">
                  <h2 className="text-[20px] font-bold text-white mb-1" style={{ fontFamily: D }}>
                    {result.storeName || (() => { try { return new URL(result.storeUrl).hostname } catch { return result.storeUrl } })()}
                  </h2>
                  <p className="text-[13px]" style={{ color: MUTED, fontFamily: M }}>
                    {result.productCount} product{result.productCount !== 1 ? 's' : ''} scanned
                    {result.platform !== 'unknown' && (
                      <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] uppercase" style={{ background: 'rgba(255,255,255,0.06)', color: MUTED }}>
                        {result.platform}
                      </span>
                    )}
                    {result.aiPowered && (
                      <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] uppercase font-bold" style={{ background: 'rgba(139,92,246,0.1)', color: '#8b5cf6' }}>
                        AI-powered
                      </span>
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <StatCard label="Good" value={result.scoreDistribution.good} color="#22c55e" />
                  <StatCard label="Needs Work" value={result.scoreDistribution.needsWork} color="#f59e0b" />
                  <StatCard label="Poor" value={result.scoreDistribution.poor} color="#ef4444" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Top Issues */}
              <div className="lg:col-span-1">
                <div className="rounded-xl p-5" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
                  <h3 className="text-[13px] font-bold text-white mb-4" style={{ fontFamily: D }}>Top Issues</h3>
                  {result.topIssues.map((issue) => (
                    <IssueBar key={issue.category} category={issue.category} count={issue.count} total={result.productCount} maxCount={result.topIssues[0]?.count || 1} />
                  ))}
                </div>

                <div className="mt-4 rounded-xl p-5" style={{ background: 'rgba(197,241,53,0.04)', border: `1px solid ${ACCENT}22` }}>
                  <p className="text-[13px] mb-3" style={{ color: SECONDARY }}>
                    Want to <strong style={{ color: '#fff' }}>auto-fix</strong> these issues across your entire catalog?
                  </p>
                  <a href="/" className="inline-block px-4 py-2 rounded-lg text-[12px] font-bold" style={{ background: ACCENT, color: BASE, fontFamily: M }}>
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
                      className="px-3 py-1.5 rounded-full text-[11px] font-bold transition-all"
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

      {/* Open Source + Developer Section */}
      <div className="px-6 py-20" style={{ borderTop: `1px solid ${BORDER}` }}>
        <div className="max-w-[1100px] mx-auto">

          {/* Section header */}
          <div className="flex items-center gap-3 mb-12" style={{ fontFamily: M }}>
            <div style={{ width: 24, height: 1, background: ACCENT }} />
            <span style={{ fontSize: 11, letterSpacing: '0.12em', color: MUTED }}>OPEN SOURCE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: text */}
            <div>
              <h2 className="text-[clamp(28px,4vw,44px)] font-bold text-white mb-5" style={{ fontFamily: D, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
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
                  <div key={mod.name} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${BORDER}` }}>
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: ACCENT }} />
                    <div>
                      <div className="text-[13px] font-medium text-white">{mod.name}</div>
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
                  className="flex items-center gap-2 px-5 py-3 rounded-lg text-[12px] font-bold transition-opacity hover:opacity-90"
                  style={{ background: '#fff', color: BASE, fontFamily: M }}
                >
                  <GithubIcon size={16} />
                  Star on GitHub
                </a>
                <a
                  href="https://www.npmjs.com/package/amplify-audit"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-lg text-[12px] font-bold transition-opacity hover:opacity-90"
                  style={{ background: 'transparent', color: ACCENT, fontFamily: M, border: `1px solid ${ACCENT}44` }}
                >
                  View on npm
                </a>
              </div>
            </div>

            {/* Right: code examples */}
            <div>
              {/* Install command */}
              <div className="rounded-lg p-4 mb-4 flex items-center justify-between" style={{ background: '#0a0a0a', border: `1px solid ${ACCENT}33` }}>
                <div className="flex items-center gap-3">
                  <span className="text-[11px]" style={{ color: ACCENT, fontFamily: M }}>$</span>
                  <code className="text-[14px]" style={{ color: '#fff', fontFamily: M }}>npm install amplify-audit</code>
                </div>
                <button
                  onClick={() => { navigator.clipboard.writeText('npm install amplify-audit') }}
                  className="text-[10px] px-2 py-1 rounded transition-all hover:opacity-80"
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
                    className="px-3 py-1.5 rounded text-[11px] font-bold transition-all"
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
              <div className="mt-6 p-4 rounded-lg" style={{ background: 'rgba(197,241,53,0.04)', border: `1px solid ${ACCENT}22` }}>
                <div className="text-[11px] uppercase tracking-wider mb-2" style={{ color: ACCENT, fontFamily: M }}>Open-core model</div>
                <p className="text-[12px] leading-relaxed" style={{ color: SECONDARY }}>
                  The audit engine is free and open source. The full <a href="/" className="underline" style={{ color: '#fff' }}>Amplify platform</a> adds AI-powered auto-fixes, Shopify sync, return tracking, and multi-channel management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-8 text-center" style={{ borderTop: `1px solid ${BORDER}` }}>
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <a href="/" className="flex items-center gap-2">
            <AmplifyLogo size={16} />
            <span className="text-[11px] font-semibold text-white" style={{ fontFamily: D }}>Amplify</span>
          </a>
          <a href="https://github.com/Vatsal2006350/amplify-audit" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] transition-opacity hover:opacity-80" style={{ color: MUTED, fontFamily: M }}>
            <GithubIcon size={11} /> GitHub
          </a>
          <a href="https://www.npmjs.com/package/amplify-audit" target="_blank" rel="noopener noreferrer" className="text-[11px] transition-opacity hover:opacity-80" style={{ color: MUTED, fontFamily: M }}>
            npm
          </a>
          <span className="text-[11px]" style={{ color: MUTED, fontFamily: M }}>MIT License</span>
        </div>
      </div>
    </div>
  )
}
