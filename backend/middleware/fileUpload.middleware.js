const multer = require("multer");
const { v1: uuidV1 } = require("uuid");
const { invalidFileType } = require("../utils/messages");
const { mimeType } = require("../utils/javascript");
const { ALLOWED_MIME_TYPES } = require("../utils/constant");

module.exports.fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (_, __, cb) => {
      cb(null, "uploads");
    },
    filename: (_, file, cb) => {
      const ext = mimeType(file?.originalname);
      cb(null, uuidV1() + "." + ext);
    },
    fileFilter: (_, file, cb) => {
      const isValid = !!ALLOWED_MIME_TYPES[file.mimetype];
      let error = isValid ? null : new Error(invalidFileType);
      cb(error, isValid);
    },
  }),
});
