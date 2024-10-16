const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
    },
    cover: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 3,
    },
    body: {
        type: String,
        required: true,
    },
    href: {
        type: String,
        required: true,
        unique: true,
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {timestamps: true});

const model = mongoose.models.Article || mongoose.model("Article", schema);

module.exports = model;