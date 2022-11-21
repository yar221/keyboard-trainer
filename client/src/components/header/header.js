import { useContext, useEffect, useRef, useState } from 'react'
import './header.scss'
import { Context } from "../../App";
import { Link } from 'react-router-dom';
import store from '../../store/store';

const Header = () => {
    
    const {user, isAuth, setUser, setIsAuth} = useContext(Context);

    const [dropDownStyles, setDropDownStyles] = useState({opacity: "0", visibility: "hidden"})

    const pathName = window.location.pathname

    const changeDropDownStyles = () => {
        if(dropDownStyles.opacity === "0"){
            setDropDownStyles({opacity: "1", visibility: "visible"})
            dropDownStylesRef.current = "1"
        }else{
            setDropDownStyles({opacity: "0", visibility: "hidden"})
        }
    }

    const root = useRef();
    const dropDownStylesRef = useRef(dropDownStyles.opacity);
    
    useEffect(() => {
        const onClick = e =>{
            if(!root.current.contains(e.target) && dropDownStylesRef.current === "1"){
                setDropDownStyles({opacity: "0", visibility: "hidden"})
                dropDownStylesRef.current = "0"
            }
        }
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
      }, []);

    return(
        <header className="header">
            <div className="header__container _container">
                <div className="header__title">KBtrainer</div>
                <nav className="header__menu">
                    <ul className="header__list list">
                        <li className="list__item"><Link to="/speed-test">Проверка скорости</Link></li>
                    </ul>
                </nav>
                {isAuth ?
                    <div className="header__profile profile">
                        {(user.img !== "" && user === {}) ? <img src={user.img} alt="profile_image" className='profile__image'/> : <div className='profile__circle'></div>}
                        <p className="profile__username">{user.username}</p>
                        <div className="profile__triangle" onClick={changeDropDownStyles} ref={root}></div>
                        <div className="profile__dropdown-menu menu" style={dropDownStyles}>
                            <ul className="menu__list list-menu">
                                <li className="list-menu__item">Мой профиль</li>
                                <li className="list-menu__item">Результат обучения</li>
                                <li className="list-menu__item">Результат тестов</li>
                                <li className="list-menu__item">Редактировать профиль</li>
                                <li className="list-menu__item" onClick={() => {
                                    store.logout(setUser, setIsAuth)
                                }}>Выйти</li>
                            </ul>
                        </div>
                    </div>    
                : 
                    <div className="header__profile profile">
                        <div className="profile__login"><Link to="/login-page">Войти</Link></div>
                        <div className="profile__registr"><Link to="/registration-page">Зарегистрироваться</Link></div>
                    </div>
                }
            </div>
        </header>
    )
}

export default Header