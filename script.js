const Gameboard = () => {
    const board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];

    const getBoard = () => board;

    const setSign = (cellNo, player) => {
        if (board[cellNo] === "-") {
            board[cellNo] = player;
        }
    };

    const getSign = (cellNo) => board[cellNo];

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "-";
        }
    }

    return {
        getBoard,
        setSign,
        getSign,
        reset
    };
}


const UIController = (() => {
    const boardControlDiv = document.querySelector(".board-control");
    const startBtn = document.querySelector("#beginBtn");
    const resetBtn = document.querySelector("#resetBtn");
    const turnDiv = document.querySelector(".turn");
    const gameDiv = document.querySelector(".game-container");
    const fieldElements = document.querySelectorAll(".field");

    startBtn.addEventListener("click", () => {
        updateBoard();
        showBoard();
    });

    resetBtn.addEventListener("click", () => {
        GameController.reset();
        updateBoard();
    })

    function updateBoard() {

        const activePlayer = GameController.getActivePlayer();
        turnDiv.textContent = `Player ${activePlayer}'s turn...`;

        for (let i = 0; i < fieldElements.length; i++) {
            fieldElements[i].textContent = GameController.cell(i);
        }
    }

    function showBoard() {
        gameDiv.classList.add("active");
        startBtn.classList.add("inactive");
        resetBtn.classList.add("active");
    }

    fieldElements.forEach(field =>
        field.addEventListener("click", (e) => {
            if (e.target.textContent !== "-") return;

            GameController.playRound(e.target.dataset.cell);
            updateBoard();
        }));
})();


const GameController = ((player = "X") => {
    const gameboard = Gameboard();

    const players = ["X", "O"];

    let activePlayer = player;

    const switchPlayer = () => {
        activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const playRound = (selectedCell) => {
        gameboard.setSign(selectedCell, activePlayer);

        switchPlayer();
    }

    const reset = () => {
        gameboard.reset()
        activePlayer = players[0];
    }

    return {
        playRound,
        getActivePlayer,
        reset,
        cell: gameboard.getSign
    };
})();