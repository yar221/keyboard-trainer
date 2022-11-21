import {useContext, useState} from 'react'
import store from "../../store/store";
import {Link, Navigate} from "react-router-dom";
import './login.scss'
import { Context } from "../../App";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setIsAuth, setUser, isAuth } = useContext(Context)

    if(isAuth){
        return <Navigate to="/" />
    }
    
    return(
        <div className="login">
            <div className="login__body">
                <p className="login__title">Авторизация</p>
                <form action='#' className="login__form form">
                    <div className="form__content content">
                        <div className="form__email email content__item">
                            <span className="email__title title">Email</span>
                            <input type="text" className="email__input input" placeholder="Your Email" value={email} onChange={event => {
                                setEmail(event.target.value)
                            }}/>           
                        </div>
                        <div className="form__password password content__item">
                            <span className="password__title title">Password</span>
                            <input type="password" className="password__input input" placeholder="Your Password" value={password} onChange={event => {
                                setPassword(event.target.value)
                            }}/>
                        </div>
                        <button className="form__submit" type="submit" onClick={event => {
                                event.preventDefault()
                                store.login(email, password, setIsAuth, setUser)
                            }}>Login</button>
                    </div>
                    <div className="form__changePage"><Link to="/registration-page">Do you want to get new account?</Link></div>
                </form>
            </div>
        </div>
    )
}

export default Login