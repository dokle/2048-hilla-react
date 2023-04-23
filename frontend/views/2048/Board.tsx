import {Tile} from "Frontend/views/2048/Tile.js";
import {TileData} from "Frontend/views/2048/TileData.js";
import {useEffect, useState} from "react";
import {BoardLogic} from "Frontend/views/2048/BoardLogic.js";
import "./Board.css";

export const Board = () => {

    const boardLogic: BoardLogic = new BoardLogic();

    const [board, setBoard] = useState<TileData[][]>(boardLogic.createBoard(4));  // <--- This is the line that is causing the error
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const startNewGame = () => {
        const newBoard = boardLogic.createBoard(4);
        setBoard(newBoard);
        setScore(0);
        setGameOver(false);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case "ArrowUp":
                    const movedUp = boardLogic.moveUp(board)
                    if (boardLogic.checkForGameOver(movedUp.board)) {
                        setGameOver(true)
                    }
                    if(movedUp.moved) {
                        boardLogic.addNewTile(movedUp.board);
                        setBoard(movedUp.board);
                        setScore(score + movedUp.score)
                    }
                    break;
                case "ArrowDown":
                    const moveDown = boardLogic.moveDown(board);
                    if (boardLogic.checkForGameOver(moveDown.board)) {
                        setGameOver(true)
                    }
                    if(moveDown.moved) {
                        boardLogic.addNewTile(moveDown.board);
                        setBoard(moveDown.board);
                        setScore(score + moveDown.score)
                    }
                    break;
                case "ArrowLeft":
                    const movedLeft = boardLogic.moveLeft(board);
                    if (boardLogic.checkForGameOver(movedLeft.board)) {
                        setGameOver(true)
                    }
                    if(movedLeft.moved) {
                        boardLogic.addNewTile(movedLeft.board);
                        setBoard(movedLeft.board);
                        setScore(score + movedLeft.score)
                    }
                    break;
                case "ArrowRight":
                    const movedRight = boardLogic.moveRight(board);
                    if (boardLogic.checkForGameOver(movedRight.board)) {
                        setGameOver(true)
                    }
                    if(movedRight.moved) {
                        boardLogic.addNewTile(movedRight.board);
                        setBoard(movedRight.board);
                        setScore(score + movedRight.score)
                    }
                    break;
            }

        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [board]);

    useEffect(() => {
        if (gameOver) {
            alert('Game over!');
            startNewGame();
        }
    }, [gameOver]);

    const renderBoard = () => {
        return board.map((row: TileData[], y: number) =>
            row.map((tile: TileData, x: number) => <Tile key={`${x}-${y}`} value={tile.value} position={[x, y]}/>)
        );
    };

    return (
        <div className="game">
            <div className="score">Score: {score}</div>
            <div id="game-board" className="board">{renderBoard()}</div>
        </div>
    );
};