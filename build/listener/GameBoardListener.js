"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Listener for all event in the game
 */
var GameBoardListener = function () {
  function GameBoardListener(view) {
    _classCallCheck(this, GameBoardListener);

    this._view = view;
  }

  _createClass(GameBoardListener, [{
    key: "redraw",
    value: function redraw() {
      this._view.redraw();
    }
  }]);

  return GameBoardListener;
}();

exports.default = GameBoardListener;
