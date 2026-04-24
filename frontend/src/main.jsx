import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// this is where index.css styling is occuring
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import HomePage from "./landing_page/home/HomePage.jsx";
import SignUpPage from "./landing_page/signup/SignUpPage.jsx";
import AboutPage from "./landing_page/about/AboutPage.jsx";
import ProductPage from "./landing_page/products/ProductPage.jsx";
import PricingPage from "./landing_page/pricing/PricingPage.jsx";
import SupportPage from "./landing_page/support/SupportPage.jsx";
// import App from "./App.jsx";
import Navbar from "./landing_page/Navbar.jsx";
import Footer from "./landing_page/Footer.jsx";
import Error from "./landing_page/Error.jsx";
// //Dashboard imports
// import DashboardLogin from "../../Dashboard/Dashboards/src/components/DashboardLogin";
// import DashboardSignup from "../../Dashboard/Dashboards/src/components/DashboardSignup";
// import Dashboard from "../../Dashboard/Dashboards/src/components/Dashboard";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* Common routes are written here  */}
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="pricing" element={<PricingPage />} />
      <Route path="/support" element={<SupportPage />} />
      {/* 🔥 ADD THESE */}
      {/* <Route path="/dashboard/login" element={<DashboardLogin />} />
      <Route path="/dashboard/signup" element={<DashboardSignup />} />
      <Route path="/dashboard/*" element={<Dashboard />} /> */}
      <Route path="*" element={<Error />} />
    </Routes>
    <Footer />
  </BrowserRouter>,
);
