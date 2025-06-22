const ProductListing = require("../models/listing.js");
const Review = require("../models/review.js");



module.exports.reviewPost = async (req, res) => {
  const listing = await ProductListing.findById(req.params.id);

  const review = new Review({
    rating: req.body.review.rating,
    comment: req.body.review.comment,
    // author: req.user._id
    author: req.user._id, // ✅ Add this line to set the author
    
  });

  await review.save();
  listing.reviews.push(review);
  await listing.save();

  req.flash("success", "Review added successfully!");
  res.redirect(`/listings/showproduct/${listing._id}`);
};



// module.exports.reviewPost = async (req, res) => {
//   try {
//     if (!req.user) {
//       req.flash("error", "You must be logged in to post a review.");
//       return res.redirect("/login");
//     }

//     const listing = await ProductListing.findById(req.params.id);
//     const review = new Review({
//       rating: req.body.review.rating,
//       comment: req.body.review.comment,
//       author: req.user._id, // ✅ now this will work
//     });

//     await review.save();
//     listing.reviews.push(review);
//     await listing.save();

//     req.flash("success", "Review added successfully!");
//     res.redirect(`/listings/showproduct/${listing._id}`);
//   } catch (err) {
//     console.error("Review Post Error:", err);
//     req.flash("error", "Something went wrong while posting your review.");
//     res.redirect("/listings");
//   }
// };


// corrected 
// module.exports.destroyReview = async (req, res) => {
//   const { id, reviewId } = req.params;
//   const review = await Review.findById(reviewId);
  
//   // if (!review.author.equals(req.user._id)) {
//   //   req.flash("error", "You do not have permission to delete this review.");
//   //   return res.redirect(`/listings/showproduct/${id}`);
//   // }

//   await ProductListing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
//   await Review.findByIdAndDelete(reviewId);
//   req.flash("success", "Review deleted successfully.");
//   res.redirect(`/listings/showproduct/${id}`);
// };
  



// try
module.exports.destroyReview = async (req, res) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);

  // Check if review exists
  if (!review) {
    req.flash("error", "Review not found.");
    return res.redirect(`/listings/${id}`);
  }

  // Authorization check
  if (review.author.toString() !== req.user._id.toString()) {
    req.flash("error", "You are not authorized to delete this review.");
    return res.redirect(`/listings/${id}`);
  }

  // Proceed with deletion
  await ProductListing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review deleted successfully.");
  res.redirect(`/listings/showproduct/${id}`);
};