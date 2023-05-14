import { gameState } from './GameState';
import { observer } from './observer';
import { Component } from './Component';
import { getSettingsByIndex } from './difficulty';

export class RecordTable extends Component{
  constructor(selector) {
    super(selector);
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
        ${winners.map((winner) => `<li>Name: ${winner.name}, time: ${winner.time}, moves: ${winner.moves}, difficulty: ${getSettingsByIndex(winner.difficulty).className}</li>`).join('')}
      </ul>`;
    }
  }
}
