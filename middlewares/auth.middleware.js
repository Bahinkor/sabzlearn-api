const jwt = require("jsonwebtoken");
const userModel = require("../modules/auth/User.model");

module.exports = async (req, res, next) => {
    const bearerToken = req.header("Authorization");
    const bearerArray = bearerToken?.split(" ");

    if (bearerArray?.length !== 2) return res.status(403).json({message: "Not authorized"});

    const accessToken = bearerArray[1];

    try {
        const verifyToken = jwt.verify(accessToken, process.env.JWT_SECRET);
        const {id} = verifyToken;

        req.user = await userModel.findById(id, "-password -__v -createdAt -updatedAt").lean();
        next();

    } catch (err) {
        console.log(`auth middleware err => ${err}`);
        return res.status(401).json(err);
    }
};