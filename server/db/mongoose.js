const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URL = 'mongodb://localhost:27017/users';

mongoose.connect(
  MONGODB_URL, 
  () => {
    console.log("mongoDB connected");
  },
  (e) => console.error(e)
);