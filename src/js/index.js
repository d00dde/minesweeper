import '../scss/main.scss';
import { Game } from './Game';
import { Info } from './Info';
import { Modal } from './Modal';
import { RecordTable } from './RecordTable';
import { Controls } from './Controls';
import { Sounds } from './Sounds';

document.body.insertAdjacentHTML('beforeend', `
  <div class="game-wrapper">
    <div class="header">
      <div class="controls"></div>
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
new Controls('.controls');
new Modal('.modal');
new RecordTable('.record-table');
new Sounds();
new Game();
