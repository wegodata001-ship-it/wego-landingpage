"use client";

import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";
import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, start = 0, durationMs = 1400) {
  const [v, setV] = useState(start);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / durationMs);
      const eased = 1 - (1 - p) ** 3;
      setV(Math.round(start + (target - start) * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, start, durationMs]);
  return v;
}

export function Hero() {
  const { landingConfig: config, t } = useLandingI18n();
  const clients = useCountUp(320, 0, 1200);
  const revenue = useCountUp(128, 0, 1350);
  const returning = useCountUp(84, 0, 1200);

  const phoneRows = [
    { title: t("hero.phoneRows.0.title"), sub: t("hero.phoneRows.0.sub") },
    { title: t("hero.phoneRows.1.title"), sub: t("hero.phoneRows.1.sub") },
    { title: t("hero.phoneRows.2.title"), sub: t("hero.phoneRows.2.sub") },
  ];

  return (
    <section className="lp-hero lp-section lp-hero--premium">
      <div className="lp-hero__bg" aria-hidden />
      <div className="lp-hero__orb" aria-hidden />

      <div className="lp-container lp-hero__inner">
        <div className="lp-hero__grid">
          <div className="lp-hero__copy lp-hero__reveal">
            <p className="lp-hero__eyebrow">{config.heroEyebrow}</p>
            <h1 className="lp-hero__title">{config.heroTitle}</h1>
            <p className="lp-hero__subtitle">{config.heroSubtitle}</p>

            <div className="lp-hero__stats">
              <div className="lp-hero-stat">
                <strong>+{clients}</strong>
                <span>{t("hero.stats.clients")}</span>
              </div>
              <div className="lp-hero-stat">
                <strong>{revenue}K</strong>
                <span>{t("hero.stats.revenue")}</span>
              </div>
              <div className="lp-hero-stat">
                <strong>{returning}%</strong>
                <span>{t("hero.stats.returning")}</span>
              </div>
              <div className="lp-hero-stat lp-hero-stat--trend">
                <strong>{t("hero.stats.growthStrong")}</strong>
                <span>{t("hero.stats.growthSub")}</span>
              </div>
            </div>

            <div className="lp-hero__ctas">
              <a href="#contact" className="lp-btn lp-btn--gold lp-btn--ripple lp-cta-pulse">
                {t("hero.ctaConsult")}
              </a>
              <a href="#reels" className="lp-btn lp-btn--ghost lp-btn--ripple">
                {t("hero.ctaInstagram")}
              </a>
            </div>
          </div>

          <div className="lp-hero__visual lp-hero__reveal lp-hero__reveal--delayed">
            <div className="lp-hero-phone-wrap">
              <div className="lp-hero-phone-glow" aria-hidden />
              <div className="lp-hero-phone">
                <div className="lp-hero-phone__top" />
                <div className="lp-hero-phone__screen">
                  <div className="lp-hero-phone__heading">
                    <span className="lp-hero-phone__dot" />
                    <strong>{t("hero.phoneHeading")}</strong>
                  </div>
                  <div className="lp-hero-phone__list">
                    {phoneRows.map((row, idx) => (
                      <div
                        key={`${row.title}-${idx}`}
                        className={`lp-hero-phone__item${idx === 1 ? " lp-hero-phone__item--active" : ""}`}
                      >
                        <span className="lp-hero-phone__item-icon">
                          {idx === 0 ? "👤" : idx === 1 ? "💬" : "📈"}
                        </span>
                        <div>
                          <p>{row.title}</p>
                          <small>{row.sub}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lp-social-icon lp-social-icon--ig" aria-hidden>
                📷
              </div>
              <div className="lp-social-icon lp-social-icon--wa" aria-hidden>
                💬
              </div>
              <div className="lp-social-icon lp-social-icon--fb" aria-hidden>
                f
              </div>
            </div>

            <div className="lp-hero-notify lp-hero-notify--1" aria-hidden>
              {t("hero.notify.0")}
            </div>
            <div className="lp-hero-notify lp-hero-notify--2" aria-hidden>
              {t("hero.notify.1")}
            </div>
            <div className="lp-hero-notify lp-hero-notify--3" aria-hidden>
              {t("hero.notify.2")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
