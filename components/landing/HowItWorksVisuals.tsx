"use client";

/** Step 1 — לידים ושיווק: משפך + מטרה */
export function HowVisualLeads({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="hw-l-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5d06f" />
          <stop offset="100%" stopColor="#c9a227" />
        </linearGradient>
        <linearGradient id="hw-l-blue" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.4" />
        </linearGradient>
        <filter id="hw-l-glow" x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="hw-l-rad" cx="50%" cy="65%" r="55%">
          <stop offset="0%" stopColor="rgba(96,165,250,0.35)" />
          <stop offset="100%" stopColor="rgba(11,26,43,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="110" cy="95" rx="88" ry="48" fill="url(#hw-l-rad)" />
      {/* funnel */}
      <path
        d="M62 38 L158 38 L132 118 L88 118 Z"
        fill="rgba(15,39,68,0.65)"
        stroke="url(#hw-l-blue)"
        strokeWidth="1.5"
      />
      <path
        d="M72 52 L148 52 L128 108 L92 108 Z"
        fill="url(#hw-l-blue)"
        opacity="0.22"
      />
      {/* audience dots */}
      <circle cx="95" cy="28" r="5" fill="url(#hw-l-gold)" opacity="0.9" />
      <circle cx="110" cy="22" r="6" fill="rgba(96,165,250,0.85)" />
      <circle cx="125" cy="28" r="5" fill="url(#hw-l-gold)" opacity="0.75" />
      <circle cx="102" cy="34" r="4" fill="rgba(255,255,255,0.35)" />
      <circle cx="118" cy="34" r="4" fill="rgba(255,255,255,0.25)" />
      {/* target */}
      <g filter="url(#hw-l-glow)" transform="translate(158, 72)">
        <circle r="26" stroke="url(#hw-l-gold)" strokeWidth="2.5" opacity="0.95" />
        <circle r="16" stroke="rgba(96,165,250,0.85)" strokeWidth="2" />
        <circle r="6" fill="url(#hw-l-gold)" />
      </g>
    </svg>
  );
}

/** Step 2 — ניהול: לוח בקרה */
export function HowVisualManage({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="hw-m-panel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(59,130,246,0.35)" />
          <stop offset="100%" stopColor="rgba(15,39,68,0.85)" />
        </linearGradient>
        <linearGradient id="hw-m-accent" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f5d06f" />
          <stop offset="100%" stopColor="#a67c00" />
        </linearGradient>
        <filter id="hw-m-soft" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect
        x="36"
        y="28"
        width="148"
        height="98"
        rx="16"
        fill="rgba(11,26,43,0.55)"
        stroke="rgba(96,165,250,0.45)"
        strokeWidth="1.3"
      />
      <rect x="48" y="42" width="52" height="36" rx="8" fill="url(#hw-m-panel)" stroke="rgba(245,208,111,0.25)" strokeWidth="1" />
      <rect x="108" y="42" width="64" height="14" rx="5" fill="rgba(255,255,255,0.08)" />
      <rect x="108" y="62" width="48" height="10" rx="4" fill="rgba(255,255,255,0.06)" />
      <rect x="48" y="86" width="124" height="28" rx="8" fill="url(#hw-m-panel)" opacity="0.9" />
      <g filter="url(#hw-m-soft)">
        <rect x="58" y="96" width="10" height="22" rx="2" fill="rgba(59,130,246,0.75)" />
        <rect x="74" y="88" width="10" height="30" rx="2" fill="rgba(96,165,250,0.55)" />
        <rect x="90" y="80" width="10" height="38" rx="2" fill="url(#hw-m-accent)" opacity="0.85" />
        <rect x="106" y="92" width="10" height="26" rx="2" fill="rgba(59,130,246,0.6)" />
        <rect x="122" y="84" width="10" height="34" rx="2" fill="rgba(96,165,250,0.45)" />
      </g>
      <circle cx="178" cy="48" r="6" fill="url(#hw-m-accent)" opacity="0.9" />
    </svg>
  );
}

/** Step 3 — צמיחה: גרף עולה */
export function HowVisualGrowth({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="hw-g-area" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(59,130,246,0.45)" />
          <stop offset="100%" stopColor="rgba(59,130,246,0)" />
        </linearGradient>
        <linearGradient id="hw-g-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#f5d06f" />
        </linearGradient>
        <filter id="hw-g-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M32 108 L64 88 L96 96 L132 58 L168 68 L196 42 L196 118 L32 118 Z"
        fill="url(#hw-g-area)"
        opacity="0.85"
      />
      <path
        d="M32 108 L64 88 L96 96 L132 58 L168 68 L196 42"
        stroke="url(#hw-g-line)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#hw-g-glow)"
      />
      <path
        d="M168 68 L196 42"
        stroke="url(#hw-g-line)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.9"
      />
      <circle cx="196" cy="42" r="9" fill="#f5d06f" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
      <path
        d="M152 32 L188 24 L182 44 Z"
        fill="rgba(212,175,55,0.25)"
        stroke="rgba(245,208,111,0.5)"
        strokeWidth="1"
      />
      <path
        d="M170 30l2 5 5 1-5 1-2 5-2-5-5-1 5-1z"
        fill="rgba(245,208,111,0.95)"
      />
    </svg>
  );
}
