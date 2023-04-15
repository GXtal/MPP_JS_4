const ApiError = require('./errors')
const tokenService = require('../service/token-service')

module.exports = function (socket, next){
    try {
        const token = socket.handshake.auth.token
        if(!token){
            throw ApiError.UnauthorizedError()
        }

        const userData = tokenService.validationAccessToken(token)
        if(!userData){
            throw ApiError.UnauthorizedError()
        }

        next();
    }catch (e) {
        e.data = {status: e.status}
        next(e)
    }
}