const express = require("express");
const commentController = require("./comment.controller");
const authMiddleware = require("./../../middlewares/auth.middleware");
const isAdminMiddleware = require("./../../middlewares/isAdmin.middleware");

const commentRouter = express.Router();

commentRouter.route("/")
    .post(authMiddleware, commentController.create);

commentRouter.route("/:id")
    .delete(authMiddleware, isAdminMiddleware, commentController.remove);

module.exports = commentRouter;