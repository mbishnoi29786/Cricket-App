const CryptoJS = require("crypto-js");

let authEncrypt = (req, res, next) => {
    try {
        var decrypted = CryptoJS.AES.decrypt(req.body.payload, "4v0wFM10&XZ7");
        req.body = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
        
        next();
    } catch(err) {
        return res.status(400).send({success: false, error: err.message || "Internal server error"});
    }
}

module.exports = authEncrypt;
