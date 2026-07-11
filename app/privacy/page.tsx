import Link from 'next/link'
import { DocHeader, Rule } from '../../components/doc/chrome'
import { SiteFooter } from '../../components/sections/footer'

export const metadata = {
  title: 'Privacy Policy | Amplify',
  description: 'Amplify privacy policy: how we collect, use, and protect your data.',
}

const SECTIONS = [
  {
    title: '1. Introduction',
    body: [
      'Amplify ("Amplify," "we," "us," or "our") provides an AI workspace for commerce operators: catalog and listing automation, sales and inventory analysis, purchase-order planning, and human-approved agent workflows. This Privacy Policy explains what information we collect, how we use and protect it, and the choices you have. It applies to www.use-amplify.com, the Amplify application at app.use-amplify.com, our free listing-audit tools, and any related services (together, the "Services").',
      'By using the Services, you agree to the collection and use of information as described in this policy. If you use Amplify on behalf of a company, you represent that you are authorized to accept this policy on its behalf.',
    ],
  },
  {
    title: '2. Information We Collect',
    body: ['We collect three broad categories of information:'],
    bullets: [
      'Account information — name, work email address, company name, and authentication credentials when you create an account or join our waitlist.',
      'Connected business data — data you choose to connect or upload so the Services can do their job: product catalogs, item masters, supplier invoices and price lists, product images, pricing, inventory and stock snapshots, sales and order history, returns data, marketplace templates, ERP exports, and approval logs.',
      'Integration credentials — OAuth tokens and API keys for platforms you connect (for example Shopify, Amazon, Noon, Namshi, or your ERP). These are encrypted at rest and used only to perform the syncs and workflows you configure.',
      'Usage and device data — application logs, browser and device information, IP address, and product analytics that show us which features are used and where errors occur.',
      'Public listing data — when you run our free audit tool on a URL, we fetch and analyze the publicly available product data at that URL. We may retain aggregate audit statistics; we do not associate them with you unless you are signed in.',
    ],
  },
  {
    title: '3. How We Use Your Information',
    body: ['We use the information we collect to:'],
    bullets: [
      'Provide, maintain, and improve listing generation, catalog enrichment, inventory analysis, forecasting, purchase-order drafting, and approval workflows.',
      'Sync product and operational data between your connected platforms according to workflows you approve.',
      'Generate recommendations — listing fixes, replenishment plans, pricing observations, and other operational actions — that always remain subject to your review and approval before anything is written to a live channel.',
      'Measure the impact of approved changes on sales, returns, stock cover, and related business metrics.',
      'Send service communications such as approval requests, run summaries, security notices, and (if you opted in) product updates. You can opt out of non-essential email at any time.',
      'Secure the Services: detect and prevent fraud, abuse, and unauthorized access, and debug failures.',
    ],
  },
  {
    title: '4. AI Processing',
    body: [
      'Parts of the Services use large language models and other machine-learning systems to enrich product data, analyze listings, classify return reasons, and draft recommendations. Where we use third-party AI providers (such as Anthropic), your data is sent to them solely to generate the requested output, under agreements that prohibit them from using it to train their models.',
      'AI-generated output is always presented for human review inside Amplify. Nothing an agent prepares is published to a marketplace, ERP, or any external system without an explicit approval from your team.',
    ],
  },
  {
    title: '5. Third-Party Integrations and Service Providers',
    body: [
      'Amplify connects to third-party platforms only when you authorize the connection, and accesses only the scopes you grant. You can disconnect an integration at any time from your settings or by contacting us.',
      'We rely on a small set of infrastructure providers (cloud hosting, managed databases, error monitoring, email delivery, and AI inference) to operate the Services. Each provider processes data only on our instructions and under contractual confidentiality and security obligations.',
      'We do not sell or rent your personal information or your business data. We do not share your marketplace or catalog data with third parties for their own marketing, advertising, or model-training purposes.',
    ],
  },
  {
    title: '6. Data Security',
    body: ['We implement technical and organizational measures designed to protect your data:'],
    bullets: [
      'All data in transit is encrypted with TLS/HTTPS.',
      'Integration credentials and API tokens are encrypted at rest.',
      'Production database access is restricted to authorized personnel, logged, and monitored.',
      'Agent actions are approval-gated and recorded in an audit trail with before/after context and rollback notes.',
      'We review our infrastructure and dependencies for vulnerabilities on an ongoing basis.',
    ],
  },
  {
    title: '7. Data Retention',
    body: [
      'We retain your data for as long as your account is active or as needed to provide the Services. Connected business data is retained so that runs, approvals, and audit trails remain reproducible. When you delete your account or disconnect an integration, we delete or de-identify the associated data within 30 days, except where retention is required for legal, security, dispute-resolution, or bookkeeping purposes.',
      'Backups are retained on a rolling schedule and expire automatically.',
    ],
  },
  {
    title: '8. Your Rights and Choices',
    body: [
      'Depending on where you are located (including under the GDPR and the California Consumer Privacy Act), you may have the right to:',
    ],
    bullets: [
      'Access a copy of the personal data we hold about you.',
      'Correct inaccurate or incomplete data.',
      'Delete your personal data ("right to be forgotten").',
      'Export your data in a machine-readable format (data portability).',
      'Object to or restrict certain processing, and withdraw consent where processing is based on consent.',
      'Disconnect any third-party integration at any time.',
      'Not be discriminated against for exercising any of these rights.',
    ],
  },
  {
    title: '9. International Data Transfers',
    body: [
      'Amplify is operated from the United States, and data may be processed in the United States and other countries where our service providers operate. Where required, we rely on appropriate safeguards such as standard contractual clauses for transfers of personal data out of the EEA, the UK, or Switzerland.',
    ],
  },
  {
    title: '10. Cookies',
    body: [
      'We use essential cookies for authentication and session management, and first-party analytics to understand product usage. We do not use third-party advertising or cross-site tracking cookies. Your browser settings can block cookies entirely, though signed-in features will not work without essential cookies.',
    ],
  },
  {
    title: '11. Children’s Privacy',
    body: [
      'The Services are business tools intended for users 16 and older. We do not knowingly collect personal information from children. If you believe a child has provided us personal information, contact us and we will delete it.',
    ],
  },
  {
    title: '12. Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. We will post the updated policy on this page, update the "last updated" date, and — for material changes — notify account holders by email before the changes take effect.',
    ],
  },
]

