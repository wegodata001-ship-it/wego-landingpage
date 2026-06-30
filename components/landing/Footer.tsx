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
          <div className="lp-footer__col lp-footer__col--brand">
            <div className="lp-footer__brand">
              <Image src="/wego-logo.svg" alt="" width={36} height={36} />
              <span>Wego Business</span>
            </div>
            <p className="lp-muted lp-footer__tagline">{t("footer.tagline")}</p>
          </div>

          <div className="lp-footer__col">
            <div className="lp-footer__heading">{t("footer.productsTitle")}</div>
            <ul className="lp-footer__links">
              <li>
                <a href="#platform">{t("footer.modulesLink")}</a>
              </li>
              <li>
                <a href="#systems">{t("footer.systemsLink")}</a>
              </li>
              <li>
                <a href="#dashboard-preview">{t("footer.howLink")}</a>
              </li>
              <li>
                <a href="#reels">{t("footer.reelsLink")}</a>
              </li>
            </ul>
          </div>

          <div className="lp-footer__col">
            <div className="lp-footer__heading">{t("footer.systemsColTitle")}</div>
            <ul className="lp-footer__links">
              <li>
                <a href="#platform">Finance</a>
              </li>
              <li>
                <a href="#platform">Employees</a>
              </li>
              <li>
                <a href="#platform">CRM</a>
              </li>
              <li>
                <a href="#platform">Inventory</a>
              </li>
              <li>
                <a href="#platform">WEGO AI</a>
              </li>
            </ul>
          </div>

          <div className="lp-footer__col">
            <div className="lp-footer__heading">{t("footer.companyTitle")}</div>
            <ul className="lp-footer__links">
              <li>
                <a href="#advantages">{t("footer.about")}</a>
              </li>
              <li>
                <a href="#">{t("footer.privacy")}</a>
              </li>
              <li>
                <a href="#">{t("footer.terms")}</a>
              </li>
              <li>
                <a href="#contact">{t("footer.support")}</a>
              </li>
              <li>
                <a href="#contact">{t("footer.contactLink")}</a>
              </li>
            </ul>
          </div>

          <div className="lp-footer__col">
            <div className="lp-footer__heading">{t("footer.contactTitle")}</div>
            <ul className="lp-footer__links">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`}>{t("footer.emailLabel").replace(":", "")}</a>
              </li>
              <li>
                <a href={waHref} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <Link href={`/login?${q}`}>{t("nav.login")}</Link>
              </li>
              <li>
                <Link href={`/dashboard?${q}`}>{t("nav.dashboard")}</Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="lp-footer__copy">
          © {year} Wego Business. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
