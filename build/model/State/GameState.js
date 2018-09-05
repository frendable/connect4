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

/**
 * Define all properties related to gamestate
 */
var GameState = function (_State) {
  _inherits(GameState, _State);

  function GameState() {
    _classCallCheck(this, GameState);

    var _this = _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).call(this));

    _this._difficulty = _GameConstant.DIFFICULTY.EASY;
    _this._playerBlue = _GameConstant.PLAYER_TYPE.HUMAN;
    _this._playerRed = _GameConstant.PLAYER_TYPE.COMPUTER;
    _this._outcome = _GameConstant.OUTCOME.NOTHING;
    return _this;
  }

  _createClass(GameState, [{
    key: "setDifficulty",
    value: function setDifficulty(difficulty) {
      this._difficulty = difficulty;
    }
  }, {
    key: "getDifficulty",
    value: function getDifficulty() {
      return this._difficulty;
    }
  }, {
    key: "setPlayerBlue",
    value: function setPlayerBlue(playerType) {
      this._playerBlue = playerType;
    }
  }, {
    key: "getPlayerBlue",
    value: function getPlayerBlue() {
      return this._playerBlue;
    }
  }, {
    key: "setPlayerRed",
    value: function setPlayerRed(playerType) {
      this._playerRed = playerType;
    }
  }, {
    key: "getPlayerRed",
    value: function getPlayerRed() {
      return this._playerRed;
    }
  }, {
    key: "setOutcome",
    value: function setOutcome(outcome) {
      this._outcome = outcome;
    }
  }, {
    key: "getOutcome",
    value: function getOutcome() {
      return this._outcome;
    }
  }, {
    key: "doAction",
    value: function doAction(context) {
      context.setGameState(this);
    }
  }]);

  return GameState;
}(_State3.default);

exports.default = GameState;
