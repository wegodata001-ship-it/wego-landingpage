"use client";

import { ContactForm } from "@/components/contact/ContactForm";
import { useContactForm } from "@/components/contact/use-contact-form";
import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { motion } from "framer-motion";
import { useId } from "react";

const CONTACT_EMAIL = "wego.biz24@gmail.com";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 6h16v12H4z" strokeLinejoin="round" />
      <path d="M4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
    </svg>
  );
}

export function ContactSection() {
  const { t } = useLandingI18n();
  const form = useContactForm();
  const formId = useId();
  const waHref = buildWhatsAppLink(t("contact.whatsappPrefill"));
  const trustKeys = ["contact.trust1", "contact.trust2", "contact.trust3"] as const;

  return (
    <section id="contact" className="lp-section lp-contact-section lp-glow-marketing" aria-labelledby="lp-contact-heading">
      <div className="lp-contact-section__bg" aria-hidden />
      <div className="lp-container lp-contact-section__inner">
        <motion.div
          className="lp-contact-section__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
        >
          <p className="lp-contact-section__eyebrow">{t("contact.sectionEyebrow")}</p>
          <h2 id="lp-contact-heading" className="lp-contact-section__title">
            {t("contact.sectionTitle")}
          </h2>
          <p className="lp-contact-section__subtitle">{t("contact.sectionSubtitle")}</p>
        </motion.div>

        <div className="lp-contact-section__layout">
          <motion.aside
            className="lp-contact-section__info"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <p className="lp-contact-section__lead">{t("contact.sectionLead")}</p>
            <ul className="lp-contact-section__trust">
              {trustKeys.map((key) => (
                <li key={key}>
                  <span className="lp-contact-section__trust-dot" aria-hidden />
                  {t(key)}
                </li>
              ))}
            </ul>
            <div className="lp-contact-section__channels">
              <a className="lp-contact-section__channel" href={`mailto:${CONTACT_EMAIL}`}>
                <span className="lp-contact-section__channel-icon">
                  <MailIcon />
                </span>
                <span>
                  <small>{t("footer.emailLabel")}</small>
                  <strong dir="ltr">{CONTACT_EMAIL}</strong>
                </span>
              </a>
              <a
                className="lp-contact-section__channel lp-contact-section__channel--wa"
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="lp-contact-section__channel-icon">
                  <WhatsAppIcon />
                </span>
                <span>
                  <small>{t("footer.whatsappLabel")}</small>
                  <strong>{t("contact.whatsappCta")}</strong>
                </span>
              </a>
            </div>
          </motion.aside>

          <motion.div
            className="lp-contact-section__form-card lp-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            <div className="lp-contact-section__form-head">
              <h3 className="lp-contact-section__form-title">{t("contact.title")}</h3>
              <p className="lp-muted lp-contact-section__form-sub">{t("contact.subtitle")}</p>
            </div>
            <ContactForm form={form} formId={formId} variant="section" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
