const { HTTP_STATUSES } = require("../utils/constant");
const { somethingWentWrong } = require("../utils/messages");

const errorHandler = (error, _, res) => {
  const statusCode = error.status || HTTP_STATUSES.INTERNAL_SERVER_ERROR;
  const err = error.message || somethingWentWrong;

  return res.status(statusCode).json({ err });
};

module.exports = errorHandler;
