import { GameComponent } from "./game/game.component";

export interface PegHole {
    num: number;
    isOccupied: boolean;
    state: string;
    height: number;
}