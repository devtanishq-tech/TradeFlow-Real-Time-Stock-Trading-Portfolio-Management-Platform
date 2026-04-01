import React from "react";
function Education() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 mb-5">
          <img style={{ width: "70%" }} src="/media/images/education.svg"></img>
        </div>
        <div className="col-6">
          <h1 className="mb-3 fs-2">Free and open market education </h1>
          <p>
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>
          <a style={{ textDecoration: "none" }} href="#">
            Varsity{" "}
            <i
              className="fa-solid fa-arrow-right-long"
              style={{ color: "#387ED1" }}
            ></i>
          </a>
          <p className="mt-5">
            TradingQ&A, the most active trading and investment community in
            India for all your market related queries.
          </p>
          <a style={{ textDecoration: "none" }} href="#">
            TradingQ&A{" "}
            <i
              className="fa-solid fa-arrow-right-long"
              style={{ color: "#387ED1" }}
            ></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Education;
