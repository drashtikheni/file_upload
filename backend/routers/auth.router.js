const express = require("express");
const { check } = require("express-validator");

const authController = require("../controllers/auth.controller");
const checkAuth = require("../middleware/auth.middleware");

const authRouter = express.Router();

authRouter.post(
  "/login",
  [check("username").not().isEmpty(), check("password").not().isEmpty()],
  authController.login
);

authRouter.get("/me", checkAuth, authController.me);

authRouter.post(
  "/register",
  [check("username").not().isEmpty(), check("password").not().isEmpty()],
  authController.signup
);

module.exports.authRouter = authRouter;
