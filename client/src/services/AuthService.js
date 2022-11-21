import $api from '../http/index'

export default class AuthService{

    static async login(email, password){
        return $api.post('/login', {email, password})
    }

    static async registration(email, username, password){
        return $api.post('/registration', {email, username, password})
    }
    
    static async logout(user, isAuth){
        return $api.post('/logout', {user, isAuth})
    }
}