const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { addUser, userLogin, userLogout, userLogoutAll, getUser, deleteUser, updateUser } = require("../controllers/user.controllers");

// Signup via email & password
router.route("/signup").post(addUser);
// Login via email & password
router.route("/login").post(userLogin);

// Middleware for authentication via Bearer token
router.use(["/logout", "/logoutAll", "/me" ], auth);

// Logout from user's device
router.route("/logout").post(userLogout);
// Logout from all user's device
router.route("/logoutAll").post(userLogoutAll);
// Logged in user options
router.route("/me")
  // Get user
  .get(getUser)
  // Delete user
  .delete(deleteUser)
  // Update user 
  .put(updateUser);

module.exports = router;