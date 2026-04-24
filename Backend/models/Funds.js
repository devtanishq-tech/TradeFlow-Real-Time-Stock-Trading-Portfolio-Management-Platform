const mongoose = require("mongoose");
const { Schema } = mongoose;
const FundsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  balance: {
    type: Number,
    required: true,
    default: 2000000,
  },
  availableCash: {
    type: Number,
    required: true,
    default: 2000000,
  },
  usedMargin: {
    type: Number,
    required: true,
    default: 0,
  },
  openingBalance: {
    type: Number,
    required: true,
    default: 2000000,
  },
  updatedAt: {
    type: Date,
    default: Date,
  },
});
// as this is acting as the middleware we have used here next
FundsSchema.pre("save", function () {
  this.updatedAt = Date.now();
});
// This is where creation of Fund Scheam here
const Fund = mongoose.model("Fund", FundsSchema);
module.exports = Fund;
