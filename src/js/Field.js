export class Field {
  constructor(selector, rows, columns, mines) {
    this.root = document.querySelector(selector);
    if (!this.root) {
      throw new Error(`No found element for selector ${selector}`);
    }
    this.mines = mines;
    this.isMinesSet = false;
    this.rows = rows;
    this.columns = columns;
    this.cells = this.generateCells(rows*columns);
    this.render();
    this.root.onclick = (e) => this.clickHandler(e);
    this.root.addEventListener('contextmenu', (e) => this.clickHandler(e));
  }

  generateCells(count) {
    return new Array(count).fill(0).map((_, idx) => ({
      idx,
      isOpen: false,
      isFlagged: false,
      isMine: false,
      aroundMines: 0,
    }));
  }

  render() {
    this.root.innerHTML = this.cells.map((cell) => `
      <div class="cell${cell.isOpen ? ` open count-${cell.aroundMines}` : ''}${cell.isFlagged ? ' flagged' : ''}" data-idx="${cell.idx}">${cell.isMine ? 'M' : ''}</div>
    `).join('');
  }

  clickHandler(e) {
    e.preventDefault();
    if(!e.target.classList.contains('cell')) {
      return;
    }
    const cell = this.cells.find((cell) => cell.idx.toString() === e.target.dataset.idx);
    if (e.type === 'contextmenu') {
      cell.isFlagged = !cell.isFlagged;
      this.render();
      return;
    }
    if (cell.isOpen || cell.isFlagged) {
      return;
    }
    cell.isOpen = true;
    if(!this.isMinesSet) {
      this.setMines();
    }
    this.render();
  }

  setMines() {
    const availableCells = this.cells.filter((cell) => !cell.isOpen).map((cell) => cell.idx);
    const mineCells = [];
    for(let i = this.mines; i > 0; i--) {
      const randomIndex = Math.floor(Math.random()*(availableCells.length));
      mineCells.push(availableCells[randomIndex]);
      availableCells.splice(randomIndex, 1);
    }
    mineCells.forEach((idx) => this.cells.find((cell) => cell.idx === idx).isMine = true);
    this.calculateAroundCount();
    this.isMinesSet = true;
  }

  calculateAroundCount() {
    this.cells.forEach((cell) => {
      const aroundIndexes = this.getAroundIndexes(cell.idx);
      if (cell.isMine) {
        return;
      }
      let aroundCount = 0;
      aroundIndexes.forEach((idx) => {
        const aroundCell = this.cells.find((item) => item.idx === idx);
        if(aroundCell.isMine) {
          aroundCount++;
        }
      });
      cell.aroundMines = aroundCount;
    });
  }

  getAroundIndexes(idx) {
    switch(idx) {
    case 0: return [
      1,
      this.columns,
      this.columns + 1
    ];
    case this.columns - 1: return [
      this.columns - 2,
      2*this.columns - 2,
      2*this.columns - 1
    ];
    case this.columns*(this.rows - 1): return [
      this.columns*(this.rows - 2),
      this.columns*(this.rows - 2) + 1,
      this.columns*(this.rows - 1) + 1,
    ];
    case this.columns*this.rows - 1: return [
      this.columns*(this.rows - 1) - 1,
      this.columns*(this.rows - 1) - 2,
      this.columns*this.rows - 2,
    ];
    }
    if (idx < this.columns) {
      return [idx - 1, idx + 1, idx + this.columns - 1,  idx + this.columns, idx + this.columns + 1];
    }
    if (idx > this.columns*(this.rows - 1)) {
      return [idx - 1, idx + 1, idx - this.columns - 1,  idx - this.columns, idx - this.columns + 1];
    }
    if (idx % this.columns === 0) {
      return [idx - this.columns, idx - this.columns + 1, idx + 1, idx + this.columns, idx + this.columns + 1];
    }
    if (idx % this.columns === this.columns - 1) {
      return [idx - this.columns, idx - this.columns - 1, idx - 1, idx + this.columns, idx + this.columns - 1];
    }
    return [idx - this.columns - 1, idx - this.columns, idx - this.columns + 1, idx - 1, idx + 1, idx + this.columns - 1, idx + this.columns, idx + this.columns + 1];
  }
}
