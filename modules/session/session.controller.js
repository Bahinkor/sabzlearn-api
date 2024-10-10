const {isValidObjectId} = require("mongoose");
const sessionModel = require("./Session.model");
const courseModel = require("./../course/Course.model");
const sessionValidator = require("./session.validator");

exports.createSession = async (req, res) => {
    try {
        const {id} = req.params;

        const isValidCourseID = isValidObjectId(id);
        if (!isValidCourseID) return res.status(422).json({message: "invalid courseID"});

        const isCourseExist = await courseModel.findOne({_id: id});
        if (!isCourseExist) return res.status(404).json({message: "course not found"});

        const teacherID = isCourseExist.teacher;
        const userID = req.user._id;
        if (!teacherID.equals(userID)) return res.status(403).json({message: "your not access this course"});

        const reqBodyValidationResult = sessionValidator(req.body);
        if (reqBodyValidationResult !== true) return res.status(422).json(reqBodyValidationResult);

        const {title, time, free} = req.body;

        const session = await sessionModel.create({
            title,
            time,
            free,
            video: req.file.filename,
            course: isCourseExist._id
        });

        return res.status(201).json(session);

    } catch (err) {
        console.log(`session controller create session err => ${err}`);
        return res.status(500).json(err);
    }
};

exports.getAll = async (req, res) => {
    try {
        const sessions = await sessionModel.find({}, "-__v").populate("course", "title").lean();

        return res.json(sessions);

    } catch (err) {
        console.log(`session controller getAll err => ${err}`);
        return res.status(500).json(err);
    }
};