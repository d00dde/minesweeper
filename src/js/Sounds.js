import { observer } from './observer';

export class Sounds {
  constructor() {
    this.startGameSound = new Audio('assets/sound/startGame.mp3');
    this.loseGameSound = new Audio('assets/sound/loseGame.mp3');
    this.moveSound = new Audio('assets/sound/moveSound.mp3');
    observer.subscribe('startGame', this.startGameSound.play.bind(this.startGameSound));
    observer.subscribe('loseGame', this.loseGameSound.play.bind(this.loseGameSound));
    observer.subscribe('addMove', this.moveSound.play.bind(this.moveSound));
  }
}
