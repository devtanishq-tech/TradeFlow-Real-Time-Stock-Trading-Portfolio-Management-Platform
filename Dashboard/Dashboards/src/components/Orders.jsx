import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import axios from "axios";
import "./Order.css";

/* ─── Price-flash hook ──────────────────────────────────────────── */
function usePriceFlash(price) {
  const [flash, setFlash] = useState(null); // 'up' | 'down' | null
  const prev = useRef(price);

  useEffect(() => {
    if (price == null || prev.current == null) {
      prev.current = price;
      return;
    }
    if (price > prev.current) setFlash("up");
    else if (price < prev.current) setFlash("down");
    prev.current = price;
    const t = setTimeout(() => setFlash(null), 600);
    return () => clearTimeout(t);
  }, [price]);

  return flash;
}

/* ─── Sort icon ─────────────────────────────────────────────────── */
function SortIcon({ direction }) {
  if (!direction) return <span className="sort-icon sort-idle">⇅</span>;
  return (
    <span className={`sort-icon sort-${direction}`}>
      {direction === "asc" ? "↑" : "↓"}
    </span>
  );
}

/* ─── Single row ────────────────────────────────────────────────── */
const OrderRow = React.memo(({ order, livePrices }) => {
  const live = livePrices?.[order.stockName] ?? order.price;
  const flash = usePriceFlash(live);
  //===========================================================================
  const isBuy = order.mode?.toUpperCase() === "BUY";

  let pnl = null;

  // SELL → show realized P&L from backend
  if (!isBuy) {
    pnl = order.realizedPnl ?? null;
  }

  // const pnl = isBuy
  //   ? live * order.qty - order.price
  //   : order.price - live * order.qty;
  //=========================================================================
  // const pnlClass = pnl >= 0 ? "profit" : "loss";

  const formatNum = (n) =>
    typeof n === "number"
      ? n.toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "—";

  const timeStr = order.createdAt
    ? new Date(order.createdAt).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    : "—";

  return (
    <tr className="order-row">
      {/* Checkbox */}
      <td className="col-check">
        <label className="checkbox-wrap">
          <input type="checkbox" />
          <span className="checkbox-box" />
        </label>
      </td>

      {/* Time */}
      <td className="col-time">{timeStr}</td>

      {/* BUY / SELL badge */}
      <td className="col-type">
        <span className={`type-badge ${isBuy ? "badge-buy" : "badge-sell"}`}>
          {isBuy ? "BUY" : "SELL"}
        </span>
      </td>

      {/* Instrument */}
      <td className="col-instrument">
        <span className="instrument-name">{order.stockName}</span>
        <span className="instrument-exchange">NSE</span>
      </td>

      {/* Qty */}
      <td className="col-mono">{order.qty}</td>

      {/* LTP with flash */}
      <td className={`col-mono col-ltp ${flash ? `flash-${flash}` : ""}`}>
        {formatNum(live)}
      </td>

      {/* Avg price */}
      <td className="col-mono">{formatNum(order.price)}</td>

      {/* P&L */}
      <td
        className={`col-mono ${pnl !== null ? (pnl >= 0 ? "profit" : "loss") : ""}`}
      >
        <span className="pnl-value">
          {pnl === null ? "—" : `${pnl >= 0 ? "+" : ""}${formatNum(pnl)}`}
        </span>
      </td>
      {/* <td className={`col-mono ${pnlClass}`}>
        <span className="pnl-value">
          {pnl >= 0 ? "+" : ""}
          {formatNum(pnl)}
        </span>
      </td> */}

      {/* Status chip */}
      <td className="col-status">
        <span className="status-chip">
          <span className="status-dot" />
          {isBuy ? "BOUGHT" : "SOLD"}
        </span>
      </td>
    </tr>
  );
});

/* ─── Orders page ───────────────────────────────────────────────── */
const FILTERS = ["ALL", "BUY", "SELL"];

const COLUMNS = [
  { key: null, label: "" },
  { key: "createdAt", label: "Time" },
  { key: "mode", label: "Type" },
  { key: "stockName", label: "Instrument" },
  { key: "qty", label: "Qty" },
  { key: "_ltp", label: "LTP" },
  { key: "price", label: "Avg Price" },
  { key: "_pnl", label: "P&L" },
  { key: null, label: "Status" },
];

