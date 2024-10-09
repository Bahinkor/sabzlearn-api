const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    title: {
        type: "string",
        trim: true,
        min: 3,
    },
    href: {
        type: "string",
        trim: true,
        min: 3,
    },

    $$strict: true,
};

const check = v.compile(schema);

module.exports = check;