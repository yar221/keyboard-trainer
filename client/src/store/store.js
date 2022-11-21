import {makeAutoObservable} from 'mobx'
import AuthService from '../services/AuthService'

class Store{

    constructor(){
        makeAutoObservable(this)
    }

    async login(email, password, setAuth, setUser){
        try {
            const response = await AuthService.login(email, password)
            console.log(response)
            setAuth(true)
            setUser(response.data.user)
            localStorage.setItem('user', JSON.stringify(response.data.user))
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    async registration(email, username, password, setAuth, setUser){
        try {
            const response = await AuthService.registration(email, username, password)
            //console.log(response)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            setUser(response.data.user)
            setAuth(true)
        } catch (e) {
            //alert(e.response.data.message)
            console.log(e?.response?.data.message)
        }
    }

    async logout(setUser, setAuth){
        try {
            setUser({})
            setAuth(false)
            localStorage.removeItem('user')
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export default new Store()