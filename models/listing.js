const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const ProductListingSchema  = new Schema({
  title: {
    type: String,
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
  },
  location: {
    type: String,
  },
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  // reviews: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Review",
  //   },
  // ],
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
      ref: "Review"
    }
  ]
}, { timestamps: true });


// Optional: delete reviews when product is deleted
ProductListingSchema.post("findOneAndDelete", async function(doc) {
  if (doc) {
    await Review.deleteMany({ _id: { $in: doc.reviews } });
  }
});

const ProductListing = mongoose.model("Listing", ProductListingSchema );
module.exports = ProductListing;
