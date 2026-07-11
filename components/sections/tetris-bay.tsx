'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'
import { DocHeader } from '../doc/chrome'

const COLS = 12
const ROWS = 9
const TICK_MS = 520

type PieceType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L'

const PIECE_STYLE: Record<PieceType, { label: string; fill: string; text: string; border: string }> = {
  I: { label: 'XLSX', fill: 'var(--orange)', text: 'var(--paper)', border: 'var(--ink)' },
  O: { label: 'SKU', fill: 'var(--paper-raised)', text: 'var(--ink)', border: 'var(--ink)' },
  T: { label: 'PO', fill: 'var(--ink)', text: 'var(--paper)', border: 'var(--ink)' },
  S: { label: 'IMG', fill: 'var(--paper-shade)', text: 'var(--ink)', border: 'var(--ink)' },
  Z: { label: 'CSV', fill: '#FFFFFF', text: 'var(--ink)', border: 'var(--ink)' },
  J: { label: 'ERP', fill: 'rgba(29,122,109,0.24)', text: 'var(--ink)', border: 'var(--ink)' },
  L: { label: 'API', fill: 'rgba(20,19,17,0.14)', text: 'var(--ink)', border: 'var(--ink)' },
}

/* base shapes as [row, col] offsets; rotations computed */
const BASE_SHAPES: Record<PieceType, [number, number][]> = {
  I: [[0, 0], [0, 1], [0, 2], [0, 3]],
  O: [[0, 0], [0, 1], [1, 0], [1, 1]],
  T: [[0, 0], [0, 1], [0, 2], [1, 1]],
  S: [[0, 1], [0, 2], [1, 0], [1, 1]],
  Z: [[0, 0], [0, 1], [1, 1], [1, 2]],
  J: [[0, 0], [1, 0], [1, 1], [1, 2]],
  L: [[0, 2], [1, 0], [1, 1], [1, 2]],
}

function rotateCells(cells: [number, number][]): [number, number][] {
  // rotate 90° cw then normalize to top-left
  const rotated = cells.map(([r, c]) => [c, -r] as [number, number])
  const minR = Math.min(...rotated.map(([r]) => r))
  const minC = Math.min(...rotated.map(([, c]) => c))
  return rotated.map(([r, c]) => [r - minR, c - minC] as [number, number])
}

const ROTATIONS: Record<PieceType, [number, number][][]> = Object.fromEntries(
  (Object.keys(BASE_SHAPES) as PieceType[]).map((type) => {
    const rots: [number, number][][] = [BASE_SHAPES[type]]
    for (let i = 0; i < 3; i++) rots.push(rotateCells(rots[i]))
    return [type, rots]
  }),
) as Record<PieceType, [number, number][][]>

type Board = (PieceType | null)[][]
type Piece = { type: PieceType; rot: number; x: number; y: number }

const emptyBoard = (): Board => Array.from({ length: ROWS }, () => Array(COLS).fill(null))

const cellsOf = (p: Piece) => ROTATIONS[p.type][p.rot % 4].map(([r, c]) => [p.y + r, p.x + c] as [number, number])

function collides(board: Board, p: Piece) {
  return cellsOf(p).some(([r, c]) => c < 0 || c >= COLS || r >= ROWS || (r >= 0 && board[r][c] !== null))
}

function dropY(board: Board, p: Piece) {
  let y = p.y
  while (!collides(board, { ...p, y: y + 1 })) y++
  return y
}

/* classic weighted heuristic for the autopilot */
function evaluate(board: Board) {
  const heights = Array(COLS).fill(0)
  let holes = 0
  for (let c = 0; c < COLS; c++) {
    let seen = false
    for (let r = 0; r < ROWS; r++) {
      if (board[r][c] !== null) {
        if (!seen) {
          heights[c] = ROWS - r
          seen = true
        }
      } else if (seen) holes++
    }
  }
  const aggregate = heights.reduce((a, b) => a + b, 0)
  let bump = 0
  for (let c = 0; c < COLS - 1; c++) bump += Math.abs(heights[c] - heights[c + 1])
  return { aggregate, holes, bump }
}

