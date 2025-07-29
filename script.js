const board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

const gameBoard = document.getElementById('game-board');
const statusText = document.getElementById('status');

function renderBoard() {
  gameBoard.innerHTML = '';
  board.forEach((cell, index) => {
    const div = document.createElement('div');
    div.className = 'cell';
    div.textContent = cell || '';
    div.addEventListener('click', () => handleClick(index));
    gameBoard.appendChild(div);
  });
}

function handleClick(index) {
  if (!gameActive || board[index]) return;
  board[index] = currentPlayer;
  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (board.every(cell => cell)) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
  renderBoard();
}

function checkWin() {
  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  for (let i = 0; i < board.length; i++) board[i] = null;
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  renderBoard();
}

// Initialize game
resetGame();
