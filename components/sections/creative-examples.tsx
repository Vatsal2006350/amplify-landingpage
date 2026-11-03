export function CreativeExamples() {
  return (
    <section id="images-ads" className="scroll-mt-[80px]">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24">
        <p className="eyebrow">Product Studio & AI Ads</p>
        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="type-h2 text-[34px] sm:text-[50px] lg:col-span-7">
            One product photo.
            <br />
            <em>More ways to sell it.</em>
          </h2>
          <p className="text-[15px] leading-[1.7] text-[var(--ink-muted)] lg:col-span-5">
            Create product images and campaign variations from photos you
            already have. Review your assets, then prepare them for your
            connected channels.
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {[
            {
              image: "/images/products/source-shoe-boot.jpg",
              label: "Your original product photo",
            },
            {
              image: "/images/products/customer-shoe-boot.jpg",
              label: "Prepared product image",
            },
            {
              image: "/images/ads/boot-cafe.jpg",
              label: "Campaign creative variation",
            },
          ].map((item) => (
            <figure
              key={item.label}
              className="min-w-0 overflow-hidden rounded-doc border border-[var(--ledger-strong)] bg-[var(--paper-raised)]"
            >
              <img
                src={item.image}
                alt={item.label}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
              <figcaption className="type-mono-label border-t border-[var(--ledger)] px-4 py-3 text-[10px]">
                {item.label}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 text-[12px] leading-relaxed text-[var(--ink-muted)]">
          Illustrative creative examples, not measured sales results. Publishing
          is available for supported, connected Meta and Google Ads accounts.
          Meta ads are created paused; your team controls activation and budget.
        </p>
      </div>
    </section>
  );
}
