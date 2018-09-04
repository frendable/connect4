"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Move = function () {
  function Move(column, score) {
    _classCallCheck(this, Move);

    this._column = column;
    this._score = score;
  }

  _createClass(Move, [{
    key: "getColumn",
    value: function getColumn() {
      return this._column;
    }
  }, {
    key: "getScore",
    value: function getScore() {
      return this._score;
    }
  }]);

  return Move;
}();

exports.default = Move;
