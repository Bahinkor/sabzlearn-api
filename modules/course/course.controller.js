const {isValidObjectId} = require("mongoose");
const courseModel = require("./Course.model");
const categoryModel = require("./../category/Category.model");
const sessionModel = require("./../session/Session.model");
const commentModel = require("./../comment/Comment.model");
const userCourseModel = require("./../userCourse/UserCourse.model");
const courseValidator = require("./course.validator");

exports.createCourse = async (req, res) => {
    console.log(req.body);
    try {
        const reqBodyValidationResult = courseValidator(req.body);
        if (reqBodyValidationResult !== true) return res.status(422).json(reqBodyValidationResult);

        const {
            title,
            description,
            support,
            href,
            price,
            status,
            discount,
            categoryID,
        } = req.body;

        const isValidCategoryID = isValidObjectId(categoryID);
        if (!isValidCategoryID) return res.status(422).json({message: "category id not valid"});

        const category = await categoryModel.findOne({_id: categoryID});
        if (!category) return res.status(404).json({message: "category not fund"});

        const isExistHref = await courseModel.findOne({href});
        if (isExistHref) return res.status(422).json({message: "href already exists"});

        const course = await courseModel.create({
            title,
            description,
            support,
            price,
            status,
            discount,
            categoryID,
            href,
            cover: req.file.filename,
            teacher: req.user._id,
        });

        const currentCourse = await courseModel.findOne({_id: course._id}, "-__v -createdAt -updatedAt").populate("teacher", "name").populate("categoryID", "title").lean();

        return res.status(201).json(currentCourse);

    } catch (err) {
        console.log(`create course controller error => ${err}`);
        return res.status(500).json({err});
    }
};

exports.getOne = async (req, res) => {
    try {
        const {href} = req.params;

        const course = await courseModel.findOne({href})
            .populate("categoryID").populate("teacher", "name").lean();

        if (!course) return res.status(404).json({message: "course not found"});

        const sessions = await sessionModel.find({course: course._id}).lean();
        const comments = await commentModel.find({
            course: course._id,
            isAccept: true
        }).populate("creator", "name").sort("-1").limit(10).lean();
        const studentsCount = await userCourseModel.find({course: course._id}).countDocuments();

        return res.json({
            ...course,
            studentsCount,
            sessions,
            comments,
        });

    } catch (err) {
        console.log(`get one, course controller error => ${err}`);
        return res.status(500).json(err);
    }
};

exports.getByCategory = async (req, res) => {
    try {
        const {href} = req.params;

        const category = await categoryModel.findOne({href});
        if (!category) return res.status(404).json({message: "category not found"});

        const courses = await courseModel.find({categoryID: category._id}).lean();

        return res.json(courses);

    } catch (err) {
        console.log(`course controller get by category err => ${err}`);
        return res.status(500).json(err);
    }
};