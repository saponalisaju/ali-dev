const express = require("express");
const router = express.Router();
const salaryController = require("../controllers/salaryController");
const { validateSalary } = require("../validate/userAuth");
const { runValidation } = require("../validate");

router.get("/fetchSalary", salaryController.fetchSalary);
router.post(
  "/addSalary",
  validateSalary,
  runValidation,
  validateSalary,
  salaryController.addSalary
);
router.put("/updateSalary/:id", salaryController.updateSalary);
router.delete("/deleteSalary/:id", salaryController.deleteSalary);

module.exports = router;
