const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { validateUserRegister, validateUserLogin } = require("../validate/auth");
const { runValidation } = require("../validate");
const {
  isLoggedOut,
  isLoggedIn,
  isAuthenticated,
} = require("../middlewares/auth");
const passport = require("../config/passport");
const passportJWT = passport.authenticate("jwt", { session: false });

router.post(
  "/profile",
  validateUserRegister,
  runValidation,
  userController.register
);

router.get("/get_users", userController.getUsers);
router.post(
  "/add_user",
  validateUserRegister,
  runValidation,
  userController.addUser
);
router.put("/update_user/:id", userController.updateUser);
router.delete("/delete_user/:id", userController.deleteUser);

router.post("/login", validateUserLogin, runValidation, userController.login);
router.post("/logout", isLoggedIn, userController.logout);
router.get("/dashboard", userController.dashboard);
router.get("/dashboard-data", passportJWT, userController.getDashboardData); // passport.authenticate("jwt", { session: false })

module.exports = router;
