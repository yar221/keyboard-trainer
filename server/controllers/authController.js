const { validationResult } = require("express-validator")
const authService = require("../service/authService")
const ApiError = require("../exceptions/api-errors")

class AuthController{
    async registration(req, res, next){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }

            const {email, username, password} = req.body
            const userData = await authService.registration(email, username, password)
            
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next){
        try {            
            const {email, password} = req.body
            const userData = await authService.login(email, password)
            
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    async logout(req, res, next){
        try {            
            const {user} = req.body
            await authService.logout(user, isAuth)
            
            return res.redirect('http://localhost:5000')
        } catch (error) {
            next(error)
        }
    }

    async activate(req, res, next){
        try {
            const verificationLink = req.params.link
            await authService.activate(verificationLink)
            return res.redirect('http://localhost:5000')
        } catch (error) {
            next(error)
        }
        
    }

    async uploadImage(req, res, next){
        try {
            const { email } = req.body
            const { img } = req.files
            await authService.uploadImage(img, email)

            return res.redirect('http://localhost:5000')
        } catch (error) {
            next(error)
        }
        
    }
    
}

module.exports = new AuthController()