function settle(board: Board, p: Piece): { board: Board; cleared: number } {
  const next = board.map((row) => [...row])
  for (const [r, c] of cellsOf(p)) if (r >= 0) next[r][c] = p.type
  let cleared = 0
  for (let r = ROWS - 1; r >= 0; r--) {
    if (next[r].every((cell) => cell !== null)) {
      next.splice(r, 1)
      next.unshift(Array(COLS).fill(null))
      cleared++
      r++
    }
  }
  return { board: next, cleared }
}

function bestPlacement(board: Board, type: PieceType): { rot: number; x: number } {
  let best = { rot: 0, x: Math.floor(COLS / 2) - 1, score: -Infinity }
  for (let rot = 0; rot < 4; rot++) {
    for (let x = -2; x < COLS; x++) {
      const probe: Piece = { type, rot, x, y: -2 }
      if (collides(board, { ...probe, y: probe.y + 1 }) && collides(board, probe)) continue
      if (cellsOf(probe).some(([, c]) => c < 0 || c >= COLS)) continue
      const y = dropY(board, probe)
      const landed = { ...probe, y }
      if (cellsOf(landed).some(([r]) => r < 0)) continue
      const { board: after, cleared } = settle(board, landed)
      const { aggregate, holes, bump } = evaluate(after)
      const score = -0.51 * aggregate + 0.76 * cleared - 0.36 * holes - 0.18 * bump
      if (score > best.score) best = { rot, x, score }
    }
  }
  return { rot: best.rot, x: best.x }
}

const randomType = (): PieceType => 'IOTSZJL'[Math.floor(Math.random() * 7)] as PieceType

const OPS_ITEMS = [
  'supplier_PI.xlsx', 'master_item_sheet.xlsx', 'stock_snapshot.csv', 'imgbb_album.csv',
  'namshi_template.xlsx', 'approval_log.json', '184 SKU rows', '$42K PO', '+18% Amazon',
  'Amazon', 'Shopify', 'Noon', 'Namshi', 'Centrepoint', '6th Street',
]

