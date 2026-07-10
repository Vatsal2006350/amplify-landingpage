'use client'

import { ConnectedWorkflow } from '../connected-workflow'
import { DocHeader } from '../doc/chrome'

export function Integrations() {
  return (
    <section id="integrations" className="scroll-mt-[80px]">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24">
        <DocHeader index="05 / ROUTING" meta={['PAGE 6 OF 7', 'VIA: YOUR STACK']} />
        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2
            className="type-h2 lg:col-span-7"
            style={{ fontSize: 'clamp(32px, 4vw, 50px)', color: 'var(--ink)' }}
          >
            Keep the stack. Make the work <em>smarter.</em>
          </h2>
          <p className="text-[15px] leading-[1.7] lg:col-span-5" style={{ color: 'var(--ink-muted)' }}>
            Amplify works with APIs, exports, marketplace templates, supplier files, product
            images, and approval history.
          </p>
        </div>
        <div className="mt-10">
          <ConnectedWorkflow />
        </div>
      </div>
    </section>
  )
}
