"use client";

import Image from "next/image";
import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";
import { brands, type ClientBrand } from "@/components/landing/brands-data";

function BrandCard({ brand, index }: { brand: ClientBrand; index: number }) {
  const logo = (
    <span className="lp-partners__logo">
      <Image
        className="lp-partners__img"
        src={brand.image}
        alt={brand.name}
        width={320}
        height={140}
        sizes="(max-width: 768px) 220px, 300px"
      />
    </span>
  );

  if (brand.instagram) {
    return (
      <a
        key={`${brand.name}-${index}`}
        href={brand.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="lp-partners__card"
        aria-label={`${brand.name} — Instagram`}
      >
        {logo}
      </a>
    );
  }

  return (
    <div
      key={`${brand.name}-${index}`}
      className="lp-partners__card lp-partners__card--static"
      aria-label={brand.name}
    >
      {logo}
    </div>
  );
}

export function PartnersLogoStrip() {
  const { t } = useLandingI18n();
  const items = [...brands, ...brands, ...brands];

  return (
    <section className="lp-section lp-partners lp-clients" aria-labelledby="lp-clients-title">
      <div className="lp-partners__bg" aria-hidden />
      <div className="lp-partners__glow lp-partners__glow--gold" aria-hidden />

      <div className="lp-container lp-partners__inner">
        <p className="lp-partners__label">{t("partners.eyebrow")}</p>
        <h2 id="lp-clients-title" className="lp-partners__title">
          {t("partners.title")}
        </h2>
        <p className="lp-partners__subtitle">{t("partners.subtitle")}</p>

        <div className="lp-partners__marquee" aria-label={t("partners.marqueeLabel")}>
          <div className="lp-partners__fade lp-partners__fade--left" aria-hidden />
          <div className="lp-partners__fade lp-partners__fade--right" aria-hidden />

          <div className="lp-partners__track">
            {items.map((brand, i) => (
              <BrandCard key={`${brand.name}-${i}`} brand={brand} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
