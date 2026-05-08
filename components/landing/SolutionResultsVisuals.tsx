"use client";

/** Card 1 — החלטות חכמות: target, signal, analytics glow */
export function ResultsVisualDecisions({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="rs-d-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5d06f" />
          <stop offset="55%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#a67c00" />
        </linearGradient>
        <linearGradient id="rs-d-blue" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.35" />
        </linearGradient>
        <filter id="rs-d-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="rs-d-rad" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="rgba(96,165,250,0.45)" />
          <stop offset="100%" stopColor="rgba(11,26,43,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="72" rx="78" ry="52" fill="url(#rs-d-rad)" />
      {/* floating panel */}
      <rect
        x="38"
        y="28"
        width="124"
        height="78"
        rx="14"
        fill="rgba(15,39,68,0.55)"
        stroke="url(#rs-d-blue)"
        strokeWidth="1.2"
      />
      <rect x="48" y="40" width="48" height="6" rx="3" fill="rgba(255,255,255,0.12)" />
      <rect x="48" y="52" width="36" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
      {/* mini bars */}
      <rect x="48" y="68" width="10" height="22" rx="2" fill="url(#rs-d-blue)" opacity="0.85" />
      <rect x="62" y="62" width="10" height="28" rx="2" fill="rgba(96,165,250,0.5)" />
      <rect x="76" y="56" width="10" height="34" rx="2" fill="url(#rs-d-gold)" opacity="0.75" />
      {/* target rings */}
      <g filter="url(#rs-d-glow)" transform="translate(128, 52)">
        <circle r="22" stroke="url(#rs-d-gold)" strokeWidth="2.5" opacity="0.9" />
        <circle r="14" stroke="rgba(96,165,250,0.85)" strokeWidth="2" />
        <circle r="5" fill="url(#rs-d-gold)" />
      </g>
      {/* spark */}
      <path
        d="M34 24l3 6 6 2-6 2-3 6-3-6-6-2 6-2z"
        fill="url(#rs-d-gold)"
        opacity="0.95"
      />
    </svg>
  );
}

/** Card 2 — שליטה בעסק: growth chart */
export function ResultsVisualControl({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="rs-c-area" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(59,130,246,0.5)" />
          <stop offset="100%" stopColor="rgba(59,130,246,0)" />
        </linearGradient>
        <linearGradient id="rs-c-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#f5d06f" />
        </linearGradient>
        <linearGradient id="rs-c-bar" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <filter id="rs-c-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M28 98 L52 78 L78 88 L108 52 L138 62 L168 38 L172 102 L28 102 Z"
        fill="url(#rs-c-area)"
        opacity="0.85"
      />
      <path
        d="M28 98 L52 78 L78 88 L108 52 L138 62 L168 38"
        stroke="url(#rs-c-line)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#rs-c-glow)"
      />
      <g transform="translate(40, 96)">
        <rect x="0" y="-18" width="14" height="18" rx="3" fill="url(#rs-c-bar)" opacity="0.9" />
        <rect x="22" y="-32" width="14" height="32" rx="3" fill="url(#rs-c-bar)" />
        <rect x="44" y="-42" width="14" height="42" rx="3" fill="url(#rs-c-bar)" />
        <rect x="66" y="-56" width="14" height="56" rx="3" fill="url(#rs-c-bar)" />
        <rect x="88" y="-48" width="14" height="48" rx="3" fill="url(#rs-c-bar)" opacity="0.85" />
      </g>
      <circle cx="168" cy="38" r="7" fill="#f5d06f" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <path
        d="M152 22h20l-4 8h-12z"
        fill="rgba(212,175,55,0.35)"
        stroke="rgba(245,208,111,0.6)"
        strokeWidth="1"
      />
    </svg>
  );
}

/** Card 3 — שיווק ולקוחות: community + trust */
export function ResultsVisualMarketing({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="rs-m-shield" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(96,165,250,0.9)" />
          <stop offset="100%" stopColor="rgba(30,58,95,0.95)" />
        </linearGradient>
        <linearGradient id="rs-m-gold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f5d06f" />
          <stop offset="100%" stopColor="#c9a227" />
        </linearGradient>
        <filter id="rs-m-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* shield backdrop */}
      <path
        d="M100 22 L138 38 V72 C138 96 100 118 100 118 C100 118 62 96 62 72 V38 Z"
        fill="url(#rs-m-shield)"
        stroke="rgba(245,208,111,0.45)"
        strokeWidth="1.5"
        opacity="0.92"
        filter="url(#rs-m-soft)"
      />
      <path
        d="M100 40 L124 52 V68 C124 84 100 98 100 98 C100 98 76 84 76 68 V52 Z"
        fill="rgba(11,26,43,0.45)"
        stroke="rgba(96,165,250,0.5)"
        strokeWidth="1"
      />
      {/* people cluster */}
      <g fill="rgba(255,255,255,0.85)">
        <circle cx="88" cy="58" r="9" />
        <circle cx="112" cy="58" r="9" />
        <circle cx="100" cy="48" r="10" />
      </g>
      <path
        d="M78 78c0-6 5-11 11-11h22c6 0 11 5 11 11v6H78z"
        fill="url(#rs-m-gold)"
        opacity="0.35"
      />
      <path
        d="M95 68 L100 76 L108 64"
        stroke="url(#rs-m-gold)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
