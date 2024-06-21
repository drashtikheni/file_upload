const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");
const { env } = require("../utils/javascript");
const { CLOUDINARY_CONFIGS, HTTP_STATUSES } = require("../utils/constant");
const AppError = require("../AppError");
const { somethingWentWrong, notFound } = require("../utils/messages");
const Media = require("../models/media.model");
const { pagination } = require("../utils/pagination");
const { validateId } = require("./index.service");
require("dotenv").config();

cloudinary.config({
  cloud_name: env(CLOUDINARY_CONFIGS.CLOUD_NAME),
  api_key: env(CLOUDINARY_CONFIGS.API_KEY),
  api_secret: env(CLOUDINARY_CONFIGS.API_SECRET),
});

module.exports.upload = async (path) => {
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

const removeCloudinaryMedia = async (id) => {
  await cloudinary.uploader.destroy(id);
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

module.exports.getAll = async ({ query = {} }) => {
  const { page, pageSize } = pagination(query);

  const results = await Media.find({})
    .limit(pageSize)
    .skip(page)
    .sort({ createdAt: -1 })
    .populate("createdBy", "username");
  const totalResults = await Media.countDocuments({});

  return { results, totalResults };
};

module.exports.deleteMedia = async ({ user, ids }) => {
  ids?.forEach((id) => validateId(id));

  const deletedMedias = await Media.find({ _id: { $in: ids } });
  await Media.deleteMany({ _id: { $in: ids } });

  deletedMedias.forEach((media) => removeCloudinaryMedia(media?.publicId));
};
