const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const { validateCompany } = require("../validate/userAuth");
const { runValidation } = require("../validate");

router.get("/fetchCompany", companyController.fetchCompany);
router.post(
  "/addCompany",

  companyController.addCompany
);
router.put("/updateCompany/:id", companyController.updateCompany);
router.delete("/deleteCompany/:id", companyController.deleteCompany);

module.exports = router;
