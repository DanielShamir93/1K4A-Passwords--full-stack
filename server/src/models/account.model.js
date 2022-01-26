const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  accountName: {
    type: String,
    required: true
  },
  accountSubname: {
    type: String
  },
  isPassHasDigit: {
    type: Boolean,
    required: true
  },
  isPassHasLowercase: {
    type: Boolean,
    required: true
  },
  isPassHasSymbol: {
    type: Boolean,
    required: true
  },
  isPassHasUppercase: {
    type: Boolean,
    required: true
  },
  passAvoidChars: {
    type: String
  },
  passEndsWith: {
    type: String
  },
  passLength: {
    type: Number,
    required: true
  }, 
  keyboardMustContain: {
    type: String
  },
  passPattern: {
    type: String
  },
  passStartsWith: {
    type: String,
  },
  publicKey: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

module.exports = mongoose.model("Account", accountSchema);