const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
}, {timestamps: true});

const model = mongoose.model("BanUser", schema);

module.exports = model;