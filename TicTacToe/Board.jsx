import './style.css'
import {Attributes} from './Attributes.jsx'
import {useState} from 'react'
import {CalculateWinner} from './CalculateWinner.js'
import circleSrc from './Assets/circle.png'
import crossSrc from './Assets/cross.png'

export function Board(props) {
    const [board, setBoard] = useState(Array(9).fill(''))
    const [gameOver, setGameOver] = useState(false)
    const [xTurn, setXTurn] = useState(true)
    const [isLoser, setIsLoser] = useState(false)
    const [isWinner, setIsWinner] = useState([])

    const style = {
        width: '30px',
        height: '30px',
    }

    const Cross = () =>{
        return <img src={crossSrc} style={style} alt='Cross'/>
    }

    const Circle = () =>{
        return <img src={circleSrc} style={style} alt='Circle'/>
    }

    const massages = props.messages

    const change = (index) => {
        setBoard(prevBoard => {
            if (prevBoard[index] !== '') {
                props.handleMessages(props.messages.taken);
                return prevBoard;
            }
            const newBoard = [...prevBoard];
            newBoard[index] = xTurn ? 'X' : '0' ;
            const winner = CalculateWinner(newBoard)
            if (winner) {
                setIsWinner(winner.line)
                if ((props.you === 1 && winner.winnerSymbol === 'X') ||
                    (props.you === 2 && winner.winnerSymbol === '0')) {
                    setIsLoser(true)
                    props.handleMessages(massages.lose)
                } else {
                    props.handleMessages(massages.winn)
                    setIsLoser(false)
                }
                setGameOver(true)
            } else if (!newBoard.includes('')) {
                props.handleMessages(props.messages.tie);
                setGameOver(true);
            }
            return newBoard;
        });
        setXTurn(prev => !prev);
    };

    return (
        <>
            <h2 className='player'>YOU ARE : {props.you === 1 ? <Circle/> : <Cross/>}</h2>
            <h2 className='turn'>IT'S TURN: {xTurn ? <Cross /> : <Circle />}</h2>
            <div className='game'>
                {board.map((value,index) => (
                    <button
                        key={index}
                        style={{
                            backgroundColor: isWinner.includes(index)
                                ? (isLoser ? '#cd1b09' : '#20ff07')
                                : '#979797'
                        }}
                        onClick={() => change(index)}
                        disabled={gameOver}
                    >
                        {value === 'X' && <Cross/>}
                        {value === '0' && <Circle/>}
                    </button>
                ))}
            </div>
            <div>
                {gameOver && <Attributes
                    setBoard={setBoard}
                    setIsWinner={setIsWinner}
                    setGameOver={setGameOver}
                    handleMessages={props.handleMessages}
                />}
            </div>
        </>
    )
}