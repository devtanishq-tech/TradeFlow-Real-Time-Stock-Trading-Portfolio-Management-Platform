import React from "react";

function CreateTicket() {
  const accountOpeningLinks = [
    "Online Account Opening",
    "Offline Account Opening",
    "Company, Partnership and HUF Account Opening",
    "NRI Account Opening",
    "Charges at Zerodha",
    "Zerodha IDFC FIRST Bank 3-in-1 Account",
    "Getting Started",
  ];

  const zerodhaAccountLinks = [
    "Login Credentials",
    "Account Modification and Segment Addition",
    "DP ID and bank details",
    "Your Profile",
    "Transfer and conversion of shares",
  ];

  const tradingLinks = [
    "Margin/leverage, Product and Order types",
    "Kite Web and Mobile",
    "Trading FAQs",
    "Corporate Actions",
    "Sentinel",
    "Kite API",
    "Pi and other platform",
    "Stockreports+",
    "GTT",
  ];

  const fundsLinks = [
    "Adding Funds",
    "Fund Withdrawal",
    "eMandates",
    "Adding Bank Accounts",
  ];

  const consoleLinks = [
    "Reports",
    "Ledger",
    "Portfolio",
    "60 Day Challenge",
    "IPO",
    "Referral Program",
  ];

  const coinLinks = [
    "Understanding Mutual Funds",
    "About Coin",
    "Buying and Selling through Coin",
    "Starting an SIP",
    "Managing your Portfolio",
    "Coin App",
    "Moving to Coin",
    "Government Securities",
  ];

  return (
    <div className="container">
      {/* 🔹 TITLE */}
      <div className="row p-5 mt-5">
        <h1 className="fs-2 mb-4">
          To create a ticket, select a relevant topic
        </h1>

        {/* FIRST ROW */}
        <div className="col-md-4 p-4">
          <h4>
            <i className="fa fa-plus-circle me-2"></i>
            Account Opening
          </h4>

          {accountOpeningLinks.map((text, index) => (
            <div key={index}>
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                {text}
              </a>
            </div>
          ))}
        </div>

        <div className="col-md-4 p-4">
          <h4>
            <i className="fa fa-user me-2"></i>
            Your Zerodha Account
          </h4>

          {zerodhaAccountLinks.map((text, index) => (
            <div key={index}>
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                {text}
              </a>
            </div>
          ))}
        </div>

        <div className="col-md-4 p-4">
          <h4>
            <i className="fa fa-bar-chart me-2"></i>
            Your Zerodha Account
          </h4>

          {tradingLinks.map((text, index) => (
            <div key={index}>
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                {text}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 SECOND ROW (FIXED POSITION) */}
      <div className="row p-5 mb-5">
        <div className="col-md-4 p-4">
          <h4>
            <i className="fa fa-credit-card me-2"></i>
            Funds
          </h4>

          {fundsLinks.map((text, index) => (
            <div key={index}>
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                {text}
              </a>
            </div>
          ))}
        </div>

        <div className="col-md-4 p-4">
          <h4>
            <i className="fa fa-circle-o me-2"></i>
            Console
          </h4>

          {consoleLinks.map((text, index) => (
            <div key={index}>
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                {text}
              </a>
            </div>
          ))}
        </div>

        <div className="col-md-4 p-4">
          <h4>
            <i className="fa fa-circle-thin me-2"></i>
            Coin
          </h4>

          {coinLinks.map((text, index) => (
            <div key={index}>
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                {text}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
