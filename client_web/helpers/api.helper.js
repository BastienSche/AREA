const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const jwt = require('jsonwebtoken');

JWT_ADMIN = null;

module.exports = {
    request: async(url, method, token, body) => {
        if (token === 'ADMIN_JWT')
            token = JWT_ADMIN ? JWT_ADMIN : jwt.sign({ secretKey: process.env.ADMIN_KEY }, process.env.SECRET_KEY, { expiresIn: "365d" });
        var response = await fetch(`http://server:8080/api/v1/${url}`, {
            method: method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : null
        });
        console.log("API RESPONSE", method, url, response.status)
        var json = await response.json();
        if (json.error)
            throw new Error(json.message);
        return json;
    },

    getUserData: async function (user) {
        try {
            var json = await this.request(`users/${user.id}`, 'GET', user.accessToken);
            return {
                ...user,
                ...json.user
            };
        } catch (err) {
            if (err.message == 'Your token is invalide or expired.') {
                var json = await this.request(`auth/refreshToken`, 'POST', user.accessToken, {
                    refreshToken: user.refreshToken
                });
                if (json.error)
                    throw new Error(json.message);
                user.accessToken = json.accessToken
                return await this.getUserData(user);
            } else
                throw new Error(err.message);
        }
    }
}