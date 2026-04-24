// ─── App Icon Registry ────────────────────────────────────────────
const iconProps = {
  width: 22,
  height: 22,
  fill: "none",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function AppIcon({ type, color, size = 22 }) {
  const p = { ...iconProps, width: size, height: size, stroke: color };

  switch (type) {
    case "options":
      return (
        <svg {...p} viewBox="0 0 24 24">
          <path d="M3 17l4-8 4 4 4-6 4 10" />
          <circle cx="7" cy="9" r="1.5" fill={color} stroke="none" />
          <circle cx="11" cy="13" r="1.5" fill={color} stroke="none" />
          <circle cx="15" cy="7" r="1.5" fill={color} stroke="none" />
          <circle cx="19" cy="17" r="1.5" fill={color} stroke="none" />
        </svg>
      );
    case "pnl":
      return (
        <svg {...p} viewBox="0 0 24 24">
          <path d="M4 20V10l8-6 8 6v10" />
          <rect x="9" y="13" width="6" height="7" rx="1" />
          <path d="M8 8h.01M16 8h.01" />
          <path d="M12 4v3" />
        </svg>
      );
    case "strategy":
      return (
        <svg {...p} viewBox="0 0 24 24">
          <rect x="2" y="14" width="5" height="7" rx="1" />
          <rect x="9.5" y="9" width="5" height="12" rx="1" />
          <rect x="17" y="4" width="5" height="17" rx="1" />
          <path d="M4.5 14V6M12 9V5M19.5 4V2" strokeDasharray="2 2" />
        </svg>
      );
    case "backtest":
      return (
        <svg {...p} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 6v6l4 2" />
          <path d="M3.5 8.5A9 9 0 0 1 12 3" strokeDasharray="3 2" />
        </svg>
      );
    case "heatmap":
      return (
        <svg {...p} viewBox="0 0 24 24">
          <rect
            x="3"
            y="3"
            width="8"
            height="8"
            rx="1.5"
            fill={color}
            fillOpacity="0.7"
          />
          <rect
            x="13"
            y="3"
            width="8"
            height="4"
            rx="1.5"
            fill={color}
            fillOpacity="0.3"
          />
          <rect
            x="13"
            y="9"
            width="8"
            height="3"
            rx="1.5"
            fill={color}
            fillOpacity="0.9"
          />
          <rect
            x="3"
            y="13"
            width="4"
            height="8"
            rx="1.5"
            fill={color}
            fillOpacity="0.5"
          />
          <rect
            x="9"
            y="13"
            width="6"
            height="4"
            rx="1.5"
            fill={color}
            fillOpacity="0.15"
          />
          <rect
            x="13"
            y="14"
            width="8"
            height="7"
            rx="1.5"
            fill={color}
            fillOpacity="0.6"
          />
          <rect
            x="9"
            y="19"
            width="2"
            height="2"
            rx="0.5"
            fill={color}
            fillOpacity="0.4"
          />
        </svg>
      );
    case "screener":
      return (
        <svg {...p} viewBox="0 0 24 24">
          <path d="M3 6h18M6 12h12M9 18h6" />
          <circle cx="18.5" cy="18.5" r="2.5" />
          <path d="M20.5 20.5L22 22" />
        </svg>
      );
    case "news":
      return (
        <svg {...p} viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M7 3v6" />
          <path d="M7 13h5M7 17h10" />
          <circle cx="16" cy="15" r="1" fill={color} stroke="none" />
        </svg>
      );
    case "risk":
      return (
        <svg {...p} viewBox="0 0 24 24">
          <path d="M12 3l9 17H3L12 3z" />
          <path d="M12 10v4" />
          <circle cx="12" cy="17" r="0.8" fill={color} stroke="none" />
        </svg>
      );
    case "sip":
      return (
        <svg {...p} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
          <path d="M8.5 19.5a9 9 0 0 0 7 0" strokeDasharray="2 2" />
        </svg>
      );
    case "chain":
      return (
        <svg {...p} viewBox="0 0 24 24">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      );
    case "algo":
      return (
        <svg {...p} viewBox="0 0 24 24">
          <rect x="2" y="6" width="6" height="4" rx="1" />
          <rect x="2" y="14" width="6" height="4" rx="1" />
          <rect x="16" y="10" width="6" height="4" rx="1" />
          <path d="M8 8h4M8 16h4M12 8v8M12 12h4" />
        </svg>
      );
    case "xray":
      return (
        <svg {...p} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="4" strokeDasharray="3 2" />
          <circle cx="12" cy="12" r="1" fill={color} stroke="none" />
          <path d="M3 12h2M19 12h2M12 3v2M12 19v2" />
        </svg>
      );
    default:
      return (
        <svg {...p} viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      );
  }
}
