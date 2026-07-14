export function InceptionMembership() {
  return (
    <section
      aria-labelledby="nvidia-inception-heading"
      style={{
        background: 'var(--paper-raised)',
        borderBottom: '1px solid var(--ledger-strong)',
      }}
    >
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-6 gap-y-3 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span
            className="h-7 w-1 shrink-0"
            style={{ background: '#76B900' }}
            aria-hidden
          />
          <div>
            <p
              className="type-mono-label"
              style={{ fontSize: 9, color: 'var(--ink-faint)' }}
            >
              NVIDIA INCEPTION PROGRAM MEMBER
            </p>
            <h2
              id="nvidia-inception-heading"
              className="font-display text-[16px] leading-tight sm:text-[18px]"
              style={{ color: 'var(--ink)', fontWeight: 560 }}
            >
              Amplify is supported through the NVIDIA Inception program.
            </h2>
          </div>
        </div>
        <span className="hidden h-8 w-px sm:block" style={{ background: 'var(--ledger-strong)' }} aria-hidden />
        <img
          src="/logos/nvidia-inception-program-badge.svg"
          alt="NVIDIA Inception program member"
          className="h-auto w-[145px]"
        />
      </div>
    </section>
  )
}
