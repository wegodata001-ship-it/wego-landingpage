"use client";

import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";
import { getStringArray } from "@/lib/i18n/nested";
import arMessages from "@/messages/ar.json";
import heMessages from "@/messages/he.json";
import type { LandingServiceIcon } from "@/lib/landing-config";
import { ModalFeatureIcon, ServiceGridIcon } from "./icons";
import { SystemScreen, type SystemScreenType } from "./SystemMockups";
import { SERVICE_MODALS_AR } from "@/locales/service-modals-ar";
import { SERVICE_MODALS_HE } from "@/locales/service-modals-he";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type ModuleDef = {
  key: string;
  icon: LandingServiceIcon;
  screen: SystemScreenType;
};

const MODULES: ModuleDef[] = [
  { key: "finance", icon: "finance", screen: "finance" },
  { key: "employees", icon: "team", screen: "employees" },
  { key: "diary", icon: "diary", screen: "diary" },
  { key: "tasks", icon: "tasks", screen: "tasks" },
  { key: "crm", icon: "crm", screen: "crm" },
  { key: "inventory", icon: "inventory", screen: "inventory" },
  { key: "ai", icon: "ai", screen: "ai" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function PlatformModules() {
  const { t, locale } = useLandingI18n();
  const msgRoot = (locale === "ar" ? arMessages : heMessages) as Record<string, unknown>;
  const [active, setActive] = useState<LandingServiceIcon | null>(null);

  const modalMap = locale === "ar" ? SERVICE_MODALS_AR : SERVICE_MODALS_HE;
  const modal = active ? modalMap[active] : null;

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <section id="platform" className="lp-section lp-pm lp-glow-marketing">
      <div className="lp-pm__ambient" aria-hidden>
        <div className="lp-pm__blob lp-pm__blob--a" />
        <div className="lp-pm__blob lp-pm__blob--b" />
      </div>

      <div className="lp-container lp-pm__inner">
        <motion.header
          className="lp-pm__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="lp-pm__eyebrow">{t("platform.eyebrow")}</p>
          <h2 className="lp-pm__title">{t("platform.title")}</h2>
          <p className="lp-pm__subtitle">{t("platform.subtitle")}</p>
        </motion.header>

        <div className="lp-pm__grid">
          {MODULES.map((m, i) => {
            const caps = getStringArray(msgRoot, `platform.modules.${m.key}.caps`);
            return (
              <motion.article
                key={m.key}
                className="lp-pm-card lp-u-card"
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                custom={i}
              >
                <div className="lp-pm-card__screen">
                  <SystemScreen type={m.screen} title={t(`platform.modules.${m.key}.screen`)} />
                </div>
                <div className="lp-pm-card__head">
                  <span className="lp-pm-card__icon" aria-hidden>
                    <ServiceGridIcon type={m.icon} />
                  </span>
                  <h3 className="lp-pm-card__name">{t(`platform.modules.${m.key}.name`)}</h3>
                </div>
                <ul className="lp-pm-card__caps">
                  {caps.slice(0, 4).map((c, ci) => (
                    <li key={ci}>
                      <span className="lp-pm-card__cap-check" aria-hidden>
                        <svg viewBox="0 0 20 20" fill="none" width="14" height="14">
                          <path d="M16 5L8 14l-4-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="lp-pm-card__cta lp-btn lp-btn--ghost lp-btn--ripple"
                  onClick={() => setActive(m.icon)}
                >
                  {t("platform.learnMore")}
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {modal ? (
          <motion.div
            className="lp-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label={modal.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setActive(null);
            }}
          >
            <motion.div
              className="lp-modal"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                className="lp-modal__close"
                type="button"
                aria-label={t("core.closeModal")}
                onClick={() => setActive(null)}
              >
                ×
              </button>

              <div className="lp-modal__layout">
                <div className="lp-modal__main">
                  <h3 className="lp-modal__title">{modal.title}</h3>
                  <p className="lp-modal__subtitle">{modal.subtitle}</p>
                  <p className="lp-modal__description">{modal.description}</p>

                  <div className="lp-modal__cta-box">
                    <h4>{modal.ctaTitle}</h4>
                    <p>{modal.ctaText}</p>
                  </div>

                  <a href="#contact" className="lp-btn lp-btn--gold lp-btn--ripple lp-modal__cta-btn" onClick={() => setActive(null)}>
                    {modal.ctaButton}
                  </a>
                </div>

                <ul className="lp-modal__feature-stack">
                  {modal.featureCards.map((f, i) => (
                    <li key={i} className="lp-modal__feature-side-card">
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
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
