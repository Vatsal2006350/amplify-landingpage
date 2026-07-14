function LogoCell({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div
      className="flex min-h-[112px] items-center justify-center px-6 py-5"
      style={{ background: 'var(--paper-raised)' }}
      aria-label={label}
    >
      {children}
    </div>
  )
}

export function Ticker() {
  return (
    <section
      aria-labelledby="partner-logos-heading"
      style={{
        background: 'var(--paper-shade)',
        borderTop: '1px solid var(--ledger-strong)',
        borderBottom: '1px solid var(--ledger-strong)',
      }}
    >
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink-faint)' }}>
              WORKING RELATIONSHIPS / 2026
            </p>
            <h2
              id="partner-logos-heading"
              className="font-display mt-1 text-[24px] leading-tight sm:text-[28px]"
              style={{ color: 'var(--ink)', fontWeight: 550 }}
            >
              Partnering with
            </h2>
          </div>
          <p className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink-faint)' }}>
            BRAND + OPERATING PARTNERS
          </p>
        </div>

        <div
          className="mt-5 grid gap-px overflow-hidden rounded-doc sm:grid-cols-3"
          style={{ background: 'var(--ledger-strong)', border: '1px solid var(--ledger-strong)' }}
        >
          <LogoCell label="Geo Partnering Group">
            <img
              src="/logos/geo-partnering-group.png"
              alt="Geo Partnering Group"
              className="h-[64px] w-auto max-w-full object-contain"
            />
          </LogoCell>
          <LogoCell label="Beira Rio">
            <img
              src="/logos/beira-rio.png"
              alt="Beira Rio"
              className="h-[48px] w-auto max-w-full object-contain"
            />
          </LogoCell>
          <LogoCell label="PMUK and Gusto Foods">
            <div className="flex items-center gap-3">
              <span
                className="type-mono-label border-r pr-3"
                style={{ fontSize: 10, color: 'var(--ink-faint)', borderColor: 'var(--ledger-strong)' }}
              >
                PMUK
              </span>
              <span
                className="font-sans text-[28px] tracking-[-0.04em]"
                style={{ color: 'var(--ink)', fontWeight: 800 }}
              >
                Gusto<span style={{ color: '#76B900' }}>●</span>
              </span>
              <span className="type-mono-label -ml-2 mt-4" style={{ fontSize: 7, color: 'var(--ink-muted)' }}>
                FOODS
              </span>
            </div>
          </LogoCell>
        </div>
      </div>
    </section>
  )
}
