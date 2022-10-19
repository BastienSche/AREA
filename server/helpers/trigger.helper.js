const uuid = require('uuid').v4;
const AreaError = require('../helpers/error.helper');
const serviceDiscordHelper = require('./trigger.discord.helper');
const serviceFacebookHelper = require('./trigger.facebook.helper');
const areaHelper = require('./area.helper');
const userHelper = require('./user.helper');

var Triggers = []
var triggerInterval = 5;

class Trigger {
    constructor(areaId, taskFunction, dataTask) {
        this.areaId = areaId;
        this.task = setInterval(async function() {
            var response = await taskFunction(dataTask);
            if (response.success == true) {
                console.log("TASK SUCCESS", dataTask)
                await stopTrigger(areaId);
                var status = await areaHelper.getStatus(areaId);
                if (status === 'reaction')
                    await areaHelper.remove(areaId);
                else {
                    var reaction = await areaHelper.reaction(areaId, response.data);
                    await startTrigger(areaId, reaction);
                }
            }
        }, triggerInterval*1000);
    }

    stop() {
        clearInterval(this.task);
    }
}

async function stopTrigger(areaId) {
    Triggers = Triggers.filter(trigger => {
        if (trigger.areaId == areaId)
            trigger.stop();
        return trigger.areaId != areaId
    });
}

async function startTrigger(areaId, task) {
    var area = await areaHelper.get(areaId);
    var user = await userHelper.get(area.dataValues.owner);
        switch(true) {
            case task.service === 'discord':
                switch(true) {
                    case task.name === 'new_message_in_channel':
                        Triggers.push(new Trigger(areaId, serviceDiscordHelper.triggerNewChannelMessage, task));
                        break;
                    case task.name === 'new_message_by_user':
                        Triggers.push(new Trigger(areaId, serviceDiscordHelper.triggerNewUserMessage, task));
                        break;
                    case task.name === 'send_message':
                        Triggers.push(new Trigger(areaId, serviceDiscordHelper.reactionSendMessage, task));
                        break;
                    default:
                        throw new AreaError('BAD_REQUEST', `Discord task ${task.name} not found.`);
                }
                break;

            default:
                throw new AreaError('BAD_REQUEST', `Service ${task.service} not found.`);
        }
};

module.exports = {
    Triggers: function() {
        return Triggers;
    },

    start: async function(areaId, task) {
        return await startTrigger(areaId, task);
    },

    remove: async function(areaId) {
        await stopTrigger(areaId);
    },

    enableAllTrigger: async function() {
        var area = await areaHelper.getAll();
        for (var i = 0; i < area.length; i++) {
            if (area[i].dataValues.status == 'action')
                this.start(area[i].id, area[i].dataValues.action);
            if (area[i].dataValues.status == 'reaction')
                this.start(area[i].id, area[i].dataValues.reaction);
        }
    }
}