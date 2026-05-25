import "@/components/landing/landing.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import {
  CoreValue,
  CTA,
  Footer,
  Hero,
  HowItWorks,
  Navbar,
  PainSection,
  PartnersLogoStrip,
  Pricing,
  SolutionSection,
  MarketingReelsShowcase,
} from "@/components/landing";
import { LandingI18nProvider } from "@/components/i18n/LandingI18nProvider";
import type { AppLocale } from "@/lib/i18n/types";
import { LOCALE_COOKIE } from "@/lib/i18n/types";
import { loadLandingBundles } from "@/lib/load-landing-bundles";
import { getActiveProjectKey } from "@/lib/project-isolation";
import { getFallbackPackagesForSSR } from "@/components/landing/data";
import type { LandingPackageDTO } from "@/components/landing/data";
import { isDbDisabled } from "@/lib/db-disabled";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Wego Business | ניהול עסק וצמיחה בשיווק",
  description: "מערכת ניהול ומנוע צמיחה — לקוחות חדשים, ניהול חכם ותשלומים במקום אחד.",
};

async function loadPackagesForLanding(projectKey: string): Promise<{ packages: LandingPackageDTO[]; checkoutEnabled: boolean }> {
  if (isDbDisabled()) {
    return { packages: getFallbackPackagesForSSR(), checkoutEnabled: false };
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    const list = await prisma.package.findMany({
      where: { project_key: projectKey },
      orderBy: { price: "asc" },
    });
    if (list.length > 0) {
      return {
        packages: list.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          durationDays: p.durationDays,
          description: p.description ?? null,
          features: p.features ?? null,
        })),
        checkoutEnabled: true,
      };
    }
  } catch {
    /* טבלה לא קיימת */
  }
  return { packages: getFallbackPackagesForSSR(), checkoutEnabled: false };
}

export default async function LandingPage({
  searchParams,
}: {
  searchParams?: { project_key?: string; projectId?: string };
}) {
  const fromQuery = searchParams?.project_key ?? searchParams?.projectId;
  const projectKey =
    (typeof fromQuery === "string" && fromQuery.trim() ? fromQuery.trim() : null) ?? getActiveProjectKey();

  const bundles = await loadLandingBundles(projectKey);
  const { packages: pricePackages, checkoutEnabled } = await loadPackagesForLanding(projectKey);

  const cookieStore = cookies();
  const rawLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const initialLocale: AppLocale = rawLocale === "ar" ? "ar" : "he";

  return (
    <LandingI18nProvider
      bundles={bundles}
      initialLocale={initialLocale}
      projectKey={projectKey}
      packages={pricePackages}
      checkoutEnabled={checkoutEnabled}
    >
      <Navbar />
      <main>
        <Hero />
        <PartnersLogoStrip />
        <CoreValue />
        <PainSection />
        <SolutionSection />
        <HowItWorks />
        <Pricing />
        <MarketingReelsShowcase />
        <CTA />
      </main>
      <Footer />
    </LandingI18nProvider>
  );
}
