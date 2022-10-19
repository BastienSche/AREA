const jwt = require('jsonwebtoken');
const tokenModel = require('../models').RefreshToken;

module.exports = {
    get: async function (token) {
        return await tokenModel.findOne({ where: { token: token }});
    },

    verify: async function(refreshToken) {
        if (tokenModel.verifyExpiration(refreshToken) == true) {
            await tokenModel.destroy({ where: { token: requestToken }});
            return true;
        }
        return false;
    },

    decode: async function(token) {
        return await new Promise((resolve) => 
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => resolve(err ? null : decoded))
        );
    },

    sign: function(uuid) {
        return jwt.sign({
            id: uuid
        }, process.env.SECRET_KEY, { expiresIn: "15m" });
    },

    create: async function(uuid) {
        const refreshToken = await tokenModel.createToken(uuid);
        return {accessToken: this.sign(uuid), refreshToken: refreshToken};
    }
}