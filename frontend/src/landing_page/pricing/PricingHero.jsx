import React from "react";

function PricingHero() {
  return (
    <div className="container">
      {/* Header Section */}
      <div className="row text-center mt-5 pb-4">
        <div className="col-12">
          <h1
            style={{
              color: "#424242",
              fontSize: "1.75rem",
              lineHeight: "1.25",
              fontWeight: "500",
            }}
          >
            Charges
          </h1>

          <p
            style={{
              color: "#9B9B9B",
              fontSize: "1.25rem",
              fontWeight: "400",
            }}
          >
            List of all charges and taxes
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="row text-center mt-5">
        <div className="col-12 col-lg-4">
          <img
            style={{ width: "65%" }}
            src="/media/images/pricingEquity.svg"
            alt="Equity pricing"
            className=""
          />
          <h2
            style={{
              color: "#424242",
              fontSize: "1.75rem",
              lineHeight: "1.6",
              fontWeight: "500",
            }}
            className="mt-3"
          >
            Free equity delivery
          </h2>
          <p style={{ color: "#666666" }}>
            All equity delivery investments (NSE, BSE), <br></br>are absolutely
            free — ₹ 0 brokerage.
          </p>
        </div>

        <div className="col-12 col-lg-4">
          <img
            style={{ width: "65%" }}
            src="/media/images/intradayTrades.svg"
            alt="Equity pricing"
            className=""
          />
          <h2
            style={{
              color: "#424242",
              fontSize: "1.75rem",
              lineHeight: "1.6",
              fontWeight: "500",
            }}
            className="mt-3"
          >
            Free equity delivery
          </h2>
          <p style={{ color: "#666666" }}>
            Flat ₹ 20 or 0.03% (whichever is lower) per <br></br> executed order
            on intraday trades across <br></br>equity, currency, and commodity
            trades. Flat<br></br> ₹20 on all option trades.
          </p>
        </div>
        <div className="col-12 col-lg-4">
          <img
            style={{ width: "65%" }}
            src="/media/images/pricingEquity.svg"
            alt="Equity pricing"
            className=""
          />
          <h2
            style={{
              color: "#424242",
              fontSize: "1.75rem",
              lineHeight: "1.6",
              fontWeight: "500",
            }}
            className="mt-3"
          >
            Free equity delivery
          </h2>
          <p style={{ color: "#666666", lineHeight: "1.8", fontSize: "1rem" }}>
            All direct mutual fund investments are<br></br>absolutely free — ₹ 0
            commissions & DP<br></br> charges.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PricingHero;
