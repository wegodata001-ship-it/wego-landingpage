/**
 * תוכן שיווקי לדף הנחיתה — נשמר ב־SiteSettings.localizedContent.landing (JSON).
 * לא דורש טבלה חדשה.
 */

export type LandingTestimonial = {
  name: string;
  role: string;
  quote: string;
};

export type LandingCoreItem = {
  title: string;
  icon: "users" | "crm" | "payment" | "chart";
};

/** אייקונים למקטע השירותים — מודולי מערכת (SaaS) + ירושה ישנה לתאימות */
export type LandingServiceIcon =
  | "finance"
  | "team"
  | "diary"
  | "tasks"
  | "inventory"
  | "ai"
  | "crm"
  | "launch"
  | "megaphone"
  | "orbit"
  | "partners"
  | "ledger"
  | "scale";

export type LandingServiceItem = {
  title: string;
  body: string;
  icon?: LandingServiceIcon;
};

export type LandingSolutionVisual = "decisions" | "control" | "marketing";

export type LandingSolutionCard = {
  title: string;
  body: string;
  /** אייקון ויזואלי לכרטיס — אופציונלי; נגזר מכותרת אם חסר */
  visual?: LandingSolutionVisual;
};

export type LandingHowStepVisual = "leads" | "manage" | "growth";

export type LandingHowStep = {
  title: string;
  desc: string;
  visual?: LandingHowStepVisual;
};

export type LandingConfig = {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  /** אופציונלי — אם ריק לא מוצג ב־Hero */
  heroDescription: string;
  heroStatBadges: string[];
  heroMetricLeft: { value: number; label: string };
  heroMetricRight: { value: number; label: string };
  problemSectionTitle: string;
  problemSectionBullets: string[];
  problemSectionBottom: string;
  servicesTitle: string;
  servicesSubtitle: string;
  servicesItems: LandingServiceItem[];
  painTitle: string;
  painItems: string[];
  solutionTitle: string;
  solutionCards: LandingSolutionCard[];
  howTitle: string;
  howSubtitle: string;
  howSteps: LandingHowStep[];
  testimonialTitle: string;
  testimonialSubtitle: string;
  testimonials: LandingTestimonial[];
  ctaTitle: string;
  ctaSubtitle: string;
  /** כותרת מעל כרטיסי המחירים (אדמין) */
  pricingTitle: string;
  pricingSubtitle: string;
};

