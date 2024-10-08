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

    $$strict: true,
};

const check = v.compile(schema);

module.exports = check;