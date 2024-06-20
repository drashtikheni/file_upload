const express = require("express");
const { check } = require("express-validator");

const authController = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post(
  "/login",
  [check("username").not().isEmpty(), check("password").isStrongPassword()],
  authController.login
);

module.exports.authRouter = authRouter;
