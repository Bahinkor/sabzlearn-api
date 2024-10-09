const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
    },
    href: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    },
}, {timestamps: true});

const model = mongoose.model("Category", schema);

module.exports = model;