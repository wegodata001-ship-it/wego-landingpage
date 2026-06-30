import type { LandingCoreItem, LandingServiceIcon } from "@/lib/landing-config";

const size = 28;
const stroke = 1.6;
const svcSize = 32;
const svcStroke = 1.5;

export function CoreIcon({ type }: { type: LandingCoreItem["icon"] }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, className: "lp-core-icon" };
  switch (type) {
    case "users":
      return (
        <svg {...common}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "crm":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      );
    case "payment":
      return (
        <svg {...common}>
          <rect x="1" y="4" width="22" height="16" rx="2" />
          <path d="M1 10h22" />
        </svg>
      );
    case "chart":
    default:
      return (
        <svg {...common}>
          <path d="M3 3v18h18" />
          <path d="M7 12l4-4 4 4 6-6" />
        </svg>
      );
  }
}

const iconSm = 18;

export function FeatureCheckIcon() {
  return (
    <span className="lp-pricing-feat-icon" aria-hidden>
      <svg width={iconSm} height={iconSm} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>
  );
}

export type ModalFeatureIconType =
  | "target"
  | "chart"
  | "settings"
  | "rocket"
  | "camera"
  | "megaphone"
  | "users"
  | "compass"
  | "layers"
  | "check"
  | "wallet"
  | "scale"
  | "brain"
  | "file"
  | "bank"
  | "shield"
  | "handshake"
  | "alert"
  | "dashboard"
  | "analytics"
  | "calculator"
  | "balance"
  | "funnel";

export function ModalFeatureIcon({ type }: { type: ModalFeatureIconType }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (type) {
    case "target":
      return <svg {...common}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 2v2M22 12h-2M12 22v-2M2 12h2" /></svg>;
    case "chart":
      return <svg {...common}><path d="M3 3v18h18" /><path d="M7 14l3-3 3 2 4-5" /></svg>;
    case "settings":
      return <svg {...common}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 1 1-4 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 1 1 0-4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2H9a1 1 0 0 0 .6-.9V4a2 2 0 1 1 4 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1V9c0 .4.2.7.6.9H20a2 2 0 1 1 0 4h-.2a1 1 0 0 0-.9.6z" /></svg>;
    case "rocket":
      return <svg {...common}><path d="M14 3l7 7-5 6-6 5-2-2 5-6 6-5z" /><path d="M9 15l-4 4M5 19l2-5" /></svg>;
    case "camera":
      return <svg {...common}><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M9 7l1.5-2h3L15 7" /><circle cx="12" cy="14" r="3" /></svg>;
    case "megaphone":
      return <svg {...common}><path d="M3 11v2a2 2 0 0 0 2 2h2l4 3V6L7 9H5a2 2 0 0 0-2 2z" /><path d="M16 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" /></svg>;
    case "users":
      return <svg {...common}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></svg>;
    case "compass":
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M15 9l-2 5-5 2 2-5 5-2z" /></svg>;
    case "layers":
      return <svg {...common}><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 12l9 5 9-5" /><path d="M3 16l9 5 9-5" /></svg>;
    case "check":
      return <svg {...common}><path d="M20 6L9 17l-5-5" /></svg>;
    case "wallet":
      return <svg {...common}><rect x="2" y="6" width="20" height="14" rx="2" /><path d="M16 12h6" /><circle cx="16" cy="12" r="1" /></svg>;
    case "scale":
      return <svg {...common}><path d="M12 3v18M5 8h14M6 8l-3 6h6l-3-6zm12 0-3 6h6l-3-6" /></svg>;
    case "brain":
      return <svg {...common}><path d="M8 5a3 3 0 0 0-3 3v1a3 3 0 0 0 0 6h1M16 5a3 3 0 0 1 3 3v1a3 3 0 0 1 0 6h-1" /><path d="M9 5a3 3 0 0 1 6 0v14a3 3 0 0 1-6 0z" /></svg>;
    case "file":
      return <svg {...common}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>;
    case "bank":
      return <svg {...common}><path d="M3 10h18M5 10v8M10 10v8M14 10v8M19 10v8M2 18h20M12 2l10 6H2z" /></svg>;
    case "shield":
      return <svg {...common}><path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z" /><path d="M9 12l2 2 4-4" /></svg>;
    case "alert":
      return <svg {...common}><path d="M12 9v4M12 17h.01" /><path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /></svg>;
    case "dashboard":
      return <svg {...common}><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="5" rx="1.5" /><rect x="13" y="10" width="8" height="11" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /></svg>;
    case "analytics":
      return <svg {...common}><path d="M3 3v18h18" /><path d="M7 14l3-3 3 2 4-5" /><path d="M20 7l-3 0" /></svg>;
    case "calculator":
      return <svg {...common}><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M8 6h8M8 10h2M12 10h2M16 10h0M8 14h2M12 14h2M16 14h0M8 18h2M12 18h2M16 18h0" /></svg>;
    case "balance":
      return <svg {...common}><path d="M12 3v18M5 8h14M6 8l-3 6h6l-3-6zm12 0-3 6h6l-3-6" /></svg>;
    case "funnel":
      return <svg {...common}><path d="M3 4h18l-7 8v6l-4 2v-8L3 4z" /></svg>;
    case "handshake":
    default:
      return <svg {...common}><path d="M8 12l3 3 3-3M4 8l4 4m12-4-4 4M2 12l4 4a2 2 0 0 0 3 0l1-1m12-3-4 4a2 2 0 0 1-3 0l-1-1" /></svg>;
  }
}

