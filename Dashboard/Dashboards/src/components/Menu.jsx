import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileDropDown from "./ProfileDropDown";
// import "./Menu.css"; /* assumes you have a Menu.css; adjust as needed */

const Menu = () => {
  let [currentMenu, setcurrentMenu] = useState(0);
  let [profileDropdown, setprofileDropdown] = useState(false);

  let handleMenuOption = (index) => {
    setcurrentMenu(index);
  };

  let handleProfileClick = () => {
    setprofileDropdown(!profileDropdown);
  };

  let menuClass = "menu";
  let activeMenuClass = "menu-selected";

  const navItems = [
    { label: "Dashboard", path: "/", index: 0 },
    { label: "Orders", path: "/orders", index: 1 },
    { label: "Holdings", path: "/holdings", index: 2 },
    { label: "Positions", path: "/positions", index: 3 },
    { label: "Funds", path: "/funds", index: 4 },
    { label: "Apps", path: "/apps", index: 5 },
  ];

  return (
    <div className="menu-container">
      <img src="logo_icon2.png" style={{ width: "50px" }} />

      <div className="menus">
        <ul>
          {navItems.map(({ label, path, index }) => (
            <li key={index}>
              <Link
                onClick={() => handleMenuOption(index)}
                style={{ textDecoration: "none" }}
                to={path}
              >
                <p
                  className={
                    currentMenu === index ? activeMenuClass : menuClass
                  }
                >
                  {label}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <hr />

        {/* Profile trigger – now a styled button-like row */}
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">TJ</div>
          <p className="username">USERID</p>
        </div>

        {/* Dropdown anchored relative to .menus */}
        <div style={{ position: "relative" }}>
          {profileDropdown && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Menu;
