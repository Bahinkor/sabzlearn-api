const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    body: {
        type: "string",
        trim: true,
        min: 3,
    },
    courseHref: {
        type: "string",
        trim: true,
    },
    score: {
        type: "number",
        min: 1,
        max: 5,
    },
};

const check = v.compile(schema);

module.exports = check;