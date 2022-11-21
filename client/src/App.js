import { createContext, useEffect, useState } from 'react';
import './App.scss';
import Header from './components/header/header';
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/login" 
import Registration from "./components/registration/registration" 
import Main from './components/main-window/main-window';
import SpeedTest from './components/speedTest/speedTest';

export const Context = createContext();

const App = () => {
  const [isAuth, setIsAuth] = useState(false); 
  const [user, setUser] = useState({});

  const userLocalStorage = localStorage.getItem('user')
  useEffect(() => {
    if(userLocalStorage){
      setUser(JSON.parse(userLocalStorage))
      setIsAuth(true)
    }
  }, []);
  
  return (
    <div className="App">
      <Context.Provider value={{user, setIsAuth, setUser, isAuth}}>
        <Header />
        <div className="App__content">
          <Routes>
              {/* Сделать версию для незарегистрированных */}
              {/* <Route path="/" element={< />} /> */}
              <Route exact="true" path="/" element={ <Main /> } />
              <Route path="/registration-page" element={ <Registration /> } />
              <Route path="/login-page" element={<Login />} />
              <Route path="/speed-test" element={<SpeedTest />} />
          </Routes>
        </div>
      </Context.Provider>
    </div>
  );
}



export default App;
