function LogoCell({
  children,
  label,
  href,
}: {
  children: React.ReactNode
  label: string
  href: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex min-h-[112px] items-center justify-center px-6 py-5 transition-colors hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-safety"
      style={{ background: 'var(--paper-raised)' }}
      aria-label={`${label} website (opens in a new tab)`}
    >
      <span className="transition-transform duration-200 group-hover:scale-[1.03]">{children}</span>
    </a>
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
        <h2
          id="partner-logos-heading"
          className="font-display max-w-[1100px] text-[28px] leading-[1.08] sm:text-[36px]"
          style={{ color: 'var(--ink)', fontWeight: 550 }}
        >
          Leading retailers and ecommerce brands use Amplify.
        </h2>

        <div
          className="mt-5 grid gap-px overflow-hidden rounded-doc sm:grid-cols-3"
          style={{ background: 'var(--ledger-strong)', border: '1px solid var(--ledger-strong)' }}
        >
          <LogoCell label="Geo Partnering Group" href="https://www.linkedin.com/company/geo-partnering/">
            <img
              src="/logos/geo-partnering-group.png"
              alt="Geo Partnering Group"
              className="h-[64px] w-auto max-w-full object-contain"
            />
          </LogoCell>
          <LogoCell label="Beira Rio" href="https://www.beirario.com.br/en/">
            <img
              src="/logos/beira-rio.png"
              alt="Beira Rio"
              className="h-[48px] w-auto max-w-full object-contain"
            />
          </LogoCell>
          <LogoCell label="PMUK and Gusto Foods" href="https://gustoindia.in/">
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
