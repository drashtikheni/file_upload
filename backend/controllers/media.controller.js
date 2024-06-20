const AppError = require("../AppError");
const { upload, create, getAll } = require("../services/media.service");
const { HTTP_STATUSES } = require("../utils/constant");
const { somethingWentWrong, mediaRequired } = require("../utils/messages");

module.exports.uploadMedia = async (req, res) => {
  try {
    if (!req.file) throw new AppError(mediaRequired, HTTP_STATUSES.BAD_REQUEST);

    const { user } = req;
    const uploadedFile = await upload(req.file.path);

    const createdMedia = await create({
      originalFile: req?.file,
      uploadedFile,
      user,
    });

    return res.status(HTTP_STATUSES.OK).json({ media: createdMedia });
  } catch (error) {
    console.log("error", error);
    return res
      .status(error.status || HTTP_STATUSES.INTERNAL_SERVER_ERROR)
      .json({ err: error.message || somethingWentWrong });
  }
};

module.exports.list = async (req, res) => {
  try {
    const { user, query } = req;
    const { results, totalResults } = await getAll({ user, query });

    return res.status(HTTP_STATUSES.OK).json({ results, totalResults });
  } catch (error) {
    console.log("error", error);
    return res
      .status(error.status || HTTP_STATUSES.INTERNAL_SERVER_ERROR)
      .json({ err: error.message || somethingWentWrong });
  }
};
