import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import "./flash.css";

const Home = () => {
  const location = useLocation();
  const [flash, setFlash] = useState("");

  useEffect(() => {
    if (location.state?.message) {
      setFlash(location.state.message);

      // remove message after 3 sec
      setTimeout(() => {
        setFlash("");
      }, 3000);
    }
  }, [location.state]);

  return (
    <div className="app-shell">
      {flash && (
        <div className={`flash-message ${flash ? "show" : ""}`}>{flash}</div>
      )}

      <TopBar />
      <Dashboard />
    </div>
  );
};

export default Home;
