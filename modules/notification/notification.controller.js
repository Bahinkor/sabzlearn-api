const {isValidObjectId} = require("mongoose");
const userModel = require("./../auth/User.model");
const notificationModel = require("./Notification.model");

exports.create = async (req, res) => {
    try {
        const {admin, message} = req.body;

        const isValidAdminID = isValidObjectId(admin);
        if (!isValidAdminID) return res.status(422).json({message: "Invalid Admin"});

        const adminUser = await userModel.findOne({
            _id: admin,
            role: "ADMIN",
        });
        if (!adminUser) return res.status(404).json({message: "admin is not exist"});

        if (typeof message !== "string") res.status(422).json({message: "invalid message"});

        await notificationModel.create({
            admin,
            message,
        });

        return res.status(201).json({
            message: "successfully created notification",
        });

    } catch (err) {
        console.log(`notification controller, create error => ${err}`);
        return res.status(500).json(err);
    }
};

exports.getAll = async (req, res) => {
    try {
        const notifications = await notificationModel.find({})
            .populate("admin", "-password").lean();

        return res.json(notifications);

    } catch (err) {
        console.log(`notification controller, get all error => ${err}`);
        return res.status(500).json(err);
    }
};

exports.get = async (req, res) => {
    try {
        const {_id} = req.user;

        const notifications = await notificationModel.find({
            admin: _id,
        }).lean();

        return res.json(notifications);

    } catch (err) {
        console.log(`notification controller, get error => ${err}`);
        return res.status(500).json(err);
    }
};

exports.seen = async (req, res) => {
};