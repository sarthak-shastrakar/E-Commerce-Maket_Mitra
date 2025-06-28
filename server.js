const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Authcontroller = require("./controllers/user.controllers.js");
const listingsRouter = require("./routes/listings.js");
const authRoutes = require("./routes/user.routes.js");
const ReviewsRouter = require("./routes/review.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo"); // ✅ added
const { attachUser } = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ MongoDB Connection URL
const dbURL =
  "mongodb+srv://sarthakshastrakar9:LDvHvwkod9mH6djj@localstore.swhbtby.mongodb.net/?retryWrites=true&w=majority&appName=localstore";

// ✅ Connect to MongoDB without deprecated options
mongoose
  .connect(dbURL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.log("MongoDB error:", err);
  });
// ✅ Use MongoDB session store instead of MemoryStore
const store = MongoStore.create({
  mongoUrl: dbURL,
  crypto: { secret: "yourbackboard" }, // secret used for encrypting session
  touchAfter: 24 * 3600, // time in seconds (24 hours)
});

store.on("error", function (e) {
  console.error("SESSION STORE ERROR:", e);
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use(
  session({
    store,
    name: "session",
    secret: "yourbackboard",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      // secure: true,
      expires: Date.now() + 1000 * 60 * 60 * 12,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(flash());

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.use(cookieParser());
app.use(attachUser);

// flash messages available in all templates
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// Home route
app.all("/", (req, res) => {
  res.render("listings/error.ejs");
});

// Routes
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", ReviewsRouter);
app.use("/", authRoutes); // use authRoutes (renamed to avoid confusion)

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
