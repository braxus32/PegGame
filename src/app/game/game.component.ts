import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameLogicService } from '../game-logic.service';
import { GameBoard } from '../game-board';

@Component({
  standalone: true,
  selector: 'app-game',
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

  gameLogicService: GameLogicService = new GameLogicService;

  gameBoard: GameBoard =this.gameLogicService.defaultBoard;

  constructor() {
    this.gameBoard = this.gameLogicService.getNewBoard();
  }

  drawBoard(numRows: number) {
    for (let row = 0; row < numRows; row++) {
      for (let peg = 0; peg < row; peg++) {

      }
    }
  }
}
