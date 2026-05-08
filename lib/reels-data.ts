/**
 * רילים לאזור התצוגה השיווקית — ניתן להוסיף posterSrc (נתיב ב־/public) לתמונת תצוגה מקדימה.
 */

export type MarketingReel = {
  /** קישור מלא לריל באינסטגרם */
  permalink: string;
  /** תווית קטגוריה על הכרטיס */
  label: string;
  /** תמונה סטטית מ־/public — קודמת על טעינת og:image מהשרת */
  posterSrc?: string;
  /**
   * סרטון מקומי לתצוגה מקדימה (מומלץ mp4, יחס 9:16) — /public/reels/foo.mp4
   * כשמוגדר: מוצג ישירות עם autoplay ללא תלות ב־Instagram.
   */
  previewVideoSrc?: string;
  /**
   * תמונת תצוגה קבועה (פריים מהריל) — אם השרת לא מצליח למשוך מ־Instagram.
   * נתיב ב־/public או URL מלא לתמונה.
   */
  thumbnailOverrideSrc?: string;
};

export function reelShortcodeFromPermalink(permalink: string): string | null {
  const m = permalink.match(/instagram\.com\/(?:reel|p)\/([^/?#]+)/i);
  return m?.[1] ?? null;
}

export const DEFAULT_MARKETING_REELS: MarketingReel[] = [
  {
    permalink: "https://www.instagram.com/reel/DW7GSMgCKVV/?igsh=YTgxMjd5YjkxOW93",
    label: "שיווק",
  },
  {
    permalink: "https://www.instagram.com/reel/DXMoHpVDBSS/?igsh=c2R3eHp4Y21wZjJw",
    label: "מסעדות",
  },
  {
    permalink: "https://www.instagram.com/reel/DW_f9mHCMG-/?igsh=MWNydzMxdGpxN2txNw==",
    label: "נדל״ן",
  },
  {
    permalink: "https://www.instagram.com/reel/DV1Wc6wIRtI/?igsh=MmM3aGRmbm04a2t4",
    label: "צילום",
  },
  {
    permalink: "https://www.instagram.com/reel/DWEXpc-CHu6/?igsh=NmNwOWVncWF3MDg2",
    label: "עסקים",
  },
  {
    permalink: "https://www.instagram.com/reel/DWl6udGCHMp/?igsh=MTgycmVlMmxkZDRqNw==",
    label: "תוכן",
  },
];
