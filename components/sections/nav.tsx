'use client'

import { useEffect, useState } from 'react'
import { NAV_LINKS, USE_CASE_LINKS } from '../../lib/home-data'
import { MANIFEST_NO, ORIGIN } from '../../lib/manifest'
import { Magnetic } from '../motion-primitives'

function Logo({ size = 26 }: { size?: number }) {
  return (
    <img
      src="/logo.png"
      alt="Amplify"
      style={{ width: size, height: size, borderRadius: 2, objectFit: 'cover' }}
    />
  )
}

export function SiteNav({
  activeSlug,
  homePrefix = '',
}: {
  /** highlight a use-case in the dropdown on detail pages */
  activeSlug?: string
  /** '' on the home page, '/' on subpages so #anchors resolve to home */
  homePrefix?: string
}) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const href = (anchor: string) => `${homePrefix}${anchor}`

  return (
    <>
      {/* doc strip — scrolls away with the page */}
      <div
        className="flex h-6 items-center justify-between px-4 sm:px-6"
        style={{ background: 'var(--paper-shade)', borderBottom: '1px solid var(--ledger)' }}
      >
        <span className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink-faint)' }}>
          {MANIFEST_NO}
        </span>
        <span
          className="type-mono-label hidden sm:inline"
          style={{ fontSize: 9, color: 'var(--ink-faint)' }}
        >
          {ORIGIN}
        </span>
        <span className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink-faint)' }}>
          SHEET 1 OF 7
        </span>
      </div>

      <div
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: 'rgba(244, 241, 234, 0.96)',
          borderBottom: '1px solid var(--ledger-strong)',
        }}
      >
        <nav
          className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 transition-all duration-300 sm:px-6"
          style={{ height: scrolled ? 52 : 60 }}
        >
          <a href="/" className="flex min-w-0 items-center gap-2.5">
            <Logo size={scrolled ? 24 : 28} />
            <span
              className="font-display text-[17px]"
              style={{ fontWeight: 560, color: 'var(--ink)' }}
            >
              Amplify
            </span>
            <span
              className="type-mono-label hidden lg:inline"
              style={{ fontSize: 9, color: 'var(--ink-faint)' }}
            >
              · FREIGHT &amp; LISTING CO.
            </span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            <a
              key={NAV_LINKS[0].href}
              href={href(NAV_LINKS[0].href)}
              className="type-mono-label transition-colors hover:text-safety"
              style={{ color: 'var(--ink-muted)' }}
            >
              {NAV_LINKS[0].label}
            </a>

            <div className="group relative">
              <button
                type="button"
                className="type-mono-label flex items-center gap-1.5 transition-colors hover:text-safety"
                style={{ color: 'var(--ink-muted)' }}
              >
                Use cases
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 5l3 3 3-3" />
                </svg>
              </button>
              <div className="pointer-events-none absolute left-1/2 top-full z-20 w-[340px] -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-150 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100">
                <div
                  className="doc-shadow rounded-doc"
                  style={{ background: 'var(--paper-raised)', border: '1px solid var(--ink)' }}
                >
                  <p
                    className="type-mono-label px-4 pb-1 pt-3"
                    style={{ fontSize: 9, color: 'var(--ink-faint)' }}
                  >
                    SCHEDULE A — OPERATIONS
                  </p>
                  {USE_CASE_LINKS.map((link, index) => {
                    const active = activeSlug && link.href.endsWith(activeSlug)
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        className="flex items-baseline gap-3 px-4 py-3 transition-colors hover:bg-paper-shade"
                        style={{
                          borderTop: '1px solid var(--ledger)',
                          background: active ? 'var(--paper-shade)' : undefined,
                        }}
                      >
                        <span
                          className="type-mono-label shrink-0"
                          style={{ fontSize: 10, color: active ? 'var(--orange)' : 'var(--ink-faint)' }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span
                          className="font-display min-w-0 flex-1 text-[15px]"
                          style={{ fontWeight: 520, color: 'var(--ink)' }}
                        >
                          {link.label}
                        </span>
                        <span
                          className="type-mono-label hidden shrink-0 text-right sm:inline"
                          style={{ fontSize: 9, color: 'var(--ink-faint)' }}
                        >
                          {link.detail}
                        </span>
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>

            {NAV_LINKS.slice(1).map((link) => (
              <a
                key={link.href}
                href={href(link.href)}
                className="type-mono-label transition-colors hover:text-safety"
                style={{ color: 'var(--ink-muted)' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Magnetic className="hidden sm:block">
              <a
                href={href('#cta')}
                className="btn-press type-mono-label flex h-9 items-center rounded-doc px-4"
                style={{
                  background: 'var(--orange)',
                  color: 'var(--ink)',
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                GET EARLY ACCESS
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              className="grid h-9 w-9 place-items-center rounded-doc md:hidden"
              style={{ border: '1px solid var(--ink)', color: 'var(--ink)' }}
              aria-label="Toggle navigation"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              >
                {mobileOpen ? (
                  <>
                    <path d="M4 4l10 10" />
                    <path d="M14 4 4 14" />
                  </>
                ) : (
                  <>
                    <path d="M3 5h12" />
                    <path d="M3 9h12" />
                    <path d="M3 13h12" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            aria-label="Close navigation"
            className="absolute inset-0 h-full w-full"
            style={{ background: 'rgba(20,19,17,0.5)' }}
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="doc-shadow absolute left-3 right-3 top-[76px] rounded-doc"
            style={{ background: 'var(--paper-raised)', border: '1px solid var(--ink)' }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={href(link.href)}
                onClick={() => setMobileOpen(false)}
                className="type-mono-label block px-4 py-4"
                style={{ color: 'var(--ink)', borderBottom: '1px solid var(--ledger)' }}
              >
                {link.label}
              </a>
            ))}
            <p
              className="type-mono-label px-4 pb-1 pt-3"
              style={{ fontSize: 9, color: 'var(--ink-faint)' }}
            >
              USE CASES
            </p>
            {USE_CASE_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 font-display text-[16px]"
                style={{ color: 'var(--ink)', borderBottom: '1px solid var(--ledger)' }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/audit"
              onClick={() => setMobileOpen(false)}
              className="type-mono-label m-3 block rounded-doc px-4 py-3 text-center"
              style={{
                border: '1px solid var(--ink)',
                color: 'var(--ink)',
                fontWeight: 700,
              }}
            >
              FREE AUDIT ↗
            </a>
          </div>
        </div>
      )}
    </>
  )
}
