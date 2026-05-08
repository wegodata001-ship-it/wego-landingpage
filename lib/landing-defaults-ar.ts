import type { LandingConfig } from "@/lib/landing-config";

/** Arabic marketing defaults — merged with DB `localizedContent.landing.ar`. */
export const DEFAULT_LANDING_CONFIG_AR: LandingConfig = {
  heroEyebrow: "WEGO BUSINESS",
  heroTitle: "تحكم كامل في عملك.",
  heroSubtitle: "أنظمة وتسويق وإدارة تحقق نتائج حقيقية.",
  heroDescription: "",
  heroStatBadges: ["+120% نمو", "+300 عميل", "تقييم 4.9"],
  heroMetricLeft: { value: 84, label: "عملاء جدد" },
  heroMetricRight: { value: 128, label: "إيرادات (آلاف ₪)" },
  problemSectionTitle: "هل تشعر أن عملك لا يتقدم؟",
  problemSectionBullets: ["العملاء يضيعون", "لا نظام في العمل", "التسويق لا يحقق نتائج"],
  problemSectionBottom: "المشكلة ليست عملك — المشكلة أنه لا يوجد نظام يديره كما يجب",
  servicesTitle: "خدماتنا",
  servicesSubtitle: "كل ما يحتاجه عملك في مكان واحد",
  servicesItems: [
    {
      icon: "launch",
      title: "إنشاء عمل من الصفر",
      body: "مرافقة كاملة من الفكرة حتى الافتتاح — بدون أخطاء مكلفة",
    },
    {
      icon: "megaphone",
      title: "تسويق رقمي وهوية بصرية",
      body: "نجلب لك عملاء حقيقيين بحملات تعمل",
    },
    {
      icon: "orbit",
      title: "الحزمة الكاملة",
      body: "إدارة أعمال 360° وتحكم كامل في عملك",
    },
    {
      icon: "partners",
      title: "إدارة الشراكات",
      body: "بناء شراكات صحيحة تدوم",
    },
    {
      icon: "ledger",
      title: "خدمات محاسبة",
      body: "سيطرة على المال والتدفقات بدون فوضى",
    },
    {
      icon: "scale",
      title: "دراسة جدوى اقتصادية",
      body: "قبل الاستثمار — نتحقق إن كان مربحاً فعلاً",
    },
  ],
  painTitle: "هل تشعر أن عملك عالق؟",
  painItems: [
    "لا يوجد عملاء جدد بما يكفي",
    "لا تعرف من أين يأتي المال",
    "العملاء المحتملون يضيعون",
    "كل شيء يبدو فوضوياً",
  ],
  solutionTitle: "نحقق لكم نتائج حقيقية",
  solutionCards: [
    {
      title: "قرارات ذكية",
      body: "مبنية على بيانات حقيقية — لا تخمينات، بل اتجاه واضح للأمام.",
      visual: "decisions",
    },
    {
      title: "تحكم كامل في عملك",
      body: "عملاء ومدفوعات وتقارير في مكان واحد، بنظرة علوية توضح الصورة الكاملة.",
      visual: "control",
    },
    {
      title: "تسويق يجلب عملاء",
      body: "هوية وحملات ورسائل دقيقة — تملأ مسار البيع بالعملاء المناسبين.",
      visual: "marketing",
    },
  ],
  howTitle: "كيف يعمل؟",
  howSubtitle: "من الخطوة الأولى إلى نتائج قابلة للقياس — خطوة بخطوة في نظام واحد.",
  howSteps: [
    {
      title: "نجلب لكم العملاء",
      desc: "تسويق ومحركات عملاء تملأ مسار المبيعات — دون ضجيج زائد.",
      visual: "leads",
    },
    {
      title: "تديرهم بسهولة",
      desc: "عملاء ومدفوعات ومتابعة — في شاشة واحدة نظيفة وواضحة.",
      visual: "manage",
    },
    {
      title: "ترى نمواً حقيقياً",
      desc: "تقارير ومؤشرات توضح بالضبط ما الذي يجب تحسينه للنمو.",
      visual: "growth",
    },
  ],
  testimonialTitle: "أعمال تنمو معنا",
  testimonialSubtitle: "من عملائنا — بكلماتهم.",
  testimonials: [
    {
      name: "داني ك.",
      role: "مالك، استوديو رقمي",
      quote: "أخيراً نرى من أين تأتي العملاء المحتملة وماذا يستحق الاستثمار.",
    },
    {
      name: "ميكال ر.",
      role: "مديرة تنفيذية، شبكة مقاهي",
      quote: "النظام يبدو فاخراً — العملاء يفهمون أننا جادون.",
    },
    {
      name: "أورن ش.",
      role: "رائد أعمال",
      quote: "انتقلنا من فوضى الإكسل إلى مكان واحد يمكن النمو منه.",
    },
  ],
  ctaTitle: "هل أنتم مستعدون لرفع عملكم إلى المستوى التالي؟",
  ctaSubtitle: "حان الوقت لجلب المزيد من العملاء وزيادة الإيرادات",
  pricingTitle: "عملكم لا يجب أن يعمل بجد — بل أن يعمل بذكاء",
  pricingSubtitle:
    "اختروا مستوى — ثم انتقلوا إلى دفع آمن. جميع الباقات تشمل الإدارة والنمو على نفس المنصة.",
};
