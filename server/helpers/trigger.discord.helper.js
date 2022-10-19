const { TextChannel, Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES] });

var messages = [];

var members = null;
var channels = null;

client.once('ready', async() => {
	console.log('Ready!');
    const guild = client.guilds.cache.map((guild) => guild)[0];
    channels = (await guild.channels.fetch()).filter(c => c.type === "GUILD_TEXT");
    members = await guild.members.fetch();
});


client.on('messageCreate', (message) => {
    messages.push({
        channel: message.channelId,
        content: message.content,
        author: message.author.id
    })
});

client.login(process.env.DISCORD_TOKEN);


module.exports = {

    members: function() {
        return members;
    },

    channels: function() {
        return channels.map(channel => {
            return {
                id: channel.id,
                name: channel.name
            }
        });
    },

    triggerNewChannelMessage: async function(task) {
        try {
            console.log('[TRIGGERS] [DISCORD] new_message_in_channel: ', task);
            var finded = messages.filter(el => el.channel == task.param);
            if (finded.length >= 1) {
                messages = messages.filter(el => el.channel =! task.param);
                return ({success: true, data: {content: finded[0].content}});
            }
            return ({success: false, data: null});
        } catch(err) {
            console.log('[TRIGGERS] [DISCORD] FAIL new_message_in_channel: ', err.message);
            return ({success: false, data: err.message});
        }
    },

    triggerNewUserMessage: async function(task) {
        try {
            console.log('[TRIGGERS] [DISCORD] new_message_by_user: ', task);
            var finded = messages.filter(el => el.author == task.param);
            if (finded && finded.length >= 1) {
                console.log(finded);
                messages = messages.filter(el => el.author =! task.param);
                return ({success: true, data: {content: finded[0].content}});
            }
            return ({success: false, data: null});
        } catch(err) {
            console.log('[TRIGGERS] [DISCORD] FAIL new_message_by_user: ', err.message);
            return ({success: false, data: err.message});
        }
    },

    reactionSendMessage: async function(task) {
        try {
            console.log('[REACTION] [DISCORD] send_message: ', task.param.target, task.param.content, task.collected);
            var channel = channels.filter(ch => ch.id == task.param.target).map((channel) => channel)[0];
            channel.send(`${task.param.content}: ${task.collected.content}`)
            return ({success: true, data: null});
        } catch(err) {
            console.log('[REACTION] [DISCORD] FAIL send_message: ', err.message);
            return ({success: false, data: err.message});
        }
    }
}