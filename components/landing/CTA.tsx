"use client";

import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";
import Link from "next/link";

export function CTA() {
  const { landingConfig: config, t, projectKey } = useLandingI18n();
  const q = `project_key=${encodeURIComponent(projectKey)}`;

  return (
    <section className="lp-section lp-cta-final lp-glow-marketing" style={{ paddingBottom: "4rem" }}>
      <div className="lp-container">
        <div className="lp-card lp-marketing-card lp-cta-final__card">
          <h2 style={{ fontSize: "clamp(1.45rem, 3.5vw, 2.1rem)", margin: "0 0 1rem", fontWeight: 800 }}>{config.ctaTitle}</h2>
          <p className="lp-muted" style={{ marginBottom: "1.75rem", maxWidth: "36rem", marginInline: "auto", fontSize: "1.05rem" }}>
            {config.ctaSubtitle}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <a href="#contact" className="lp-btn lp-btn--gold lp-btn--ripple lp-btn--cta-gradient" style={{ minWidth: 220, minHeight: 52 }}>
              {t("cta.talk")}
            </a>
            <Link href={`/signup?${q}`} className="lp-btn lp-btn--ghost lp-btn--ripple" style={{ minWidth: 180, minHeight: 52 }}>
              {t("cta.start")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
