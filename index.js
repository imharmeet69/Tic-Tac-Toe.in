const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restartBtn');
const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
  cells.forEach(cell => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellindex");

  if (options[cellIndex] !== "" || !running) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
currentPlayer = (currentPlayer === "X") ? "O" : "X";
statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
let roundWon= false;

for (let i = 0; i < winCondition.length; i++) {
  const condition = winCondition[i];
  const celA = options[condition[0]];
  const celB = options[condition[1]];
  const celC = options[condition[2]];

  if (celA === "" || celB === "" || celC === "")  {
    continue;
}
if (celA === celB && celB === celC) {
  roundWon = true;
  break;
} 
}
if(roundWon) {
  statusText.textContent = `${currentPlayer}, wins`;
} else if (!options.includes("")) {
  statusText.textContent = `Draw`;
  running = false;
} else {
  changePlayer();
}
}
function restartGame() {
currentPlayer = "X";
options = ["", "", "", "", "", "", "", "", ""];
statusText.textContent = `${currentPlayer},s turn`;
cells.forEach(cell => cell.textContent = "");
running = true;
}