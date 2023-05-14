import { gameState } from './GameState';
import { observer } from './observer';

export class RecordTable {
  constructor() {
    this.root = document.querySelector('.record-table');
    if (!this.root) {
      throw new Error('No found element for selector .record-table');
    }
    this.render();
    observer.subscribe('updateWinners', this.render.bind(this));
  }

  render() {
    const winners = gameState.getWinners();
    if(!winners.length) {
      this.root.innerHTML = 'No winners almost. Try it!';
    }
    else {
      this.root.innerHTML = `
      <ul class="winners-list">
        ${winners.map((winner) => `<li>Name: ${winner.name}, time: ${winner.time}, moves: ${winner.moves}, difficulty: ${this.getDifficultyByIndex(winner.difficulty)}</li>`).join('')}
      </ul>`;
    }
  }

  getDifficultyByIndex(index) {
    switch(index) {
    case 0: return 'Easy';
    case 1: return 'Normal';
    case 2: return 'Hard';
    }
  }

}
