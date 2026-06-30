"use client";

import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";
import { getStringArray } from "@/lib/i18n/nested";
import arMessages from "@/messages/ar.json";
import heMessages from "@/messages/he.json";
import { ModalFeatureIcon, type ModalFeatureIconType } from "./icons";
import { useEffect, useMemo, useRef, useState } from "react";

function useCountUp(target: number, start = 0, durationMs = 1400) {
  const [v, setV] = useState(start);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / durationMs);
      const eased = 1 - (1 - p) ** 3;
      setV(Math.round(start + (target - start) * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, start, durationMs]);
  return v;
}

const CHART_BARS = [42, 58, 49, 70, 64, 86];

export function Hero() {
  const { landingConfig: config, t, locale } = useLandingI18n();
  const clients = useCountUp(320, 0, 1200);
  const revenue = useCountUp(128, 0, 1350);
  const returning = useCountUp(99, 0, 1200);

  const msgRoot = (locale === "ar" ? arMessages : heMessages) as Record<string, unknown>;
  const modules = useMemo(() => getStringArray(msgRoot, "hero.modules"), [msgRoot]);

  const kpis = useMemo(
    () =>
      [0, 1, 2].map((i) => ({
        label: t(`hero.dash.kpis.${i}.label`),
        value: t(`hero.dash.kpis.${i}.value`),
        delta: t(`hero.dash.kpis.${i}.delta`),
        down: i === 1,
      })),
    [t],
  );

  const rows = useMemo(
    () =>
      [0, 1, 2].map((i) => ({
        icon: t(`hero.dash.rows.${i}.icon`) as ModalFeatureIconType,
        title: t(`hero.dash.rows.${i}.title`),
        sub: t(`hero.dash.rows.${i}.sub`),
        amount: t(`hero.dash.rows.${i}.amount`),
      })),
    [t],
  );

  return (
    <section className="lp-hero lp-section lp-hero--premium">
      <div className="lp-hero__bg" aria-hidden />
      <div className="lp-hero__orb" aria-hidden />

      <div className="lp-container lp-hero__inner">
        <div className="lp-hero__grid">
          <div className="lp-hero__copy lp-hero__reveal">
            <p className="lp-hero__eyebrow">{config.heroEyebrow}</p>
            <h1 className="lp-hero__title">{config.heroTitle.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 ? <br /> : null}
              </span>
            ))}</h1>
            <p className="lp-hero__subtitle">{config.heroSubtitle.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 ? <br /> : null}
              </span>
            ))}</p>

            {modules.length > 0 ? (
              <ul className="lp-hero__modules" aria-label="WEGO modules">
                {modules.map((m, i) => (
                  <li key={`${m}-${i}`} className="lp-hero__module-chip">
                    <span className="lp-hero__module-dot" aria-hidden />
                    {m}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="lp-hero__stats">
              <div className="lp-hero-stat">
                <strong>+{clients}</strong>
                <span>{t("hero.stats.clients")}</span>
              </div>
              <div className="lp-hero-stat">
                <strong>{revenue}K</strong>
                <span>{t("hero.stats.revenue")}</span>
              </div>
              <div className="lp-hero-stat">
                <strong>{returning}%</strong>
                <span>{t("hero.stats.returning")}</span>
              </div>
              <div className="lp-hero-stat lp-hero-stat--trend">
                <strong>{t("hero.stats.growthStrong")}</strong>
                <span>{t("hero.stats.growthSub")}</span>
              </div>
            </div>

            <div className="lp-hero__ctas">
              <a href="#contact" className="lp-btn lp-btn--gold lp-btn--ripple lp-cta-pulse lp-btn--lg">
                {t("hero.ctaConsult")}
              </a>
              <a href="#systems" className="lp-btn lp-btn--ghost lp-btn--ripple lp-btn--lg">
                {t("hero.ctaWatch")}
              </a>
            </div>
          </div>

          <div className="lp-hero__visual lp-hero__reveal lp-hero__reveal--delayed">
            <div className="lp-hero-dash-wrap">
              <div className="lp-hero-dash-glow" aria-hidden />
              <div className="lp-hero-dash">
                <div className="lp-hero-dash__bar">
                  <span className="lp-hero-dash__dots" aria-hidden>
                    <i /><i /><i />
                  </span>
                  <span className="lp-hero-dash__brand">
                    <strong>{t("hero.dash.brand")}</strong>
                    <small>{t("hero.dash.title")}</small>
                  </span>
                  <span className="lp-hero-dash__live">
                    <span className="lp-hero-dash__live-dot" aria-hidden />
                    {t("hero.dash.live")}
                  </span>
                </div>

                <div className="lp-hero-dash__body">
                  <div className="lp-hero-dash__kpis">
                    {kpis.map((k, i) => (
                      <div key={i} className="lp-hero-dash__kpi">
                        <small>{k.label}</small>
                        <strong>{k.value}</strong>
                        <span className={`lp-hero-dash__delta${k.down ? " is-down" : ""}`}>{k.delta}</span>
                      </div>
                    ))}
                  </div>

                  <div className="lp-hero-dash__chart">
                    <div className="lp-hero-dash__chart-head">
                      <span>{t("hero.dash.chartLabel")}</span>
                    </div>
                    <div className="lp-hero-dash__bars" aria-hidden>
                      {CHART_BARS.map((h, i) => (
                        <span
                          key={i}
                          className={`lp-hero-dash__chart-bar${i === CHART_BARS.length - 1 ? " is-peak" : ""}`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="lp-hero-dash__rows">
                    {rows.map((row, i) => (
                      <div key={i} className="lp-hero-dash__row">
                        <span className="lp-hero-dash__row-icon" aria-hidden>
                          <ModalFeatureIcon type={row.icon} />
                        </span>
                        <span className="lp-hero-dash__row-copy">
                          <strong>{row.title}</strong>
                          <small>{row.sub}</small>
                        </span>
                        <span className="lp-hero-dash__row-amount">{row.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lp-hero-notify lp-hero-notify--1" aria-hidden>
              {t("hero.notify.0")}
            </div>
            <div className="lp-hero-notify lp-hero-notify--2" aria-hidden>
              {t("hero.notify.1")}
            </div>
            <div className="lp-hero-notify lp-hero-notify--3" aria-hidden>
              {t("hero.notify.2")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
