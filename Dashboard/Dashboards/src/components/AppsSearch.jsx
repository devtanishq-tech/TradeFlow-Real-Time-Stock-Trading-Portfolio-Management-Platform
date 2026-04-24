// ─── Search Icon ─────────────────────────────────────────────────
function SearchIcon() {
  return (
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
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

// ─── Clear Icon ───────────────────────────────────────────────────
function ClearIcon() {
  return (
    <svg
      width="13"
      height="13"
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

// ─── AppsSearch ───────────────────────────────────────────────────
export function AppsSearch({
  query,
  onQuery,
  activeCategory,
  onCategory,
  categories,
  totalCount,
  filteredCount,
}) {
  return (
    <div className="apps-search-bar">
      {/* Search input */}
      <div className="apps-search-input-wrap">
        <span className="apps-search-icon">
          <SearchIcon />
        </span>
        <input
          className="apps-search-input"
          type="text"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search tools… e.g. options, screener"
          aria-label="Search apps"
          autoComplete="off"
          spellCheck={false}
        />
        {query && (
          <button
            className="apps-search-clear"
            onClick={() => onQuery("")}
            aria-label="Clear search"
          >
            <ClearIcon />
          </button>
        )}
      </div>

      {/* Category pills + result count */}
      <div className="apps-filter-row">
        <div
          className="apps-category-pills"
          role="group"
          aria-label="Filter by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`apps-pill ${activeCategory === cat ? "apps-pill--active" : ""}`}
              onClick={() => onCategory(cat)}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="apps-result-count">
          {filteredCount < totalCount
            ? `${filteredCount} of ${totalCount} tools`
            : `${totalCount} tools`}
        </span>
      </div>
    </div>
  );
}
