import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{ backgroundColor: "white" }}
      className="navbar navbar-expand-lg border-bottom sticky-top bg-white"
    >
      <div className="container p-2">
        <Link className="navbar-brand" to={"/"}>
          <img
            style={{ width: "25%" }}
            src="/media/images/logo.svg"
            alt="Logo"
          ></img>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarScroll">
          <form className="d-flex" role="search">
            <ul
              className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
              style={{ "--bs-scroll-height": "100px" }}
            >
              <li className="nav-item">
                <Link
                  to={"/signup"}
                  className="nav-link active"
                  aria-current="page"
                >
                  Signup
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/about"} className="nav-link active">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={"/products"}>
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={"/pricing"}>
                  Pricing
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={"/support"}>
                  Support
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={"/"}>
                  <i className="fa-solid fa-bars"></i>
                </Link>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
