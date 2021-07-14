const express = require("express");
const { login, register } = require("./../controllers/authController");
const { body } = require("express-validator");

const router = express.Router();

router.route("/login").post(  body("email").isEmail(),
    body("password").isLength({ min: 8 }),login);
router
  .route("/register")
  .post(
    body("username").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
    register
  );

module.exports = router;
