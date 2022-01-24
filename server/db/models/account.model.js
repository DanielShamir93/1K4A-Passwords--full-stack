const { Schema, model } = require('mongoose');

const accountSchema = new Schema({
  accountName: {
    type: String,
    required: true
  },
  accountSubName: {
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
  user: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = model("Account", accountSchema);