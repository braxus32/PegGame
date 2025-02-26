import { Attribute, Component, HostBinding, Inject, Renderer2, ElementRef, ViewChild, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameLogicService } from '../game-logic.service';
import { GameBoard } from '../game-board';
import { forwardRef } from "@angular/core";
import { PegHole } from '../peg-hole';

@Component({
  standalone: true,
  selector: 'app-game',
  imports: [CommonModule, forwardRef(() => PegComponent), forwardRef(() => PegHoleComponent)],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

  gameLogicService: GameLogicService = new GameLogicService;

  gameBoard: GameBoard = this.gameLogicService.defaultBoard;

  numPegHoles: number = 0;

  pegHoleList: PegHole[] = [];

  curHole: number = 0;

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
    console.log(slotNum);
  }

  updateNumRows(e: Event) {
    let target = e.target as HTMLInputElement;
    this.gameBoard = this.gameLogicService.getNewBoard(Number(target.value));
    this.calcNumHoles();
    this.createPegHoles();
  }

  dummy() {
    console.log("U DUMB");
  }
}

@Component({
  selector: 'app-peg',
  imports: [],
  template: '<div class="dot">{{num}}</div>',
  styleUrl: './game.component.css'
})
export class PegComponent {
  
  @Input() num: number = -1;

}

@Component({
  selector: 'app-peg-hole',
  imports:[],
  template: `
    <div class="peg-hole"><button (click)="holeClicked()"></button></div>
    <script>
      const el = document.getElementByClass(PegHoleComponent);
      const rect = el.getBoundingClientRect();
      this.offsetLeft = rect.left;
      this.offsetTop = rect.top;
    </script>
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
    console.log("Updated");
  }

  ngOnChange() {
    
  }

  holeClicked() {
    this.gameComponent?.slotClicked(this.pegHole.num);
  }

  
  adjustWidth() {
    

  }

}