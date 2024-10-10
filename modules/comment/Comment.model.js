const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isAccept: {
        type: Boolean,
        default: false,
    },
    score: {
        type: Number,
        default: 5,
        min: 1,
        max: 5,
    },
    inAnswer: {
        type: Boolean,
        default: false,
    },
    mainCommentID: {
        type: mongoose.Types.ObjectId,
        ref: "Comment"
    },
}, {timestamps: true});

const model = mongoose.model("Comment", schema);

module.exports = model;