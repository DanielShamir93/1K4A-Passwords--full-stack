const User = require("../../../db/models/user.model");
const bcrypt = require("bcryptjs");


const getUser = (req, res) => {
  res.send(req.user);
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Unable to login");
    }

    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err.message);
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
    user.save();
    const token = await user.generateAuthToken();
    res.status(200).send({user, token});
  } catch (err) {
    res.status(404).send(err.message);
  }
};


module.exports = { addUser, userLogin, getUser };
