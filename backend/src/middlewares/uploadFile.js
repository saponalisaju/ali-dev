const multer = require("multer");
const fs = require("fs");
const path = require("path");
const SLIDER_FILE_DIR = "uploads/sliderImages";
const APPLICATION_FILE_DIR = "uploads/applicationImages";
const MAX_FILE_SIZE = 2097152;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const sliderStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, SLIDER_FILE_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const applicationStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, APPLICATION_FILE_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, JPG and PNG are allowed"));
  }
};

const uploadSlider = multer({
  storage: sliderStorage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: fileFilter,
});

const uploadApplication = multer({
  storage: applicationStorage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: fileFilter,
});

module.exports = {
  uploadSlider,
  uploadApplication,
};
