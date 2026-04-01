import React from "react";
import Navbar from "../Navbar"; // adjust path if needed
import ProductHero from "./ProductHero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";
import Footer from "../Footer"; // adjust path if needed

function ProductPage() {
  return (
    <>
      <ProductHero />

      <LeftSection
        imageUrl={"/media/images/kite.png"}
        productName={"Kite"}
        productDescription={
          "Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."
        }
        tryDemo={"Try demo "}
        learnMore={"Learn more"}
      />

      <RightSection
        imageUrl={"/media/images/coin.png"}
        productName={"Console"}
        productDescription={
          "The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations.."
        }
        tryDemo={"Learn more"}
      />
      <LeftSection
        imageUrl={"/media/images/coin.png"}
        productName={"Coin"}
        productDescription={
          "Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices."
        }
        tryDemo={"Coin"}
      />
      <RightSection
        imageUrl={"/media/images/coin.png"}
        productName={"Kite Connect API"}
        productDescription={
          "Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase."
        }
        tryDemo={"Kite Connect"}
      />
      <LeftSection
        imageUrl={"/media/images/kite.png"}
        productName={"Kite"}
        productDescription={
          "Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."
        }
      />

      <Universe />
    </>
  );
}

export default ProductPage;
