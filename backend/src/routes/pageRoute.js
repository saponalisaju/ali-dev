const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
const { validatePage } = require("../validate/userAuth");
const { runValidation } = require("../validate");

router.get("/fetchPage", pageController.fetchPage);
router.post("/addPage", validatePage, runValidation, pageController.addPage);
router.put("/updatePage/:id", pageController.updatePage);
router.delete("/deletePage/:id", pageController.deletePage);

module.exports = router;
