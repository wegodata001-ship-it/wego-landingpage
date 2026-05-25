export type AccessibilitySettings = {
  fontScale: number;
  highContrast: boolean;
  grayscale: boolean;
  stopAnimations: boolean;
  underlineLinks: boolean;
  bigCursor: boolean;
  readingLine: boolean;
};

export const DEFAULT_A11Y_SETTINGS: AccessibilitySettings = {
  fontScale: 1,
  highContrast: false,
  grayscale: false,
  stopAnimations: false,
  underlineLinks: false,
  bigCursor: false,
  readingLine: false,
};

export const A11Y_STORAGE_KEY = "wego-business-a11y-v1";
export const FONT_SCALE_MIN = 0.85;
export const FONT_SCALE_MAX = 1.5;
export const FONT_SCALE_STEP = 0.1;
