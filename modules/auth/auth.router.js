const express = require("express");
const controller = require("./auth.controller.js");

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/me", controller.getMe);

module.exports = router;