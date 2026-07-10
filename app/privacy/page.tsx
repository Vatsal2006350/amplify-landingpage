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
      'Amplify provides catalog, inventory, marketplace, and approval workflows for commerce operators. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you use our platform and services.',
    ],
  },
  {
    title: '2. Information We Collect',
    body: ['We collect the following types of information:'],
    bullets: [
      'Account information such as name, email address, and password when you create an account.',
      'Business information such as store names, product catalog data, pricing, inventory levels, order data, return data, and supplier files that you connect to Amplify.',
      'Third-party platform credentials, including OAuth tokens and API credentials for services you connect. These are encrypted at rest.',
      'Usage data such as logs, device information, and analytics about how you interact with our platform.',
    ],
  },
  {
    title: '3. How We Use Your Information',
    body: ['We use the information we collect to:'],
    bullets: [
      'Provide, maintain, and improve catalog, inventory, listing, and approval workflows.',
      'Sync product and operational data across connected marketplace platforms.',
      'Generate recommendations for listing improvements, replenishment planning, purchase order drafts, and operational actions.',
      'Measure the impact of changes on return rates, sales, stock movement, and other business metrics.',
      'Send service-related communications.',
      'Detect and prevent fraud, abuse, and unauthorized access.',
    ],
  },
  {
    title: '4. Third-Party Integrations',
    body: [
      'Our platform connects to third-party services including Shopify, Amazon, marketplace templates, supplier files, ERP exports, and other operator tools. When you authorize a connection, we access only the data and permissions you explicitly authorize.',
      'We do not sell, rent, or share your marketplace data with third parties for their own marketing or advertising purposes.',
    ],
    bullets: [
      'API credentials are encrypted and stored securely.',
      'We use your data solely to provide synchronization, workflow, and management services.',
      'You can disconnect integrations from your settings or by contacting us.',
    ],
  },
  {
    title: '5. Data Security',
    body: ['We implement security measures designed to protect your data:'],
    bullets: [
      'API tokens and credentials are encrypted at rest.',
      'Data in transit is encrypted using TLS/HTTPS.',
      'Database access is restricted and monitored.',
      'We conduct regular security reviews of our infrastructure.',
    ],
  },
  {
    title: '6. Data Retention',
    body: [
      'We retain your data for as long as your account is active or as needed to provide the services. When you delete your account or disconnect an integration, we remove associated data within a reasonable period, unless retention is required for legal, security, or operational reasons.',
    ],
  },
  {
    title: '7. Your Rights',
    body: ['You may request to:'],
    bullets: [
      'Access the personal data we hold about you.',
      'Correct inaccurate data.',
      'Delete your data.',
      'Disconnect third-party integrations.',
      'Export your data in a machine-readable format.',
    ],
  },
  {
    title: '8. Cookies',
    body: [
      'We use essential cookies for authentication and session management. We do not use third-party tracking cookies or advertising cookies.',
    ],
  },
  {
    title: '9. Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. We will post the updated policy on this page and update the last updated date when material changes are made.',
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
        <DocHeader index="LEGAL / PRIVACY POLICY" meta={['LAST UPDATED 2026-03-24']} />

        <h1 className="type-h2 mt-10 max-w-[720px] text-[clamp(38px,6vw,68px)]">Privacy Policy</h1>
        <p className="mt-5 max-w-[620px] text-[16px]" style={{ fontFamily: 'var(--font-body)', lineHeight: 1.7, color: 'var(--ink-muted)' }}>
          How Amplify handles account data, connected commerce data, integrations, and operational workflows.
        </p>
        <p className="type-mono-label mt-4" style={{ color: 'var(--ink-faint)' }}>
          Last updated: March 24, 2026
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
            <SectionHeading index={10} title="10. Contact Us" />
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
