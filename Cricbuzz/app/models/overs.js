const MONGOOSE = require("mongoose");

const OversSchema = new MONGOOSE.Schema({
    matchId: String,
    over: Number,
    team1Runs: Number ,
    team2Runs: Number ,
    team1Wickets: Number ,
    team2Wickets: Number,
    bowlerId1: String,
    bowlerId2: String,
    bowler1Name: String,
    bowler2Name: String,
});

module.exports = new MONGOOSE.model("overs", OversSchema);
