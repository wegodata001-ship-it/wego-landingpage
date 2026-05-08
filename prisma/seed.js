const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const DEMO_KEY = "demo";

const PACKAGES = [
  {
    id: "pkg-basic",
    name: "בסיס",
    price: 149,
    durationDays: 30,
    description: "מערכת ניהול עם לקוחות ותשלומים ותמיכה.",
    features: ["מערכת ניהול", "לקוחות ותשלומים", "תמיכה"],
  },
  {
    id: "pkg-pro",
    name: "צמיחה",
    price: 299,
    durationDays: 30,
    description: "מערכת מלאה, דוחות מתקדמים והתחלת שיווק.",
    features: ["מערכת מלאה", "דוחות מתקדמים", "התחלה של שיווק"],
  },
  {
    id: "pkg-premium",
    name: "עסק חכם",
    price: 499,
    durationDays: 30,
    description: "הכל כלול — שיווק מלא וליווי אישי.",
    features: ["הכל כלול", "שיווק מלא", "ליווי אישי"],
  },
];

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: DEMO_KEY },
    update: {
      heroTitle: "Convert visitors into subscribers",
      heroSubtitle: "A multi-tenant experience powered by SiteSettings and project-scoped packages.",
      aboutDescription:
        "Landing page optimization, package selection, checkout flow, and subscription management.",
      aboutSecondaryDescription:
        "“Wego gave our product a professional launch funnel in minutes.”",
    },
    create: {
      id: DEMO_KEY,
      businessName: "Wego Business",
      tagline: "SaaS for your business",
      heroTitle: "Convert visitors into subscribers",
      heroSubtitle: "A multi-tenant experience powered by SiteSettings and project-scoped packages.",
      aboutDescription:
        "Landing page optimization, package selection, checkout flow, and subscription management.",
      aboutSecondaryDescription:
        "“Wego gave our product a professional launch funnel in minutes.”",
    },
  });

  await prisma.project.upsert({
    where: { id: DEMO_KEY },
    update: {
      category: "demo",
      title_ar: "مشروع تجريبي",
      title_he: "פרויקט הדגמה",
      isPublished: true,
    },
    create: {
      id: DEMO_KEY,
      category: "demo",
      title_ar: "مشروع تجريبي",
      title_he: "פרויקט הדגמה",
      isPublished: true,
    },
  });

  try {
    for (const p of PACKAGES) {
      await prisma.package.upsert({
        where: { id: p.id },
        update: {
          name: p.name,
          price: p.price,
          durationDays: p.durationDays,
          description: p.description,
          features: p.features,
        },
        create: {
          id: p.id,
          project_key: DEMO_KEY,
          name: p.name,
          price: p.price,
          durationDays: p.durationDays,
          description: p.description,
          features: p.features,
        },
      });
    }
    console.log("Seed completed (SiteSettings, Project, Packages: Basic / Pro / Premium).");
  } catch (e) {
    if (e.code === "P2021") {
      console.warn(
        "Package seed skipped: SaaS tables missing. Run: npx prisma migrate deploy\nThen run npm run seed again."
      );
      console.log("Seed completed (SiteSettings, Project only).");
    } else {
      throw e;
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
