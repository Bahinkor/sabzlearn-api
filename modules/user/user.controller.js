const {isValidObjectId} = require("mongoose");
const userModel = require("../auth/User.model");
const banUserModel = require("./BanUser.model");
const updateUserValidator = require("./updateUser.validator");

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

exports.removeUser = async (req, res) => {
    try {
        const {id} = req.params;

        const isValidUserID = isValidObjectId(id);
        if (!isValidUserID) return res.status(409).json({message: "invalid user ID"});

        const removedUser = await userModel.findOneAndDelete({_id: id});
        if (!removedUser) return res.status(404).json({message: "user not found"});

        return res.json({
            message: "user removed successfully"
        });
    } catch (err) {
        console.log(`remove user controller error => ${err}`);
        return res.status(500).json(err);
    }
};

exports.changeRole = async (req, res) => {
    try {
        const {id} = req.body;

        const isValidUserID = isValidObjectId(id);
        if (!isValidUserID) return res.status(409).json({message: "invalid user ID"});

        const user = await userModel.findOne({_id: id}).lean();
        if (!user) return res.status(404).json({message: "user not found"});

        const isUserBanned = await banUserModel.findOne({email: user.email});
        if (isUserBanned) return res.status(409).json({message: "this user is banned"});

        const newRole = user.role === "ADMIN" ? "USER" : "ADMIN";

        await userModel.findOneAndUpdate({
            _id: id
        }, {
            role: newRole
        });

        return res.json({
            message: "changed user role successfully"
        });

    } catch (err) {
        console.log(`change role user controller error => ${err}`);
        return res.status(500).json(err);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const reqBody = req.body;

        const validationResult = updateUserValidator(reqBody);
        if (validationResult !== true) return res.status(422).json(validationResult);

        const {name, email, username} = reqBody;
        const {_id} = req.user;

        const updatedUser = await userModel.findOneAndUpdate({_id}, {
            name,
            username: username.toLowerCase(),
            email: email.toLowerCase(),
        }).select("-password -__v -createdAt -updatedAt").lean();

        return res.json(updatedUser);

    } catch (err) {
        console.log(`user controller update user error => ${err}`);
        return res.status(500).json(err);
    }
};