const { validationResult } = require("express-validator");
const { getUserByUsername, createUser } = require("../services/auth.service");
const { HTTP_STATUSES } = require("../utils/constant");
const {
  invalidDataProvided,
  invalidCredentials,
  userCreated,
  userExists,
} = require("../utils/messages");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(HTTP_STATUSES.BAD_REQUEST)
        .json({ err: invalidDataProvided });

    const { username, password } = req.body;

    const user = await getUserByUsername(username);
    if (!user)
      return res
        .status(HTTP_STATUSES.NOT_FOUND)
        .json({ err: invalidCredentials });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res
        .status(HTTP_STATUSES.BAD_REQUEST)
        .json({ err: invalidCredentials });

    const token = jwt.sign({ ...user }, process.env.JWT_KEY);

    delete user.password;
    return res.status(HTTP_STATUSES.OK).json({ token, user });
  } catch (err) {
    console.log(err);
    return res
      .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR)
      .json({ err: err.message || JSON.stringify(err) });
  }
};

module.exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res
        .status(HTTP_STATUSES.BAD_REQUEST)
        .json({ err: invalidDataProvided, errors: errors.errors });

    const { username, password } = req.body;
    const HASH_ROUNDS = parseInt(process.env.HASH_ROUNDS);

    const existingUser = await getUserByUsername(username);
    if (existingUser)
      return res.status(HTTP_STATUSES.CONFLICT).json({ err: userExists });

    const hashedPassword = await bcrypt.hash(password, HASH_ROUNDS);

    await createUser({ username, password: hashedPassword });

    return res.status(HTTP_STATUSES.CREATED).json({ message: userCreated });
  } catch (err) {
    console.log(err);
    return res
      .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR)
      .json({ err: err.message || JSON.stringify(err) });
  }
};

module.exports.me = (req, res) => {
  const { user } = req;
  delete user.password;
  return res.status(HTTP_STATUSES.OK).json({ user });
};
