const contactModel = require("./Contact.model");
const contactValidator = require("./contact.validator");

exports.getAll = async (req, res) => {
    try {
        const contacts = await contactModel.find({}).lean();

        return res.json(contacts);

    } catch (err) {
        console.log(`contact controller, get all error => ${err}`);
        return res.status(500).json(err);
    }
};

exports.create = async (req, res) => {
    try {
        const validationResult = await contactValidator(req.body);
        if (validationResult !== true) return res.status(422).json(validationResult);

        const {name, email, body} = req.body;

        await contactModel.create({
            name,
            email,
            body,
        });

        return res.status(201).json({
            message: "Contact created successfully"
        });

    } catch (err) {
        console.log(`contact controller, create error => ${err}`);
        return res.status(500).json(err);
    }
};

exports.remove = async (req, res) => {
};

exports.answer = async (req, res) => {
};
