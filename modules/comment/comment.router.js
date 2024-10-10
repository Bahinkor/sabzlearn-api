const express = require("express");
const commentController = require("./comment.controller");
const authMiddleware = require("./../../middlewares/auth.middleware");

const commentRouter = express.Router();

commentRouter.route("/")
    .post(authMiddleware, commentController.create);

module.exports = commentRouter;