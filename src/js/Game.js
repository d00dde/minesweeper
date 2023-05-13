import { Field } from './Field';
import { gameState } from './GameState';

export class Game {
  constructor(info) {
    this.info = info;
    this.fieldWrapper = document.querySelector('.field-wrapper');
    this.newGameBtn = document.querySelector('.new-game-btn');
    this.difficultySelect = document.querySelector('.difficulty-select');
    this.startNewGame();
    this.newGameBtn.onclick = () => {
      this.startNewGame(this.difficultySelect.selectedIndex);
    };
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
      settings = this.getGameSettingsByIndex(index);
    }
    else {
      const difficulty = gameState.getDifficulty();
      settings = this.getGameSettingsByIndex(difficulty);
    }
    this.render(settings.className);
    new Field(this.info,'.field', settings);
    this.info.setMoves();
    this.info.setTime();
    this.info.setMessage();
  }

  getGameSettingsByIndex(index) {
    const settings = [
      { rows: 5, columns: 5, mines: 2, className: 'easy' },
      { rows: 10, columns: 10, mines: 10, className: 'normal' },
      { rows: 20, columns: 20, mines: 70, className: 'hard' },
    ];
    return settings[index];
  }
}
