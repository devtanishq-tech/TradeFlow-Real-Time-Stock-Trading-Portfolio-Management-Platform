import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import ContextWindowProvider from "./ContextWindow";
import axios from "axios";
import AIChatAssistant from "./AIChatAssistant";

const Dashboard = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const WS_URL = import.meta.env.VITE_WS_URL;

  const [holdings, setHoldings] = useState([]);
  const [livePrices, setLivePrices] = useState({});
  const [portfolioHistory, setPortfolioHistory] = useState([]);

  // ✅ ADD THIS (you missed it)
  const [refreshOrders, setRefreshOrders] = useState(false);

  // ================= Portfolio History =================
  useEffect(() => {
    const saved = localStorage.getItem("portfolioHistory");
    if (saved) setPortfolioHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (!holdings.length) return;

    let total = 0;

    holdings.forEach((stock) => {
      const live = livePrices[stock.name] ?? stock.avg;
      total += live * stock.qty;
    });

    if (!isFinite(total)) return;

    setPortfolioHistory((prev) => [...prev, total].slice(-50));
  }, [livePrices, holdings]);

  useEffect(() => {
    localStorage.setItem("portfolioHistory", JSON.stringify(portfolioHistory));
  }, [portfolioHistory]);

  // ================= Fetch Holdings =================
  useEffect(() => {
    axios
      .get(`${BASE_URL}/holdings`, { withCredentials: true })
      .then((res) => setHoldings(res.data))
      .catch(console.log);
  }, []);

  // ================= WebSocket =================
  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => console.log("🟢 Connected to WebSocket");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setLivePrices((prev) => ({
        ...prev,
        ...data,
      }));
    };

    ws.onclose = () => console.log("🔴 WebSocket disconnected");

    return () => ws.close();
  }, []);

  // ================= Calculations =================
  const totalInvestment = holdings.reduce((sum, s) => sum + s.avg * s.qty, 0);

  const currentValue = holdings.reduce((sum, s) => {
    const live = livePrices[s.name] ?? s.avg;
    return sum + live * s.qty;
  }, 0);

  const pnl = currentValue - totalInvestment;

  const pnlPercent =
    totalInvestment > 0 ? ((pnl / totalInvestment) * 100).toFixed(2) : "0.00";

  return (
    <ContextWindowProvider
      setHoldings={setHoldings}
      triggerOrdersRefresh={() => setRefreshOrders((prev) => !prev)}
    >
      <div className="dashboard-container">
        <WatchList livePrices={livePrices} />

        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <Summary
                  holdings={holdings}
                  livePrices={livePrices}
                  portfolioHistory={portfolioHistory}
                  totalInvestment={totalInvestment}
                  currentValue={currentValue}
                  pnl={pnl}
                  pnlPercent={pnlPercent}
                />
              }
            />

            {/* ✅ FIXED: pass refreshOrders */}
            <Route
              path="/orders"
              element={
                <Orders livePrices={livePrices} refreshOrders={refreshOrders} />
              }
            />

            <Route
              path="/holdings"
              element={
                <Holdings
                  holdings={holdings}
                  livePrices={livePrices}
                  portfolioHistory={portfolioHistory}
                />
              }
            />

            <Route
              path="/positions"
              element={<Positions livePrices={livePrices} />}
            />

            <Route path="/funds" element={<Funds />} />
            <Route path="/apps" element={<Apps />} />
          </Routes>
        </div>

        <AIChatAssistant livePrices={livePrices} holdings={holdings} />
      </div>
    </ContextWindowProvider>
  );
};

export default Dashboard;
