import { useEffect, useRef } from "react";
import { AppIcon } from "./AppIcons";

// ─── Close icon ───────────────────────────────────────────────────
function XIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ─── Fake sparkline ───────────────────────────────────────────────
function MiniSparkline({ color }) {
  const points = [20, 35, 28, 45, 38, 55, 42, 60, 52, 70, 65, 75];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const norm = (v) => 100 - ((v - min) / (max - min)) * 80 - 10;
  const W = 200,
    step = W / (points.length - 1);
  const d = points
    .map((v, i) => `${i === 0 ? "M" : "L"}${i * step},${norm(v)}`)
    .join(" ");
  const fill = `${d} L${(points.length - 1) * step},100 L0,100 Z`;
  return (
    <svg
      width="100%"
      height="80"
      viewBox={`0 0 ${W} 100`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient
          id={`sg-${color.replace("#", "")}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={fill} fill={`url(#sg-${color.replace("#", "")})`} />
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Stat card ────────────────────────────────────────────────────
function StatCard({ label, value, sub, color }) {
  return (
    <div className="modal-stat">
      <span className="modal-stat__label">{label}</span>
      <span className="modal-stat__value" style={{ color }}>
        {value}
      </span>
      {sub && <span className="modal-stat__sub">{sub}</span>}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────
export function AppsModal({ app, onClose }) {
  const overlayRef = useRef(null);
  const closeRef = useRef(null);

  // Focus trap & escape key
  useEffect(() => {
    const prev = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [onClose]);

  // Click outside to close
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!app) return null;

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={app.title}
    >
      <div className="modal-panel" style={{ "--modal-color": app.color }}>
        {/* Header */}
        <div className="modal-header" style={{ background: app.accentBg }}>
          <div className="modal-header__left">
            <div
              className="modal-header__icon"
              style={{
                background: app.accentBg,
                border: `1px solid ${app.accentBorder}`,
              }}
            >
              <AppIcon type={app.iconType} color={app.color} size={20} />
            </div>
            <div>
              <h2 className="modal-header__title">{app.title}</h2>
              <span className="modal-header__cat" style={{ color: app.color }}>
                {app.category}
              </span>
            </div>
          </div>
          <div className="modal-header__actions">
            {app.badge && (
              <span
                className="app-card__badge"
                style={{
                  background: `${app.badgeColor || app.color}18`,
                  color: app.badgeColor || app.color,
                  borderColor: `${app.badgeColor || app.color}30`,
                  fontSize: "10px",
                }}
              >
                {app.badge}
              </span>
            )}
            <button
              className="modal-close"
              ref={closeRef}
              onClick={onClose}
              aria-label="Close"
            >
              <XIcon />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="modal-body">
          <p className="modal-desc">{app.description}</p>

          {/* Preview chart */}
          <div className="modal-chart-wrap">
            <div className="modal-chart-label">Performance Preview</div>
            <MiniSparkline color={app.color} />
          </div>

          {/* Stats */}
          <div className="modal-stats">
            <StatCard
              label="Accuracy"
              value="94.2%"
              color={app.color}
              sub="30-day avg"
            />
            <StatCard
              label="Signals"
              value="1,284"
              color="var(--text-primary)"
              sub="this month"
            />
            <StatCard
              label="Latency"
              value="< 80ms"
              color="var(--profit)"
              sub="live data"
            />
            <StatCard
              label="Coverage"
              value="NSE + BSE"
              color="var(--text-secondary)"
            />
          </div>

          {/* Coming soon notice */}
          <div className="modal-notice">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>
              Full tool UI coming soon. This panel is a preview — click{" "}
              <strong>Launch</strong> to join the early access waitlist.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="modal-btn modal-btn--secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="modal-btn modal-btn--primary"
            style={{ background: app.color }}
            onClick={onClose}
          >
            Launch Tool →
          </button>
        </div>
      </div>
    </div>
  );
}
