import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import WatchListAction from "./WatchListAction";

export default function WatchListItems({ stock }) {
  // this will track of those , about which element is Hovered
  // it will keep track of those items, where hovering occur
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className={`watchlist-item ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/*  Show Stockt Name*/}
      {/* Static info — never moves */}
      <p className={`stock-name ${stock.isDown ? "down" : "up"}`}>
        {stock.name}
      </p>
      {/*  Show Stockt Percent*/}
      {/* Right side: percent + arrow + price fade out when hovered */}
      <div className={`item-info ${isHovered ? "hidden" : ""}`}>
        <span className="percent">{stock.percent}</span>
        {/* here it controls the arrowup and arrowDown icon */}
        {/** Stock icone or symbol when stock is low and when stock up */}
        {stock.isDown ? (
          <KeyboardArrowDownIcon className="down" sx={{ fontSize: 16 }} />
        ) : (
          <KeyboardArrowUpIcon className="up" sx={{ fontSize: 16 }} />
        )}
        {/* it controls the color of price on the basics of their profile or loss */}
        <span className={`price ${stock.isDown ? "down" : "up"}`}>
          {stock.price}
        </span>
      </div>

      {/* Absolutely-positioned action panel — slides in from right */}
      <div className={`action-panel ${isHovered ? "visible" : ""}`}>
        <WatchListAction id={stock.name} />
      </div>
    </li>
  );
}
