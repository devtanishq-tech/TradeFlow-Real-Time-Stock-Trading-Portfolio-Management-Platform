const mongoose = require("mongoose");
const { Schema } = mongoose;
const OrderSchema = new Schema(
  {
    stockName: String,
    qty: Number,
    price: Number,
    // price: String,
    mode: {
      type: String,
      enum: ["BUY", "SELL"],
    },
    realizedPnl: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);
const Orders = mongoose.model("Orders", OrderSchema);
module.exports = Orders;
