import '../scss/main.scss';
import { Game } from './Game';

document.body.insertAdjacentHTML('beforeend', `
  <div class="game-wrapper">
    <div class="header">
      <div class="controls">
        <button class="new-game-btn">New game</button>
        <select class="difficulty-select">
          <option value="easy">Easy</option>
          <option value="normal" selected>Normal</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div class="info">
        <div class="score"></div>
        <div class="icon"></div>
        <div class="time"></div>
      </div>
    </div>
    <div class="field-wrapper">
      <div class="field"></div>
    </div>
    <div class="footer"></div>
  </div>
`);

const game = new Game();
