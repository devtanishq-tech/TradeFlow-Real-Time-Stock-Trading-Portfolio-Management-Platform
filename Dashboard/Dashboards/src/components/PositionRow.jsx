import React, { useEffect, useRef, useState, useCallback, memo } from "react";
// useRef keep track of the old prices , think like it is box
const PositionRow = memo(
  ({ stock, livePrice, isBest, isWorst, maxAbsPnl, onExit }) => {
    const ltp =
      typeof livePrice === "number" ? livePrice : (livePrice?.ltp ?? stock.avg);
    const prevLtpRef = useRef(ltp); // will keep track of old price , so that , compare with current , if price goes higher, show green or show red
    const [flashClass, setFlashClass] = useState("");

    /* ── P&L ── */
    const pnl =
      stock.side === "SELL"
        ? (stock.avg - ltp) * stock.qty
        : (ltp - stock.avg) * stock.qty;

    const percent =
      (Math.abs(pnl) / (stock.avg * stock.qty)) * 100 * (pnl >= 0 ? 1 : -1);
    const isProfit = pnl >= 0;
    const plClass = isProfit ? "profit" : "loss";

    /* ── Color intensity ── */
    const absPnl = Math.abs(pnl);
    const ratio = maxAbsPnl > 0 ? absPnl / maxAbsPnl : 0;
    let intensity = "intensity-low";
    if (ratio > 0.6) intensity = "intensity-high";
    else if (ratio > 0.25) intensity = "intensity-medium";

    /* ── Flash on LTP change ── */
    useEffect(() => {
      if (prevLtpRef.current === undefined) {
        prevLtpRef.current = ltp;
        return;
      }
      const prev = prevLtpRef.current;
      if (prev === ltp) return;

      const cls = ltp > prev ? "flash-up" : "flash-down";
      setFlashClass(cls);
      const t = setTimeout(() => setFlashClass(""), 550);
      prevLtpRef.current = ltp;
      return () => clearTimeout(t);
    }, [ltp]);

    /* ── Row class ── */
    const rowClass = [
      isBest ? "pos-row-best" : "",
      isWorst ? "pos-row-worst" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const handleExit = useCallback(() => onExit(stock), [onExit, stock]);

    return (
      <tr className={rowClass}>
        {/* Instrument + side badge */}
        <td>
          <div className="pos-instrument-cell">
            <span
              className={`pos-side-badge ${(stock.side || "BUY").toLowerCase()}`}
            >
              {stock.side || "BUY"}
            </span>
            <span className="pos-instrument-name">{stock.name}</span>
          </div>
        </td>

        {/* Product */}
        <td>
          <span className="pos-product-badge">{stock.product}</span>
        </td>

        {/* Qty */}
        <td className="pos-mono">{stock.qty.toFixed(2)}</td>

        {/* Avg */}
        <td className="pos-mono">₹{stock.avg.toFixed(2)}</td>

        {/* LTP — flashes on change */}
        <td className={`pos-ltp-cell ${flashClass}`}>₹{ltp.toFixed(2)}</td>

        {/* P&L */}
        <td className={`pos-pnl-cell ${plClass} ${intensity}`}>
          {isProfit ? "+" : ""}₹{pnl.toFixed(2)}
        </td>

        {/* % Change */}
        <td
          className={plClass}
          style={{ fontFamily: '"DM Mono", monospace', fontSize: "12px" }}
        >
          {isProfit ? "+" : ""}
          {percent.toFixed(2)}%
        </td>

        {/* Exit button */}
        <td>
          <button className="pos-exit-btn" onClick={handleExit}>
            Exit
          </button>
        </td>
      </tr>
    );
  },
);

PositionRow.displayName = "PositionRow";
export default PositionRow;
