const express = require("express");
const courseController = require("./course.controller");
const multerCoverUploader = require("../../utils/cover.uploader");
const multerVideoUploader = require("../../utils/video.uploader");
const authMiddleware = require("./../../middlewares/auth.middleware");
const isAdminMiddleware = require("./../../middlewares/isAdmin.middleware");

const courseRouter = express.Router();

courseRouter.route("/")
    .post(authMiddleware, isAdminMiddleware, multerCoverUploader.single("cover"), courseController.createCourse);

module.exports = courseRouter;