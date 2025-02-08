const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");

const { applicationValidate } = require("../validate/applicationValidate");
const { runValidation } = require("../validate");
const {
  uploadApplication,
  uploadApplicationView,
} = require("../middlewares/uploadFile");

//const upload = require("../middlewares/uploadFile");

router.get("/fetchApplication", applicationController.fetchApplication);
router.get("/fetchApplication/:id", applicationController.fetchApplicationById);
router.get("/fetchApplicationEnquiry", applicationController.fetchApplication);

router.post(
  "/addApplication",
  uploadApplication.single("image"),
  applicationValidate,
  runValidation,
  applicationController.addApplication
);

router.put("/updateApplication/:id", applicationController.updateApplication);

router.put(
  "/updateApplicationAdd/:id",
  uploadApplicationView.single("file"),
  applicationController.updateApplicationAdd
);
router.put(
  "/updateApplicationApprove/:id",
  applicationController.updateApplicationApprove
);
router.put(
  "/updateApplicationPending/:id",
  applicationController.updateApplicationPending
);
router.put(
  "/updateApplicationReject/:id",
  applicationController.updateApplicationReject
);
router.put(
  "/updateApplicationView/:id",
  uploadApplicationView.single("file"),
  applicationController.updateApplicationView
);
router.delete(
  "/deleteApplication/:id",
  applicationController.deleteApplication
);
module.exports = router;
