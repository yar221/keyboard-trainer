const userModel = require("../model/userModel")
const bcrypt = require("bcrypt")
const uuid = require('uuid')
const mailService = require("./mailService")
const fileService = require("./fileService")
const ApiError = require("../exceptions/api-errors")

class AuthService{
    async registration(email, username, password){         
        const candidate = userModel.findOne({email})

        if(candidate){
            throw ApiError.BadRequest(`Пользователь с email: ${email} уже существует`)
        }

        const hashedPassword = await bcrypt.hash(password, 3)

        const verificationLink = uuid.v4()
    
        const user = await userModel.create({username, email, password: hashedPassword, verificationLink})
        await mailService.sendActivationMail(email, verificationLink)

        return {
            user
        }
    }

    async login(email, password){
        const user = await userModel.findOne({email})
        
        if(!user){
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} не найден`)
        }

        const isPasswordEquels = await bcrypt.compare(password, user.password)
        
        if(!isPasswordEquels){
            throw ApiError.BadRequest(`Пароль неверный`)
        }

        return{
            user
        } 
    }

    async logout(user, setIsAuth){
        user = {}
        setIsAuth(false)
    }

    async activate(verificationLink){
        const user = await userModel.findOne({verificationLink})
        if(!user){
            throw ApiError.BadRequest('Некорректная ссылка активации')
        }

        user.isActivated = true
        await user.save()
    }

    async uploadImage(img, email){
        const user = await userModel.findOne({email})
        const filename = fileService.saveImage(img)

        user.img = filename
        await user.save()
    }
}

module.exports = new AuthService()