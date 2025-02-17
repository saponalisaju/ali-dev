const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

const app = express();

console.log("Starting server...");

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
  "https://ali-dev.onrender.com",
  "http://localhost:3000",
  "https://jobsvisaonline.netlify.app",
  "https://www.jobsvisaonline.com",
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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Replace "*" with your specific domain if needed
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(helmet());
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use(limiter);
app.set("trust proxy", 1);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(express.static(__dirname + "public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  "/public/slider",
  express.static(path.join(__dirname, "../frontend/public/slider"))
);

app.use(
  "/public/application",
  express.static(path.join(__dirname, "../frontend/public/application"))
);
app.use(
  "/public/job_letter",
  express.static(path.join(__dirname, "../frontend/public/job_letter"))
);
app.use(
  "/public/visa",
  express.static(path.join(__dirname, "../frontend/public/visa"))
);
app.use(
  "/public/visa_form",
  express.static(path.join(__dirname, "../frontend/public/visa_form"))
);
app.use(
  "/public/lmia",
  express.static(path.join(__dirname, "../frontend/public/lmia"))
);
app.use(
  "/public/work_permit",
  express.static(path.join(__dirname, "../frontend/public/work_permit"))
);
app.use(
  "/public/air_ticket",
  express.static(path.join(__dirname, "../frontend/public/air_ticket"))
);
app.use(
  "/public/document",
  express.static(path.join(__dirname, "../frontend/public/document"))
);

app.use("/uploads", express.static("uploads"));
app.use(
  "/uploads/documents",
  express.static(path.join(__dirname, "uploads/documents"))
);

app.get("/uploads/slide/", (req, res) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  res.sendFile(path.join(__dirname, "uploads/slider", req.params.image));
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
