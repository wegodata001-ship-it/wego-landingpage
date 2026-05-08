"use client";

import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const { t, projectKey } = useLandingI18n();
  const q = `project_key=${encodeURIComponent(projectKey)}`;
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="lp-section" style={{ paddingTop: "2rem", borderTop: "1px solid rgba(212, 175, 55, 0.15)" }}>
      <div className="lp-container">
        <div className="lp-footer-grid" style={{ marginBottom: "2rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
              <Image src="/wego-logo.svg" alt="" width={36} height={36} />
              <span style={{ fontWeight: 800 }}>Wego Business</span>
            </div>
            <p className="lp-muted" style={{ margin: 0, fontSize: "0.95rem", maxWidth: "32ch" }}>
              {t("footer.tagline")}
            </p>
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: "0.75rem" }}>{t("footer.linksTitle")}</div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li>
                <a href="#packages">{t("footer.packagesLink")}</a>
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
            <div style={{ fontWeight: 700, marginBottom: "0.75rem" }}>{t("footer.contactTitle")}</div>
            <p className="lp-muted" style={{ margin: "0 0 0.35rem", fontSize: "0.95rem" }}>
              {t("footer.emailLabel")} <a href="mailto:hello@wegobusiness.test">hello@wegobusiness.test</a>
            </p>
            <p className="lp-muted" style={{ margin: 0, fontSize: "0.95rem" }}>
              {t("footer.whatsappLabel")} <span dir="ltr">+972-50-000-0000</span>
            </p>
          </div>
        </div>
        <p className="lp-muted" style={{ fontSize: "0.8rem", textAlign: "center", margin: 0, paddingBottom: "1.5rem" }}>
          © {year} Wego Business. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
