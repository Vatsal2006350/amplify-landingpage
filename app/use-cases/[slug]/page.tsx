import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { USE_CASES, getUseCase, type UseCase } from '../data'

const ACCENT = '#18736A'
const SIGNAL = '#9EE078'
const DARK = '#101613'
const BASE = '#F4F8F7'
const SURFACE = '#EAF1EE'
const TEXT = '#17212B'
const MUTED = '#66736F'
const BORDER = 'rgba(23,33,29,0.12)'
const DARK_BORDER = 'rgba(255,255,255,0.12)'
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

  return {
    title: useCase ? `${useCase.label} | Amplify` : 'Amplify Use Case',
    description: useCase?.summary,
  }
}

function Logo({ size = 28 }: { size?: number }) {
  return <img src="/logo.png" alt="Amplify" style={{ width: size, height: size, borderRadius: 7, objectFit: 'cover' }} />
}

function SectionLabel({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8" style={{ background: dark ? SIGNAL : ACCENT }} />
      <span className="text-[10px] font-semibold uppercase" style={{ color: dark ? 'rgba(255,255,255,0.6)' : MUTED, fontFamily: M }}>{label}</span>
    </div>
  )
}

function Header({ activeSlug }: { activeSlug: string }) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex justify-center px-3 pt-3">
      <nav className="flex h-[58px] w-full max-w-[1180px] items-center justify-between rounded-lg border px-4" style={{ background: 'rgba(16,22,19,0.9)', borderColor: DARK_BORDER, backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', boxShadow: '0 16px 50px rgba(0,0,0,0.2)' }}>
        <Link href="/" className="flex items-center gap-2">
          <Logo size={26} />
          <span className="text-[14px] font-semibold text-white" style={{ fontFamily: D }}>Amplify</span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/#product-flow" className="text-[12px]" style={{ color: 'rgba(255,255,255,0.76)', fontFamily: M }}>Product</Link>
          <div className="group relative">
            <button type="button" className="flex items-center gap-1 text-[12px]" style={{ color: 'rgba(255,255,255,0.76)', fontFamily: M }}>
              Use cases
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 5l3 3 3-3" /></svg>
            </button>
            <div className="pointer-events-none absolute left-1/2 top-full z-20 w-[292px] -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
              <div className="overflow-hidden rounded-lg border p-2" style={{ background: 'rgba(16,22,19,0.98)', borderColor: DARK_BORDER, boxShadow: '0 24px 70px rgba(0,0,0,0.32)' }}>
                {USE_CASES.map((item) => (
                  <Link key={item.slug} href={`/use-cases/${item.slug}`} className="block rounded-md px-3 py-3 transition-colors hover:bg-white/5" style={{ background: item.slug === activeSlug ? 'rgba(158,224,120,0.09)' : 'transparent' }}>
                    <span className="block text-[12px] font-semibold text-white">{item.label}</span>
                    <span className="mt-0.5 block text-[9px] uppercase" style={{ color: item.slug === activeSlug ? SIGNAL : 'rgba(255,255,255,0.54)', fontFamily: M }}>{item.navDetail}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/#enrichment" className="text-[12px]" style={{ color: 'rgba(255,255,255,0.76)', fontFamily: M }}>Enrichment</Link>
          <Link href="/#integrations" className="text-[12px]" style={{ color: 'rgba(255,255,255,0.76)', fontFamily: M }}>Integrations</Link>
        </div>
        <Link href="/#cta" className="rounded-lg px-4 py-2 text-[10px] font-bold uppercase" style={{ background: SIGNAL, color: DARK, fontFamily: M }}>Get early access</Link>
      </nav>
    </header>
  )
}

function StatusBadge({ status }: { status: UseCase['tableRows'][number][3] }) {
  const styles = {
    Ready: { background: '#e8f7ed', color: '#137a3a', borderColor: '#bfe7cd' },
    Review: { background: '#fff7db', color: '#9a6500', borderColor: '#ecd48a' },
    Blocked: { background: '#fff0ef', color: '#b53a32', borderColor: '#efc5c0' },
    Open: { background: '#eef3f1', color: '#5f6d67', borderColor: '#d8e2dd' },
  }[status]

  return <span className="inline-flex rounded-md border px-2 py-1 text-[9px] font-semibold uppercase" style={{ ...styles, fontFamily: M }}>{status}</span>
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border bg-white p-3.5" style={{ borderColor: BORDER }}>
      <div className="text-[24px] font-semibold leading-none" style={{ color: TEXT }}>{value}</div>
      <div className="mt-2 text-[9px] uppercase" style={{ color: MUTED, fontFamily: M }}>{label}</div>
    </div>
  )
}

function BrowserBar({ path, action }: { path: string; action?: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b px-4 py-3" style={{ borderColor: DARK_BORDER, background: '#0d120f' }}>
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b62]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffc34a]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#48c96c]" />
        </div>
        <span className="hidden truncate rounded-md border px-3 py-1.5 text-[10px] sm:block" style={{ borderColor: DARK_BORDER, color: 'rgba(255,255,255,0.58)', fontFamily: M }}>app.use-amplify.com/geoomnii/{path}</span>
      </div>
      {action && <span className="rounded-md px-3 py-1.5 text-[9px] font-bold uppercase" style={{ background: SIGNAL, color: DARK, fontFamily: M }}>{action}</span>}
    </div>
  )
}

