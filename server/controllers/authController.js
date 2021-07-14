const User = require("./../model/user");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

async function jwtSign(userId) {
  return await jwt.sign({ id: userId }, process.env.SECRET, {
    expiresIn: process.env.EXPIRESIN,
  });
}

exports.login = (req, res) => {};

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, email, password } = req.body;
  const salt = crypto.randomBytes(16).toString("hex");
  const hashPass = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  const user = await User.create({ username, email, salt, password: hashPass });
  const token = await jwtSign();

  req.session.token = token;

  res.status(200).json({
    status: "success",
    user,
  });
};
