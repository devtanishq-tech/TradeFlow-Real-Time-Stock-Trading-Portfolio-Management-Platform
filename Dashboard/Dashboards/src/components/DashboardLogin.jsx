import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "./KiteAuth.css";

const EyeIcon = ({ open }) =>
  open ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#aaa"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.94 17.94A10.07 10.07 0 0112 20c-5 0-9.27-3.11-11-7.5a11.05 11.05 0 012.17-3.67M9.88 9.88A3 3 0 0114.12 14.12M3 3l18 18"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#aaa"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

const DashboardLogin = () => {
  // flash store the message
  const [flash, setflash] = useState("");
  const [show, setshow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (location.state?.message) {
      setflash(location.state.message);
      setshow(true);
      let timer = setTimeout(() => {
        setshow(false);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // VERY IMPORTANT (for cookies)
        // we use this creditionals:include , because from frontend , cookies are not send from frontend-to backend, inorder to do this we use this "includes"
      });

      const data = await res.json(); // data comes from the Backend
      // console.log(data);

      if (res.ok) {
        navigate("/", { state: { message: "Login Successful" } });
      } else {
        navigate("/login", { state: { message: data.message } });
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="kite-page">
      <div className="kite-page__body">
        {flash && (
          <div className={`flash-message error ${show ? "show" : "hide"}`}>
            {flash}
          </div>
        )}
        <div className="kite-card">
          {/* Logo */}
          <div className="text-center">
            <img src="logo.png" alt="Kite Logo" className="kite-logo" />
          </div>

          <h5 className="kite-title">Login to Kite</h5>

          <form onSubmit={handleLogin} className="kite-form">
            {/* Email — floating label */}
            <div className={`kite-form__group ${email ? "has-value" : ""}`}>
              <input
                type="email"
                className="kite-input kite-input--plain"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="kite-label">Email</label>
            </div>

            {/* Password — floating label */}
            <div className={`kite-form__group ${password ? "has-value" : ""}`}>
              <input
                type={showPassword ? "text" : "password"}
                className="kite-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="kite-label">Password</label>
              <span
                className="kite-eye-icon"
                onClick={() => setShowPassword(!showPassword)}
                role="button"
                aria-label="Toggle password visibility"
              >
                <EyeIcon open={showPassword} />
              </span>
            </div>

            <button type="submit" className="kite-btn">
              Login
            </button>

            <p className="kite-helper">
              <a href="#" className="kite-link">
                Forgot user ID or password?
              </a>
            </p>
          </form>
        </div>
      </div>

      <footer className="kite-footer">
        <div className="kite-footer__apps">
          <a href="#" aria-label="Google Play">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#aaa">
              <path d="M3.18 23.75a1.5 1.5 0 01-.68-.17A1.5 1.5 0 012 22.25V1.75A1.5 1.5 0 012.5.58l11.82 11.38L2.5 23.4a1.5 1.5 0 01-.32.35zM5.43 3.14L14.6 12 5.43 20.86 3.5 2.25l1.93.89zM16.1 9.73L6.56 2.27l9.35 4.52 1.97 1.23-1.78 1.71zM6.56 21.73l9.54-7.46-1.78-1.71-9.35 4.52 1.59 4.65z" />
            </svg>
          </a>
          <a href="#" aria-label="App Store">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#aaa">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
          </a>
        </div>

        <div className="kite-zerodha-brand">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#999">
            <rect x="2" y="2" width="20" height="20" rx="3" />
          </svg>
          <span className="kite-zerodha-text">ZERODHA</span>
        </div>

        <p className="kite-footer__signup">
          Don't have an account?{" "}
          <a href="/signup" className="kite-footer__link">
            Sign up for free!
          </a>
        </p>

        <p className="kite-footer__legal">
          Zerodha Broking Limited: Member of{" "}
          <a href="#" className="kite-footer__link">
            NSE
          </a>
          ,{" "}
          <a href="#" className="kite-footer__link">
            BSE
          </a>
          ,{" "}
          <a href="#" className="kite-footer__link">
            MCX
          </a>{" "}
          · SEBI Reg. no. INZ000031633,{" "}
          <a href="#" className="kite-footer__link">
            CDSL · SEBI
          </a>{" "}
          Reg. no. IN-DP-431-2019 |{" "}
          <a href="#" className="kite-footer__link">
            Smart Online Dispute Resolution
          </a>{" "}
          |{" "}
          <a href="#" className="kite-footer__link">
            SEBI SCORES
          </a>
        </p>

        <p className="kite-version">v3.0.0</p>
      </footer>
    </div>
  );
};

export default DashboardLogin;
