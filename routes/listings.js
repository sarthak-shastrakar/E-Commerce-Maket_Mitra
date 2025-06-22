const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listings.js");
// const { listingSchema } = require("../schema.js");
// const ExpressError = require("../util/ExpressError.js");
const { validateListing } = require("../middleware/auth.js");
const { isLoggedIn } = require("../middleware/auth");


// 🔽 NEW: Multer + Cloudinary config
const multer = require("multer");
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

router.route("/").get(listingController.Homepage);

// new product form route
router.get("/new", listingController.rendernewForm);

router.route("/showproduct/:id").get(isLoggedIn,listingController.showProduct);

router
  .route("/userproduct")
  .get(listingController.userProduct)
  .post(upload.array("image", 5), listingController.createProduct);

// Edit form
router.route("/:id/edit").get(listingController.renderEditForm);

// UPDATE ROUTE (PUT)
router.put("/:id", upload.array("image", 5), listingController.updateProduct);
router.route("/:id").delete(listingController.deleteProduct);

// profile page
router.route("/userProfile").get(listingController.Profile);

// image search
// GET: Show upload form
// router.get("/search", listingController.imageSearchPage);

// Use same controller for GET and POST
router
  .route("/chatbotsuggest")
  .get(listingController.chatbotpage)

module.exports = router;
