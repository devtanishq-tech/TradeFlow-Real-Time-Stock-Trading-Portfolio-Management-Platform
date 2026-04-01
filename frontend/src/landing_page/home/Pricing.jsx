import React from "react";

function Pricing() {
  return (
    <div className="container p-3">
      <div className="row px-5 pb-5 align-items-center">
        <div className="col-5 px-5">
          <h1 className="fs-2 mb-4">Unbeatable pricing</h1>
          <p className="text-muted">
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
          <a style={{ textDecoration: "none" }} href="#">
            See pricing{" "}
            <i
              className="fa-solid fa-arrow-right-long"
              style={{ color: "#387ED1" }}
            ></i>
          </a>
        </div>

        <div className="col-7">
          <div className="row">
            <div className="col-4 d-flex align-items-center">
              <img
                src="/media/images/pricing0.svg"
                alt="Free account opening"
                style={{ width: "70px", flexShrink: 0 }}
              />
              <div
                style={{
                  borderLeft: "2px dotted #ccc",
                  height: "40px",
                  margin: "0 12px",
                  flexShrink: 0,
                }}
              ></div>
              <p
                className="text-muted mb-0"
                style={{ fontSize: "0.8rem", lineHeight: "1.4" }}
              >
                Free account
                <br />
                opening
              </p>
            </div>

            <div className="col-4 d-flex align-items-center">
              <img
                src="/media/images/pricingEquity.svg"
                alt="Free equity delivery"
                style={{ width: "70px", flexShrink: 0 }}
              />
              <div
                style={{
                  borderLeft: "2px dotted #ccc",
                  height: "40px",
                  margin: "0 12px",
                  flexShrink: 0,
                }}
              ></div>
              <p
                className="text-muted mb-0"
                style={{ fontSize: "0.8rem", lineHeight: "1.4" }}
              >
                Free equity delivery
                <br />
                and direct mutual funds
              </p>
            </div>

            <div className="col-4 d-flex align-items-center">
              <img
                src="/media/images/intradayTrades.svg"
                alt="Intraday and F&O"
                style={{ width: "70px", flexShrink: 0 }}
              />
              <div
                style={{
                  borderLeft: "2px dotted #ccc",
                  height: "40px",
                  margin: "0 12px",
                  flexShrink: 0,
                }}
              ></div>
              <p
                className="text-muted mb-0"
                style={{ fontSize: "0.8rem", lineHeight: "1.4" }}
              >
                Intraday and
                <br />
                F&amp;O
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
