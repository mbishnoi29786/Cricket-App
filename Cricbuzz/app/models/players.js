const MONGOOSE = require("mongoose");

const PlayersSchema = new MONGOOSE.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    jerseyNo: {
        type: Number,
        required: true,
    },
    wickets: {
        type: Number,
        required: true,
        default: 0,
    },
    runs: {
        type: Number,
        required: true,
        default: 0,
    },
    noOfMatches: {
        type: Number,
        required: true,
        default: 0,
    },
    type: {
        type: String,
        required: true,
    },
    team: {
        type: String,
        required: true,
    }
});

module.exports = new MONGOOSE.model("player", PlayersSchema);
