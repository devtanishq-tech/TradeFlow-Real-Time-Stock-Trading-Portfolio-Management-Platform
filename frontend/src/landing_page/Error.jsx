import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="container mt-5">
      <div className="row text-center justify-content-center">
        <h1 className="fs-2 fw-semibold mb-3">404 Not Found</h1>

        <p className="text-muted mb-4">
          Sorry, the page you are looking for does not exist
        </p>

        <Link
          to="/"
          className="btn btn-primary  mb-5 px-5 py-2 fs-5"
          style={{
            width: "250px",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
