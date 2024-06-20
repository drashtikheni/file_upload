const User = require("../models/user.model");

module.exports.getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ username }).lean();
    return user;
  } catch (err) {
    console.log(err);
  }
};

module.exports.createUser = async (params) => {
  try {
    const user = await User.create(params);
    return user;
  } catch (err) {
    console.log(err);
  }
};
