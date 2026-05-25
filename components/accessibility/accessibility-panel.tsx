"use client";

import {
  IconAccessibility,
  IconClose,
  IconContrast,
  IconCursor,
  IconGrayscale,
  IconLink,
  IconMotion,
  IconReadingLine,
  IconReset,
  IconTextSize,
} from "@/components/accessibility/accessibility-icons";
import { A11yToggleCard } from "@/components/accessibility/accessibility-ui";
import { useAccessibility } from "@/components/accessibility/accessibility-provider";
import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";
import { FONT_SCALE_MAX, FONT_SCALE_MIN } from "@/lib/accessibility/types";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef } from "react";

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function useFocusTrap(active: boolean, containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const root = containerRef.current;
    const focusables = () => Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));

    const t = window.setTimeout(() => focusables()[0]?.focus(), 80);

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const nodes = focusables();
      if (nodes.length === 0) return;
      const firstEl = nodes[0];
      const lastEl = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [active, containerRef]);
}

export function AccessibilityPanel() {
  const { t } = useLandingI18n();
  const {
    settings,
    panelOpen,
    closePanel,
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
  } = useAccessibility();

  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(panelOpen, panelRef);

  useEffect(() => {
    if (!panelOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [panelOpen, closePanel]);

  const scalePercent = Math.round(settings.fontScale * 100);
  const scaleProgress =
    ((settings.fontScale - FONT_SCALE_MIN) / (FONT_SCALE_MAX - FONT_SCALE_MIN)) * 100;

  return (
    <AnimatePresence>
      {panelOpen ? (
        <>
          <motion.div
            className="wego-a11y-backdrop"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={closePanel}
          />
          <motion.div
            ref={panelRef}
            className="wego-a11y-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
          >
            <header className="wego-a11y-panel__header">
              <button
                type="button"
                className="wego-a11y-panel__close"
                onClick={closePanel}
                aria-label={t("accessibility.close")}
              >
                <IconClose className="wego-a11y-panel__close-icon" />
              </button>

              <div className="wego-a11y-panel__header-main">
                <div className="wego-a11y-panel__header-icon" aria-hidden>
                  <IconAccessibility />
                </div>
                <div className="wego-a11y-panel__header-text">
                  <h2 id={titleId} className="wego-a11y-panel__title">
                    {t("accessibility.panelTitle")}
                  </h2>
                  <p className="wego-a11y-panel__sub">{t("accessibility.panelSubtitle")}</p>
                </div>
              </div>
            </header>

            <div className="wego-a11y-panel__body">
              <section className="wego-a11y-section" aria-labelledby={`${titleId}-text`}>
                <h3 id={`${titleId}-text`} className="wego-a11y-section__title">
                  {t("accessibility.sectionText")}
                </h3>

                <div className="wego-a11y-card wego-a11y-card--text">
                  <div className="wego-a11y-card__text-head">
                    <span className="wego-a11y-card__icon" aria-hidden>
                      <IconTextSize />
                    </span>
                    <span className="wego-a11y-card__label">{t("accessibility.textSizeLabel")}</span>
                    <span className="wego-a11y-card__value" aria-live="polite">
                      {scalePercent}%
                    </span>
                  </div>
                  <div className="wego-a11y-stepper">
                    <button
                      type="button"
                      className="wego-a11y-stepper__btn"
                      onClick={decreaseText}
                      aria-label={t("accessibility.decreaseText")}
                    >
                      −
                    </button>
                    <div className="wego-a11y-stepper__track" aria-hidden>
                      <div className="wego-a11y-stepper__fill" style={{ width: `${scaleProgress}%` }} />
                    </div>
                    <button
                      type="button"
                      className="wego-a11y-stepper__btn"
                      onClick={increaseText}
                      aria-label={t("accessibility.increaseText")}
                    >
                      +
                    </button>
                  </div>
                  <button type="button" className="wego-a11y-card__text-reset" onClick={resetTextSize}>
                    {t("accessibility.resetTextSize")}
                  </button>
                </div>
              </section>

              <section className="wego-a11y-section" aria-labelledby={`${titleId}-display`}>
                <h3 id={`${titleId}-display`} className="wego-a11y-section__title">
                  {t("accessibility.sectionDisplay")}
                </h3>
                <div className="wego-a11y-cards">
                  <A11yToggleCard
                    switchId={`${titleId}-contrast`}
                    icon={<IconContrast />}
                    label={t("accessibility.highContrast")}
                    checked={settings.highContrast}
                    onToggle={toggleHighContrast}
                  />
                  <A11yToggleCard
                    switchId={`${titleId}-gray`}
                    icon={<IconGrayscale />}
                    label={t("accessibility.grayscale")}
                    checked={settings.grayscale}
                    onToggle={toggleGrayscale}
                  />
                  <A11yToggleCard
                    switchId={`${titleId}-motion`}
                    icon={<IconMotion />}
                    label={t("accessibility.stopAnimations")}
                    checked={settings.stopAnimations}
                    onToggle={toggleStopAnimations}
                  />
                  <A11yToggleCard
                    switchId={`${titleId}-links`}
                    icon={<IconLink />}
                    label={t("accessibility.underlineLinks")}
                    checked={settings.underlineLinks}
                    onToggle={toggleUnderlineLinks}
                  />
                </div>
              </section>

              <section className="wego-a11y-section" aria-labelledby={`${titleId}-tools`}>
                <h3 id={`${titleId}-tools`} className="wego-a11y-section__title">
                  {t("accessibility.sectionTools")}
                </h3>
                <div className="wego-a11y-cards">
                  <A11yToggleCard
                    switchId={`${titleId}-cursor`}
                    icon={<IconCursor />}
                    label={t("accessibility.bigCursor")}
                    checked={settings.bigCursor}
                    onToggle={toggleBigCursor}
                  />
                  <A11yToggleCard
                    switchId={`${titleId}-reading`}
                    icon={<IconReadingLine />}
                    label={t("accessibility.readingLine")}
                    checked={settings.readingLine}
                    onToggle={toggleReadingLine}
                  />
                </div>
              </section>
            </div>

            <footer className="wego-a11y-panel__footer">
              <button type="button" className="wego-a11y-reset" onClick={resetAll}>
                <IconReset className="wego-a11y-reset__icon" />
                <span>{t("accessibility.resetAll")}</span>
              </button>
            </footer>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
