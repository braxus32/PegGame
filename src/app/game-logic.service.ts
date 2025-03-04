import { Injectable } from '@angular/core';
import { GameBoard } from './game-board';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {

  constructor() { }

  defaultBoard: GameBoard = {
    numRows: 5
  };

  defaultFrameList: string = `[
    [
      {"slotNum": 3, "slotState": "moved"}
    ],
    [
      {"slotNum": 3, "slotState": "empty"},
      {"slotNum": 1, "slotState": "jumped"},
      {"slotNum": 0, "slotState": "moved"}
    ],
    [
      {"slotNum": 5, "slotState": "moved"}
    ],
    [
      {"slotNum": 5, "slotState": "empty"},
      {"slotNum": 4, "slotState": "jumped"},
      {"slotNum": 3, "slotState": "moved"}
    ],
    [
      {"slotNum": 0, "slotState": "moved"}
    ],
    [
      {"slotNum": 0, "slotState": "empty"},
      {"slotNum": 2, "slotState": "jumped"},
      {"slotNum": 5, "slotState": "moved"}
    ]
  ]`;

  getNewBoard(nRows: number): GameBoard {
    let gameBoard: GameBoard = {numRows: nRows};
    return gameBoard;
  }

  makeMove(from: number, to:number) {
    console.log(
      `Moved: from ${from}, to ${to}`
    );
  }

  getFrameList(emptySlot: number): object {
    const frameList = JSON.parse(this.defaultFrameList);
    return frameList;
  }
}
