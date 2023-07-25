function Gameboard () {
    const board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];

    const getBoard = () => board;

    const putSign = (cell, player) => {
        if (cell.textContent === "-") {
            cell.textContent = player;
        }
    };

    const printBoard = () => {
        console.log(board);
    };

    return {
        getBoard,
        putSign,
        printBoard
    };
}