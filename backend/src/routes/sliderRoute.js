const express = require("express");
const router = express.Router();
const sliderController = require("../controllers/sliderController");
const { uploadSlider } = require("../middlewares/uploadFile");
const { validateSlider } = require("../validate/userAuth");
const { runValidation } = require("../validate");

router.get("/fetchSlider", sliderController.fetchSlider);
router.post(
  "/addSlider",
  uploadSlider.single("image"),
  // validateSlider,
  // runValidation,
  sliderController.addSlider
);
router.put("/updateSlider/:id", sliderController.updateSlider);
router.delete("/deleteSlider/:id", sliderController.deleteSlider);

module.exports = router;
