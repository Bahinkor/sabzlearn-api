const express = require("express");
const courseController = require("./course.controller");
const multerCoverUploader = require("../../utils/cover.uploader");
const authMiddleware = require("./../../middlewares/auth.middleware");
const isAdminMiddleware = require("./../../middlewares/isAdmin.middleware");

const courseRouter = express.Router();

courseRouter.route("/")
    .post(authMiddleware, isAdminMiddleware, multerCoverUploader.single("cover"), courseController.createCourse);

courseRouter.route("/:href")
    .get(authMiddleware, courseController.getOne)
    .delete(authMiddleware, isAdminMiddleware, courseController.remove);

courseRouter.route("/popular")
    .get(courseController.getPopular);

courseRouter.route("/related/:href")
    .get(courseController.getRelated);

courseRouter.route("/category/:href")
    .get(courseController.getByCategory);

module.exports = courseRouter;