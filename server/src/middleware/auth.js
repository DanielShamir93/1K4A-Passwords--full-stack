const jwt = require('jsonwebtoken');
const User = require('../../db/models/user.model');

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ","");
    const decoded = jwt.verify(token, "thisismynewcourse");
    const user = await User.findOne({ _id: decoded._id, 'tokens.tokens': token })

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: "Please authenticate." });
  }

}

module.exports = auth;