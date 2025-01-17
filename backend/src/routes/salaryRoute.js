const express = require("express");
const router = express.Router();
const salaryController = require("../controllers/salaryController");
const { validateSalary } = require("../validate/userAuth");
const { runValidation } = require("../validate");
const passport = require("passport");
const passportJWT = passport.authenticate("jwt", { session: false });

router.get(
  "/fetchSalary",

  validateSalary,
  runValidation,
  salaryController.fetchSalary
);
router.post(
  "/addSalary",
  validateSalary,
  runValidation,
  salaryController.addSalary
);
router.put("/updateSalary/:id", salaryController.updateSalary);
router.delete("/deleteSalary/:id", salaryController.deleteSalary);

module.exports = router;
