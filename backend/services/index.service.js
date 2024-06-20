const { default: mongoose } = require("mongoose");
const AppError = require("../AppError");
const { notFound } = require("../utils/messages");
const { HTTP_STATUSES } = require("../utils/constant");

module.exports.validateId = (id) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id))
    throw new AppError(notFound, HTTP_STATUSES.NOT_FOUND);
};
