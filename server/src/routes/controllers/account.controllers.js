const Account = require("../../models/account.model");

const createAccount = async (req, res) => {
  try {
    const account = new Account({
      ...req.body,
      owner: req.user._id,
    });
    await account.save();
    res.status(201).send(account);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const deleteAccount = async (req, res) => {
  try {
    const account = await Account.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!account) {
      res.status(404).send(err.message);
    }

    res.send(account);
  } catch (err) {
    res.status(500).send();
  }
};

const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ owner: req.user._id });
    res.send(accounts);
  } catch (err) {
    res.status(500).send();
  }
};

const updateAccount = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "accountName",
      "accountSubname",
      "isPassHasDigit",
      "isPassHasLowercase",
      "isPassHasSymbol",
      "isPassHasUppercase",
      "passAvoidChars",
      "passEndsWith",
      "passLength",
      "keyboardMustContain",
      "passPattern",
      "passStartsWith",
    ];

    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: "invalid updates!" });
    }

    const account = await Account.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!account) {
      res.status(400).send();
    }

    console.log(account)

    updates.forEach((update) => (account[update] = req.body[update]));
    await account.save();
    res.send(account);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  createAccount,
  getAllAccounts,
  updateAccount,
  deleteAccount,
};
