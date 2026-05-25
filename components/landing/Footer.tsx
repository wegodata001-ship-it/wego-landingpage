"use client";

import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";
import Image from "next/image";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const CONTACT_EMAIL = "wego.biz24@gmail.com";

export function Footer() {
  const { t, projectKey } = useLandingI18n();
  const q = `project_key=${encodeURIComponent(projectKey)}`;
  const year = new Date().getFullYear();
  const waHref = buildWhatsAppLink(t("contact.whatsappPrefill"));

  return (
    <footer className="lp-footer">
      <div className="lp-container">
        <div className="lp-footer-grid">
          <div>
            <div className="lp-footer__brand">
              <Image src="/wego-logo.svg" alt="" width={36} height={36} />
              <span>Wego Business</span>
            </div>
            <p className="lp-muted lp-footer__tagline">{t("footer.tagline")}</p>
          </div>
          <div>
            <div className="lp-footer__heading">{t("footer.linksTitle")}</div>
            <ul className="lp-footer__links">
              <li>
                <a href="#systems">{t("footer.packagesLink")}</a>
              </li>
              <li>
                <a href="#contact">{t("nav.contact")}</a>
              </li>
              <li>
                <Link href={`/login?${q}`}>{t("nav.login")}</Link>
              </li>
              <li>
                <Link href={`/dashboard?${q}`}>{t("nav.dashboard")}</Link>
              </li>
              <li>
                <Link href={`/admin?${q}`}>{t("nav.admin")}</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="lp-footer__heading">{t("footer.contactTitle")}</div>
            <p className="lp-muted lp-footer__line">
              {t("footer.emailLabel")}{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
            <p className="lp-muted lp-footer__line">
              {t("footer.whatsappLabel")}{" "}
              <a href={waHref} target="_blank" rel="noopener noreferrer" dir="ltr">
                WhatsApp
              </a>
            </p>
          </div>
        </div>
        <p className="lp-footer__copy">
          © {year} Wego Business. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
