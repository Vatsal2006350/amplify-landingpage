import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LandingFooter, LandingNav } from '../../../components/landing-shell'
import { USE_CASES, getUseCase, type UseCase } from '../data'
import '../../landing.css'

type PageProps = { params: Promise<{ slug: string }> }

const visibleUseCases = USE_CASES.filter((item) => item.slug !== 'marketplace-files')

export function generateStaticParams() {
  return visibleUseCases.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const useCase = getUseCase(slug)
  return {
    title: useCase ? `${useCase.label} | Amplify` : 'Amplify Use Case',
    description: useCase?.summary,
  }
}

function WorkflowPreview({ useCase }: { useCase: UseCase }) {
  return (
    <div className="case-workflow" aria-label={`${useCase.label} workflow preview`}>
      <div className="case-workflow-heading">
        <span>From your existing files</span>
        <span className="case-workflow-live"><i /> Amplify workspace</span>
      </div>
      <div className="case-workflow-grid">
        <div className="case-file-stack">
          {useCase.sources.slice(0, 3).map((source, index) => (
            <div className="case-file" key={source}>
              <span className={`case-file-icon case-file-icon-${index + 1}`} aria-hidden="true">{index === 2 ? '▧' : '▤'}</span>
              <span>{source}</span>
              <b>✓</b>
            </div>
          ))}
          <p>Sales, product details and images stay connected.</p>
        </div>
        <div className="case-flow-arrow" aria-hidden="true">→</div>
        <div className="case-output">
          <div className="case-output-top">
            <span>{useCase.label}</span>
            <span className="case-output-ready">Ready to review</span>
          </div>
          <h2>{useCase.tableTitle}</h2>
          <div className="case-output-rows">
            {useCase.tableRows.slice(0, 3).map((row) => (
              <div className="case-output-row" key={`${row[0]}-${row[1]}`}>
                <div><strong>{row[0]}</strong><span>{row[1]}</span></div>
                <span className={`case-state case-state-${row[3].toLowerCase()}`}>{row[3]}</span>
              </div>
            ))}
          </div>
          <div className="case-output-footer"><span>Evidence stays with every decision</span><span>Review →</span></div>
        </div>
      </div>
    </div>
  )
}

function Details({ useCase }: { useCase: UseCase }) {
  return (
    <section className="case-details" id="workflow">
      <div className="case-section-heading">
        <p className="case-eyebrow">How it works</p>
        <h2>One clear workflow.<br /><em>Work your team can review.</em></h2>
      </div>
      <div className="case-detail-grid">
        {useCase.story.map((story, index) => (
          <article className="case-detail-card" key={story.label}>
            <span className="case-detail-number">0{index + 1}</span>
            <p>{story.label}</p>
            <h3>{story.title}</h3>
            <div>{story.body}</div>
          </article>
        ))}
      </div>
      <div className="case-steps" aria-label="Workflow steps">
        {useCase.steps.map((step, index) => (
          <div className="case-step" key={step}>
            <span>0{index + 1}</span><strong>{step}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}

function RelatedUseCases({ useCase }: { useCase: UseCase }) {
  return (
    <section className="case-related">
      <div className="case-related-heading">
        <div><p className="case-eyebrow">More from Amplify</p><h2>Connected work, one place.</h2></div>
        <Link href="/#early-access">Talk with our team <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="case-related-grid">
        {visibleUseCases.filter((item) => item.slug !== useCase.slug).map((item) => (
          <Link key={item.slug} href={`/use-cases/${item.slug}`} className="case-related-card">
            <span>{item.label}</span><strong>{item.headline}</strong><i aria-hidden="true">↗</i>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default async function UseCasePage({ params }: PageProps) {
  const { slug } = await params
  const useCase = visibleUseCases.find((item) => item.slug === slug)
  if (!useCase) notFound()

  return (
    <main className="landing-page case-page">
      <LandingNav />
      <section className="case-hero">
        <div className="case-hero-copy">
          <p className="case-eyebrow">{useCase.eyebrow}</p>
          <h1>{useCase.headline}</h1>
          <p className="case-summary">{useCase.summary}</p>
          <div className="case-actions">
            <a className="button-primary" href="#workflow">See how it works <span aria-hidden="true">↓</span></a>
            <a className="text-link" href="https://cal.com/vatsal-shah-sbzsly/amplify-demo">Book a call <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <WorkflowPreview useCase={useCase} />
      </section>

      <section className="case-metrics" aria-label={`${useCase.label} overview`}>
        {useCase.metrics.map(([value, label]) => (
          <div key={label}><strong>{value}</strong><span>{label}</span></div>
        ))}
      </section>

      <Details useCase={useCase} />

      <section className="case-close">
        <div><p className="case-eyebrow">A better way to get the work done</p><h2>{useCase.proof}</h2></div>
        <a className="button-primary" href="https://cal.com/vatsal-shah-sbzsly/amplify-demo">Bring us your workflow <span aria-hidden="true">↗</span></a>
      </section>

      <RelatedUseCases useCase={useCase} />
      <LandingFooter />
    </main>
  )
}
