const MONGOOSE = require("mongoose");

const UsersSchema = new MONGOOSE.Schema({
    phoneNo: { type: Number, unique: true, required: true },
    password: { type: String, required: true },
    token: { type: String }
});

module.exports = new MONGOOSE.model("user", UsersSchema);
