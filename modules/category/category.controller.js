const categoryModel = require('./category.model');
const categoryValidator = require('./category.validator');
const {isValidObjectId} = require("mongoose");

exports.create = async (req, res) => {
    try {
        const reqBody = req.body;

        const validationResult = categoryValidator(reqBody);
        if (validationResult !== true) return res.status(422).json(validationResult);

        const {title, href} = reqBody;

        const isCategoryExist = await categoryModel.findOne({href}).lean();
        if (isCategoryExist) return res.status(409).json({message: "Category href already exists"});

        await categoryModel.create({
            title,
            href,
        });

        return res.status(201).json({
            message: "Category created successfully"
        });

    } catch (err) {
        console.log(`creating category controller error => ${err}`);
        return res.status(500).json(err.message);
    }
};

exports.getAll = async (req, res) => {
    try {
        const categories = await categoryModel.find({}, "-__v -createdAt -updatedAt").lean();

        return res.json(categories);

    } catch (err) {
        console.log(`user controller getAll err => ${err}`);
        return res.status(500).json(err.message);
    }
};

exports.remove = async (req, res) => {
    try {
        const {id} = req.params;

        const isValidCategoryID = isValidObjectId(id);
        if (!isValidCategoryID) return res.status(409).json({message: "category id not valid"});

        const removedCategory = await categoryModel.findOneAndDelete({_id: id});
        if (!removedCategory) return res.status(404).json({message: "category not found"});

        return res.json({
            message: "category removed successfully"
        });

    } catch (err) {
        console.log(`user controller remove err => ${err}`);
        return res.status(500).json(err.message);
    }
};

exports.update = async (req, res) => {
    try {
        const {id} = req.params;

        const isValidCategoryID = isValidObjectId(id);
        if (!isValidCategoryID) return res.status(409).json({message: "category id not valid"});

        const validationResultReqBody = categoryValidator(req.body);
        if (validationResultReqBody !== true) return res.status(422).json(validationResultReqBody);

        const {title, href} = req.body;

        const category = await categoryModel.findOneAndUpdate({
            _id: id,
        }, {
            title,
            href,
        });

        if (!category) return res.status(404).json({message: "category not found"});

        return res.json({
            message: "category updated successfully"
        });

    } catch (err) {
        console.log(`user controller update err => ${err}`);
        return res.status(500).json(err.message);
    }
};

exports.get = async (req, res) => {
};
