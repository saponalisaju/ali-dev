const multer = require("multer");
const fs = require("fs");
const path = require("path");
const SLIDER_FILE_DIR = "uploads/sliderImages";
const APPLICATION_FILE_DIR = "uploads/applicationImages";
const APPLICATION_JOB_LETTERS_DIR = "uploads/job_letters";
const APPLICATION_LMIAS_DIR = "uploads/lmias";
const APPLICATION_VISA_DIR = "uploads/visa";
const APPLICATION_VISA_FORM_DIR = "uploads/visa_form";
const APPLICATION_WORK_PERMIT_DIR = "uploads/work_permits";
const APPLICATION_AIR_TICKETS_DIR = "uploads/air_tickets";
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
    let uploadPath;
    if (file.fieldname === "file") {
      uploadPath = APPLICATION_JOB_LETTERS_DIR;
    } else if (file.fieldname === "file1") {
      uploadPath = APPLICATION_LMIAS_DIR;
    } else if (file.fieldname === "file2") {
      uploadPath = APPLICATION_VISA_DIR;
    } else if (file.fieldname === "file3") {
      uploadPath = APPLICATION_VISA_FORM_DIR;
    } else if (file.fieldname === "file4") {
      uploadPath = APPLICATION_WORK_PERMIT_DIR;
    } else if (file.fieldname === "file5") {
      uploadPath = APPLICATION_AIR_TICKETS_DIR;
    } else {
      uploadPath = APPLICATION_ATTACH_FILE_DIR;
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
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
