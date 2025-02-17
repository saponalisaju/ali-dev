const multer = require("multer");
const fs = require("fs");
const path = require("path");
const SLIDER_DIR = "uploads/sliderImages";
const APPLICATION_DIR = "uploads/applicationImages";
const JOB_LETTERS_DIR = "uploads/job_letters";
const LMIAS_DIR = "uploads/lmias";
const VISA_DIR = "uploads/visa";
const VISA_FORM_DIR = "uploads/visa_form";
const WORK_PERMIT_DIR = "uploads/work_permits";
const AIR_TICKETS_DIR = "uploads/air_tickets";
const ATTACH_FILE_DIR = "uploads/documents";
const MAX_FILE_SIZE = 2097152;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const ALLOWED_DOCUMENT_TYPE = ["image/jpeg", "image/png", "image/jpg"];

const createDirectories = () => {
  const directories = [
    SLIDER_DIR,
    APPLICATION_DIR,
    JOB_LETTERS_DIR,
    LMIAS_DIR,
    VISA_DIR,
    VISA_FORM_DIR,
    WORK_PERMIT_DIR,
    AIR_TICKETS_DIR,
    ATTACH_FILE_DIR,
  ];
  directories.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};
createDirectories();

const sliderStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, SLIDER_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const applicationStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, APPLICATION_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const applicationStorageView = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath;
    if (file.fieldname === "file") {
      uploadPath = JOB_LETTERS_DIR;
    } else if (file.fieldname === "file1") {
      uploadPath = LMIAS_DIR;
    } else if (file.fieldname === "file2") {
      uploadPath = VISA_DIR;
    } else if (file.fieldname === "file3") {
      uploadPath = VISA_FORM_DIR;
    } else if (file.fieldname === "file4") {
      uploadPath = WORK_PERMIT_DIR;
    } else if (file.fieldname === "file5") {
      uploadPath = AIR_TICKETS_DIR;
    } else {
      uploadPath = ATTACH_FILE_DIR;
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
