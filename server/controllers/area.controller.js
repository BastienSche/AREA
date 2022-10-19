const areaHelper = require('../helpers/area.helper');
const AreaError = require('../helpers/error.helper');
const serviceHelper = require('../helpers/service.helper');
const triggerHelper = require('../helpers/trigger.helper');
const userHelper = require('../helpers/user.helper');

module.exports = {
    getAllServices: async function(req, res, next) {
        try {
            var services = await serviceHelper.getAll();
            var actions = [], reactions = [];
            var y = 0;
            for (var i = 0; i < services.length; i++) {
                for (y = 0; y < services[i].actions.length; y++)
                    actions = [...actions, {
                        ...services[i].actions[y],
                        service: services[i].name,
                    }]
                for (y = 0; y < services[i].reactions.length; y++)
                    reactions = [...reactions, {
                        ...services[i].reactions[y],
                        service: services[i].name
                    }]
            }
            res.status(200).json({
                status: 200,
                error: false,
                actions: actions,
                reactions: reactions
            });   
        } catch(err) {
            return next(err);
        }
    },

    getAllTriggers: async function(req, res, next) {
        try {
            res.status(200).json({
                status: 200,
                error: false,
                services: triggerHelper.Triggers()
            });   
        } catch(err) {
            return next(err);
        }
    },

    getSelfArea: async function(req, res, next) {
        const { param } = req.params;
        try {
            var areas = await areaHelper.getSelf(param);
            res.status(201).json({
                status: 200,
                error: false,
                area: areas
            });   
        } catch(err) {
            return next(err);
        }
    },

    create: async function(req, res, next) {
        const { param } = req.params;
        const { title, action, reaction } = req.body
        try {
            if (!title || !action || !action.service || !action.name 
             || !reaction || !reaction.service || !reaction.name)
                throw new AreaError('BAD_REQUEST', "Invalid parameters.");

            var user = await userHelper.get(param);
            if (!user)
                throw new AreaError('NOT_FOUND', `User ${param} not found.`);
            
            var area = await areaHelper.create(user.dataValues, title, {
                service: action.service,
                name: action.name,
                description: action.description
            }, {
                service: reaction.service,
                name: reaction.name,
                description: reaction.description
            });

            res.status(201).json({
                status: 201,
                error: false,
                area: area.dataValues
            });   
        } catch(err) {
            return next(err);
        }
    },

    start: async function(req, res, next) {
        const { param, areaId } = req.params;
        const { actionParam, reactionParam } = req.body;
        try { 
            if (!actionParam)
                throw new AreaError('BAD_REQUEST', `Parameter for action is require.`);
            await triggerHelper.start(areaId, await areaHelper.start(areaId, actionParam, reactionParam));
            res.status(200).json({
                status: 200,
                error: false
            });
        } catch(err) {
            return next(err);
        }
    },

    remove: async function(req, res, next) {
        const { param } = req.params;
        const { id } = req.body;
        try {
            if (!id)
                throw new AreaError('BAD_REQUEST', 'Parameter id missing.')
            var user = await userHelper.get(param);
            if (!user)
                throw new AreaError('NOT_FOUND', `User ${param} not found.`);
            await areaHelper.remove(id);
            await triggerHelper.remove(id);
            res.status(200).json({
                status: 200,
                error: false
            });
        } catch(err) {
            return next(err);
        }
    }
}