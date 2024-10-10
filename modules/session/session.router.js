const express = require("express");
const sessionController = require("./session.controller");
const multerVideoUploader = require("../../utils/video.uploader");
const authMiddleware = require("./../../middlewares/auth.middleware");
const isAdminMiddleware = require("./../../middlewares/isAdmin.middleware");

const sessionRouter = express.Router();

sessionRouter.route("/")
    .get(authMiddleware, isAdminMiddleware, sessionController.getAll);

sessionRouter.route("/:id")
    .post(authMiddleware, isAdminMiddleware, multerVideoUploader.single("video"), sessionController.createSession);

module.exports = sessionRouter;