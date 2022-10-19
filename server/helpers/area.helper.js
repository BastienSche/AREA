const uuid = require('uuid').v4;
const AreaError = require('../helpers/error.helper');
const areaModel = require('../models').Area;

module.exports = {
    getStatus: async function(id) {
        var area = await this.get(id);
        return area.status;
    },

    get: async function(id) {
        return await areaModel.findOne({
            where: { id: id },
            attributes: ['id', 'title', 'owner', 'status', 'action', 'reaction']
        });
    },

    getSelf: async function(owner) {
        return await areaModel.findAll({
            where: { owner: owner },
            attributes: ['id', 'title', 'owner', 'status', 'action', 'reaction']
        });
    },

    getAll: async function() {
        return await areaModel.findAll({
            attributes: ['id', 'title', 'owner', 'status', 'action', 'reaction']
        });
    },

    create: async function(user, title, action, reaction) {
       
        if ((action.service == 'discord' || reaction.service == 'discord') && !user.discordData)
            throw new AreaError('UNAUTHORIZED', 'Your are not connected to your Discord account.');
        
        if ((action.service == 'facebook' || reaction.service == 'facebook') && !user.facebookData)
            throw new AreaError('UNAUTHORIZED', 'Your are not connected to your Facebook account.');

        var id = uuid();
        var area = await areaModel.create({
            id: id,
            title: title,
            owner: user.id,
            status: 'unconfigured',
            action: action,
            reaction: reaction
        });
        return area;
    },

    start: async function(areaId, actionParam, reactionParam) {
        var area = await areaModel.findOne({ where: {id: areaId} });
        if (!area)
            throw new AreaError('NOT_FOUND', `Any area with id ${areaId} was found.`);
        if (area.status != "unconfigured")
            throw new AreaError('NOT_FOUND', `This area has already configured.`);
        await area.update({
            status: "action",
            action: {
                ...area.action,
                param: actionParam
            },
            reaction: {
                ...area.reaction,
                param: reactionParam
            }
        });
        await area.save();
        return area.action;
    },

    reaction: async function(areaId, data) {
        console.log(areaId, data)
        var area = await areaModel.findOne({ where: {id: areaId} });
        await area.update({
            status: 'reaction', 
            reaction: {
                ...area.dataValues.reaction,
                collected: data
            }
        });
        await area.save();
        return area.dataValues.reaction;
    },

    remove: async function(id) {
        await areaModel.destroy({
            where: { 
                id: id
            }
        });
    }
}