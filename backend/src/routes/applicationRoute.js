const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");

const { applicationValidate } = require("../validate/applicationValidate");
const { runValidation } = require("../validate");
const { uploadApplication } = require("../middlewares/uploadFile");
const { apiUrl } = require("../../../frontend/src/secret");
//const upload = require("../middlewares/uploadFile");

router.get("/fetchApplication", applicationController.fetchApplication);
router.post(
  "/addApplication",
  uploadApplication.single("image"),
  applicationValidate,
  runValidation,
  applicationController.addApplication
);
router.put("/updateApplication/:id", applicationController.updateApplication);
router.delete(
  "/deleteApplication/:id",
  applicationController.deleteApplication
);
module.exports = router;
