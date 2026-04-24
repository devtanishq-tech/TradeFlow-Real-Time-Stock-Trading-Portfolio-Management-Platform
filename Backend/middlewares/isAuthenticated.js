const Users = require("../models/User.js");
const jwt = require("jsonwebtoken");
module.exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not logged in" });
    }
    // this decoded contains the data releated to the process.env .seceret id /
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Users.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ message: "INVALID TOKEN" });
  }
};
