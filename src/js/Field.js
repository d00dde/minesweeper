import { gameState } from './GameState';
import { observer } from './observer';
import { Component } from './Component';

export class Field extends Component{
  constructor(selector, settings) {
    super(selector);
    this.mines = settings.mines;
    this.isMinesSet = false;
    this.rows = settings.rows;
    this.columns = settings.columns;
    this.currentTarget = null;
    const savedState = gameState.getFieldState();
    if(savedState) {
      this.cells = savedState;
      this.isMinesSet = true;
    }
    else {
      this.cells = this.generateCells(this.rows*this.columns);
    }
    this.render();
    this.setMinesInfo();
    this.root.addEventListener('mousedown', (e) => this.mousedownHelper(e));
    this.root.addEventListener('mouseup', (e) => this.clickHandler(e));
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
    this.root.innerHTML = this.cells.map((cell) => {
      let cellClasses = cell.isOpen ? ` open count-${cell.aroundMines}` : '';
      if(cell.isFlagged) {
        cellClasses += ' flagged';
      }
      if(cell.isMine && (cell.isOpen || gameState.getIsGameOver())) {
        cellClasses += ' mine';
      }
      return `<div class="cell${cellClasses}" data-idx="${cell.idx}"></div>`;
    }).join('');
  }

  clickHandler(e) {
    e.preventDefault();
    if(gameState.getIsGameOver()) {
      return;
    }
    if(!e.target.classList.contains('cell')) {
      return;
    }
    observer.emit('changeIcon', 'wait');
    if(this.currentTarget !== e.target) {
      this.currentTarget = null;
      return;
    }
    this.currentTarget = null;
    const cell = this.cells.find((cell) => cell.idx.toString() === e.target.dataset.idx);
    if (e.type === 'contextmenu') {
      if (!cell.isOpen) {
        cell.isFlagged = !cell.isFlagged;
        gameState.setFieldState(this.cells);
        this.setMinesInfo();
        this.render();
      }
      return;
    }
    if (cell.isOpen || cell.isFlagged) {
      return;
    }
    cell.isOpen = true;
    if(!this.isMinesSet) {
      this.setMines();
    }
    if(cell.aroundMines === 0) {
      this.openAround(cell.idx);
    }
    if(cell.isMine) {
      observer.emit('loseGame');
    }
    gameState.setFieldState(this.cells);
    this.addMove();
    this.checkWin();
    this.render();
  }

  mousedownHelper(e) {
    this.currentTarget = e.target;
    if(gameState.getIsGameOver()) {
      return;
    }
    observer.emit('changeIcon', 'try');
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
        cell.aroundMines = 9;
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

  openAround(index) {
    const aroundIndexes = this.getAroundIndexes(index);
    aroundIndexes.forEach((idx) => {
      const cell = this.cells.find((item) => item.idx === idx);
      if (cell.aroundMines === 0 && !cell.isOpen) {
        cell.isOpen = true;
        cell.isFlagged = false;
        this.openAround(cell.idx);
      }
      else {
        cell.isOpen = true;
        cell.isFlagged = false;
      }
    });
  }

  setMinesInfo() {
    const flaggedCount = this.cells.filter((cell) => cell.isFlagged).length;
    observer.emit('setMines', this.mines - flaggedCount);
  }

  addMove() {
    observer.emit('addMove');
  }

  checkWin() {
    const openedCount = this.cells.filter((cell) => cell.isOpen).length;
    if(openedCount >= (this.cells.length - this.mines) && !gameState.getIsGameOver()) {
      observer.emit('winGame');
    }
  }
}
