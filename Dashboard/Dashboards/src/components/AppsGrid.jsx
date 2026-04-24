import { AppCard, AppCardSkeleton } from "./AppCard";

// ─── Section Header ───────────────────────────────────────────────
function SectionHeader({ icon, title, count }) {
  return (
    <div className="apps-section-header">
      <span className="apps-section-icon">{icon}</span>
      <span className="apps-section-title">{title}</span>
      {count != null && <span className="apps-section-count">{count}</span>}
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────
function EmptyState({ query }) {
  return (
    <div className="apps-empty">
      <div className="apps-empty__icon">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <p className="apps-empty__title">No tools found</p>
      <p className="apps-empty__sub">
        No results for <em>"{query}"</em>. Try a different keyword.
      </p>
    </div>
  );
}

// ─── No Favorites State ───────────────────────────────────────────
function NoFavsHint() {
  return (
    <div className="apps-no-favs">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      <span>Star any tool to pin it here for quick access.</span>
    </div>
  );
}

// ─── Apps Grid ────────────────────────────────────────────────────
export function AppsGrid({
  apps,
  favorites,
  recentIds,
  onFavToggle,
  onOpen,
  loading,
  query,
}) {
  if (loading) {
    return (
      <div className="apps-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <AppCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (apps.length === 0 && query) {
    return <EmptyState query={query} />;
  }

  const favApps = apps.filter((a) => favorites.includes(a.id));
  const recentApps = apps
    .filter((a) => recentIds.includes(a.id) && !favorites.includes(a.id))
    .sort((a, b) => recentIds.indexOf(a.id) - recentIds.indexOf(b.id));
  const restApps = apps.filter(
    (a) => !favorites.includes(a.id) && !recentIds.includes(a.id),
  );

  const renderCard = (app) => (
    <AppCard
      key={app.id}
      app={app}
      isFav={favorites.includes(app.id)}
      isRecent={recentIds.includes(app.id)}
      onFavToggle={onFavToggle}
      onOpen={onOpen}
    />
  );

  return (
    <div className="apps-content">
      {/* ── Favorites section ── */}
      {!query && (
        <div className="apps-section">
          <SectionHeader
            icon="⭐"
            title="Favorites"
            count={favApps.length || null}
          />
          {favApps.length === 0 ? (
            <NoFavsHint />
          ) : (
            <div className="apps-grid">{favApps.map(renderCard)}</div>
          )}
        </div>
      )}

      {/* ── Recently used section ── */}
      {!query && recentApps.length > 0 && (
        <div className="apps-section">
          <SectionHeader
            icon="🕐"
            title="Recently Used"
            count={recentApps.length}
          />
          <div className="apps-grid">{recentApps.map(renderCard)}</div>
        </div>
      )}

      {/* ── All / search results section ── */}
      <div className="apps-section">
        <SectionHeader
          icon={query ? "🔍" : "⚡"}
          title={query ? "Search Results" : "All Tools"}
          count={query ? apps.length : restApps.length || null}
        />
        <div className="apps-grid">
          {(query ? apps : restApps).map(renderCard)}
        </div>
      </div>
    </div>
  );
}
