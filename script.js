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
    const startBtn = document.querySelector("#beginBtn");
    const resetBtn = document.querySelector("#resetBtn");
    const turnDiv = document.querySelector(".turn");
    const resultH = document.querySelector("#result");
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
            if (e.target.textContent !== "-" || GameController.getIsOver()) return;

            GameController.playRound(parseInt(e.target.dataset.cell));
            updateBoard();
        }));

    const displayResult = (msg) => {
        resultH.textContent = msg;
    }

    return { displayResult }
})();


const GameController = ((player = "X") => {
    const gameboard = Gameboard();

    const players = ["X", "O"];

    let activePlayer = player;

    let isOver = false;
    let round = 1;

    const switchPlayer = () => {
        activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const playRound = (selectedCell) => {
        gameboard.setSign(selectedCell, activePlayer);

        if (checkForWinner(selectedCell)) {
            UIController.displayResult(`Player ${getActivePlayer()} has won!`);
            isOver = true;
            return;
        }

        if (round === 9) {
            UIController.displayResult(`It's a draw!!`);
            isOver = true;
            return;
        }

        round++;

        switchPlayer();
    };

    const reset = () => {
        gameboard.reset();
        activePlayer = players[0];
        round = 1;
        isOver = false;
        UIController.displayResult("Tic-Tac-Toe");
    };

    const getIsOver = () => isOver;

    const checkForWinner = (cellIndex) => {
        const winCond = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [0, 4, 8]
        ]

        return winCond
                .filter((condition) => condition.includes(cellIndex))
                .some((possibleWin) => possibleWin.every((i) =>
                    gameboard.getSign(i) === getActivePlayer()
                ));
    };

    return {
        playRound,
        getActivePlayer,
        reset,
        cell: gameboard.getSign,
        getIsOver
    };
})();