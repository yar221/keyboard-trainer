import {useContext, useState} from 'react'
import store from "../../store/store";
import {Link, Navigate} from "react-router-dom";
import './registration.scss'
import { Context } from "../../App";

const Registration = () => {
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const { setIsAuth, setUser, isAuth } = useContext(Context)

    if(isAuth){
        return <Navigate to="/" />
    }

    return(
        <div className="registration">
            <div className="registration__body">
                <p className="registration__title">Регистрация</p>
                <form action='#' className="registration__form form">
                    <div className="form__content content">
                        <div className="form__email email-block content__item">
                            <span className="email-block__title title">Email</span>
                            <input type="text" className="email-block__input input" placeholder="Your Email" value={email} onChange={event => {
                                setEmail(event.target.value)
                            }}/>           
                        </div>
                        <div className="form__login login-block content__item">
                            <span className="login-block__title title">Login</span>
                            <input type="text" className="login-block__input input" placeholder="Your Login" value={login} onChange={event => {
                                setLogin(event.target.value)
                            }}/>
                        </div>
                        <div className="form__password password-block content__item">
                            <span className="password-block__title title">Password</span>
                            <input type="password" className="password-block__input input" placeholder="Your Password" value={password} onChange={event => {
                                setPassword(event.target.value)
                            }}/>
                        </div>
                        <button className="form__submit" type="submit" onClick={event => {
                                event.preventDefault()
                                store.registration(email, login, password, setIsAuth, setUser)
                            }}>Register</button>
                    </div>
                    <div className="form__changePage"><Link to="/login-page">Do you want to login?</Link></div>
                </form>
            </div>
        </div>
    )
}

export default Registration