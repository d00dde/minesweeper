import { Field } from './Field';
import { gameState } from './GameState';
import { observer } from './observer';

export class Game {
  constructor() {
    this.fieldWrapper = document.querySelector('.field-wrapper');
    this.newGameBtn = document.querySelector('.new-game-btn');
    this.difficultySelect = document.querySelector('.difficulty-select');
    this.themeSwitch = document.querySelector('.theme-switch');
    this.startNewGame();
    this.newGameBtn.onclick = () => {
      this.startNewGame(this.difficultySelect.selectedIndex);
    };
    this.themeSwitch.onchange = (e) => {
      if(e.target.checked) {
        gameState.setTheme('dark');
        document.body.classList.add('dark');
      }
      else {
        gameState.setTheme('light');
        document.body.classList.remove('dark');
      }
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
    new Field('.field', settings);
    observer.emit('startGame');
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
