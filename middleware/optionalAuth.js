// middleware/optionalAuth.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, _res, next) => {
  const token = req.cookies?.token;
  if (token) {
    try {
      const { sub } = jwt.verify(token, JWT_SECRET);
      req.userId = sub;                 // ← becomes available downstream
    } catch (_) {
      /* invalid / expired token – ignore */
    }
  }
  next();
};
