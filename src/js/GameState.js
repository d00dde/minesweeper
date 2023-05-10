export class GameState {
  constructor() {
    this.startGame();
  }

  startGame() {
    this._isGameOver = false;
    this._isWin = false;
  }

  winGame() {
    this._isGameOver = true;
    this._isWin = true;
  }

  loseGame() {
    this._isGameOver = true;
    this._isWin = false;
  }

  getIsWin() {
    return this._isWin;
  }

  getIsGameOver() {
    return this._isGameOver;
  }
}

export const gameState = new GameState();
