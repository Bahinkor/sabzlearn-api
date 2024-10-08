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

    const {email} = user;
    const isUserExist = await banUserModel.findOne({email}).lean();
    if (isUserExist) return res.status(409).json({message: "The user is currently banned"});

    await banUserModel.create({email});

    res.status(201).json({
        message: "user banned successfully"
    });
};

exports.getAll = async (req, res) => {
    try {
        const users = await userModel.find({}, "-password -__v").lean();

        return res.json(users);

    } catch (err) {
        console.log(`get all user controller => ${err}`);
        return res.status(500).json(err);
    }
};