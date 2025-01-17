const express = require("express");
const router = express.Router();
const userManageController = require("../controllers/userManageController");

router.get("/fetchUserManagement", userManageController.fetchUserManagement);
router.post("/addUserManagement", userManageController.addUserManagement);
router.put(
  "/updateUserManagement/:id",
  userManageController.updateUserManagement
);
router.delete(
  "/deleteUserManagement/:id",
  userManageController.deleteUserManagement
);

module.exports = router;
