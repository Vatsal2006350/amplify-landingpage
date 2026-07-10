'use client'

import { Barcode, IndexTag, Perforation } from '../doc/chrome'
import { Stamp } from '../doc/stamp'
import { MaskedWords } from '../motion-primitives'
import { WaitlistForm } from '../waitlist-form'

export function FinalCta() {
  return (
    <section id="cta" className="scroll-mt-[80px]">
      <Perforation label="— DETACH AND RETAIN —" />
      <div style={{ background: 'var(--dk-bg)', color: 'var(--dk-text)' }}>
        <div className="mx-auto grid max-w-[1200px] gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <IndexTag tone="ink">06 / APPROVAL — EARLY ACCESS</IndexTag>
            <div className="relative mt-7">
              <h2
                className="type-h2 max-w-[640px]"
                style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', color: 'var(--dk-text)' }}
              >
                <MaskedWords text="Bring us your messiest workflow." em={['messiest']} />
              </h2>
              <div className="pointer-events-none absolute -right-2 -top-10 sm:right-10 sm:-top-6">
                <Stamp label="APPROVED — HUMAN" animated scale={1.35} rotate={-8} />
              </div>
            </div>
            <p className="mt-6 max-w-[480px] text-[16px] leading-[1.7]" style={{ color: 'var(--dk-muted)' }}>
              We will turn it into a repeatable, approval-ready process.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div
              className="rounded-doc p-6"
              style={{ border: '1px solid var(--dk-rule)', background: 'var(--dk-raised)' }}
            >
              <p className="type-mono-label" style={{ fontSize: 10, color: 'var(--dk-muted)' }}>
                FORM AMP-06 — REQUEST FOR ACCESS
              </p>
              <div className="mt-5">
                <WaitlistForm tone="ink" />
              </div>
              <div
                className="type-mono-label mt-6 flex flex-wrap gap-x-4 gap-y-2 pt-4"
                style={{ fontSize: 9, color: 'var(--dk-muted)', borderTop: '1px dashed var(--dk-rule)' }}
              >
                <span>NO CREDIT CARD</span>
                <span aria-hidden style={{ color: 'var(--orange)' }}>✱</span>
                <span>SETUP HELP INCLUDED</span>
                <span aria-hidden style={{ color: 'var(--orange)' }}>✱</span>
                <span>BUILT AROUND YOUR CURRENT STACK</span>
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
