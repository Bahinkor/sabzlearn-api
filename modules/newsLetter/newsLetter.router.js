const newsLetterController = require("./newsLetter.controller");
const authMiddleware = require("./../../middlewares/auth.middleware");
const isAdminMiddleware = require("./../../middlewares/isAdmin.middleware");
const express = require("express");

const newsLetterRouter = express.Router();

newsLetterRouter.route("/")
    .get(authMiddleware, isAdminMiddleware, newsLetterController.getAll)
    .post(newsLetterController.create);

module.exports = newsLetterRouter;