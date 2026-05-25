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

/** אייקונים למקטע השירותים (שיווק / נחיתה) */
export type LandingServiceIcon = "launch" | "megaphone" | "orbit" | "partners" | "ledger" | "scale";

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
  heroEyebrow: "WEGO BUSINESS",
  heroTitle: "מערכות חכמות, שיווק מדויק\nוניהול עסקי שמביא תוצאות.",
  heroSubtitle:
    "ייעוץ וליווי עסקי מלא במקום אחד —\nמערכות, שיווק וניהול שמסדרים את העסק בצורה חכמה.",
  heroDescription: "",
  heroStatBadges: ["+120% צמיחה", "+300 לקוחות", "4.9 דירוג"],
  heroMetricLeft: { value: 84, label: "לידים חדשים" },
  heroMetricRight: { value: 128, label: "הכנסות (אלפי ₪)" },
  problemSectionTitle: "מרגיש שהעסק לא מתקדם?",
  problemSectionBullets: ["לקוחות הולכים לאיבוד", "אין סדר בעבודה", "השיווק לא מביא תוצאות"],
  problemSectionBottom:
    "הבעיה היא לא העסק שלך — הבעיה היא שאין מערכת שמנהלת אותו נכון",
  servicesTitle: "השירותים שלנו",
  servicesSubtitle: "כל מה שהעסק שלך צריך במקום אחד",
  servicesItems: [
    {
      icon: "launch",
      title: "פתיחת עסק מאפס",
      body: "ליווי מלא מהרעיון ועד פתיחה — בלי טעויות יקרות",
    },
    {
      icon: "megaphone",
      title: "שיווק דיגיטלי ומיתוג",
      body: "מביאים לך לקוחות בפועל עם קמפיינים שעובדים",
    },
    {
      icon: "orbit",
      title: "המעטפת המלאה",
      body: "ניהול עסקי 360° ושליטה מלאה בעסק שלך",
    },
    {
      icon: "partners",
      title: "ניהול שותפויות",
      body: "בניית שותפויות נכונות שמחזיקות לאורך זמן",
    },
    {
      icon: "ledger",
      title: "שירותי רואי חשבון",
      body: "שליטה בכסף ובתזרים בלי בלגן",
    },
    {
      icon: "scale",
      title: "בדיקת כדאיות כלכלית",
      body: "לפני שמשקיעים — בודקים אם זה באמת רווחי",
    },
  ],
  painTitle: "מרגיש שהעסק תקוע?",
  painItems: [
    "לידים לא מגיעים בצורה קבועה",
    "אין שליטה על הכנסות והוצאות",
    "מחירים גבוהים וספקים לא מתאימים",
    "הכל מפוזר במקום אחד",
  ],
  solutionTitle: "אנחנו מביאים לכם תוצאות אמיתיות",
  solutionCards: [
    {
      title: "החלטות חכמות",
      body: "מבוסס נתונים אמיתיים — לא ניחושים, אלא כיוון ברור קדימה.",
      visual: "decisions",
    },
    {
      title: "שליטה מלאה בעסק",
      body: "לקוחות, תשלומים ודוחות במקום אחד, עם מבט על שמראה את התמונה המלאה.",
      visual: "control",
    },
    {
      title: "שיווק שמביא לקוחות",
      body: "מיתוג, קמפיינים ומסרים מדויקים — שמביאים תנועה איכותית ומכירות, לא רק חשיפה.",
      visual: "marketing",
    },
  ],
  howTitle: "איך זה עובד?",
  howSubtitle: "משלב ראשון ועד תוצאות מדידות — צעד אחר צעד במערכת אחת.",
  howSteps: [
    {
      title: "מביאים לכם לקוחות",
      desc: "מנועי לידים ושיווק שממלאים את הפייפליין — בלי רעש מיותר.",
      visual: "leads",
    },
    {
      title: "מנהלים אותם בקלות",
      desc: "לקוחות, תשלומים ומעקב — במסך אחד נקי וברור.",
      visual: "manage",
    },
    {
      title: "רואים צמיחה אמיתית",
      desc: "דוחות ומדדים שמראים בדיוק מה לשפר כדי לגדול.",
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
  ctaTitle: "מוכנים לקחת את העסק לשלב הבא?",
  ctaSubtitle: "זה הזמן להכניס יותר לקוחות ולהגדיל הכנסות",
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
