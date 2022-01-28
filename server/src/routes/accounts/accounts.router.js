const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const { createAccount, getAllAccounts, updateAccount, deleteAccount } = require('../controllers/account.controllers');

router.use(auth);

router.route("/create").post(createAccount);

router.route("/getAll").get(getAllAccounts);

router.route("/update/:id").put(updateAccount);

router.route("/delete/:id").delete(deleteAccount);


module.exports = router;