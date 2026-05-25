type IconProps = { className?: string };

export function IconAccessibility({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.25" opacity="0.85" />
      <circle cx="12" cy="6.25" r="1.1" fill="currentColor" />
      <path d="M8.5 9.2c.6-1.6 2-2.45 3.5-2.45s2.9.85 3.5 2.45" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M9 14.2h6M9 17h6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

export function IconTextSize({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 6h6M5 10h4" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <path d="M14 16l4-6h-3l4-6" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconContrast({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.25" />
      <path d="M12 3.75v16.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M12 3.75a8.25 8.25 0 000 16.5" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

export function IconGrayscale({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.25" />
      <path d="M6 18c4-6 8-6 12 0" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function IconMotion({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 12h3l2-4 2 8 2-4h3" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconLink({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9.5 14.5l-2 2a3 3 0 104.24-4.24l1.06-1.06M14.5 9.5l2-2a3 3 0 10-4.24 4.24l-1.06 1.06"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path d="M8 16l8-8" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

export function IconCursor({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 5l4 14 2.2-5.2L18 11.5 6 5z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.2"
      />
    </svg>
  );
}

export function IconReadingLine({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 8h16M4 12h16M4 16h10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.45" />
      <rect x="3" y="10.5" width="18" height="3" rx="1" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

export function IconReset({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 5v3l3-3M12 19v-3l-3 3"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 9.5a6 6 0 0110.2-2.2M17.5 14.5a6 6 0 01-10.2 2.2"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconClose({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
