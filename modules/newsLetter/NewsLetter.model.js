const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
}, {timestamps: true});

const model = mongoose.models.NewsLetter || mongoose.model("NewsLetter", schema);

module.exports = model;