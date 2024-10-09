const {isValidObjectId} = require("mongoose");
const courseModel = require("./Course.model");
const categoryModel = require("./../category/Category.model");
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