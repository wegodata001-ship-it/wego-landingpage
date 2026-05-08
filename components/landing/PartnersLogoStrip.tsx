"use client";

import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";
import Image from "next/image";

const logos = [
  { src: "/logoforbus/logo1.png", alt: "Partner logo 1" },
  { src: "/logoforbus/logo2.png", alt: "Partner logo 2" },
  { src: "/logoforbus/logo3.png", alt: "Partner logo 3" },
  { src: "/logoforbus/logo4.png", alt: "Partner logo 4" },
  { src: "/logoforbus/logo5.png", alt: "Partner logo 5" },
  { src: "/logoforbus/logo6.png", alt: "Partner logo 6" },
  { src: "/logoforbus/logo7.png", alt: "Partner logo 7" },
];

export function PartnersLogoStrip() {
  const { t } = useLandingI18n();
  const items = [...logos, ...logos, ...logos];

  return (
    <section className="lp-section lp-partners">
      <div className="lp-partners__bg" aria-hidden />

      <div className="lp-container lp-partners__inner">
        <p className="lp-partners__label">{t("partners.eyebrow")}</p>
        <h2 className="lp-partners__title">{t("partners.title")}</h2>
        <p className="lp-partners__subtitle">
          {t("partners.subtitle")
            .split("\n")
            .map((line, i, arr) => (
              <span key={`${i}-${line.slice(0, 24)}`}>
                {line}
                {i < arr.length - 1 ? <br /> : null}
              </span>
            ))}
        </p>

        <div className="lp-partners__marquee" aria-label={t("partners.marqueeLabel")}>
          <div className="lp-partners__fade lp-partners__fade--left" aria-hidden />
          <div className="lp-partners__fade lp-partners__fade--right" aria-hidden />

          <div className="lp-partners__track" aria-hidden>
            {items.map((l, i) => (
              <div key={`${l.src}-${i}`} className="lp-partners__card">
                <div className="lp-partners__logo">
                  <Image
                    src={l.src}
                    alt={l.alt}
                    width={210}
                    height={90}
                    sizes="(max-width: 768px) 120px, 180px"
                    style={{ width: "auto", height: "var(--lp-partners-logo-h)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lp-partners__stats" aria-label={t("partners.statsLabel")}>
          <div className="lp-partners__stat">
            <strong>120+</strong>
            <span>{t("partners.statProjects")}</span>
          </div>
          <div className="lp-partners__stat">
            <strong>40+</strong>
            <span>{t("partners.statBusinesses")}</span>
          </div>
          <div className="lp-partners__stat">
            <strong>95%</strong>
            <span>{t("partners.statSatisfaction")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
