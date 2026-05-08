import type { LandingServiceIcon } from "@/lib/landing-config";
import type { ServiceModalBody } from "@/lib/service-modal-types";

export const SERVICE_MODALS_AR: Record<LandingServiceIcon, ServiceModalBody> = {
  launch: {
    title: "نبدأ عملاً صحيحاً من الصفر",
    subtitle: "بدون أخطاء مكلفة",
    description:
      "مرافقة كاملة من الفكرة حتى الافتتاح الذكي، بعملية منظمة تمنع أخطاء باهظة وتوفّر الوقت.",
    featureCards: [
      { icon: "target", title: "تخطيط دقيق", desc: "خطة عمل ذكية تمنع الأخطاء" },
      { icon: "check", title: "أساسيات قوية", desc: "تراخيص وهيكل وبنية تحتية سليمة" },
      { icon: "rocket", title: "توفير وقت ومال", desc: "تجنّب أخطاء تكلف عشرات الآلاف" },
      { icon: "compass", title: "مرافقة وثيقة", desc: "لست وحدك في الرحلة" },
    ],
    ctaTitle: "التزام بالنتائج",
    ctaText: "نُحسّن عملك\nونعيد لك استثمارك\n3× على الأقل",
    ctaButton: "لنبدأ ببناء عملك",
  },
  megaphone: {
    title: "نجلب لك العملاء",
    titleSecondLine: "تسويق يحقق نتائج حقيقية",
    highlightWord: "الهوية",
    subtitle: "عملاء حقيقيون — دون أن تشغل نفسك بالتسويق",
    description: "تسويق دقيق يجلب حركة نوعية ويحوّل الجمهور المناسب إلى عملاء يدفعون.",
    featureCards: [
      { icon: "target", title: "استراتيجية مخصّصة", desc: "استراتيجية دقيقة لعملك" },
      { icon: "camera", title: "إنتاج محتوى وتصوير", desc: "محتوى احترافي يجذب العملاء" },
      { icon: "megaphone", title: "إدارة حملات ذكية", desc: "حملات مبنية على النتائج" },
      { icon: "users", title: "المؤثرون", desc: "زيادة التعرّض والثقة" },
    ],
    ctaTitle: "التزام بالنتائج",
    ctaText: "نحن نجلب العملاء —\nأنت تركّز على عملك\nعائد استثمار 3× على الأقل",
    ctaButton: "شاهد الأعمال في WEGO MARKETING",
    ctaBrandEmbed: "WEGO MARKETING",
  },
  orbit: {
    title: "نحن ندير — وأنت تركّز",
    subtitle: "تحكّم كامل في عملك",
    description:
      "غلاف إداري كامل يحافظ على النظام، يعالج العوائق ويضمن صورة واضحة في كل لحظة.",
    featureCards: [
      { icon: "dashboard", title: "نظام وتنظيم", desc: "كل شيء مرتب وواضح" },
      { icon: "settings", title: "إدارة يومية", desc: "حل للمشاكل في الوقت الفعلي" },
      { icon: "alert", title: "التعامل مع الأزمات", desc: "نمنع التصعيد قبل أن يكبر" },
      { icon: "shield", title: "سيطرة كاملة", desc: "صورة شاملة عن عملك" },
    ],
    ctaTitle: "التزام بالنتائج",
    ctaText: "نُحسّن عملك\nونعيد لك استثمارك\n3× على الأقل",
    ctaButton: "أرسل رسالة لاستشارة",
  },
  partners: {
    title: "إدارة شراكات تحقق نمواً حقيقياً",
    subtitle: "نبني شراكات تجلب عملاء وإيرادات",
    description:
      "الشراكات قد ترفع العمل — أو تسقطه.\nنبني عمليات صحيحة، ندير الشراكة ونحقق نتائج حقيقية.",
    featureCards: [
      { icon: "users", title: "أدوار واضحة", desc: "نمنع الاحتكاك قبل أن يبدأ" },
      { icon: "balance", title: "إدارة الصراع", desc: "نحافظ على استقرار العمل" },
      { icon: "file", title: "عقود ذكية", desc: "شراكة مستقرة على المدى الطويل" },
    ],
    ctaTitle: "التزام بالنتائج",
    ctaText: "نُحسّن عملك\nونعيد لك استثمارك\n3× على الأقل",
    ctaButton: "هيا نبني شراكة ناجحة",
  },
  ledger: {
    title: "سيطرة كاملة على أموالك",
    subtitle: "إدارة مالية ذكية تزيد الربح",
    description: "منهج مالي واضح يربط الأرقام والتخطيط والإجراءات لتحسين الربحية والاستقرار.",
    featureCards: [
      { icon: "wallet", title: "نظام في المال", desc: "كل البيانات في مكان واحد" },
      { icon: "calculator", title: "تخطيط ضريبي", desc: "تدفع أقل — تربح أكثر" },
      { icon: "chart", title: "التحكم في التدفق", desc: "إدارة صحيحة للدخل والمصروف" },
      { icon: "file", title: "مرافقة مهنية", desc: "محاسب يرافقك" },
    ],
    ctaTitle: "التزام بالنتائج",
    ctaText: "نهتم بأموالك\nلكي تركّز على عملك",
    ctaButton: "أرسل رسالة لاستشارة",
  },
  scale: {
    title: "نتحقق إن كان يستحق",
    subtitle: "قبل أن تستثمر شاقلاً",
    description: "قبل أي خطوة مالية نفحص الأرقام بعمق لتجنّب الخسائر واتخاذ القرار الصحيح.",
    featureCards: [
      { icon: "chart", title: "تحليل السوق", desc: "الطلب والمنافسة" },
      { icon: "analytics", title: "توقّع الربح", desc: "الدخل مقابل المصاريف" },
      { icon: "alert", title: "تحديد المخاطر", desc: "ما الذي قد يحدث" },
      { icon: "balance", title: "قرار واضح", desc: "GO / NO GO بكل وضوح" },
    ],
    ctaTitle: "التزام بالنتائج",
    ctaText: "نُحسّن عملك\nونعيد لك استثمارك\n3× على الأقل",
    ctaButton: "تحدثوا معنا قبل الاستثمار",
  },
};
