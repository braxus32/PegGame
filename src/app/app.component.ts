import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [GameComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Main';
}
