import React from "react";

function SupportHero() {
  return (
    <section id="supportHero">
      {/* Support Portal Row */}
      <div id="supportWrapper">
        <span style={{ fontWeight: "600", fontSize: "1.05rem" }}>
          Support Portal
        </span>
        <a href="#">Track Tickets</a>
      </div>

      {/* Main Content */}
      <div className="row" id="supportContent">
        {/* Left */}
        <div className="col-lg-7 col-md-12">
          <h2 id="supportHeading">
            Search for an answer or browse help topics to create a ticket
          </h2>
          <input
            id="supportInput"
            placeholder="Eg: how do i activate F&O, why is my order getting rejected.."
          />
          <div id="supportLinks">
            <a href="#">Track account opening</a>
            <a href="#">Track segment activation</a>
            <a href="#">Intraday margins</a>
            <a href="#">Kite user manual</a>
          </div>
        </div>

        {/* Right */}
        <div className="col-lg-5 col-md-12" id="supportFeatured">
          <h3>Featured</h3>
          <ol>
            <li>
              <a href="#">Current Takeovers and Delisting – January 2024</a>
            </li>
            <li>
              <a href="#">Latest Intraday leverages – MIS & CO</a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default SupportHero;
