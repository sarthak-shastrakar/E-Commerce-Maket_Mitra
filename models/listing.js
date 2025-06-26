const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const ProductListingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      require: true,
    },
    country: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    images: [
      {
        url: String,
        filename: String,
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

// Optional: delete reviews when product is deleted
ProductListingSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({ _id: { $in: doc.reviews } });
  }
});

const ProductListing = mongoose.model("Listing", ProductListingSchema);
module.exports = ProductListing;
