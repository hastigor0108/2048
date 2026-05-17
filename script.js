const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

let board = [];
let score = 0;

function createBoard() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    score = 0;
    updateScore();

    addRandomTile();
    addRandomTile();

    drawBoard();
}

function drawBoard() {
    grid.innerHTML = "";

    board.forEach(row => {
        row.forEach(cell => {
            const tile = document.createElement("div");
            tile.classList.add("cell");

            if (cell !== 0) {
                tile.textContent = cell;
                tile.style.background = getTileColor(cell);
            }

            grid.appendChild(tile);
        });
    });
}

function getTileColor(value) {
    const colors = {
        2: "#eee4da",
        4: "#ede0c8",
        8: "#f2b179",
        16: "#f59563",
        32: "#f67c5f",
        64: "#f65e3b",
        128: "#edcf72",
        256: "#edcc61",
        512: "#edc850",
        1024: "#edc53f",
        2048: "#edc22e"
    };

    return colors[value] || "#3c3a32";
}

function addRandomTile() {
    let emptyCells = [];

    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c] === 0) {
                emptyCells.push({ r, c });
            }
        }
    }

    if (emptyCells.length === 0) return;

    const randomCell =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];

    board[randomCell.r][randomCell.c] =
        Math.random() < 0.9 ? 2 : 4;
}

function updateScore() {
    scoreDisplay.textContent = score;
}

function slide(row) {
    row = row.filter(val => val);

    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            score += row[i];
            row[i + 1] = 0;
        }
    }

    row = row.filter(val => val);

    while (row.length < 4) {
        row.push(0);
    }

    return row;
}

function moveLeft() {
    let oldBoard = JSON.stringify(board);

    for (let r = 0; r < 4; r++) {
        board[r] = slide(board[r]);
    }

    afterMove(oldBoard);
}

function moveRight() {
    let oldBoard = JSON.stringify(board);

    for (let r = 0; r < 4; r++) {
        board[r] = slide(board[r].reverse()).reverse();
    }

    afterMove(oldBoard);
}

function moveUp() {
    let oldBoard = JSON.stringify(board);

    for (let c = 0; c < 4; c++) {
        let col = [];

        for (let r = 0; r < 4; r++) {
            col.push(board[r][c]);
        }

        col = slide(col);

        for (let r = 0; r < 4; r++) {
            board[r][c] = col[r];
        }
    }

    afterMove(oldBoard);
}

function moveDown() {
    let oldBoard = JSON.stringify(board);

    for (let c = 0; c < 4; c++) {
        let col = [];

        for (let r = 0; r < 4; r++) {
            col.push(board[r][c]);
        }

        col = slide(col.reverse()).reverse();

        for (let r = 0; r < 4; r++) {
            board[r][c] = col[r];
        }
    }

    afterMove(oldBoard);
}

function afterMove(oldBoard) {
    if (oldBoard !== JSON.stringify(board)) {
        addRandomTile();
        drawBoard();
        updateScore();
        checkGameOver();
    }
}

function checkGameOver() {
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c] === 0) return;
        }
    }

    alert("Game Over!");
}

document.addEventListener("keydown", e => {
    switch (e.key) {
        case "ArrowLeft":
            moveLeft();
            break;

        case "ArrowRight":
            moveRight();
            break;

        case "ArrowUp":
            moveUp();
            break;

        case "ArrowDown":
            moveDown();
            break;
    }
});

/* MOBILE TOUCH CONTROLS */

let startX = 0;
let startY = 0;

document.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;

    let dx = endX - startX;
    let dy = endY - startY;

    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 50) {
            moveRight();
        } else if (dx < -50) {
            moveLeft();
        }
    } else {
        if (dy > 50) {
            moveDown();
        } else if (dy < -50) {
            moveUp();
        }
    }
});

restartBtn.addEventListener("click", createBoard);

createBoard();