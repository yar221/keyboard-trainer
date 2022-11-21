import React, { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../../App"
import './speedTest.scss'
import {Texts} from './texts'
import again from '../../img/again.svg'
import speedImg from '../../img/speed.png'
import accuracyImg from '../../img/accuracy.png'

const SpeedTest = () => {
    const {isAuth} = useContext(Context)
    const [text, setText] = useState(Texts[Math.floor(Math.random() * 7)]);
    const [isStartTest, setIsStartTest] = useState(false);
    const [speed, setSpeed] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [isWin, setIsWin] = useState(false);

    const isStartTestRef = useRef(isStartTest)
    const textSymbols = useRef()
    const wordIndex = useRef(0)
    const seconds = useRef(0)
    const correctWordsCount = useRef(0)
    const wrongWordsCount = useRef(0)
    const timer = useRef()

    const isKyr = (str) => {
        return /[а-я\s\-\w\\,\w\\.\w\\"\w\\:\w\\(\w\\)\w\\/\w\\:\w]/i.test(str);
    }
    
    const intervalFunction = () => {
        seconds.current++
        //console.log(Math.floor(correctWordsCount.current / seconds.current * 60))
        setSpeed(Math.floor(correctWordsCount.current / seconds.current * 60))
        if(wrongWordsCount.current !== textSymbols.current.length){
            setAccuracy(((wrongWordsCount.current * 100) / 409).toFixed(1))
            //console.log(wrongWordsCount.current)
        }
        
    }
    
    const startTest = () => {
        timer.current = undefined
        setIsStartTest(true)
        isStartTestRef.current = true

        if(isWin){
            changeText()
        }

        textSymbols.current = [...document.querySelectorAll('span')]
        wrongWordsCount.current = textSymbols.current.length

        document.querySelectorAll('span')[0].classList.add('current__word')
        setIsWin(false)

        setSpeed(0)
        setAccuracy(100)
    }
    
    const stopGame = () => {
        for(let i = 0; i <= wordIndex.current; i++){
            textSymbols.current[i].classList.remove('succes__word')
            textSymbols.current[i].classList.remove('current__word')
            textSymbols.current[i].classList.remove('wrong__word')
        }
        setIsStartTest(false)
        wordIndex.current = 0
        clearInterval(timer.current)
        setIsWin(false)
        //------------
        
    }

    const changeText = () => {
        const newText = Texts[Math.floor(Math.random() * 7)]
        
        if(newText === text){
            changeText()
        }else{
            setText(newText)
            if(!isWin){
                stopGame()
            }
        }
    }

    useEffect(() => {
        const onKeypress = (e) => {
            if(isStartTestRef.current){
                if(timer.current === undefined){
                    timer.current = setInterval(intervalFunction , 1000)
                }
                if(!isKyr(e.key)){
                    alert("Поменяйте раскладку на русскую")
                }else if(textSymbols.current[wordIndex.current].textContent === e.key){
                    textSymbols.current[wordIndex.current].classList.add('succes__word')
                    textSymbols.current[wordIndex.current].classList.remove('current__word')
                    textSymbols.current[wordIndex.current + 1].classList.add('current__word')
                    textSymbols.current[wordIndex.current].classList.remove('wrong__word')
                    wordIndex.current++
                    correctWordsCount.current++
                }else{
                    textSymbols.current[wordIndex.current].classList.add('wrong__word')
                    textSymbols.current[wordIndex.current].classList.remove('current__word')
                    wrongWordsCount.current--
                }
                if(correctWordsCount.current === textSymbols.current.length){
                    stopGame()
                    setIsWin(true)
                }
            }
        };
        
        document.addEventListener('keypress', onKeypress)
        
      
        return () => {
          document.removeEventListener('keypress', onKeypress);
        };
    }, []);

    if(!isAuth){
        const baseString = 'Зарегестрируйтесть что-бы получить доступ к новому тексту'

        return(
            <div className="speed-test">
            <div className="speed-test__container _container">
                <div className="speed-test__body">
                    <div className="speed-test__text">
                        <div className="speed-test__textarea">
                            {baseString.split('').map((item, key) => {
                                return <span id="span" key={key}>{item}</span>
                            })}
                        </div>
                        <div className="speed-test__result result">
                            <div>
                                <div className="result__speed speed">
                                    <div className="speed__title title"><img src={speedImg} alt="speed" className="title__img img" /> <p className="title__text text">Скорость</p></div>
                                    <p className="speed__value value"><span>{speed}</span> ЗН/М</p>
                                </div>
                                <div className="result__accuracy accuracy">
                                    <div className="accuracy__title title"><img src={accuracyImg} alt="accuracy" className="title__img img" /> <p className="title__text text">Точность</p></div>
                                    <p className="speed__value value"><span>{accuracy}</span> %</p>
                                </div>
                            </div>
                            <div>
                                <div className="result__again again" onClick={stopGame}><img src={again} alt="again" className="again__img"/><p className="again__text">Заново</p></div>
                                <div className="result__another another" onClick={changeText}><p className="again__text">Смена текста</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="speed-test__keyboard"></div>
                    <div className="speed-test__start start" style={{display: isStartTest ? 'none' : 'flex'}}>
                        <div className="start__body" style={{background: isWin ? '#fff' : 'transparent'}}>
                            {isWin && 
                                <div className="start__win win">
                                    <p className="win__title">ПОБЕДА!</p>
                                    <div className="win__results results">
                                        <p className="results__speed">Ваша скорость: {speed} ЗН/М</p>
                                        <p className="results__accuracy">Ваша точность: {accuracy} %</p>
                                    </div>
                                    <p className="win__text">Хотите попробовать ещё?</p>
                                </div>  
                            }
                            <button className="start__btn" onClick={startTest}>Начать!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
    
    return(
        <div className="speed-test">
            <div className="speed-test__container _container">
                <div className="speed-test__body">
                    <div className="speed-test__text">
                        <div className="speed-test__textarea">
                            {text.split('').map((item, key) => {
                                return <span id="span" key={key}>{item}</span>
                            })}
                        </div>
                        <div className="speed-test__result result">
                            <div>
                                <div className="result__speed speed">
                                    <div className="speed__title title"><img src={speedImg} alt="speed" className="title__img img" /> <p className="title__text text">Скорость</p></div>
                                    <p className="speed__value value"><span>{speed}</span> ЗН/М</p>
                                </div>
                                <div className="result__accuracy accuracy">
                                    <div className="accuracy__title title"><img src={accuracyImg} alt="accuracy" className="title__img img" /> <p className="title__text text">Точность</p></div>
                                    <p className="speed__value value"><span>{accuracy}</span> %</p>
                                </div>
                            </div>
                            <div>
                                <div className="result__again again" onClick={stopGame}><img src={again} alt="again" className="again__img"/><p className="again__text">Заново</p></div>
                                <div className="result__another another" onClick={changeText}><p className="again__text">Смена текста</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="speed-test__keyboard"></div>
                    <div className="speed-test__start start" style={{display: isStartTest ? 'none' : 'flex'}}>
                        <div className="start__body" style={{background: isWin ? '#fff' : 'transparent'}}>
                            {isWin && 
                                <div className="start__win win">
                                    <p className="win__title">ПОБЕДА!</p>
                                    <div className="win__results results">
                                        <p className="results__speed">Ваша скорость: {speed} ЗН/М</p>
                                        <p className="results__accuracy">Ваша точность: {accuracy} %</p>
                                    </div>
                                    <p className="win__text">Хотите попробовать ещё?</p>
                                </div>  
                            }
                            <button className="start__btn" onClick={startTest}>Начать!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default SpeedTest