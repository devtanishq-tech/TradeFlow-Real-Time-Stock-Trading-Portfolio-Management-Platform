import { useState } from "react";
import axios from "axios";
// import Fund from "../../../../Backend/models/Funds";
import Funds from "./Funds";

export default function FundsWithdraw({
  onClose,
  refreshFunds,
  funds,
  setFunds,
}) {
  const [amount, setAmount] = useState(""); // keeep track of the input we type
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleWithdraw = async () => {
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (numericAmount > funds.availableCash) {
      setError("Insufficinet Balance");
      return;
    }
    // 🔥 1. INSTANT UI UPDATE
    setFunds((prev) => ({
      ...prev,
      availableCash: prev.availableCash - numericAmount,
    }));
    onClose();
    setError("");
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:8080/funds/withdraw",
        { amount: numericAmount },
        { withCredentials: true },
      );
      setAmount("");
      refreshFunds();
    } catch (err) {
      const msg = err?.response?.data?.message;
      setError(msg || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const quickAmounts = [1000, 5000, 10000, 25000];

  return (
    <div className="funds-modal-overlay" onClick={handleOverlayClick}>
      <div className="funds-modal">
        {/* Header */}
        <div className="funds-modal-header">
          <div className="funds-modal-header-left">
            <div className="funds-modal-icon funds-modal-icon--blue">
              <svg
                width="14"
                height="14"
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
            </div>
            <div>
              <h3 className="funds-modal-title">Withdraw Funds</h3>
              <p className="funds-modal-subtitle">
                Transferred to your bank account
              </p>
            </div>
          </div>
          <button className="funds-modal-close" onClick={onClose}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="funds-modal-body">
          {/* Amount Input */}
          <div className="funds-modal-field">
            <label className="funds-modal-label">Amount</label>
            <div className="funds-modal-input-wrap">
              <span className="funds-modal-prefix">₹</span>
              <input
                type="number"
                className="funds-modal-input"
                placeholder="0.00"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError("");
                }}
                autoFocus
              />
            </div>
            {error && <p className="funds-modal-error">{error}</p>}
          </div>

          {/* Quick Select */}
          <div className="funds-modal-quick">
            <span className="funds-modal-quick-label">Quick select</span>
            <div className="funds-modal-chips">
              {quickAmounts.map((q) => (
                <button
                  key={q}
                  className={`funds-chip ${Number(amount) === q ? "funds-chip--active" : ""}`}
                  onClick={() => {
                    setAmount(q);
                    setError("");
                  }}
                >
                  ₹{q.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
          </div>

          {/* Info note */}
          <div className="funds-modal-note">
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
            Withdrawals typically settle in 1–2 business days.
          </div>
        </div>

        {/* Footer */}
        <div className="funds-modal-footer">
          <button className="btn btn-grey" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            className="btn btn-blue"
            onClick={handleWithdraw}
            disabled={loading || !amount}
          >
            {loading ? "Processing…" : "Withdraw"}
          </button>
        </div>
      </div>
    </div>
  );
}
