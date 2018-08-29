'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _InGame = require('../view/InGame');

var _InGame2 = _interopRequireDefault(_InGame);

var _GameBoard = require('../model/GameBoard');

var _GameBoard2 = _interopRequireDefault(_GameBoard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InGame = function () {
  function InGame(context, ui) {
    _classCallCheck(this, InGame);

    this._context = context;
    this._ui = ui;
    //Init view
    this._inGameView = new _InGame2.default(context, ui);
    //Init listener
    this.InitListener();
    //Init player

    //Init game board
    this._gameBoard = new _GameBoard2.default(context, ui);
  }

  _createClass(InGame, [{
    key: 'InitListener',
    value: function InitListener() {
      this._ui.onKey('right', function () {
        console.log('RIGHT');
      });
      this._ui.onKey('left', function () {
        console.log('LEFT');
      });
    }
  }, {
    key: 'Render',
    value: function Render() {
      this._ui.clear();
      if (this._context.GetWinState()) {
        //Gameover
        this._inGameView.RenderGameOver();
      } else {
        this._gameBoard.DisplayBoard();
      }
    }
  }]);

  return InGame;
}();

exports.default = InGame;
