'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameConstant = require('../resource/GameConstant');

var _Disc = require('./Disc');

var _Disc2 = _interopRequireDefault(_Disc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameBoard = function () {
  function GameBoard(context, ui) {
    var _this = this;

    _classCallCheck(this, GameBoard);

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
    this._cellValue = new _Disc2.default();
    /**
     * Grid game board state
     */
    this._grid = new Array(this._ROW).fill(null).map(function () {
      return new Array(_this._COLUMN).fill(new _Disc2.default());
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

  /**
   * New game state
   */


  _createClass(GameBoard, [{
    key: 'newGame',
    value: function newGame() {
      var _this2 = this;

      this._grid = new Array(this._ROW).fill(null).map(function () {
        return new Array(_this2._COLUMN).fill(new _Disc2.default());
      });
      this._free = new Array(this._COLUMN).fill(this._ROW);
    }

    /**
     * Get grid matrix
     */

  }, {
    key: 'getGrid',
    value: function getGrid() {
      return this._grid;
    }

    /**
     * Get number of gameboard row
     */

  }, {
    key: 'getNumRow',
    value: function getNumRow() {
      return this._ROW;
    }

    /**
     * Get number of gameboard column
     */

  }, {
    key: 'getNumColumn',
    value: function getNumColumn() {
      return this._COLUMN;
    }

    /**
     * Get player active column (human only)
     */

  }, {
    key: 'getPlayerActiveColumn',
    value: function getPlayerActiveColumn() {
      return this._playerActiveColumn;
    }

    /**
     * Set player active column (human only)
     * @param {int} playerActiveColumn 
     */

  }, {
    key: 'setPlayerActiveColumn',
    value: function setPlayerActiveColumn(playerActiveColumn) {
      this._playerActiveColumn = playerActiveColumn;
      this.redraw();
    }

    /**
     * @return OUTCOME return status of the game
     */

  }, {
    key: 'checkWin',
    value: function checkWin() {
      this._draw = true;
      if (this.horizontalCheck() || this.verticalCheck() || this.ascendingDiagonalCheck() || this.descendingDiagonalCheck()) {
        return this._cellValue.color === _GameConstant.COLOR.BLUE ? _GameConstant.OUTCOME.BLUE_WIN : _GameConstant.OUTCOME.RED_WIN;
      }
      return this._draw ? _GameConstant.OUTCOME.DRAW : _GameConstant.OUTCOME.NOTHING;
    }

    /**
     * Horizontal check match
     */

  }, {
    key: 'horizontalCheck',
    value: function horizontalCheck() {
      for (var i = 0; i < this._ROW; i++) {
        for (var j = 0; j < this._COLUMN - 3; j++) {
          this._cellValue = this._grid[i][j];
          if (this._cellValue.color == _GameConstant.COLOR.WHITE) {
            this._draw = false;
          }
          if (this._cellValue.color != _GameConstant.COLOR.WHITE && this._grid[i][j + 1].color == this._cellValue.color && this._grid[i][j + 2].color == this._cellValue.color && this._grid[i][j + 3].color == this._cellValue.color) {
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

    /**
     * Vertical check match
     */

  }, {
    key: 'verticalCheck',
    value: function verticalCheck() {
      for (var j = 0; j < this._COLUMN; j++) {
        for (var i = 0; i < this._ROW - 3; i++) {
          this._cellValue = this._grid[i][j];
          if (this._cellValue.color == _GameConstant.COLOR.WHITE) {
            this._draw = false;
          }
          if (this._cellValue.color != _GameConstant.COLOR.WHITE && this._grid[i + 1][j].color == this._cellValue.color && this._grid[i + 2][j].color == this._cellValue.color && this._grid[i + 3][j].color == this._cellValue.color) {
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

    /**
     * Ascending diagonal check match
     */

  }, {
    key: 'ascendingDiagonalCheck',
    value: function ascendingDiagonalCheck() {
      for (var i = 3; i < this._ROW; i++) {
        for (var j = 0; j < this._COLUMN - 3; j++) {
          this._cellValue = this._grid[i][j];
          if (this._cellValue.color == _GameConstant.COLOR.WHITE) {
            this._draw = false;
          }
          if (this._cellValue.color != _GameConstant.COLOR.WHITE && this._grid[i - 1][j + 1].color == this._cellValue.color && this._grid[i - 2][j + 2].color == this._cellValue.color && this._grid[i - 3][j + 3].color == this._cellValue.color) {
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

    /**
     * Descending diagonal check match
     */

  }, {
    key: 'descendingDiagonalCheck',
    value: function descendingDiagonalCheck() {
      for (var i = 3; i < this._ROW; i++) {
        for (var j = 3; j < this._COLUMN; j++) {
          this._cellValue = this._grid[i][j];
          if (this._cellValue.color == _GameConstant.COLOR.WHITE) {
            this._draw = false;
          }
          if (this._cellValue.color != _GameConstant.COLOR.WHITE && this._grid[i - 1][j - 1].color == this._cellValue.color && this._grid[i - 2][j - 2].color == this._cellValue.color && this._grid[i - 3][j - 3].color == this._cellValue.color) {
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

    /**
     * @return combination Get index combination of win player (used for highlight the winner)
     */

  }, {
    key: 'getWinDiscs',
    value: function getWinDiscs() {
      var combination = [];
      for (var i = 0; i < 4; i++) {
        combination.push({ x: this._j + this._WIN_X * i, y: this._i + this._WIN_Y * i });
      }
      return combination;
    }

    /**
     * Put the disc inside the gameboard
     * @param {int} column 
     * @param {COLOR} player 
     */

  }, {
    key: 'placeMove',
    value: function placeMove(column, player) {
      if (this._free[column] > 0) {
        this._grid[this._free[column] - 1][column] = player;
        this._free[column]--;
      }
    }

    /**
     * Undo move (used for ai player)
     * @param {int} column 
     */

  }, {
    key: 'undoMove',
    value: function undoMove(column) {
      if (this._free[column] < this._ROW) {
        this._free[column]++;
        this._grid[this._free[column] - 1][column] = new _Disc2.default();
      }
    }

    /**
     * Determine column is still available or not
     * @param {int} index 
     * @return columnHeight
     */

  }, {
    key: 'columnHeight',
    value: function columnHeight(index) {
      return this._free[index];
    }

    /**
     * Checkmatch (used for AI to search possible move)
     * @param {int} column 
     * @param {int} row
     * @return boolean
     */

  }, {
    key: 'checkMatch',
    value: function checkMatch(column, row) {
      var horizontal_matches = 0;
      var vertical_matches = 0;
      var forward_diagonal_matches = 0;
      var backward_diagonal_matches = 0;

      // horizontal matches
      for (var i = 1; i < this._COUNTERS_IN_MATCH; i++) {
        if (this.matchingCounters(column, row, column + i, row)) {
          horizontal_matches++;
        } else {
          break;
        }
      }

      for (var _i = 1; _i < this._COUNTERS_IN_MATCH; _i++) {
        if (this.matchingCounters(column, row, column - _i, row)) {
          horizontal_matches++;
        } else {
          break;
        }
      }

      // vertical matches
      for (var _i2 = 1; _i2 < this._COUNTERS_IN_MATCH; _i2++) {
        if (this.matchingCounters(column, row, column, row + _i2)) {
          vertical_matches++;
        } else {
          break;
        }
      }

      for (var _i3 = 1; _i3 < this._COUNTERS_IN_MATCH; _i3++) {
        if (this.matchingCounters(column, row, column, row - _i3)) {
          vertical_matches++;
        } else {
          break;
        }
      }

      // backward diagonal matches ( \ )
      for (var _i4 = 1; _i4 < this._COUNTERS_IN_MATCH; _i4++) {
        if (this.matchingCounters(column, row, column + _i4, row - _i4)) {
          backward_diagonal_matches++;
        } else {
          break;
        }
      }

      for (var _i5 = 1; _i5 < this._COUNTERS_IN_MATCH; _i5++) {
        if (this.matchingCounters(column, row, column - _i5, row + _i5)) {
          backward_diagonal_matches++;
        } else {
          break;
        }
      }

      // forward diagonal matches ( / )
      for (var _i6 = 1; _i6 < this._COUNTERS_IN_MATCH; _i6++) {
        if (this.matchingCounters(column, row, column + _i6, row + _i6)) {
          forward_diagonal_matches++;
        } else {
          break;
        }
      }

      for (var _i7 = 1; _i7 < this._COUNTERS_IN_MATCH; _i7++) {
        if (this.matchingCounters(column, row, column - _i7, row - _i7)) {
          forward_diagonal_matches++;
        } else {
          break;
        }
      }

      return horizontal_matches >= this._COUNTERS_IN_MATCH - 1 || vertical_matches >= this._COUNTERS_IN_MATCH - 1 || forward_diagonal_matches >= this._COUNTERS_IN_MATCH - 1 || backward_diagonal_matches >= this._COUNTERS_IN_MATCH - 1;
    }

    /**
     * Grid cell checking
     * @param {int} columnA 
     * @param {int} rowA 
     * @param {int} columnB 
     * @param {int} rowB 
     */

  }, {
    key: 'matchingCounters',
    value: function matchingCounters(columnA, rowA, columnB, rowB) {
      if (columnA < 0 || columnA >= this._COLUMN || rowA < 0 || rowA >= this._ROW || columnB < 0 || columnB >= this._COLUMN || rowB < 0 || rowB >= this._ROW) {
        return false;
      }

      return !(this._grid[rowA][columnA].color === _GameConstant.COLOR.WHITE || this._grid[rowB][columnB].color === _GameConstant.COLOR.WHITE) && this._grid[rowA][columnA].color === this._grid[rowB][columnB].color;
    }

    /**
     * ################
     * LISTENERS
     * ################
     */

    /**
     * Add listener
     * @param {Listener} listener 
     */

  }, {
    key: 'addListener',
    value: function addListener(listener) {
      this._listeners.push(listener);
    }

    /**
     * Render ui view
     */

  }, {
    key: 'redraw',
    value: function redraw() {
      this._listeners.map(function (listener) {
        return listener.redraw();
      });
    }
  }]);

  return GameBoard;
}();

exports.default = GameBoard;
