import type { CSSProperties, ReactNode } from 'react'

/* ---------------------------------- Rule --------------------------------- */

export function Rule({
  variant = 'single',
  tone = 'paper',
  className = '',
}: {
  variant?: 'single' | 'double' | 'thick-thin'
  tone?: 'paper' | 'ink'
  className?: string
}) {
  const line = tone === 'ink' ? 'var(--dk-rule)' : 'var(--ledger)'
  const strong = tone === 'ink' ? 'var(--dk-muted)' : 'var(--ink)'
  if (variant === 'single') {
    return <div aria-hidden className={className} style={{ borderTop: `1px solid ${line}` }} />
  }
  if (variant === 'double') {
    return (
      <div aria-hidden className={className}>
        <div style={{ borderTop: `1px solid ${line}` }} />
        <div style={{ borderTop: `1px solid ${line}`, marginTop: 3 }} />
      </div>
    )
  }
  return (
    <div aria-hidden className={className}>
      <div style={{ borderTop: `2px solid ${strong}` }} />
      <div style={{ borderTop: `1px solid ${line}`, marginTop: 5 }} />
    </div>
  )
}

/* ------------------------------- RuledBlock ------------------------------ */

export function RuledBlock({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`ruled-lines ${className}`} style={{ lineHeight: '32px' }}>
      {children}
    </div>
  )
}

/* ------------------------------- IndexTag -------------------------------- */

export function IndexTag({
  children,
  tone = 'paper',
  className = '',
}: {
  children: ReactNode
  tone?: 'paper' | 'ink'
  className?: string
}) {
  return (
    <p
      className={`type-mono-label flex items-center gap-3 ${className}`}
      style={{ color: tone === 'ink' ? 'var(--dk-muted)' : 'var(--ink-muted)' }}
    >
      <span
        aria-hidden
        className="inline-block h-px w-6"
        style={{ background: tone === 'ink' ? 'var(--dk-text)' : 'var(--ink)' }}
      />
      {children}
    </p>
  )
}

/* ------------------------------- DocHeader ------------------------------- */

export function DocHeader({
  index,
  meta,
  children,
  tone = 'paper',
  className = '',
}: {
  index: string
  meta?: string[]
  children?: ReactNode
  tone?: 'paper' | 'ink'
  className?: string
}) {
  const muted = tone === 'ink' ? 'var(--dk-muted)' : 'var(--ink-muted)'
  return (
    <header className={className}>
      <Rule variant="thick-thin" tone={tone} />
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
        <p className="type-mono-label" style={{ color: muted }}>
          {index}
        </p>
        {children}
        {meta && (
          <div className="hidden text-right sm:block">
            {meta.map((line) => (
              <p key={line} className="type-mono-label" style={{ color: muted, fontSize: 10 }}>
                {line}
              </p>
            ))}
          </div>
        )}
      </div>
      <Rule variant="single" tone={tone} />
    </header>
  )
}

/* -------------------------------- Barcode -------------------------------- */

export function Barcode({
  seed,
  height = 28,
  tone = 'paper',
  caption,
  className = '',
}: {
  seed: string
  height?: number
  tone?: 'paper' | 'ink'
  caption?: string
  className?: string
}) {
  const bars: { x: number; w: number }[] = []
  let x = 0
  for (let i = 0; i < seed.length * 2; i++) {
    const code = seed.charCodeAt(i % seed.length) + i * 7
    const w = (code % 3) + 1
    const gap = ((code >> 2) % 2) + 1
    bars.push({ x, w })
    x += w + gap
  }
  const fill = tone === 'ink' ? 'var(--dk-text)' : 'var(--ink)'
  return (
    <div aria-hidden className={className}>
      <svg width={x} height={height} viewBox={`0 0 ${x} ${height}`} style={{ display: 'block' }}>
        {bars.map((b, i) => (
          <rect key={i} x={b.x} y={0} width={b.w} height={height} fill={fill} />
        ))}
      </svg>
      {caption && (
        <p
          className="type-mono-label mt-1"
          style={{ fontSize: 9, color: tone === 'ink' ? 'var(--dk-muted)' : 'var(--ink-faint)' }}
        >
          {caption}
        </p>
      )}
    </div>
  )
}

/* ------------------------------ Perforation ------------------------------ */