export function TetrisBay() {
  const reduced = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const boardWrapRef = useRef<HTMLDivElement>(null)
  const inView = useInView(wrapRef, { amount: 0.3 })
  const [mounted, setMounted] = useState(false)
  const [manual, setManual] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [, force] = useState(0)
  const rerender = () => force((n) => n + 1)

  const game = useRef({
    board: emptyBoard(),
    piece: null as Piece | null,
    target: { rot: 0, x: 4 },
    shipped: 0,
    best: 0,
    over: false,
  })

  useEffect(() => {
    setMounted(true)
    setIsMobile(window.matchMedia('(max-width: 767px)').matches)
  }, [])

  const spawn = useCallback(() => {
    const g = game.current
    const type = randomType()
    const piece: Piece = { type, rot: 0, x: Math.floor(COLS / 2) - 1, y: -1 }
    if (collides(g.board, piece)) {
      // bay full — reset
      g.over = true
      g.best = Math.max(g.best, g.shipped)
      window.setTimeout(() => {
        g.board = emptyBoard()
        g.shipped = 0
        g.over = false
        spawn()
        rerender()
      }, 1400)
      return
    }
    g.piece = piece
    g.target = bestPlacement(g.board, type)
  }, [])

  const lock = useCallback(() => {
    const g = game.current
    if (!g.piece) return
    const { board, cleared } = settle(g.board, g.piece)
    g.board = board
    g.shipped += cleared
    g.best = Math.max(g.best, g.shipped)
    g.piece = null
    spawn()
  }, [spawn])

  const move = useCallback((dx: number) => {
    const g = game.current
    if (!g.piece || g.over) return
    const next = { ...g.piece, x: g.piece.x + dx }
    if (!collides(g.board, next)) {
      g.piece = next
      rerender()
    }
  }, [])

  const rotate = useCallback(() => {
    const g = game.current
    if (!g.piece || g.over) return
    for (const kick of [0, -1, 1, -2, 2]) {
      const next = { ...g.piece, rot: (g.piece.rot + 1) % 4, x: g.piece.x + kick }
      if (!collides(g.board, next)) {
        g.piece = next
        rerender()
        return
      }
    }
  }, [])

  const softDrop = useCallback(() => {
    const g = game.current
    if (!g.piece || g.over) return
    const next = { ...g.piece, y: g.piece.y + 1 }
    if (collides(g.board, next)) lock()
    else g.piece = next
    rerender()
  }, [lock])

  const hardDrop = useCallback(() => {
    const g = game.current
    if (!g.piece || g.over) return
    g.piece = { ...g.piece, y: dropY(g.board, g.piece) }
    lock()
    rerender()
  }, [lock])

  /* game clock */
  useEffect(() => {
    if (!mounted || reduced || !inView) return
    if (!game.current.piece && !game.current.over) spawn()
    const interval = window.setInterval(() => {
      const g = game.current
      if (g.over || !g.piece) return
      if (!manual) {
        // autopilot: rotate then slide toward target, then fall
        if (g.piece.rot !== g.target.rot) {
          rotate()
        } else if (g.piece.x !== g.target.x) {
          move(Math.sign(g.target.x - g.piece.x))
        }
      }
      const next = { ...g.piece, y: g.piece.y + 1 }
      if (collides(g.board, next)) lock()
      else g.piece = next
      rerender()
    }, manual ? TICK_MS : TICK_MS * 0.62)
    return () => window.clearInterval(interval)
  }, [mounted, reduced, inView, manual, spawn, lock, move, rotate])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!manual) return
    const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ']
    if (!keys.includes(e.key)) return
    e.preventDefault()
    if (e.key === 'ArrowLeft') move(-1)
    if (e.key === 'ArrowRight') move(1)
    if (e.key === 'ArrowUp') rotate()
    if (e.key === 'ArrowDown') softDrop()
    if (e.key === ' ') hardDrop()
  }

  const takeOver = () => {
    setManual(true)
    boardWrapRef.current?.focus()
  }

  const g = game.current
  const ghost = g.piece ? { ...g.piece, y: dropY(g.board, g.piece) } : null

  return (
    <section ref={wrapRef} aria-label="Everything Amplify handles — playable receiving bay">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20">
        <DocHeader index="CONTENTS — THIS SHIPMENT" meta={['HANDLE WITH CARE']} />
        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="type-h2 max-w-[640px]" style={{ fontSize: 'clamp(30px, 3.6vw, 44px)', color: 'var(--ink)' }}>
            Everything your ops week is <em>made of.</em>
          </h2>
          {!reduced && (
            <div className="flex items-center gap-4">
              <p className="type-mono-label tabular" style={{ fontSize: 10, color: 'var(--ink)' }}>
                ROWS SHIPPED: {g.shipped}
                {g.best > 0 && <span style={{ color: 'var(--ink-faint)' }}> · BEST {g.best}</span>}
              </p>
              {!manual ? (
                <button
                  type="button"
                  onClick={takeOver}
                  className="btn-press type-mono-label rounded-doc h-9 px-4"
                  style={{ background: 'var(--orange)', color: 'var(--paper)', fontSize: 10, fontWeight: 700 }}
                >
                  ▸ TAKE OVER
                </button>
              ) : (
                <p className="type-mono-label" style={{ fontSize: 10, color: 'var(--ink-faint)' }}>
                  {isMobile ? 'USE THE CONTROLS BELOW' : '◂ ▸ MOVE · ▲ ROTATE · ▼ / SPACE DROP'}
                </p>
              )}
            </div>
          )}
        </div>

        {/* accessible inventory of what the bay contains */}
        <ul className="sr-only">
          {OPS_ITEMS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div
          ref={boardWrapRef}
          tabIndex={manual ? 0 : -1}
          onKeyDown={onKeyDown}
          onBlur={() => setManual(false)}
          aria-hidden
          className="relative mt-8 overflow-hidden rounded-doc outline-none focus:ring-1"
          style={{ border: '1px solid var(--ink)', background: 'var(--paper-shade)' }}
        >
          {/* faint ledger grid */}
          <div
            className="relative mx-auto"
            style={{
              aspectRatio: `${COLS} / ${ROWS}`,
              maxWidth: 12 * 64,
              backgroundImage:
                'linear-gradient(var(--ledger) 1px, transparent 1px), linear-gradient(90deg, var(--ledger) 1px, transparent 1px)',
              backgroundSize: `${100 / COLS}% ${100 / ROWS}%`,
              opacity: 1,
            }}
          >
            {mounted && !reduced && (
              <>
                {/* settled cells */}
                {g.board.map((row, r) =>
                  row.map((cell, c) =>
                    cell ? (
                      <div
                        key={`${r}-${c}`}
                        className="absolute"
                        style={{
                          left: `${(c / COLS) * 100}%`,
                          top: `${(r / ROWS) * 100}%`,
                          width: `${100 / COLS}%`,
                          height: `${100 / ROWS}%`,
                          background: PIECE_STYLE[cell].fill,
                          border: `1px solid ${PIECE_STYLE[cell].border}`,
                        }}
                      />
                    ) : null,
                  ),
                )}
                {/* ghost */}
                {ghost &&
                  g.piece &&
                  ghost.y !== g.piece.y &&
                  cellsOf(ghost).map(([r, c], i) =>
                    r >= 0 ? (
                      <div
                        key={`ghost-${i}`}
                        className="absolute"
                        style={{
                          left: `${(c / COLS) * 100}%`,
                          top: `${(r / ROWS) * 100}%`,
                          width: `${100 / COLS}%`,
                          height: `${100 / ROWS}%`,
                          border: '1px dashed var(--ledger-strong)',
                        }}
                      />
                    ) : null,
                  )}
                {/* falling piece */}
                {g.piece &&
                  cellsOf(g.piece).map(([r, c], i) =>
                    r >= 0 ? (
                      <div
                        key={`p-${i}`}
                        className="absolute flex items-center justify-center"
                        style={{
                          left: `${(c / COLS) * 100}%`,
                          top: `${(r / ROWS) * 100}%`,
                          width: `${100 / COLS}%`,
                          height: `${100 / ROWS}%`,
                          background: PIECE_STYLE[g.piece!.type].fill,
                          border: `1px solid ${PIECE_STYLE[g.piece!.type].border}`,
                          transition: 'left 80ms linear, top 80ms linear',
                        }}
                      >
                        {i === 1 && (
                          <span
                            className="type-mono-label hidden sm:inline"
                            style={{ fontSize: 8, fontWeight: 700, color: PIECE_STYLE[g.piece!.type].text }}
                          >
                            {PIECE_STYLE[g.piece!.type].label}
                          </span>
                        )}
                      </div>
                    ) : null,
                  )}
                {/* bay full stamp */}
                {g.over && (
                  <div className="absolute inset-0 grid place-items-center">
                    <span
                      className="type-mono-label rounded-doc px-4 py-2"
                      style={{
                        border: '2px solid var(--stamp)',
                        color: 'var(--stamp)',
                        fontSize: 14,
                        fontWeight: 700,
                        transform: 'rotate(-6deg)',
                        background: 'var(--paper)',
                      }}
                    >
                      BAY FULL — RESHIPPING
                    </span>
                  </div>
                )}
              </>
            )}
            {/* reduced motion / SSR: a calm pre-stacked bay */}
            {(!mounted || reduced) && (
              <div className="absolute inset-x-0 bottom-0" style={{ height: `${(3 / ROWS) * 100}%` }}>
                <div className="h-full w-full" style={{ background: 'rgba(29,122,109,0.14)', borderTop: '1px solid var(--ink)' }} />
              </div>
            )}
          </div>
          <p
            className="type-mono-label pointer-events-none absolute left-2 top-2 whitespace-nowrap"
            style={{ fontSize: 9, color: 'var(--ink-faint)' }}
          >
            RECEIVING BAY — CLEAR A ROW TO SHIP IT
          </p>
        </div>

        {/* mobile controls */}
        {mounted && !reduced && manual && isMobile && (
          <div className="mt-3 grid grid-cols-4 gap-2">
            {([
              ['◂', () => move(-1)],
              ['⟳', rotate],
              ['▸', () => move(1)],
              ['▼', hardDrop],
            ] as const).map(([label, fn]) => (
              <button
                key={label}
                type="button"
                onPointerDown={(e) => {
                  e.preventDefault()
                  fn()
                }}
                className="rounded-doc h-12 text-[18px]"
                style={{ border: '1px solid var(--ink)', color: 'var(--ink)', background: 'var(--paper-raised)' }}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink-faint)' }}>
            PIECES: XLSX FILES · SKU BATCHES · PURCHASE ORDERS · IMAGES · CSV EXPORTS · ERP SYNCS · API CALLS
          </p>
          <p className="type-mono-label" style={{ fontSize: 9, color: 'var(--ink-faint)' }}>
            {manual ? '[ MANUAL ]' : '[ AUTOPILOT — AMPLIFY IS STACKING ]'}
          </p>
        </div>
      </div>
    </section>
  )
}
