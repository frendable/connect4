import Disc from '../model/Disc';
import { COLOR, OUTCOME } from '../resource/GameConstant';

class InGame {
  constructor(context, ui, gameBoard) {
    this._context = context;
    this._ui = ui;
    this._gameBoard = gameBoard;
  }

  renderGameOver() {
    let MSG = '';
    switch(this._context.getGameState().getOutcome()) {
      case OUTCOME.DRAW:
        MSG = 'GAME DRAW !';
        break;
      case OUTCOME.BLUE_WIN:
        MSG = `PLAYER ${this._context.getGameState().getPlayerBlue()} ${COLOR.BLUE} WIN !`;
        this.renderStar(this._gameBoard.getWinDiscs());
        break;
      case OUTCOME.RED_WIN:
        MSG = `PLAYER ${this._context.getGameState().getPlayerRed()} ${COLOR.RED} WIN !`;    
        this.renderStar(this._gameBoard.getWinDiscs());
        break;
    }

    this._ui.cursor.goto((this._ui.center.x - MSG.length / 2) + 6, this._ui.center.y - 10);
    this._ui.cursor.red();
    this._ui.cursor.bold();
    this._ui.write(MSG);
  
    this._ui.cursor.hex('#f65590');
    const RETRY = 'Press [space] to play again';
    this._ui.cursor.goto((this._ui.center.x - RETRY.length / 2) + 6, this._ui.center.y - 8);
    this._ui.write(RETRY);
    this._ui.cursor.reset();
  }

  renderStar(winDiscs) {
    winDiscs.map(discCoordinat => {
      this._ui.cursor.goto(this._ui.center.x + (discCoordinat.x * 2), this._ui.center.y + discCoordinat.y);
      this._ui.cursor.hex('#ffffff');
      this._ui.write(`•`);
      this._ui.cursor.reset();
    });

    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      winDiscs.map(discCoordinat => {
        this._ui.cursor.goto(this._ui.center.x + (discCoordinat.x * 2), this._ui.center.y + discCoordinat.y);
        const color = this._context.getGameState().getOutcome() === OUTCOME.BLUE_WIN ? Disc.getHexColorWithParam(COLOR.BLUE) : Disc.getHexColorWithParam(COLOR.RED);
        this._ui.cursor.hex(color);
        this._ui.write(`•`);
        this._ui.cursor.reset();
      });
      clearTimeout(this._timer);
      this._timer = setTimeout(() => {
        this.renderStar(winDiscs);
      }, 500)
    }, 500);
  }

  resetTimer() {
    clearTimeout(this._timer);
  }

  renderGame() {
    this._ui.clear();
    this.resetTimer();
    this.renderPlayerState();
    this.renderBoard();
    this.renderLine();
  }

  renderPlayerState() {
    const xPosition = this._ui.center.x + (this._gameBoard.getPlayerActiveColumn() * 2);
    this._ui.cursor.goto(xPosition - 2, this._ui.center.y - 2);
    this._ui.write(' ');
    this._ui.cursor.goto(xPosition + 2, this._ui.center.y - 2);
    this._ui.write(' ');

    this._ui.cursor.goto(xPosition, this._ui.center.y - 2);
    this._ui.cursor.hex(Disc.getHexColorWithParam(this._context.getTurnState().getColor()));
    this._ui.write('•');
    this._ui.cursor.reset();
  }

  renderLine() {
    this._ui.cursor.reset();
    /**
     * Render upper line
     */
    this._ui.line({
      x: this._ui.center.x - 2,
      y: this._ui.center.y - 1,
    }, {
      x: this._ui.center.x + (this._gameBoard.getNumColumn() * 2) + 1,
      y: this._ui.center.y - 1,
    });

    /**
     * Render down line
     */
    this._ui.line({
      x: this._ui.center.x - 2,
      y: this._ui.center.y + this._gameBoard.getNumRow(),
    }, {
      x: this._ui.center.x + (this._gameBoard.getNumColumn() * 2) + 1,
      y: this._ui.center.y + this._gameBoard.getNumRow(),
    });

    /**
     * Render left line
     */
    this._ui.line({
      x: this._ui.center.x - 2,
      y: this._ui.center.y,
    }, {
      x: this._ui.center.x - 1,
      y: this._ui.center.y + this._gameBoard.getNumRow(),
    });
    
    /**
     * Render right line
     */
    this._ui.line({
      x: this._ui.center.x + (this._gameBoard.getNumColumn() * 2),
      y: this._ui.center.y,
    }, {
      x: this._ui.center.x + (this._gameBoard.getNumColumn() * 2) + 1,
      y: this._ui.center.y + this._gameBoard.getNumRow(),
    });
    this._ui.cursor.reset();
  }

  renderBoard() {
    /**
     * Render board based on gameboard grid state
     */
    this._ui.cursor.goto(this._ui.center.x, this._ui.center.y);
    this._ui.cursor.bold();
    const grid = this._gameBoard.getGrid();
    for (let i = 0; i < this._gameBoard.getNumRow(); i++) {
      for (let j = 0; j < this._gameBoard.getNumColumn(); j++) {
        this._ui.cursor.hex(grid[i][j].getHexColor());
        this._ui.cursor.bold();
        this._ui.write(`${grid[i][j].getShape()} `);
      }
      this._ui.cursor.goto(this._ui.center.x, this._ui.center.y+i+1);
    }
    this._ui.cursor.reset();
  }

  redraw() {
    if (this._context.getGameState().getOutcome() !== OUTCOME.NOTHING) {
      //Gameover
      this.renderGameOver();
    } else {
      this.renderPlayerState();
      this.renderLine();
      this.renderBoard();
    }
  }
}

export default InGame;