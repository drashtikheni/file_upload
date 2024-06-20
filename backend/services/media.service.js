const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");
const { env } = require("../utils/javascript");
const { CLOUDINARY_CONFIGS, HTTP_STATUSES } = require("../utils/constant");
const AppError = require("../AppError");
const { somethingWentWrong } = require("../utils/messages");
const Media = require("../models/media.model");

module.exports.upload = async (path) => {
  cloudinary.config({
    cloud_name: env(CLOUDINARY_CONFIGS.CLOUD_NAME),
    api_key: env(CLOUDINARY_CONFIGS.API_KEY),
    api_secret: env(CLOUDINARY_CONFIGS.API_SECRET),
  });

  const uploadedMedia = await cloudinary.uploader
    .upload(path)
    .catch((error) => {
      console.log(error);
      throw new AppError(
        error.message || somethingWentWrong,
        HTTP_STATUSES.INTERNAL_SERVER_ERROR
      );
    });

  fs.unlinkSync(path);

  return uploadedMedia;
};

module.exports.create = async ({ originalFile, uploadedFile, user }) => {
  const media = new Media({
    link: uploadedFile.url,
    size: originalFile?.size,
    name: originalFile?.originalname,
    createdBy: user?._id,
    publicId: uploadedFile?.public_id,
  });
  const createdMedia = await media.save();
  return createdMedia;
};
