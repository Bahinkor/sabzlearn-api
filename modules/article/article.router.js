const express = require("express");
const articleController = require("./article.controller");
const authMiddleware = require("./../../middlewares/auth.middleware");
const isAdminMiddleware = require("./../../middlewares/isAdmin.middleware");
const uploader = require("./../../utils/articleCover.uploader");

const articleRouter = express.Router();

articleRouter.route("/")
    .get(articleController.getAll)
    .post(authMiddleware, isAdminMiddleware, uploader.single("cover"), articleController.create);

articleRouter.route("/:href")
    .get(articleController.getOne);

articleRouter.route("/:id")
    .delete(authMiddleware, isAdminMiddleware, articleController.remove);

module.exports = articleRouter;