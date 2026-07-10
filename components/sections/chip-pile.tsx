'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { CHIP_SEEDS } from '../../lib/manifest'
import { DocHeader } from '../doc/chrome'

type ChipDef = {
  id: string
  kind: 'logo' | 'text' | 'file' | 'ops' | 'stamp'
  label?: string
  src?: string
}

const CHIPS: ChipDef[] = [
  { id: 'amazon', kind: 'logo', src: '/logos/platforms/amazon.svg', label: 'Amazon' },
  { id: 'shopify', kind: 'logo', src: '/logos/platforms/shopify.svg', label: 'Shopify' },
  { id: 'noon', kind: 'logo', src: '/logos/platforms/noon.svg', label: 'Noon' },
  { id: 'trendyol', kind: 'logo', src: '/logos/platforms/trendyol.svg', label: 'Trendyol' },
  { id: 'flipkart', kind: 'logo', src: '/logos/platforms/flipkart.svg', label: 'Flipkart' },
  { id: 'sixth', kind: 'logo', src: '/logos/platforms/sixth-street.png', label: '6th Street' },
  { id: 'namshi', kind: 'text', label: 'NAMSHI' },
  { id: 'centrepoint', kind: 'text', label: 'CENTREPOINT' },
  { id: 'f1', kind: 'file', label: 'supplier_PI.xlsx' },
  { id: 'f2', kind: 'file', label: 'master_item_sheet.xlsx' },
  { id: 'f3', kind: 'file', label: 'stock_snapshot.csv' },
  { id: 'f4', kind: 'file', label: 'imgbb_album.csv' },
  { id: 'f5', kind: 'file', label: 'namshi_template.xlsx' },
  { id: 'f6', kind: 'file', label: 'amazon_flatfile_FINAL.xlsx' },
  { id: 'f7', kind: 'file', label: 'approval_log.json' },
  { id: 'o1', kind: 'ops', label: '184 SKU ROWS' },
  { id: 'o2', kind: 'ops', label: 'AED 42K PO' },
  { id: 'o3', kind: 'ops', label: '+18% AMAZON' },
  { id: 'o4', kind: 'ops', label: 'EU 38–39' },
  { id: 'o5', kind: 'stamp', label: '[ APPROVED ]' },
]

type Body = {
  x: number
  y: number
  px: number
  py: number
  rot: number
  vrot: number
  w: number
  h: number
  dropped: boolean
  dropAt: number
}

function ChipFace({ chip }: { chip: ChipDef }) {
  const base =
    'flex h-full w-full select-none items-center justify-center gap-2 rounded-doc px-4'
  if (chip.kind === 'logo') {
    return (
      <span
        className={base}
        style={{ background: 'var(--paper-raised)', border: '1px solid var(--ink)' }}
      >
        <img src={chip.src} alt={chip.label} className="max-h-6 w-auto max-w-[96px] object-contain" draggable={false} />
      </span>
    )
  }
  if (chip.kind === 'text') {
    return (
      <span
        className={`${base} font-display text-[15px] tracking-[0.08em]`}
        style={{ background: 'var(--paper-raised)', border: '1px solid var(--ink)', color: 'var(--ink)', fontWeight: 600 }}
      >
        {chip.label}
      </span>
    )
  }
  if (chip.kind === 'file') {
    return (
      <span
        className={`${base} type-mono-label`}
        style={{
          background: 'var(--paper-shade)',
          border: '1px solid var(--ledger-strong)',
          color: 'var(--ink-muted)',
          fontSize: 11,
          textTransform: 'none',
        }}
      >
        <span
          className="rounded-doc px-1 py-0.5"
          style={{ fontSize: 8, border: '1px solid var(--ledger-strong)', textTransform: 'uppercase' }}
        >
          {chip.label!.split('.').pop()}
        </span>
        {chip.label}
      </span>
    )
  }
  if (chip.kind === 'stamp') {
    return (
      <span
        className={`${base} type-mono-label`}
        style={{ background: 'var(--paper-raised)', border: '2px solid var(--stamp)', color: 'var(--stamp)', fontSize: 11, fontWeight: 700 }}
      >
        {chip.label}
      </span>
    )
  }
  return (
    <span
      className={`${base} type-mono-label`}
      style={{ background: 'var(--ink)', color: 'var(--paper)', fontSize: 11, fontWeight: 700 }}
    >
      {chip.label}
    </span>
  )
}

