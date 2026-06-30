"use client";

import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function CTA() {
  const { landingConfig: config, t } = useLandingI18n();
  const waHref = buildWhatsAppLink(t("contact.whatsappPrefill"));

  return (
    <section className="lp-section lp-cta-final lp-glow-marketing">
      <div className="lp-container">
        <div className="lp-cta-final__card lp-cta-final__card--saas">
          <div className="lp-cta-final__ambient" aria-hidden>
            <span className="lp-cta-final__blob lp-cta-final__blob--gold" />
            <span className="lp-cta-final__blob lp-cta-final__blob--blue" />
            <span className="lp-cta-final__grid" />
          </div>
          <div className="lp-cta-final__content">
            <p className="lp-cta-final__eyebrow">WEGO BUSINESS PLATFORM</p>
            <h2 className="lp-cta-final__title">{config.ctaTitle}</h2>
            <p className="lp-cta-final__subtitle">{config.ctaSubtitle}</p>
            <div className="lp-cta-final__actions">
              <a
                href="#contact"
                className="lp-btn lp-btn--gold lp-btn--ripple lp-btn--cta-gradient lp-btn--lg lp-cta-pulse"
              >
                {t("cta.demo")}
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="lp-btn lp-btn--ghost lp-btn--ripple lp-btn--lg"
              >
                {t("cta.talk")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
