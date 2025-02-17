const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

const app = express();

require("./src/config/database");
const userRouter = require("./src/routes/userRoute");
const designationRouter = require("./src/routes/desigRoute");
const salaryRouter = require("./src/routes/salaryRoute");
const pageRouter = require("./src/routes/pageRoute");
const userManageRouter = require("./src/routes/userManageRoute");
const sliderRouter = require("./src/routes/sliderRoute");
const companyRouter = require("./src/routes/companyRoute");
const applicationRouter = require("./src/routes/applicationRoute");

// Middleware
const allowedOrigins = [
  "http://localhost:4001",
  "https://ali-dev.onrender.com",
  "http://localhost:3000",
  "https://jobsvisaonline.netlify.app",
  "https://www.jobsvisaonline.com",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: " Content-Type, Accept, Authorization",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(helmet());
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use(limiter);
app.set("trust proxy", 1);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  "/uploads/sliderImages",
  express.static(path.join(__dirname, "uploads/sliderImages"), {
    setHeaders: (res, path) => {
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

app.use(
  "/uploads/applicationImages",
  express.static(path.join(__dirname, "uploads/applicationImages"), {
    setHeaders: (res, path) => {
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

app.use(
  "/uploads/job_letters",
  express.static(path.join(__dirname, "uploads/job_letters"), {
    setHeaders: (res, path) => {
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

app.use(
  "/uploads/lmias",
  express.static(path.join(__dirname, "uploads/lmias"), {
    setHeaders: (res, path) => {
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);
app.use(
  "/uploads/visa",
  express.static(path.join(__dirname, "uploads/visa"), {
    setHeaders: (res, path) => {
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);
app.use(
  "/uploads/visa_form",
  express.static(path.join(__dirname, "uploads/visa_form"), {
    setHeaders: (res, path) => {
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

app.use(
  "/uploads/work_permits",
  express.static(path.join(__dirname, "uploads/work_permits"), {
    setHeaders: (res, path) => {
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

app.use(
  "/uploads/air_tickets",
  express.static(path.join(__dirname, "uploads/air_tickets"), {
    setHeaders: (res, path) => {
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

app.use(
  "/uploads/documents",
  express.static(path.join(__dirname, "uploads/documents"), {
    setHeaders: (res, path) => {
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Add Cross-Origin-Resource-Policy header
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: err.message });
});

app.get("/uploads/sliderImages/:image", (req, res) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  res.sendFile(path.join(__dirname, "uploads/sliderImages", req.params.image));
});

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