export function Perforation({
  label,
  tone = 'paper',
  className = '',
}: {
  label?: string
  tone?: 'paper' | 'ink'
  className?: string
}) {
  const hole = tone === 'ink' ? 'var(--dk-bg)' : 'var(--paper)'
  const rule = tone === 'ink' ? 'var(--dk-rule)' : 'var(--ledger-strong)'
  return (
    <div aria-hidden className={`relative flex items-center ${className}`}>
      <div
        className="h-3 w-full"
        style={{
          backgroundImage: `radial-gradient(circle, ${hole} 3px, transparent 3.5px)`,
          backgroundSize: '18px 12px',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'center',
          borderTop: `1px dashed ${rule}`,
        }}
      />
      {label && (
        <span
          className="type-mono-label absolute left-1/2 -translate-x-1/2 px-3"
          style={{
            fontSize: 10,
            background: tone === 'ink' ? 'var(--dk-bg)' : 'var(--paper)',
            color: tone === 'ink' ? 'var(--dk-muted)' : 'var(--ink-faint)',
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}

/* ------------------------------- MarginNote ------------------------------ */

export function MarginNote({
  children,
  side = 'right',
  className = '',
}: {
  children: ReactNode
  side?: 'left' | 'right'
  className?: string
}) {
  return (
    <p
      aria-hidden
      className={`type-mono-label pointer-events-none absolute hidden 2xl:block ${className}`}
      style={{
        fontSize: 9,
        color: 'var(--ink-faint)',
        writingMode: 'vertical-rl',
        ...(side === 'right' ? { right: -40 } : { left: -40, transform: 'rotate(180deg)' }),
      }}
    >
      {children}
    </p>
  )
}

/* ------------------------------ SizeRunGrid ------------------------------ */

export function SizeRunGrid({
  items,
  className = '',
  renderValue,
}: {
  items: { value: string; label: string; note?: ReactNode }[]
  className?: string
  renderValue?: (value: string, index: number) => ReactNode
}) {
  return (
    <div className={className}>
      <Rule variant="thick-thin" />
      <div className="grid grid-cols-2 md:grid-cols-4">
        {items.map((item, i) => (
          <div
            key={item.label}
            className="relative px-4 py-5 md:px-6"
            style={{
              borderLeft: i % 2 === 1 ? '1px solid var(--ledger)' : undefined,
            }}
          >
            <span
              className="hidden md:block"
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                borderLeft: i > 0 ? '1px solid var(--ledger)' : undefined,
              }}
            />
            <p className="type-mono-label" style={{ fontSize: 10, color: 'var(--ink-faint)' }}>
              QTY {String(i + 1).padStart(2, '0')}
            </p>
            <p
              className="font-display tabular mt-2 text-4xl md:text-[40px]"
              style={{ fontVariationSettings: "'opsz' 72", fontWeight: 540 }}
            >
              {renderValue ? renderValue(item.value, i) : item.value}
            </p>
            <p className="type-mono-label mt-2" style={{ color: 'var(--ink-muted)' }}>
              {item.label}
            </p>
            {item.note}
          </div>
        ))}
      </div>
      <Rule variant="single" />
    </div>
  )
}

/* ------------------------------ StatusBracket ----------------------------- */

const STATUS_COLOR: Record<string, string> = {
  ready: 'var(--ink)',
  synced: 'var(--ink)',
  complete: 'var(--ink)',
  passed: 'var(--ink)',
  live: 'var(--ink)',
  approve: 'var(--ink)',
  growth: 'var(--ink)',
  hold: 'var(--ink-muted)',
  queued: 'var(--ink-muted)',
  waiting: 'var(--ink-muted)',
  preparing: 'var(--ink-muted)',
  draft: 'var(--ink-muted)',
  review: 'var(--orange)',
  open: 'var(--orange)',
  watch: 'var(--orange)',
  running: 'var(--orange)',
  fix: 'var(--orange)',
  test: 'var(--orange)',
  'needs info': 'var(--orange)',
  blocked: 'var(--stamp)',
}

export function StatusBracket({
  status,
  tone = 'paper',
  className = '',
}: {
  status: string
  tone?: 'paper' | 'ink'
  className?: string
}) {
  const key = status.toLowerCase()
  let color = STATUS_COLOR[key] ?? (tone === 'ink' ? 'var(--dk-text)' : 'var(--ink)')
  if (tone === 'ink' && (color === 'var(--ink)' || color === 'var(--ink-muted)')) {
    color = color === 'var(--ink)' ? 'var(--dk-text)' : 'var(--dk-muted)'
  }
  return (
    <span className={`type-mono-label whitespace-nowrap ${className}`} style={{ color }}>
      [ {status.toUpperCase()} ]
    </span>
  )
}