function Logo({ size = 28 }: { size?: number }) {
  return (
    <div
      className="grid shrink-0 place-items-center rounded-doc"
      style={{ width: size, height: size, background: 'var(--ink)' }}
    >
      <img src="/logo.png" alt="Amplify" className="h-[72%] w-[72%] object-contain" />
    </div>
  )
}

function SectionHeading({ index, title }: { index: number; title: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="type-mono-label" style={{ color: 'var(--ink-faint)' }}>
        § {String(index).padStart(2, '0')}
      </span>
      <h2
        className="font-display text-[22px]"
        style={{ fontVariationSettings: "'opsz' 28", fontWeight: 520, lineHeight: 1.15, color: 'var(--ink)' }}
      >
        {title.replace(/^\d+\.\s*/, '')}
      </h2>
    </div>
  )
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--paper)', color: 'var(--ink)' }}>
      {/* Minimal paper header */}
      <nav className="px-4 py-4 sm:px-6" style={{ borderBottom: '1px solid var(--ledger)', background: 'var(--paper)' }}>
        <div className="mx-auto flex max-w-[920px] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo />
            <span className="font-display text-[17px]" style={{ fontVariationSettings: "'opsz' 28", fontWeight: 540 }}>
              Amplify
            </span>
          </Link>
          <Link href="/" className="type-mono-label transition-opacity hover:opacity-70" style={{ color: 'var(--ink-muted)' }}>
            ← Back home
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-[920px] px-5 py-12 sm:px-6 sm:py-16">
        <DocHeader index="LEGAL / PRIVACY POLICY" meta={['LAST UPDATED 2026-07-10']} />

        <h1 className="type-h2 mt-10 max-w-[720px] text-[clamp(38px,6vw,68px)]">Privacy Policy</h1>
        <p className="mt-5 max-w-[620px] text-[16px]" style={{ fontFamily: 'var(--font-body)', lineHeight: 1.7, color: 'var(--ink-muted)' }}>
          How Amplify handles account data, connected commerce data, integrations, and operational workflows.
        </p>
        <p className="type-mono-label mt-4" style={{ color: 'var(--ink-faint)' }}>
          Last updated: July 10, 2026
        </p>

        <div className="mt-12">
          {SECTIONS.map((section, i) => (
            <section key={section.title}>
              <Rule variant="single" className="mb-8" />
              <SectionHeading index={i + 1} title={section.title} />
              <div className="mt-4 space-y-4 pb-10 sm:pl-14">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="max-w-[640px] text-[15px]" style={{ fontFamily: 'var(--font-body)', lineHeight: 1.7, color: 'var(--ink-muted)' }}>
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="space-y-2">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex max-w-[640px] gap-3 text-[15px]" style={{ fontFamily: 'var(--font-body)', lineHeight: 1.7, color: 'var(--ink-muted)' }}>
                        <span className="type-mono-label shrink-0" style={{ marginTop: '0.35em', color: 'var(--ink)' }} aria-hidden>
                          —
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}

          <section>
            <Rule variant="single" className="mb-8" />
            <SectionHeading index={13} title="13. Contact Us" />
            <div className="mt-4 pb-10 sm:pl-14">
              <p className="max-w-[640px] text-[15px]" style={{ fontFamily: 'var(--font-body)', lineHeight: 1.7, color: 'var(--ink-muted)' }}>
                If you have questions about this Privacy Policy or our data practices, contact us at{' '}
                <a
                  href="mailto:svatsal64@gmail.com"
                  className="font-semibold underline underline-offset-4 transition-opacity hover:opacity-80"
                  style={{ color: 'var(--ink)', textDecorationColor: 'var(--orange)' }}
                >
                  svatsal64@gmail.com
                </a>.
              </p>
            </div>
          </section>

          <Rule variant="double" />
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
