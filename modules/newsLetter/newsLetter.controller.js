const newsLetterModel = require("./NewsLetter.model");
const newsLetterValidator = require("./newsLetter.validator");

exports.getAll = async (req, res) => {
    try {
        const newsLetters = await newsLetterModel.find({}).lean();

        return res.json(newsLetters);

    } catch (err) {
        console.log(`newsLetter controller, get all error => ${err}`);
        return res.status(500).json(err);
    }
};

exports.create = async (req, res) => {
    try {
        const validationResult = newsLetterValidator(req.body);
        if (validationResult !== true) return res.status(422).json(validationResult);

        const {email} = req.body;

        const newsLetter = await newsLetterModel.findOne({email});
        if (newsLetter) return res.status(409).json({message: "this email already exists"});

        await newsLetterModel.create({
            email,
        });

        return res.status(201).json({
            message: "newsLetter created successfully",
        });

    } catch (err) {
        console.log(`newsLetter controller, create error => ${err}`);
        return res.status(500).json(err);
    }
};