export const DEFAULT_LANDING_CONFIG: LandingConfig = {
  heroEyebrow: "WEGO BUSINESS — PLATFORM",
  heroTitle: "מערכת אחת שמנהלת\nאת כל העסק שלך.",
  heroSubtitle:
    "כספים, עובדים, משימות, מלאי ו-CRM —\nהכל מחובר בפלטפורמה חכמה אחת.",
  heroDescription: "",
  heroStatBadges: ["+120% צמיחה", "+300 לקוחות", "4.9 דירוג"],
  heroMetricLeft: { value: 84, label: "לידים חדשים" },
  heroMetricRight: { value: 128, label: "הכנסות (אלפי ₪)" },
  problemSectionTitle: "מרגיש שהעסק לא מתקדם?",
  problemSectionBullets: ["נתונים מפוזרים בכלים שונים", "אין סדר בעבודה", "אין תמונה אחת בזמן אמת"],
  problemSectionBottom:
    "הבעיה היא לא העסק שלך — הבעיה היא שאין מערכת אחת שמנהלת אותו נכון",
  servicesTitle: "המודולים של WEGO",
  servicesSubtitle: "כל תחום בעסק מקבל מודול ייעודי — מחובר לכל השאר בפלטפורמה אחת",
  servicesItems: [
    {
      icon: "finance",
      title: "מערכת כספים",
      body: "הכנסות, הוצאות, מסמכים, OCR ותזרים — בשליטה מלאה.",
    },
    {
      icon: "team",
      title: "ניהול עובדים",
      body: "נוכחות, משמרות, יומן עבודה ושכר במקום אחד.",
    },
    {
      icon: "tasks",
      title: "ניהול משימות",
      body: "שיוך עובדים, מעקב, התראות ולוחות עבודה.",
    },
    {
      icon: "inventory",
      title: "ניהול מלאי",
      body: "ספירות מלאי, מוצרים וקטגוריות בזמן אמת.",
    },
    {
      icon: "ai",
      title: "WEGO AI",
      body: "סריקת מסמכים, ניתוח נתונים, דוחות ועוזר עסקי.",
    },
    {
      icon: "crm",
      title: "CRM",
      body: "לקוחות, לידים, מעקב ופגישות — מקצה לקצה.",
    },
  ],
  painTitle: "מרגיש שהעסק תקוע?",
  painItems: [
    "נתונים מפוזרים בין אקסל, וואטסאפ ופנקסים",
    "אין שליטה על הכנסות והוצאות",
    "אין שליטה במלאי, במשימות ובעובדים",
    "אין תמונה אחת מלאה של העסק",
  ],
  solutionTitle: "כל העסק שלכם — בשליטה מלאה",
  solutionCards: [
    {
      title: "החלטות מבוססות נתונים",
      body: "דוחות ואנליטיקה בזמן אמת — לא ניחושים, אלא כיוון ברור קדימה.",
      visual: "decisions",
    },
    {
      title: "שליטה מלאה בעסק",
      body: "כספים, עובדים, משימות ולקוחות במקום אחד — תמונת מצב מלאה בלוח בקרה אחד.",
      visual: "control",
    },
    {
      title: "אוטומציה ו-AI מובנים",
      body: "המערכת סורקת מסמכים, שולחת התראות ומפיקה דוחות — אוטומטית.",
      visual: "marketing",
    },
  ],
  howTitle: "איך זה עובד?",
  howSubtitle: "מהחיבור הראשון ועד ניהול מלא — צעד אחר צעד בפלטפורמה אחת.",
  howSteps: [
    {
      title: "מחברים את העסק",
      desc: "מעלים נתונים, מפעילים מודולים ומגדירים הרשאות — והמערכת מוכנה.",
      visual: "leads",
    },
    {
      title: "מנהלים הכל ממקום אחד",
      desc: "כספים, עובדים, משימות ולקוחות — בלוח בקרה אחד ונקי.",
      visual: "manage",
    },
    {
      title: "מקבלים תובנות בזמן אמת",
      desc: "דוחות, התראות ו-AI שמראים בדיוק מה לשפר כדי לגדול.",
      visual: "growth",
    },
  ],
  testimonialTitle: "עסקים שכבר גדלים איתנו",
  testimonialSubtitle: "מהלקוחות שלנו — במילים שלהם.",
  testimonials: [
    {
      name: "דני כ.",
      role: "בעלים, סטודיו דיגיטל",
      quote: "סוף סוף רואים מאיפה באים הלידים ומה משלם את עצמו.",
    },
    {
      name: "מיכל ר.",
      role: "מנכ״לית, רשת קפה",
      quote: "המערכת מרגישה פרימיום — הלקוחות מבינים שאנחנו רציניים.",
    },
    {
      name: "אורן ש.",
      role: "יזם",
      quote: "עברנו מבלגן של אקסל למקום אחד שאפשר לגדול ממנו.",
    },
  ],
  ctaTitle: "מוכנים לנהל את העסק בצורה חכמה יותר?",
  ctaSubtitle: "עברו ל-WEGO — פלטפורמה אחת לכספים, עובדים, משימות, מלאי, CRM ו-AI.",
  pricingTitle: "העסק שלך לא צריך לעבוד קשה — הוא צריך לעבוד נכון",
  pricingSubtitle:
    "בוחרים רמה — וממשיכים לתשלום מאובטח. כל החבילות כוללות ניהול וצמיחה באותה מערכת.",
};

export function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

/** Merge partial landing JSON over defaults (used for Hebrew or any locale defaults). */
export function mergeLandingConfigForLocale(raw: unknown, defaults: LandingConfig): LandingConfig {
  if (!isRecord(raw)) return { ...defaults };
  const base = { ...defaults };
  for (const key of Object.keys(defaults) as (keyof LandingConfig)[]) {
    if (raw[key] !== undefined) {
      (base as Record<string, unknown>)[key] = raw[key];
    }
  }
  return base;
}

export function mergeLandingConfig(raw: unknown): LandingConfig {
  return mergeLandingConfigForLocale(raw, DEFAULT_LANDING_CONFIG);
}
