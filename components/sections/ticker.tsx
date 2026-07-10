'use client'

import { Marquee } from '../motion-primitives'

const ROW_1 = [
  '184 SKU ROWS PREPARED',
  '8+ CHANNELS SUPPORTED',
  '4 FIELDS TO REVIEW',
  '0 UNAPPROVED WRITES',
  '45K SALES ROWS CONNECTED',
  'AED 42K PO DRAFTED',
  '96% IDENTITY MATCH',
]

const ROW_2 = [
  'MANIFEST NO. AMP-2026-184',
  'ORIGIN: SUPPLIER PI',
  'DESTINATION: 8 CHANNELS',
  'HANDLE WITH APPROVAL',
  'THIS SIDE UP',
  'CONTENTS: RETAIL OPERATIONS',
]

function Row({ items, color }: { items: string[]; color: string }) {
  return (
    <>
      {items.map((item) => (
        <span
          key={item}
          className="type-mono-label flex items-center gap-6 pr-6"
          style={{ fontSize: 12, color, lineHeight: '44px' }}
        >
          {item}
          <span aria-hidden style={{ color: 'var(--orange)' }}>
            ✱
          </span>
        </span>
      ))}
    </>
  )
}

export function Ticker() {
  return (
    <div
      aria-label="Amplify operating numbers"
      style={{
        background: 'var(--paper-shade)',
        borderTop: '1px solid var(--ledger-strong)',
        borderBottom: '1px solid var(--ledger-strong)',
      }}
    >
      <Marquee baseVelocity={42} direction={1}>
        <Row items={ROW_1} color="var(--ink)" />
      </Marquee>
      <div className="hidden md:block" style={{ borderTop: '1px dashed var(--ledger-strong)' }}>
        <Marquee baseVelocity={30} direction={-1}>
          <Row items={ROW_2} color="var(--ink-faint)" />
        </Marquee>
      </div>
    </div>
  )
}
