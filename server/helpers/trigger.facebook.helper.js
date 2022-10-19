module.exports = {
    triggerNewChannelMessage: async function(data) {
        try {
            console.log('[TRIGGERS] [FACEBOOK] new_message_in_group:');

            // success true pour passer a la reaction si c'est un action / true pour terminer le trigger si c'est une raction
            // success false si c'est une action et que l'event n'est pas trouver
            return ({success: false, data: null});
        } catch(err) {
            console.log('[TRIGGERS] [FACEBOOK] FAIL new_message_in_group: ', err.message);
            return ({success: false, data: err.message});
        }
    },

    triggerNewHashtagMessage: async function(data) {
        try {
            console.log('[TRIGGERS] [FACEBOOK] new_message_with_hashtag:');

            // success true pour passer a la reaction si c'est un action / true pour terminer le trigger si c'est une raction
            // success false si c'est une action et que l'event n'est pas trouver
            return ({success: false, data: null});
        } catch(err) {
            console.log('[TRIGGERS] [FACEBOOK] FAIL new_message_with_hashtag: ', err.message);
            return ({success: false, data: err.message});
        }
    }
}