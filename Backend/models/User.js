// User data Model
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Your email address is required"],
  },
  userName: {
    type: String,
    unique: true,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// pre middleare run before user data gets saved
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12); // this function change my current password to hash code format
});
UserSchema.methods.ComparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model("User", UserSchema);
module.exports = User;
