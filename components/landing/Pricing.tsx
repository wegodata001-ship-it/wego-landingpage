"use client";

import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";
import { getStringArray } from "@/lib/i18n/nested";
import type { LandingConfig } from "@/lib/landing-config";
import arMessages from "@/messages/ar.json";
import heMessages from "@/messages/he.json";
import { motion } from "framer-motion";
import { useId, useMemo, useState } from "react";
import type { LandingPackageDTO } from "./data";
import { PricingCardVisual, type PricingTierVisual } from "./PricingCardVisuals";

function parseFeatures(features: unknown): string[] {
  if (Array.isArray(features)) {
    return features.filter((x): x is string => typeof x === "string");
  }
  return [];
}

function splitPricingTitle(title: string): { line1: string; line2: string | null } {
  const parts = title.split(/\s*[—–]\s*/);
  if (parts.length >= 2) {
    return { line1: parts[0]!.trim(), line2: parts.slice(1).join(" — ").trim() };
  }
  return { line1: title.trim(), line2: null };
}

function splitPricingSubtitle(text: string): string[] {
  const lines = text
    .split(/\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (lines.length > 1) return lines;
  const sentences = text.split(/(?<=\.)\s+/).map((s) => s.trim());
  if (sentences.length >= 2) return sentences;
  return [text.trim()];
}

function tierFromPackage(name: string, index: number): PricingTierVisual {
  if (/בסיס|basic|أساس|الأساس/i.test(name)) return "basic";
  if (/צמיחה|growth|pro|نمو|احترافي/i.test(name)) return "growth";
  if (/חכם|premium|עסק חכם|ذكي|بريميوم|سمارت/i.test(name)) return "premium";
  return (["basic", "growth", "premium"] as const)[index % 3]!;
}

function PremiumFeatureCheck() {
  const gid = useId().replace(/:/g, "");
  return (
    <span className="lp-pricing-premium__check" aria-hidden>
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <path
          d="M20 6L9 17l-5-5"
          stroke={`url(#${gid}-chk)`}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id={`${gid}-chk`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5d06f" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}

const MINI_KEYS: { icon: "lock" | "layers" | "chart" | "zap"; msgKey: string }[] = [
  { icon: "lock", msgKey: "pricing.mini.secure" },
  { icon: "layers", msgKey: "pricing.mini.system" },
  { icon: "chart", msgKey: "pricing.mini.marketing" },
  { icon: "zap", msgKey: "pricing.mini.automation" },
];

function MiniFeatIcon({ type }: { type: (typeof MINI_KEYS)[number]["icon"] }) {
  const c = "lp-pricing-premium__mini-icon-svg";
  switch (type) {
    case "layers":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "chart":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M7 12l4-4 4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "zap":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.12, duration: 0.52, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Pricing() {
  const {
    t,
    locale,
    landingConfig,
    packages: initialPackages,
    checkoutEnabled,
    projectKey,
  } = useLandingI18n();

  const config: Pick<LandingConfig, "pricingTitle" | "pricingSubtitle"> = landingConfig;
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [buyError, setBuyError] = useState<string | null>(null);

  const msgRoot = (locale === "ar" ? arMessages : heMessages) as Record<string, unknown>;
  const trustItems = useMemo(() => getStringArray(msgRoot, "pricing.trust"), [msgRoot]);

  const displayList = initialPackages.map((pkg: LandingPackageDTO) => ({
    id: pkg.id,
    name: pkg.name,
    price: pkg.price,
    features: parseFeatures(pkg.features).length
      ? parseFeatures(pkg.features)
      : [`${pkg.durationDays} ${t("pricing.fallbackFeatureDays")}`],
    highlighted: /צמיחה|growth|نمو/i.test(pkg.name) || Number(pkg.price) === 299,
    disabled: !checkoutEnabled,
  }));

  const { line1, line2 } = splitPricingTitle(config.pricingTitle);
  const subtitleLines = splitPricingSubtitle(config.pricingSubtitle);
  const localeTag = locale === "ar" ? "ar" : "he-IL";

  async function buy(pkgId: string) {
    if (!checkoutEnabled) return;
    setCheckoutId(pkgId);
    setBuyError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: pkgId, project_key: projectKey }),
      });
      const data = await res.json();
      if (!res.ok || !data.redirectUrl) {
        setBuyError(data.message ?? t("pricing.errorCheckout"));
        setCheckoutId(null);
        return;
      }
      window.location.href = data.redirectUrl as string;
    } catch {
      setBuyError(t("pricing.errorNetwork"));
      setCheckoutId(null);
    }
  }

  return (
    <section id="packages" className="lp-section lp-pricing-premium">
      <div className="lp-pricing-premium__ambient" aria-hidden>
        <div className="lp-pricing-premium__blob lp-pricing-premium__blob--a" />
        <div className="lp-pricing-premium__blob lp-pricing-premium__blob--b" />
        <div className="lp-pricing-premium__blob lp-pricing-premium__blob--c" />
        <div className="lp-pricing-premium__streak" />
        <div className="lp-pricing-premium__particles">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="lp-pricing-premium__particle" />
          ))}
        </div>
        <svg className="lp-pricing-premium__arc" viewBox="0 0 1200 160" preserveAspectRatio="none" aria-hidden>
          <path
            d="M0,100 Q400,30 800,90 T1200,70"
            fill="none"
            stroke="url(#lpPricingArc)"
            strokeWidth="1"
            opacity="0.35"
          />
          <defs>
            <linearGradient id="lpPricingArc" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59,130,246,0)" />
              <stop offset="45%" stopColor="rgba(96,165,250,0.45)" />
              <stop offset="55%" stopColor="rgba(212,175,55,0.28)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="lp-container lp-pricing-premium__inner">
        <motion.header
          className="lp-pricing-premium__header"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="lp-pricing-premium__title-block">
            <p className="lp-pricing-premium__title-line1">{line1}</p>
            {line2 ? <p className="lp-pricing-premium__title-line2">{line2}</p> : null}
            <div className="lp-pricing-premium__title-glow" aria-hidden />
          </div>
          <div className="lp-pricing-premium__subtitle">
            {subtitleLines.map((line, i) => (
              <p key={`${i}-${line.slice(0, 32)}`}>{line}</p>
            ))}
          </div>
          <div className="lp-pricing-premium__divider" aria-hidden />
        </motion.header>

        {buyError ? <p className="lp-pricing-premium__error">{buyError}</p> : null}

        <motion.div
          className="lp-pricing-premium__mini-row"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {MINI_KEYS.map((item) => (
            <div key={item.msgKey} className="lp-pricing-premium__mini-item">
              <span className="lp-pricing-premium__mini-glow" aria-hidden />
              <MiniFeatIcon type={item.icon} />
              <span className="lp-pricing-premium__mini-label">{t(item.msgKey)}</span>
            </div>
          ))}
        </motion.div>

        <div className="lp-pricing-premium__grid-wrap">
          <div className="lp-pricing-premium__grid-glow" aria-hidden />
          <div className="lp-pricing-premium__grid">
            {displayList.map((pkg, cardIndex) => {
              const tier = tierFromPackage(pkg.name, cardIndex);
              return (
                <motion.article
                  key={pkg.id}
                  className={`lp-pricing-premium-card${pkg.highlighted ? " lp-pricing-premium-card--featured" : ""}`}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={cardIndex}
                >
                  {pkg.highlighted ? (
                    <div className="lp-pricing-premium-card__badge">
                      <span aria-hidden>⭐</span> {t("pricing.badgePopular")}
                    </div>
                  ) : null}
                  <div className="lp-pricing-premium-card__shine" aria-hidden />
                  <div className="lp-pricing-premium-card__border-sweep" aria-hidden />
                  <div className="lp-pricing-premium-card__visual">
                    <div className="lp-pricing-premium-card__visual-inner">
                      <PricingCardVisual tier={tier} className="lp-pricing-premium-card__svg" />
                    </div>
                    <div className="lp-pricing-premium-card__visual-glow" aria-hidden />
                  </div>
                  <h3 className="lp-pricing-premium-card__name">{pkg.name}</h3>
                  <div className="lp-pricing-premium-card__price-row">
                    <span className="lp-pricing-premium-card__currency">₪</span>
                    <span className="lp-pricing-premium-card__amount">{pkg.price.toLocaleString(localeTag)}</span>
                    <span className="lp-pricing-premium-card__period">{t("pricing.period")}</span>
                  </div>
                  <ul className="lp-pricing-premium-card__features">
                    {pkg.features.map((f, i) => (
                      <li key={`${pkg.id}-f-${i}`} className="lp-pricing-premium-card__feat">
                        <PremiumFeatureCheck />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="lp-btn lp-btn--gold lp-btn-pricing-gradient lp-pricing-premium__cta"
                    disabled={pkg.disabled || checkoutId === pkg.id}
                    onClick={() => void buy(pkg.id)}
                  >
                    <span className="lp-pricing-premium__cta-shine" aria-hidden />
                    {checkoutId === pkg.id ? t("pricing.ctaLoading") : t("pricing.ctaBuy")}
                  </button>
                  <p className="lp-pricing-premium-card__footnote">
                    {pkg.disabled ? t("pricing.footnoteDisabled") : t("pricing.footnoteEnabled")}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>

        <motion.div
          className="lp-pricing-premium__trust"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {trustItems.map((pillLabel) => (
            <span key={pillLabel} className="lp-pricing-premium__trust-pill">
              <span className="lp-pricing-premium__trust-dot" aria-hidden />
              {pillLabel}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
