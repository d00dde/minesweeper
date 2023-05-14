import { gameState } from './GameState';
import { observer } from './observer';
import { settings } from './difficulty';
import { Component } from './Component';

export class Controls extends Component {
  constructor(selector) {
    super(selector);
    this.newGameBtn = this.root.querySelector('.new-game-btn');
    this.difficultySelect = this.root.querySelector('.difficulty-select');
    this.themeSwitch = this.root.querySelector('.theme-switch input');
    if(gameState.getTheme() === 'dark') {
      this.themeSwitch.checked = true;
      document.body.classList.add('dark');
    }
    this.newGameBtn.onclick = () => {
      observer.emit('startNewGame', this.difficultySelect.selectedIndex);
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

  render() {
    this.root.innerHTML = `
        <button class="new-game-btn">New game</button>
        <select class="difficulty-select">
          ${settings.map((item) => `
            <option value="${item.className}"${item.isDefault ? ' selected' : ''} selected>${item.title}</option>
          `).join('')}
        </select>
        <label class="theme-switch">
          <input type="checkbox">
          <div class="slider"></div>
        </label>
    `;
  }
}
