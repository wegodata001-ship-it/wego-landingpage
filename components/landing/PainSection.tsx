"use client";

import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";
import { motion } from "framer-motion";
import { ModalFeatureIcon } from "./icons";

const CARD_ICONS = ["users", "wallet", "handshake", "layers"] as const;

export function PainSection() {
  const { t } = useLandingI18n();

  return (
    <section id="pain" className="lp-section lp-pain-premium lp-pain-premium--compact">
      <div className="lp-pain-bg" aria-hidden />

      <div className="lp-container lp-pain-grid">
        <motion.div
          className="lp-pain-left"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="lp-pain-title">
            {t("pain.titleBefore")}{" "}
            <span className="lp-pain-title__gold">{t("pain.titleHighlight")}</span>
          </h2>
          <p className="lp-pain-copy">
            {t("pain.introLine1")}
            <br />
            {t("pain.introLine2")}
          </p>

          <div className="lp-pain-divider" aria-hidden>
            <motion.span
              className="lp-pain-divider__line"
              initial={{ scaleX: 0, opacity: 0.7 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>

        <motion.div
          className="lp-pain-right"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          {CARD_ICONS.map((icon, i) => (
            <motion.article
              key={`pain-${i}`}
              className="lp-pain-card"
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="lp-pain-card__icon" aria-hidden>
                <ModalFeatureIcon type={icon} />
              </div>
              <div className="lp-pain-card__body">
                <h3 className="lp-pain-card__title">{t(`pain.cards.${i}.title`)}</h3>
                <p className="lp-pain-card__desc">{t(`pain.cards.${i}.desc`)}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <div className="lp-container lp-pain-bottom">
        <p className="lp-pain-bottom__text">
          {t("pain.bottomLine1")}{" "}
          <span className="lp-pain-bottom__gold">{t("pain.bottomGold")}</span>
          {t("pain.bottomLine2")}
        </p>
        <div className="lp-pain-arrow" aria-hidden>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
}
