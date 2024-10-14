const courseModel = require("./../course/Course.model");

exports.search = async (req, res) => {
    try {
        const {value} = req.params;
        const regexPattern = new RegExp(`.*${value}.*`, "ig");

        const courses = await courseModel.find({
            title: {
                $regex: regexPattern,
            },
        }).lean();

        return res.json(courses);

    } catch (err) {
        console.log(`search controller, search error => ${err}`);
        return res.status(500).json(err);
    }
};