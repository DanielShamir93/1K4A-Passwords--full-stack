const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const { createAccount, getAllAccounts, updateAccount, deleteAccount } = require('../controllers/account.controllers');

router.use(auth);
// Create account
router.route("/create").post(createAccount);
// Get all accounts
router.route("/getAll").get(getAllAccounts);
// Update account
router.route("/update/:id").put(updateAccount);
// Delete account
router.route("/delete/:id").delete(deleteAccount);


module.exports = router;