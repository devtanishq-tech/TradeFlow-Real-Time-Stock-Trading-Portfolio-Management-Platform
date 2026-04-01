import React from "react";

function Universe() {
  return (
    <div className="container">
      <div className="row text-center">
        <h1>The Zerodha Universe</h1>
        <p style={{ color: "#424242" }}>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-4 p-3">
          {/* ✅ Fixed height logo box */}
          <div
            style={{
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                maxHeight: "80px",
                maxWidth: "50%",
                objectFit: "contain",
              }}
              src="/media/images/zerodhaFundhouse.png"
              alt="Zerodha Fund House"
            />
          </div>
          <p className="mt-3 text-small text-muted">
            Our asset management venture that is creating simple and transparent
            index funds to help you save for your goals
          </p>
        </div>

        <div className="col-4 p-3">
          <div
            style={{
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                maxHeight: "80px",
                maxWidth: "50%",
                objectFit: "contain",
              }}
              src="/media/images/sensibullLogo.svg"
              alt="Sensibull"
            />
          </div>
          <p className="mt-3 text-small text-muted">
            Options trading platform that lets you create strategies, analyze
            positions, and examine data points like open interest, FII/DII, and
            more.
          </p>
        </div>

        <div className="col-4 p-3">
          <div
            style={{
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                maxHeight: "80px",
                maxWidth: "40%",
                objectFit: "contain",
              }}
              src="/media/images/tijori.svg"
              alt="Tijori"
            />
          </div>
          <p className="mt-3 text-small text-muted">
            Investment research platform that offers detailed insights on
            stocks, sectors, supply chains, and more.
          </p>
        </div>

        <div className="col-4 p-3 mt-5">
          <div
            style={{
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                maxHeight: "80px",
                maxWidth: "50%",
                objectFit: "contain",
              }}
              src="/media/images/streakLogo.png"
              alt="Streak"
            />
          </div>
          <p className="mt-3 text-small text-muted">
            Our asset management venture that is creating simple and transparent
            index funds to help you save for your goals
          </p>
        </div>

        <div className="col-4 p-3 mt-5">
          <div
            style={{
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                maxHeight: "80px",
                maxWidth: "50%",
                objectFit: "contain",
              }}
              src="/media/images/smallcaseLogo.png"
              alt="Smallcase"
            />
          </div>
          <p className="mt-3 text-small text-muted">
            Options trading platform that lets you create strategies, analyze
            positions, and examine data points like open interest, FII/DII, and
            more.
          </p>
        </div>

        <div className="col-4 p-3 mt-5">
          <div
            style={{
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                maxHeight: "80px",
                maxWidth: "36%",
                objectFit: "contain",
              }}
              src="/media/images/dittoLogo.png"
              alt="Ditto"
            />
          </div>
          <p className="mt-3 text-small text-muted">
            Investment research platform that offers detailed insights on
            stocks, sectors, supply chains, and more.
          </p>
        </div>
        <button
          className="p-2 btn btn-primary fs-5 mb-5 mx-auto d-block"
          style={{ width: "20%", color: "white" }}
        >
          Sign up for free
        </button>
      </div>
    </div>
  );
}

export default Universe;
