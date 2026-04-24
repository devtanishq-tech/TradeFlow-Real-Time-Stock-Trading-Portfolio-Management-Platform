const mongoose = require("mongoose");
const { Schema } = mongoose;

const HoldingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
    },
    avg: {
      type: Number,
    },
    // net: {
    //   type: String,
    // },
    // day: {
    //   type: String,
    // },
  },
  {
    timestamps: true,
  },
);
// now we need to define the model for this Scheam
const Holdings = mongoose.model("Holdings", HoldingSchema);
module.exports = Holdings;
