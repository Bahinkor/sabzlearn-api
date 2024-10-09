const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    title: {
        type: "string",
        trim: true,
        min: 3,
    },
    description: {
        type: "string",
        trim: true,
    },
    support: {
        type: "string",
        trim: true,
    },
    href: {
        type: "string",
        trim: true,
    },
    price: {
        type: "string",
    },
    status: {
        type: "string",
        trim: true,
    },
    discount: {
        type: "string",
    },
    categoryID: {
        type: "any",
    },
};

const check = v.compile(schema);

module.exports = check;