module.exports.getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ username }).lean();
    return user;
  } catch (err) {
    console.log(err);
  }
};
