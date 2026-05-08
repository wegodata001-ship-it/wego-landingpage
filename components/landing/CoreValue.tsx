"use client";

import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";
import type { ServiceModalBody } from "@/lib/service-modal-types";
import { SERVICE_MODALS_AR } from "@/locales/service-modals-ar";
import { SERVICE_MODALS_HE } from "@/locales/service-modals-he";
import { useEffect, useMemo, useState } from "react";
import type { LandingServiceIcon } from "@/lib/landing-config";
import { ModalFeatureIcon, ServiceGridIcon } from "./icons";

const FALLBACK_ICONS: LandingServiceIcon[] = ["launch", "megaphone", "orbit", "partners", "ledger", "scale"];

export function CoreValue() {
  const { locale, landingConfig: config, t } = useLandingI18n();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = activeIndex !== null ? config.servicesItems[activeIndex] : null;

  const modalMap = locale === "ar" ? SERVICE_MODALS_AR : SERVICE_MODALS_HE;

  const modal = useMemo((): ServiceModalBody | null => {
    if (!activeItem || activeIndex === null) return null;
    const icon = activeItem.icon ?? FALLBACK_ICONS[activeIndex] ?? "orbit";
    const fromMap = modalMap[icon];
    if (fromMap) return fromMap;
    return {
      title: activeItem.title,
      subtitle: activeItem.body,
      description: activeItem.body,
      featureCards: [],
      ctaTitle: locale === "ar" ? "التزام بالنتائج" : "התחייבות לתוצאות",
      ctaText:
        locale === "ar"
          ? "نُحسّن عملك ونعيد لك الاستثمار 3× على الأقل"
          : "אנו מתחייבים לייעל את העסק שלך ולהחזיר לך את ההשקעה פי 3 לפחות",
      ctaButton: locale === "ar" ? "تواصل معنا الآن" : "שלח הודעה להתייעצות עכשיו",
    };
  }, [activeItem, activeIndex, modalMap, locale]);

  useEffect(() => {
    if (activeIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [activeIndex]);

  const gridIcon = (i: number): LandingServiceIcon => config.servicesItems[i]?.icon ?? FALLBACK_ICONS[i] ?? "orbit";

  return (
    <>
      <section id="core-value" className="lp-section lp-glow-marketing lp-services-section">
        <div className="lp-container" style={{ position: "relative", zIndex: 1 }}>
          <header className="lp-services-heading">
            <h2 className="lp-gradient-text lp-services-heading__title">{config.servicesTitle}</h2>
            <p className="lp-muted lp-services-heading__subtitle">{config.servicesSubtitle}</p>
          </header>

          <div className="lp-services-grid">
            {config.servicesItems.map((item, i) => {
              const icon = item.icon ?? FALLBACK_ICONS[i] ?? "orbit";
              const highlight = i === 2;
              return (
                <article
                  key={`${item.title}-${i}`}
                  className={`lp-service-card${highlight ? " lp-service-card--highlight" : ""}`}
                  style={{ animationDelay: `${0.07 * i}s` }}
                  onClick={() => setActiveIndex(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setActiveIndex(i);
                  }}
                >
                  <div className="lp-service-card__icon" aria-hidden>
                    <ServiceGridIcon type={icon} />
                  </div>
                  <h3 className="lp-service-card__title">{item.title}</h3>
                  <p className="lp-service-card__body">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {activeItem && modal ? (
        <div className="lp-modal-backdrop" role="dialog" aria-modal="true" aria-label={activeItem.title}>
          <div
            className={`lp-modal${
              gridIcon(activeIndex!) === "ledger"
                ? " lp-modal--accounting"
                : gridIcon(activeIndex!) === "partners"
                  ? " lp-modal--partnership"
                  : ""
            }`}
          >
            <button
              className="lp-modal__close"
              type="button"
              aria-label={t("core.closeModal")}
              onClick={() => setActiveIndex(null)}
            >
              ×
            </button>

            <div className="lp-modal__layout">
              <div className="lp-modal__main">
                <h3 className="lp-modal__title">
                  {modal.highlightWord && modal.title.includes(modal.highlightWord) ? (
                    <>
                      {modal.title.split(modal.highlightWord)[0]}
                      <span className="lp-modal__gold-word">{modal.highlightWord}</span>
                      {modal.title.split(modal.highlightWord).slice(1).join(modal.highlightWord)}
                    </>
                  ) : (
                    modal.title
                  )}
                </h3>
                {modal.titleSecondLine ? <p className="lp-modal__title-second">{modal.titleSecondLine}</p> : null}
                <p className="lp-modal__subtitle">{modal.subtitle}</p>
                <p className="lp-modal__description">
                  {modal.description.split("\n").map((line, idx) => (
                    <span key={`desc-${idx}`}>
                      {line}
                      {idx < modal.description.split("\n").length - 1 ? <br /> : null}
                    </span>
                  ))}
                </p>

                <div className="lp-modal__cta-box">
                  <h4>{modal.ctaTitle}</h4>
                  {modal.ctaText.split("\n").map((line, idx) => (
                    <p key={`cta-${idx}`}>{line}</p>
                  ))}
                </div>

                <button type="button" className="lp-btn lp-btn--gold lp-btn--ripple lp-modal__cta-btn">
                  {modal.ctaBrandEmbed && modal.ctaButton.includes(modal.ctaBrandEmbed) ? (
                    <>
                      {modal.ctaButton.split(modal.ctaBrandEmbed)[0]}
                      <span className="lp-modal__gold-word">{modal.ctaBrandEmbed}</span>
                      {modal.ctaButton.split(modal.ctaBrandEmbed).slice(1).join(modal.ctaBrandEmbed)}
                    </>
                  ) : (
                    modal.ctaButton
                  )}
                </button>
              </div>

              <ul className="lp-modal__feature-stack">
                {gridIcon(activeIndex!) === "partners" ? (
                  <li className="lp-modal__feature-kicker" aria-hidden>
                    {t("core.partnersKicker")}
                  </li>
                ) : null}
                {modal.featureCards.map((f, i) => (
                  <li key={`card-${i}`} className="lp-modal__feature-side-card">
                    <span className="lp-modal__feature-side-copy">
                      <strong>{f.title}</strong>
                      <small>{f.desc}</small>
                    </span>
                    <span className="lp-modal__feature-side-icon" aria-hidden>
                      <ModalFeatureIcon type={f.icon} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
