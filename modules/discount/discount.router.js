const express = require("express");
const discountController = require("./discount.controller");
const authMiddleware = require("./../../middlewares/auth.middleware");
const isAdminMiddleware = require("./../../middlewares/isAdmin.middleware");

const discountRouter = express.Router();

discountRouter.route("/")
    .get(authMiddleware, isAdminMiddleware, discountController.getAll)
    .post(authMiddleware, isAdminMiddleware, discountController.create);

discountRouter.route("/all")
    .post(authMiddleware, isAdminMiddleware, discountController.setOneAll);

discountRouter.route("/:code")
    .get(authMiddleware, discountController.getOne);

discountRouter.route("/:id")
    .delete(authMiddleware, isAdminMiddleware, discountController.remove);

module.exports = discountRouter;