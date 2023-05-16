import { Field } from './Field';
import { gameState } from './GameState';
import { observer } from './observer';
import { getSettingsByIndex } from './difficulty';

export class Game {
  constructor(startGameSound) {
    this.lol = startGameSound;
    this.fieldWrapper = document.querySelector('.field-wrapper');
    this.startNewGame();
    observer.subscribe('startNewGame', this.startNewGame.bind(this));
  }

  render(difficulty) {
    this.fieldWrapper.innerHTML = `
      <div class="field ${difficulty}"></div>
    `;
  }

  startNewGame(index) {
    let settings;
    if(index !== undefined) {
      gameState.startGame();
      gameState.setDifficulty(index);
      settings = getSettingsByIndex(index);
    }
    else {
      const difficulty = gameState.getDifficulty();
      settings = getSettingsByIndex(difficulty);
    }
    this.render(settings.className);
    new Field('.field', settings);
    observer.emit('startGame');
  }
}
