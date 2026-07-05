import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { USE_CASES, getUseCase, type UseCase } from '../data'

const ACCENT = '#C5F135'
const BASE = '#080808'
const BORDER = 'rgba(255,255,255,0.12)'
const GLASS = 'rgba(255,255,255,0.065)'
const MUTED = 'rgba(255,255,255,0.58)'
const SOFT = 'rgba(255,255,255,0.76)'
const L_BG = '#fbfcf8'
const L_TEXT = '#111111'
const L_MUTED = '#6c7168'
const L_BORDER = 'rgba(0,0,0,0.1)'
const D = 'var(--font-display)'
const M = 'var(--font-mono)'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return USE_CASES.map((useCase) => ({ slug: useCase.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const useCase = getUseCase(slug)

  if (!useCase) {
    return {
      title: 'Amplify Use Case',
    }
  }

  return {
    title: `${useCase.label} | Amplify`,
    description: useCase.summary,
  }
}

function Logo({ size = 32 }: { size?: number }) {
  return (
    <div className="grid shrink-0 place-items-center rounded-lg bg-black" style={{ width: size, height: size }}>
      <img src="/logo.png" alt="Amplify" className="h-[72%] w-[72%] object-contain" />
    </div>
  )
}

function SectionLabel({ label, tone = 'dark' }: { label: string; tone?: 'dark' | 'light' }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-9" style={{ background: ACCENT }} />
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: tone === 'dark' ? MUTED : L_MUTED, fontFamily: M }}>
        {label}
      </span>
    </div>
  )
}

