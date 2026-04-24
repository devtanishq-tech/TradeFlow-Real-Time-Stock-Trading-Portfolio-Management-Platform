import React, { useState, useEffect, useRef } from "react";
import { Arena } from "./Arena";
import { watchlist } from "../data/data";
import "./holdings.css"; // ← import scoped stylesheet

// ── Helper: P&L intensity tier ────────────────────────────────────
function getPnlIntensity(pnl, maxAbsPnl) {
  if (maxAbsPnl === 0) return "intensity-low";
  const ratio = Math.abs(pnl) / maxAbsPnl;
  if (ratio > 0.66) return "intensity-high";
  if (ratio > 0.33) return "intensity-medium";
  return "intensity-low";
}

const Holdings = ({ livePrices, holdings, portfolioHistory }) => {
  const [loading, setLoading] = useState(true);
  // Track previous LTP per stock for flash direction
  const prevPricesRef = useRef({});
  const [flashMap, setFlashMap] = useState({}); // { [name]: "flash-up" | "flash-down" | "" }

  useEffect(() => {
    if (holdings && holdings.length > 0) {
      setLoading(false);
    }
  }, [holdings]);

  // ── LTP flash effect ──────────────────────────────────────────
  useEffect(() => {
    const prev = prevPricesRef.current;
    const nextFlash = {};

    holdings.forEach((s) => {
      const live = livePrices[s.name] || s.avg;
      const old = prev[s.name];
      if (old !== undefined && live !== old) {
        nextFlash[s.name] = live > old ? "flash-up" : "flash-down";
      }
    });

    if (Object.keys(nextFlash).length > 0) {
      setFlashMap(nextFlash);
      // Clear flash classes after animation completes
      setTimeout(() => setFlashMap({}), 550);
    }

    // Save current prices as previous
    holdings.forEach((s) => {
      prev[s.name] = livePrices[s.name] || s.avg;
    });
    prevPricesRef.current = prev;
  }, [livePrices]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Dynamic summary calculations ──────────────────────────────
  const totalInvestment = holdings.reduce((sum, s) => sum + s.avg * s.qty, 0);
  const currentValue = holdings.reduce((sum, s) => {
    const live = livePrices[s.name] || s.avg;
    return sum + live * s.qty;
  }, 0);
  const pnl = currentValue - totalInvestment;
  const pnlPercent =
    totalInvestment > 0 ? ((pnl / totalInvestment) * 100).toFixed(2) : "0.00";
  const pnlClass = pnl >= 0 ? "profit" : "loss";

  // ── Per-row P&L for intensity + best/worst ───────────────────
  const rowPnls = holdings.map((s) => {
    const live = livePrices[s.name] || s.avg;
    return (live - s.avg) * s.qty;
  });
  const maxAbsPnl = Math.max(...rowPnls.map(Math.abs), 0);
  const maxPnlIdx = rowPnls.indexOf(Math.max(...rowPnls));
  const minPnlIdx = rowPnls.indexOf(Math.min(...rowPnls));

  const isProfit =
    portfolioHistory.length > 1 &&
    portfolioHistory[portfolioHistory.length - 1] > portfolioHistory[0];

  const chartData = {
    labels: portfolioHistory.map(() => new Date().toLocaleTimeString()),
    datasets: [
      {
        fill: true,
        label: "Portfolio Value",
        data: portfolioHistory,
        borderColor: isProfit ? "#22c55e" : "#ef4444",
      },
    ],
  };

  if (loading) {
    return (
      <p style={{ color: "var(--text-muted)", padding: "24px" }}>
        Loading holdings…
      </p>
    );
  }

  return (
    <div className="holdings-page">
      {/* ── Page Header ── */}
      <div className="holdings-header">
        <div className="title">
          <h3>Holdings</h3>
          <span className="holdings-count-badge">{holdings.length}</span>
        </div>
      </div>

      {/* ── Summary Cards ── */}
      <div className="holdings-summary">
        {/* Total Investment */}
        <div className="h-card">
          <div className="h-card-label">Total Investment</div>
          <div className="h-card-value">
            {totalInvestment.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="h-card-sub">
            <span className="h-card-sub-text">
              across {holdings.length} stocks
            </span>
          </div>
        </div>

        {/* Current Value */}
        <div className="h-card">
          <div className="h-card-label">Current Value</div>
          <div className="h-card-value">
            {currentValue.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
          </div>
          <div className="h-card-sub">
            <span className="h-card-sub-text">live market value</span>
          </div>
        </div>

        {/* P&L */}
        <div className={`h-card ${pnl >= 0 ? "pnl-positive" : "pnl-negative"}`}>
          <div className="h-card-label">P&amp;L</div>
          <div className={`h-card-value ${pnlClass}`}>
            {pnl.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
          </div>
          <div className="h-card-sub">
            <span className={`h-pnl-percent ${pnlClass}`}>
              {pnl >= 0 ? "+" : ""}
              {pnlPercent}%
            </span>
            <span className="h-card-sub-text">overall return</span>
          </div>
        </div>
      </div>

      {/* ── Holdings Table ── */}
      <div className="holdings-table-wrap">
        <table className="holdings-tbl">
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&amp;L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((stock, idx) => {
              const livePrice = livePrices[stock.name] || stock.avg;
              const curVal = livePrice * stock.qty;
              const stockPnl = rowPnls[idx];
              const profitClass = stockPnl >= 0 ? "profit" : "loss";
              const intensity = getPnlIntensity(stockPnl, maxAbsPnl);
              const netChange =
                stock.avg > 0 ? ((livePrice - stock.avg) / stock.avg) * 100 : 0;
              const watch = watchlist.find((w) => w.name === stock.name);
              const base = watch ? watch.price : stock.avg;
              const dayChange =
                base > 0 ? ((livePrice - base) / base) * 100 : null;
              const dayClass =
                dayChange !== null && dayChange >= 0 ? "profit" : "loss";

              // Row highlight: best vs worst
              let rowClass = "";
              if (idx === maxPnlIdx && stockPnl > 0) rowClass = "h-row-best";
              else if (idx === minPnlIdx && stockPnl < 0)
                rowClass = "h-row-worst";

              const flashClass = flashMap[stock.name] || "";

              return (
                <tr key={idx} className={rowClass}>
                  {/* Instrument cell */}
                  <td>
                    <div className="h-instrument-cell">
                      <span className="h-side-badge">long</span>
                      <span className="h-instrument-name">{stock.name}</span>
                    </div>
                  </td>

                  {/* Qty */}
                  <td className="h-mono">{stock.qty}</td>

                  {/* Avg. cost */}
                  <td className="h-mono">{stock.avg.toFixed(2)}</td>

                  {/* LTP with flash */}
                  <td className={`h-ltp-cell ${flashClass}`}>
                    {livePrice.toFixed(2)}
                  </td>

                  {/* Current value */}
                  <td className="h-mono">{curVal.toFixed(2)}</td>

                  {/* P&L with intensity background */}
                  <td className={`h-pnl-cell ${profitClass} ${intensity}`}>
                    {stockPnl.toFixed(2)}
                  </td>

                  {/* Net change % */}
                  <td className={`h-change-cell ${profitClass}`}>
                    {netChange.toFixed(2)}%
                  </td>

                  {/* Day change % */}
                  <td
                    className={`h-change-cell ${
                      dayChange !== null ? dayClass : "loss"
                    }`}
                  >
                    {dayChange !== null ? `${dayChange.toFixed(2)}%` : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Chart (Arena — untouched) ── */}
      {holdings.length > 0 && <Arena data={chartData} />}
    </div>
  );
};

export default Holdings;
