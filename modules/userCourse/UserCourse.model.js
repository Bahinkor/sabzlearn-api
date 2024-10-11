const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
});

const model = mongoose.models.CourseUser || mongoose.model("CourseUser", schema);

module.exports = model;