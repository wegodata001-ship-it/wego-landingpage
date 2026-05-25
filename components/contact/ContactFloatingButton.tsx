"use client";

import { useScrollToContact } from "@/components/contact/contact-context";
import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 6h16v12H4z" strokeLinejoin="round" />
      <path d="M4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ContactFloatingButton() {
  const { scrollToContact } = useScrollToContact();
  const { t } = useLandingI18n();

  return (
    <button
      type="button"
      className="lp-contact-fab"
      onClick={scrollToContact}
      aria-label={t("contact.fabLabel")}
      title={t("contact.fabLabel")}
    >
      <MailIcon />
    </button>
  );
}
