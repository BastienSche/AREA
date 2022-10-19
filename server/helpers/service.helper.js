const uuid = require('uuid').v4;
const AreaError = require('../helpers/error.helper');
const serviceModel = require('../models').Service;

module.exports = {
    get: async function(name) {
        return await serviceModel.findOne({
            where: { name: name },
            attributes: ['name', 'actions', 'reactions']
        });
    },

    getAll: async function() {
        return await serviceModel.findAll({
            attributes: ['name', 'actions', 'reactions']
        });
    },

    create: async function(name, actions, reactions) {
        return await serviceModel.create({
            id: uuid(),
            name: name.toLowerCase(),
            actions: actions,
            reactions: reactions
        });
    },

    remove: async function(id) {

    },

    setupServices: async function() {
        if (!(await this.get('discord'))) {
            await this.create('discord', new Array(
                new Object({
                    name: 'new_message_in_channel',
                    description: 'A new message posted in channel C'
                }),
                new Object({
                    name: 'new_message_by_user',
                    description: 'A new private message is received by U'
                }),
                new Object({
                    name: 'new_message_with_hashtag',
                    description: 'A new message containing a #hashtag is posted'
                })
            ), new Array(
                new Object({
                    name: 'send_message',
                    description: 'New message is posted in channels C'
                })
            ));
            console.log('Discord Service Created !');
        }

        if (!(await this.get('facebook'))) {
            await this.create('facebook', new Array(
                new Object({
                    name: 'new_message_in_group',
                    description: 'A new message posted in group G'
                }),
                new Object({
                    name: 'new_message_with_hashtag',
                    description: 'A new message containing a #hashtag is posted'
                })
            ), new Array(
                new Object({
                    name: 'send_message',
                    description: 'New message is posted at U'
                })
            ));
            console.log('Discord Service Created !');
        }
    }
}