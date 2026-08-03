'use client'

import { Perforation } from '../components/doc/chrome'
import { MotionShell } from '../components/motion-primitives'
import { Customers } from '../components/sections/customers'
import { Enrichment } from '../components/sections/enrichment'
import { FinalCta } from '../components/sections/final-cta'
import { SiteFooter } from '../components/sections/footer'
import { Hero } from '../components/sections/hero'
import { InceptionMembership } from '../components/sections/inception'
import { Integrations } from '../components/sections/integrations'
import { SiteNav } from '../components/sections/nav'
import { UseCaseLines } from '../components/sections/use-case-lines'
import { WorkbenchSection } from '../components/sections/workbench-section'

export default function LandingPage() {
  return (
    <MotionShell>
      <main className="min-h-screen" style={{ background: 'var(--paper)' }}>
        <SiteNav />
        <InceptionMembership />
        <Hero />
        <Perforation label="TEAR HERE" className="mx-auto max-w-[1200px] px-4 sm:px-6" />
        <Customers />
        <WorkbenchSection />
        <Enrichment />
        <Perforation className="mx-auto max-w-[1200px] px-4 sm:px-6" />
        <Integrations />
        <UseCaseLines />
        <FinalCta />
        <SiteFooter />
      </main>
    </MotionShell>
  )
}
