const { validationResult } = require("express-validator");
const { getUserByUsername } = require("../services/auth.service");
const { HTTP_STATUSES } = require("../utils/constant");
const {
  invalidDataProvided,
  invalidCredentials,
} = require("../utils/messages");

module.exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(HTTP_STATUSES.UNAUTHORIZED)
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
        .status(HTTP_STATUSES.UNAUTHORIZED)
        .json({ err: invalidCredentials });

    const token = jwt.sign({ ...user }, process.env.SECRET_KEY);
    return res.status(HTTP_STATUSES.OK).json({ token });
  } catch (err) {
    console.log(err);
    return res
      .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR)
      .json({ err: err.message || JSON.stringify(err) });
  }
};
