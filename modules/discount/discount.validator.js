const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    code: {
        type: "string",
    },
    percent: {
        type: "number",
        min: 1,
        max: 100,
    },
    course: {
        type: "string",
    },
    max: {
        type: "number",
        min: 1,
    },

    $$strict: true,
};

const check = v.compile(schema);

module.exports = check;