function Header({ activeSlug }: { activeSlug: string }) {
  const navLinks = [
    { label: 'Product', href: '/#product-flow' },
    { label: 'Platform', href: '/#platform' },
    { label: 'Enrichment', href: '/#enrichment' },
    { label: 'Integrations', href: '/#integrations' },
  ]

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex justify-center px-3 pt-3">
      <nav
        className="flex h-[58px] w-full max-w-[1180px] items-center justify-between rounded-lg border px-4"
        style={{ background: 'rgba(8,8,8,0.78)', borderColor: BORDER, backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', boxShadow: '0 16px 50px rgba(0,0,0,0.28)' }}
      >
        <Link href="/" className="flex items-center gap-2">
          <Logo size={26} />
          <span className="text-[14px] font-semibold text-white" style={{ fontFamily: D }}>Amplify</span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/#product-flow" className="text-[12px]" style={{ color: SOFT, fontFamily: M }}>Product</Link>
          <div className="group relative">
            <button type="button" className="flex items-center gap-1 text-[12px]" style={{ color: SOFT, fontFamily: M }}>
              Use cases
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: MUTED }}>
                <path d="M3 5l3 3 3-3" />
              </svg>
            </button>
            <div className="pointer-events-none absolute left-1/2 top-full z-20 w-[292px] -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
              <div className="overflow-hidden rounded-lg border p-2" style={{ background: 'rgba(14,14,14,0.97)', borderColor: BORDER, boxShadow: '0 24px 70px rgba(0,0,0,0.38)' }}>
                {USE_CASES.map((item) => (
                  <Link key={item.slug} href={`/use-cases/${item.slug}`} className="block rounded-md px-3 py-3 transition-colors hover:bg-white/5" style={{ background: item.slug === activeSlug ? 'rgba(197,241,53,0.1)' : 'transparent' }}>
                    <span className="block text-[12px] font-semibold text-white" style={{ fontFamily: D }}>{item.label}</span>
                    <span className="mt-0.5 block text-[10px] uppercase" style={{ color: item.slug === activeSlug ? ACCENT : MUTED, fontFamily: M }}>{item.navDetail}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {navLinks.slice(1).map((link) => (
            <Link key={link.href} href={link.href} className="text-[12px]" style={{ color: SOFT, fontFamily: M }}>
              {link.label}
            </Link>
          ))}
        </div>
        <Link href="/#cta" className="rounded-lg px-4 py-2 text-[11px] font-bold uppercase" style={{ background: ACCENT, color: BASE, fontFamily: M }}>
          Get early access
        </Link>
      </nav>
    </header>
  )
}

function StatusBadge({ status }: { status: UseCase['tableRows'][number][3] }) {
  const styles = {
    Ready: { background: '#e8f7ed', color: '#137a3a', borderColor: '#bfe7cd' },
    Review: { background: '#fff7db', color: '#9a6500', borderColor: '#ecd48a' },
    Blocked: { background: '#fff0ef', color: '#b53a32', borderColor: '#efc5c0' },
    Open: { background: '#f3f5ef', color: '#646b5d', borderColor: '#e2e8da' },
  }[status]

  return (
    <span className="rounded-md border px-2 py-1 text-[10px] font-semibold uppercase" style={{ ...styles, fontFamily: M }}>
      {status}
    </span>
  )
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border bg-white p-4" style={{ borderColor: L_BORDER }}>
      <div className="text-[28px] font-bold leading-none" style={{ color: L_TEXT, fontFamily: D }}>{value}</div>
      <div className="mt-2 text-[10px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>{label}</div>
    </div>
  )
}

function AppWorkspace({ useCase }: { useCase: UseCase }) {
  return (
    <div className="overflow-hidden rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.16)', background: '#eef3ed', boxShadow: '0 34px 110px rgba(0,0,0,0.36)' }}>
      <div className="flex items-center justify-between gap-4 border-b px-4 py-3" style={{ borderColor: L_BORDER, background: '#0d0f0c' }}>
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="hidden min-w-0 rounded-md border px-3 py-1.5 text-[11px] sm:block" style={{ borderColor: 'rgba(255,255,255,0.12)', color: MUTED, fontFamily: M }}>
            app.use-amplify.com/geoomnii/{useCase.slug}
          </div>
        </div>
        <button type="button" className="rounded-md px-3 py-1.5 text-[10px] font-bold uppercase" style={{ background: ACCENT, color: BASE, fontFamily: M }}>
          Run
        </button>
      </div>

      <div className="grid min-h-[650px] lg:grid-cols-[238px_1fr]">
        <aside className="border-b bg-[#f7faf6] p-4 lg:border-b-0 lg:border-r" style={{ borderColor: L_BORDER }}>
          <div className="mb-5 flex items-center gap-2">
            <Logo size={28} />
            <div>
              <div className="text-[14px] font-semibold" style={{ color: L_TEXT, fontFamily: D }}>Amplify</div>
              <div className="text-[10px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>Geoomnii workspace</div>
            </div>
          </div>
          <div className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
            {USE_CASES.map((item) => {
              const selected = item.slug === useCase.slug
              return (
                <Link
                  key={item.slug}
                  href={`/use-cases/${item.slug}`}
                  className="rounded-lg border px-3 py-3 text-left transition-colors"
                  style={{ borderColor: selected ? '#b7dcbf' : 'transparent', background: selected ? '#eaf6e7' : 'transparent' }}
                >
                  <div className="text-[10px] uppercase" style={{ color: selected ? '#1D7A6D' : L_MUTED, fontFamily: M }}>{item.appLabel}</div>
                  <div className="mt-1 text-[14px] font-semibold" style={{ color: L_TEXT, fontFamily: D }}>{item.label}</div>
                </Link>
              )
            })}
          </div>
          <div className="mt-5 rounded-lg border bg-white p-3" style={{ borderColor: L_BORDER }}>
            <div className="mb-2 text-[10px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>Connected sources</div>
            <div className="space-y-1.5">
              {useCase.sources.map((source) => (
                <div key={source} className="truncate rounded-md bg-[#f3f6f0] px-2 py-1.5 text-[11px]" style={{ color: L_MUTED, fontFamily: M }}>
                  {source}
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="min-w-0 bg-[#eef3ed]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-white px-4 py-4 sm:px-5" style={{ borderColor: L_BORDER }}>
            <div>
              <div className="text-[10px] uppercase" style={{ color: '#1D7A6D', fontFamily: M }}>{useCase.appLabel}</div>
              <h2 className="mt-1 text-[24px] font-semibold leading-tight" style={{ color: L_TEXT, fontFamily: D }}>{useCase.label}</h2>
            </div>
            <div className="rounded-md border px-3 py-1.5 text-[10px] font-semibold uppercase" style={{ borderColor: '#d9e8dd', background: '#f4faef', color: '#137a3a', fontFamily: M }}>
              Approval gated
            </div>
          </div>

          <div className="grid gap-4 p-4 sm:p-5 xl:grid-cols-[0.92fr_1.08fr]">
            <section className="space-y-4">
              <div className="rounded-lg border bg-white p-4" style={{ borderColor: L_BORDER }}>
                <div className="text-[10px] uppercase" style={{ color: '#1D7A6D', fontFamily: M }}>Operator request</div>
                <p className="mt-2 text-[21px] font-semibold leading-snug" style={{ color: L_TEXT, fontFamily: D }}>
                  {useCase.command}
                </p>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {useCase.metrics.map(([value, label]) => (
                  <MetricCard key={label} value={value} label={label} />
                ))}
              </div>

              <div className="rounded-lg border bg-white p-4" style={{ borderColor: L_BORDER }}>
                <div className="mb-4 text-[10px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>Run timeline</div>
                <div className="space-y-3">
                  {useCase.steps.map((step, index) => (
                    <div key={step} className="flex items-center gap-3">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[12px] font-bold" style={{ background: ACCENT, color: BASE, fontFamily: D }}>{index + 1}</span>
                      <span className="text-[14px]" style={{ color: L_TEXT }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <div className="rounded-lg border bg-white p-4" style={{ borderColor: L_BORDER }}>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>Operator view</div>
                    <h3 className="mt-1 text-[20px] font-semibold" style={{ color: L_TEXT, fontFamily: D }}>{useCase.tableTitle}</h3>
                  </div>
                  <span className="rounded-md px-2 py-1 text-[10px] font-bold uppercase" style={{ background: ACCENT, color: BASE, fontFamily: M }}>Live data</span>
                </div>
                <div className="overflow-hidden rounded-lg border" style={{ borderColor: L_BORDER }}>
                  {useCase.tableRows.map((row, index) => (
                    <div key={`${row[0]}-${row[1]}`} className="grid grid-cols-12 gap-3 border-b px-3 py-3 text-[12px] last:border-b-0" style={{ borderColor: L_BORDER, background: index === 0 ? '#f4faef' : '#fff' }}>
                      <span className="col-span-3 truncate font-semibold" style={{ color: L_TEXT }}>{row[0]}</span>
                      <span className="col-span-4 truncate" style={{ color: L_TEXT }}>{row[1]}</span>
                      <span className="col-span-3 truncate" style={{ color: L_MUTED }}>{row[2]}</span>
                      <span className="col-span-2 text-right"><StatusBadge status={row[3]} /></span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border bg-white p-4" style={{ borderColor: L_BORDER }}>
                <div className="mb-4 text-[10px] uppercase" style={{ color: L_MUTED, fontFamily: M }}>Action queue</div>
                <div className="space-y-3">
                  {useCase.actions.map((action) => (
                    <div key={action[0]} className="rounded-lg border p-3" style={{ borderColor: L_BORDER, background: action[2] === 'Ready' ? '#f4faef' : '#fff' }}>
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="text-[14px] font-semibold" style={{ color: L_TEXT, fontFamily: D }}>{action[0]}</h4>
                        <StatusBadge status={action[2]} />
                      </div>
                      <p className="mt-1 text-[12px] leading-[1.5]" style={{ color: L_MUTED }}>{action[1]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default async function UseCasePage({ params }: PageProps) {
  const { slug } = await params
  const useCase = getUseCase(slug)

  if (!useCase) {
    notFound()
  }

  return (
    <main style={{ background: BASE, minHeight: '100vh' }}>
      <Header activeSlug={useCase.slug} />

      <section className="relative overflow-hidden pt-[118px]" style={{ background: BASE }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)', backgroundSize: '54px 54px' }} />
        <div className="absolute inset-x-0 top-0 h-[660px] pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(197,241,53,0.16), transparent 34%, rgba(86,142,255,0.1) 72%, transparent)' }} />
        <div className="relative mx-auto max-w-[1160px] px-5 pb-14 sm:px-6 sm:pb-20">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_0.68fr] lg:items-end">
            <div>
              <SectionLabel label={useCase.eyebrow} />
              <h1 className="mt-7 max-w-[860px] text-[clamp(42px,7vw,88px)] font-bold leading-[0.96] text-white" style={{ fontFamily: D }}>
                {useCase.headline}
              </h1>
            </div>
            <div>
              <p className="text-[16px] leading-[1.75] sm:text-[18px]" style={{ color: SOFT }}>
                {useCase.summary}
              </p>
              <div className="mt-5 rounded-lg border p-4" style={{ borderColor: BORDER, background: GLASS }}>
                <div className="text-[10px] uppercase" style={{ color: ACCENT, fontFamily: M }}>Where it fits</div>
                <p className="mt-2 text-[14px] leading-[1.6]" style={{ color: SOFT }}>{useCase.proof}</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <AppWorkspace useCase={useCase} />
          </div>
        </div>
      </section>

      <section style={{ background: L_BG }}>
        <div className="mx-auto max-w-[1160px] px-5 py-14 sm:px-6 sm:py-20">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.88fr_0.72fr] lg:items-end">
            <div>
              <SectionLabel label="Use cases" tone="light" />
              <h2 className="mt-6 max-w-[760px] text-[clamp(32px,5vw,62px)] font-bold leading-[1.02]" style={{ color: L_TEXT, fontFamily: D }}>
                Jump to the next operator workflow.
              </h2>
            </div>
            <p className="text-[15px] leading-[1.75]" style={{ color: L_MUTED }}>
              Each page is separate, but the app, data model, approvals, and evidence stay connected underneath.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-5">
            {USE_CASES.map((item) => (
              <Link key={item.slug} href={`/use-cases/${item.slug}`} className="rounded-lg border p-4 transition-transform hover:-translate-y-0.5" style={{ borderColor: item.slug === useCase.slug ? '#b7dcbf' : L_BORDER, background: item.slug === useCase.slug ? '#eaf6e7' : '#fff' }}>
                <div className="text-[10px] uppercase" style={{ color: item.slug === useCase.slug ? '#1D7A6D' : L_MUTED, fontFamily: M }}>{item.navDetail}</div>
                <h3 className="mt-3 text-[17px] font-semibold" style={{ color: L_TEXT, fontFamily: D }}>{item.label}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
