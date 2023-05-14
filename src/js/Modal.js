import { observer } from './observer';
import { Component } from './Component';

export class Modal extends Component {
  constructor(selector) {
    super(selector);
    observer.subscribe('recordWinner', this.show.bind(this));
    this.root.classList.add('close');
    this.root.onclick = (e) => {
      if(e.target.classList.contains('close')) {
        this.hide();
      }
      if(!e.target.classList.contains('save-btn')) {
        return;
      }
      observer.emit('addWinner', this.root.querySelector('.winner-name').value);
      this.hide();
    };

  }

  show(content) {
    this.render(content);
    this.root.style.display = 'flex';
  }

  hide() {
    this.root.style.display = 'none';
    this.root.innerHTML = '';
  }

  render(content) {
    this.root.innerHTML = `
      <div class="modal-wrapper">
        <div class="content">${content}</div>
      </div>
    `;
  }

}
