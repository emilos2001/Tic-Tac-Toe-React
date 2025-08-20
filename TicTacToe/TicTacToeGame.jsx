import './style.css'
import {Board} from './Board.jsx'
import {useState} from "react";
import circleSrc from './Assets/circle.png'
import crossSrc from './Assets/cross.png'
export function TicTacToe() {
    const [gameStart, setGameStart] = useState(false)
    const [message, setMessage] = useState('')
    const [you, setYou] = useState(null)

    const Circle =()=>{
        return <img src={circleSrc} alt="Circle"/>
    }

    const Cross = () => {
        return <img src={crossSrc} alt="Cross"/>
    }

    const handleChoosePlayer = (id) =>{
        setGameStart(true)
        setYou(id)
    }

    const messages = {
        tie: "IT'S TIE",
        taken: <h2 className='taken-position'>
            IT'S ALLREADY TAKEN
        </h2>,
        winn: "YOU WON",
        lose: "YOU LOSE"
    }

    function handleMesssages(message) {
        setMessage(message)
        if (message === messages.taken){
            setTimeout(() => {
                setMessage('')
            }, 4500);
        }
    }

    return(
        <>
            <div className='title'>
                <h2>Tic Tac Toe</h2>
            </div>
            {gameStart ?
                (<Board handleMessages={handleMesssages}
                        messages={messages}
                        you={you}
                        circle={<Circle/>}
                        cross={<Cross/>}/>
                )
                :
                (
                    <div className='game-menu'>
                        <button onClick={() => {handleChoosePlayer(1)}}><Circle/></button>
                        <button onClick={() => {handleChoosePlayer(2)}}><Cross/></button>
                    </div>
                )
            }
            <h2 className='messages'>{message}</h2>
        </>
    )
}