const Orders = ({ livePrices = {}, refreshOrders }) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [sort, setSort] = useState({ key: "createdAt", dir: "desc" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/orders`, { withCredentials: true })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [refreshOrders]);

  const handleSort = useCallback((key) => {
    if (!key) return;
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
    );
  }, []);

  const filteredOrders = useMemo(() => {
    let list = orders;

    // text filter
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((o) => o.stockName?.toLowerCase().includes(q));
    }

    // tab filter
    if (filter !== "ALL") {
      list = list.filter((o) => o.mode?.toUpperCase() === filter);
    }

    // sort
    if (sort.key) {
      list = [...list].sort((a, b) => {
        let av = a[sort.key];
        let bv = b[sort.key];

        // computed sort keys
        if (sort.key === "_ltp") {
          av = livePrices[a.stockName] ?? a.price;
          bv = livePrices[b.stockName] ?? b.price;
        }
        if (sort.key === "_pnl") {
          av = a.realizedPnl ?? -Infinity; // BUY goes bottom
          bv = b.realizedPnl ?? -Infinity;
        }

        if (typeof av === "string") av = av.toLowerCase();
        if (typeof bv === "string") bv = bv.toLowerCase();

        if (av < bv) return sort.dir === "asc" ? -1 : 1;
        if (av > bv) return sort.dir === "asc" ? 1 : -1;
        return 0;
      });
    }

    return list;
  }, [orders, search, filter, sort, livePrices]);

  const buyCount = useMemo(
    () => orders.filter((o) => o.mode?.toUpperCase() === "BUY").length,
    [orders],
  );
  const sellCount = useMemo(
    () => orders.filter((o) => o.mode?.toUpperCase() === "SELL").length,
    [orders],
  );

  /* ── Empty state ── */
  if (!loading && orders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <div className="no-orders-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
              <line x1="9" y1="12" x2="15" y2="12" />
              <line x1="9" y1="16" x2="13" y2="16" />
            </svg>
          </div>
          <p className="no-orders-title">No orders yet</p>
          <p className="no-orders-sub">
            Your executed and pending orders will appear here.
          </p>
          <a href="/orders/new" className="btn btn-blue no-orders-cta">
            Start Trading
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="orders">
      {/* ── Sticky header ── */}
      <div className="orders-header">
        <div className="orders-header-left">
          <h2 className="orders-title">Orders</h2>
          <span className="orders-count">{filteredOrders.length}</span>
        </div>

        <div className="orders-header-right">
          {/* Search */}
          <div className="search-box">
            <svg
              className="search-icon"
              width="13"
              height="13"
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
            <input
              type="text"
              placeholder="Search instrument…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch("")}>
                ✕
              </button>
            )}
          </div>

          {/* Filter tabs */}
          <div className="filter-tabs">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`filter-tab ${filter === f ? "filter-tab-active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
                {f === "BUY" && buyCount > 0 && (
                  <span className="tab-badge tab-badge-buy">{buyCount}</span>
                )}
                {f === "SELL" && sellCount > 0 && (
                  <span className="tab-badge tab-badge-sell">{sellCount}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      {loading ? (
        <div className="orders-loading">
          <span className="loading-spinner" />
          <span>Loading orders…</span>
        </div>
      ) : (
        <div className="order-table-wrap">
          <table className="order-table">
            <thead>
              <tr>
                {COLUMNS.map((col, i) => (
                  <th
                    key={i}
                    className={col.key ? "th-sortable" : ""}
                    onClick={() => handleSort(col.key)}
                  >
                    <span className="th-inner">
                      {col.label}
                      {col.key && (
                        <SortIcon
                          direction={sort.key === col.key ? sort.dir : null}
                        />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <OrderRow
                    key={order._id ?? `${order.stockName}-${order.createdAt}`}
                    order={order}
                    livePrices={livePrices}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={COLUMNS.length} className="empty-row">
                    No results for "{search}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
