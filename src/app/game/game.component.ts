import { Attribute, Component, HostBinding, Inject, Renderer2, ElementRef, ViewChild, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameLogicService } from '../game-logic.service';
import { GameBoard } from '../game-board';
import { forwardRef } from "@angular/core";
import { PegHole } from '../peg-hole';

@Component({
  standalone: true,
  selector: 'app-game',
  imports: [CommonModule, forwardRef(() => PegHoleComponent)],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

  gameLogicService: GameLogicService = new GameLogicService;

  gameBoard: GameBoard = this.gameLogicService.defaultBoard;

  numPegHoles: number = 0;

  pegHoleList: PegHole[] = [];

  curHole: number = 0;

  isDisabled: boolean | undefined;

  slotSelected: number = 0;

  constructor() {
    this.calcNumHoles();
    this.createPegHoles();
  }

  calcNumHoles() {
    let rows = this.gameBoard.numRows;
    this.numPegHoles = ((rows*(rows+1))/2);
  }

  createPegHoles() {
    const tempList: PegHole[] = []
    for (let hole = 0; hole < this.numPegHoles; hole++) {
      const pegHole: PegHole = {
        num: hole,
        isOccupied: false,
        state: 'button',
      }
      tempList.push(pegHole);
    }

    this.pegHoleList = tempList;
  }

  getNextHole() { //for some reason this method runs twice even when pegHoleList is not updated
    let nextHole = this.pegHoleList[this.curHole];

    if (this.curHole === this.pegHoleList.length - 1) {
      this.curHole = 0;
    } else {
      this.curHole += 1;
    }
    return nextHole;
  }

  slotClicked(slotNum: number) {
    if (this.slotSelected !== undefined) {
      this.pegHoleList[this.slotSelected].state = 'button';
    }
    this.slotSelected = slotNum;
  }

  updateNumRows(e: Event) {
    const target = e.target as HTMLInputElement;
    const newNumRows = Number(target.value);
    if (2 < newNumRows && newNumRows < 51) {
      this.gameBoard = this.gameLogicService.getNewBoard(newNumRows);
      this.calcNumHoles();
      this.createPegHoles();
    }
  }

  runAlg() {
    this.disableSettingsForm();
    for (let pegHole of this.pegHoleList) {
      if (pegHole.num != this.slotSelected) {
        pegHole.state = 'default';
      } else {
        pegHole.state = 'empty';
      }
    }


  }

  disableSettingsForm() {
    this.isDisabled = true;
  }

  resetGame() {
    window.location.reload();
  }
}

@Component({
  selector: 'app-peg-hole',
  imports:[],
  template: `
    <div class="peg-hole">
    @switch (pegHole.state) {
      @case ('button') {<button (click)="holeClicked()"></button>}
      @case ('selected') {<button style="background-color: dimgray;" disabled></button>}
      @case ('empty') {<div class="dot" style="background-color: dimgray;"></div>}
      @default {<div class="dot" style="background-color: mediumseagreen;"></div>}
      @case ('jumped') {<div class="dot" style="background-color: firebrick;"></div>}
      @case ('moved') {<div class="dot" style="background-color: dodgerblue;"></div>}
    }
    
    </div>
  `,
  styleUrl: './game.component.css'
})
export class PegHoleComponent implements OnChanges {

  @Input() pegHole!: PegHole; 
   
  @Input() gameComponent!: GameComponent;

  offsetLeft: number | undefined;
  offsetTop: number | undefined;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    const self = this.elementRef.nativeElement;
    const height = self.offsetHeight;
    this.renderer.setStyle(self, 'width', `${height}px`);

    const rect = self.getBoundingClientRect();
    this.offsetLeft = rect.left;
    this.offsetTop = rect.top;
  }

  holeClicked() {
    this.gameComponent?.slotClicked(this.pegHole.num);
    this.pegHole.state = 'selected';
  }
}