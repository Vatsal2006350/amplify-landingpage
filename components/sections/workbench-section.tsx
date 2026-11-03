'use client'

import { DocHeader } from '../doc/chrome'
import { ProductStage } from '../motion-primitives'
import { ProductFlowWorkbench } from './workbench'

export function WorkbenchSection() {
  return (
    <section id="product-flow" className="scroll-mt-[80px]">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24">
        <DocHeader index="02 / THE WORKBENCH" meta={['PAGE 3 OF 6', 'CLICK ANY VIEW']} />
        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2
            className="type-h2 lg:col-span-7"
            style={{ fontSize: 'clamp(32px, 4.2vw, 52px)', color: 'var(--ink)' }}
          >
            Know what to improve, promote or <em>restock.</em>
          </h2>
          <p className="text-[15px] leading-[1.7] lg:col-span-5" style={{ color: 'var(--ink-muted)' }}>
            Explore listings, sales and inventory together. Review the next action before it goes live.
          </p>
        </div>
        <ProductStage className="mt-10">
          <ProductFlowWorkbench />
        </ProductStage>
      </div>
    </section>
  )
}
