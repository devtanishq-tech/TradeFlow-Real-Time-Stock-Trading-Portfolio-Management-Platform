import React, { useState, useMemo } from "react";
import PortfolioChart from "./Portfoliochart";
import { useEffect } from "react";
import axios from "axios";
// =============  totalInvestment,currentValue,pnl,pnlPercent // comes from dashboard jsx code =====
const Summary = ({
  holdings,
  portfolioHistory,
  totalInvestment,
  currentValue,
  pnl,
  pnlPercent,
}) => {
  const [user, setuser] = useState({});
  // const totalInvestment = useMemo(() => {
  //   return holdings.reduce((sum, s) => sum + s.avg * s.qty, 0);
  // }, [holdings]);
  //==================================== Chart data =====================================
  const chartData = useMemo(() => {
    if (!portfolioHistory.length) return [];

    return portfolioHistory.map((value, index) => ({
      name: index,
      value: value - totalInvestment,
    }));
  }, [portfolioHistory, totalInvestment]);
  //============================Practisign request sending =========================
  useEffect(() => {
    axios
      .get("http://localhost:8080/me", { withCredentials: true })
      .then((res) => {
        setuser(res.data);
      })
      .catch((err) => {
        console.log(`Some error occur at :`, err);
      });
  }, []);
  //===========================================================================
  return (
    <>
      {/* Portfolio Chart */}
      <PortfolioChart data={chartData} />

      {/* User Greeting */}
      <div className="username">
        <h6>Hi, {user.userName || "Hi User"}</h6>
        <hr className="divider" />
      </div>

      {/* Equity Section */}
      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>
              {" "}
              {currentValue.toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
            </h3>
            <p>Margin available</p>
          </div>

          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>
            </p>
            <p>
              Opening balance <span>3.74k</span>
            </p>
          </div>
        </div>

        <hr className="divider" />
      </div>

      {/* Holdings Section */}
      <div className="section">
        <span>
          <p>Holdings (13)</p>
        </span>

        <div className="data">
          <div className="first">
            {/**jj */}
            <h3 className={pnl >= 0 ? "profit" : "loss"}>
              {pnl.toLocaleString("en-IN")}{" "}
              <small>
                {pnl >= 0 ? "+" : ""}
                {pnlPercent}%
              </small>
            </h3>

            <p>P&amp;L</p>
          </div>

          <hr />

          <div className="second">
            <p>
              Current Value <span> {currentValue.toLocaleString("en-IN")}</span>
            </p>
            <p>
              Investment <span> {totalInvestment.toLocaleString("en-IN")}</span>
            </p>
          </div>
        </div>

        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
