import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy | Amplify',
  description: 'Amplify privacy policy: how we collect, use, and protect your data.',
}

const ACCENT = '#C5F135'
const BASE = '#080808'
const BORDER = 'rgba(255,255,255,0.12)'
const GLASS = 'rgba(255,255,255,0.065)'
const MUTED = 'rgba(255,255,255,0.58)'
const SOFT = 'rgba(255,255,255,0.76)'
const D = 'var(--font-display)'
const M = 'var(--font-mono)'

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
    <div className="grid shrink-0 place-items-center rounded-lg bg-black" style={{ width: size, height: size }}>
      <img src="/logo.png" alt="Amplify" className="h-[72%] w-[72%] object-contain" />
    </div>
  )
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-9" style={{ background: ACCENT }} />
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: MUTED, fontFamily: M }}>
        {label}
      </span>
    </div>
  )
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen" style={{ background: BASE }}>
      <nav className="sticky top-0 z-50 border-b px-4 py-3 backdrop-blur-2xl" style={{ background: 'rgba(8,8,8,0.82)', borderColor: BORDER }}>
        <div className="mx-auto flex max-w-[920px] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-[14px] font-semibold text-white" style={{ fontFamily: D }}>Amplify</span>
          </Link>
          <Link href="/" className="rounded-lg px-3 py-2 text-[11px] font-bold uppercase transition-opacity hover:opacity-90" style={{ background: ACCENT, color: BASE, fontFamily: M }}>
            Back home
          </Link>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)', backgroundSize: '54px 54px' }} />
        <div className="absolute inset-x-0 top-0 h-[520px] pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(197,241,53,0.15), transparent 34%, rgba(86,142,255,0.08) 72%, transparent)' }} />

        <div className="relative mx-auto max-w-[920px] px-5 py-16 sm:px-6 sm:py-24">
          <SectionLabel label="Legal" />
          <h1 className="mt-7 max-w-[720px] text-[clamp(38px,7vw,78px)] font-bold leading-[0.98] text-white" style={{ fontFamily: D }}>
            Privacy Policy
          </h1>
          <p className="mt-5 max-w-[620px] text-[16px] leading-[1.75]" style={{ color: SOFT }}>
            How Amplify handles account data, connected commerce data, integrations, and operational workflows.
          </p>
          <p className="mt-4 text-[11px] uppercase" style={{ color: MUTED, fontFamily: M }}>
            Last updated: March 24, 2026
          </p>

          <div className="mt-10 overflow-hidden rounded-xl border" style={{ borderColor: BORDER, background: GLASS, boxShadow: '0 34px 110px rgba(0,0,0,0.32)' }}>
            {SECTIONS.map((section) => (
              <section key={section.title} className="border-b p-5 last:border-b-0 sm:p-7" style={{ borderColor: BORDER }}>
                <h2 className="text-[20px] font-semibold text-white" style={{ fontFamily: D }}>{section.title}</h2>
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-[14px] leading-[1.8]" style={{ color: SOFT }}>
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="space-y-2">
                      {section.bullets.map((item) => (
                        <li key={item} className="flex gap-3 text-[14px] leading-[1.65]" style={{ color: SOFT }}>
                          <span className="mt-[0.62em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: ACCENT }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}

            <section className="p-5 sm:p-7">
              <h2 className="text-[20px] font-semibold text-white" style={{ fontFamily: D }}>10. Contact Us</h2>
              <p className="mt-4 text-[14px] leading-[1.8]" style={{ color: SOFT }}>
                If you have questions about this Privacy Policy or our data practices, contact us at{' '}
                <a href="mailto:svatsal64@gmail.com" className="font-semibold underline decoration-[rgba(197,241,53,0.45)] underline-offset-4 transition-opacity hover:opacity-80" style={{ color: ACCENT }}>
                  svatsal64@gmail.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </section>

      <footer className="border-t py-8" style={{ borderColor: BORDER }}>
        <div className="mx-auto flex max-w-[920px] items-center justify-between gap-4 px-5 text-[11px] sm:px-6" style={{ color: MUTED, fontFamily: M }}>
          <span>&copy; {new Date().getFullYear()} Amplify. All rights reserved.</span>
          <Link href="/" className="transition-colors hover:text-white">Home</Link>
        </div>
      </footer>
    </main>
  )
}
