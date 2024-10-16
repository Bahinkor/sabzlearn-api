const express = require("express");
const orderController = require("./order.controller");
const authMiddleware = require("./../../middlewares/auth.middleware");

const orderRouter = express.Router();

orderRouter.use(authMiddleware);

orderRouter.route("/")
    .get(orderController.getAll);

orderRouter.route("/:id")
    .get(orderController.getOne);

module.exports = orderRouter;