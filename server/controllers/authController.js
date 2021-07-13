const User = require("./../model/user");
const crypto = require("crypto");
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

  res.status(200).json({
    status: "success",
    user,
  });
};
