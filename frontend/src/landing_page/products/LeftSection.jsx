import React from "react";

function LeftSection({
  imageUrl,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        {/* Left: Image Column */}
        <div className="col-12 col-lg-7 text-center">
          <img src={imageUrl} className="img-fluid" alt={productName} />
        </div>

        {/* Right: Content Column */}
        <div className="col-12 col-lg-5 mt-5 mt-lg-0 ps-lg-4">
          <h2 style={{ fontSize: "28px", color: "#424242" }}>{productName}</h2>
          <p style={{ color: "#424242" }} className="mt-3">
            {productDescription}
          </p>

          {(tryDemo || learnMore) && (
            <div className="d-flex gap-4 mt-3">
              {tryDemo && (
                <a
                  href="#"
                  style={{ textDecoration: "none", color: "#387ED1" }}
                >
                  {tryDemo} <i className="fa-solid fa-arrow-right-long"></i>
                </a>
              )}

              {learnMore && (
                <a
                  href="#"
                  style={{ textDecoration: "none", color: "#387ED1" }}
                >
                  {learnMore} <i className="fa-solid fa-arrow-right-long"></i>
                </a>
              )}
            </div>
          )}

          <div className="d-flex gap-3 mt-4">
            <a href={googlePlay}>
              <img
                src="/media/images/googlePlayBadge.svg"
                alt="Get it on Google Play"
              />
            </a>
            <a href={appStore}>
              <img
                src="/media/images/appstoreBadge.svg"
                alt="Download on the App Store"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
