import { Attribute, Component, HostBinding, Inject, Renderer2, ElementRef, ViewChild, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { forwardRef } from "@angular/core";
import { GameLogicService } from '../game-logic.service';
import { GameBoard } from '../game-board';
import { PegHole } from '../peg-hole';
import { SolutionExplorerComponent } from '../solution-explorer/solution-explorer.component';
import { map } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-game',
  imports: [CommonModule, SolutionExplorerComponent, forwardRef(() => PegHoleComponent)],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

  gameLogicService: GameLogicService = new GameLogicService;

  gameBoard: GameBoard = this.gameLogicService.defaultBoard;

  numPegHoles: number = 0;

  pegHoleList: PegHole[] = [];

  isDisabled: boolean | undefined;

  slotSelected: number = 0;

  frameList: object | undefined;

  maxAlgStepDelay: number = 1000;
  algStepDelay: number = 1000;

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

  async runAlg() {
    this.disableSettingsForm();
    for (let pegHole of this.pegHoleList) {
      if (pegHole.num != this.slotSelected) {
        pegHole.state = 'default';
      } else {
        pegHole.state = 'empty';
      }
    }

    let response$ = this.gameLogicService.getFrameList(this.slotSelected, this.gameBoard.numRows);
    response$.pipe(map(res => res.map((nums: any[]) =>
      JSON.parse(`[
        [
          {"slotNum": ${nums[0]}, "slotState": "moved"}
        ],
        [
          {"slotNum": ${nums[0]}, "slotState": "empty"},
          {"slotNum": ${nums[1]}, "slotState": "jumped"},
          {"slotNum": ${nums[2]}, "slotState": "moved"}
        ],
        [
          {"slotNum": ${nums[1]}, "slotState": "empty"},
          {"slotNum": ${nums[2]}, "slotState": "default"}
        ]
      ]`)))
    ).subscribe(async processedFrameList => {
      for (const frameTrip of processedFrameList) {
        for (const frame of frameTrip) {
          this.algStep(frame);
          await this.delay();
        }
      }
    });
  }

  async algStep(frame: any) {
    for (const action of frame) {
      const updatedSlot = action.slotNum;
      const slotAction = action.slotState;
      this.pegHoleList[updatedSlot].state = slotAction;
      console.log(`Action: ${updatedSlot} ${slotAction}`);
    }
    console.log("Post loop");
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, this.algStepDelay));
  }

  updateAlgSpeed(e: Event) {
    const target = e.target as HTMLInputElement;
    const delayMod = Number(target.value) / 100;
    this.algStepDelay = this.maxAlgStepDelay * (1/delayMod);
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
      @case ('moved') {<div class="dot" style="background-color: mediumorchid;"></div>}
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

  sqrt3 = Math.sqrt(3);

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    const self = this.elementRef.nativeElement;
    const height = self.offsetHeight;
    const xOffset = this.sqrt3 * (height / 2);
    this.renderer.setStyle(self, 'width', `${height}px`);
    // this.renderer.setStyle(self.parentElement, 'margin-top', `${-xOffset}px`);

    const rect = self.getBoundingClientRect();
    this.offsetLeft = rect.left;
    this.offsetTop = rect.top;
  }

  holeClicked() {
    this.gameComponent?.slotClicked(this.pegHole.num);
    this.pegHole.state = 'selected';
  }
}