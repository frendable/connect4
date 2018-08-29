"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _State2 = require("./State");

var _State3 = _interopRequireDefault(_State2);

var _GameConstant = require("../../resource/GameConstant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuState = function (_State) {
  _inherits(MenuState, _State);

  function MenuState() {
    _classCallCheck(this, MenuState);

    var _this = _possibleConstructorReturn(this, (MenuState.__proto__ || Object.getPrototypeOf(MenuState)).call(this));

    _this._difficulty = _GameConstant.DIFFICULTY.EASY;
    _this._playerBlue = _GameConstant.PLAYER_TYPE.HUMAN;
    _this._playerRed = _GameConstant.PLAYER_TYPE.COMPUTER;
    return _this;
  }

  _createClass(MenuState, [{
    key: "SetDifficulty",
    value: function SetDifficulty(difficulty) {
      this._difficulty = difficulty;
    }
  }, {
    key: "SetPlayerBlue",
    value: function SetPlayerBlue(playerType) {
      this._playerBlue = playerType;
    }
  }, {
    key: "SetPlayerRed",
    value: function SetPlayerRed(playerType) {
      this._playerRed = playerType;
    }
  }, {
    key: "DoAction",
    value: function DoAction(context) {
      context.SetMenuState(this);
    }
  }]);

  return MenuState;
}(_State3.default);

exports.default = MenuState;
