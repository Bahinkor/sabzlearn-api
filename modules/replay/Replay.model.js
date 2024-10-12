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
}, {timestamps: true});

const model = mongoose.models.Replay || mongoose.model("Replay", schema);

module.exports = model;