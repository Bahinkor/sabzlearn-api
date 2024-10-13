const express = require("express");
const contactController = require("./contact.controller");
const authMiddleware = require("./../../middlewares/auth.middleware");
const isAdminMiddleware = require("./../../middlewares/isAdmin.middleware");

const contactRouter = express.Router();

contactRouter.route("/")
    .get(authMiddleware, isAdminMiddleware, contactController.getAll)
    .post(contactController.create);

contactRouter.route("/:id")
    .delete(authMiddleware, isAdminMiddleware, contactController.remove)
    .post(authMiddleware, isAdminMiddleware, contactController.answer);

module.exports = contactRouter;