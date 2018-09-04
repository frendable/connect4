'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameConstant = require('../resource/GameConstant');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Disc = function () {
  function Disc() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _GameConstant.COLOR.WHITE;

    _classCallCheck(this, Disc);

    this._emptyShape = '○';
    this._fullShape = '•';
    this._color = color;
  }

  _createClass(Disc, [{
    key: 'getHexColor',
    value: function getHexColor() {
      return Disc.getHexColorWithParam(this._color);
    }
  }, {
    key: 'getShape',
    value: function getShape() {
      return this._color === _GameConstant.COLOR.BLUE || this._color === _GameConstant.COLOR.RED ? this._fullShape : this._emptyShape;
    }
  }, {
    key: 'color',
    set: function set(color) {
      this._color = color;
    },
    get: function get() {
      return this._color;
    }
  }], [{
    key: 'getHexColorWithParam',
    value: function getHexColorWithParam(color) {
      var hexColor = void 0;
      switch (color) {
        case _GameConstant.COLOR.BLUE:
          hexColor = '#0000FF';
          break;
        case _GameConstant.COLOR.RED:
          hexColor = '#FF0000';
          break;
        default:
          hexColor = '#000000';
      }
      return hexColor;
    }
  }]);

  return Disc;
}();

exports.default = Disc;
