const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const auth = async (req, res, next) => {
  try {
    console.log(req.header("Authorization"));
    console.log(JSON.stringify(req.header("Authorization")));
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "private-key");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
