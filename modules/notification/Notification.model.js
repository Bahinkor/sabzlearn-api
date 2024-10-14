const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    admin: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isSeen: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});

const model = mongoose.models.Notification || mongoose.model("Notification", schema);

module.exports = model;