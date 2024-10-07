const {isValidObjectId} = require("mongoose");
const userModel = require("./../../models/User");
const banUserModel = require("./../../models/BanUser");

exports.banUser = async (req, res) => {
    const {id} = req.params;

    const isValidID = isValidObjectId(id);
    if (!isValidID) return res.status(422).json({message: "invalid user ID"});

    const user = await userModel.findOne({
        _id: id
    }).lean();
    if (!user) return res.status(404).json({message: "user is not found"});

    await banUserModel.create({
        email: user.email
    });

    res.status(201).json({
        message: "user banned successfully"
    });
};