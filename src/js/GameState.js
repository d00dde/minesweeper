import { observer } from './observer';

export class GameState {
  constructor() {
    observer.subscribe('winGame', this.winGame.bind(this));
    observer.subscribe('loseGame', this.loseGame.bind(this));
    observer.subscribe('changeIcon', this.setIcon.bind(this));
    observer.subscribe('addMove', this.addMove.bind(this));
    observer.subscribe('setMines', this.setMines.bind(this));
  }

  startGame() {
    localStorage.setItem('_isGameOver', 'false');
    localStorage.setItem('_isWin', 'false');
    localStorage.setItem('_time', '0');
    localStorage.setItem('_icon', 'wait');
    localStorage.removeItem('_fieldState');
    localStorage.removeItem('_moves');
    localStorage.removeItem('_mines');
    localStorage.removeItem('_difficulty');
  }

  winGame() {
    localStorage.setItem('_isGameOver', 'true');
    localStorage.setItem('_isWin', 'true');
    this.setIcon('win');
  }

  loseGame() {
    localStorage.setItem('_isGameOver', 'true');
    localStorage.setItem('_isWin', 'false');
    this.setIcon('dead');
  }

  setFieldState(state) {
    localStorage.setItem('_fieldState', JSON.stringify(state));
  }

  getFieldState() {
    const data = localStorage.getItem('_fieldState');
    return data ? JSON.parse(data) : data;
  }

  getIsWin() {
    const storageValue = localStorage.getItem('_isWin');
    return !(storageValue === 'false' || !storageValue);

  }

  getIsGameOver() {
    const storageValue = localStorage.getItem('_isGameOver');
    return !(storageValue === 'false' || !storageValue);

  }

  setMines(mines) {
    localStorage.setItem('_mines', mines);
  }

  addMove() {
    const moves = localStorage.getItem('_moves') ?? '0';
    localStorage.setItem('_moves', (+moves + 1).toString());
  }

  getMoves() {
    return localStorage.getItem('_moves') ?? '0';
  }

  getMines() {
    return localStorage.getItem('_mines') ?? '0';
  }

  setTime(time) {
    localStorage.setItem('_time', time);
  }

  getTime() {
    return +localStorage.getItem('_time') ?? 0;
  }

  setDifficulty(difficulty) {
    localStorage.setItem('_difficulty', difficulty);
  }

  getDifficulty() {
    return +localStorage.getItem('_difficulty') ?? 1;
  }

  setIcon(icon) {
    localStorage.setItem('_icon', icon);
  }

  getIcon() {
    return localStorage.getItem('_icon') ?? 'wait';
  }

}

export const gameState = new GameState();
