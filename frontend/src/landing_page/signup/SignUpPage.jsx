import React from "react";

// Components
import Navbar from "../Navbar"; // adjust path if needed
import SignUpHero from "./SignUpHero";
import InvestmentOptions from "./InvestmentOptions";
import StepsSection from "./StepsSection";
import Benefits from "./Benefits";
import AccountTypes from "./AccountTypes";
import FAQs from "./FAQs";
import OpenAccount from "../OpenAccount";
import Footer from "../Footer"; // adjust path if needed

function SignUpPage() {
  return (
    <>
      <SignUpHero />

      <InvestmentOptions />

      <StepsSection />

      <Benefits />

      <AccountTypes />

      <FAQs />

      <OpenAccount />
    </>
  );
}

export default SignUpPage;
