'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InGame = function () {
  function InGame(context, ui) {
    _classCallCheck(this, InGame);

    this._context = context;
    this._ui = ui;
  }

  _createClass(InGame, [{
    key: 'RenderGameOver',
    value: function RenderGameOver() {
      this._ui.clear();
      var MSG = 'Game Over!';
      this._ui.cursor.goto(this._ui.center.x - MSG.length / 2, this._ui.center.y);
      this._ui.cursor.red();
      this._ui.cursor.bold();
      this._ui.write(MSG);

      this._ui.cursor.reset();
      this._ui.cursor.hex('#f65590');
      var RETRY = 'Press any key to play again';
      this._ui.cursor.goto(this._ui.center.x - RETRY.length / 2, this._ui.center.y + 2);
      this._ui.write(RETRY);
    }
  }, {
    key: 'RenderGameBoard',
    value: function RenderGameBoard() {}
  }]);

  return InGame;
}();

exports.default = InGame;
