"use client";

import { motion } from "framer-motion";
import type { AppLocale } from "@/lib/i18n/types";
import { useLandingI18n } from "./LandingI18nProvider";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLandingI18n();

  const options: { id: AppLocale; label: string }[] = [
    { id: "he", label: t("lang.he") },
    { id: "ar", label: t("lang.ar") },
  ];

  return (
    <div
      className="lp-lang"
      role="group"
      aria-label={t("lang.switchLabel")}
    >
      <div className="lp-lang__glass">
        {options.map((opt) => {
          const active = locale === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              className={`lp-lang__btn${active ? " is-active" : ""}`}
              onClick={() => setLocale(opt.id)}
              aria-pressed={active}
              lang={opt.id === "ar" ? "ar" : "he"}
            >
              {active ? (
                <motion.span
                  className="lp-lang__pill"
                  layoutId="lp-lang-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              ) : null}
              <span className="lp-lang__label">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
