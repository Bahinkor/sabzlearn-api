const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    percent: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    max: {
        type: Number,
        required: true,
        min: 1,
    },
    user: {
        type: Number,
        default: 0,
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {timestamps: true});

const model = mongoose.models.Discount || mongoose.model("Discount", schema);

module.exports = model;