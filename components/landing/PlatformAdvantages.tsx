"use client";

import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";
import { ModalFeatureIcon, type ModalFeatureIconType } from "./icons";
import { motion } from "framer-motion";

const COUNT = 6;

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function PlatformAdvantages() {
  const { t } = useLandingI18n();

  return (
    <section id="advantages" className="lp-section lp-adv">
      <div className="lp-container">
        <motion.header
          className="lp-adv__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="lp-adv__eyebrow">{t("advantages.eyebrow")}</p>
          <h2 className="lp-adv__title">{t("advantages.title")}</h2>
          <p className="lp-adv__subtitle">{t("advantages.subtitle")}</p>
        </motion.header>

        <div className="lp-adv__grid">
          {Array.from({ length: COUNT }).map((_, i) => (
            <motion.article
              key={i}
              className="lp-adv-card lp-u-card"
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              custom={i}
            >
              <span className="lp-adv-card__icon" aria-hidden>
                <ModalFeatureIcon type={t(`advantages.items.${i}.icon`) as ModalFeatureIconType} />
              </span>
              <h3 className="lp-adv-card__title">{t(`advantages.items.${i}.title`)}</h3>
              <p className="lp-adv-card__desc">{t(`advantages.items.${i}.desc`)}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
