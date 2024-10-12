const {isValidObjectId} = require("mongoose");
const commentModel = require("./comment.model");
const courseModel = require("./../course/course.model");
const commentValidator = require("./comment.validator");

exports.create = async (req, res) => {
    try {
        const reqBodyValidationResult = commentValidator(req.body);
        if (reqBodyValidationResult !== true) return res.status(422).json(reqBodyValidationResult);

        const {body, courseHref, score} = req.body;

        const course = await courseModel.findOne({href: courseHref});
        if (!course) return res.status(404).json({message: "Course not found"});

        await commentModel.create({
            body,
            score,
            course: course._id,
            creator: req.user._id,
        });

        return res.status(201).json({
            message: "course created successfully"
        });

    } catch (err) {
        console.log(`create comment controller error => ${err}`);
        return res.status(500).json(err);
    }
};

exports.remove = async (req, res) => {
    try {
        const {id} = req.params;

        const isValidCommentID = isValidObjectId(id);
        if (!isValidCommentID) return res.status(404).json({message: "invalid commentID"});

        const removedComment = await commentModel.findOneAndDelete({_id: id});
        if (!removedComment) return res.status(404).json({message: "comment not found"});

        return res.json({
            message: "comment removed successfully"
        });

    } catch (err) {
        console.log(`remove comment controller error => ${err}`);
        return res.status(500).json(err);
    }
};

exports.accept = async (req, res) => {
    try {
        const {id} = req.params;

        const isValidCommentID = isValidObjectId(id);
        if (!isValidCommentID) return res.status(422).json({message: "invalid commentID"});

        const acceptedComment = await commentModel.findOneAndUpdate({
            _id: id
        }, {
            isAccept: true,
        });

        if (!acceptedComment) return res.status(404).json({message: "comment not found"});

        return res.json({
            message: "comment accepted"
        });

    } catch (err) {
        console.log(`comment controller, accept err => ${err}`);
        return res.status(500).json(err);
    }
};

exports.reject = async (req, res) => {
    try {
        const {id} = req.params;

        const isValidCommentID = isValidObjectId(id);
        if (!isValidCommentID) return res.status(422).json({message: "invalid commentID"});

        const rejectedComment = await commentModel.findOneAndUpdate({
            _id: id
        }, {
            isAccept: false,
        });

        if (!rejectedComment) return res.status(404).json({message: "comment not found"});

        return res.json({
            message: "comment rejected"
        });

    } catch (err) {
        console.log(`comment controller, reject err => ${err}`);
        return res.status(500).json(err);
    }
};

exports.answer = async (req, res) => {
    try {
        const {body} = req.body;
        const {id} = req.params;

        const isValidCommentID = isValidObjectId(id);
        if (!isValidCommentID) return res.status(422).json({message: "invalid commentID"});

        const acceptedComment = await commentModel.findOneAndUpdate({
            _id: id
        }, {
            isAccept: true,
        });

        if (!acceptedComment) return res.status(404).json({message: "comment not found"});

        await commentModel.create({
            body,
            course: acceptedComment.course,
            creator: req.user._id,
            isAccept: true,
            inAnswer: true,
            mainCommentID: acceptedComment._id,
        });

        return res.status(201).json({
            message: "answer successfully"
        });

    } catch (err) {
        console.log(`comment controller answer err => ${err}`);
        return res.status(500).json(err);
    }
};