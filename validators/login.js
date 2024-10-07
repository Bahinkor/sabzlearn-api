const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    identifier: {
        type: "string",
        min: 3,
        max: 100,
        trim: true,
    },
    password: {
        type: "string",
        min: 6,
        max: 30,
        trim: true,
    },

    $$strict: true,
};

const check = v.compile(schema);

module.exports = check;