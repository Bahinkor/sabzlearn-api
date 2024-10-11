const express = require("express");
const userCourseController = require("./userCourse.controller");
const authMiddleware = require("./../../middlewares/auth.middleware");

const userCourseRouter = express.Router();

userCourseRouter.route("/:id")
    .post(authMiddleware, userCourseController.register);

module.exports = userCourseRouter;