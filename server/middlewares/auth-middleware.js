const ApiError = require("../exceptions/api-errors")

module.exports = function(req, res, next) {
    try {        
        const authorizationHeader = req.headers.authorization
        if(!authorizationHeader){
            return next(ApiError.AuthorizedError())
        }

        next()
    } catch (e) {
        console.log(e)
    }
    
}