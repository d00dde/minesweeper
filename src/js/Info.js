import { gameState } from './GameState';
import {observer} from './observer';

export class Info {
  constructor(selector) {
    this.root = document.querySelector(selector);
    this.render();
    this.moves = this.root.querySelector('.moves');
    this.icon = this.root.querySelector('.icon');
    this.mines = this.root.querySelector('.mines');
    this.time = this.root.querySelector('.time');
    this.resultMessage = this.root.querySelector('.result-message');
    this.setMines();
    this.setMoves();
    this.setIcon();
    setInterval(() => {
      if(gameState.getIsGameOver()) {
        return;
      }
      gameState.setTime(gameState.getTime() + 1);
      this.setTime();
    }, 1000);

    observer.subscribe('winGame', this.refresh.bind(this));
    observer.subscribe('loseGame', this.refresh.bind(this));
    observer.subscribe('startGame', this.refresh.bind(this));
    observer.subscribe('changeIcon', this.setIcon.bind(this));
    observer.subscribe('addMove', this.setMoves.bind(this));
    observer.subscribe('setMines', this.setMines.bind(this));
  }

  render() {
    this.root.innerHTML = `
      <div class="moves"></div>
      <div class="icon"></div>
      <div class="mines"></div>
      <div class="time"></div>
      <div class="result-message"></div>
    `;
  }

  refresh() {
    this.setMoves();
    this.setTime();
    this.setMessage();
    this.setIcon();
  }

  setMines() {
    this.mines.innerText = gameState.getMines();
  }

  setMoves() {
    this.moves.innerText = gameState.getMoves();
  }

  setIcon() {
    this.icon.classList = `icon ${gameState.getIcon()}`;
  }

  setTime() {
    this.time.innerText = gameState.getTime();
  }

  setMessage() {
    if(gameState.getIsGameOver()) {
      if(gameState.getIsWin()) {
        this.resultMessage.innerText = `Is win by ${gameState.getMoves()} steps in ${gameState.getTime()} seconds`;
      }
      else {
        this.resultMessage.innerText = 'Lose';
      }
    }
    else {
      this.resultMessage.innerText = '';
    }
  }
}
