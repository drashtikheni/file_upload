const express = require("express");

const mediaController = require("../controllers/media.controller");
const { fileUpload } = require("../middleware/fileUpload.middleware");
const checkAuth = require("../middleware/auth.middleware");

const mediaRouter = express.Router();

mediaRouter.post(
  "/",
  checkAuth,
  fileUpload.single("media"),
  mediaController.uploadMedia
);

mediaRouter.get("/", checkAuth, mediaController.list);

mediaRouter.delete("/:id", checkAuth, mediaController.delete);

module.exports.mediaRouter = mediaRouter;
