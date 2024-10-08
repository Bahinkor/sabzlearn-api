const express = require("express");
const userController = require("./../../controllers/v1/user");
const authMiddleware = require("./../../middlewares/auth");
const isAdminMiddleware = require("./../../middlewares/isAdmin");

const router = express.Router();

router.route("/ban/:id")
    .post(authMiddleware, isAdminMiddleware, userController.banUser);

module.exports = router;