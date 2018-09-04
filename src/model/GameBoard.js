import { COLOR, OUTCOME } from '../resource/GameConstant';
import Disc from './Disc';

class GameBoard {
  constructor(context, ui) {
    this._context = context;
    this._ui = ui;
    this._ROW = 6;
    this._COLUMN = 7;
    this._COUNTERS_IN_MATCH = 4;
    this._playerActiveColumn = 0;
    this._draw = false;

    /**
     * Variable for determine the winner
     */
    this._cellValue = new Disc();
    /**
     * Grid game board state
     */
    this._grid = new Array(this._ROW).fill(null).map(() => {
      return new Array(this._COLUMN).fill(new Disc());
    });
    /**
     * Player win starting index
     */
    this._i;
    this._j;
    /**
     * Direction win (horizontal, vertical, diagonal)
     */
    this._WIN_X;
    this._WIN_Y;
    /**
     * Free cell available
     */
    this._free = new Array(this._COLUMN).fill(this._ROW);

    this._listeners = [];
  }

  newGame() {
    this._grid = new Array(this._ROW).fill(null).map(() => {
      return new Array(this._COLUMN).fill(new Disc());
    });
    this._free = new Array(this._COLUMN).fill(this._ROW);
  }

  getGrid() {
    return this._grid;
  }

  getNumRow() {
    return this._ROW;
  }

  getNumColumn() {
    return this._COLUMN;
  }

  getPlayerActiveColumn() {
    return this._playerActiveColumn;
  }

  setPlayerActiveColumn(playerActiveColumn) {
    this._playerActiveColumn = playerActiveColumn;
    this.redraw();
  }

  checkWin() {
    this._draw = true;
    if (this.horizontalCheck() || this.verticalCheck() || this.ascendingDiagonalCheck() || this.descendingDiagonalCheck()) {
      return this._cellValue.color === COLOR.BLUE ? OUTCOME.BLUE_WIN : OUTCOME.RED_WIN;
    }
    return this._draw ? OUTCOME.DRAW : OUTCOME.NOTHING;
  }

  horizontalCheck() {
    for (let i = 0; i < this._ROW; i++) {
      for (let j = 0; j < this._COLUMN - 3; j++) {
        this._cellValue = this._grid[i][j];
        if (this._cellValue.color == COLOR.WHITE) {
          this._draw = false;
        }
        if (this._cellValue.color != COLOR.WHITE && 
          this._grid[i][j + 1].color == this._cellValue.color && 
          this._grid[i][j + 2].color == this._cellValue.color && 
          this._grid[i][j + 3].color == this._cellValue.color) {
          /**
           * Horizontal check pass
           */
          this._i = i;
          this._j = j;
          this._WIN_X = 1;
          this._WIN_Y = 0;
          return true;
        }
      }
    }
    return false;
  }

  verticalCheck() {
    for (let j = 0; j < this._COLUMN; j++) {
      for (let i = 0; i < this._ROW - 3; i++) {
        this._cellValue = this._grid[i][j];
        if (this._cellValue.color == COLOR.WHITE) {
          this._draw = false;
        }
        if (this._cellValue.color != COLOR.WHITE &&
          this._grid[i + 1][j].color == this._cellValue.color &&
          this._grid[i + 2][j].color == this._cellValue.color &&
          this._grid[i + 3][j].color == this._cellValue.color) {
          /**
           * Vertical check pass
           */
          this._i = i;
          this._j = j;
          this._WIN_X = 0;
          this._WIN_Y = 1;
          return true;
        }
      }
    }
    return false;
  }

  ascendingDiagonalCheck() {
    for (let i = 3; i < this._ROW; i++) {
      for (let j = 0; j < this._COLUMN - 3; j++) {
        this._cellValue = this._grid[i][j];
        if (this._cellValue.color == COLOR.WHITE) {
          this._draw = false;
        }
        if (this._cellValue.color != COLOR.WHITE &&
          this._grid[i - 1][j + 1].color == this._cellValue.color &&
          this._grid[i - 2][j + 2].color == this._cellValue.color &&
          this._grid[i - 3][j + 3].color == this._cellValue.color) {
          /**
           * Ascending diagonal check pass
           */
          this._i = i;
          this._j = j;
          this._WIN_X = 1;
          this._WIN_Y = -1;
          return true;
        }
      }
    }
    return false;
  }

