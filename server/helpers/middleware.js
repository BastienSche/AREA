const AreaError = require('./error.helper');
const tokenHelper = require('./token.helper');
const userHelper = require('./user.helper');

exports.verifyAPIToken = async(req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!!token && token.startsWith('Bearer '))
        token = token.slice(7, token.length);

    if (!token)
        return next(new AreaError('UNAUTHORIZED', 'Token is required for authentication.'));
    
    const decoded = await tokenHelper.decode(token);
    if (!decoded)
            return next(new AreaError('UNAUTHORIZED', 'Your token is invalide or expired.'));
    req.decoded = decoded;
    next();
}

exports.verifyAPISecret = async(req, res, next) => {
    if (req.decoded.secretKey != process.env.ADMIN_KEY)
            return next(new AreaError('UNAUTHORIZED', 'Your token is invalide or expired.'));
    next();
}

module.exports.checkAPISelfPerm = async(req, res, next) => {
    const { param } = req.params;

    if (req.decoded.id != param) { 
        var user = await userHelper.get(param);
        if (user && (user.id == req.decoded.id || req.decoded.secretKey == process.env.ADMIN_SECRET))
            return next()
        return next(new AreaError('UNAUTHORIZED', 'You dont have permission to access on this ressources.'));
    } else
        return next();
}

module.exports.errorHandler = (err, req, res, next) => {
    var status;
    console.log("ERROR ", err.name, err.message);
    switch (true) {
        case err.name === 'CONFLICT':
            status = 409;
            break;
        case err.name === 'NOT_FOUND':
            status = 404;
            break;
        case err.name === 'UNAUTHORIZED':
            status = 401;
            break;
        case err.name === 'BAD_REQUEST':
            status = 400;
            break;
        default:
            console.log("UNKNOW ERROR", err);
            err.name = "UNKNOWN_ERROR"
            status = 500;
            console.log("ERROR ", err);
            break;
    }

    return res.status(req.headers["user-agent"].includes('okhttp/') ? 200 : status).json({ 
        status: status,
        error: true,
        code: err.name,
        message: err.message
    });
}