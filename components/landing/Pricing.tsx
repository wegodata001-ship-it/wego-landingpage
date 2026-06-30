"use client";

import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";
import { getStringArray } from "@/lib/i18n/nested";
import arMessages from "@/messages/ar.json";
import heMessages from "@/messages/he.json";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { systemCards } from "@/components/landing/systems-data";
import { SystemCardIcon } from "@/components/landing/SystemCardIcon";
import { SystemScreen } from "@/components/landing/SystemMockups";
import { buildWhatsAppLink } from "@/lib/whatsapp";

function WhatsAppIcon() {
  return (
    <svg className="lp-systems-card__wa-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function FeatureCheck() {
  return (
    <span className="lp-systems-card__check" aria-hidden>
      <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
        <path
          d="M16 5L8 14l-4-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 + i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Pricing() {
  const { t, locale } = useLandingI18n();
  const msgRoot = (locale === "ar" ? arMessages : heMessages) as Record<string, unknown>;

  const trustItems = useMemo(() => getStringArray(msgRoot, "systems.trust"), [msgRoot]);

  return (
    <section id="systems" className="lp-section lp-systems">
      <div className="lp-systems__ambient" aria-hidden>
        <div className="lp-systems__blob lp-systems__blob--gold" />
        <div className="lp-systems__blob lp-systems__blob--soft" />
        <div className="lp-systems__grid-lines" />
      </div>

      <div className="lp-container lp-systems__inner">
        <motion.header
          className="lp-systems__header"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="lp-systems__eyebrow">{t("systems.eyebrow")}</p>
          <h2 className="lp-systems__title">{t("systems.title")}</h2>
          <p className="lp-systems__subtitle">{t("systems.subtitle")}</p>
          <div className="lp-systems__divider" aria-hidden />
        </motion.header>

        <div className="lp-systems__grid">
          {systemCards.map((card, cardIndex) => {
            const features = getStringArray(msgRoot, `systems.cards.${card.id}.features`);
            const featured = Boolean(card.featured);

            return (
              <motion.article
                key={card.id}
                className={`lp-systems-card${featured ? " lp-systems-card--featured" : ""}`}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                custom={cardIndex}
              >
                {featured ? (
                  <div className="lp-systems-card__badge">{t("systems.badgeFeatured")}</div>
                ) : null}
                <div className="lp-systems-card__shine" aria-hidden />
                <div className="lp-systems-card__screen">
                  <SystemScreen type={card.screen} title={t(`systems.cards.${card.id}.title`)} />
                </div>
                <div className="lp-systems-card__icon-wrap">
                  <div className="lp-systems-card__icon-glow" aria-hidden />
                  <SystemCardIcon type={card.icon} />
                </div>
                <h3 className="lp-systems-card__name">{t(`systems.cards.${card.id}.title`)}</h3>
                <p className="lp-systems-card__desc">{t(`systems.cards.${card.id}.description`)}</p>
                <ul className="lp-systems-card__features">
                  {features.map((f, i) => (
                    <li key={`${card.id}-f-${i}`} className="lp-systems-card__feat">
                      <FeatureCheck />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={buildWhatsAppLink(t(`systems.cards.${card.id}.whatsappMessage`))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`lp-systems-card__cta lp-systems-card__cta--wa lp-btn lp-btn--ripple${
                    featured ? " lp-btn--gold" : " lp-btn--ghost"
                  }`}
                >
                  <WhatsAppIcon />
                  <span>{featured ? t("systems.ctaStart") : t("systems.ctaContact")}</span>
                </a>
                <a href="#platform" className="lp-systems-card__learn">
                  {t("systems.learnMore")}
                </a>
              </motion.article>
            );
          })}
        </div>

        {trustItems.length > 0 ? (
          <motion.div
            className="lp-systems__trust"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            {trustItems.map((label) => (
              <span key={label} className="lp-systems__trust-pill">
                <span className="lp-systems__trust-dot" aria-hidden />
                {label}
              </span>
            ))}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
