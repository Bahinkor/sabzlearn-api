const express = require("express");
const courseController = require("./course.controller");
const multerUploader = require("./../../utils/uploader");
const authMiddleware = require("./../../middlewares/auth.middleware");
const isAdminMiddleware = require("./../../middlewares/isAdmin.middleware");

const courseRouter = express.Router();

courseRouter.route("/")
    .post(authMiddleware, isAdminMiddleware, multerUploader.single("cover"), courseController.createCourse);

module.exports = courseRouter;