  descendingDiagonalCheck() {
    for (let i = 3; i < this._ROW; i++) {
      for (let j = 3; j < this._COLUMN; j++) {
        this._cellValue = this._grid[i][j];
        if (this._cellValue.color == COLOR.WHITE) {
          this._draw = false;
        }
        if (this._cellValue.color != COLOR.WHITE &&
          this._grid[i - 1][j - 1].color == this._cellValue.color &&
          this._grid[i - 2][j - 2].color == this._cellValue.color &&
          this._grid[i - 3][j - 3].color == this._cellValue.color) {
          /**
           * Descending diagonal check pass
           */
          this._i = i;
          this._j = j;
          this._WIN_X = -1;
          this._WIN_Y = -1;
          return true;
        }
      }
    }
    return false;
  }

  getWinDiscs() {
    const combination = [];
    for (let i = 0; i < 4; i++) {
      combination.push({x: this._j + this._WIN_X * i, y: this._i + this._WIN_Y * i});
    }
    return combination;
  }

  placeMove(column, player) {
    if (this._free[column] > 0) {
      this._grid[this._free[column] - 1][column] = player;
      this._free[column]--;
    }
  }

  undoMove(column) {
    if (this._free[column] < this._ROW) {
      this._free[column]++;
      this._grid[this._free[column] - 1][column] = new Disc();
    }
  }

  columnHeight(index) {
    return this._free[index];
  }

  checkMatch(column, row) {
    let horizontal_matches = 0;
    let vertical_matches = 0;
    let forward_diagonal_matches = 0;
    let backward_diagonal_matches = 0;
    
    // horizontal matches
    for (let i = 1; i < this._COUNTERS_IN_MATCH; i++) {
      if (this.matchingCounters(column, row, column + i, row)) {
        horizontal_matches++;
      } else {
        break;
      }
    }

    for (let i = 1; i < this._COUNTERS_IN_MATCH; i++) {
      if (this.matchingCounters(column, row, column - i, row)) {
        horizontal_matches++;
      } else {
        break;
      }
    }

    // vertical matches
    for (let i = 1; i < this._COUNTERS_IN_MATCH; i++) {
      if (this.matchingCounters(column, row, column, row + i)) {
        vertical_matches++;
      } else {
        break;
      }
    }

    for (let i = 1; i < this._COUNTERS_IN_MATCH; i++) {
      if (this.matchingCounters(column, row, column, row - i)) {
        vertical_matches++;
      } else {
        break;
      }
    }

    // backward diagonal matches ( \ )
    for (let i = 1; i < this._COUNTERS_IN_MATCH; i++) {
      if (this.matchingCounters(column, row, column + i, row - i)) {
        backward_diagonal_matches++;
      } else {
        break;
      }
    }

    for (let i = 1; i < this._COUNTERS_IN_MATCH; i++) {
      if (this.matchingCounters(column, row, column - i, row + i)) {
        backward_diagonal_matches++;
      } else {
        break;
      }
    }

    // forward diagonal matches ( / )
    for (let i = 1; i < this._COUNTERS_IN_MATCH; i++) {
      if (this.matchingCounters(column, row, column + i, row + i)) {
        forward_diagonal_matches++;
      } else {
        break;
      }
    }

    for (let i = 1; i < this._COUNTERS_IN_MATCH; i++) {
      if (this.matchingCounters(column, row, column - i, row - i)) {
        forward_diagonal_matches++;
      } else {
        break;
      }
    }

    return horizontal_matches >= this._COUNTERS_IN_MATCH - 1
            || vertical_matches >= this._COUNTERS_IN_MATCH - 1
            || forward_diagonal_matches >= this._COUNTERS_IN_MATCH - 1
            || backward_diagonal_matches >= this._COUNTERS_IN_MATCH - 1;
  }

  matchingCounters(columnA, rowA, columnB, rowB) {
    if (columnA < 0 || columnA >= this._COLUMN
      || rowA < 0 || rowA >= this._ROW
      || columnB < 0 || columnB >= this._COLUMN
      || rowB < 0 || rowB >= this._ROW) {
      return false;
    }
    
    return !(this._grid[rowA][columnA].color === COLOR.WHITE ||
      this._grid[rowB][columnB].color === COLOR.WHITE) && 
      this._grid[rowA][columnA].color === this._grid[rowB][columnB].color;
  }

  /**
   * ################
   * LISTENERS
   * ################
   */

  addListener(listener) {
    this._listeners.push(listener);
  }

  redraw() {
    this._listeners.map(listener => listener.redraw());
  }
}

export default GameBoard;