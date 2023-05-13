import { gameState } from './GameState';

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
    this.interval = setInterval(() => {
      if(gameState.getIsGameOver()) {
        return;
      }
      gameState.setTime(gameState.getTime() + 1);
      this.setTime();
    }, 1000);
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

  setMines() {
    this.mines.innerText = gameState.getMines();
  }

  setMoves() {
    this.moves.innerText = gameState.getMoves();
  }

  setIcon(className) {
    this.icon.classList.add(className);
  }

  removeIcon(className) {
    this.icon.classList.remove(className);
  }

  setTime() {
    this.time.innerText = gameState.getTime();
  }

  setMessage() {
    if(gameState.getIsGameOver()) {
      if(gameState.getIsWin()) {
        this.resultMessage.innerText = 'Win';
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
