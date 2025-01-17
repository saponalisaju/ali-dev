const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { validateUserRegister, validateUserLogin } = require("../validate/auth");
const { runValidation } = require("../validate");
const { isLoggedOut, isLoggedIn } = require("../middlewares/auth");
const passport = require("../config/passport");
const passportJWT = passport.authenticate("jwt", { session: false });

router.post(
  "/register",
  validateUserRegister,
  runValidation,
  userController.register
);

router.post("/login", validateUserLogin, runValidation, userController.login);
router.post("/logout", isLoggedIn, userController.logout);
router.get("/dashboard", passportJWT, userController.dashboard);
router.get("/dashboard-data", passportJWT, userController.getDashboardData); // passport.authenticate("jwt", { session: false })

module.exports = router;
