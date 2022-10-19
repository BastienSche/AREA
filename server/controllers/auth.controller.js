const tokenHelper = require('../helpers/token.helper');
const authHelper = require('../helpers/auth.helper');
const AreaError = require('../helpers/error.helper');

module.exports = {
    login: async function (req, res, next) {
        try {
            const { provider, email, password, id } = req.body;
            var userId;

            switch(true) {
                case provider === 'discord':
                    if (!id)
                        return next(new AreaError('BAD_REQUEST', 'Missing argument for signup.'));
                    userId = await authHelper.signDiscord(id);
                    break;

                case provider === 'facebook':
                    if (!id)
                        return next(new AreaError('BAD_REQUEST', 'Missing argument for signup.'));
                    userId = await authHelper.signFacebook(id);
                    break;

                case provider === 'local':
                    if (!email)
                        return next(new AreaError('BAD_REQUEST', 'Your email is require for signup.'));
                    if (!password)
                        return next(new AreaError('BAD_REQUEST', 'Your password is require for signup.'));
                    userId = await authHelper.signLocal(email, password);
                    break;
                
                default:
                    return next(new AreaError('BAD_REQUEST', "Invalid provider."));
            }
            const tokens = await tokenHelper.create(userId);
            res.status(200).json({
                status: 200,
                error: false, 
                session: {
                    accessToken: tokens.accessToken, 
                    refreshToken: tokens.refreshToken, 
                    id: userId
                }
            });
        } catch(err) {
            return next(err);
        }
    },

    refreshToken: async(req, res, next) => {
        try {
            const { refreshToken : requestToken } = req.body;
            if (!requestToken)
                return next(new AreaError('UNAUTHORIZED', 'Refresh token is missing.'));
            
            var refreshToken = await tokenHelper.get(requestToken);

            if (!refreshToken)
                return next(new AreaError('UNAUTHORIZED', "Refresh token not found."));
            
            if (await tokenHelper.verify(refreshToken.dataValues) == true)
                return next(new AreaError('UNAUTHORIZED', 'Refresh token was expired or invalid.'));

            res.status(200).json({
                status: 200,
                error: false,
                accessToken: tokenHelper.sign(refreshToken.dataValues.owner)
            });
        } catch(err) {
            return next(err);
        }
    }
}