export class Component {
  constructor(selector) {
    this.root = document.querySelector(selector);
    if (!this.root) {
      throw new Error(`No found element for selector ${selector}`);
    }
    this.render();
  }

  render() {
    throw new Error('Method render should be implement');
  }
}
