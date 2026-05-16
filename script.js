/*calling grid & score*/
const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");

let board = [];
let score = 0;

function startGame() {
  board = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ];

  score = 0;
  scoreDisplay.innerText = score;

  addNumber();
  addNumber();
  drawBoard();
}

function drawBoard() {
  grid.innerHTML = "";

  for(let row=0; row<4; row++) {
    for(let col=0; col<4; col++) {

      const cell = document.createElement("div");
      cell.classList.add("cell");

      if(board[row][col] !== 0){
        cell.innerText = board[row][col];
        cell.classList.add(`tile-${board[row][col]}`);
      }

      grid.appendChild(cell);
    }
  }
}

function addNumber() {
  let emptyCells = [];

  for(let row=0; row<4; row++) {
    for(let col=0; col<4; col++) {
      if(board[row][col] === 0){
        emptyCells.push({row, col});
      }
    }
  }

  if(emptyCells.length === 0) return;

  let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  board[randomCell.row][randomCell.col] = 2;
}

function slide(row) {

  row = row.filter(num => num);

  for(let i=0; i<row.length-1; i++) {

    if(row[i] === row[i+1]) {
      row[i] *= 2;
      score += row[i];
      row[i+1] = 0;
    }
  }

  row = row.filter(num => num);

  while(row.length < 4){
    row.push(0);
  }

  return row;
}

function moveLeft() {

  for(let i=0; i<4; i++) {
    board[i] = slide(board[i]);
  }
}

function moveRight() {

  for(let i=0; i<4; i++) {
    board[i] = slide(board[i].reverse()).reverse();
  }
}

function moveUp() {

  for(let col=0; col<4; col++) {

    let temp = [];

    for(let row=0; row<4; row++) {
      temp.push(board[row][col]);
    }

    temp = slide(temp);

    for(let row=0; row<4; row++) {
      board[row][col] = temp[row];
    }
  }
}

function moveDown() {

  for(let col=0; col<4; col++) {

    let temp = [];

    for(let row=0; row<4; row++) {
      temp.push(board[row][col]);
    }

    temp = slide(temp.reverse()).reverse();

    for(let row=0; row<4; row++) {
      board[row][col] = temp[row];
    }
  }
}

document.addEventListener("keydown", (e) => {

  if(e.key === "ArrowLeft"){
    moveLeft();
  }

  else if(e.key === "ArrowRight"){
    moveRight();
  }

  else if(e.key === "ArrowUp"){
    moveUp();
  }

  else if(e.key === "ArrowDown"){
    moveDown();
  }

  else{
    return;
  }

  addNumber();
  drawBoard();

  scoreDisplay.innerText = score;

  checkWin();
});

function checkWin(){

  for(let row=0; row<4; row++) {
    for(let col=0; col<4; col++) {

      if(board[row][col] === 2048){
        alert("You Win!");
      }
    }
  }
}

startGame();