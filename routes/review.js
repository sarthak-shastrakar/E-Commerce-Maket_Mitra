const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewcontroller = require("../controllers/review.js");
const { isLoggedIn } = require("../middleware/auth");

// Add review
router.post("/", reviewcontroller.reviewPost);

// Delete review
// router.delete("/:reviewId", reviewcontroller.destroyReview);
const isReviewAuthor = require("../middleware/auth.js");

router.delete("/:reviewId",isLoggedIn, reviewcontroller.destroyReview);


module.exports = router;
