const User = require("./../model/user");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

async function jwtSign(userId) {
  return await jwt.sign({ id: userId }, process.env.SECRET, {
    expiresIn: process.env.EXPIRESIN,
  });
}

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).json({
      status: "fail",
      errors: [
        {
          name: "user not found",
          message: "there is no user with this email address",
        },
      ],
    });
  }

  const checkPass =
    user.password ===
    crypto.pbkdf2Sync(password, user.salt, 10000, 64, "sha512").toString("hex");

  if (!checkPass) {
    return res.status(400).json({
      status: "fail",
      errors: [
        {
          name: "user not found",
          message: "there is no user with this email address",
        },
      ],
    });
  }
  const token = await jwtSign(user.id);
  req.session.token = token;

  res.status(200).json({
    status: "success",
    user,
  });
};

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
  const token = await jwtSign(user.id);

  req.session.token = token;

  res.status(200).json({
    status: "success",
    user,
  });
};

exports.isLogedIn = async (req, res, next) => {
  if (!req.session.token) {
    return res.json({
      status: "fail",
      user: null,
      isLoggedIn: false,
    });
  }
  const { token } = req.session;
  const tokenV = await jwt.verify(token, process.env.SECRET);
  if (!tokenV) {
    res.status(400).json({
      status: "fail",
      errors: {
        name: "exp",
        message: "token expired",
      },
    });
  }
  const { userId } = tokenV;

  const user = await User.findOne({ id: userId });
  if (!user) {
    return res.json({
      status: "fail",
      errors: {
        name: "unauthorize access",
        message: "the user is not authorzed",
      },
    });
  }
  res.status(200).json({
    status: "success",
    user,
    isLoggedIn: true,
  });
};

exports.logout = (req, res, next) => {
  return new Promise((resolve) => {
    req.session.destroy((err) => {
      res.clearCookie("qid");
      if (err) {
        console.log(err);
        resolve(false);
        return;
      }
      resolve(true);
    });
  });
};
