const multer = require("multer");
const fs = require("fs");
const path = require("path");
const SLIDER_FILE_DIR = "uploads/sliderImages";
const APPLICATION_FILE_DIR = "uploads/applicationImages";
const APPLICATION_ATTACH_FILE_DIR = "uploads/documents";
const MAX_FILE_SIZE = 2097152;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const ALLOWED_DOCUMENT_TYPE = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "application/pdf",
  "application/msword",
];

const sliderStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, SLIDER_FILE_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

const applicationStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, APPLICATION_FILE_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

const applicationStorageView = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, APPLICATION_ATTACH_FILE_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, JPG and PNG are allowed"));
  }
};

const documentFilter = (req, file, cb) => {
  if (ALLOWED_DOCUMENT_TYPE.includes(file.mimetype)) {
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

const uploadApplicationView = multer({
  storage: applicationStorageView,
  limits: { fileSize: MAX_FILE_SIZE },
  documentFilter: documentFilter,
});

module.exports = {
  uploadSlider,
  uploadApplication,
  uploadApplicationView,
};
