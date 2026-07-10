'use client'

import type { ReactNode } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { DocHeader } from '../doc/chrome'

function TippedPhoto({
  src,
  caption,
  dark = false,
}: {
  src: string
  caption: string
  dark?: boolean
}) {
  const reduced = useReducedMotion()
  return (
    <figure className="relative">
      <m.div
        className="relative overflow-hidden"
        initial={reduced ? false : { clipPath: 'inset(0 100% 0 0)' }}
        whileInView={reduced ? undefined : { clipPath: 'inset(0 0% 0 0)' }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={src}
          alt=""
          loading="lazy"
          className="aspect-[16/9] w-full object-cover"
          style={dark ? { filter: 'grayscale(0.35) contrast(1.02) brightness(0.9)' } : undefined}
        />
      </m.div>
      {/* photo corners */}
      {[
        'left-[-3px] top-[-3px] border-r-0 border-b-0',
        'right-[-3px] top-[-3px] border-l-0 border-b-0',
        'left-[-3px] bottom-[-3px] border-r-0 border-t-0',
        'right-[-3px] bottom-[-3px] border-l-0 border-t-0',
      ].map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={`absolute h-4 w-4 border-2 ${pos}`}
          style={{ borderColor: dark ? 'var(--dk-text)' : 'var(--ink)' }}
        />
      ))}
      <figcaption
        className="type-mono-label mt-2.5"
        style={{ fontSize: 9, color: dark ? 'var(--dk-muted)' : 'var(--ink-faint)' }}
      >
        {caption}
      </figcaption>
    </figure>
  )
}

