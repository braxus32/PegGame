import { inject, Injectable } from '@angular/core';
import { GameBoard } from './game-board';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {

  constructor() { }

  private http = inject(HttpClient);
  private apiUrl = environment.apiURL;

  private get(addendum: string): Observable<any> {
    console.log("GET: " + this.apiUrl + addendum)
    return this.http.get(this.apiUrl + addendum);
  }

  defaultBoard: GameBoard = {
    numRows: 5
  };

  getNewBoard(nRows: number): GameBoard {
    let gameBoard: GameBoard = {numRows: nRows};
    return gameBoard;
  }

  makeMove(from: number, to:number) {
    console.log(
      `Moved: from ${from}, to ${to}`
    );
  }

  getFrameList(emptySlot: number, numRows: number): Observable<any> {
    let raw$ = this.get(`/${emptySlot}/${numRows}`);
    return raw$;
  }

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
    {"slotNum": 1, "slotState": "empty"},
    {"slotNum": 0, "slotState": "default"}
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
    {"slotNum": 4, "slotState": "empty"},
    {"slotNum": 3, "slotState": "default"}
  ],
  [
    {"slotNum": 0, "slotState": "moved"}
  ],
  [
    {"slotNum": 0, "slotState": "empty"},
    {"slotNum": 2, "slotState": "jumped"},
    {"slotNum": 5, "slotState": "moved"}
  ], 
  [
    {"slotNum": 2, "slotState": "empty"},
    {"slotNum": 5, "slotState": "default"}
  ],
  [
    {"slotNum": 6, "slotState": "moved"}
  ],
  [
    {"slotNum": 6, "slotState": "empty"},
    {"slotNum": 3, "slotState": "jumped"},
    {"slotNum": 1, "slotState": "moved"}
  ], 
  [
    {"slotNum": 3, "slotState": "empty"},
    {"slotNum": 1, "slotState": "default"}
  ],
  [
    {"slotNum": 12, "slotState": "moved"}
  ],
  [
    {"slotNum": 12, "slotState": "empty"},
    {"slotNum": 7, "slotState": "jumped"},
    {"slotNum": 3, "slotState": "moved"}
  ], 
  [
    {"slotNum": 7, "slotState": "empty"},
    {"slotNum": 3, "slotState": "default"}
  ],
  [
    {"slotNum": 1, "slotState": "moved"}
  ],
  [
    {"slotNum": 1, "slotState": "empty"},
    {"slotNum": 3, "slotState": "jumped"},
    {"slotNum": 6, "slotState": "moved"}
  ], 
  [
    {"slotNum": 3, "slotState": "empty"},
    {"slotNum": 6, "slotState": "default"}
  ],
  [
    {"slotNum": 9, "slotState": "moved"}
  ],
  [
    {"slotNum": 9, "slotState": "empty"},
    {"slotNum": 8, "slotState": "jumped"},
    {"slotNum": 7, "slotState": "moved"}
  ], 
  [
    {"slotNum": 8, "slotState": "empty"},
    {"slotNum": 7, "slotState": "default"}
  ],
  [
    {"slotNum": 6, "slotState": "moved"}
  ],
  [
    {"slotNum": 6, "slotState": "empty"},
    {"slotNum": 7, "slotState": "jumped"},
    {"slotNum": 8, "slotState": "moved"}
  ], 
  [
    {"slotNum": 7, "slotState": "empty"},
    {"slotNum": 8, "slotState": "default"}
  ],
  [
    {"slotNum": 14, "slotState": "moved"}
  ],
  [
    {"slotNum": 14, "slotState": "empty"},
    {"slotNum": 13, "slotState": "jumped"},
    {"slotNum": 12, "slotState": "moved"}
  ], 
  [
    {"slotNum": 13, "slotState": "empty"},
    {"slotNum": 12, "slotState": "default"}
  ],
  [
    {"slotNum": 11, "slotState": "moved"}
  ],
  [
    {"slotNum": 11, "slotState": "empty"},
    {"slotNum": 12, "slotState": "jumped"},
    {"slotNum": 13, "slotState": "moved"}
  ], 
  [
    {"slotNum": 12, "slotState": "empty"},
    {"slotNum": 13, "slotState": "default"}
  ],
  [
    {"slotNum": 5, "slotState": "moved"}
  ],
  [
    {"slotNum": 5, "slotState": "empty"},
    {"slotNum": 8, "slotState": "jumped"},
    {"slotNum": 12, "slotState": "moved"}
  ], 
  [
    {"slotNum": 8, "slotState": "empty"},
    {"slotNum": 12, "slotState": "default"}
  ],
  [
    {"slotNum": 13, "slotState": "moved"}
  ],
  [
    {"slotNum": 13, "slotState": "empty"},
    {"slotNum": 12, "slotState": "jumped"},
    {"slotNum": 11, "slotState": "moved"}
  ], 
  [
    {"slotNum": 12, "slotState": "empty"},
    {"slotNum": 11, "slotState": "default"}
  ],
  [
    {"slotNum": 10, "slotState": "moved"}
  ],
  [
    {"slotNum": 10, "slotState": "empty"},
    {"slotNum": 11, "slotState": "jumped"},
    {"slotNum": 12, "slotState": "moved"}
  ], 
  [
    {"slotNum": 11, "slotState": "empty"},
    {"slotNum": 12, "slotState": "default"}
  ]
]`
}
