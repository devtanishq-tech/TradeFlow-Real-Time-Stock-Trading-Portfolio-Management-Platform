import React, { useState } from "react";
import { Link } from "react-router-dom";

const gridMembers = [
  {
    name: "Nikhil Kamath",
    role: "Co-founder",
    image: "/media/images/NikhilKamath.jpg",
    bio: "Nikhil co-founded Zerodha and True Beacon. He is an investor, entrepreneur, and one of India's youngest self-made billionaires.",
  },
  {
    name: "Kailash Nadh",
    role: "CTO",
    image: "/media/images/KailashNadh.jpg",
    bio: "Kailash leads technology at Zerodha. He is a computer scientist, open-source enthusiast, and polyglot programmer.",
  },
  {
    name: "Venu Madhav",
    role: "COO",
    image: "/media/images/VenuMadhav.jpg",
    bio: "Venu oversees day-to-day operations at Zerodha and has played a pivotal role in scaling the business.",
  },
  {
    name: "Seema Patil",
    role: "Head of Compliance",
    image: "/media/images/SeemaPatil.jpg",
    bio: "Seema heads the compliance and legal function at Zerodha, ensuring regulatory adherence across all business verticals.",
  },
  {
    name: "Hanan Delvi",
    role: "Head of Sales",
    image: "/media/images/KartikRangappa.jpg",
    bio: "Hanan leads the sales and partnerships team, helping Zerodha grow its broker-partner network across India.",
  },
  {
    name: "Dinesh Pai",
    role: "Head of Finance",
    image: "/media/images/AustinPrakesh.jpg",
    bio: "Dinesh manages Zerodha's financial planning and strategy, overseeing accounting, treasury, and finance operations.",
  },
];

function TeamMemberCard({ name, role, image, bio }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="team-card text-center">
      <img
        src={image}
        alt={name}
        className="team-photo team-photo--sm"
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            name,
          )}&background=e0e0e0&color=555&size=150`;
        }}
      />
      <h5 className="team-name mb-1">{name}</h5>
      <p className="team-role mb-2">{role}</p>
      <button
        className="team-bio-toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        Bio
        <svg
          className={`team-bio-arrow ${open ? "team-bio-arrow--open" : ""}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <p className="team-bio-text">{bio}</p>}
    </div>
  );
}

function Team() {
  return (
    <>
      <style>{`
        /* ── Existing styles ── */
        .team-section {
          padding: 60px 0 80px;
        }
        .team-heading {
          font-size: 1.6rem;
          font-weight: 500;
          color: #424242;
          margin-bottom: 60px;
        }
        .team-photo {
          width: 220px;
          height: 220px;
          border-radius: 50%;
          object-fit: cover;
          object-position: center top;
          display: block;
          margin: 0 auto;
        }
        .team-name {
          font-size: 1.05rem;
          font-weight: 600;
          color: #424242;
          margin-top: 20px;
          margin-bottom: 4px;
        }
        .team-role {
          font-size: 0.85rem;
          color: #888;
          font-weight: 400;
          margin-bottom: 0;
        }
        .team-bio p {
          font-size: 0.95rem;
          color: #424242;
          line-height: 1.75;
          margin-bottom: 16px;
        }
        .team-connect {
          font-size: 0.95rem;
          color: #424242;
        }
        .team-connect a {
          color: #387ed1;
          text-decoration: none;
        }
        .team-connect a:hover {
          text-decoration: underline;
        }
        .team-divider {
          color: #999;
          margin: 0 6px;
        }

        /* ── Grid section additions ── */
        .team-grid-section {
  border-top: 1px solid #efefef;
  padding: 60px 0 80px;
  --bs-gutter-y: 4rem; /* more vertical breathing room between rows */
}
        .team-grid-heading {
          font-size: 1.1rem;
          font-weight: 500;
          color: #888;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 48px;
        }
        .team-photo--sm {
          width: 220px;
          height: 220px;
        }
        .team-card {
          width: 100%;
        }
        .team-card .team-name {
          font-size: 1.05rem;
  margin-top: 20px;
        }
        .team-bio-toggle {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: none;
          border: none;
          padding: 0;
          font-size: 0.82rem;
          color: #387ed1;
          cursor: pointer;
          font-weight: 500;
        }
        .team-bio-toggle:hover {
          text-decoration: underline;
        }
        .team-bio-arrow {
          transition: transform 0.2s ease;
          flex-shrink: 0;
        }
        .team-bio-arrow--open {
          transform: rotate(180deg);
        }
        .team-bio-text {
          font-size: 0.85rem;
          color: #666;
          line-height: 1.65;
          max-width: 260px;
          margin: 10px auto 0;
        }
      `}</style>

      {/* ── Featured Profile Section ── */}
      <section className="team-section">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="team-heading">People</h2>
            </div>
          </div>

          <div className="row align-items-center justify-content-center g-5">
            {/* Left: Photo + Name + Role */}
            <div className="col-12 col-md-4 text-center">
              <img
                src="/media/images/nithinKamath.jpg"
                alt="Nithin Kamath"
                className="team-photo"
              />
              <h5 className="team-name">Nithin Kamath</h5>
              <p className="team-role">Founder, CEO</p>
            </div>

            {/* Right: Bio */}
            <div className="col-12 col-md-5 team-bio">
              <p>
                Nithin bootstrapped and founded Zerodha in 2010 to overcome the
                hurdles he faced during his decade long stint as a trader.
                Today, Zerodha has changed the landscape of the Indian broking
                industry.
              </p>
              <p>
                He is a member of the SEBI Secondary Market Advisory Committee
                (SMAC) and the Market Data Advisory Committee (MDAC).
              </p>
              <p>Playing basketball is his zen.</p>
              <p className="team-connect">
                Connect on <Link to="/">Homepage</Link>
                <span className="team-divider">/</span>
                <a href="#">TradingQnA</a>
                <span className="team-divider">/</span>
                <a href="#">Twitter</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team Grid Section ── */}
      <section className="team-grid-section">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p className="team-grid-heading"></p>
            </div>
          </div>

          <div className="row g-4 gy-5 justify-content-center">
            {gridMembers.map((member) => (
              <div
                key={member.name}
                className="col-12 col-md-6 col-lg-4 d-flex justify-content-center"
              >
                <TeamMemberCard {...member} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Team;
