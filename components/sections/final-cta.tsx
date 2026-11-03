'use client'

import { Barcode, IndexTag, Perforation } from '../doc/chrome'
import { Stamp } from '../doc/stamp'
import { MaskedWords } from '../motion-primitives'
import { FOUNDER_CALL_URL } from '../../lib/growth-pricing'

export function FinalCta() {
  return (
    <section id="cta" className="scroll-mt-[80px] overflow-x-clip">
      <Perforation label="— DETACH AND RETAIN —" />
      <div style={{ background: 'var(--dk-bg)', color: 'var(--dk-text)' }}>
        <div className="mx-auto grid max-w-[1200px] gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <IndexTag tone="ink">07 / START WITH ONE PRODUCT</IndexTag>
            <div className="relative mt-7">
              <h2
                className="type-h2 max-w-[640px]"
                style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', color: 'var(--dk-text)' }}
              >
                <MaskedWords text="See what your products can become." em={['become.']} />
              </h2>
              <div className="pointer-events-none absolute right-4 -top-8 hidden sm:block lg:right-10 lg:-top-6">
                <Stamp label="APPROVED — HUMAN" animated scale={1.35} rotate={-8} />
              </div>
              <div className="mt-6 sm:hidden">
                <Stamp label="APPROVED — HUMAN" animated scale={0.8} rotate={-4} />
              </div>
            </div>
            <p className="mt-6 max-w-[480px] text-[16px] leading-[1.7]" style={{ color: 'var(--dk-muted)' }}>
              Bring one product. We’ll show you how Amplify can improve its images and listing, then discuss a growth pilot.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div
              className="rounded-doc p-6"
              style={{ border: '1px solid var(--dk-rule)', background: 'var(--dk-raised)' }}
            >
              <p className="type-mono-label" style={{ fontSize: 10, color: 'var(--dk-muted)' }}>
                YOUR FIRST STEP
              </p>
              <div className="mt-5">
                <a href={FOUNDER_CALL_URL} className="btn-press inline-flex items-center justify-center gap-4 rounded-doc px-5 py-4 text-[13px] font-semibold" style={{ background: 'var(--orange)', color: 'var(--paper)' }}>See Amplify with your product <span aria-hidden="true">↗</span></a>
              </div>
              <div
                className="type-mono-label mt-6 flex flex-wrap gap-x-4 gap-y-2 pt-4"
                style={{ fontSize: 9, color: 'var(--dk-muted)', borderTop: '1px dashed var(--dk-rule)' }}
              >
                <span>NO SETUP FEE</span>
                <span aria-hidden style={{ color: 'var(--orange)' }}>✱</span>
                <span>NO MONTHLY PLATFORM FEE</span>
                <span aria-hidden style={{ color: 'var(--orange)' }}>✱</span>
                <span>PAY WHEN SALES INCREASE</span>
              </div>
            </div>
            <div className="mt-8 flex items-end justify-between gap-6">
              <p
                className="type-mono-label"
                style={{ fontSize: 10, color: 'rgba(244,241,234,0.4)' }}
              >
                SIGNATURE: ____________________
                <br />
                <span style={{ display: 'inline-block', marginTop: 8 }}>DATE: 2026-07</span>
              </p>
              <Barcode seed="AMP-CTA-06" height={24} tone="ink" caption="*AMP-CTA-06*" />
            </div>
          </div>
        </div>
      </div>
      <Perforation />
    </section>
  )
}
