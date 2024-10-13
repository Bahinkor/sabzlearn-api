const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
    },
    answer: {
        type: Boolean,
        default: false,
    },
    body: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const model = mongoose.models.Contact || mongoose.model("Contact", schema);

module.exports = model;