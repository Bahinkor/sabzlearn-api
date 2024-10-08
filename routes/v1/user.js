const express = require("express");
const userController = require("./../../controllers/v1/user");
const authMiddleware = require("./../../middlewares/auth");
const isAdminMiddleware = require("./../../middlewares/isAdmin");

const userRouter = express.Router();
userRouter.use(authMiddleware);

userRouter.route("/")
    .get(isAdminMiddleware, userController.getAll)
    .put(userController.updateUser);

userRouter.route("/role").put(isAdminMiddleware, userController.changeRole);
userRouter.route("/ban/:id").post(isAdminMiddleware, userController.banUser);
userRouter.route("/:id").delete(isAdminMiddleware, userController.removeUser);

module.exports = userRouter;