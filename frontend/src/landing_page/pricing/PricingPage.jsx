import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PricingHero from "./PricingHero";
import Brokerage from "./Brokerage";
function PricingPage() {
  return (
    <>
      <PricingHero />
      <Brokerage />
    </>
  );
}

export default PricingPage;
