import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import "./App.css";
import "./watchlist.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import DashboardLogin from "./components/DashboardLogin";
import DashboardSignup from "./components/DashboardSignup";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <Routes>
        {/* 🔥 AUTH ROUTES */}
        <Route path="/login" element={<DashboardLogin />} />
        <Route path="/signup" element={<DashboardSignup />} />

        {/*Dashboards */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </>,
);
