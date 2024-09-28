let usersLogic = {};

const userCollection = require("../models/users");

let service = require("../service/service");
let utils = require("../utils/utils");

// fetch users
usersLogic.fetch = async (req, res) => {
    try {
        let users = await userCollection.aggregate([
            {
                $addFields: {id: "$_id"}
            },
            {
                $project: {"_id": 0, "__v": 0}
            }
        ]);
    
        return res.status(200).send({success: true, users});
    } catch(err) {
        return res.status(500).send({success: false, error: err.message || "Internal server error"});
    }
};

// users signup
usersLogic.signup = async (req, res) => {
    try {
        let findUser = await service.findOne(userCollection, {phoneNo: req.body.phoneNo});
        if(findUser) return res.status(400).send({success: false, error: "User already exists with this phone no"});

        let user = userCollection(req.body);
        utils.generateAuthToken(user);

        await service.save(user);

        return res.status(200).send({success: true, message: "User created", token: user.token});
    } catch(err) {
        return res.status(500).send({success: false, error: err.message || "Internal server error"});
    }
}

// users login
usersLogic.login = async (req, res) => {
    try {
        let findUser = await service.findOne(userCollection, {phoneNo: req.body.phoneNo});
        if(!findUser) return res.status(400).send({success: false, error: "User does not exist"});
        if(!utils.compare(findUser.password, req.body.password)) return res.status(400).send({success: false, error: "Wrong password"});

        utils.generateAuthToken(findUser);
        await service.save(findUser);

        return res.status(200).send({success: true, message: "Logged in", token: findUser.token});
    } catch(err) {
        return res.status(500).send({success: false, error: err.message || "Internal server error"});
    }
}

module.exports = usersLogic;
