import {
  A11Y_STORAGE_KEY,
  DEFAULT_A11Y_SETTINGS,
  FONT_SCALE_MAX,
  FONT_SCALE_MIN,
  type AccessibilitySettings,
} from "@/lib/accessibility/types";

function clampScale(value: number): number {
  return Math.min(FONT_SCALE_MAX, Math.max(FONT_SCALE_MIN, Math.round(value * 10) / 10));
}

export function normalizeSettings(raw: Partial<AccessibilitySettings> | null | undefined): AccessibilitySettings {
  if (!raw) return { ...DEFAULT_A11Y_SETTINGS };
  return {
    fontScale: clampScale(typeof raw.fontScale === "number" ? raw.fontScale : DEFAULT_A11Y_SETTINGS.fontScale),
    highContrast: Boolean(raw.highContrast),
    grayscale: Boolean(raw.grayscale),
    stopAnimations: Boolean(raw.stopAnimations),
    underlineLinks: Boolean(raw.underlineLinks),
    bigCursor: Boolean(raw.bigCursor),
    readingLine: Boolean(raw.readingLine),
  };
}

export function loadAccessibilitySettings(): AccessibilitySettings {
  if (typeof window === "undefined") return { ...DEFAULT_A11Y_SETTINGS };
  try {
    const stored = localStorage.getItem(A11Y_STORAGE_KEY);
    if (!stored) return { ...DEFAULT_A11Y_SETTINGS };
    return normalizeSettings(JSON.parse(stored) as Partial<AccessibilitySettings>);
  } catch {
    return { ...DEFAULT_A11Y_SETTINGS };
  }
}

export function saveAccessibilitySettings(settings: AccessibilitySettings): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    /* quota / private mode */
  }
}
