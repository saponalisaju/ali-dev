const express = require("express");
const router = express.Router();
const designationController = require("../controllers/desigController");
const { validateDesignation } = require("../validate/userAuth");
const { runValidation } = require("../validate");

router.get("/fetchDesignation", designationController.fetchDesignation);
router.post(
  "/addDesignation",
  validateDesignation,
  runValidation,
  designationController.addDesignation
);
router.put("/editDesignation/:id", designationController.editDesignation);
router.delete(
  "/deleteDesignation/:id",
  designationController.deleteDesignation
);

module.exports = router;
