const userCourseModel = require("./../userCourse/UserCourse.model");
const {isValidObjectId} = require("mongoose");

exports.getAll = async (req, res) => {
    try {
        const {_id} = req.user;

        const orders = await userCourseModel.find({
            user: _id,
        }, "-__v").populate("course", "title href").populate("user", "name").lean();

        return res.json(orders);

    } catch (err) {
        console.log(`order controller, get all error => ${err}`);
        return res.status(500).json(err);
    }
};

exports.getOne = async (req, res) => {
    try {
        const {id} = req.params;

        const isValidID = isValidObjectId(id);
        if (!isValidID) return res.status(422).json({message: "invalid id"});

        const order = await userCourseModel.findOne({_id: id})
            .populate("user", "name").populate({
                path: "course",
                populate: {
                    path: "teacher categoryID",
                    select: "name title href"
                },
            }).lean();
        if (!order) return res.status(404).json({message: "order not found"});

        return res.json(order);

    } catch (err) {
        console.log(`order controller, get one error => ${err}`);
        return res.status(500).json(err);
    }
};