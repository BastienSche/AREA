const AreaError = require('../helpers/error.helper');
const userHelper = require('../helpers/user.helper');
const discordTriggerHelper = require('../helpers/trigger.discord.helper');

module.exports = {
    getAll: async function (req, res, next) {
        try {
            var users = await userHelper.getAll();
            res.status(200).json({
                status: 200, 
                error: false,
                users: users
            });
        } catch(err) {
            return next(err);
        }
    },

    getOne: async function (req, res, next) {
        const { param } = req.params;
        try {
            var user = await userHelper.get(param);
            if (!user)
                throw new AreaError('NOT_FOUND', `User ${param} not found.`);

            res.status(200).json({
                status: 200, 
                error: false,
                user: user.dataValues
            });
        } catch(err) {
            return next(err);
        }
    },

    create: async function (req, res, next) {
        const { lastName, firstName, email, password } = req.body
        try {
            var user = await userHelper.get(email);
            if (user != null)
                throw new AreaError('CONFLICT', "This user already exist.");
            var user = await userHelper.create(firstName, lastName, email, password);
            res.status(201).json({
                status: 201,
                error: false,
                user: user.dataValues
            });   
        } catch(err) {
            return next(err);
        }
    },

    update: async function (req, res, next) {
        const { param } = req.params;
        const body = req.body;
        try {
            await userHelper.update(param, body);

            res.status(200).json({
                status: 200,
                error: false,
                user: body
            });
        } catch(err) {
            return next(err);
        }
    },

    updatePersonalInfo: async function (req, res, next) {
        const { param } = req.params;
        const { lastName, firstName, email } = req.body;
        try {
            var data = new Object();
            if (lastName)
                Object.assign(data, {lastName: lastName});
            if (firstName)
                Object.assign(data, {firstName: firstName});
            if (email)
                Object.assign(data, {email: email});

            if (!Object.keys(data).length)
                throw new AreaError('BAD_REQUEST', `Invalid parameters.`);
            
            var updateData = await userHelper.update(param, data);
            res.status(200).json({
                status: 200,
                error: false,
                user: updateData
            });
        } catch(err) {
            return next(err);
        }
    },

    updatePassword: async function(req, res, next) {
        const { param } = req.params;
        const { passwordOld, passwordCf, password } = req.body;
        try {
            if (password !== passwordCf)
                throw new Error("The passwords are not equals.");
            await new Promise(async(resolve, reject) => {
                var user = await userHelper.get(param);
                user.comparePassword(passwordOld, (error, isMatch) => {
                    if (error || !isMatch)
                        reject(new AreaError('UNAUTHORIZED', `This password does not match with user ${user.email}.`));
                    resolve();
                });
            });
            var updateData = await userHelper.update(param, {
                password: password
            });
            res.status(200).json({
                status: 200,
                error: false,
                user: updateData
            });
        } catch(err) {
            return next(err);
        }
    },

    updateProvider: async function (req, res, next) {
        const { param } = req.params;
        const { provider, data } = req.body;
        try {
            var updateData = new Object();
            switch(true) {
                case provider === 'discord':
                    if (data && data.id)
                        Object.assign(updateData, {id: data.id});
                    if (data && data.email)
                        Object.assign(updateData, {email: data.email});
                    if (data && data.username)
                        Object.assign(updateData, {username: data.username});
                    if (data && data.avatar)
                        Object.assign(updateData, {avatar: data.avatar});
                    if (data && data.accessToken)
                        Object.assign(updateData, {accessToken: data.accessToken});
                    if (data && data.refreshToken)
                        Object.assign(updateData, {refreshToken: data.refreshToken});

                    if (!Object.keys(updateData).length)
                        updateData = null;
                    else
                        Object.assign(updateData, {
                            members: discordTriggerHelper.members(),
                            channels: discordTriggerHelper.channels(),
                        });
                    var updateData = await userHelper.update(param, {discordData: updateData});
                    break;

                case provider === 'facebook':
                    if (data && data.id)
                        Object.assign(updateData, { id: data.id });
                    if (data && data.displayName)
                        Object.assign(updateData, { displayName: data.displayName });
                    if (data && data.profileUrl)
                        Object.assign(updateData, { profileUrl: data.profileUrl });
                    if (data && data.accessToken)
                        Object.assign(updateData, { accessToken: data.accessToken });
                    if (data && data.refreshToken)
                        Object.assign(updateData, { refreshToken: data.refreshToken });
                    if (!Object.keys(updateData).length)
                        updateData = null;
                    updateData = await userHelper.update(param, { facebookData: updateData });
                    break;

                default:
                    throw new AreaError('BAD_REQUEST', `Invalid provider.`);        
            }

            res.status(200).json({
                status: 200,
                error: false,
                user: updateData
            });
        } catch(err) {
            return next(err);
        }
    },
}