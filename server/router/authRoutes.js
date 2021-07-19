const express = require("express");
const {
  login,
  register,
  isLogedIn,
  logout,
} = require("./../controllers/authController");
const { body } = require("express-validator");

const router = express.Router();

router.route("/login").post(login);
router
  .route("/register")
  .post(
    body("username").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
    register
  );

router.route("/isLoggedIn").get(isLogedIn);
router.route("/logout").get(logout);
module.exports = router;
