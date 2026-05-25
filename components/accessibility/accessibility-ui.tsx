"use client";

import type { ReactNode } from "react";

export function A11ySwitch({
  id,
  checked,
  onChange,
  label,
}: {
  id: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`wego-a11y-switch${checked ? " is-on" : ""}`}
      onClick={onChange}
    >
      <span className="wego-a11y-switch__thumb" />
    </button>
  );
}

export function A11yToggleCard({
  icon,
  label,
  checked,
  onToggle,
  switchId,
}: {
  icon: ReactNode;
  label: string;
  checked: boolean;
  onToggle: () => void;
  switchId: string;
}) {
  return (
    <div className={`wego-a11y-card${checked ? " is-on" : ""}`}>
      <div className="wego-a11y-card__icon" aria-hidden>
        {icon}
      </div>
      <span className="wego-a11y-card__label">{label}</span>
      <A11ySwitch id={switchId} checked={checked} onChange={onToggle} label={label} />
    </div>
  );
}
