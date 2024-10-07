const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("./../../models/User");
const registerValidator = require("./../../validators/register");

exports.register = async (req, res) => {
    const reqBody = req.body;

    const validationResult = registerValidator(reqBody);
    if (validationResult !== true) return res.status(422).json(validationResult);

    const {name, email, username, password} = reqBody;

    const isUserExist = await userModel.findOne({
        $or: [{email: email.toLowerCase()}, {username: username.toLowerCase()}]
    });
    if (isUserExist) return res.status(409).json({message: "username or email already exists"});

    const countOfUsers = await userModel.countDocuments();
    const hashedPassword = await bcrypt.hashSync(password, 12);

    const user = await userModel.create({
        name,
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: hashedPassword,
        role: countOfUsers > 0 ? "USER" : "ADMIN"
    });

    const userObject = user.toObject();

    const secretProperties = ["password", "__v", "createdAt", "updatedAt"];
    secretProperties.forEach(property => Reflect.deleteProperty(userObject, property));

    const accessToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: "30 day",
    });

    res.status(201).json({
        user: userObject,
        accessToken,
    });
};

exports.login = async (req, res) => {
};

exports.getMe = async (req, res) => {
}