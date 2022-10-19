const AreaError = require('./error.helper');
const userHelper = require('./user.helper');

module.exports = {
    signLocal: async function(email, password) {
        user = await userHelper.get(email);
        if (!user)
            throw new AreaError('NOT_FOUND', "Invalid email adresse, user not found.");

        await new Promise((resolve, reject) => {
            user.comparePassword(password, (error, isMatch) => {
                if (error || !isMatch) {
                    reject(new AreaError('UNAUTHORIZED', `This password does not match with user ${email}.`));
                }
                resolve();
            });
        });
        return user.id;
    },

    signDiscord: async function(id) {
        user = await userHelper.get(id);
        if (!user || !user.dataValues.discordData || user.dataValues.discordData.id != id)
            throw new AreaError('UNAUTHORIZED', "Any account was found with this discord account.");
        return user.id;
    },

    signFacebook: async function(id) {
        user = await userHelper.get(id);
        if (!user || !user.dataValues.facebookData || user.dataValues.facebookData.id != id)
            throw new AreaError('UNAUTHORIZED', "Any account was found with this Facebook account.");
        return user.id;
    }
}