import type { SystemCardId } from "@/components/landing/systems-data";

const stroke = 1.5;

export function SystemCardIcon({ type, className }: { type: SystemCardId; className?: string }) {
  const c = className ?? "lp-systems-card__icon-svg";

  switch (type) {
    case "financial":
      return (
        <svg className={c} viewBox="0 0 64 64" fill="none" aria-hidden>
          <rect x="8" y="14" width="48" height="36" rx="8" stroke="currentColor" strokeWidth={stroke} />
          <path d="M8 24h48" stroke="currentColor" strokeWidth={stroke} />
          <circle cx="20" cy="38" r="4" stroke="currentColor" strokeWidth={stroke} />
          <path
            d="M30 38h18M30 32h12"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          <path
            d="M44 18v-2a4 4 0 00-8 0v2"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
        </svg>
      );
    case "team":
      return (
        <svg className={c} viewBox="0 0 64 64" fill="none" aria-hidden>
          <circle cx="24" cy="22" r="6" stroke="currentColor" strokeWidth={stroke} />
          <circle cx="42" cy="24" r="5" stroke="currentColor" strokeWidth={stroke} />
          <path
            d="M12 46c0-6.627 5.373-12 12-12s12 5.373 12 12M34 46c0-5 4-9 9-9"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          <rect x="40" y="34" width="14" height="14" rx="3" stroke="currentColor" strokeWidth={stroke} />
          <path d="M44 40h6M44 44h4" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
        </svg>
      );
    case "integrated":
      return (
        <svg className={c} viewBox="0 0 64 64" fill="none" aria-hidden>
          <path
            d="M32 10l6 12 13 2-9 9 2 13-12-6-12 6 2-13-9-9 13-2 6-12z"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinejoin="round"
          />
          <circle cx="32" cy="32" r="10" stroke="currentColor" strokeWidth={stroke} opacity="0.5" />
          <path
            d="M28 32l3 3 6-7"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "custom":
      return (
        <svg className={c} viewBox="0 0 64 64" fill="none" aria-hidden>
          <path
            d="M28 12H16a4 4 0 00-4 4v32a4 4 0 004 4h32a4 4 0 004-4V36"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          <path
            d="M40 8h12v12M28 36L52 12"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="28" r="2" fill="currentColor" />
          <circle cx="32" cy="36" r="2" fill="currentColor" />
          <circle cx="20" cy="40" r="2" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}
