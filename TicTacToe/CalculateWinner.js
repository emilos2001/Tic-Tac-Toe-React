export function CalculateWinner(board) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3 ,6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            return {winnerSymbol : board[a], line: lines[i]}
        }
    }
    return null;
}

function compTurn(board, symbol){
    let compMove
    while (true) {
        compMove = Math.floor(Math.random() * 9) + 1
        if (isValidMove(board, compMove)){
            break
        }
    }
    placeSymbol(board, compMove.toString(), symbol)
    console.log(compMove)
}

function isValidMove(board, move){
    const row = Math.floor((move + 1) % 3)
    const col = (move + 1) / 3
    return board[row][col] === ''
}

function placeSymbol(board, move, symbol){
    const row = Math.floor((move + 1) % 3)
    const col = (move + 1) / 3
    return board[row][col] = symbol
}

let board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

compTurn(board);

console.log(board);
