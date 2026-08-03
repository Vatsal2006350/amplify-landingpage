import { HOME_USE_CASES } from '../../lib/home-data'
import { MANIFEST_NO } from '../../lib/manifest'
import { Barcode, Rule } from '../doc/chrome'

const COLUMNS: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: 'PRODUCT',
    links: [
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'Enrichment', href: '/#enrichment' },
      { label: 'Integrations', href: '/#integrations' },
      { label: 'Free audit', href: '/audit' },
    ],
  },
  {
    title: 'USE CASES',
    links: HOME_USE_CASES.map((item) => ({ label: item.title, href: item.href })),
  },
  {
    title: 'OPEN SOURCE',
    links: [
      { label: 'Amplify Audit', href: '/open-source' },
      {
        label: 'GitHub',
        href: 'https://github.com/Vatsal2006350/amplify-audit',
        external: true,
      },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'Early access', href: '/#cta' },
      { label: 'Privacy', href: '/privacy' },
    ],
  },
]

export function SiteFooter({ tone = 'paper' }: { tone?: 'paper' | 'ink' }) {
  const ink = tone === 'ink'
  const bg = ink ? 'var(--dk-bg)' : 'var(--paper)'
  const text = ink ? 'var(--dk-text)' : 'var(--ink)'
  const muted = ink ? 'var(--dk-muted)' : 'var(--ink-muted)'
  const faint = ink ? 'rgba(244,241,234,0.35)' : 'var(--ink-faint)'

  return (
    <footer style={{ background: bg, color: text }}>
      <Rule variant="thick-thin" tone={tone} />
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="type-mono-label" style={{ fontSize: 10, color: faint }}>
                {column.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                      className="text-[14px] transition-colors hover:text-safety"
                      style={{ color: muted }}
                    >
                      {link.label}
                      {link.external && (
                        <span className="type-mono-label ml-1" style={{ fontSize: 10 }} aria-hidden>
                          ↗
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* giant watermark wordmark */}
      <div className="overflow-hidden px-4 sm:px-6" aria-hidden>
        <p
          className="font-display mx-auto max-w-[1200px] select-none text-center leading-[0.8]"
          style={{
            fontSize: 'clamp(96px, 16vw, 220px)',
            fontWeight: 560,
            fontVariationSettings: "'opsz' 144, 'WONK' 1",
            color: text,
            opacity: 0.08,
            transform: 'translateY(18%)',
          }}
        >
          Amplify
        </p>
      </div>

      <div
        className="px-4 py-4 sm:px-6"
        style={{
          background: ink ? 'rgba(0,0,0,0.3)' : 'var(--ink)',
          color: 'var(--dk-text)',
        }}
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <p className="type-mono-label" style={{ fontSize: 9, color: 'rgba(244,241,234,0.6)' }}>
              © {new Date().getFullYear()} AMPLIFY — ALL FREIGHT F.O.B. ORIGIN
            </p>
            <p
              className="type-mono-label hidden md:block"
              style={{ fontSize: 9, color: 'rgba(244,241,234,0.6)' }}
            >
              {MANIFEST_NO}
            </p>
            <Barcode seed="AMP-2026-184" height={18} tone="ink" />
          </div>
          <p
            className="mt-3 max-w-[900px] text-[9px] leading-[1.5]"
            style={{ color: 'rgba(244,241,234,0.42)' }}
          >
            © 2025 NVIDIA, the NVIDIA logo, and NVIDIA Inception are trademarks and/or registered
            trademarks of NVIDIA Corporation in the U.S. and other countries.
          </p>
        </div>
      </div>
    </footer>
  )
}
