var LocalStrategy = require('passport-local').Strategy;
var DiscordStrategy = require('passport-discord').Strategy;
var FacebookStrategy = require('passport-facebook');
const passport = require('passport');
const apiHelper = require('./api.helper');

module.exports = {
    passportAuthLocal: async(req, res) => {
        await new Promise((resolve, reject) => {
            passport.authenticate('local', async(err, session, info) => {
                console.log(session)
                if (err || !session)
                    reject(new Error(err ? err.message : info.message));
                
                await req.login(session, function(error) {
                    if (error)
                        reject(new Error(error.message));
                    resolve()
                });
            })(req, res);
        });
    },

    passportAuthDiscord: async(req, res) => {
        await new Promise((resolve, reject) => {
            passport.authenticate('discord', async(err, session, info) => {
                if (err || !session) {
                    if (await req.isAuthenticated() && !req.session.passport.user.discordData) {
                        var json = await apiHelper.request(`/users/${req.session.passport.user.id}/updateProvider`, 'PATCH', req.session.passport.user.accessToken, {
                            provider: 'discord',
                            data: err.discordData
                        });
                        json = await apiHelper.request('auth/login', 'POST', '', {
                            provider: 'discord',
                            id: err.discordData.id
                        });
                        session = json.session;
                        resolve();
                    } else
                        reject(new Error(err ? err.message : info.message));
                } else 
                    await req.login(session, function(error) {
                        if (error)
                            reject(new Error(error.message));
                        resolve();
                    });
            })(req, res);
        });
    },

    passportAuthFacebook: async(req, res) => {
        await new Promise((resolve, reject) => {
            passport.authenticate('facebook', async(err, session, info) => {
                if (err || !session) {
                    if (await req.isAuthenticated() && !req.session.passport.user.facebookData) {
                        var json = await apiHelper.request(`/users/${req.session.passport.user.id}/updateProvider`, 'PATCH', req.session.passport.user.accessToken, {
                            provider: 'facebook',
                            data: err.facebookData
                        });
                        json = await apiHelper.request('auth/login', 'POST', '', {
                            provider: 'facebook',
                            id: err.facebookData.id
                        });
                        session = json.session;
                        resolve();
                    } else
                        reject(new Error(err ? err.message : info.message));
                } else
                    await req.login(session, function(error) {
                        if (error)
                            reject(new Error(error.message));
                        resolve();
                    });
            })(req, res);
        });
    },

    passportConfigure: function(passport) {
        passport.serializeUser(async (user, done) => {
            try {
                if (!user)
                    throw new Error('Passport empty user session');
                done(null, user);
            } catch(err) {
                console.log("+ PASSPORT SERIALIZE FAIL:", err);
                done({message: err.message}, null);
            }
        });

        passport.deserializeUser(async(user, done) => {
            try {
                Object.assign(user, await apiHelper.getUserData(user));   
                done(null, user);
            } catch(err) {
                console.log("+ PASSPORT DESERIALIZE FAIL:", err);
                done({message: err.message}, false);
            }
        });

        passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, async(email, password, done) => {
            try {
                var json = await apiHelper.request('auth/login', 'POST', '', {
                    provider: 'local',
                    email: email,
                    password: password
                })
                
                if (json.error)
                    throw new Error(json.message)
                done(null, {
                    ...json.session
                });
            } catch(err) {
                console.log("PASSPORT Local: ", err.message)
                return done ({message: err.message}, false)
            }
        }));

        passport.use(new DiscordStrategy({
            clientID: process.env.DISCORD_ID,
            clientSecret: process.env.DISCORD_SECRET,
            callbackURL: 'http://localhost:8081/oauth/discord/callback',
            scope: ['identify', 'email', 'gdm.join', 'guilds', 'rpc', 'guilds.join', 'guilds.members.read', 'messages.read']
        }, async(accessToken, refreshToken, profile, done) => {    
            try {
                console.log(profile)
                var json = await apiHelper.request('auth/login', 'POST', '', {
                    provider: 'discord',
                    id: profile.id
                });
                return done(null, {
                    ...json.session
                });
            } catch(err) {
                console.log("PASSPORT Discord: ", err.message);
                return done ({ 
                    message: err.message,
                    discordData: {
                        id: profile.id,
                        email: profile.email,
                        avatar: profile.avatar,
                        username: profile.username + '#' + profile.discriminator,
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    }
                }, null);
            }
        }));

        passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: 'https://localhost:8081/oauth/facebook/callback'
        }, async(accessToken, refreshToken, profile, done) => {
            try {
                console.log(profile)
                var json = await apiHelper.request('auth/login', 'POST', '', {
                    provider: 'facebook',
                    id: profile.id
                });
                return done(null, {
                    ...json.session
                });
            } catch (err) {
                console.log("PASSPORT Facebook: ", err.message);
                return done({
                    message: err.message,
                    facebookData: {
                        id: profile.id,
                        avatar: profile.profileUrl,
                        displayName: profile.displayName,
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    }
                }, null);
            }
        }));
        
    }
}