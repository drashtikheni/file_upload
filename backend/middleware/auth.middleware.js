const jwt = require("jsonwebtoken");
const { authenticationFailed } = require("../utils/messages");
const { HTTP_STATUSES } = require("../utils/constant");
const { getUserByUsername } = require("../services/auth.service");

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") return next();

  try {
    const token = req.headers.authorization?.split(" ")?.[1];

    if (!token) return res.status(200).json({ err: authenticationFailed });

    const decodedData = jwt.verify(token, process.env.JWT_KEY);

    const user = await getUserByUsername(decodedData?.username);

    if (!user)
      return res
        .status(HTTP_STATUSES.UNAUTHORIZED)
        .json({ err: authenticationFailed });

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(HTTP_STATUSES.OK).json({ err: authenticationFailed });
  }
};
