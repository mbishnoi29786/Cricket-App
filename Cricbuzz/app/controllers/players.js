let playerLogic = {};

const playerCollection = require("../models/players");

// create new player account
playerLogic.create_new_player = async (req, res) => {
    try {
        let player = playerCollection(req.body);

        await player.save();

        return res.status(200).send({success: true, message: "Player signed up successfully"});
    } catch(err) {
        return res.status(500).send({success: false, error: err.message || "Internal server error"});
    }
};

// fetch all players
playerLogic.fetch_players = async (req, res) => {
    try {
        let all_players = await playerCollection.aggregate([
            {
                $addFields: {id: "$_id"}
            },
            {
                $project: {_id: 0, __v: 0}
            },
        ]);

        return res.status(200).send({success: true, players: all_players});
    } catch(err) {
        return res.status(500).send({success: false, error: err.message || "Internal server error"});
    }
}

module.exports = playerLogic;
