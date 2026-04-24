import React from "react";

const investmentData = [
  {
    id: "stocks",
    icon: "media/images/stocksss.svg",
    title: "Stocks",
    description: "Invest in all exchange-listed securities",
  },
  {
    id: "mutual-funds",
    icon: "media/images/mutualFundss.svg",
    title: "Mutual funds",
    description: "Invest in commission-free direct mutual funds",
  },
  {
    id: "ipo",
    icon: "media/images/IPOO.svg",
    title: "IPO",
    description: "Apply to the latest IPOs instantly via UPI",
  },
  {
    id: "futures-options",
    icon: "media/images/Future&.svg",
    title: "Futures & options",
    description:
      "Hedge and mitigate market risk through simplified F&O trading",
  },
];

const InvestmentCard = ({ icon, title, description }) => (
  <div className="col-md-6 d-flex align-items-start investment-card">
    <img src={icon} alt={`${title} icon`} className="investment-card__icon" />
    <div>
      <h3 className="investment-card__title">{title}</h3>
      <p className="investment-card__desc">{description}</p>
    </div>
  </div>
);

function InvestmentOptions() {
  return (
    <section className="investment-section">
      <div className="container">
        {/* ── Heading ── */}
        <div className="row justify-content-center mb-5">
          <div className="col-auto">
            <h2 className="investment-section__heading">
              Investment options with Zerodha demat account
            </h2>
          </div>
        </div>

        {/* ── 2×2 Grid ── */}
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="row gy-4 gx-4">
              {investmentData.map(({ id, icon, title, description }) => (
                <InvestmentCard
                  key={id}
                  icon={icon}
                  title={title}
                  description={description}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA Button ── */}
        <div className="row justify-content-center mt-5">
          <div className="col-auto">
            <button className="investment-section__cta" type="button">
              Explore Investments
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InvestmentOptions;
