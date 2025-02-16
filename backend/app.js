const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const app = express();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

require("./src/config/database");
const userRouter = require("./src/routes/userRoute");
const designationRouter = require("./src/routes/desigRoute");
const salaryRouter = require("./src/routes/salaryRoute");
const pageRouter = require("./src/routes/pageRoute");
const userManageRouter = require("./src/routes/userManageRoute");
const sliderRouter = require("./src/routes/sliderRoute");
const companyRouter = require("./src/routes/companyRoute");
const applicationRouter = require("./src/routes/applicationRoute");
const { clientURL } = require("./secret");

//middleware
const allowedOrigins = [
  clientURL,
  "http://localhost:3000",
  "https://jobsvisaonline.netlify.app",
  "https://jobsvisaonline.com",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  if (allowedOrigins.includes(req.headers.origin)) {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  console.log(`Request received from origin: ${req.headers.origin}`);
  next();
});

app.use(express.static(__dirname + "public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/uploads", express.static("uploads"));

app.use(
  "/uploads/documents",
  express.static(path.join(__dirname, "uploads/documents"))
);

app.use(
  "/uploads",
  express.static("uploads", {
    setHeaders: (res, path) => {
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  next();
});
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  next();
});
app.use(helmet());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use(limiter);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, "build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// app.use(express.static(path.join(__dirname, "../frontend/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
// });

app.use("/api/users", userRouter);
app.use("/api/designation", designationRouter);
app.use("/api/page", pageRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/userManagement", userManageRouter);
app.use("/api/slider", sliderRouter);
app.use("/api/company", companyRouter);
app.use("/api/application", applicationRouter);

app.use(passport.initialize());
require("./src/config/passport");

module.exports = app;
