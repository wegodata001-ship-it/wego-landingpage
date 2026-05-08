import type { LandingServiceIcon } from "@/lib/landing-config";
import type { ServiceModalBody } from "@/lib/service-modal-types";

export const SERVICE_MODALS_HE: Record<LandingServiceIcon, ServiceModalBody> = {
  launch: {
    title: "פותחים עסק נכון מההתחלה",
    subtitle: "בלי טעויות שעולות כסף",
    description:
      "ליווי מלא מהרעיון ועד פתיחה חכמה, עם תהליך מסודר שמונע טעויות יקרות וחוסך זמן.",
    featureCards: [
      { icon: "target", title: "תכנון עסקי מדויק", desc: "בניית תוכנית עסקית חכמה שמונעת טעויות" },
      { icon: "check", title: "בניית יסודות חזקים", desc: "רישוי, מבנה עסקי ותשתיות נכונות" },
      { icon: "rocket", title: "חיסכון בזמן וכסף", desc: "מניעת טעויות שעולות עשרות אלפים" },
      { icon: "compass", title: "ליווי צמוד", desc: "לא נשארים לבד בתהליך" },
    ],
    ctaTitle: "התחייבות לתוצאות",
    ctaText: "אנחנו מייעלים את העסק שלך\nומחזירים לך את ההשקעה\nפי 3 לפחות",
    ctaButton: "בואו נתחיל לבנות את העסק שלך",
  },
  megaphone: {
    title: "מביאים לך לקוחות",
    titleSecondLine: "שיווק שמייצר תוצאות אמיתיות",
    highlightWord: "מיתוג",
    subtitle: "מביאים לך לקוחות בפועל — בלי שתתעסק בשיווק",
    description: "שיווק מדויק שמייצר תנועה איכותית לעסק והופך קהל נכון ללקוחות משלמים.",
    featureCards: [
      { icon: "target", title: "אסטרטגיה מותאמת אישית", desc: "בניית אסטרטגיה מדויקת לעסק שלך" },
      { icon: "camera", title: "הפקת תוכן וימי צילום", desc: "יצירת תוכן מקצועי שמושך לקוחות" },
      { icon: "megaphone", title: "ניהול קמפיינים חכמים", desc: "קמפיינים מבוססי תוצאות" },
      { icon: "users", title: "עבודה עם משפיענים", desc: "הגדלת חשיפה ואמון" },
    ],
    ctaTitle: "התחייבות לתוצאות",
    ctaText: "אנחנו מביאים לך לקוחות —\nאתה מתמקד בעסק שלך\nפי 3 החזר השקעה לפחות",
    ctaButton: "צפו בעבודות ב-WEGO MARKETING",
    ctaBrandEmbed: "WEGO MARKETING",
  },
  orbit: {
    title: "אנחנו מנהלים — אתה מתמקד",
    subtitle: "שליטה מלאה בעסק שלך",
    description: "מעטפת ניהול מלאה ששומרת על סדר, מטפלת בחסמים ומבטיחה תמונת מצב ברורה בכל רגע.",
    featureCards: [
      { icon: "dashboard", title: "סדר וארגון", desc: "הכל מסודר וברור" },
      { icon: "settings", title: "ניהול שוטף", desc: "פתרון בעיות בזמן אמת" },
      { icon: "alert", title: "טיפול במשברים", desc: "מונעים בעיות לפני שהן גדלות" },
      { icon: "shield", title: "שליטה מלאה", desc: "תמונה מלאה על העסק שלך" },
    ],
    ctaTitle: "התחייבות לתוצאות",
    ctaText: "אנחנו מייעלים את העסק שלך\nומחזירים לך את ההשקעה\nפי 3 לפחות",
    ctaButton: "שלחו הודעה להתייעצות",
  },
  partners: {
    title: "ניהול שותפויות שמייצר צמיחה אמיתית",
    subtitle: "בונים שותפויות שמביאות לקוחות והכנסות",
    description:
      "שותפויות יכולות להקפיץ עסק — או להפיל אותו.\nאנחנו בונים תהליכים נכונים, מנהלים את השותפות ומביאים תוצאות אמיתיות.",
    featureCards: [
      { icon: "users", title: "הגדרת תפקידים ברורה", desc: "מונעים חיכוכים לפני שהם מתחילים" },
      { icon: "balance", title: "ניהול קונפליקטים נכון", desc: "שומרים על יציבות העסק" },
      { icon: "file", title: "בניית הסכמים חכמים", desc: "שותפות יציבה לאורך זמן" },
    ],
    ctaTitle: "התחייבות לתוצאות",
    ctaText: "אנחנו מייעלים את העסק שלך\nומחזירים לך את ההשקעה\nפי 3 לפחות",
    ctaButton: "בואו נבנה שותפות מנצחת",
  },
  ledger: {
    title: "שליטה מלאה בכסף שלך",
    subtitle: "ניהול פיננסי חכם שמגדיל רווח",
    description: "שיטה פיננסית ברורה שמחברת בין מספרים, תכנון ופעולות כדי לשפר רווחיות ולשמור על יציבות.",
    featureCards: [
      { icon: "wallet", title: "סדר בכסף", desc: "כל הנתונים במקום אחד וברור" },
      { icon: "calculator", title: "תכנון מס חכם", desc: "פחות לשלם – יותר להרוויח" },
      { icon: "chart", title: "שליטה בתזרים", desc: "ניהול נכון של הכנסות והוצאות" },
      { icon: "file", title: "ליווי מקצועי", desc: "רואה חשבון שמלווה אותך" },
    ],
    ctaTitle: "התחייבות לתוצאות",
    ctaText: "אנחנו דואגים לכסף שלך\nכדי שאתה תתמקד בעסק",
    ctaButton: "שלח הודעה להתייעצות",
  },
  scale: {
    title: "בודקים אם זה שווה לך",
    subtitle: "לפני שאתה משקיע שקל",
    description: "לפני כל צעד כלכלי בודקים את המספרים לעומק כדי להימנע מהפסדים ולבחור נכון.",
    featureCards: [
      { icon: "chart", title: "ניתוח שוק", desc: "בדיקת ביקוש ותחרות" },
      { icon: "analytics", title: "תחזית רווח", desc: "הכנסות מול הוצאות" },
      { icon: "alert", title: "זיהוי סיכונים", desc: "מה יכול להשתבש" },
      { icon: "balance", title: "החלטה חכמה", desc: "GO / NO GO ברור" },
    ],
    ctaTitle: "התחייבות לתוצאות",
    ctaText: "אנחנו מייעלים את העסק שלך\nומחזירים לך את ההשקעה\nפי 3 לפחות",
    ctaButton: "דברו איתנו לפני שאתם משקיעים",
  },
};
