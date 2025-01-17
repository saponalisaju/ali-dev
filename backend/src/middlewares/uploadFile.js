const multer = require("multer");
const fs = require("fs");
const path = require("path");
const SLIDER_FILE_DIR = "public/images/sliderUsers";
const APPLICATION_FILE_DIR = "public/images/applicationUsers";
const MAX_FILE_SIZE = 2097152;
// const ALLOWED_FILE_TYPES = [
//   "image/jpeg",
//   "image/png",
//   "image/jpg",
//   "image/webp",
// ];

const sliderStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, SLIDER_FILE_DIR);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const applicationStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, APPLICATION_FILE_DIR);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const mimeType = allowedTypes.test(file.mimetype);
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: File type not supported");
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
