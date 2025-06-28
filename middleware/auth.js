
const jwt = require("jsonwebtoken");
const User = require("../models/user.models.js"); // adjust if needed

module.exports.attachUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    req.user = null;
    res.locals.currentUser = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "jwtSecret");

    const user = await User.findById(decoded.id);
    if (!user) {
      req.user = null;
      res.locals.currentUser = null;
      return next();
    }

    // Success: attach user
    req.user = user;
    res.locals.currentUser = user;
    next();

  } catch (err) {
    console.error("JWT verification failed:", err.message);
    req.user = null;
    res.locals.currentUser = null;

    next();
  }
};

// middleware/auth.js

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You must be logged in.");
    return res.redirect("/login");
  }
  next();
};






