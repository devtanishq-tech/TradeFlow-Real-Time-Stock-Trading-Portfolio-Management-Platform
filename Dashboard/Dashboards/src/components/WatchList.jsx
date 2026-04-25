import React from "react";
import { watchlist } from "../data/data";
import WatchListitems from "./WatchListitems";

const WatchList = ({ livePrices }) => {
  const updateLivePrice = watchlist.map((stock) => {
    const live = livePrices[stock.name];
    if (!live) return stock;

    const base = stock.price;
    const change = live - base;
    return {
      ...stock,
      price: live,
      percent: `${((change / base) * 100).toFixed(2)}%`,
      isDown: change < 0,
    };
  });
  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg: infy, bse, nifty fut weekly, gold mcx"
          className="search-input"
        />
        <span className="counts">{watchlist.length}/50</span>
      </div>

      <ul className="watchlist">
        {updateLivePrice.map((stock, idx) => (
          <WatchListitems stock={stock} key={idx} />
        ))}
      </ul>
    </div>
  );
};

export default WatchList;
