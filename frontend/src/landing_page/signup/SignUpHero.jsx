import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

/** Generates a random 4-digit code (1000–9999) once on component mount */
const generateCode = () => String(Math.floor(1000 + Math.random() * 9000));

function SignUpHero() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(""); // keep track of input Number
  const [captcha] = useState(generateCode); // fixed for the lifetime of this render
  const [captchaInput, setCaptchaInput] = useState(""); // keep track of userOtp input
  const [error, setError] = useState(""); // used to show ui error msg
  const [verified, setVerified] = useState(false); // keep track does user is verified or not , ots is sent futher or not
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // in this main use of useCall back is to avoid recreationof of this function to optimized code and its performance
  const handleGetOtp = useCallback(async () => {
    // 1. CAPTCHA VALIDATION
    if (captchaInput.trim() !== captcha) {
      setError("Incorrect code. Please re-enter the code shown above.");
      setCaptchaInput("");
      return;
    }

    setError("");

    try {
      // 2. 🔥 CALL BACKEND (THIS IS YOUR FETCH LINE)
      // ===================Backend URL==============================
      const BASE_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${BASE_URL}/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile }),
      });

      const data = await res.json();

      // 3. HANDLE ERROR FROM BACKEND
      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      // 4. SUCCESS
      // at this place this means user is now completely verified , now you can got to the sign page route
      setVerified(true);

      // 5. 🔥 NAVIGATE TO NEXT PAGE
      const DASHBOARD_URL = import.meta.env.VITE_DASHBOARD_URL;
      window.open(`${DASHBOARD_URL}/signup?mobile=${mobile}`, "_blank");
      // window.open(`/dashboard/signup?mobile=${mobile}`, "_blank");
    } catch (err) {
      setError("Server error. Try again.", err);
    }
  }, [captcha, captchaInput, mobile, navigate]);

  return (
    <section style={{ padding: "60px 0 80px" }}>
      {/* ── Top: Centered Heading ── */}
      <div className="container text-center mb-5">
        <h1
          className="fw-semibold mb-3"
          style={{
            fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
            color: "#424242",
            letterSpacing: "-0.3px",
            lineHeight: 1.25,
          }}
        >
          Open a free demat and trading account online
        </h1>
        <p
          className="text-muted"
          style={{ fontSize: "1.05rem", maxWidth: 560, margin: "0 auto" }}
        >
          Start investing brokerage free and join a community of 1.6+ crore
          investors and traders
        </p>
      </div>

      {/* ── Bottom: Two Columns ── */}
      <div className="container">
        <div className="row align-items-center g-4">
          {/* Left – Product image */}
          <div className="col-md-7 text-center">
            <img
              src="/media/images/consolePage.svg"
              alt="Zerodha platform preview"
              className="img-fluid shadow-sm"
              style={{ maxWidth: 520, borderRadius: 8 }}
            />
          </div>

          {/* Right – Signup card */}
          <div className="col-md-5">
            <h2
              className="fw-semibold mb-1"
              style={{ fontSize: "1.75rem", color: "#1a1a1a" }}
            >
              Signup now
            </h2>
            <p className="text-muted mb-4" style={{ fontSize: "0.95rem" }}>
              Or track your existing application
            </p>

            {/* ── Mobile number input ── */}
            <div
              className="input-group mb-3"
              style={{
                borderRadius: 6,
                overflow: "hidden",
                border: "1px solid #d1d5db",
              }}
            >
              <span
                className="input-group-text bg-white border-0"
                style={{ gap: 6, paddingLeft: 14, paddingRight: 10 }}
              >
                <svg
                  width="22"
                  height="16"
                  viewBox="0 0 22 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ borderRadius: 2, flexShrink: 0 }}
                >
                  <rect width="22" height="5.33" fill="#FF9933" />
                  <rect y="5.33" width="22" height="5.34" fill="white" />
                  <rect y="10.67" width="22" height="5.33" fill="#138808" />
                  <circle
                    cx="11"
                    cy="8"
                    r="2"
                    stroke="#000080"
                    strokeWidth="0.6"
                    fill="none"
                  />
                </svg>
                <span
                  style={{
                    fontSize: "0.95rem",
                    color: "#374151",
                    fontWeight: 500,
                  }}
                >
                  +91
                </span>
              </span>

              <span
                className="input-group-text bg-white border-0 p-0"
                style={{ borderLeft: "1px solid #d1d5db" }}
              />

              <input
                type="tel"
                className="form-control border-0 shadow-none"
                placeholder="Enter your mobile number"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                style={{ fontSize: "0.95rem", paddingLeft: 14, color: "#111" }}
              />
            </div>

            {/* ── Captcha block ── */}
            <div
              className="mb-3 p-3"
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                backgroundColor: "#f9fafb",
              }}
            >
              <p
                className="mb-2"
                style={{
                  fontSize: "0.78rem",
                  color: "#6b7280",
                  fontWeight: 500,
                }}
              >
                Enter the code below to verify
              </p>

              {/* Generated code display */}
              <div
                className="d-flex align-items-center justify-content-center mb-3"
                style={{
                  background: "#fff",
                  border: "1px dashed #cbd5e1",
                  borderRadius: 6,
                  padding: "10px 0",
                  letterSpacing: "0.4em",
                  fontSize: "1.7rem",
                  fontWeight: 700,
                  color: "#111827",
                  fontFamily: "'Courier New', monospace",
                  userSelect: "none",
                  backgroundImage:
                    "repeating-linear-gradient(115deg, transparent, transparent 8px, rgba(0,0,0,0.025) 8px, rgba(0,0,0,0.025) 9px)",
                }}
                aria-label="Verification code"
              >
                {captcha}
              </div>

              {/* User entry */}
              <input
                type="text"
                inputMode="numeric"
                className="form-control shadow-none text-center"
                placeholder="Type the 4-digit code"
                maxLength={4}
                value={captchaInput}
                onChange={(e) => {
                  setError("");
                  setCaptchaInput(e.target.value.replace(/\D/g, ""));
                }}
                style={{
                  fontSize: "1.05rem",
                  letterSpacing: "0.25em",
                  borderColor: error ? "#ef4444" : "#d1d5db",
                  borderRadius: 6,
                  color: "#111",
                  transition: "border-color 0.15s",
                }}
              />

              {error && (
                <p
                  className="mb-0 mt-2"
                  style={{ fontSize: "0.78rem", color: "#ef4444" }}
                  role="alert"
                >
                  ⚠ {error}
                </p>
              )}
            </div>

            {/* ── CTA Button ── */}
            <button
              className="btn w-100 fw-semibold"
              onClick={handleGetOtp}
              disabled={verified}
              style={{
                backgroundColor: verified ? "#6b9fd4" : "#387ed1",
                color: "#fff",
                padding: "13px 0",
                fontSize: "1rem",
                borderRadius: 6,
                border: "none",
                letterSpacing: "0.2px",
                cursor: verified ? "default" : "pointer",
                transition: "background-color 0.2s",
              }}
            >
              {verified ? "OTP Sent ✓" : "Get OTP"}
            </button>

            {/* Footer disclaimer */}
            <p className="text-muted mt-3" style={{ fontSize: "0.82rem" }}>
              By proceeding, you agree to the Zerodha{" "}
              <a href="#" style={{ color: "#387ed1", textDecoration: "none" }}>
                terms
              </a>{" "}
              &amp;{" "}
              <a href="#" style={{ color: "#387ed1", textDecoration: "none" }}>
                privacy policy
              </a>
            </p>

            <p
              className="mt-2"
              style={{ fontSize: "0.85rem", color: "#374151" }}
            >
              Looking to open NRI account?{" "}
              <a
                href="#"
                style={{
                  color: "#387ed1",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Click here
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpHero;
