import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import PositionRow from "./PositionRow";
import "./positions.css";

/* ─── Tiny icons (inline SVG — zero deps) ───────────────────────── */
const IconTrending = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);
const IconStar = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconSort = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);
//======================Compo for to calculate the pnl best , we can use this function to calculate pnl fast =================
/* ─── Helpers ────────────────────────────────────────────────────── */
const calcPnl = (stock, ltp) =>
  stock.side === "SELL"
    ? (stock.avg - ltp) * stock.qty
    : (ltp - stock.avg) * stock.qty;
//================== function or compo for better readbale number understanding
const fmt = (n, decimals = 2) =>
  n.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

/* ─── Summary Card ───────────────────────────────────────────────── */
const SummaryCards = ({ positions, livePrices }) => {
  const stats = useMemo(() => {
    if (!positions.length) return null;

    let totalPnl = 0;
    let totalInv = 0;
    let bestPnl = -Infinity;
    let worstPnl = Infinity;
    let bestName = "";
    let worstName = "";

    for (const stock of positions) {
      // const live = livePrices[stock.name];
      // const ltp = live ? live.ltp : stock.avg;
      const live = livePrices[stock.name];

      const ltp = typeof live === "number" ? live : (live?.ltp ?? stock.avg);
      const pnlRaw = calcPnl(stock, ltp);
      const pnl = isNaN(pnlRaw) ? 0 : pnlRaw;
      //=== Total Profit ========
      totalPnl += pnl;
      //=============================
      totalInv += stock.avg * stock.qty;

      if (pnl > bestPnl) {
        bestPnl = pnl;
        bestName = stock.name;
      }
      if (pnl < worstPnl) {
        worstPnl = pnl;
        worstName = stock.name;
      }
    }

    const totalPct =
      totalInv > 0 && isFinite(totalPnl) ? (totalPnl / totalInv) * 100 : 0;
    return { totalPnl, totalPct, bestPnl, bestName, worstPnl, worstName };
  }, [positions, livePrices]);

  if (!stats) return null;

  const { totalPnl, totalPct, bestPnl, bestName, worstPnl, worstName } = stats;
  const isProfit = totalPnl >= 0;
  const plClass = isProfit ? "profit" : "loss";

  return (
    <div className="positions-summary">
      {/* Total P&L */}
      <div className={`pos-card ${isProfit ? "pnl-positive" : "pnl-negative"}`}>
        <div className="pos-card-label">
          <IconTrending />
          Total P&amp;L
        </div>
        <div className={`pos-card-value ${plClass}`}>
          {isProfit ? "+" : ""}₹{fmt(totalPnl)}
        </div>
        <div className="pos-card-sub">
          <span className={`pos-pnl-percent ${plClass}`}>
            {isProfit ? "+" : ""}
            {fmt(totalPct)}%
          </span>
          <span className="pos-card-sub-text">
            across {positions.length} positions
          </span>
        </div>
      </div>

      {/* Best performer */}
      <div className="pos-card">
        <div className="pos-card-label" style={{ color: "var(--profit)" }}>
          <IconStar />
          Best Position
        </div>
        {bestName ? (
          <>
            <div className="pos-performer-name">{bestName}</div>
            <div className={`pos-performer-pnl profit`}>+₹{fmt(bestPnl)}</div>
          </>
        ) : (
          <div className="pos-performer-empty">—</div>
        )}
      </div>

      {/* Worst performer */}
      <div className="pos-card">
        <div className="pos-card-label" style={{ color: "var(--loss)" }}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
          >
            <polygon points="12 22 15.09 15.74 22 14.73 17 9.86 18.18 2.98 12 6.23 5.82 2.98 7 9.86 2 14.73 8.91 15.74 12 22" />
          </svg>
          Worst Position
        </div>
        {worstName ? (
          <>
            <div className="pos-performer-name">{worstName}</div>
            <div
              className={`pos-performer-pnl ${worstPnl >= 0 ? "profit" : "loss"}`}
            >
              {worstPnl >= 0 ? "+" : ""}₹{fmt(worstPnl)}
            </div>
          </>
        ) : (
          <div className="pos-performer-empty">—</div>
        )}
      </div>
    </div>
  );
};

/* ─── Empty State ────────────────────────────────────────────────── */
const EmptyState = () => (
  <div className="positions-empty">
    <div className="positions-empty-icon">⚡</div>
    <h4>No open positions</h4>
    <p>Start trading to see your positions here.</p>
  </div>
);

/* ─── Main Component ─────────────────────────────────────────────── */
const Positions = ({ livePrices }) => {
  const [allPositions, setAllPositions] = useState([]);
  const [sortAsc, setSortAsc] = useState(false); // default: desc (best P&L first)

  useEffect(() => {
    axios
      .get("http://localhost:8080/positions", { withCredentials: true })
      .then((res) => setAllPositions(res.data))
      .catch((err) => console.error("Positions fetch error:", err));
  }, []);

  /* ── Enrich positions with live P&L, then sort ── */
  const enriched = useMemo(() => {
    return allPositions.map((stock) => {
      const live = livePrices[stock.name];

      const ltp = typeof live === "number" ? live : (live?.ltp ?? stock.avg);
      const pnl = calcPnl(stock, ltp);
      return { ...stock, _ltp: ltp, _pnl: pnl };
    });
  }, [allPositions, livePrices]);

  const sorted = useMemo(() => {
    return [...enriched].sort((a, b) =>
      sortAsc ? a._pnl - b._pnl : b._pnl - a._pnl,
    );
  }, [enriched, sortAsc]);

  /* ── Best / worst indices (on sorted array) ── */
  const bestIdx = sorted.length ? 0 : -1;
  const worstIdx = sorted.length ? sorted.length - 1 : -1;

  /* ── Max abs P&L for intensity colouring ── */
  const maxAbsPnl = useMemo(() => {
    if (!sorted.length) return 1;
    return Math.max(...sorted.map((s) => Math.abs(s._pnl)), 1);
  }, [sorted]);

  const toggleSort = useCallback(() => setSortAsc((prev) => !prev), []);

  const handleExit = useCallback((stock) => {
    // Placeholder: wire to your order window or API call
    console.log("[Exit position]", stock.name, stock.side);
    alert(`Exit signal sent for ${stock.name}`);
  }, []);

  return (
    <div className="positions-page">
      {/* Header */}
      <div className="positions-header">
        <h3 className="title">
          Positions
          <span className="positions-count-badge">{allPositions.length}</span>
        </h3>

        {allPositions.length > 0 && (
          <button
            className={`positions-sort-btn ${sortAsc ? "asc" : ""}`}
            onClick={toggleSort}
            title="Sort by P&L"
          >
            <IconSort />
            P&amp;L {sortAsc ? "Asc" : "Desc"}
          </button>
        )}
      </div>

      {/* Summary cards */}
      {allPositions.length > 0 && (
        <SummaryCards positions={allPositions} livePrices={livePrices} />
      )}

      {/* Table or Empty */}
      {allPositions.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="positions-table-wrap">
          <table className="positions-table">
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Instrument</th>
                <th>Product</th>
                <th>Qty.</th>
                <th>Avg. Price</th>
                <th>LTP</th>
                <th>P&amp;L</th>
                <th>Chg.</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((stock, idx) => (
                <PositionRow
                  key={`${stock.name}-${stock.side}`}
                  stock={stock}
                  livePrice={livePrices[stock.name]}
                  isBest={idx === bestIdx}
                  isWorst={idx === worstIdx}
                  maxAbsPnl={maxAbsPnl}
                  onExit={handleExit}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Positions;
