import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DocHeader, Perforation, Rule, RuledBlock, StatusBracket } from '../../../components/doc/chrome'
import { Stamp } from '../../../components/doc/stamp'
import { MotionShell, ProductStage, Reveal } from '../../../components/motion-primitives'
import { SiteFooter } from '../../../components/sections/footer'
import { SiteNav } from '../../../components/sections/nav'
import { USE_CASES, getUseCase, type UseCase } from '../data'

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
  return <img src="/logo.png" alt="Amplify" style={{ width: size, height: size, borderRadius: 2, objectFit: 'cover' }} />
}

function PunchedHoles() {
  return (
    <div className="flex gap-2" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: 'var(--paper)', boxShadow: 'inset 0 0 0 1px var(--ledger-strong)' }}
        />
      ))}
    </div>
  )
}

/** fake-browser bar → document plate header */
function PlateBar({ label, action }: { label: string; action?: string }) {
  return (
    <div
      className="flex items-center justify-between gap-4 border-b px-4 py-3"
      style={{ borderColor: 'var(--ink)', background: 'var(--paper-shade)' }}
    >
      <div className="flex min-w-0 items-center gap-3">
        <PunchedHoles />
        <span className="type-mono-label truncate" style={{ fontSize: 10, color: 'var(--ink-muted)' }}>{label}</span>
      </div>
      {action && <StatusBracket status={action} className="shrink-0" />}
    </div>
  )
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-doc border p-3.5" style={{ borderColor: 'var(--ledger)', background: 'var(--paper-raised)' }}>
      <div className="font-display tabular text-[24px] leading-none" style={{ fontWeight: 540, color: 'var(--ink)' }}>{value}</div>
      <p className="type-mono-label mt-2" style={{ fontSize: 9, color: 'var(--ink-muted)' }}>{label}</p>
    </div>
  )
}

