import React from "react";
function OpenAccount() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1 style={{ fontWeight: "520" }} className="fs-3">
          Open a Zerodha account
        </h1>
        <p className="text-muted">
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
          F&O trades.
        </p>
        <button
          className="p-2 btn btn-primary fs-5 mb-5 "
          style={{ width: "20%", margin: "0 auto", color: "white" }}
        >
          {" "}
          Sign up for free
        </button>
      </div>
    </div>
  );
}

export default OpenAccount;
