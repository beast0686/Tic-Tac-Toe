document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const message = document.getElementById('message');
    const popup = document.getElementById('popup');
    const winMessage = document.getElementById('winMessage');
    const closeBtn = document.getElementById('closeBtn');
    const restartBtn = document.getElementById('restartBtn');

    let xState = Array(9).fill(0); // State of X player's moves
    let zState = Array(9).fill(0); // State of O player's moves
    let turn = 1; // 1 for X and 0 for O
    let gameover = false;

    // Winning combinations
    const wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    // Initialize the game board with animation
    function initBoard() {
        setTimeout(() => {
            board.classList.add('loaded');
            restartBtn.classList.add('loaded');
        }, 500); // Delay the animation for half a second

        for (let i = 0; i < 9; i++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.dataset.index = i;
            tile.addEventListener('click', () => tileClick(i));
            board.appendChild(tile);
        }
    }

    // Handle tile click event with animation
    function tileClick(index) {
        if (!gameover && xState[index] === 0 && zState[index] === 0) {
            if (turn === 1) {
                xState[index] = 1;
                turn = 0;
            } else {
                zState[index] = 1;
                turn = 1;
            }
            renderBoard();
            checkWin();
        }
    }

    // Render the game board with animation
    function renderBoard() {
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach((tile, index) => {
            if (xState[index] === 1) {
                tile.textContent = 'X';
                tile.classList.add('x');
            } else if (zState[index] === 1) {
                tile.textContent = 'O';
                tile.classList.add('o');
            } else {
                tile.textContent = '';
                tile.classList.remove('x', 'o');
            }
        });
    }

    // Check for a win with animation
    function checkWin() {
        for (let win of wins) {
            if (xState[win[0]] === 1 && xState[win[1]] === 1 && xState[win[2]] === 1) {
                showPopup('X Won the match');
                gameover = true;
                return;
            }
            if (zState[win[0]] === 1 && zState[win[1]] === 1 && zState[win[2]] === 1) {
                showPopup('O Won the match');
                gameover = true;
                return;
            }
        }
        if (!xState.includes(0) && !zState.includes(0)) {
            showPopup('Match Draw');
            gameover = true;
        }
    }

    // Show popup with winning message
    function showPopup(msg) {
        winMessage.textContent = msg;
        popup.style.opacity = '1';
        popup.style.pointerEvents = 'auto';
    }

    // Close popup
    closeBtn.addEventListener('click', () => {
        popup.style.opacity = '0';
        popup.style.pointerEvents = 'none';
    });

    // Restart the game with animation
    restartBtn.addEventListener('click', () => {
        xState = Array(9).fill(0);
        zState = Array(9).fill(0);
        turn = 1;
        gameover = false;
        board.classList.remove('loaded');
        restartBtn.classList.remove('loaded');
        setTimeout(() => {
            board.innerHTML = ''; // Clear board
            initBoard();
        }, 500); // Delay the animation for half a second
    });

    // Initialize the board on page load
    initBoard();
});
