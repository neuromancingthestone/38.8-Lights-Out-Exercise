import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn=0.25 }) {

  const genRandom = () => Math.random() >= chanceLightStartsOn;
  
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  const createBoard = () => {
    let initialBoard = Array.from({length: nrows}).map(
      r => Array.from({length: ncols}).map(
        c => genRandom()
      )
    )  

    return initialBoard;
  }

  const [board, setBoard] = useState(createBoard());
  const [score, setScore] = useState(0);

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    const check = board.every(r => r.every(c => {
      return !c;
    }))

    return check;
  }

  const flipCellsAround = (coord) => {

    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const newBoard = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard);
      flipCell(y, x + 1, newBoard);
      flipCell(y, x - 1, newBoard);
      flipCell(y + 1, x, newBoard);
      flipCell(y - 1, x, newBoard);

      setScore(score + 1);

      // TODO: return the copy
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if(hasWon()) {
    return <div>
      WINNER WINNER CHICKEN DINNER!
    </div>
  }

  // TODO

  // make table board

  return (
    <div className="board-container">
      <h2>Truth Board</h2>
      <p>Turn off all the lights!</p>
      <div className="Board">      
       {board.map((b, row) => 
          b.map((cell, col) => 
            <Cell row={row} col={col} key={col} flipCellsAroundMe={flipCellsAround} isLit={cell}/>)
        )}
      </div>
      <h1>Score is: {score}</h1>           
    </div>
  )
}

export default Board;
