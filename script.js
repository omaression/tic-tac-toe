const Gameboard = () => {
    const board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];

    const getBoard = () => board;

    const setSign = (cellNo, player) => {
        if (board[cellNo] === "-") {
            board[cellNo] = player;
        }
    };

    const getSign = (cellNo) => board[cellNo];

    return {
        getBoard,
        setSign,
        getSign
    };
}


const GameController = (player = "X") => {
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

    return {
        playRound,
        getActivePlayer,
        cell: gameboard.getSign
    };
};


const UIController = (() => {
    let game = GameController();
    const chooseDiv = document.querySelector(".choose");
    const turnDiv = document.querySelector(".turn");
    const gameDiv = document.querySelector(".game-container");
    const fieldElements = document.querySelectorAll(".field");

    chooseDiv.addEventListener("click", (e) => {
        if (e.target.nodeName !== "BUTTON") return;

        if (e.target.id === "choiceX") {
            game = GameController("X");
        } else if (e.target.id === "choiceO") {
            game = GameController("O");
        }

        updateBoard();
        showBoard();
    });

    function updateBoard() {

        const activePlayer = game.getActivePlayer();
        turnDiv.textContent = `Player ${activePlayer}'s turn...`;

        for (let i = 0; i < fieldElements.length; i++) {
            fieldElements[i].textContent = game.cell(i);
        }
    }

    function showBoard() {
        gameDiv.classList.add("active");
        chooseDiv.classList.add("inactive");
    }

    fieldElements.forEach(field =>
        field.addEventListener("click", (e) => {
            if (e.target.textContent !== "-") return;

            game.playRound(e.target.dataset.cell);
            updateBoard();
        }));
})();