const svcCommon = {
  width: svcSize,
  height: svcSize,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: svcStroke,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "lp-service-card__svg",
} as const;

export function ServiceGridIcon({ type }: { type: LandingServiceIcon }) {
  switch (type) {
    case "finance":
      return (
        <svg {...svcCommon}>
          <rect x="2" y="6" width="20" height="13" rx="2.5" />
          <path d="M2 10h20" />
          <circle cx="17" cy="14.5" r="1.6" />
        </svg>
      );
    case "team":
      return (
        <svg {...svcCommon}>
          <path d="M17 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      );
    case "diary":
      return (
        <svg {...svcCommon}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 3v4M16 3v4M7 13h4M7 17h7" />
        </svg>
      );
    case "tasks":
      return (
        <svg {...svcCommon}>
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <path d="M9 3h6v3H9z" />
          <path d="M8.5 12l2 2 4-4" />
        </svg>
      );
    case "inventory":
      return (
        <svg {...svcCommon}>
          <path d="M3 7l9-4 9 4-9 4-9-4z" />
          <path d="M3 7v10l9 4 9-4V7" />
          <path d="M12 11v10" />
        </svg>
      );
    case "ai":
      return (
        <svg {...svcCommon}>
          <rect x="6" y="6" width="12" height="12" rx="3" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
          <circle cx="12" cy="12" r="2.2" />
        </svg>
      );
    case "crm":
      return (
        <svg {...svcCommon}>
          <path d="M3 5h18v11H7l-4 3V5z" />
          <path d="M8 9h8M8 12h5" />
        </svg>
      );
    case "launch":
      return (
        <svg {...svcCommon}>
          <path d="M14.5 3L4 14l2 5 5-1 9-10-5.5-5z" />
          <path d="M9 18l-5 3M12 8l4 4" />
        </svg>
      );
    case "megaphone":
      return (
        <svg {...svcCommon}>
          <path d="M3 11v2a2 2 0 002 2h2l4 3V6L7 9H5a2 2 0 00-2 2z" />
          <path d="M16 8.5a5 5 0 010 7M19 5a9 9 0 010 14" />
        </svg>
      );
    case "orbit":
      return (
        <svg {...svcCommon}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(25 12 12)" />
        </svg>
      );
    case "partners":
      return (
        <svg {...svcCommon}>
          <path d="M17 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      );
    case "ledger":
      return (
        <svg {...svcCommon}>
          <path d="M4 4h16v4H4zM4 10h16v10H4zM8 14h8M8 18h5" />
        </svg>
      );
    case "scale":
      return (
        <svg {...svcCommon}>
          <path d="M5 9l7-5 7 5M12 4v16M5 15h14" />
          <circle cx="8" cy="12" r="1.25" fill="currentColor" stroke="none" />
          <circle cx="16" cy="12" r="1.25" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}
