
// const User = require("../models/user.models.js");
// const bcrypt = require("bcrypt");
// const crypto = require("crypto");

// module.exports.register = async (req, res, next) => {
//     console.log(req.body);
//   try {
//     const { name, email, password, username } = req.body;

//     if (!name || !email || !password || !username)
//       return res.status(400).json({ message: " ALL FIELD ARE REQUIRED" });

//     const user = await User.findOne({
//       email,
//     });

//     if (user) return res.status(400).json({ message: "User Already Exist" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       username,
//     });
//     await newUser.save();

//     return res.json({ message: "USER CREATED" });
//   } catch (error) {
//     return res.status(500).json({ mesage: error.message });
//   }
// };

// // login route
// module.exports.login = async (req, res) => {
//   console.log(req.body);
//   const { email, password } = req.body;
//   if (!email || !password)
//     return res.status(400).json({ message: "ALL FIELD ARE REQUIRED" });

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "USER DOES NOT EXIST" });
//     }

//     let isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "INVALID CREDENTIAL" });

//     const token = crypto.randomBytes(32).toString("hex");

//     await User.updateOne({ _id: user._id }, { token });

//     return res.json({ token });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// // // logout route
// // module.exports.logout = (req, res, next) => {
// //   req.logout((err) => {
// //     if (err) {
// //       return next(err);
// //     }
// //     req.flash("success", "you are logout !");
// //     res.redirect("/listings");
// //   });
// // };


// main user controller -->


// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user.models.js');
// const { validationResult } = require('express-validator');


// // signup form render route
// module.exports.rendersignupForm = async (req, res) => {
//   res.render("users/signup.ejs");
// };


// module.exports.signup = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { name, email, password, username } = req.body;

//   try {
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ msg: 'User already exists' });

//     user = new User({ name, email, password, username });

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);

//     await user.save();

//     const payload = { user: { id: user.id } };
//     jwt.sign(payload, 'jwtSecret', { expiresIn: 3600 }, (err, token) => {
//       if (err);
//       // res.json({ token });
//       req.flash("success", "Welcome to your local shopping partner – MarketMitra");
//       res.redirect("/");
//     });

//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//     req.flash("error", err.message);
//     res.redirect("/signup");
//   }
// };

// // login form route
// module.exports.renderLoginForm = async (req, res) => {
//   res.render("users/login.ejs");
// };


// module.exports.login = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { email, password } = req.body;

//   try {
//     let user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

//     const payload = { user: { id: user.id } };
//     jwt.sign(payload, 'jwtSecret', { expiresIn: '1h' }, (err, token) => {
//       if (err);
//       // res.json({ token });
//       req.flash("success", "Welcome to your local shopping partner – MarketMitra");
//       return res.redirect("/listings");
//     });

//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };

// // logout route
// module.exports.logout = (req, res, next) => {
//   // req.logout((err) => {
//   //   if (err) {
//   //     return next(err);
//   //   }
//     req.flash("success", "you are logout !");
//     res.redirect("/");
//   // });
// };










// create by bot

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

// // Profile page controller
//  const ProductListing = require("../models/listing.js");

// module.exports.Profile = async (req,res) =>{
//    res.render("listings/profilepage.ejs"); 
//   // const userProducts = await ProductListing.find({ owner: req.user._id });
//   // res.render('listings/profilepage.ejs', { currentUser: req.user, userProducts });

//   //  try {
//   //   const userId = req.user._id;
//   //   const products = await ProductListing.find({ owner: userId }).sort({ createdAt: -1 });
//   //   res.render("listings/profilepage.ejs", { currentUser: req.user, products });
//   // } catch (err) {
//   //   console.error(err);
//   //   res.redirect("/");
//   // }
// }