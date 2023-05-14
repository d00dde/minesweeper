import '../scss/main.scss';
import { Game } from './Game';
import { Info } from './Info';
import { Modal } from './Modal';
import { RecordTable } from './RecordTable';

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
        <label class="theme-switch">
          <input type="checkbox">
          <div class="slider"></div>
        </label>
      </div>
      <div class="info"></div>
    </div>
    <div class="field-wrapper">
      <div class="field"></div>
    </div>
    <div class="footer">
      <div class="record-table"></div>
    </div>
    <div class="modal"></div>
  </div>
`);

new Info('.info');
new Game();
new Modal();
new RecordTable();