function ProductSidebar({ useCase }: { useCase: UseCase }) {
  const items = ['Overview', 'Listing Ops', 'Company Brain', 'Inventory', 'Approvals']
  const selected = useCase.slug === 'marketplace-files' ? 'Listing Ops' : useCase.label

  return (
    <aside className="hidden min-h-full flex-col bg-[#101613] p-4 text-white lg:flex">
      <div className="mb-7 flex items-center gap-2.5">
        <Logo size={30} />
        <div>
          <div className="text-[13px] font-semibold">Amplify</div>
          <div className="text-[9px] uppercase" style={{ color: '#9fb4aa', fontFamily: M }}>Geoomnii</div>
        </div>
      </div>
      <div className="space-y-1.5">
        {items.map((item) => (
          <div key={item} className="rounded-lg border px-3 py-2.5 text-[11px] font-semibold" style={{ borderColor: item === selected ? '#436050' : 'transparent', background: item === selected ? '#1a241f' : 'transparent', color: item === selected ? '#f7fbf8' : '#9fb4aa' }}>{item}</div>
        ))}
      </div>
      <div className="mt-auto rounded-lg border p-3" style={{ borderColor: '#28352f', background: '#151d19' }}>
        <div className="text-[9px] uppercase" style={{ color: '#9fb4aa', fontFamily: M }}>Workspace</div>
        <div className="mt-2 flex items-center gap-2 text-[11px]"><span className="h-2 w-2 rounded-full" style={{ background: SIGNAL }} />Sources synced</div>
      </div>
    </aside>
  )
}

