import {TileData} from "Frontend/views/2048/TileData.js";

export class BoardLogic {

    boardMoved = (original: TileData[][], updated: TileData[][]) => {
        return (JSON.stringify(updated) !== JSON.stringify(original));
    }

    checkForGameOver = (board: TileData[][]) => {
        for (let row = 0; row < board.length; row++) {
            for (let column = 0; column < board.length; column++) {
                if (board[row][column].value === 0) {
                    return false
                }
                if (row < board.length - 1 && board[row][column].value === board[row + 1][column].value) {
                    return false;
                }
                if (column < board.length - 1 && board[row][column].value === board[row][column + 1].value) {
                    return false;
                }
            }
        }
        return true;
    };

    rotateRight = (board: TileData[][]) => {
        let result: TileData[][] = [];

        for (let c = 0; c < board.length; c++) {
            let row: TileData[] = [];
            for (let r = board.length - 1; r >= 0; r--) {
                row.push(board[r][c]);
            }
            result.push(row);
        }

        return result;
    }

    rotateLeft = (board : TileData[][]) => {
        let result: TileData[][] = [];

        for (let c = board.length - 1; c >= 0; c--) {
            let row: TileData[] = [];
            for (let r = board.length - 1; r >= 0; r--) {
                row.unshift(board[r][c]);
            }
            result.push(row);
        }

        return result;
    }

    moveUp = (inputBoard: TileData[][]) => {
        let rotatedRight = this.rotateRight(inputBoard);
        let board: TileData[][] = [];
        let score = 0;

        // Shift all numbers to the right
        for (let r = 0; r < rotatedRight.length; r++) {
            let row: TileData[] = [];
            for (let c = 0; c < rotatedRight[r].length; c++) {
                let current = rotatedRight[r][c];
                (current.value === 0) ? row.unshift(current) : row.push(current);
            }
            board.push(row);
        }

        // Combine numbers and shift to right
        for (let r = 0; r < board.length; r++) {
            for (let c = board[r].length - 1; c >= 0; c--) {
                if (board[r][c].value > 0 && board[r][c - 1] != null && board[r][c].value === board[r][c - 1].value) {
                    board[r][c].value = board[r][c].value * 2;
                    board[r][c - 1].value = 0;
                    score += board[r][c].value;
                    this.switchPosition(board[r][c], board[r][c - 1])
                } else if (board[r][c].value === 0 && board[r][c - 1] != null && board[r][c - 1].value > 0) {
                    board[r][c].value = board[r][c - 1].value;
                    board[r][c - 1].value = 0;
                    this.switchPosition(board[r][c], board[r][c - 1])
                }
            }
        }

        // Rotate board back upright
        board = this.rotateLeft(board);
        const moved = this.boardMoved(inputBoard, board);
        return {board, score, moved};
    }

    moveDown = (inputBoard: TileData[][]) => {
        let rotatedRight = this.rotateRight(inputBoard);
        let board: TileData[][] = [];
        let score = 0;

        // Shift all numbers to the left
        for (let r = 0; r < rotatedRight.length; r++) {
            let row: TileData[] = [];
            for (let c = rotatedRight[r].length - 1; c >= 0; c--) {
                let current = rotatedRight[r][c];
                (current.value === 0) ? row.push(current) : row.unshift(current);
            }
            board.push(row);
        }

        // Combine numbers and shift to left
        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board.length; c++) {
                if (board[r][c].value > 0 && board[r][c + 1] != null &&  board[r][c].value === board[r][c + 1].value) {
                    board[r][c].value = board[r][c].value * 2;
                    board[r][c + 1].value = 0;
                    this.switchPosition(board[r][c], board[r][c + 1])
                    score += board[r][c].value;
                } else if (board[r][c].value === 0 && board[r][c + 1] != null && board[r][c + 1].value > 0) {
                    board[r][c].value = board[r][c + 1].value;
                    this.switchPosition(board[r][c], board[r][c + 1])
                    board[r][c + 1].value = 0;
                }
            }
        }

        // Rotate board back upright
        board = this.rotateLeft(board);
        const moved = this.boardMoved(inputBoard, board);
        return {board, score, moved};
    }

    moveLeft = (inputBoard:  TileData[][]) => {
        let board: TileData[][] = [];
        let score = 0;

        // Shift all numbers to the left
        for (let r = 0; r < inputBoard.length; r++) {
            let row = [];
            for (let c = inputBoard[r].length - 1; c >= 0; c--) {
                let current = inputBoard[r][c];
                (current.value === 0) ? row.push(current) : row.unshift(current);
            }
            board.push(row);
        }
        // Combine numbers and shift to left
        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board.length; c++) {
                if (board[r][c].value > 0 && board[r][c + 1] != null && board[r][c].value === board[r][c + 1].value) {
                    board[r][c].value = board[r][c].value * 2;
                    board[r][c + 1].value = 0;
                    this.switchPosition(board[r][c], board[r][c + 1])
                    score += board[r][c].value;
                } else if (board[r][c].value === 0 && board[r][c + 1] != null && board[r][c + 1].value > 0) {
                    board[r][c].value = board[r][c + 1].value;
                    this.switchPosition(board[r][c], board[r][c + 1])
                    board[r][c + 1].value = 0;
                }
            }
        }
        const moved = this.boardMoved(inputBoard, board);
        return {board, score, moved};
    }

    moveRight = (inputBoard: TileData[][]) => {
        let board = [];
        let score = 0;

        // Shift all numbers to the right
        for (let r = 0; r < inputBoard.length; r++) {
            let row = [];
            for (let c = 0; c < inputBoard[r].length; c++) {
                let current = inputBoard[r][c];
                (current.value === 0) ? row.unshift(current) : row.push(current);
            }
            board.push(row);
        }

        // Combine numbers and shift to right
        for (let r = 0; r < board.length; r++) {
            for (let c = board[r].length - 1; c >= 0; c--) {
                if (board[r][c].value > 0 && board[r][c - 1] != null && board[r][c].value === board[r][c - 1].value) {
                    board[r][c].value = board[r][c].value * 2;
                    board[r][c - 1].value = 0;
                    this.switchPosition(board[r][c], board[r][c - 1])
                    score += board[r][c].value;
                } else if (board[r][c].value === 0 && board[r][c - 1] != null && board[r][c - 1].value > 0) {
                    board[r][c].value = board[r][c - 1].value;
                    board[r][c - 1].value = 0;
                    this.switchPosition(board[r][c], board[r][c - 1])
                }
            }
        }
        const moved = this.boardMoved(inputBoard, board);
        return {board, score, moved};
    }

     addNewTile = (board: TileData[][]) => {
        const emptyTiles: TileData[] = [];

        board.forEach((row) => {
            row.forEach((tile) => {
                if (tile.value === 0) {
                    emptyTiles.push(tile);
                }
            });
        });

        if (emptyTiles.length > 0) {
            const tile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            tile.value = Math.random() < 0.9 ? 2 : 4;
        }
    };
    createBoard = (size: number): TileData[][] => {
        const board: TileData[][] = [];

        for (let y = 0; y < size; y++) {
            board[y] = [];
            for (let x = 0; x < size; x++) {
                board[y][x] = { value: 0, position: [x, y]};
            }
        }

        this.addNewTile(board);
        this.addNewTile(board);

        return board;
    };

    switchPosition = (tileOne: TileData, tileTwo: TileData) => {
        const posOne = tileOne.position
        const posTwo = tileTwo.position
        tileTwo.position = posOne;
        tileOne.position = posTwo;
    }
}