function RecordCard({
  index,
  consignee,
  eyebrow,
  title,
  body,
  tags,
  photo,
  photoCaption,
  logos,
  mark,
  dark = false,
  className = '',
  style,
}: {
  index: string
  consignee: string
  eyebrow: string
  title: string
  body: string
  tags: string[]
  photo: string
  photoCaption: string
  logos?: { src: string; alt: string }[]
  mark?: ReactNode
  dark?: boolean
  className?: string
  style?: React.CSSProperties
}) {
  const text = dark ? 'var(--dk-text)' : 'var(--ink)'
  const muted = dark ? 'var(--dk-muted)' : 'var(--ink-muted)'
  const rule = dark ? 'var(--dk-rule)' : 'var(--ledger)'

  return (
    <m.article
      className={`rounded-doc ${className}`}
      style={{
        background: dark ? 'var(--dk-bg)' : 'var(--paper-raised)',
        border: `1px solid ${dark ? 'var(--ink)' : 'var(--ledger-strong)'}`,
        ...style,
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="flex items-baseline justify-between gap-3 px-5 py-3"
        style={{ borderBottom: `1px solid ${rule}` }}
      >
        <span className="type-mono-label" style={{ fontSize: 10, color: muted }}>
          CONSIGNEE NO. {index}
        </span>
        <span className="type-mono-label" style={{ fontSize: 10, color: text, fontWeight: 700 }}>
          {consignee}
        </span>
      </div>
      <div className="p-5">
        <TippedPhoto src={photo} caption={photoCaption} dark={dark} />
        {(logos || mark) && (
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            {logos?.map((logo) => (
              <span
                key={logo.alt}
                className="rounded-doc px-2.5 py-1.5"
                style={{ background: '#fff', border: '1px solid var(--ledger)' }}
              >
                <img src={logo.src} alt={logo.alt} className="h-6 w-auto object-contain" />
              </span>
            ))}
            {mark}
          </div>
        )}
        <p className="type-mono-label mt-5" style={{ fontSize: 10, color: 'var(--orange)', fontWeight: 700 }}>
          {eyebrow}
        </p>
        <h3 className="font-display mt-2 text-[24px] leading-[1.12]" style={{ color: text, fontWeight: 530 }}>
          {title}
        </h3>
        <p className="mt-3 text-[13.5px] leading-[1.65]" style={{ color: muted }}>
          {body}
        </p>
        <div
          className="mt-5 flex flex-wrap gap-x-4 gap-y-1 pt-3"
          style={{ borderTop: `1px dashed ${rule}` }}
        >
          {tags.map((tag) => (
            <span key={tag} className="type-mono-label" style={{ fontSize: 10, color: muted }}>
              [ {tag.toUpperCase()} ]
            </span>
          ))}
        </div>
      </div>
    </m.article>
  )
}

export function Customers() {
  return (
    <section id="customers" className="scroll-mt-[80px]">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20">
        <DocHeader index="01 / CONSIGNEES" meta={['PAGE 2 OF 7', 'REV. 2026-07']} />
        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2
            className="type-h2 lg:col-span-8"
            style={{ fontSize: 'clamp(34px, 4.5vw, 56px)', color: 'var(--ink)' }}
          >
            Proof from teams moving <em>real</em> inventory.
          </h2>
          <div className="lg:col-span-4">
            <p className="type-mono-label" style={{ fontSize: 10, color: 'var(--ink-faint)' }}>
              SCOPE:
            </p>
            <p className="mt-1 text-[14px] leading-[1.7]" style={{ color: 'var(--ink-muted)' }}>
              Three operator stories across catalog, inventory, ads, training, and marketplace
              outputs.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <RecordCard
            index="001"
            consignee="GEOOMNII / BEIRA RIO"
            eyebrow="PORTFOLIO OPERATIONS"
            title="Catalog, stock, and marketplace files for Beira Rio teams."
            body="Item masters, stock slices, product images, and templates become approved outputs."
            tags={['Catalog ops', 'Stock sync', 'Marketplace feeds']}
            photo="/images/products/customer-shoe-boot.jpg"
            photoCaption="FIG. 1 — FOOTWEAR, ASSORTED"
            logos={[
              { src: '/logos/geoomnii.png', alt: 'Geoomnii' },
              { src: '/logos/beira-rio.png', alt: 'Beira Rio' },
            ]}
          />
          <RecordCard
            index="002"
            consignee="PMUK"
            eyebrow="GUSTO FOOD ECOMMERCE OPS"
            title="Inventory, bundle SKUs, and AI ad actions in one queue."
            body="Stock decisions, bundle SKUs, and ad recommendations stay ready for manager approval."
            tags={['Inventory', 'Bundle SKUs', 'AI ads']}
            photo="/images/customers/pmuk-gusto-hot-sauce.png"
            photoCaption="FIG. 2 — CONSUMABLES, BOTTLED"
            mark={
              <span
                className="font-display rounded-doc px-2.5 py-1 text-[16px]"
                style={{
                  background: 'var(--paper)',
                  border: '1px solid var(--ledger-strong)',
                  color: 'var(--ink)',
                  fontWeight: 600,
                }}
              >
                PMUK
              </span>
            }
            className="md:translate-y-8 lg:rotate-[-0.6deg]"
          />
          <RecordCard
            index="003"
            consignee="SHOEMART"
            eyebrow="RETAIL TRAINING ENABLEMENT"
            title="Product training for Shoe Mart store teams."
            body="Launch notes and selling guidance become repeatable tutorials for sales associates."
            tags={['Training videos', 'Store teams', 'Launch readiness']}
            photo="/images/customers/shoemart-interior.png"
            photoCaption="FIG. 3 — RETAIL FLOOR, DUBAI"
            mark={
              <span
                className="font-display rounded-doc px-3 py-1 text-[16px] tracking-[0.18em]"
                style={{
                  background: 'var(--dk-raised)',
                  border: '1px solid var(--dk-rule)',
                  color: 'var(--dk-text)',
                  fontWeight: 600,
                }}
              >
                SHOEMART
              </span>
            }
            dark
            className="md:translate-y-4 lg:translate-y-16"
          />
        </div>
      </div>
    </section>
  )
}
