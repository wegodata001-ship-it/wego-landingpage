"use client";

import { useAccessibility } from "@/components/accessibility/accessibility-provider";
import { IconAccessibility } from "@/components/accessibility/accessibility-icons";
import { useLandingI18n } from "@/components/i18n/LandingI18nProvider";

export function AccessibilityButton() {
  const { t } = useLandingI18n();
  const { panelOpen, togglePanel } = useAccessibility();

  return (
    <div className="wego-a11y-fab-wrap">
      <span className="wego-a11y-fab__pulse" aria-hidden />
      <button
        type="button"
        className={`wego-a11y-fab${panelOpen ? " is-open" : ""}`}
        onClick={togglePanel}
        aria-label={t("accessibility.tooltip")}
        aria-expanded={panelOpen}
        aria-haspopup="dialog"
      >
        <IconAccessibility className="wego-a11y-fab__icon" />
      </button>
      <span className="wego-a11y-fab__tooltip" role="tooltip">
        {t("accessibility.tooltip")}
      </span>
    </div>
  );
}
