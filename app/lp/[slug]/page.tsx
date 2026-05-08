import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { resolveProjectKey } from "@/lib/project-key";
import type { Package } from "@prisma/client";

function isDbMissingTable(e: unknown): boolean {
  return typeof e === "object" && e !== null && "code" in e && (e as { code: string }).code === "P2021";
}

function pickLocalizedString(raw: unknown, key: string): string | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const v = (raw as Record<string, unknown>)[key];
  return typeof v === "string" ? v : undefined;
}

export default async function LandingPageRoute({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { project_key?: string; projectId?: string };
}) {
  const projectKey = resolveProjectKey(searchParams);

  const site =
    (await prisma.siteSettings.findFirst({ where: { id: projectKey } })) ??
    (await prisma.siteSettings.findFirst({ where: { id: "default" } }));

  if (!site) {
    return (
      <main className="container">
        <section className="card">
          <h1 className="section-title">Landing page not found</h1>
          <p>Could not load site settings for this project.</p>
        </section>
      </main>
    );
  }

  const localized = site.localizedContent;
  const heroTitle = site.heroTitle || site.businessName || site.tagline || "Wego";
  const heroSubtitle =
    site.heroSubtitle ||
    site.aboutTitle ||
    pickLocalizedString(localized, "heroSubtitle") ||
    "Build recurring revenue with SaaS packages tailored to your business.";
  const servicesText =
    pickLocalizedString(localized, "services") ||
    site.aboutDescription ||
    "Tailored launch strategies, subscription funnels, and analytics.";
  const testimonialsText =
    pickLocalizedString(localized, "testimonials") ||
    site.aboutSecondaryDescription ||
    "Our customers grow faster with landing pages that convert and subscriptions that scale.";

  let packages: Package[] = [];
  let packagesError: "missing_table" | "other" | null = null;
  try {
    packages = await prisma.package.findMany({
      where: { project_key: projectKey },
      orderBy: { name: "asc" },
    });
  } catch (e) {
    if (isDbMissingTable(e)) {
      packagesError = "missing_table";
    } else {
      packagesError = "other";
    }
    packages = [];
  }

  return (
    <main className="container">
      <section className="card">
        <h1 className="section-title">{heroTitle}</h1>
        <p>{heroSubtitle}</p>
        <p className="status" style={{ marginTop: "0.5rem" }}>
          Page: <code>{params.slug}</code> · project_key: <code>{projectKey}</code>
        </p>
        <div className="section-grid" style={{ gap: "1rem", marginTop: "1.5rem" }}>
          {packagesError === "missing_table" ? (
            <p className="status">
              טבלת החבילות עדיין לא קיימת במסד הנתונים. הריצו מיגרציה (למשל{" "}
              <code>npx prisma migrate deploy</code>) ואז <code>npm run seed</code>.
            </p>
          ) : packagesError === "other" ? (
            <p className="status">לא ניתן לטעון חבילות כרגע. נסו שוב מאוחר יותר.</p>
          ) : packages.length > 0 ? (
            packages.map((pkg) => (
              <article key={pkg.id} className="card">
                <h2>{pkg.name}</h2>
                <p>
                  Price: <strong>${pkg.price.toFixed(2)}</strong>
                </p>
                <Link
                  className="btn"
                  href={`/checkout?project_key=${encodeURIComponent(projectKey)}&packageId=${pkg.id}`}
                >
                  Select package
                </Link>
              </article>
            ))
          ) : (
            <p>No subscription packages are configured for this project yet.</p>
          )}
        </div>
      </section>
      <section className="card" style={{ marginTop: "1.5rem" }}>
        <h2 className="section-title">Services</h2>
        <p>{servicesText}</p>
      </section>
      <section className="card" style={{ marginTop: "1.5rem" }}>
        <h2 className="section-title">Testimonials</h2>
        <p>{testimonialsText}</p>
      </section>
    </main>
  );
}
