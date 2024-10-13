const {isValidObjectId} = require("mongoose");
const nodemailer = require("nodemailer");
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
    try {
        const {id} = req.params;

        const isValidContactID = isValidObjectId(id);
        if (!isValidContactID) return res.status(422).json({message: "invalid contactID"});

        const deletedContact = await contactModel.findOneAndDelete({_id: id});
        if (!deletedContact) return res.status(404).json({message: "contact not found"});

        return res.json({
            message: "Contact removed successfully"
        });

    } catch (err) {
        console.log(`contact controller, remove error => ${err}`);
        return res.status(500).json(err);
    }
};

exports.answer = async (req, res) => {
    try {
        const {id} = req.params;
        const {answer} = req.body;

        const isValidContactID = isValidObjectId(id);
        if (!isValidContactID) return res.status(422).json({message: "invalid contactID"});

        if (!answer) return res.status(422).json({message: "invalid answer"});

        const contact = await contactModel.findOne({_id: id});
        if (!contact) return res.status(404).json({message: "contact not found"});

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: contact.email,
            subject: "this is a test email",
            text: answer,
        };

        await transporter.sendMail(mailOptions, async (err, info) => {
            if (err) {
                console.log(`nodemailer error => ${err}`);
                return res.status(500).json(err);
            }

            await contactModel.findOneAndUpdate({
                _id: contact._id
            }, {
                answer: true,
            });

            return res.json({
                message: "email send successfully",
            });
        });

    } catch (err) {
        console.log(`contact controller, answer error => ${err}`);
        return res.status(500).json(err);
    }
};
