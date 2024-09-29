const service = require("../service/service");
const matchCollection = require("../models/matches");

const authMatch = async (req, res, next) => {
    try {
        let match = await service.findOne(matchCollection, {_id: req.body.matchId});
        if(!match) return res.status(400).send({success: false, error: `Invalid match id ${req.body.matchId}`});
        if(match.matchComplete) return res.status(400).send({success: false, error: `Match has already finished`});
        req.match = match;
        
        next();
    } catch(err) {
        return res.status(500).send({success: false, error: err.message || "Internal server error"});
    }
}

module.exports = authMatch;
