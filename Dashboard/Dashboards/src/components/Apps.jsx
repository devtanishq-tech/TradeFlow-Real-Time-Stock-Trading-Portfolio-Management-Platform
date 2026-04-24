import { useState, useEffect, useMemo, useCallback } from "react";
import "./Apps.css";
import { APPS_DATA, CATEGORIES } from "../data/AppsData";
import { AppsSearch } from "./AppsSearch";
import { AppsGrid } from "./AppsGrid";
import { AppsModal } from "./AppsModal";

// ─── Local storage helpers ─────────────────────────────────────
const LS_FAV_KEY = "kite_fav_apps";
const LS_RECENT_KEY = "kite_recent_apps";
const MAX_RECENT = 4;

const readLS = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeLS = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

// ─── Apps Component ────────────────────────────────────────────
export default function Apps() {
  // ── State ──
  const [query, setQuery] = useState("");
  const [activeCategory, setCategory] = useState("All");
  const [favorites, setFavorites] = useState(() => readLS(LS_FAV_KEY, []));
  const [recentIds, setRecentIds] = useState(() => readLS(LS_RECENT_KEY, []));
  const [openApp, setOpenApp] = useState(null);
  const [loading, setLoading] = useState(true);

  // ── Simulate async load ──
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  // ── Persist favorites & recent ──
  useEffect(() => writeLS(LS_FAV_KEY, favorites), [favorites]);
  useEffect(() => writeLS(LS_RECENT_KEY, recentIds), [recentIds]);

  // ── Keyboard shortcut: "/" to focus search ──
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
        e.preventDefault();
        document.querySelector(".apps-search-input")?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ── Filtered apps ──
  const filteredApps = useMemo(() => {
    let list = APPS_DATA;
    if (activeCategory !== "All") {
      list = list.filter((a) => a.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q),
      );
    }
    return list;
  }, [query, activeCategory]);

  // ── Handlers ──
  const handleFavToggle = useCallback((id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const handleOpen = useCallback((app) => {
    setOpenApp(app);
    // Track recent
    setRecentIds((prev) => {
      const next = [app.id, ...prev.filter((x) => x !== app.id)].slice(
        0,
        MAX_RECENT,
      );
      return next;
    });
  }, []);

  const handleClose = useCallback(() => setOpenApp(null), []);

  // ── Search / category handlers ──
  const handleQuery = useCallback((val) => {
    setQuery(val);
    if (val) setCategory("All"); // Reset category when typing
  }, []);

  const handleCategory = useCallback((cat) => {
    setCategory(cat);
    setQuery("");
  }, []);

  return (
    <div className="apps-page">
      {/* ── Header ── */}
      <div className="apps-header">
        <div className="apps-header__left">
          <span className="apps-header__eyebrow">Trading Hub</span>
          <h1 className="apps-header__title">
            Market <em>Apps</em>
          </h1>
          <p className="apps-header__sub">
            Professional tools for analysis, strategy & risk management
          </p>
        </div>
        <div className="apps-header__meta">
          <span className="apps-header__tag">
            <span className="apps-header__tag-dot" />
            NSE Live
          </span>
          <span className="apps-header__tag" title='Press "/" to search'>
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
            Press / to search
          </span>
        </div>
      </div>

      {/* ── Search + Filters ── */}
      <AppsSearch
        query={query}
        onQuery={handleQuery}
        activeCategory={activeCategory}
        onCategory={handleCategory}
        categories={CATEGORIES}
        totalCount={APPS_DATA.length}
        filteredCount={filteredApps.length}
      />

      {/* ── Grid ── */}
      <AppsGrid
        apps={filteredApps}
        favorites={favorites}
        recentIds={recentIds}
        onFavToggle={handleFavToggle}
        onOpen={handleOpen}
        loading={loading}
        query={query}
      />

      {/* ── Modal ── */}
      {openApp && <AppsModal app={openApp} onClose={handleClose} />}
    </div>
  );
}
