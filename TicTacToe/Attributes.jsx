import './style.css'
import {useState} from 'react'

export function Attributes(props) {
    const handleReset = () => {
        props.setBoard(Array(9).fill(''));
        props.setGameOver(prev => !prev);
        props.setIsWinner([])
        props.handleMessages('')
    }
    return(
        <>
            <button className='restart-game' onClick={handleReset}>RESTART</button>
        </>
    )
}