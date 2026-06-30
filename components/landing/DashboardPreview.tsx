"use client";

import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";
import { SystemScreen } from "./SystemMockups";
import { motion } from "framer-motion";

type Hotspot = { key: string; top: string; left: string };

const HOTSPOTS: Hotspot[] = [
  { key: "finance", top: "26%", left: "24%" },
  { key: "tasks", top: "30%", left: "72%" },
  { key: "ai", top: "52%", left: "50%" },
  { key: "employees", top: "74%", left: "28%" },
  { key: "crm", top: "72%", left: "76%" },
];

export function DashboardPreview() {
  const { t } = useLandingI18n();

  return (
    <section id="dashboard-preview" className="lp-section lp-dashprev lp-glow-marketing">
      <div className="lp-container">
        <motion.header
          className="lp-dashprev__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="lp-dashprev__eyebrow">{t("dashboardPreview.eyebrow")}</p>
          <h2 className="lp-dashprev__title">{t("dashboardPreview.title")}</h2>
          <p className="lp-dashprev__subtitle">{t("dashboardPreview.subtitle")}</p>
        </motion.header>

        <motion.div
          className="lp-dashprev__stage"
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="lp-dashprev__glow" aria-hidden />
          <div className="lp-dashprev__screen">
            <SystemScreen type="dashboard" title={t("dashboardPreview.screenTitle")} />
          </div>

          {HOTSPOTS.map((h) => (
            <button
              key={h.key}
              type="button"
              className="lp-dashprev__hotspot"
              style={{ top: h.top, left: h.left }}
              aria-label={t(`dashboardPreview.hotspots.${h.key}.title`)}
            >
              <span className="lp-dashprev__hot-dot" aria-hidden>
                <span className="lp-dashprev__hot-ring" />
              </span>
              <span className="lp-dashprev__tooltip" role="tooltip">
                <strong>{t(`dashboardPreview.hotspots.${h.key}.title`)}</strong>
                <small>{t(`dashboardPreview.hotspots.${h.key}.desc`)}</small>
              </span>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
