const jsonWebToken = require("jsonwebtoken");
let utils = {};

utils.compare = (first, second) => {
    return first == second;
}

utils.generateAuthToken = (object) => {
    try {
        object.token = jsonWebToken.sign({ _id: object._id.toString()}, process.env.SECRET_KEY);
        return;
    } catch(err) {
        console.log(err);
    }
}

module.exports = utils;
