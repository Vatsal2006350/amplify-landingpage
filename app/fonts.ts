import { Fraunces, Geist, JetBrains_Mono } from 'next/font/google'

export const display = Fraunces({
  subsets: ['latin'],
  axes: ['opsz', 'SOFT', 'WONK'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

export const sans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const mono = JetBrains_Mono({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-mono',
  display: 'swap',
})
