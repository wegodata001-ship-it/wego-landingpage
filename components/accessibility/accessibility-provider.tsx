"use client";

import "@/components/accessibility/accessibility.css";
import { ReadingLine } from "@/components/accessibility/ReadingLine";
import {
  loadAccessibilitySettings,
  saveAccessibilitySettings,
} from "@/lib/accessibility/storage";
import {
  DEFAULT_A11Y_SETTINGS,
  FONT_SCALE_MAX,
  FONT_SCALE_MIN,
  FONT_SCALE_STEP,
  type AccessibilitySettings,
} from "@/lib/accessibility/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AccessibilityContextValue = {
  settings: AccessibilitySettings;
  hydrated: boolean;
  panelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  togglePanel: () => void;
  increaseText: () => void;
  decreaseText: () => void;
  resetTextSize: () => void;
  toggleHighContrast: () => void;
  toggleGrayscale: () => void;
  toggleStopAnimations: () => void;
  toggleUnderlineLinks: () => void;
  toggleBigCursor: () => void;
  toggleReadingLine: () => void;
  resetAll: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

function applySettingsToDocument(settings: AccessibilitySettings) {
  const root = document.documentElement;
  root.classList.add("wego-a11y-root");
  root.style.setProperty("--wego-a11y-font-scale", String(settings.fontScale));
  root.classList.toggle("wego-a11y-high-contrast", settings.highContrast);
  root.classList.toggle("wego-a11y-grayscale", settings.grayscale);
  root.classList.toggle("wego-a11y-stop-motion", settings.stopAnimations);
  root.classList.toggle("wego-a11y-underline-links", settings.underlineLinks);
  root.classList.toggle("wego-a11y-big-cursor", settings.bigCursor);
}

function clearDocumentClasses() {
  const root = document.documentElement;
  root.style.removeProperty("--wego-a11y-font-scale");
  root.classList.remove(
    "wego-a11y-root",
    "wego-a11y-high-contrast",
    "wego-a11y-grayscale",
    "wego-a11y-stop-motion",
    "wego-a11y-underline-links",
    "wego-a11y-big-cursor",
  );
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_A11Y_SETTINGS);
  const [hydrated, setHydrated] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  const persist = useCallback((next: AccessibilitySettings) => {
    setSettings(next);
    saveAccessibilitySettings(next);
    applySettingsToDocument(next);
  }, []);

  const patch = useCallback((partial: Partial<AccessibilitySettings>) => {
    setSettings((prev) => {
      const merged = { ...prev, ...partial };
      saveAccessibilitySettings(merged);
      applySettingsToDocument(merged);
      return merged;
    });
  }, []);

  useEffect(() => {
    const loaded = loadAccessibilitySettings();
    setSettings(loaded);
    applySettingsToDocument(loaded);
    setHydrated(true);
  }, []);

  const increaseText = useCallback(() => {
    setSettings((prev) => {
      const fontScale = Math.min(
        FONT_SCALE_MAX,
        Math.round((prev.fontScale + FONT_SCALE_STEP) * 10) / 10,
      );
      const merged = { ...prev, fontScale };
      saveAccessibilitySettings(merged);
      applySettingsToDocument(merged);
      return merged;
    });
  }, []);

  const decreaseText = useCallback(() => {
    setSettings((prev) => {
      const fontScale = Math.max(
        FONT_SCALE_MIN,
        Math.round((prev.fontScale - FONT_SCALE_STEP) * 10) / 10,
      );
      const merged = { ...prev, fontScale };
      saveAccessibilitySettings(merged);
      applySettingsToDocument(merged);
      return merged;
    });
  }, []);

  const resetTextSize = useCallback(() => patch({ fontScale: 1 }), [patch]);

  const toggleHighContrast = useCallback(() => {
    setSettings((prev) => {
      const merged = { ...prev, highContrast: !prev.highContrast };
      saveAccessibilitySettings(merged);
      applySettingsToDocument(merged);
      return merged;
    });
  }, []);

  const toggleGrayscale = useCallback(() => {
    setSettings((prev) => {
      const merged = { ...prev, grayscale: !prev.grayscale };
      saveAccessibilitySettings(merged);
      applySettingsToDocument(merged);
      return merged;
    });
  }, []);

  const toggleStopAnimations = useCallback(() => {
    setSettings((prev) => {
      const merged = { ...prev, stopAnimations: !prev.stopAnimations };
      saveAccessibilitySettings(merged);
      applySettingsToDocument(merged);
      return merged;
    });
  }, []);

  const toggleUnderlineLinks = useCallback(() => {
    setSettings((prev) => {
      const merged = { ...prev, underlineLinks: !prev.underlineLinks };
      saveAccessibilitySettings(merged);
      applySettingsToDocument(merged);
      return merged;
    });
  }, []);

  const toggleBigCursor = useCallback(() => {
    setSettings((prev) => {
      const merged = { ...prev, bigCursor: !prev.bigCursor };
      saveAccessibilitySettings(merged);
      applySettingsToDocument(merged);
      return merged;
    });
  }, []);

  const toggleReadingLine = useCallback(() => {
    setSettings((prev) => {
      const merged = { ...prev, readingLine: !prev.readingLine };
      saveAccessibilitySettings(merged);
      applySettingsToDocument(merged);
      return merged;
    });
  }, []);

  const resetAll = useCallback(() => {
    persist({ ...DEFAULT_A11Y_SETTINGS });
  }, [persist]);

  const openPanel = useCallback(() => setPanelOpen(true), []);
  const closePanel = useCallback(() => setPanelOpen(false), []);
  const togglePanel = useCallback(() => setPanelOpen((v) => !v), []);

  const value = useMemo(
    (): AccessibilityContextValue => ({
      settings,
      hydrated,
      panelOpen,
      openPanel,
      closePanel,
      togglePanel,
      increaseText,
      decreaseText,
      resetTextSize,
      toggleHighContrast,
      toggleGrayscale,
      toggleStopAnimations,
      toggleUnderlineLinks,
      toggleBigCursor,
      toggleReadingLine,
      resetAll,
    }),
    [
      settings,
      hydrated,
      panelOpen,
      openPanel,
      closePanel,
      togglePanel,
      increaseText,
      decreaseText,
      resetTextSize,
      toggleHighContrast,
      toggleGrayscale,
      toggleStopAnimations,
      toggleUnderlineLinks,
      toggleBigCursor,
      toggleReadingLine,
      resetAll,
    ],
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
      <ReadingLine />
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return ctx;
}

export { clearDocumentClasses };
