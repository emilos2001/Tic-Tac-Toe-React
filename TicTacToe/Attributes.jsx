import './style.css'
import circleSrc from './Assets/circle.png'
import crossSrc from './Assets/cross.png'
import {useEffect} from "react";

export function Attributes(props) {

    const handleReset = () => {
        props.setBoard(Array(9).fill(''));
        props.setGameOver(prev => !prev);
        props.setIsWinner([])
        props.handleMessages('')
    }

    return(
        <>
            <div className='score'>
                <img src={circleSrc}/>
                <h1>{props.score0.current}</h1>
                <img src={crossSrc}/>
                <h1>{props.scoreX.current}</h1>
            </div>
            {props.gameOver && <button className='restart-game' onClick={handleReset}>RESTART</button>}
        </>
    )}
