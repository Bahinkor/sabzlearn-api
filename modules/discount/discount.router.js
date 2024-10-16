const express = require("express");
const discountController = require("./discount.controller");
const authMiddleware = require("./../../middlewares/auth.middleware");
const isAdminMiddleware = require("./../../middlewares/isAdmin.middleware");

const discountRouter = express.Router();

discountRouter.use(authMiddleware);

discountRouter.route("/")
    .get(isAdminMiddleware, discountController.getAll)
    .post(isAdminMiddleware, discountController.create);

discountRouter.route("/all")
    .put(isAdminMiddleware, discountController.setOneAll);

discountRouter.route("/:code")
    .get(discountController.getOne);

discountRouter.route("/:id")
    .delete(isAdminMiddleware, discountController.remove);

module.exports = discountRouter;