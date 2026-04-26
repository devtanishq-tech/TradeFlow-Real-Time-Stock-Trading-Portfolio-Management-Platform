import React, { useState } from "react";
import { useEffect } from "react";
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
  const [holdings, setHoldings] = useState([]); // cuz data comes from the hold are in array State
  const [livePrices, setlivePrices] = useState({});
  const [portfolioHistory, setPortfolioHistory] = useState([]);
  const [refreshOrders, setRefreshOrders] = useState(false);
  /// ========================================Local Storage PortFolioHistory here ==========================================
  useEffect(() => {
    const saved = localStorage.getItem("portfolioHistory");

    if (saved) {
      setPortfolioHistory(JSON.parse(saved));
    }
  }, []);
  useEffect(() => {
    if (!holdings.length) return;

    let total = 0;

    holdings.forEach((stock) => {
      const live = livePrices[stock.name] ?? stock.avg;
      total += live * stock.qty;
    });

    if (!isFinite(total)) return;

    setPortfolioHistory((prev) => {
      const updated = [...prev, total];
      return updated.slice(-50);
    });
  }, [livePrices, holdings]);
  useEffect(() => {
    localStorage.setItem("portfolioHistory", JSON.stringify(portfolioHistory));
  }, [portfolioHistory]);
  // ===========================================Calculation of Holding occur ==------------------------------------------
  useEffect(() => {
    axios
      .get(`${BASE_URL}/holdings`, { withCredentials: true })
      .then((res) => {
        setHoldings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    // webSockert already stores in the browserx
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("🟢 Connected to backend WebSocket");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data); // readable format conversion that data comes from the backed

      console.log("📡 Live data:", data); // DEBUG
      //============This is where updation of Prices occur in this ========================//
      setlivePrices((prev) => ({
        ...prev,
        ...data,
      }));
    };

    ws.onclose = () => {
      console.log("🔴 WebSocket disconnected");
    };

    return () => ws.close();
  }, []);
  //===========================Logic Come from the Holdings /========================
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
      triggerOrdersRefresh={setRefreshOrders(prev => !prev)}
    >
      <div className="dashboard-container">
        <WatchList livePrices={livePrices} />
        <div className="content">
          <Routes>
            <Route
              exact
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
