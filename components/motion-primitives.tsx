'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import {
  LazyMotion,
  MotionConfig,
  animate,
  domMax,
  m,
  stagger,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as const

export function MotionShell({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 })

  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.7, ease: EASE }}>
        <m.div
          aria-hidden="true"
          className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left"
          style={{ scaleX: progress, background: 'var(--orange)' }}
        />
        {children}
      </MotionConfig>
    </LazyMotion>
  )
}

type RevealProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  delay?: number
  x?: number
  y?: number
  amount?: number
}

export function Reveal({ children, className, style, delay = 0, x = 0, y = 16, amount = 0.16 }: RevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <m.div
      className={className}
      style={style}
      initial={reduceMotion ? false : { opacity: 0, x, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.66, delay, ease: EASE }}
    >
      {children}
    </m.div>
  )
}

export function ProductStage({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion()

  return (
    <m.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.99 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.72, delay, ease: EASE }}
    >
      {children}
    </m.div>
  )
}

export function MotionCard({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion()

  return (
    <m.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={reduceMotion ? undefined : { y: -5 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.54, delay, ease: EASE }}
    >
      {children}
    </m.div>
  )
}

/* ------------------------------ MaskedWords ------------------------------ */

export function MaskedWords({
  text,
  em,
  className = '',
  as: Tag = 'span',
  delay = 0,
}: {
  text: string
  /** words (lowercased, punctuation stripped) to render in italic <em> */
  em?: string[]
  className?: string
  as?: 'span' | 'h1' | 'h2' | 'p'
  delay?: number
}) {
  const reduceMotion = useReducedMotion()
  const words = text.split(' ')

  if (reduceMotion) {
    return (
      <Tag className={className}>
        {words.map((w, i) => {
          const isEm = em?.includes(w.toLowerCase().replace(/[.,!?]/g, ''))
          return <span key={i}>{isEm ? <em>{w}</em> : w} </span>
        })}
      </Tag>
    )
  }

  return (
    <Tag className={className} aria-label={text}>
      <m.span
        aria-hidden
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delayChildren: stagger(0.045, { startDelay: delay }) }}
        style={{ display: 'inline' }}
      >
        {words.map((w, i) => {
          const isEm = em?.includes(w.toLowerCase().replace(/[.,!?]/g, ''))
          return (
            <span
              key={i}
              style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
            >
              <m.span
                style={{ display: 'inline-block' }}
                variants={{
                  hidden: { y: '112%' },
                  show: { y: 0, transition: { duration: 0.6, ease: EASE } },
                }}
              >
                {isEm ? <em>{w}</em> : w}
                {' '}
              </m.span>
            </span>
          )
        })}
      </m.span>
    </Tag>
  )
}

/* -------------------------------- CountUp -------------------------------- */

export function CountUp({
  value,
  className = '',
  duration = 1.2,
}: {
  /** e.g. "184", "8+", "45K", "+18%", "1,240", "$42K" */
  value: string
  className?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const reduceMotion = useReducedMotion()

  const match = value.match(/[\d,]+(\.\d+)?/)
  const numeric = match ? parseFloat(match[0].replace(/,/g, '')) : null
  const prefix = match ? value.slice(0, match.index) : value
  const suffix = match ? value.slice((match.index ?? 0) + match[0].length) : ''
  const useCommas = match ? match[0].includes(',') : false

  useEffect(() => {
    if (!inView || reduceMotion || numeric === null || !ref.current) return
    const el = ref.current
    const controls = animate(0, numeric, {
      duration,
      ease: 'circOut',
      onUpdate: (v) => {
        const rounded = Math.round(v)
        el.textContent = useCommas ? rounded.toLocaleString('en-US') : String(rounded)
      },
    })
    return () => controls.stop()
  }, [inView, reduceMotion, numeric, duration, useCommas])

  if (numeric === null) {
    return <span className={className}>{value}</span>
  }

  return (
    <span className={`tabular ${className}`}>
      {prefix}
      <span ref={ref}>{reduceMotion || !inView ? match![0] : match![0]}</span>
      {suffix}
    </span>
  )
}

/* -------------------------------- Magnetic ------------------------------- */

export function Magnetic({
  children,
  strength = 0.25,
  className = '',
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const reduceMotion = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 })
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 })
  const [fine, setFine] = useState(false)

  useEffect(() => {
    setFine(window.matchMedia('(pointer: fine)').matches)
  }, [])

  if (reduceMotion || !fine) {
    return <div className={className}>{children}</div>
  }

  return (
    <m.div
      className={className}
      style={{ x, y, display: 'inline-block' }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set(Math.max(-8, Math.min(8, (e.clientX - r.x - r.width / 2) * strength)))
        y.set(Math.max(-8, Math.min(8, (e.clientY - r.y - r.height / 2) * strength)))
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </m.div>
  )
}

/* -------------------------------- Marquee -------------------------------- */

export function Marquee({
  children,
  baseVelocity = 40,
  direction = 1,
  className = '',
}: {
  children: ReactNode
  /** px per second base drift */
  baseVelocity?: number
  direction?: 1 | -1
  className?: string
}) {
  const reduceMotion = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [-1500, 0, 1500], [-2, 0, 2], {
    clamp: true,
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { margin: '10%' })

  const x = useTransform(baseX, (v) => {
    const wrapped = ((v % 50) + 50) % 50
    return `${-wrapped}%`
  })

  useAnimationFrame((t, delta) => {
    if (reduceMotion || !inView) return
    let moveBy = direction * baseVelocity * (delta / 15000)
    moveBy += moveBy * Math.abs(velocityFactor.get()) * 2
    baseX.set(baseX.get() + moveBy)
  })

  if (reduceMotion) {
    return (
      <div className={`overflow-hidden ${className}`} ref={containerRef}>
        <div className="flex whitespace-nowrap">{children}</div>
      </div>
    )
  }

  return (
    <div className={`overflow-hidden ${className}`} ref={containerRef}>
      <m.div className="flex w-max whitespace-nowrap" style={{ x }}>
        <div className="flex shrink-0 whitespace-nowrap">{children}</div>
        <div className="flex shrink-0 whitespace-nowrap" aria-hidden>
          {children}
        </div>
      </m.div>
    </div>
  )
}
