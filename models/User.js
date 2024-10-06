const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 100,
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 100,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 30,
    },
    phone: {
        type: String,
        required: true,
        maxlength: 11,
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },
}, {timestamps: true});

const model = mongoose.model("User", schema);

module.exports = model;