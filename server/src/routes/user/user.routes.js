const express = require("express");
const router = express.Router();
const { getAllUsers, getUser, addUser, deleteAllUsers, deleteUser } = require("../controllers/user.controllers");

// Add user
// { cash, credit } = req.body:
router.route("/add").post(addUser);

router.route("/all")
  .get(getAllUsers)
  .delete(deleteAllUsers);

// Show details of user
router.route("/:id").get(getUser);

// Delete user
router.route("/:id/delete").delete(deleteUser);

module.exports = router;
