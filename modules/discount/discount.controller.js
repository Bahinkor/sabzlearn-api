const courseModel = require("./../course/Course.model");

exports.getAll = async (req, res) => {
};

exports.create = async (req, res) => {
};

exports.setOneAll = async (req, res) => {
    try {
        const {discount} = req.body;

        if (typeof discount !== "number" || discount < 1 || discount > 100) return res.status(422).json({message: "discount not valid"});

        await courseModel.updateMany({}, {
            discount,
        });

        return res.json({
            message: "set all discount successfully",
        });

    } catch (err) {
        console.log(`discount controller, set one all error => ${err}`);
        return res.status(500).json(err);
    }
};

exports.getOne = async (req, res) => {
};

exports.remove = async (req, res) => {
};