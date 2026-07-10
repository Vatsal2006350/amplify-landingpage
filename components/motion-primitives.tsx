'use client'

import type { CSSProperties, ReactNode } from 'react'
import { LazyMotion, MotionConfig, domAnimation, m, useReducedMotion, useScroll, useSpring } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as const

export function MotionShell({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 })

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.7, ease: EASE }}>
        <m.div
          aria-hidden="true"
          className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left"
          style={{ scaleX: progress, background: '#9EE078' }}
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

export function Reveal({ children, className, style, delay = 0, x = 0, y = 24, amount = 0.16 }: RevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <m.div
      className={className}
      style={style}
      initial={reduceMotion ? false : { opacity: 0, x, y, filter: 'blur(8px)' }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.72, delay, ease: EASE }}
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
      initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98, filter: 'blur(5px)' }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.004 }}
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