function HeroWorkspace({ useCase }: { useCase: UseCase }) {
  return (
    <div className="overflow-hidden rounded-xl border" style={{ borderColor: BORDER, background: '#eef3f1', boxShadow: '0 34px 100px rgba(15,31,28,0.18)' }}>
      <BrowserBar path={useCase.slug} action="Run" />
      <div className="grid min-h-[610px] lg:grid-cols-[200px_minmax(0,1fr)]">
        <ProductSidebar useCase={useCase} />
        <div className="min-w-0 bg-[#eef3f1]">
          <div className="flex items-center justify-between border-b bg-[#f8fbf9] px-4 py-3.5 sm:px-5" style={{ borderColor: '#dce5e0' }}>
            <div>
              <div className="text-[9px] uppercase" style={{ color: ACCENT, fontFamily: M }}>{useCase.appLabel}</div>
              <div className="text-[16px] font-semibold" style={{ color: TEXT }}>{useCase.label}</div>
            </div>
            <span className="rounded-md border px-2.5 py-1 text-[9px] font-semibold uppercase" style={{ borderColor: '#bde5dc', background: '#eaf8f5', color: ACCENT, fontFamily: M }}>Approval gated</span>
          </div>
          <div className="p-4 sm:p-5">
            <div className="rounded-lg border bg-white p-4" style={{ borderColor: BORDER }}>
              <div className="text-[9px] uppercase" style={{ color: ACCENT, fontFamily: M }}>Operator request</div>
              <h2 className="mt-2 max-w-[760px] text-[22px] font-semibold leading-snug sm:text-[27px]" style={{ color: TEXT }}>{useCase.command}</h2>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {useCase.metrics.map(([value, label]) => <MetricCard key={label} value={value} label={label} />)}
            </div>
            <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1.22fr)_minmax(240px,0.78fr)]">
              <div className="overflow-hidden rounded-lg border bg-white" style={{ borderColor: BORDER }}>
                <div className="flex items-center justify-between border-b px-3.5 py-3" style={{ borderColor: BORDER }}>
                  <div>
                    <div className="text-[10px] font-semibold" style={{ color: TEXT }}>{useCase.tableTitle}</div>
                    <div className="text-[8px] uppercase" style={{ color: MUTED, fontFamily: M }}>Live operator view</div>
                  </div>
                  <span className="text-[9px] font-semibold uppercase" style={{ color: ACCENT, fontFamily: M }}>Run complete</span>
                </div>
                {useCase.tableRows.map((row, index) => (
                  <div key={`${row[0]}-${row[1]}`} className="grid grid-cols-[1fr_1.35fr_0.8fr] items-center gap-2 border-b px-3.5 py-3 text-[10px] last:border-b-0 sm:text-[11px]" style={{ borderColor: BORDER, background: index === 0 ? '#edf8f5' : '#fff' }}>
                    <span className="truncate font-semibold" style={{ color: TEXT }}>{row[0]}</span>
                    <span className="truncate" style={{ color: MUTED }}>{row[1]}</span>
                    <span className="text-right"><StatusBadge status={row[3]} /></span>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border bg-white p-3.5" style={{ borderColor: BORDER }}>
                <div className="text-[9px] uppercase" style={{ color: ACCENT, fontFamily: M }}>Next action</div>
                <h3 className="mt-2 text-[17px] font-semibold leading-snug" style={{ color: TEXT }}>{useCase.actions[0][0]}</h3>
                <p className="mt-2 text-[11px] leading-relaxed" style={{ color: MUTED }}>{useCase.actions[0][1]}</p>
                <div className="mt-4 space-y-2">
                  {['Evidence attached', 'Impact checked', 'Operator approval'].map((item, index) => (
                    <div key={item} className="flex items-center gap-2 rounded-md px-2.5 py-2 text-[10px]" style={{ background: '#edf8f5', color: TEXT }}><span className="grid h-4 w-4 place-items-center rounded-full text-[8px] text-white" style={{ background: index < 2 ? ACCENT : '#91a19a' }}>{index < 2 ? '✓' : '3'}</span>{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SourcesScene({ useCase }: { useCase: UseCase }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white" style={{ borderColor: BORDER, boxShadow: '0 24px 72px rgba(15,31,28,0.1)' }}>
      <BrowserBar path={`${useCase.slug}/sources`} action="Synced" />
      <div className="grid gap-3 bg-[#eef3f1] p-4 sm:p-5 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="rounded-lg border bg-white p-4" style={{ borderColor: BORDER }}>
          <div className="text-[9px] uppercase" style={{ color: ACCENT, fontFamily: M }}>Connected sources</div>
          <div className="mt-3 space-y-2">
            {useCase.sources.map((source, index) => (
              <div key={source} className="flex items-center justify-between gap-3 rounded-md border px-3 py-3" style={{ borderColor: BORDER, background: index === 0 ? '#edf8f5' : '#fff' }}>
                <div className="min-w-0"><div className="truncate text-[11px] font-semibold" style={{ color: TEXT, fontFamily: M }}>{source}</div><div className="mt-0.5 text-[9px]" style={{ color: MUTED }}>{index === 0 ? 'Primary operating file' : 'Joined to this run'}</div></div>
                <span className="shrink-0 text-[9px] font-semibold uppercase" style={{ color: ACCENT, fontFamily: M }}>Synced</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border bg-white p-4" style={{ borderColor: BORDER }}>
          <div className="flex items-center justify-between gap-3"><div><div className="text-[9px] uppercase" style={{ color: MUTED, fontFamily: M }}>Run plan</div><h3 className="mt-1 text-[19px] font-semibold" style={{ color: TEXT }}>{useCase.command}</h3></div><span className="rounded-md px-2 py-1 text-[9px] font-semibold uppercase" style={{ background: '#e8f7ed', color: '#137a3a', fontFamily: M }}>Ready</span></div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {useCase.steps.map((step, index) => (
              <div key={step} className="flex min-h-[58px] items-center gap-3 rounded-lg border px-3" style={{ borderColor: index === 0 ? '#9bd9cd' : BORDER, background: index === 0 ? '#edf8f5' : '#fff' }}><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[9px] font-semibold text-white" style={{ background: ACCENT }}>{index + 1}</span><span className="text-[11px] font-semibold" style={{ color: TEXT }}>{step}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function AnalysisScene({ useCase }: { useCase: UseCase }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white" style={{ borderColor: BORDER, boxShadow: '0 24px 72px rgba(15,31,28,0.1)' }}>
      <BrowserBar path={`${useCase.slug}/analysis`} action="Live view" />
      <div className="bg-[#eef3f1] p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{useCase.metrics.map(([value, label]) => <MetricCard key={label} value={value} label={label} />)}</div>
        <div className="mt-3 overflow-hidden rounded-lg border bg-white" style={{ borderColor: BORDER }}>
          <div className="border-b px-4 py-3" style={{ borderColor: BORDER }}><div className="text-[9px] uppercase" style={{ color: ACCENT, fontFamily: M }}>{useCase.story[1].label}</div><h3 className="mt-1 text-[18px] font-semibold" style={{ color: TEXT }}>{useCase.tableTitle}</h3></div>
          {useCase.tableRows.map((row, index) => (
            <div key={`${row[0]}-${row[1]}`} className="grid grid-cols-[0.85fr_1.2fr_1fr_0.65fr] items-center gap-2 border-b px-4 py-3 text-[10px] last:border-b-0 sm:text-[11px]" style={{ borderColor: BORDER, background: index === 1 ? '#fff8ea' : '#fff' }}><span className="truncate font-semibold" style={{ color: TEXT }}>{row[0]}</span><span className="truncate" style={{ color: TEXT }}>{row[1]}</span><span className="truncate" style={{ color: MUTED }}>{row[2]}</span><span className="text-right"><StatusBadge status={row[3]} /></span></div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ActionsScene({ useCase }: { useCase: UseCase }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white" style={{ borderColor: BORDER, boxShadow: '0 24px 72px rgba(15,31,28,0.1)' }}>
      <BrowserBar path={`${useCase.slug}/actions`} action="Approval required" />
      <div className="grid gap-3 bg-[#eef3f1] p-4 sm:p-5 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-2">
          {useCase.actions.map((action, index) => (
            <div key={action[0]} className="rounded-lg border bg-white p-4" style={{ borderColor: index === 0 ? '#9bd9cd' : BORDER }}>
              <div className="flex items-start justify-between gap-3"><div><div className="text-[9px] uppercase" style={{ color: MUTED, fontFamily: M }}>Action {String(index + 1).padStart(2, '0')}</div><h3 className="mt-1 text-[15px] font-semibold" style={{ color: TEXT }}>{action[0]}</h3></div><StatusBadge status={action[2]} /></div>
              <p className="mt-2 text-[11px] leading-relaxed" style={{ color: MUTED }}>{action[1]}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border bg-white p-4" style={{ borderColor: BORDER }}>
          <div className="text-[9px] uppercase" style={{ color: ACCENT, fontFamily: M }}>Approval package</div>
          <h3 className="mt-2 text-[20px] font-semibold leading-snug" style={{ color: TEXT }}>{useCase.actions[0][0]}</h3>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {['Source evidence', 'Proposed diff', 'Expected impact', 'Rollback note'].map((item) => <div key={item} className="rounded-md border px-3 py-3 text-[9px] font-semibold uppercase" style={{ borderColor: BORDER, color: MUTED, fontFamily: M }}>{item}</div>)}
          </div>
          <div className="mt-4 flex gap-2"><span className="flex h-9 flex-1 items-center justify-center rounded-lg border text-[10px] font-semibold" style={{ borderColor: BORDER, color: TEXT }}>Edit</span><span className="flex h-9 flex-1 items-center justify-center rounded-lg text-[10px] font-semibold text-white" style={{ background: ACCENT }}>Approve</span></div>
        </div>
      </div>
    </div>
  )
}

function StorySection({ useCase, index }: { useCase: UseCase; index: number }) {
  const story = useCase.story[index]
  const ids = ['source-data', 'operator-view', 'approved-action']
  const visual = index === 0 ? <SourcesScene useCase={useCase} /> : index === 1 ? <AnalysisScene useCase={useCase} /> : <ActionsScene useCase={useCase} />

  return (
    <section id={ids[index]} className="scroll-mt-[120px] border-t" style={{ borderColor: BORDER, background: index === 1 ? SURFACE : BASE }}>
      <div className="mx-auto grid max-w-[1160px] gap-8 px-5 py-16 sm:px-6 sm:py-24 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
        <div className={index === 1 ? 'lg:order-2' : ''}>
          <SectionLabel label={story.label} />
          <h2 className="mt-6 max-w-[470px] text-[clamp(30px,4vw,50px)] font-bold leading-[1.06]" style={{ color: TEXT, fontFamily: D }}>{story.title}</h2>
          <p className="mt-5 max-w-[470px] text-[15px] leading-[1.7] sm:text-[16px]" style={{ color: MUTED }}>{story.body}</p>
        </div>
        <div className={index === 1 ? 'lg:order-1' : ''}>{visual}</div>
      </div>
    </section>
  )
}

function RelatedUseCases({ useCase }: { useCase: UseCase }) {
  return (
    <section className="border-t bg-white" style={{ borderColor: BORDER }}>
      <div className="mx-auto max-w-[1160px] px-5 py-14 sm:px-6 sm:py-20">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div><SectionLabel label="Keep exploring" /><h2 className="mt-5 text-[clamp(28px,3.6vw,44px)] font-bold" style={{ color: TEXT }}>Connected operator workflows.</h2></div>
          <Link href="/" className="text-[12px] font-semibold" style={{ color: ACCENT }}>Back to the overview →</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {USE_CASES.filter((item) => item.slug !== useCase.slug).map((item) => (
            <Link key={item.slug} href={`/use-cases/${item.slug}`} className="group rounded-lg border bg-[#f8fbf9] p-4 transition-transform hover:-translate-y-0.5" style={{ borderColor: BORDER }}>
              <div className="text-[9px] uppercase" style={{ color: ACCENT, fontFamily: M }}>{item.navDetail}</div>
              <h3 className="mt-8 text-[17px] font-semibold" style={{ color: TEXT }}>{item.label}</h3>
              <p className="mt-2 text-[12px] leading-relaxed" style={{ color: MUTED }}>{item.headline}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default async function UseCasePage({ params }: PageProps) {
  const { slug } = await params
  const useCase = getUseCase(slug)
  if (!useCase) notFound()

  return (
    <main className="min-h-screen" style={{ background: BASE }}>
      <Header activeSlug={useCase.slug} />

      <section className="relative overflow-hidden pt-[116px]" style={{ background: BASE }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(24,115,106,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(24,115,106,0.055) 1px, transparent 1px)', backgroundSize: '56px 56px', maskImage: 'linear-gradient(to bottom, black, transparent 70%)' }} />
        <div className="absolute inset-x-0 top-0 h-[600px] pointer-events-none" style={{ background: 'linear-gradient(140deg, rgba(158,224,120,0.16), transparent 34%, rgba(24,115,106,0.08) 72%, transparent)' }} />
        <div className="relative mx-auto max-w-[1160px] px-5 pb-14 sm:px-6 sm:pb-20">
          <div className="mx-auto max-w-[900px] text-center">
            <div className="flex justify-center"><SectionLabel label={useCase.eyebrow} /></div>
            <h1 className="mx-auto mt-6 max-w-[900px] text-[clamp(40px,6.5vw,72px)] font-bold leading-[1.02]" style={{ color: TEXT, fontFamily: D }}>{useCase.headline}</h1>
            <p className="mx-auto mt-6 max-w-[700px] text-[16px] leading-[1.65] sm:text-[18px]" style={{ color: MUTED }}>{useCase.summary}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href="#source-data" className="rounded-lg px-5 py-3 text-[11px] font-semibold text-white" style={{ background: ACCENT }}>See the workflow</a>
              <Link href="/#cta" className="rounded-lg border bg-white px-5 py-3 text-[11px] font-semibold" style={{ borderColor: BORDER, color: TEXT }}>Talk to us</Link>
            </div>
          </div>
          <div className="mt-12"><HeroWorkspace useCase={useCase} /></div>
          <div className="mt-4 rounded-lg border bg-white px-4 py-3 text-center text-[12px] leading-relaxed" style={{ borderColor: BORDER, color: MUTED }}>{useCase.proof}</div>
        </div>
      </section>

      <nav className="sticky top-[68px] z-30 border-y bg-[rgba(244,248,247,0.9)] backdrop-blur-xl" style={{ borderColor: BORDER }}>
        <div className="mx-auto flex max-w-[1160px] items-center gap-2 overflow-x-auto px-5 py-2.5 sm:px-6">
          {[['01', 'Source data', '#source-data'], ['02', 'Operator view', '#operator-view'], ['03', 'Approved action', '#approved-action']].map(([number, label, href]) => (
            <a key={href} href={href} className="flex shrink-0 items-center gap-2 rounded-lg border bg-white px-3 py-2 text-[10px] font-semibold" style={{ borderColor: BORDER, color: TEXT }}><span style={{ color: ACCENT, fontFamily: M }}>{number}</span>{label}</a>
          ))}
        </div>
      </nav>

      {[0, 1, 2].map((index) => <StorySection key={useCase.story[index].label} useCase={useCase} index={index} />)}

      <section className="border-t" style={{ borderColor: DARK_BORDER, background: DARK }}>
        <div className="mx-auto grid max-w-[1160px] gap-8 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_0.7fr] lg:items-center">
          <div><SectionLabel label="Built for operators" dark /><h2 className="mt-5 max-w-[700px] text-[clamp(30px,4.5vw,54px)] font-bold leading-[1.04] text-white">{useCase.proof}</h2></div>
          <Link href="/#cta" className="flex min-h-[52px] items-center justify-between rounded-lg border px-5 text-[12px] font-semibold" style={{ borderColor: DARK_BORDER, background: 'rgba(255,255,255,0.055)', color: '#fff' }}><span>Bring us your workflow</span><span className="grid h-8 w-8 place-items-center rounded-md" style={{ background: SIGNAL, color: DARK }}>→</span></Link>
        </div>
      </section>

      <RelatedUseCases useCase={useCase} />
    </main>
  )
}