export function ChipPile() {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const chipRefs = useRef<(HTMLDivElement | null)[]>([])
  const bodies = useRef<Body[]>([])
  const raf = useRef<number>(0)
  const dragIndex = useRef<number>(-1)
  const pointer = useRef({ x: 0, y: 0 })
  const sleepFrames = useRef(0)
  const running = useRef(false)
  const [started, setStarted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 767px)').matches)
  }, [])

  const activeChips = isMobile ? CHIPS.slice(0, 12) : CHIPS

  useEffect(() => {
    if (reduced || started) return
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced, started])

  useEffect(() => {
    if (!started || reduced) return
    const container = containerRef.current
    if (!container) return
    const W = container.clientWidth
    const H = container.clientHeight
    const now = performance.now()

    bodies.current = activeChips.map((_, i) => {
      const seed = CHIP_SEEDS[i % CHIP_SEEDS.length]
      const el = chipRefs.current[i]
      const w = el?.offsetWidth ?? 120
      const h = el?.offsetHeight ?? 44
      const x = 40 + seed * (W - 80 - w)
      return {
        x,
        y: -h - 20 - seed * 160,
        px: x + (seed - 0.5) * 4,
        py: -h - 20 - seed * 160,
        rot: (seed - 0.5) * 30,
        vrot: 0,
        w,
        h,
        dropped: false,
        dropAt: now + i * 95,
      }
    })

    const GRAVITY = 2600
    const DT = 1 / 60

    const step = () => {
      const t = performance.now()
      const bs = bodies.current
      let allAsleep = true

      for (let i = 0; i < bs.length; i++) {
        const b = bs[i]
        if (!b.dropped) {
          if (t >= b.dropAt) b.dropped = true
          else {
            allAsleep = false
            continue
          }
        }
        if (i === dragIndex.current) {
          b.px = b.x
          b.py = b.y
          b.x += (pointer.current.x - b.x) * 0.55
          b.y += (pointer.current.y - b.y) * 0.55
          allAsleep = false
          continue
        }
        const vx = (b.x - b.px) * 0.985
        const vy = (b.y - b.py) * 0.985
        b.px = b.x
        b.py = b.y
        b.x += vx
        b.y += vy + GRAVITY * DT * DT
        b.rot += b.vrot
        b.vrot *= 0.93
        if (Math.abs(vx) > 0.06 || Math.abs(vy) > 0.06) allAsleep = false
      }

      // constraints
      for (let iter = 0; iter < 3; iter++) {
        for (let i = 0; i < bs.length; i++) {
          const b = bs[i]
          if (!b.dropped) continue
          // floor + walls
          if (b.y + b.h > H - 2) {
            const vy = b.y - b.py
            b.y = H - 2 - b.h
            b.py = b.y + vy * -0.22
            b.vrot += (b.x - b.px) * 0.25
          }
          if (b.x < 2) {
            b.x = 2
            b.px = b.x + (b.x - b.px) * 0.3
          }
          if (b.x + b.w > W - 2) {
            b.x = W - 2 - b.w
            b.px = b.x + (b.x - b.px) * 0.3
          }
          // pairwise — two circle colliders per chip
          for (let j = i + 1; j < bs.length; j++) {
            const c = bs[j]
            if (!c.dropped) continue
            for (const oa of [-0.22, 0.22]) {
              for (const ob of [-0.22, 0.22]) {
                const ax = b.x + b.w / 2 + oa * b.w
                const ay = b.y + b.h / 2
                const bx = c.x + c.w / 2 + ob * c.w
                const by = c.y + c.h / 2
                const ra = b.h * 0.56
                const rb = c.h * 0.56
                const dx = bx - ax
                const dy = by - ay
                const dist = Math.hypot(dx, dy) || 0.001
                const overlap = ra + rb - dist
                if (overlap > 0) {
                  const nx = (dx / dist) * overlap * 0.5
                  const ny = (dy / dist) * overlap * 0.5
                  b.x -= nx
                  b.y -= ny
                  c.x += nx
                  c.y += ny
                  b.vrot -= nx * 0.06
                  c.vrot += nx * 0.06
                }
              }
            }
          }
        }
      }

      for (let i = 0; i < bs.length; i++) {
        const el = chipRefs.current[i]
        const b = bs[i]
        if (el && b.dropped) {
          el.style.transform = `translate(${b.x}px, ${b.y}px) rotate(${Math.max(-24, Math.min(24, b.rot))}deg)`
          el.style.opacity = '1'
        }
      }

      if (allAsleep && dragIndex.current === -1) {
        sleepFrames.current += 1
      } else {
        sleepFrames.current = 0
      }
      if (sleepFrames.current > 45) {
        running.current = false
        return
      }
      raf.current = requestAnimationFrame(step)
    }

    running.current = true
    raf.current = requestAnimationFrame(step)

    const wake = () => {
      if (!running.current) {
        sleepFrames.current = 0
        running.current = true
        raf.current = requestAnimationFrame(step)
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      if (dragIndex.current === -1) return
      const rect = container.getBoundingClientRect()
      const b = bodies.current[dragIndex.current]
      pointer.current = {
        x: Math.max(0, Math.min(rect.width - b.w, e.clientX - rect.left - b.w / 2)),
        y: Math.max(-40, Math.min(rect.height - b.h, e.clientY - rect.top - b.h / 2)),
      }
      wake()
    }
    const onPointerUp = () => {
      dragIndex.current = -1
    }
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf.current)
        running.current = false
      } else {
        wake()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    const startDrag = (index: number) => (e: PointerEvent) => {
      if (isMobile) return
      e.preventDefault()
      dragIndex.current = index
      const rect = container.getBoundingClientRect()
      const b = bodies.current[index]
      pointer.current = {
        x: e.clientX - rect.left - b.w / 2,
        y: e.clientY - rect.top - b.h / 2,
      }
      wake()
    }
    const cleanups: (() => void)[] = []
    chipRefs.current.forEach((el, i) => {
      if (!el) return
      const handler = startDrag(i)
      el.addEventListener('pointerdown', handler)
      cleanups.push(() => el.removeEventListener('pointerdown', handler))
    })

    return () => {
      cancelAnimationFrame(raf.current)
      running.current = false
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      document.removeEventListener('visibilitychange', onVisibility)
      cleanups.forEach((fn) => fn())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, reduced, isMobile])

  return (
    <section aria-label="Everything Amplify handles">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20">
        <DocHeader index="CONTENTS — THIS SHIPMENT" meta={['HANDLE WITH CARE']} />
        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <h2
            className="type-h2 max-w-[640px]"
            style={{ fontSize: 'clamp(30px, 3.6vw, 44px)', color: 'var(--ink)' }}
          >
            Everything your ops week is <em>made of.</em>
          </h2>
          {!reduced && (
            <p className="type-mono-label" style={{ fontSize: 10, color: 'var(--ink-faint)' }}>
              {isMobile ? 'CONTENTS SETTLE ON ARRIVAL' : 'GO AHEAD — PICK ONE UP'}
            </p>
          )}
        </div>

        {/* visually-hidden accessible list */}
        <ul className="sr-only">
          {CHIPS.map((chip) => (
            <li key={chip.id}>{chip.label}</li>
          ))}
        </ul>

        {reduced ? (
          <div
            aria-hidden
            className="mt-8 flex flex-wrap items-end gap-2 rounded-doc p-6"
            style={{ border: '1px solid var(--ink)', background: 'var(--paper-shade)' }}
          >
            {activeChips.map((chip) => (
              <div key={chip.id} className="h-11">
                <ChipFace chip={chip} />
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={containerRef}
            aria-hidden
            className="relative mt-8 overflow-hidden rounded-doc"
            style={{
              height: isMobile ? 340 : 420,
              border: '1px solid var(--ink)',
              background: 'var(--paper-shade)',
              touchAction: 'pan-y',
            }}
          >
            <p
              className="type-mono-label pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap"
              style={{ fontSize: 9, color: 'var(--ink-faint)' }}
            >
              RECEIVING BAY — ALL FORMATS ACCEPTED
            </p>
            {activeChips.map((chip, i) => (
              <div
                key={chip.id}
                ref={(el) => {
                  chipRefs.current[i] = el
                }}
                className="absolute left-0 top-0 h-11 opacity-0"
                style={{
                  cursor: isMobile ? 'default' : 'grab',
                  willChange: 'transform',
                }}
              >
                <ChipFace chip={chip} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
