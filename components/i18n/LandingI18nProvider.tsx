"use client";

import type { LandingPackageDTO } from "@/components/landing/data";
import { tFromMessages } from "@/lib/i18n/nested";
import type { AppLocale } from "@/lib/i18n/types";
import { LOCALE_COOKIE } from "@/lib/i18n/types";
import type { LandingBundles } from "@/lib/load-landing-bundles";
import type { LandingConfig } from "@/lib/landing-config";
import arMessages from "@/messages/ar.json";
import heMessages from "@/messages/he.json";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const MSG: Record<AppLocale, Record<string, unknown>> = {
  he: heMessages as Record<string, unknown>,
  ar: arMessages as Record<string, unknown>,
};

export type LandingI18nContextValue = {
  locale: AppLocale;
  setLocale: (l: AppLocale) => void;
  t: (path: string) => string;
  landingConfig: LandingConfig;
  bundles: LandingBundles;
  projectKey: string;
  packages: LandingPackageDTO[];
  checkoutEnabled: boolean;
};

const LandingI18nContext = createContext<LandingI18nContextValue | null>(null);

type Props = {
  children: ReactNode;
  bundles: LandingBundles;
  initialLocale: AppLocale;
  projectKey: string;
  packages: LandingPackageDTO[];
  checkoutEnabled: boolean;
};

export function LandingI18nProvider({
  children,
  bundles,
  initialLocale,
  projectKey,
  packages,
  checkoutEnabled,
}: Props) {
  const [locale, setLocaleState] = useState<AppLocale>(initialLocale);

  useEffect(() => {
    document.documentElement.lang = locale === "ar" ? "ar" : "he";
    document.documentElement.dir = "rtl";
    document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;SameSite=Lax`;
  }, [locale]);

  const setLocale = useCallback((l: AppLocale) => {
    setLocaleState(l);
  }, []);

  const landingConfig = bundles[locale];
  const messages = MSG[locale];

  const t = useCallback((path: string) => tFromMessages(messages, path), [messages]);

  const value = useMemo(
    (): LandingI18nContextValue => ({
      locale,
      setLocale,
      t,
      landingConfig,
      bundles,
      projectKey,
      packages,
      checkoutEnabled,
    }),
    [locale, setLocale, t, landingConfig, bundles, projectKey, packages, checkoutEnabled],
  );

  return (
    <LandingI18nContext.Provider value={value}>
      <div
        className={`landing-page landing-i18n-root landing-i18n-root--${locale}`}
        data-locale={locale}
        lang={locale === "ar" ? "ar" : "he"}
        dir="rtl"
      >
        {children}
      </div>
    </LandingI18nContext.Provider>
  );
}

export function useLandingI18n(): LandingI18nContextValue {
  const c = useContext(LandingI18nContext);
  if (!c) {
    throw new Error("useLandingI18n must be used inside LandingI18nProvider");
  }
  return c;
}
