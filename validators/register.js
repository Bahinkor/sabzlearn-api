const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    name: {
        type: "string",
        min: 3,
        max: 100,
        trim: true,
    },
    username: {
        type: "string",
        min: 3,
        max: 100,
        trim: true,
    },
    email: {
        type: "email",
        min: 3,
        max: 100,
        trim: true,
    },
    phone: {
        type: "string",
        max: 11,
        trim: true,
    },
    password: {
        type: "string",
        min: 6,
        max: 30,
        trim: true,
    },
    confirmPassword: {
        type: "equal",
        field: "password"
    },

    $$strict: true,
};

const check = v.compile(schema);

module.exports = check;