"use client";

import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";
import { motion } from "framer-motion";

type Integration = { name: string; soon?: boolean; icon: JSX.Element };

const sv = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const INTEGRATIONS: Integration[] = [
  { name: "WhatsApp", icon: <svg {...sv}><path d="M3 21l1.6-4A8.5 8.5 0 1 1 8 19.4L3 21z" /><path d="M8.5 9.5c0 3 2 5 5 5" /></svg> },
  { name: "Google", icon: <svg {...sv}><circle cx="12" cy="12" r="8" /><path d="M12 8v4h4a4 4 0 1 1-1.2-3" /></svg> },
  { name: "Supabase", icon: <svg {...sv}><path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z" /></svg> },
  { name: "CardCom", soon: true, icon: <svg {...sv}><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18" /></svg> },
  { name: "Email", icon: <svg {...sv}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M4 7l8 6 8-6" /></svg> },
  { name: "Excel", soon: true, icon: <svg {...sv}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 8l6 8M15 8l-6 8" /></svg> },
  { name: "PDF", icon: <svg {...sv}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M8 14h1.5M8 17h1.5M13 14h3M13 17h3" /></svg> },
  { name: "Cloud", soon: true, icon: <svg {...sv}><path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.5A3.5 3.5 0 0 1 18 18H7z" /></svg> },
];

export function Integrations() {
  const { t } = useLandingI18n();

  return (
    <section id="integrations" className="lp-section lp-int">
      <div className="lp-int__ambient" aria-hidden>
        <div className="lp-int__blob lp-pm__blob--a" />
      </div>
      <div className="lp-container lp-int__inner">
        <motion.header
          className="lp-int__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="lp-int__eyebrow">{t("integrations.eyebrow")}</p>
          <h2 className="lp-int__title">{t("integrations.title")}</h2>
          <p className="lp-int__subtitle">{t("integrations.subtitle")}</p>
        </motion.header>

        <div className="lp-int__grid">
          {INTEGRATIONS.map((it, i) => (
            <motion.div
              key={it.name}
              className="lp-int-chip lp-u-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.04 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="lp-int-chip__icon" aria-hidden>
                {it.icon}
              </span>
              <span className="lp-int-chip__name">{it.name}</span>
              {it.soon ? <span className="lp-int-chip__soon">{t("integrations.soon")}</span> : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
