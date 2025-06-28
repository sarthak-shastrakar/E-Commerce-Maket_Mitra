
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/user.models.js");

const createTokenAndSetCookie = (res, user) => {
  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET || "jwtSecret",
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000
  });
};

// Render signup form
module.exports.rendersignupForm = (req, res) => {
  res.render("users/signup");
};

// Signup logic
module.exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("error", errors.array().map(e => e.msg).join(", "));
    return res.redirect("/signup");
  }

  const { name, email, password, username } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      req.flash("error", "User already exists");
      return res.redirect("/signup");
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    user = new User({ name, email, username, password: hashed });
    await user.save();

    createTokenAndSetCookie(res, user);
    req.flash("success", "Welcome to MarketMitra!");
    res.redirect("/listings");
  } catch (err) {
    console.error(err.message);
    req.flash("error", "Signup failed");
    res.redirect("/signup");
  }
};

// Render login form
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
};

// Login logic
module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("error", errors.array().map(e => e.msg).join(", "));
    return res.redirect("/login");
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "Invalid credentials");
      return res.redirect("/login");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      req.flash("error", "Invalid credentials");
      return res.redirect("/login");
    }

    createTokenAndSetCookie(res, user);
    req.flash("success", "Logged in successfully");
    res.redirect("/listings");

  } catch (err) {
    console.error(err.message);
    req.flash("error", "Login failed");
    res.redirect("/login");
  }
};

// Logout logic
module.exports.logout = (req, res) => {
  res.clearCookie("token");
  req.flash("success", "Logged out!");
  res.redirect("/listings");
};