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

const cellEl = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageEl = document.getElementById("winningMessage");
const winningMessageTextEl = document.querySelector(
  "[data-winning-message-text]"
);
const restart = document.getElementById("restartButton");

startGame();

restart.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  cellEl.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  addHoverClass();
  winningMessageEl.classList.remove("show");
}

function endGame(draw) {
  if (draw) {
    winningMessageTextEl.innerHTML = "Draw!";
  } else {
    winningMessageTextEl.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageEl.classList.add("show");
}

function isDraw() {
  return [...cellEl].every(cell => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function handleClick(e) {
  const cell = e.target;
  const currentTurn = circleTurn ? CIRCLE_CLASS : X_CLASS;

  //1. place mark
  placeMark(cell, currentTurn);

  if (checkWin(currentTurn)) {
    //2. check for win
    endGame(false);
  } else if (isDraw()) {
    //3. check for draw
    endGame(true);
  } else {
    //4. switch turns
    swapTurns();

    //5. add hover effect
    addHoverClass();
  }
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

function checkWin(currentTurn) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellEl[index].classList.contains(currentTurn);
    });
  });
}
