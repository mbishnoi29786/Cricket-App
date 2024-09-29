const MONGOOSE = require("mongoose");

const MatchesSchema = new MONGOOSE.Schema({
    team1Name: { type: String, required: true },
    team1Players: [
        {
            playerId: { type: String, required: true },
            playerName: { type: String, required: true },
            playerRuns: { type: Number, required: true, default: 0 },
            playerWickets: { type: Number, required: true, default: 0 },
            ballsFaced: { type: Number, required: true, default: 0 },
            runsOnBowling: { type: Number, required: true, default: 0 },
            ballsBowled: { type: Number, required: true, default: 0 },
            alreadyBatted: { type: Boolean, required: true, default: false }
        },
    ],
    team2Name: { type: String, required: true,},
    team2Players: [
        {
            playerId: { type: String, required: true },
            playerName: { type: String,required: true },
            playerRuns: { type: Number, required: true, default: 0 },
            playerWickets: { type: Number, required: true, default: 0 },
            ballsFaced: { type: Number, required: true, default: 0 },
            runsOnBowling: { type: Number, required: true, default: 0 },
            ballsBowled: { type: Number, required: true, default: 0 },
            alreadyBatted: { type: Boolean, required: true, default: false }
        },
    ],
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    team1Runs: { type: Number, default: 0 },
    team2Runs: { type: Number, default: 0 },
    scoreCardTeam1: [
        {
            playerOnStrikeId: String,
            playerOnNonStrikeId: String,
            runs: Number,
            overNo: Number,
            ballNo: Number,
            validity: String,
            bowlerId: String,
            freeHit: { type: Boolean, default: false },
            wicketType: String,
            wicketPlayerId: String,
            byes: { type: Boolean, default: false }
        },
    ],
    scoreCardTeam2: [
        {
            playerOnStrikeId: String,
            playerOnNonStrikeId: String,
            runs: Number,
            overNo: Number,
            ballNo: Number,
            validity: String,
            bowlerId: String,
            freeHit: { type: Boolean, default: false },
            wicketType: String,
            wicketPlayerId: String,
            byes: { type: Boolean, default: false }
        },
    ],
    team1FallOfWickets: [ String ],
    team2FallOfWickets: [ String ],
    firstTeamBattingComplete: { type: Boolean, default: false },
    matchComplete: { type: Boolean, default: false },
    totalOvers: Number,
    firstBattingTeam: Number
});

MatchesSchema.index({ date: -1});

module.exports = new MONGOOSE.model("match", MatchesSchema);
