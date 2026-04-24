const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
// in this jwt.sign() is the actual function who generates the Tokens
// usedrId is the id comes from the Database when user is created and get stored inside the cloud database
module.exports = generateToken;
