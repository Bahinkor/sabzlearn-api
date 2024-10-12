const express = require("express");
const commentController = require("./comment.controller");
const authMiddleware = require("./../../middlewares/auth.middleware");
const isAdminMiddleware = require("./../../middlewares/isAdmin.middleware");

const commentRouter = express.Router();

commentRouter.route("/")
    .post(authMiddleware, commentController.create);

commentRouter.route("/:id")
    .delete(authMiddleware, isAdminMiddleware, commentController.remove);

commentRouter.route("/:id/accept")
    .put(authMiddleware, isAdminMiddleware, commentController.accept);

commentRouter.route("/:id/reject")
    .put(authMiddleware, isAdminMiddleware, commentController.reject);

commentRouter.route("/:id/answer")
    .post(authMiddleware, isAdminMiddleware, commentController.answer);

module.exports = commentRouter;