const articleModel = require("./Article.model");
const articleValidator = require("./article.validator");
const {isValidObjectId} = require("mongoose");

exports.getAll = async (req, res) => {
    try {
        const articles = await articleModel.find({})
            .populate("creator", "name").lean();

        return res.json(articles);

    } catch (err) {
        console.log(`article controller, get all error: ${err}`);
        return res.status(500).json(err);
    }
};

exports.create = async (req, res) => {
    try {
        const validationResult = articleValidator(req.body);
        if (validationResult !== true) return res.status(422).json(validationResult);

        const {
            title,
            description,
            body,
            href,
        } = req.body;

        const isArticleHrefExist = await articleModel.findOne({href});
        if (isArticleHrefExist) return res.status(422).json({message: "Article href already exists"});

        await articleModel.create({
            title,
            description,
            body,
            href,
            cover: req.file.filename,
            creator: req.user._id,
        });

        return res.status(201).json({
            message: "article created successfully"
        });

    } catch (err) {
        console.log(`article controller, create error: ${err}`);
        return res.status(500).json(err);
    }
};

exports.getOne = async (req, res) => {
    try {
        const {href} = req.params;

        const article = await articleModel.findOne({href})
            .populate("creator", "name").lean();

        if (!article) return res.status(404).json({message: "article not found"});

        return res.json(article);

    } catch (err) {
        console.log(`article controller, get one error: ${err}`);
        return res.status(500).json(err);
    }
};

exports.remove = async (req, res) => {
    try {
        const {id} = req.params;

        const isValidArticleID = isValidObjectId(id);
        if (!isValidArticleID) return res.status(422).json({message: "article ID is not valid"});

        const deletedArticle = await articleModel.findOneAndDelete({_id: id});
        if (!deletedArticle) return res.status(404).json({message: "article not found"});

        return res.json({
            message: "article removed successfully"
        })

    } catch (err) {
        console.log(`article controller, remove error: ${err}`);
        return res.status(500).json(err);
    }
};