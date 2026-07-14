export function InceptionMembership() {
  return (
    <section
      aria-label="Backed by NVIDIA and Founders, Inc."
      style={{
        background: 'var(--paper-raised)',
        borderBottom: '1px solid var(--ledger-strong)',
      }}
    >
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-6 gap-y-3 px-4 py-4 sm:px-6">
        <p
          className="type-mono-label"
          style={{ fontSize: 10, color: 'var(--ink)', fontWeight: 700 }}
        >
          BACKED BY
        </p>
        <span className="hidden h-8 w-px sm:block" style={{ background: 'var(--ledger-strong)' }} aria-hidden />
        <img
          src="/logos/nvidia-inception-program-badge.svg"
          alt="NVIDIA Inception program member"
          className="h-auto w-[145px]"
        />
        <span className="h-8 w-px" style={{ background: 'var(--ledger-strong)' }} aria-hidden />
        <div className="flex items-center gap-2.5" aria-label="Founders, Inc.">
          <img src="/logos/founders-inc-mark.png" alt="" className="h-8 w-8 object-contain" />
          <span
            className="font-display text-[19px] leading-none"
            style={{ color: 'var(--ink)', fontWeight: 600 }}
          >
            Founders, Inc.
          </span>
        </div>
      </div>
    </section>
  )
}
