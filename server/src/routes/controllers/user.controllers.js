const User = require("../../../db/models/userModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select(["_id", "firstName", "lastName"]).sort({firstName: 1, lastName: 1});
    res.json(users);
  } catch (err) {
    res.send(err.message);
  }
};

const getUser = (req, res) => {
  try {
    const { id } = req.params;
    User.findById(id, (err, doc) => {
      if (err) {
        console.log(err);
      }
      res.json(doc);
    });
  } catch (err) {
    res.send(err.message);
  }
};

const addUser = async (req, res) => {
  try {
    const { firstName, lastName, cash, credit } = req.body;
    const newUser = { firstName, lastName, cash, credit };
    const user = await User.create(newUser);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({})
    res.status(200).send("All users have been deleted.");
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.deleteOne({ _id: id });
    res.send(`User ${id} has been deleted from database.`);
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = { getAllUsers, getUser, addUser, deleteAllUsers, deleteUser };
