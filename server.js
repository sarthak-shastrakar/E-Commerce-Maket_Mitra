
// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const Authcontroller = require("./controllers/user.controllers.js");
// const listingsRouter = require("./routes/listings.js");
// const authRoutes = require('./routes/user.routes.js');
// const ReviewsRouter = require("./routes/review.js");
// const path = require("path");
// const methodOverride = require("method-override");
// const ejsMate = require("ejs-mate");
// const ExpressError = require("./util/ExpressError.js");
// const session = require("express-session");
// const flash = require("connect-flash");




// // auth validation
// const userRoutes = require('./routes/user.routes');
// const cookieParser = require("cookie-parser");
// const { attachUser } = require('./middleware/auth');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// mongoose
//   .connect(
//     "mongodb+srv://sarthakshastrakar9:LDvHvwkod9mH6djj@localstore.swhbtby.mongodb.net/?retryWrites=true&w=majority&appName=localstore",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       //  useCreateIndex: true,
//     }
//   )
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());
// app.use(
//   session({
//     secret: "yourbackboard",
//     resave: false,
//     saveUninitialized: true,
//   })
// );
// app.use(flash());

// // step 5: setting up ejs
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.urlencoded({ extended: true })); //middleware function
// app.use(methodOverride("_method"));
// app.engine("ejs", ejsMate);
// app.use(express.static(path.join(__dirname, "/public"))); //middleware function (middleware work on after the request is come and before the response is send)

// app.use(cookieParser());
// app.use(attachUser);




// // flash function
// app.use((req, res, next) => {
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   res.locals.currentUser = req.user; // now available in all EJS templates
//   // res.locals.currUser = req.user;
//   next();
// });

// app.all("/", (req,res) =>{
//   res.render("listings/error.ejs");
// })


// // Routes
// app.use("/listings", listingsRouter);
// app.use("/listings/:id/reviews", ReviewsRouter);
// app.use("/", userRoutes);



// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// new chatgpt paste ----------------------------------------------------------
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Authcontroller = require("./controllers/user.controllers.js");
const listingsRouter = require("./routes/listings.js");
const authRoutes = require('./routes/user.routes.js');
const ReviewsRouter = require("./routes/review.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./util/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo"); // ✅ added
const { attachUser } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ MongoDB Connection URL
const dbURL = "mongodb+srv://sarthakshastrakar9:LDvHvwkod9mH6djj@localstore.swhbtby.mongodb.net/?retryWrites=true&w=majority&appName=localstore";

// ✅ Connect to MongoDB without deprecated options
mongoose.connect(dbURL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
  console.log("MongoDB error:", err); // or JSON.stringify(err)
});
;

// ✅ Use MongoDB session store instead of MemoryStore
const store = MongoStore.create({
  mongoUrl: dbURL,
  crypto: { secret: "yourbackboard" }, // secret used for encrypting session
  touchAfter: 24 * 3600 // time in seconds (24 hours)
});

store.on("error", function (e) {
  console.error("SESSION STORE ERROR:", e);
});


// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use(session({
  store,
  name: "session",
  secret: "yourbackboard",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true, // Uncomment when using HTTPS
    expires: Date.now() + 1000 * 60 * 60 * 24, // 24 hours
    maxAge: 1000 * 60 * 60 * 24,
  },
}));

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
