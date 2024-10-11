const {isValidObjectId} = require("mongoose");
const userCourseModel = require("./UserCourse.model");
const courseModel = require("./../course/Course.model");

exports.register = async (req, res) => {
    try {
        const {id: courseID} = req.params;
        const {price} = req.body;
        const {_id: userID} = req.user;

        const isValidCourseID = isValidObjectId(courseID);
        if (!isValidCourseID) return res.status(422).json({message: "invalid course ID"});

        const course = await courseModel.findOne({_id: courseID});
        if (!course) return res.status(404).json({message: "course not found"});

        const isExistAlreadyRegistered = await userCourseModel.findOne({
            course: courseID,
            user: userID
        });
        if (isExistAlreadyRegistered) return res.status(409).json({message: "user already registered"});

        if (typeof price !== "number" || price < 0) return res.status(422).json({message: "invalid price number"});

        await userCourseModel.create({
            course: courseID,
            user: userID,
            price,
        });

        return res.status(201).json({
            message: "successfully registered"
        });

    } catch (err) {
        console.log(`register filed, user course controller error => ${err}`);
        return res.status(500).json(err);
    }
};