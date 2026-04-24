import React from "react";

// Components
import Navbar from "../Navbar"; // adjust path if needed
import SignUpHero from "./SignUpHero";
import InvestmentOptions from "./InvestmentOptions";

function SignUpPage() {
  return (
    <>
      <SignUpHero />

      <InvestmentOptions />

      {/* <StepsSection />

      <Benefits />

      <AccountTypes />

      <FAQs />

      <OpenAccount /> */}
    </>
  );
}

export default SignUpPage;
