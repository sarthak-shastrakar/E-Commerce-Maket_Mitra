
// const express = require("express");
// const router = express.Router();
// const authController = require("../controllers/user.controllers.js");
// const {
//   registerValidation,
//   loginValidation,
// } = require("../controllers/authvalidation.js");

// // Register
// router
//   .route("/signup")
//   .get(authController.rendersignupForm)
//   .post(registerValidation, authController.signup);

// // Login
// router
//   .route("/login")
//   .get(authController.renderLoginForm)
//   .post(loginValidation, authController.login);

//   // logout function
// router.get("/logout", authController.logout);

// module.exports = router;



const express = require("express");
const router = express.Router();
const authController = require("../controllers/user.controllers.js");
const {
  registerValidation,
  loginValidation,
} = require("../controllers/authvalidation.js");

// Signup route
router
  .route("/signup")
  .get(authController.rendersignupForm)
  .post(registerValidation, authController.signup);

// Login route
router
  .route("/login")
  .get(authController.renderLoginForm)
  .post(loginValidation, authController.login);

// Logout
router.get("/logout", authController.logout);



module.exports = router;

