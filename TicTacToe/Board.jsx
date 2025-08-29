import './style.css'
import {Attributes} from './Attributes.jsx'
import {useState, useRef, useEffect} from 'react'
import {CalculateWinner} from './CalculateWinner.js'
import circleSrc from './Assets/circle.png'
import crossSrc from './Assets/cross.png'

export function Board(props) {
    const player = useRef(true)
    const scoreX = useRef(0)
    const score0 = useRef(0)
    const turn = useRef(true)
    const [board, setBoard] = useState(Array(9).fill(''))
    const [gameOver, setGameOver] = useState(false)
    const [isLoser, setIsLoser] = useState(false)
    const [isWinner, setIsWinner] = useState([])

    const style = {
        width: '30px',
        height: '30px',
    }
    useEffect(() => {
        if (!gameOver && board.includes('') && !player.current){
            setTimeout(() => {
                computerTurn()
            }, 500)
            player.current = true
        }
    }, [board])

    const Cross = () =>{
        return <img src={crossSrc} style={style} alt='Cross'/>
    }

    const Circle = () =>{
        return <img src={circleSrc} style={style} alt='Circle'/>
    }

    const massages = props.messages

    function calculateWinner(newBoard) {
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
            if (winner.winnerSymbol === 'X'){
                scoreX.current += 1
            } else if (winner.winnerSymbol === '0'){
                score0.current += 1
            }
            return
        }
        if (!newBoard.includes('')) {
            props.handleMessages(props.messages.tie);
            setGameOver(true);
        }
    }

    const playerTurn = (index) => {
        setBoard(prevBoard => {
            if (prevBoard[index] !== '') {
                props.handleMessages(props.messages.taken);
                return prevBoard;
            }
            const newBoard = [...prevBoard];
            if (props.you === 1){
                newBoard[index] = '0';
            } else {
                newBoard[index] = 'X'
            }
            calculateWinner(newBoard)
            return newBoard;
        });
        console.log(turn)
        player.current = false
    }

    const computerTurn = () => {
        setBoard(prevBoard => {
            const emptyCells = prevBoard
                .map((value, index) => (value === '' ? index : null))
                .filter(index => index !== null)
            if (emptyCells.length === 0) {
                setGameOver(true)
                return prevBoard
            }
            const index = emptyCells[Math.floor(Math.random() * emptyCells.length)]
            const newBoard = [...prevBoard]
            if (props.you === 1){
                newBoard[index] = 'X'
            } else {
                newBoard[index] = '0'
            }
            console.log(newBoard)
            calculateWinner(newBoard)
            player.current = true
            return newBoard
        })
    }

    return (
        <>
            <h2 className='player'>YOU ARE : {props.you === 1 ? <Circle/> : <Cross/>}</h2>
            <h2 className='turn'>IT'S TURN: {turn.current ? <Cross/> : <Circle/>}</h2>
            <div className='game'>
                {board.map((value,index) => (
                    <button
                        key={index}
                        style={{
                            backgroundColor: isWinner.includes(index)
                                ? (isLoser ? '#cd1b09' : '#20ff07')
                                : '#979797'
                        }}
                        onClick={() => playerTurn(index)}
                        disabled={gameOver}
                    >
                        {value === 'X' && <Cross/>}
                        {value === '0' && <Circle/>}
                    </button>
                ))}
            </div>
            <div>
                <Attributes
                    setBoard={setBoard}
                    setIsWinner={setIsWinner}
                    gameOver={gameOver}
                    setGameOver={setGameOver}
                    messages={massages}
                    handleMessages={props.handleMessages}
                    scoreX={scoreX}
                    score0={score0}/>
            </div>
        </>
    )
}
