import React, { useState } from "react";

const equityData = [
  {
    charge: "Brokerage",
    delivery: "Zero Brokerage",
    intraday: "0.03% or Rs. 20/executed order whichever is lower",
    futures: "0.03% or Rs. 20/executed order whichever is lower",
    options: ["Flat Rs. 20 per executed order"],
  },
  {
    charge: "STT/CTT",
    delivery: "0.1% on buy & sell",
    intraday: "0.025% on the sell side",
    futures: "0.05% on the sell side",
    options: [
      "0.15% of the intrinsic value on options that are bought and exercised",
      "0.15% on sell side (on premium)",
    ],
  },
  {
    charge: "Transaction charges",
    delivery: "NSE: 0.00307%\nBSE: 0.00375%",
    intraday: "NSE: 0.00307%\nBSE: 0.00375%",
    futures: "NSE: 0.00183%\nBSE: 0",
    options: ["NSE: 0.03553% (on premium)", "BSE: 0.0325% (on premium)"],
  },
  {
    charge: "GST",
    delivery: "18% on (brokerage + SEBI charges + transaction charges)",
    intraday: "18% on (brokerage + SEBI charges + transaction charges)",
    futures: "18% on (brokerage + SEBI charges + transaction charges)",
    options: ["18% on (brokerage + SEBI charges + transaction charges)"],
  },
  {
    charge: "SEBI charges",
    delivery: "₹10 / crore",
    intraday: "₹10 / crore",
    futures: "₹10 / crore",
    options: ["₹10 / crore"],
  },
  {
    charge: "Stamp charges",
    delivery: "0.015% or ₹1500 / crore on buy side",
    intraday: "0.003% or ₹300 / crore on buy side",
    futures: "0.002% or ₹200 / crore on buy side",
    options: ["0.003% or ₹300 / crore on buy side"],
  },
];

const currencyData = [
  {
    charge: "Brokerage",
    delivery: "0.03% or Rs. 20/executed order whichever is lower",
    intraday: "0.03% or Rs. 20/executed order whichever is lower",
    futures: "0.03% or Rs. 20/executed order whichever is lower",
    options: ["Flat Rs. 20 per executed order"],
  },
  {
    charge: "STT/CTT",
    delivery: "No STT",
    intraday: "No STT",
    futures: "No STT",
    options: ["No STT"],
  },
  {
    charge: "Transaction charges",
    delivery: "NSE: 0.00035%",
    intraday: "NSE: 0.00035%",
    futures: "NSE: 0.00035%",
    options: ["NSE: 0.03553% (on premium)"],
  },
  {
    charge: "GST",
    delivery: "18% on (brokerage + SEBI charges + transaction charges)",
    intraday: "18% on (brokerage + SEBI charges + transaction charges)",
    futures: "18% on (brokerage + SEBI charges + transaction charges)",
    options: ["18% on (brokerage + SEBI charges + transaction charges)"],
  },
  {
    charge: "SEBI charges",
    delivery: "₹10 / crore",
    intraday: "₹10 / crore",
    futures: "₹10 / crore",
    options: ["₹10 / crore"],
  },
  {
    charge: "Stamp charges",
    delivery: "0.0001% or ₹10 / crore on buy side",
    intraday: "0.0001% or ₹10 / crore on buy side",
    futures: "0.0001% or ₹10 / crore on buy side",
    options: ["0.0001% or ₹10 / crore on buy side"],
  },
];

