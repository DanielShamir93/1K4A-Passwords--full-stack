const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL || 5000;

mongoose.connect(
  MONGODB_URL,
  () => {
    console.log("mongoDB connected");
  },
  (e) => console.error(e)
);