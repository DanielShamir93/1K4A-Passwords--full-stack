const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { addUser, userLogin, getUser } = require("../controllers/user.controllers");



router.route("/add").post(addUser);

router.route("/login").post(userLogin);

router.route(auth, "/getUser").post(getUser);


module.exports = router;