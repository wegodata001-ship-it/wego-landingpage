"use client";

import Image from "next/image";
import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";
import { motion } from "framer-motion";

type CaseItem = { key: string; img: string };

const ITEMS: CaseItem[] = [
  { key: "desigma", img: "/logoforbus/desigma.png" },
  { key: "bianco", img: "/logoforbus/bianco.png" },
  { key: "chickano", img: "/logoforbus/chickano.png" },
];

function Check() {
  return (
    <span className="lp-cs-card__check" aria-hidden>
      <svg viewBox="0 0 20 20" fill="none" width="15" height="15">
        <path d="M16 5L8 14l-4-4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.07 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function CaseStudies() {
  const { t } = useLandingI18n();

  return (
    <section id="case-studies" className="lp-section lp-cs">
      <div className="lp-container">
        <motion.header
          className="lp-cs__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="lp-cs__eyebrow">{t("caseStudies.eyebrow")}</p>
          <h2 className="lp-cs__title">{t("caseStudies.title")}</h2>
          <p className="lp-cs__subtitle">{t("caseStudies.subtitle")}</p>
        </motion.header>

        <div className="lp-cs__grid">
          {ITEMS.map((item, i) => (
            <motion.article
              key={item.key}
              className="lp-cs-card lp-u-card"
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              custom={i}
            >
              <div className="lp-cs-card__top">
                <span className="lp-cs-card__logo">
                  <Image
                    src={item.img}
                    alt={t(`caseStudies.items.${item.key}.name`)}
                    width={200}
                    height={88}
                    loading="lazy"
                    sizes="200px"
                  />
                </span>
                <span className="lp-cs-card__status">
                  <span className="lp-cs-card__status-dot" aria-hidden />
                  {t("caseStudies.active")}
                </span>
              </div>

              <span className="lp-cs-card__sector">{t(`caseStudies.items.${item.key}.sector`)}</span>

              <ul className="lp-cs-card__facts">
                <li>
                  <Check />
                  <span>
                    <strong>{t(`caseStudies.items.${item.key}.employees`)}</strong> {t("caseStudies.employeesLabel")}
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <strong>{t(`caseStudies.items.${item.key}.modules`)}</strong> {t("caseStudies.modulesLabel")}
                  </span>
                </li>
                <li className="lp-cs-card__result">
                  <Check />
                  <span>{t(`caseStudies.items.${item.key}.result`)}</span>
                </li>
              </ul>
            </motion.article>
          ))}
        </div>

        <p className="lp-cs__more">{t("caseStudies.moreLabel")}</p>
      </div>
    </section>
  );
}
