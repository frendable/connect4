'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Disc = require('../model/Disc');

var _Disc2 = _interopRequireDefault(_Disc);

var _GameConstant = require('../resource/GameConstant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InGame = function () {
  function InGame(context, ui, gameBoard) {
    _classCallCheck(this, InGame);

    this._context = context;
    this._ui = ui;
    this._gameBoard = gameBoard;
  }

  _createClass(InGame, [{
    key: 'renderGameOver',
    value: function renderGameOver() {
      var MSG = '';
      switch (this._context.getGameState().getOutcome()) {
        case _GameConstant.OUTCOME.DRAW:
          MSG = 'GAME DRAW !';
          break;
        case _GameConstant.OUTCOME.BLUE_WIN:
          MSG = 'PLAYER ' + this._context.getGameState().getPlayerBlue() + ' ' + _GameConstant.COLOR.BLUE + ' WIN !';
          this.renderStar(this._gameBoard.getWinDiscs());
          break;
        case _GameConstant.OUTCOME.RED_WIN:
          MSG = 'PLAYER ' + this._context.getGameState().getPlayerRed() + ' ' + _GameConstant.COLOR.RED + ' WIN !';
          this.renderStar(this._gameBoard.getWinDiscs());
          break;
      }

      this._ui.cursor.goto(this._ui.center.x - MSG.length / 2 + 6, this._ui.center.y - 10);
      this._ui.cursor.red();
      this._ui.cursor.bold();
      this._ui.write(MSG);

      this._ui.cursor.hex('#f65590');
      var RETRY = 'Press [space] to play again';
      this._ui.cursor.goto(this._ui.center.x - RETRY.length / 2 + 6, this._ui.center.y - 8);
      this._ui.write(RETRY);
      this._ui.cursor.reset();
    }
  }, {
    key: 'renderStar',
    value: function renderStar(winDiscs) {
      var _this = this;

      winDiscs.map(function (discCoordinat) {
        _this._ui.cursor.goto(_this._ui.center.x + discCoordinat.x * 2, _this._ui.center.y + discCoordinat.y);
        _this._ui.cursor.hex('#ffffff');
        _this._ui.write('\u2022');
        _this._ui.cursor.reset();
      });

      clearTimeout(this._timer);
      this._timer = setTimeout(function () {
        winDiscs.map(function (discCoordinat) {
          _this._ui.cursor.goto(_this._ui.center.x + discCoordinat.x * 2, _this._ui.center.y + discCoordinat.y);
          var color = _this._context.getGameState().getOutcome() === _GameConstant.OUTCOME.BLUE_WIN ? _Disc2.default.getHexColorWithParam(_GameConstant.COLOR.BLUE) : _Disc2.default.getHexColorWithParam(_GameConstant.COLOR.RED);
          _this._ui.cursor.hex(color);
          _this._ui.write('\u2022');
          _this._ui.cursor.reset();
        });
        clearTimeout(_this._timer);
        _this._timer = setTimeout(function () {
          _this.renderStar(winDiscs);
        }, 500);
      }, 500);
    }
  }, {
    key: 'resetTimer',
    value: function resetTimer() {
      clearTimeout(this._timer);
    }
  }, {
    key: 'renderGame',
    value: function renderGame() {
      this._ui.clear();
      this.resetTimer();
      this.renderPlayerState();
      this.renderBoard();
      this.renderLine();
    }
  }, {
    key: 'renderPlayerState',
    value: function renderPlayerState() {
      var xPosition = this._ui.center.x + this._gameBoard.getPlayerActiveColumn() * 2;
      this._ui.cursor.goto(xPosition - 2, this._ui.center.y - 2);
      this._ui.write(' ');
      this._ui.cursor.goto(xPosition + 2, this._ui.center.y - 2);
      this._ui.write(' ');

      this._ui.cursor.goto(xPosition, this._ui.center.y - 2);
      this._ui.cursor.hex(_Disc2.default.getHexColorWithParam(this._context.getTurnState().getColor()));
      this._ui.write('•');
      this._ui.cursor.reset();
    }
  }, {
    key: 'renderLine',
    value: function renderLine() {
      this._ui.cursor.reset();
      /**
       * Render upper line
       */
      this._ui.line({
        x: this._ui.center.x - 2,
        y: this._ui.center.y - 1
      }, {
        x: this._ui.center.x + this._gameBoard.getNumColumn() * 2 + 1,
        y: this._ui.center.y - 1
      });

      /**
       * Render down line
       */
      this._ui.line({
        x: this._ui.center.x - 2,
        y: this._ui.center.y + this._gameBoard.getNumRow()
      }, {
        x: this._ui.center.x + this._gameBoard.getNumColumn() * 2 + 1,
        y: this._ui.center.y + this._gameBoard.getNumRow()
      });

      /**
       * Render left line
       */
      this._ui.line({
        x: this._ui.center.x - 2,
        y: this._ui.center.y
      }, {
        x: this._ui.center.x - 1,
        y: this._ui.center.y + this._gameBoard.getNumRow()
      });

      /**
       * Render right line
       */
      this._ui.line({
        x: this._ui.center.x + this._gameBoard.getNumColumn() * 2,
        y: this._ui.center.y
      }, {
        x: this._ui.center.x + this._gameBoard.getNumColumn() * 2 + 1,
        y: this._ui.center.y + this._gameBoard.getNumRow()
      });
      this._ui.cursor.reset();
    }
  }, {
    key: 'renderBoard',
    value: function renderBoard() {
      /**
       * Render board based on gameboard grid state
       */
      this._ui.cursor.goto(this._ui.center.x, this._ui.center.y);
      this._ui.cursor.bold();
      var grid = this._gameBoard.getGrid();
      for (var i = 0; i < this._gameBoard.getNumRow(); i++) {
        for (var j = 0; j < this._gameBoard.getNumColumn(); j++) {
          this._ui.cursor.hex(grid[i][j].getHexColor());
          this._ui.cursor.bold();
          this._ui.write(grid[i][j].getShape() + ' ');
        }
        this._ui.cursor.goto(this._ui.center.x, this._ui.center.y + i + 1);
      }
      this._ui.cursor.reset();
    }
  }, {
    key: 'redraw',
    value: function redraw() {
      if (this._context.getGameState().getOutcome() !== _GameConstant.OUTCOME.NOTHING) {
        //Gameover
        this.renderGameOver();
      } else {
        this.renderPlayerState();
        this.renderLine();
        this.renderBoard();
      }
    }
  }]);

  return InGame;
}();

exports.default = InGame;
