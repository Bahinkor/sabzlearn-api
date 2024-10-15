const express = require("express");
const notificationController = require("./notification.controller");
const authMiddleware = require("./../../middlewares/auth.middleware");
const isAdminMiddleware = require("./../../middlewares/isAdmin.middleware");

const notificationRouter = express.Router();

notificationRouter.use(authMiddleware);
notificationRouter.use(isAdminMiddleware);

notificationRouter.route("/")
    .post(notificationController.create)
    .get(notificationController.getAll);

notificationRouter.route("/me")
    .get(notificationController.get);

notificationRouter.route("/:id/seen")
    .put(notificationController.seen);

module.exports = notificationRouter;