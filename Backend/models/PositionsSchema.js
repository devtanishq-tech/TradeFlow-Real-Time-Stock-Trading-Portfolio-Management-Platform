const mongoose = require("mongoose");
const { Schema } = mongoose;
const PositionsSchema = new Schema(
  {
    product: String,
    name: String,
    qty: Number,
    avg: Number,
  },

  {
    timestamps: true,
  },
);
const Positions = mongoose.model("Positions", PositionsSchema);
module.exports = Positions;
