const express = require("express");
const replayController = require("./replay.controller");
const authMiddleware = require("././../../middlewares/auth.middleware");
const isAdminMiddleware = require("././../../middlewares/isAdmin.middleware");

const replayRouter = express.Router();

replayRouter.route("/:id")
    .post(authMiddleware, isAdminMiddleware, replayController.create);

module.exports = replayRouter;