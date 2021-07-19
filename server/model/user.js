const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    trim: true,
    required: [true, "username is required!"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    lowercase: true,
    unique: true,
  },

  password: { type: String },
  salt: { type: String },

  created_on: {
    type: Date,
    default: new Date(),
  },
  created_timestamp: {
    type: Number,
    default: new Date().valueOf(),
  },
  updated_on: Date,
  updated_timestamp: {
    type: Number,
    default: new Date().valueOf(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
