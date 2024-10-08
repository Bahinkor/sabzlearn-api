const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("./../../models/User");
const banUserModel = require("./../../models/BanUser");
const registerValidator = require("./../../validators/register");
const loginValidator = require("./../../validators/login");

exports.register = async (req, res) => {
    try {
        const reqBody = req.body;

        const validationResult = registerValidator(reqBody);
        if (validationResult !== true) return res.status(422).json(validationResult);

        const {name, email, username, password} = reqBody;

        const isUserExist = await userModel.findOne({
            $or: [{email: email.toLowerCase()}, {username: username.toLowerCase()}]
        });
        if (isUserExist) return res.status(409).json({message: "username or email already exists"});

        const isUserBanned = await banUserModel.findOne({email}).lean();
        if (isUserBanned) return res.status(401).json({message: "user is banned"});

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

    } catch (err) {
        console.log(`auth controller register error => ${err}`);
        return res.status(500).json(err);
    }
};

exports.login = async (req, res) => {
    try {
        const reqBody = req.body;
        const validationResult = loginValidator(reqBody);
        if (validationResult !== true) return res.status(422).json(validationResult);

        const {identifier, password} = reqBody;

        const user = await userModel.findOne({
            $or: [{email: identifier.toLowerCase()}, {username: identifier.toLowerCase()}]
        });
        if (!user) return res.status(404).json({message: "user is not found"});

        const isUserBanned = await banUserModel.findOne({email: user.email});
        if (isUserBanned) return res.status(401).json({message: "user is banned"});

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(401).json({message: "identifier or password not valid"});

        const accessToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            algorithm: "HS256",
            expiresIn: "30 day",
        });

        return res.json({accessToken});

    } catch (err) {
        console.log(`login controller error => ${err}`);
        return res.status(500).json(err);
    }
};

exports.getMe = async (req, res) => {
}