const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    title: {
        type: "string",
        max: 200,
        min: 3,
    },
    time: {
        type: "string",
    },
    free: {
        type: "boolean",
    },
};

const check = v.compile(schema);

module.exports = check;