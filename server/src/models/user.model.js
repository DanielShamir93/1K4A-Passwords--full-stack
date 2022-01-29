const bcrypt = require("bcryptjs");
const validator = require("validator");
const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const Account = require("../models/account.model");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid.");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length < 5) {
        throw new Error("Password must be at least 5 characters.");
      }
    },
  },
  createdDate: {
    type: String,
    required: true,
  },
  signedInDate: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.virtual("accounts", {
  ref: "Account",
  localField: "_id",
  foreignField: "owner"
})

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.createdDate;
    delete userObject.signedInDate;

    return userObject;
}

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "private-key", {expiresIn: "1h"});

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// Hash the password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

// Delete user accounts when user is removed
userSchema.pre("remove", async function (next) {
  const user = this;

  await Account.deleteMany({ owner: user._id })

  next();
})

module.exports = model("User", userSchema);
