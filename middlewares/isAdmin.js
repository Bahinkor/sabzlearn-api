module.exports = (req, res, next) => {
    const {user} = req;
    const isAdmin = user.role === "ADMIN";

    if (isAdmin) return next();

    return res.status(401).json({
        message: "Not authorized"
    });
};