const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");

router.get("/fetchPage", pageController.fetchPage);
router.post("/addPage", pageController.addPage);
router.put("/updatePage/:id", pageController.updatePage);
router.delete("/deletePage/:id", pageController.deletePage);

module.exports = router;
