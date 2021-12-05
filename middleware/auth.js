const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is invalid" });
  }
};
