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

exports.getSessionInfos = async (req, res) => {
    try {
        const {courseHref, sessionID} = req.params;

        const course = await courseModel.findOne({href: courseHref}).lean();
        if (!course) return res.status(404).json({message: "course not found"});

        const isValidSessionID = isValidObjectId(sessionID);
        if (!isValidSessionID) return res.status(409).json({message: "session id not valid"});

        const session = await sessionModel.findOne({_id: sessionID}).populate("course", "title").lean();
        if (!session) return res.status(404).json({message: "session not found"});

        const allSessions = await sessionModel.find({course: course._id}).lean();

        return res.json({
            ...session,
            allSessions,
        });

    } catch (err) {
        console.log(`session controller get Session Infos err => ${err}`);
        return res.status(500).json(err);
    }
};

exports.removeSession = async (req, res) => {
    try {
        const {courseHref, sessionID} = req.params;

        const course = await courseModel.findOne({href: courseHref});
        if (!course) return res.status(404).json({message: "course not found"});

        const isValidSessionID = isValidObjectId(sessionID);
        if (!isValidSessionID) return res.status(409).json({message: "session id not valid"});

        if (!course.teacher.equals(req.user._id)) return res.status(403).json({message: "your not access this course"});

        const removedSession = await sessionModel.findOneAndDelete({_id: sessionID});
        if (!removedSession) return res.status(404).json({message: "session not found"});

        return res.json({
            message: "session removed successfully"
        });

    } catch (err) {
        console.log(`session controller remove err => ${err}`);
        return res.status(500).json(err);
    }
};