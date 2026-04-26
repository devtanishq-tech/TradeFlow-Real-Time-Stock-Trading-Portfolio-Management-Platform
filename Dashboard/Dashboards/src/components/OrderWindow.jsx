import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { ContextWindow } from "./ContextWindow";

import "./BuyAction.css";

const OrderWindow = ({ uuid, mode, setHoldings }) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [qty, setqty] = useState(1);
  const [price, setprice] = useState(0.0);
  // const [holdings, setholdings] = useState({});
  const { closeWindow } = useContext(ContextWindow); // this line search for nearest ContextWindow
  // the above exract the function of closeWindow from conextWindow
  const handleBuyClick = async () => {
    try {
      // this sending data from front to backend
      let res = await axios.post(
        `${BASE_URL}/orders`,
        {
          stockName: uuid,
          qty: Number(qty), // this is the latest have made on 10/04/2026
          price: Number(price), // this is the latest have made on 10/04/2026
          mode: mode,
        },
        { withCredentials: true },
      );
      console.log(res.data);
      const updateData = await axios.get(`${BASE_URL}/holdings`, {
        withCredentials: true,
      });
      setHoldings(updateData.data);
    } catch (err) {
      console.log(err);
    }
    closeWindow();
  };
  const handleCancelClick = () => {
    closeWindow();
  };
  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="header">
        <h3>{mode === "BUY" ? "Buy Stock" : "Sell Stock"}</h3>
      </div>
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              value={qty}
              onChange={(e) => setqty(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              value={price}
              onChange={(e) => setprice(e.target.value)}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link
            className={`btn ${mode === "BUY" ? "btn-blue" : "btn-red"}`}
            onClick={handleBuyClick}
          >
            {mode === "BUY" ? "Buy" : "Sell"}
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderWindow;
