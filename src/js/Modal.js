import { observer } from './observer';
import { Component } from './Component';

export class Modal extends Component {
  constructor(selector) {
    super(selector);
    observer.subscribe('recordWinner', this.show.bind(this));
    this.root.onclick = (e) => {
      if(!e.target.classList.contains('save-btn')) {
        return;
      }
      observer.emit('addWinner', this.root.querySelector('.winner-name').value);
      this.hide();
    };

  }

  show(message) {
    this.render(message);
    this.root.style.display = 'flex';
  }

  hide() {
    this.root.style.display = 'none';
  }

  render(message) {
    this.root.innerHTML = `
      <div class="modal-wrapper">
        <div class="content">
          <h3>${message}</h3>
          <h3>Type yuor name</h3>
          <input class='winner-name' type="text">
          <button class="save-btn">Save</button>
        </div>
      </div>
    `;
  }

}
