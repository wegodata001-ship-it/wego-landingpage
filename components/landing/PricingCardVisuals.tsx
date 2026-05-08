"use client";

export type PricingTierVisual = "basic" | "growth" | "premium";

/** בסיס — רקטה / התחלה */
export function PricingVisualBasic({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="pr-b-gold" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f5d06f" />
          <stop offset="100%" stopColor="#c9a227" />
        </linearGradient>
        <linearGradient id="pr-b-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
        </linearGradient>
        <filter id="pr-b-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="pr-b-rad" cx="50%" cy="70%" r="55%">
          <stop offset="0%" stopColor="rgba(96,165,250,0.35)" />
          <stop offset="100%" stopColor="rgba(11,26,43,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="88" rx="72" ry="40" fill="url(#pr-b-rad)" />
      <g filter="url(#pr-b-glow)">
        <path
          d="M100 32 L118 88 L108 88 L112 108 L100 98 L88 108 L92 88 L82 88 Z"
          fill="rgba(15,39,68,0.65)"
          stroke="url(#pr-b-blue)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="100" cy="56" r="9" fill="url(#pr-b-blue)" opacity="0.5" stroke="rgba(245,208,111,0.4)" strokeWidth="1.2" />
      </g>
      <path d="M94 108 L100 124 L106 108" fill="url(#pr-b-gold)" opacity="0.9" />
    </svg>
  );
}

/** צמיחה — גרף עולה */
export function PricingVisualGrowth({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="pr-g-area" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(59,130,246,0.45)" />
          <stop offset="100%" stopColor="rgba(59,130,246,0)" />
        </linearGradient>
        <linearGradient id="pr-g-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#f5d06f" />
        </linearGradient>
        <filter id="pr-g-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect x="40" y="32" width="120" height="86" rx="14" fill="rgba(11,26,43,0.45)" stroke="rgba(96,165,250,0.35)" strokeWidth="1.2" />
      <path
        d="M52 98 L76 78 L100 86 L132 52 L156 62 L156 104 L52 104 Z"
        fill="url(#pr-g-area)"
        opacity="0.9"
      />
      <path
        d="M52 98 L76 78 L100 86 L132 52 L156 62"
        stroke="url(#pr-g-line)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#pr-g-glow)"
      />
      <circle cx="156" cy="62" r="8" fill="#f5d06f" stroke="rgba(255,255,255,0.35)" strokeWidth="1.8" />
      <rect x="56" y="44" width="36" height="5" rx="2" fill="rgba(255,255,255,0.1)" />
    </svg>
  );
}

/** פרימיום — כתר / ניהול AI */
export function PricingVisualPremium({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="pr-p-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5d06f" />
          <stop offset="100%" stopColor="#a67c00" />
        </linearGradient>
        <linearGradient id="pr-p-blue" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.4" />
        </linearGradient>
        <filter id="pr-p-glow" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="2.8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M52 88 L68 48 L100 64 L132 48 L148 88 L140 108 L60 108 Z"
        fill="rgba(15,39,68,0.55)"
        stroke="url(#pr-p-blue)"
        strokeWidth="1.4"
        filter="url(#pr-p-glow)"
      />
      <path d="M68 52 L76 72 L100 62 L124 72 L132 52" stroke="url(#pr-p-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="76" cy="48" r="5" fill="url(#pr-p-gold)" />
      <circle cx="100" cy="40" r="6" fill="url(#pr-p-gold)" />
      <circle cx="124" cy="48" r="5" fill="url(#pr-p-gold)" />
      <rect x="72" y="92" width="56" height="22" rx="8" fill="url(#pr-p-blue)" opacity="0.35" stroke="rgba(245,208,111,0.35)" strokeWidth="1" />
      <path d="M88 100h24M88 106h16" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function PricingCardVisual({ tier, className }: { tier: PricingTierVisual; className?: string }) {
  switch (tier) {
    case "growth":
      return <PricingVisualGrowth className={className} />;
    case "premium":
      return <PricingVisualPremium className={className} />;
    default:
      return <PricingVisualBasic className={className} />;
  }
}
