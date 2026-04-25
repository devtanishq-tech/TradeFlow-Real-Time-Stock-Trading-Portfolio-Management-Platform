import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import FundsAdd from "./FundsAdd";
import FundsWithdraw from "./FundsWithdraw";

const Funds = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [funds, setFunds] = useState(null); // keep track of overall funds data comes from the backend
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const fetchFunds = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/funds`, {
        withCredentials: true,
      });
      setFunds(res.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFunds();
  }, []);

  return (
    <>
      {/* ── Action Bar ───────────────────────────────────────── */}
      <div className="funds">
        <span className="funds-hint">
          <svg
            width="12"
            height="12"
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
          Instant, zero-cost fund transfers with UPI
        </span>

        <div className="funds-actions">
          <button onClick={() => setIsAddOpen(true)} className="btn btn-green">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Funds
          </button>
          <button
            onClick={() => setIsWithdrawOpen(true)}
            className="btn btn-blue"
          >
            <svg
              width="13"
              height="13"
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
            Withdraw
          </button>
        </div>
      </div>

      {/* ── Modals ───────────────────────────────────────────── */}
      {isAddOpen && (
        <FundsAdd
          onClose={() => setIsAddOpen(false)}
          refreshFunds={fetchFunds}
        />
      )}
      {isWithdrawOpen && (
        <FundsWithdraw
          onClose={() => setIsWithdrawOpen(false)}
          refreshFunds={fetchFunds}
          funds={funds}
          setFunds={setFunds}
        />
      )}

      {/* ── Two-column layout ────────────────────────────────── */}
      <div className="row">
        {/* ── Equity Column ────────────────────────────────── */}
        <div className="col funds-col">
          <div className="funds-col-header">
            <span className="funds-col-badge">Equity</span>
          </div>

          <div className="funds-table">
            {/* Primary metrics */}
            <div className="funds-row funds-row--highlight">
              <span className="funds-label">Available Margin</span>
              <span className="funds-value funds-value--accent">
                ₹
                {funds?.availableCash?.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                }) || "0.00"}
              </span>
            </div>

            <div className="funds-row">
              <span className="funds-label">Used Margin</span>
              <span className="funds-value funds-value--mono">
                ₹
                {funds?.usedMargin?.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                }) || "0.00"}
              </span>
            </div>

            <div className="funds-row">
              <span className="funds-label">Available Cash</span>
              <span className="funds-value funds-value--mono">
                ₹
                {funds?.availableCash?.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                }) || "0.00"}
              </span>
            </div>

            <div className="funds-divider" />

            {/* Secondary metrics */}
            <div className="funds-row funds-row--sm">
              <span className="funds-label">Opening Balance</span>
              <span className="funds-value funds-value--sm">
                ₹
                {funds?.openingBalance?.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                }) || "0.00"}
              </span>
            </div>
            <div className="funds-row funds-row--sm">
              <span className="funds-label">Payin</span>
              <span className="funds-value funds-value--sm">₹4,064.00</span>
            </div>
            <div className="funds-row funds-row--sm">
              <span className="funds-label">SPAN</span>
              <span className="funds-value funds-value--sm">₹0.00</span>
            </div>
            <div className="funds-row funds-row--sm">
              <span className="funds-label">Delivery Margin</span>
              <span className="funds-value funds-value--sm">₹0.00</span>
            </div>
            <div className="funds-row funds-row--sm">
              <span className="funds-label">Exposure</span>
              <span className="funds-value funds-value--sm">₹0.00</span>
            </div>
            <div className="funds-row funds-row--sm">
              <span className="funds-label">Options Premium</span>
              <span className="funds-value funds-value--sm">₹0.00</span>
            </div>

            <div className="funds-divider" />

            {/* Collateral metrics */}
            <div className="funds-row funds-row--sm">
              <span className="funds-label">Collateral (Liquid Funds)</span>
              <span className="funds-value funds-value--sm">₹0.00</span>
            </div>
            <div className="funds-row funds-row--sm">
              <span className="funds-label">Collateral (Equity)</span>
              <span className="funds-value funds-value--sm">₹0.00</span>
            </div>
            <div className="funds-row funds-row--sm funds-row--total">
              <span className="funds-label">Total Collateral</span>
              <span className="funds-value funds-value--sm">₹0.00</span>
            </div>
          </div>
        </div>

        {/* ── Commodity Column ─────────────────────────────── */}
        <div className="col">
          <div className="commodity">
            <div className="commodity-icon">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <p className="commodity-title">No Commodity Account</p>
            <p className="commodity-sub">
              Trade in commodities like gold, silver, crude oil and more.
            </p>
            <Link className="btn btn-blue">Open Account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
