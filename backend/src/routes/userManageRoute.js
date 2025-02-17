const express = require("express");
const router = express.Router();
const userManageController = require("../controllers/userManageController");
const { validateUserManagement } = require("../validate/userAuth");
const { runValidation } = require("../validate");

router.get("/fetchUserManagement", userManageController.fetchUserManagement);
router.post(
  "/addUserManagement",
  validateUserManagement,
  runValidation,
  userManageController.addUserManagement
);
router.put(
  "/updateUserManagement/:id",
  userManageController.updateUserManagement
);
router.delete(
  "/deleteUserManagement/:id",
  userManageController.deleteUserManagement
);

module.exports = router;
