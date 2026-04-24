import { useState } from "react";
import axios from "axios";

export default function FundsAdd({ onClose, refreshFunds }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async () => {
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:8080/funds/add",
        { amount: numericAmount },
        { withCredentials: true },
      );
      setAmount("");
      refreshFunds();
      onClose();
    } catch (err) {
      setError("Something went wrong. Please try again.", err);
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
            <div className="funds-modal-icon funds-modal-icon--green">
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
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <div>
              <h3 className="funds-modal-title">Add Funds</h3>
              <p className="funds-modal-subtitle">Instant transfer via UPI</p>
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
            <span className="funds-modal-quick-label">Quick add</span>
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
        </div>

        {/* Footer */}
        <div className="funds-modal-footer">
          <button className="btn btn-grey" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            className="btn btn-green"
            onClick={handleAdd}
            disabled={loading || !amount}
          >
            {loading ? "Adding…" : "Add Funds"}
          </button>
        </div>
      </div>
    </div>
  );
}
