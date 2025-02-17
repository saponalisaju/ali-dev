const { body } = require("express-validator");

exports.validateDesignation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Designation name is required.")
    .isLength({ min: 3, max: 31 })
    .withMessage("Name should be at least 4-24 character long"),
];

exports.validateCompany = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Company name is required. Enter your fullname")
    .isLength({ min: 3, max: 31 })
    .withMessage("Name should be at least 4-24 character long"),
];

exports.validatePage = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Page is required.")
    .isLength({ min: 3, max: 31 })
    .withMessage("Title should be at least 3-24 character long"),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required.")
    .isLength({ min: 3, max: 31 })
    .withMessage("Content should be at least 3-24 character long"),
  body("link").trim().notEmpty(),
];

exports.validateSalary = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Salary is required.")
    .isLength({ min: 3, max: 31 })
    .withMessage("Name should be at least 3-24 character long"),

  // .isFloat({ gt: 0 })
  // .withMessage("Salary must be greater than 0"),
];

exports.validateSlider = [
  body("thumbnail")
    .trim()
    .notEmpty()
    .withMessage("Thumbnail is required. ")
    .isLength({ min: 3, max: 31 })
    .withMessage("Thumbnail should be at least 4-24 character long"),

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required. ")
    .isLength({ min: 3, max: 31 })
    .withMessage("Title should be at least 4-24 character long"),

  body("image").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Slider image is required");
    }
    return true;
  }),
];

exports.validateUserManagement = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required. Enter your fullname")
    .isLength({ min: 3, max: 31 })
    .withMessage("Name should be at least 4-24 character long"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required. Enter your email address")
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required. Enter your password"),
];
