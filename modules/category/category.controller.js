const categoryModel = require('./category.model');
const categoryValidator = require('./category.validator');

exports.create = async (req, res) => {
    try {
        const reqBody = req.body;

        const validationResult = categoryValidator(reqBody);
        if (validationResult !== true) return res.status(422).json(validationResult);

        const {title, href} = reqBody;

        const isCategoryExist = await categoryModel.findOne({href}).lean();
        if (isCategoryExist) return res.status(409).json({message: "Category already exists"});

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
};

exports.update = async (req, res) => {
};

exports.get = async (req, res) => {
};
