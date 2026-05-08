export const DEFAULT_LANDING_PROJECT_KEY = process.env.NEXT_PUBLIC_PROJECT_KEY ?? "demo";

/** Shape passed from server → `Pricing` (serializable). */
export type LandingPackageDTO = {
  id: string;
  name: string;
  price: number;
  durationDays: number;
  description: string | null;
  features: unknown;
};

/** Marketing fallback — same IDs as `prisma/seed.js` (buttons disabled until DB exists). */
export function getFallbackPackagesForSSR(): LandingPackageDTO[] {
  return mockPackages.map((m) => ({
    id: m.id,
    name: m.name,
    price: m.price,
    durationDays: 30,
    description: null,
    features: [...m.features],
  }));
}

/** Fallback display when API returns no rows — IDs align with `prisma/seed.js`. */
export const mockPackages = [
  {
    id: "pkg-basic",
    name: "בסיס",
    price: 149,
    currency: "₪",
    features: ["מערכת ניהול", "לקוחות ותשלומים", "תמיכה"],
    highlighted: false,
  },
  {
    id: "pkg-pro",
    name: "צמיחה",
    price: 299,
    currency: "₪",
    features: ["מערכת מלאה", "דוחות מתקדמים", "התחלה של שיווק"],
    highlighted: true,
  },
  {
    id: "pkg-premium",
    name: "עסק חכם",
    price: 499,
    currency: "₪",
    features: ["הכל כלול", "שיווק מלא", "ליווי אישי"],
    highlighted: false,
  },
] as const;
