const express = require("express");
const categoryController = require("./category.controller");
const authMiddleware = require("./../../middlewares/auth.middleware");
const isAdminMiddleware = require("../../middlewares/isAdmin.middleware");

const categoryRouter = express.Router();

categoryRouter.route("/")
    .post(authMiddleware, isAdminMiddleware, categoryController.create)
    .get(categoryController.getAll);

categoryRouter.route("/:id")
    .delete(authMiddleware, isAdminMiddleware, categoryController.remove)
    .put(authMiddleware, isAdminMiddleware, categoryController.update);

module.exports = categoryRouter;