'use client'

import { Perforation } from '../components/doc/chrome'
import { MotionShell } from '../components/motion-primitives'
import { ChipPile } from '../components/sections/chip-pile'
import { Customers } from '../components/sections/customers'
import { Enrichment } from '../components/sections/enrichment'
import { FinalCta } from '../components/sections/final-cta'
import { SiteFooter } from '../components/sections/footer'
import { Hero } from '../components/sections/hero'
import { Integrations } from '../components/sections/integrations'
import { SiteNav } from '../components/sections/nav'
import { Ticker } from '../components/sections/ticker'
import { UseCaseLines } from '../components/sections/use-case-lines'
import { WorkbenchSection } from '../components/sections/workbench-section'

export default function LandingPage() {
  return (
    <MotionShell>
      <main className="min-h-screen" style={{ background: 'var(--paper)' }}>
        <SiteNav />
        <Hero />
        <Ticker />
        <Customers />
        <Perforation label="TEAR HERE" className="mx-auto max-w-[1200px] px-4 sm:px-6" />
        <WorkbenchSection />
        <Enrichment />
        <Perforation className="mx-auto max-w-[1200px] px-4 sm:px-6" />
        <UseCaseLines />
        <ChipPile />
        <Integrations />
        <FinalCta />
        <SiteFooter />
      </main>
    </MotionShell>
  )
}
