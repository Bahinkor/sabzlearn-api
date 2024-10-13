const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    name: {
        type: "string",
        min: 3,
    },
    email: {
        type: "email"
    },
    body: {
        type: "string",
        min: 3,
    },

    $$strict: true,
};

const check = v.compile(schema);

module.exports = check;