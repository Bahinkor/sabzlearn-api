const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    support: {
        type: String,
        required: true,
    },
    href: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["preSale", "completed", "current"],
    },
    discount: {
        type: Number,
        required: true,
    },
    categoryID: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    teacher: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {timestamps: true});

schema.virtual("Session", {
    ref: "Session",
    localField: "_id",
    foreignField: "course",
});

schema.virtual("Comment", {
    ref: "Comment",
    localField: "_id",
    foreignField: "course",
});

const model = mongoose.models.Course || mongoose.model("Course", schema);

module.exports = model;