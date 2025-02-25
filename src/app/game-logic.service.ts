import { Injectable } from '@angular/core';
import { GameBoard } from './game-board';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {

  constructor() { }

  defaultBoard: GameBoard = {
    numRows: 5
  }

  getNewBoard(nRows: number): GameBoard {
    let gameBoard: GameBoard = {numRows: nRows};
    return gameBoard;
  }

  makeMove(from: number, to:number) {
    console.log(
      `Moved: from ${from}, to ${to}`
    )
  }
}
