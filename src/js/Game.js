import { Field } from './Field';

export class Game {
  constructor() {
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

  startNewGame(index = 1) {
    const { rows, columns, mines, className} = this.getGameSettingsByIndex(index);
    this.render(className);
    this.field = new Field('.field', rows, columns, mines);
  }

  getGameSettingsByIndex(index) {
    const settings = [
      { rows: 5, columns: 5, mines: 5, className: 'easy' },
      { rows: 10, columns: 10, mines: 10, className: 'normal' },
      { rows: 20, columns: 20, mines: 70, className: 'hard' },
    ];
    return settings[index];
  }
}
