import { useState } from "react";
import { AppIcon } from "./AppIcons";

// ─── Star Icon ────────────────────────────────────────────────────
function StarIcon({ filled }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={filled ? "#f59e0b" : "none"}
      stroke={filled ? "#f59e0b" : "currentColor"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

// ─── Launch Icon ──────────────────────────────────────────────────
function LaunchIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// ─── Skeleton Card ────────────────────────────────────────────────
export function AppCardSkeleton() {
  return (
    <div className="app-card app-card--skeleton">
      <div
        className="app-card__icon-wrap skeleton-block"
        style={{ width: 48, height: 48 }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          className="skeleton-block"
          style={{ width: "55%", height: 14, marginBottom: 10 }}
        />
        <div
          className="skeleton-block"
          style={{ width: "90%", height: 11, marginBottom: 6 }}
        />
        <div className="skeleton-block" style={{ width: "70%", height: 11 }} />
      </div>
    </div>
  );
}

// ─── App Card ─────────────────────────────────────────────────────
export function AppCard({ app, isFav, isRecent, onFavToggle, onOpen }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`app-card ${hovered ? "app-card--hovered" : ""}`}
      style={{
        "--card-color": app.color,
        "--card-bg": app.accentBg,
        "--card-border": app.accentBorder,
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${app.title}`}
      onClick={() => onOpen(app)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(app)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow layer */}
      <div className="app-card__glow" />

      {/* Icon */}
      <div className="app-card__icon-wrap">
        <AppIcon type={app.iconType} color={app.color} size={22} />
      </div>

      {/* Body */}
      <div className="app-card__body">
        <div className="app-card__header">
          <span className="app-card__title">{app.title}</span>
          {app.badge && (
            <span
              className="app-card__badge"
              style={{
                background: `${app.badgeColor || app.color}18`,
                color: app.badgeColor || app.color,
                borderColor: `${app.badgeColor || app.color}30`,
              }}
            >
              {app.badge}
            </span>
          )}
        </div>
        <p className="app-card__desc">{app.description}</p>

        <div className="app-card__footer">
          <span className="app-card__category">{app.category}</span>
          {isRecent && (
            <span className="app-card__recent-dot" title="Recently used">
              <span className="recent-pulse" />
            </span>
          )}
        </div>
      </div>

      {/* Action buttons — visible on hover */}
      <div className="app-card__actions">
        <button
          className={`app-card__fav-btn ${isFav ? "app-card__fav-btn--active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onFavToggle(app.id);
          }}
          title={isFav ? "Remove from favorites" : "Add to favorites"}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          <StarIcon filled={isFav} />
        </button>
        <button
          className="app-card__launch-btn"
          onClick={(e) => {
            e.stopPropagation();
            onOpen(app);
          }}
          title="Open tool"
          aria-label="Open tool"
        >
          <LaunchIcon />
          <span>Open</span>
        </button>
      </div>
    </div>
  );
}
