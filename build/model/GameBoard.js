'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameConstant = require('../resource/GameConstant');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameBoard = function () {
  function GameBoard(context, ui) {
    _classCallCheck(this, GameBoard);

    this._context = context;
    this._ui = ui;
    this._ROW = 6;
    this._COLUMN = 7;
    this._COUNTERS_IN_MATCH = 4;

    this._draw = false;
    this._cellValue = false;
    this._grid = [];
    for (var i = 0; i < this._ROW; i++) {
      for (var j = 0; j < this._COLUMN; j++) {
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

  _createClass(GameBoard, [{
    key: 'CheckWin',
    value: function CheckWin() {
      this._draw = true;
      this._cellValue = 0;
      if (HorizontalCheck() || VerticalCheck() || AscendingDiagonalCheck() || DescendingDiagonalCheck()) {
        return this._cellValue === _GameConstant.COLOR.BLUE ? _GameConstant.OUTCOME.BLUE_WIN : _GameConstant.OUTCOME.RED_WIN;
      }
      return this._draw ? _GameConstant.OUTCOME.DRAW : _GameConstant.OUTCOME.NOTHING;
    }
  }, {
    key: 'HorizontalCheck',
    value: function HorizontalCheck() {
      for (var i = 0; i < this._ROW; i++) {
        for (var j = 0; j < this._COLUMN - 3; j++) {
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
  }, {
    key: 'VerticalCheck',
    value: function VerticalCheck() {
      for (var j = 0; j < this._COLUMN; j++) {
        for (var i = 0; i < this._ROW - 3; i++) {
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
  }, {
    key: 'AscendingDiagonalCheck',
    value: function AscendingDiagonalCheck() {
      for (var i = 3; i < this._ROW; i++) {
        for (var j = 0; j < this._COLUMN - 3; j++) {
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
  }, {
    key: 'DescendingDiagonalCheck',
    value: function DescendingDiagonalCheck() {
      for (var i = 3; i < this._ROW; i++) {
        for (var j = 3; j < this._COLUMN; j++) {
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
  }, {
    key: 'GetWinDiscs',
    value: function GetWinDiscs(cells) {
      var combination = [];
      for (var i = 0; i < 4; i++) {
        combination.push(cells[this._p + this._WIN_Y * i][this._q + this._WIN_X * i]);
      }
      return combination;
    }
  }, {
    key: 'PlaceMove',
    value: function PlaceMove(column, player) {
      if (this._free[column] > 0) {
        this._grid[this._free[column] - 1][column] = player;
        this._free[column]--;
      }
    }
  }, {
    key: 'ColumnHeight',
    value: function ColumnHeight(index) {
      return this._free[index];
    }
  }, {
    key: 'CheckMatch',
    value: function CheckMatch(column, row) {
      var horizontal_matches = 0;
      var vertical_matches = 0;
      var forward_diagonal_matches = 0;
      var backward_diagonal_matches = 0;

      // horizontal matches
      for (var i = 1; i < COUNTERS_IN_MATCH; i++) {
        if (matchingCounters(column, row, column + i, row)) {
          horizontal_matches++;
        } else {
          break;
        }
      }

      for (var _i = 1; _i < COUNTERS_IN_MATCH; _i++) {
        if (matchingCounters(column, row, column - _i, row)) {
          horizontal_matches++;
        } else {
          break;
        }
      }

      // vertical matches
      for (var _i2 = 1; _i2 < COUNTERS_IN_MATCH; _i2++) {
        if (matchingCounters(column, row, column, row + _i2)) {
          vertical_matches++;
        } else {
          break;
        }
      }

      for (var _i3 = 1; _i3 < COUNTERS_IN_MATCH; _i3++) {
        if (matchingCounters(column, row, column, row - _i3)) {
          vertical_matches++;
        } else {
          break;
        }
      }

      // backward diagonal matches ( \ )
      for (var _i4 = 1; _i4 < COUNTERS_IN_MATCH; _i4++) {
        if (matchingCounters(column, row, column + _i4, row - _i4)) {
          backward_diagonal_matches++;
        } else {
          break;
        }
      }

      for (var _i5 = 1; _i5 < COUNTERS_IN_MATCH; _i5++) {
        if (matchingCounters(column, row, column - _i5, row + _i5)) {
          backward_diagonal_matches++;
        } else {
          break;
        }
      }

      // forward diagonal matches ( / )
      for (var _i6 = 1; _i6 < COUNTERS_IN_MATCH; _i6++) {
        if (matchingCounters(column, row, column + _i6, row + _i6)) {
          forward_diagonal_matches++;
        } else {
          break;
        }
      }

      for (var _i7 = 1; _i7 < COUNTERS_IN_MATCH; _i7++) {
        if (matchingCounters(column, row, column - _i7, row - _i7)) {
          forward_diagonal_matches++;
        } else {
          break;
        }
      }

      return horizontal_matches >= COUNTERS_IN_MATCH - 1 || vertical_matches >= COUNTERS_IN_MATCH - 1 || forward_diagonal_matches >= COUNTERS_IN_MATCH - 1 || backward_diagonal_matches >= COUNTERS_IN_MATCH - 1;
    }
  }, {
    key: 'matchingCounters',
    value: function matchingCounters(columnA, rowA, columnB, rowB) {
      if (columnA < 0 || columnA >= this._COLUMN || rowA < 0 || rowA >= this._ROW || columnB < 0 || columnB >= this._COLUMN || rowB < 0 || rowB >= this._ROW) {
        return false;
      }
      return !(this._grid[rowA][columnA] == 0 || this._grid[rowB][columnB] == 0) && this._grid[rowA][columnA] == this._grid[rowB][columnB];
    }
  }, {
    key: 'DisplayBoard',
    value: function DisplayBoard() {
      this._ui.write('\n');
      for (var i = 0; i <= 5; ++i) {
        for (var j = 0; j <= 6; ++j) {
          this._ui.write(this._grid[i][j] + " ");
        }
        this._ui.write('\n');
      }
      this._ui.write('\n');
    }
  }, {
    key: 'Render',
    value: function Render(data) {}
  }]);

  return GameBoard;
}();

exports.default = GameBoard;
