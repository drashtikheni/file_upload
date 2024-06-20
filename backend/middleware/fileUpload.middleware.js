const multer = require("multer");
const { v1: uuidV1 } = require("uuid");
const { invalidFileType } = require("../utils/messages");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

module.exports.fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (_, _, cb) => {
      cb(null, "uploads/images");
    },
    filename: (_, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuidV1() + "." + ext);
    },
  }),
  fileFilter: (_, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error(invalidFileType);
    cb(error, isValid);
  },
});
