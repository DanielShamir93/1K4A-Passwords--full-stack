const User = require("../../models/user.model");
const bcrypt = require("bcryptjs");

const getUser = (req, res) => {
  const user = req.user;
  res.send(user);
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Unable to login");
    }

    const token = await user.generateAuthToken();

    res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const userLogoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const userLogout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (tokenObj) => tokenObj.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const addUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const createdDate = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "numeric",
    });
    const signedInDate = createdDate;
    const user = new User({ email, password, createdDate, signedInDate });
    const token = await user.generateAuthToken();
    user.save();
    res.status(200).send({ user, token });
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    const deletedUser = req.user;
    res.send(deletedUser);
  } catch (err) {
    res.status(500).send();
  }
};

const updateUser = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["email", "password"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: "invalid updates!" });
    }

    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  addUser,
  userLogin,
  userLogout,
  userLogoutAll,
  getUser,
  deleteUser,
  updateUser,
};