function ProductSidebar({ useCase }: { useCase: UseCase }) {
  const items = ['Overview', 'Listing Ops', 'Company Brain', 'Inventory', 'Approvals']
  const selected = useCase.slug === 'marketplace-files' ? 'Listing Ops' : useCase.label

  return (
    <aside className="hidden min-h-full flex-col p-4 lg:flex" style={{ background: 'var(--dk-bg)', color: 'var(--dk-text)' }}>
      <div className="mb-7 flex items-center gap-2.5">
        <Logo size={30} />
        <div>
          <div className="font-display text-[14px]" style={{ fontWeight: 540 }}>Amplify</div>
          <p className="type-mono-label" style={{ fontSize: 9, color: 'var(--dk-muted)' }}>Retail workspace</p>
        </div>
      </div>
      <div className="space-y-1.5">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-doc border px-3 py-2.5 text-[11px] font-semibold"
            style={{
              borderColor: item === selected ? 'var(--dk-rule)' : 'transparent',
              background: item === selected ? 'var(--dk-raised)' : 'transparent',
              color: item === selected ? 'var(--dk-text)' : 'var(--dk-muted)',
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-doc border p-3" style={{ borderColor: 'var(--dk-rule)', background: 'var(--dk-raised)' }}>
        <p className="type-mono-label" style={{ fontSize: 9, color: 'var(--dk-muted)' }}>Workspace</p>
        <div className="mt-2"><StatusBracket status="Sources synced" tone="ink" /></div>
      </div>
    </aside>
  )
}

function HeroWorkspace({ useCase }: { useCase: UseCase }) {
  return (
    <div
      className="doc-shadow overflow-hidden rounded-doc"
      style={{ border: '1px solid var(--ink)', background: 'var(--paper-shade)' }}
    >
      <PlateBar label={`PLATE 01 — ${useCase.label.toUpperCase()}`} action="Run" />
      <div className="grid min-h-[610px] lg:grid-cols-[200px_minmax(0,1fr)]">
        <ProductSidebar useCase={useCase} />
        <div className="min-w-0" style={{ background: 'var(--paper-shade)' }}>
          <div
            className="flex items-center justify-between border-b px-4 py-3.5 sm:px-5"
            style={{ borderColor: 'var(--ledger)', background: 'var(--paper-raised)' }}
          >
            <div>
              <p className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink-muted)' }}>{useCase.appLabel}</p>
              <div className="font-display text-[16px]" style={{ fontWeight: 540, color: 'var(--ink)' }}>{useCase.label}</div>
            </div>
            <StatusBracket status="Approval gated" className="shrink-0" />
          </div>
          <div className="p-4 sm:p-5">
            <div className="rounded-doc border p-4" style={{ borderColor: 'var(--ledger)', background: 'var(--paper-raised)' }}>
              <p className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink-muted)' }}>Operator request</p>
              <h2 className="font-display mt-2 max-w-[760px] text-[22px] leading-snug sm:text-[27px]" style={{ fontWeight: 540, color: 'var(--ink)' }}>{useCase.command}</h2>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {useCase.metrics.map(([value, label]) => <MetricCard key={label} value={value} label={label} />)}
            </div>
            <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1.22fr)_minmax(240px,0.78fr)]">
              <div className="overflow-hidden rounded-doc border" style={{ borderColor: 'var(--ledger)', background: 'var(--paper-raised)' }}>
                <div className="flex items-center justify-between border-b px-3.5 py-3" style={{ borderColor: 'var(--ledger)' }}>
                  <div>
                    <div className="text-[10px] font-semibold" style={{ color: 'var(--ink)' }}>{useCase.tableTitle}</div>
                    <p className="type-mono-label" style={{ fontSize: 8, color: 'var(--ink-muted)' }}>Live operator view</p>
                  </div>
                  <StatusBracket status="Complete" className="shrink-0" />
                </div>
                {useCase.tableRows.map((row, index) => (
                  <div
                    key={`${row[0]}-${row[1]}`}
                    className="grid grid-cols-[1fr_1.35fr_0.8fr] items-center gap-2 border-b px-3.5 py-3 text-[10px] last:border-b-0 sm:text-[11px]"
                    style={{
                      borderColor: 'var(--ledger)',
                      background: index === 0 ? 'var(--paper-shade)' : 'var(--paper-raised)',
                      boxShadow: index === 0 ? 'inset 2px 0 0 var(--orange)' : undefined,
                    }}
                  >
                    <span className="truncate font-semibold" style={{ color: 'var(--ink)' }}>{row[0]}</span>
                    <span className="truncate" style={{ color: 'var(--ink-muted)' }}>{row[1]}</span>
                    <span className="text-right"><StatusBracket status={row[3]} /></span>
                  </div>
                ))}
              </div>
              <div className="rounded-doc border p-3.5" style={{ borderColor: 'var(--ledger)', background: 'var(--paper-raised)' }}>
                <p className="type-mono-label" style={{ fontSize: 9, color: 'var(--orange)' }}>Next action</p>
                <h3 className="font-display mt-2 text-[17px] leading-snug" style={{ fontWeight: 540, color: 'var(--ink)' }}>{useCase.actions[0][0]}</h3>
                <p className="mt-2 text-[11px] leading-relaxed" style={{ color: 'var(--ink-muted)' }}>{useCase.actions[0][1]}</p>
                <div className="mt-4 space-y-2">
                  {['Evidence attached', 'Impact checked', 'Operator approval'].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-doc border px-2.5 py-2 text-[10px]"
                      style={{ borderColor: 'var(--ledger)', background: 'var(--paper-shade)', color: 'var(--ink)' }}
                    >
                      <span
                        className="type-mono-label"
                        style={{ fontSize: 10, color: index < 2 ? 'var(--ink)' : 'var(--ink-faint)' }}
                        aria-hidden="true"
                      >
                        {index < 2 ? '[x]' : '[ ]'}
                      </span>
                      {item}
                    </div>
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
    <div className="doc-shadow overflow-hidden rounded-doc" style={{ border: '1px solid var(--ink)', background: 'var(--paper-shade)' }}>
      <PlateBar label="PLATE 02 — SOURCE DATA" action="Synced" />
      <div className="grid gap-3 p-4 sm:p-5 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="rounded-doc border p-4" style={{ borderColor: 'var(--ledger)', background: 'var(--paper-raised)' }}>
          <p className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink-muted)' }}>Connected sources</p>
          <div className="mt-3 space-y-2">
            {useCase.sources.map((source, index) => (
              <div
                key={source}
                className="flex items-center justify-between gap-3 rounded-doc border px-3 py-3"
                style={{
                  borderColor: index === 0 ? 'var(--ink)' : 'var(--ledger)',
                  background: 'var(--paper)',
                }}
              >
                <div className="min-w-0">
                  <div className="type-mono-label truncate" style={{ fontSize: 11, textTransform: 'none', color: 'var(--ink)' }}>{source}</div>
                  <div className="mt-0.5 text-[9px]" style={{ color: 'var(--ink-muted)' }}>{index === 0 ? 'Primary operating file' : 'Joined to this run'}</div>
                </div>
                <StatusBracket status="Synced" className="shrink-0" />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-doc border p-4" style={{ borderColor: 'var(--ledger)', background: 'var(--paper-raised)' }}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink-muted)' }}>Run plan</p>
              <h3 className="font-display mt-1 text-[19px]" style={{ fontWeight: 540, color: 'var(--ink)' }}>{useCase.command}</h3>
            </div>
            <StatusBracket status="Ready" className="shrink-0" />
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {useCase.steps.map((step, index) => (
              <div
                key={step}
                className="flex min-h-[58px] items-center gap-3 rounded-doc border px-3"
                style={{
                  borderColor: index === 0 ? 'var(--ink)' : 'var(--ledger)',
                  background: 'var(--paper)',
                }}
              >
                <span className="type-mono-label shrink-0" style={{ fontSize: 10, color: 'var(--ink-faint)' }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[11px] font-semibold" style={{ color: 'var(--ink)' }}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function AnalysisScene({ useCase }: { useCase: UseCase }) {
  return (
    <div className="doc-shadow overflow-hidden rounded-doc" style={{ border: '1px solid var(--ink)', background: 'var(--paper-shade)' }}>
      <PlateBar label="PLATE 03 — OPERATOR VIEW" action="Live" />
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {useCase.metrics.map(([value, label]) => <MetricCard key={label} value={value} label={label} />)}
        </div>
        <div className="mt-3 overflow-hidden rounded-doc border" style={{ borderColor: 'var(--ledger)', background: 'var(--paper-raised)' }}>
          <div className="border-b px-4 py-3" style={{ borderColor: 'var(--ledger)' }}>
            <p className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink-muted)' }}>{useCase.story[1].label}</p>
            <h3 className="font-display mt-1 text-[18px]" style={{ fontWeight: 540, color: 'var(--ink)' }}>{useCase.tableTitle}</h3>
          </div>
          {useCase.tableRows.map((row, index) => (
            <div
              key={`${row[0]}-${row[1]}`}
              className="grid grid-cols-[0.85fr_1.2fr_1fr_0.65fr] items-center gap-2 border-b px-4 py-3 text-[10px] last:border-b-0 sm:text-[11px]"
              style={{
                borderColor: 'var(--ledger)',
                background: 'var(--paper-raised)',
                boxShadow: index === 1 ? 'inset 2px 0 0 var(--orange)' : undefined,
              }}
            >
              <span className="truncate font-semibold" style={{ color: 'var(--ink)' }}>{row[0]}</span>
              <span className="truncate" style={{ color: 'var(--ink)' }}>{row[1]}</span>
              <span className="truncate" style={{ color: 'var(--ink-muted)' }}>{row[2]}</span>
              <span className="text-right"><StatusBracket status={row[3]} /></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ActionsScene({ useCase }: { useCase: UseCase }) {
  return (
    <div className="doc-shadow overflow-hidden rounded-doc" style={{ border: '1px solid var(--ink)', background: 'var(--paper-shade)' }}>
      <PlateBar label="PLATE 04 — APPROVED ACTION" action="Review" />
      <div className="grid gap-3 p-4 sm:p-5 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-2">
          {useCase.actions.map((action, index) => (
            <div
              key={action[0]}
              className="rounded-doc border p-4"
              style={{ borderColor: index === 0 ? 'var(--ink)' : 'var(--ledger)', background: 'var(--paper-raised)' }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink-faint)' }}>Action {String(index + 1).padStart(2, '0')}</p>
                  <h3 className="font-display mt-1 text-[15px]" style={{ fontWeight: 540, color: 'var(--ink)' }}>{action[0]}</h3>
                </div>
                <StatusBracket status={action[2]} className="shrink-0" />
              </div>
              <p className="mt-2 text-[11px] leading-relaxed" style={{ color: 'var(--ink-muted)' }}>{action[1]}</p>
            </div>
          ))}
        </div>
        <div className="rounded-doc border p-4" style={{ borderColor: 'var(--ledger)', background: 'var(--paper-raised)' }}>
          <div className="flex items-start justify-between gap-3">
            <p className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink-muted)' }}>Approval package</p>
            <Stamp label="APPROVE" scale={0.6} />
          </div>
          <h3 className="font-display mt-2 text-[20px] leading-snug" style={{ fontWeight: 540, color: 'var(--ink)' }}>{useCase.actions[0][0]}</h3>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {['Source evidence', 'Proposed diff', 'Expected impact', 'Rollback note'].map((item) => (
              <div
                key={item}
                className="type-mono-label rounded-doc border px-3 py-3"
                style={{ fontSize: 9, borderColor: 'var(--ledger)', background: 'var(--paper)', color: 'var(--ink-muted)' }}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <span
              className="type-mono-label flex h-9 flex-1 items-center justify-center rounded-doc"
              style={{ fontSize: 10, fontWeight: 700, border: '1px solid var(--ink)', color: 'var(--ink)', background: 'transparent' }}
            >
              Edit
            </span>
            <span
              className="btn-press type-mono-label flex h-9 flex-1 items-center justify-center rounded-doc"
              style={{ fontSize: 10, fontWeight: 700, background: 'var(--orange)', color: 'var(--ink)' }}
            >
              Approve
            </span>
          </div>
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
    <section
      id={ids[index]}
      className="scroll-mt-[120px]"
      style={{ borderTop: '1px solid var(--ledger)', background: index === 1 ? 'var(--paper-shade)' : 'var(--paper)' }}
    >
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
        <Reveal className={index === 1 ? 'lg:order-2' : ''} x={index === 1 ? 20 : -20} y={12}>
          <p className="type-mono-label flex items-center gap-3" style={{ color: 'var(--ink-muted)' }}>
            <span aria-hidden className="inline-block h-px w-6" style={{ background: 'var(--ink)' }} />
            {story.label}
          </p>
          <h2 className="type-h2 mt-6 max-w-[470px] text-[clamp(28px,3.6vw,44px)]" style={{ color: 'var(--ink)' }}>{story.title}</h2>
          <RuledBlock className="mt-6 max-w-[470px]">
            <p className="text-[15px] sm:text-[16px]" style={{ color: 'var(--ink-muted)' }}>{story.body}</p>
          </RuledBlock>
        </Reveal>
        <ProductStage className={index === 1 ? 'lg:order-1' : ''}>{visual}</ProductStage>
      </div>
    </section>
  )
}

function RelatedUseCases({ useCase }: { useCase: UseCase }) {
  const related = USE_CASES.filter((item) => item.slug !== useCase.slug)

  return (
    <section style={{ background: 'var(--paper)' }}>
      <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="type-mono-label flex items-center gap-3" style={{ color: 'var(--ink-muted)' }}>
              <span aria-hidden className="inline-block h-px w-6" style={{ background: 'var(--ink)' }} />
              SCHEDULE B — KEEP EXPLORING
            </p>
            <h2 className="type-h2 mt-5 text-[clamp(26px,3.4vw,40px)]" style={{ color: 'var(--ink)' }}>
              Connected operator <em>workflows</em>.
            </h2>
          </div>
          <Link href="/" className="type-mono-label transition-colors hover:text-safety" style={{ color: 'var(--ink)' }}>
            Back to the overview →
          </Link>
        </div>
        <Rule variant="thick-thin" />
        <div>
          {related.map((item, index) => (
            <Link
              key={item.slug}
              href={`/use-cases/${item.slug}`}
              className="grid grid-cols-[36px_minmax(0,1fr)_20px] items-baseline gap-4 px-2 py-5 transition-colors hover:bg-paper-shade sm:grid-cols-[44px_minmax(0,1fr)_auto_24px]"
              style={{ borderBottom: '1px solid var(--ledger)' }}
            >
              <span className="type-mono-label" style={{ fontSize: 10, color: 'var(--ink-faint)' }}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>
                <span className="font-display block text-[18px] sm:text-[20px]" style={{ fontWeight: 540, color: 'var(--ink)' }}>{item.label}</span>
                <span className="mt-1 block max-w-[560px] text-[12px] leading-relaxed" style={{ color: 'var(--ink-muted)' }}>{item.headline}</span>
              </span>
              <span className="type-mono-label hidden text-right sm:block" style={{ fontSize: 10, color: 'var(--ink-muted)' }}>{item.navDetail}</span>
              <span aria-hidden className="text-right" style={{ color: 'var(--ink)' }}>→</span>
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

  const formNo = USE_CASES.findIndex((item) => item.slug === useCase.slug) + 1

  return (
    <MotionShell>
      <SiteNav activeSlug={useCase.slug} homePrefix="/" />
      <main className="min-h-screen" style={{ background: 'var(--paper)' }}>
        <section className="mx-auto max-w-[1200px] px-4 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-10">
          <Reveal y={18}>
            <DocHeader
              index={`WAYBILL — ${useCase.label.toUpperCase()}`}
              meta={[`FORM AMP-0${formNo}/5`, 'REV. 2026-07']}
            />
            <p className="type-mono-label mt-8" style={{ color: 'var(--ink-muted)' }}>{useCase.eyebrow}</p>
            <h1
              className="type-h2 mt-4 max-w-[900px]"
              style={{ fontSize: 'clamp(36px,5vw,64px)', color: 'var(--ink)' }}
            >
              {useCase.headline}
            </h1>
            <p className="font-body mt-5 max-w-[680px] text-[16px] leading-[1.65] sm:text-[17px]" style={{ color: 'var(--ink-muted)' }}>
              {useCase.summary}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#source-data"
                className="btn-press type-mono-label flex h-11 items-center rounded-doc px-5"
                style={{ background: 'var(--orange)', color: 'var(--ink)', fontWeight: 700 }}
              >
                See the workflow
              </a>
              <Link
                href="/#cta"
                className="type-mono-label flex h-11 items-center rounded-doc px-5"
                style={{ border: '1px solid var(--ink)', color: 'var(--ink)', background: 'transparent', fontWeight: 700 }}
              >
                Talk to us
              </Link>
            </div>
          </Reveal>
          <ProductStage className="mt-12" delay={0.12}><HeroWorkspace useCase={useCase} /></ProductStage>
          <Reveal
            className="mt-4 rounded-doc border px-4 py-3 text-center text-[12px] leading-relaxed"
            style={{ borderColor: 'var(--ledger)', background: 'var(--paper-raised)', color: 'var(--ink-muted)' }}
            delay={0.18}
            y={10}
          >
            {useCase.proof}
          </Reveal>
        </section>

        <nav
          className="sticky top-[61px] z-30"
          style={{
            background: 'var(--paper)',
            borderTop: '1px solid var(--ledger)',
            borderBottom: '1px solid var(--ledger-strong)',
          }}
        >
          <div className="mx-auto flex max-w-[1200px] items-center overflow-x-auto px-4 sm:px-6">
            {([['01', 'Source data', '#source-data'], ['02', 'Operator view', '#operator-view'], ['03', 'Approved action', '#approved-action']] as const).map(([number, label, href]) => (
              <a
                key={href}
                href={href}
                className="type-mono-label flex shrink-0 items-center gap-2 px-4 py-3 transition-all hover:bg-paper-shade hover:shadow-[inset_0_-2px_0_var(--ink)] focus-visible:shadow-[inset_0_-2px_0_var(--ink)]"
                style={{ color: 'var(--ink)' }}
              >
                <span style={{ color: 'var(--ink-faint)' }}>{number}</span>
                {label}
              </a>
            ))}
          </div>
        </nav>

        {[0, 1, 2].map((index) => <StorySection key={useCase.story[index].label} useCase={useCase} index={index} />)}

        <Perforation tone="paper" />
        <section style={{ background: 'var(--dk-bg)' }}>
          <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_0.7fr] lg:items-center">
            <Reveal>
              <p className="type-mono-label flex items-center gap-3" style={{ color: 'var(--dk-muted)' }}>
                <span aria-hidden className="inline-block h-px w-6" style={{ background: 'var(--dk-text)' }} />
                Operational outcome
              </p>
              <h2 className="type-h2 mt-5 max-w-[700px] text-[clamp(28px,4vw,48px)]" style={{ color: 'var(--dk-text)' }}>
                {useCase.proof}
              </h2>
            </Reveal>
            <Link
              href="/#cta"
              className="type-mono-label flex min-h-[52px] items-center justify-between rounded-doc px-5"
              style={{ background: 'var(--dk-text)', color: 'var(--ink)', fontWeight: 700 }}
            >
              <span>Bring us your workflow</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
        <Perforation tone="paper" />

        <RelatedUseCases useCase={useCase} />
      </main>
      <SiteFooter />
    </MotionShell>
  )
}
