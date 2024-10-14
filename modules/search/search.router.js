const express = require("express");
const searchController = require("./search.controller");

const searchRouter = express.Router();

searchRouter.route("/:value")
    .get(searchController.search);

module.exports = searchRouter;