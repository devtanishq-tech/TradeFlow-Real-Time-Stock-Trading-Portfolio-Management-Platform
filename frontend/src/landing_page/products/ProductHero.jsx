import React from "react";

function ProductHero() {
  return (
    <div className="container border-bottom mb-5">
      <div className="text-center mt-5 p-5">
        <h1 className="height">Zerodha Products</h1>
        <p
          style={{ color: "#424242", fontWeight: "400" }}
          className="mt-3 fs-4"
        >
          Sleek, modern, and intuitive trading platforms
        </p>
        <p
          style={{ color: "#424242", fontSize: "1rem", lineHeight: "1.8" }}
          className="mt-3"
        >
          Check out our{" "}
          <a style={{ textDecoration: "none" }} href="#">
            investment offerings{" "}
            <i
              className="fa-solid fa-arrow-right-long"
              style={{ color: "#387ED1" }}
            ></i>
          </a>
        </p>
      </div>
    </div>
  );
}

export default ProductHero;
