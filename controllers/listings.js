const ProductListing = require("../models/listing.js");
const { cloudinary } = require("../cloudconfig.js");
// Homepage
module.exports.Homepage = (req, res) => {
  res.render("listings/index.ejs");
};

// newform route controller
module.exports.rendernewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// user add product route
module.exports.userProduct = async (req, res) => {
  try {
    const allListings = await ProductListing.find({}).populate("owner");
    res.render("listings/userproduct.ejs", { allListings });
  } catch (err) {
    console.error("Error loading user products:", err);
    res.render("listings/error.ejs", {
      message: "Unable to load user products",
    });
  }
};
  

// show product route
module.exports.showProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await ProductListing.findById(id)
      .populate("owner", "name") // Populate owner name
      .populate({
        path: "reviews",
        populate: { path: "author", select: "name" },
      });

    if (!listing) {
      req.flash("error", "Product not found");
      return res.redirect("/listings");
    }
    res.render("listings/show", { listing, currentUser: req.user });
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong");
    res.redirect("/listings");
  }
};

// create route controller
module.exports.createProduct = async (req, res, next) => {
  try {
    const newListing = new ProductListing(req.body.listing);

    // Only map images if files exist
    if (req.files && req.files.length > 0) {
      newListing.images = req.files.map((f) => ({
        url: f.path,
        filename: f.filename,
      }));
    }

    // Populate other fields (directly from req.body instead of req.body.listing)
    newListing.title = req.body.title;
    newListing.description = req.body.description;
    newListing.category = req.body.category;
    newListing.price = req.body.price;
    newListing.rating = req.body.rating;
    newListing.country = req.body.country;
    newListing.owner = req.user._id;

    await newListing.save();
    req.flash("success", "Product created successfully!");
    res.redirect("/listings/userproduct");
  } catch (err) {
    console.error("Create product error:", err);
    req.flash("error", err.message || "Something went wrong");
    res.redirect("/listings/new"); // or wherever your form page is
  }
};


// edit route controller
module.exports.renderEditForm = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await ProductListing.findById(id);

    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    // Transform the original image URL to apply blur and resize
    let transformedImageURL = listing.images[0]?.url.replace(
      "/upload",
      "/upload/h_200,w_250/e_blur:200"
    );

    res.render("listings/edit.ejs", {
      listing,
      transformedImageURL,
    });
  } catch (err) {
    console.error("Error rendering edit form:", err);
    req.flash("error", "Something went wrong");
    const allListings = await ProductListing.find({});
    res.render("listings/userproduct.ejs", { allListings });
  }
};

// update product controller
module.exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await ProductListing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    // Update fields
    listing.title = req.body.listing.title;
    listing.description = req.body.listing.description;
    listing.price = req.body.listing.price;
    listing.rating = req.body.listing.rating;

    // Handle images
    if (req.files && req.files.length > 0) {
      // Delete old images
      for (let img of listing.images) {
        await cloudinary.uploader.destroy(img.filename);
      }

      // Add new images
      listing.images = req.files.map((f) => ({
        url: f.path,
        filename: f.filename,
      }));
    }

    await listing.save();
    req.flash("success", "Product updated successfully!");
    res.redirect("/listings/userproduct");

  } catch (err) {
    console.error("Error updating product:", err);
    req.flash("error", err.message || "Something went wrong");

    try {
      const allListings = await ProductListing.find({});
      res.render("listings/userproduct.ejs", { allListings });
    } catch (e) {
      console.error("Error rendering fallback:", e);
      res.redirect("/listings");
    }
  }
};




module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Step 1: Find the product
    const product = await ProductListing.findById(id);

    if (!product) {
      req.flash("error", "Product not found.");
      return res.redirect("/listings");
    }

    // Step 2: Delete images from Cloudinary
    for (let img of product.images) {
      if (img.filename) {
        await cloudinary.uploader.destroy(img.filename); // this removes image from Cloudinary
      }
    }

    // Step 3: Delete product from MongoDB
    await ProductListing.findByIdAndDelete(id);

    // Step 4: Fetch updated product list
    const allListings = await ProductListing.find({});

    req.flash("success", "Listing and Cloudinary images deleted successfully!");
    res.render("listings/userproduct.ejs", { allListings });

  } catch (error) {
    console.error("❌ Error deleting product:", error);
    req.flash("error", "Something went wrong while deleting the product.");
    res.redirect("/listings");
  }
};

// Profile page controller

module.exports.Profile = async (req,res) =>{
  //  res.render("listings/profilepage.ejs"); 
  // const userProducts = await ProductListing.find({ owner: req.user._id });
  // res.render('listings/profilepage.ejs', { currentUser: req.user, userProducts });

 try {
    const userId = req.user._id;

    // Find all products created by this logged-in user
    const listing = await ProductListing.find({ owner: userId });

    res.render("listings/profilepage.ejs", {
      currentUser: req.user,
      listing // ✅ sending to EJS
    });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.redirect("/");
  }
}


// chatbot product suggestion 
module.exports.chatbotpage = async (req, res) => {
    // If GET, render the EJS chat interface
    res.render("listings/ChatbotSuggest.ejs");
};


