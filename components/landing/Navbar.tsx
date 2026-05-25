"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useLandingI18n();

  const nav = useMemo(
    () => [
      { href: "#core-value", label: t("nav.services") },
      { href: "#systems", label: t("nav.packages") },
      { href: "#pain", label: t("nav.whyUs") },
      { href: "#contact", label: t("nav.contact") },
    ],
    [t],
  );

  return (
    <header className="lp-nav">
      <div className="lp-nav__shell">
        <div className="lp-container lp-nav__inner">
          <Link href="/" className="lp-nav__brand">
            <Image src="/wego-logo.svg" alt="Wego Business" width={40} height={40} priority />
            <span>
              Wego <span className="lp-gradient-text">Business</span>
            </span>
          </Link>

          <nav className="lp-nav__desktop" aria-label={t("nav.mainNav")}>
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="lp-nav__actions">
            <LanguageSwitcher />
            <button
              type="button"
              className="lp-nav__toggle"
              aria-expanded={open}
              aria-label={t("nav.openMenu")}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="lp-nav__toggle-bar" />
              <span className="lp-nav__toggle-bar" />
              <span className="lp-nav__toggle-bar" />
            </button>
          </div>
        </div>

        <nav className={`lp-nav__mobile-panel${open ? " is-open" : ""}`} aria-label={t("nav.mobileNav")}>
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
