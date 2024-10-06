const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    name: {
        type: "string",
        min: 3,
        max: 100
    },
    username: {
        type: "string",
        min: 3,
        max: 100
    },
    email: {
        type: "email",
        min: 3,
        max: 100
    },
    phone: {
        type: "string",
        max: 11,
    },
    password: {
        type: "string",
        min: 6,
        max: 30,
    },
    confirmPassword: {
        type: "equal",
        field: "password"
    },

    $$strict: true,
};

const check = v.compile(schema);

module.exports = check;