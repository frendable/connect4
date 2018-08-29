import { COLOR, OUTCOME } from '../resource/GameConstant';

class GameBoard {
  constructor(context, ui) {
    this._context = context;
    this._ui = ui;
    this._ROW = 6;
    this._COLUMN = 7;
    this._COUNTERS_IN_MATCH = 4;

    this._draw = false;
    this._cellValue = false;
    this._grid = [];
    for (let i = 0; i < this._ROW; i++) {
      for (let j = 0; j < this._COLUMN; j++) {
        if (this._grid[i] === undefined) {
          this._grid[i] = [];
        }
        this._grid[i][j] = 'o';
      }
    }
    this._p;
    this._q;
    this._WIN_X;
    this._WIN_Y;
    this._free;
  }

  CheckWin() {
    this._draw = true;
    this._cellValue = 0;
    if (HorizontalCheck() || VerticalCheck() || AscendingDiagonalCheck() || DescendingDiagonalCheck()) {
      return this._cellValue === COLOR.BLUE ? OUTCOME.BLUE_WIN : OUTCOME.RED_WIN;
    }
    return this._draw ? OUTCOME.DRAW : OUTCOME.NOTHING;
  }

  HorizontalCheck() {
    for (let i = 0; i < this._ROW; i++) {
      for (let j = 0; j < this._COLUMN - 3; j++) {
          this._cellValue = this._grid[i][j];
          if (this._cellValue == 0) {
            this._draw = false;
          }
          if (this._cellValue != 0 && this._grid[i][j + 1] == this._cellValue && this._grid[i][j + 2] == this._cellValue && this._grid[i][j + 3] == this._cellValue) {
            console.log('Horizontal check pass');
            this._p = i;
            this._q = j;
            this._WIN_X = 1;
            this._WIN_Y = 0;
            return true;
          }
      }
    }
    return false;
  }

  VerticalCheck() {
    for (let j = 0; j < this._COLUMN; j++) {
      for (let i = 0; i < this._ROW - 3; i++) {
          this._cellValue = this._grid[i][j];
          if (this._cellValue == 0) {
            this._draw = false;
          }
          if (this._cellValue != 0 && this._grid[i + 1][j] == this._cellValue && this._grid[i + 2][j] == this._cellValue && this._grid[i + 3][j] == this._cellValue) {
            console.log('Vertical check pass');
            this._p = i;
            this._q = j;
            this._WIN_X = 0;
            this._WIN_Y = 1;
            return true;
          }
      }
    }
    return false;
  }

  AscendingDiagonalCheck() {
    for (let i = 3; i < this._ROW; i++) {
      for (let j = 0; j < this._COLUMN - 3; j++) {
        this._cellValue = this._grid[i][j];
        if (this._cellValue == 0) {
          this._draw = false;
        }
        if (this._cellValue != 0 && this._grid[i - 1][j + 1] == this._cellValue && this._grid[i - 2][j + 2] == this._cellValue && this._grid[i - 3][j + 3] == this._cellValue) {
          console.log('Ascending Diagonal check pass');
          this._p = i;
          this._q = j;
          this._WIN_X = 1;
          this._WIN_Y = -1;
          return true;
        }
      }
    }
    return false;
  }

  DescendingDiagonalCheck() {
    for (let i = 3; i < this._ROW; i++) {
      for (let j = 3; j < this._COLUMN; j++) {
          this._cellValue = this._grid[i][j];
          if (this._cellValue == 0) {
            this._draw = false;
          }
          if (this._cellValue != 0 && this._grid[i - 1][j - 1] == this._cellValue && this._grid[i - 2][j - 2] == this._cellValue && this._grid[i - 3][j - 3] == this._cellValue) {
            console.log('Descending Diagonal check pass');
            this._p = i;
            this._q = j;
            this._WIN_X = -1;
            this._WIN_Y = -1;
            return true;
          }
      }
    }
    return false;
  }

  GetWinDiscs(cells) {
    const combination = [];
    for (let i = 0; i < 4; i++) {
      combination.push(cells[this._p + this._WIN_Y * i][this._q + this._WIN_X * i]);
    }
    return combination;
  }

  PlaceMove(column, player) {
    if (this._free[column] > 0) {
      this._grid[this._free[column] - 1][column] = player;
      this._free[column]--;
    }
  }

  ColumnHeight(index) {
    return this._free[index];
  }

  CheckMatch(column, row) {
    let horizontal_matches = 0;
    let vertical_matches = 0;
    let forward_diagonal_matches = 0;
    let backward_diagonal_matches = 0;

    // horizontal matches
    for (let i = 1; i < COUNTERS_IN_MATCH; i++) {
      if (matchingCounters(column, row, column + i, row)) {
        horizontal_matches++;
      } else {
        break;
      }
    }

    for (let i = 1; i < COUNTERS_IN_MATCH; i++) {
      if (matchingCounters(column, row, column - i, row)) {
        horizontal_matches++;
      } else {
        break;
      }
    }

    // vertical matches
    for (let i = 1; i < COUNTERS_IN_MATCH; i++) {
      if (matchingCounters(column, row, column, row + i)) {
        vertical_matches++;
      } else {
        break;
      }
    }

    for (let i = 1; i < COUNTERS_IN_MATCH; i++) {
      if (matchingCounters(column, row, column, row - i)) {
        vertical_matches++;
      } else {
        break;
      }
    }

    // backward diagonal matches ( \ )
    for (let i = 1; i < COUNTERS_IN_MATCH; i++) {
      if (matchingCounters(column, row, column + i, row - i)) {
        backward_diagonal_matches++;
      } else {
        break;
      }
    }

    for (let i = 1; i < COUNTERS_IN_MATCH; i++) {
      if (matchingCounters(column, row, column - i, row + i)) {
        backward_diagonal_matches++;
      } else {
        break;
      }
    }

    // forward diagonal matches ( / )
    for (let i = 1; i < COUNTERS_IN_MATCH; i++) {
      if (matchingCounters(column, row, column + i, row + i)) {
        forward_diagonal_matches++;
      } else {
        break;
      }
    }

    for (let i = 1; i < COUNTERS_IN_MATCH; i++) {
      if (matchingCounters(column, row, column - i, row - i)) {
        forward_diagonal_matches++;
      } else {
        break;
      }
    }

    return horizontal_matches >= COUNTERS_IN_MATCH - 1
            || vertical_matches >= COUNTERS_IN_MATCH - 1
            || forward_diagonal_matches >= COUNTERS_IN_MATCH - 1
            || backward_diagonal_matches >= COUNTERS_IN_MATCH - 1;
  }

  matchingCounters(columnA, rowA, columnB, rowB) {
    if (columnA < 0 || columnA >= this._COLUMN
      || rowA < 0 || rowA >= this._ROW
      || columnB < 0 || columnB >= this._COLUMN
      || rowB < 0 || rowB >= this._ROW) {
      return false;
    }
    return !(this._grid[rowA][columnA] == 0 || this._grid[rowB][columnB] == 0) && this._grid[rowA][columnA] == this._grid[rowB][columnB];
  }

  DisplayBoard() {
    this._ui.write('\n');
    for (let i = 0; i <= 5; ++i) {
        for (let j = 0; j <= 6; ++j) {
          this._ui.write(this._grid[i][j] + " ");
        }
        this._ui.write('\n');
    }
    this._ui.write('\n');
  }

  Render(data) {

  }
}

export default GameBoard;