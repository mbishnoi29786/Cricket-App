const jwt = require("jsonwebtoken");
const usersCollection = require("../models/users");
const service = require("../service/service");

const authUpdateScore = async (req, res, next) => {
  try {
    const authToken = req.header("authToken");
    
    if (authToken) {
        const verifyUser = jwt.verify(authToken, process.env.SECRET_KEY);

        const user = await service.findOne(usersCollection, {_id: verifyUser._id, token: authToken});
        if(!user) res.status(401).send({success: false, error: "Authentication failed"});
        else next();
    } else res.status(401).send({success: false, error: "Authentication failed"});
  } catch (error) {
    res.status(401).send({success: false, error: "Authentication failed"});
  }
};

module.exports = authUpdateScore;
