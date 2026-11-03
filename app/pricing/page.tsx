import type { Metadata } from 'next'
import { GrowthPricing } from '../../components/growth-pricing'
import { MotionShell } from '../../components/motion-primitives'
import { SiteFooter } from '../../components/sections/footer'
import { SiteNav } from '../../components/sections/nav'
export const metadata: Metadata = {
  title: 'Amplify pricing | Pay only when sales increase',
  description: 'No setup fee or monthly platform fee. Pay 5% of qualifying additional sales above an agreed baseline after deducting increases in ad spend.',
}
export default function PricingPage() { return <MotionShell><main><SiteNav homePrefix="/"/><GrowthPricing/><SiteFooter/></main></MotionShell> }
