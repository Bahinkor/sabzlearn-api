const express = require("express");
const userController = require("./../../controllers/v1/user");

const router = express.Router();

router.post("/ban/:id", userController.banUser);

module.exports = router;