const commodityData = [
  {
    charge: "Brokerage",
    delivery: "0.03% or Rs. 20/executed order whichever is lower",
    intraday: "0.03% or Rs. 20/executed order whichever is lower",
    futures: "0.03% or Rs. 20/executed order whichever is lower",
    options: ["Flat Rs. 20 per executed order"],
  },
  {
    charge: "STT/CTT",
    delivery: "No STT",
    intraday: "No STT",
    futures: "0.01% on sell side",
    options: ["No STT"],
  },
  {
    charge: "Transaction charges",
    delivery: "NSE: 0.0026%",
    intraday: "NSE: 0.0026%",
    futures: "NSE: 0.0026%",
    options: ["NSE: 0.05% (on premium)"],
  },
  {
    charge: "GST",
    delivery: "18% on (brokerage + SEBI charges + transaction charges)",
    intraday: "18% on (brokerage + SEBI charges + transaction charges)",
    futures: "18% on (brokerage + SEBI charges + transaction charges)",
    options: ["18% on (brokerage + SEBI charges + transaction charges)"],
  },
  {
    charge: "SEBI charges",
    delivery: "₹10 / crore",
    intraday: "₹10 / crore",
    futures: "₹10 / crore",
    options: ["₹10 / crore"],
  },
  {
    charge: "Stamp charges",
    delivery: "0.002% or ₹200 / crore on buy side",
    intraday: "0.002% or ₹200 / crore on buy side",
    futures: "0.002% or ₹200 / crore on buy side",
    options: ["0.002% or ₹200 / crore on buy side"],
  },
];

const tabDataMap = {
  Equity: equityData,
  Currency: currencyData,
  Commodity: commodityData,
};

const columnHeaders = [
  "Equity delivery",
  "Equity intraday",
  "F&O - Futures",
  "F&O - Options",
];

function CellContent({ value, isBullet }) {
  if (!isBullet) {
    return (
      <span
        style={{
          color: "#424242",
          fontSize: "0.875rem",
          whiteSpace: "pre-line",
        }}
      >
        {value}
      </span>
    );
  }
  if (value.length === 1) {
    return (
      <span style={{ color: "#424242", fontSize: "0.875rem" }}>{value[0]}</span>
    );
  }
  return (
    <ul
      className="mb-0 ps-3"
      style={{ color: "#424242", fontSize: "0.875rem" }}
    >
      {value.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function Brokerage() {
  const [activeTab, setActiveTab] = useState("Equity");
  const data = tabDataMap[activeTab];

  return (
    <div className="container py-4">
      {/* Tabs */}
      <div
        className="d-flex gap-4 mb-4"
        style={{ borderBottom: "1px solid #e0e0e0" }}
      >
        {["Equity", "Currency", "Commodity"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: "none",
              border: "none",
              padding: "0 0 12px 0",
              fontSize: "1rem",
              fontWeight: activeTab === tab ? "500" : "400",
              color: activeTab === tab ? "#424242" : "#387ED1",
              borderBottom:
                activeTab === tab
                  ? "2px solid #424242"
                  : "2px solid transparent",
              marginBottom: "-1px",
              cursor: "pointer",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table Container */}
      <div
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "4px",
          overflowX: "auto",
        }}
      >
        {/* Column Headers Row */}
        <div className="row g-0" style={{ borderBottom: "1px solid #e0e0e0" }}>
          <div className="col-2 p-3" />
          {columnHeaders.map((header) => (
            <div
              key={header}
              className="col p-3"
              style={{
                color: "#424242",
                fontSize: "0.875rem",
                fontWeight: "500",
                borderLeft: "1px solid #e0e0e0",
              }}
            >
              {header}
            </div>
          ))}
        </div>

        {/* Data Rows */}
        {data.map((row, idx) => (
          <div
            key={idx}
            className="row g-0"
            style={{
              borderBottom:
                idx !== data.length - 1 ? "1px solid #e0e0e0" : "none",
            }}
          >
            {/* Charge Label */}
            <div
              className="col-2 p-3"
              style={{ color: "#424242", fontSize: "0.875rem" }}
            >
              {row.charge}
            </div>

            {/* Equity Delivery */}
            <div
              className="col p-3"
              style={{ borderLeft: "1px solid #e0e0e0" }}
            >
              <CellContent value={row.delivery} isBullet={false} />
            </div>

            {/* Equity Intraday */}
            <div
              className="col p-3"
              style={{ borderLeft: "1px solid #e0e0e0" }}
            >
              <CellContent value={row.intraday} isBullet={false} />
            </div>

            {/* F&O Futures */}
            <div
              className="col p-3"
              style={{ borderLeft: "1px solid #e0e0e0" }}
            >
              <CellContent value={row.futures} isBullet={false} />
            </div>

            {/* F&O Options — bullet points */}
            <div
              className="col p-3"
              style={{ borderLeft: "1px solid #e0e0e0" }}
            >
              <CellContent value={row.options} isBullet={true} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Brokerage;
