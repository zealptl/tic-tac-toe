const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let circleTurn;

startGame();

function startGame() {
  circleTurn = false;
  const cellEl = document.querySelectorAll("[data-cell]");
  const board = document.getElementById("board");

  cellEl.forEach(cell => {
    cell.addEventListener("click", handleClick, { once: true });
  });
  addHoverClass();
}

function handleClick(e) {
  const cell = e.target;
  const currentTurn = circleTurn ? CIRCLE_CLASS : X_CLASS;

  //1. place mark
  placeMark(cell, currentTurn);
  //2. check for win
  checkWin(currentTurn);
  //3. check for draw

  //4. switch turns
  swapTurns();

  //5. add hover effect
  addHoverClass();
}

function placeMark(cell, currentTurn) {
  cell.classList.add(currentTurn);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function addHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);

  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentTurn) {}
