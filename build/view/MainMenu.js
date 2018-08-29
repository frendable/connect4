'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameConstant = require('../resource/GameConstant');

var _MenuState = require('../model/State/MenuState');

var _MenuState2 = _interopRequireDefault(_MenuState);

var _InGamePageState = require('../model/State/InGamePageState');

var _InGamePageState2 = _interopRequireDefault(_InGamePageState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainMenu = function () {
  function MainMenu(context, ui) {
    _classCallCheck(this, MainMenu);

    this._context = context;
    this._ui = ui;
    this._ui.clear();
    this._menuState = new _MenuState2.default();
  }

  _createClass(MainMenu, [{
    key: 'RenderQuestion',
    value: function RenderQuestion(callback) {
      var _this = this;

      this._callback = callback;
      console.log('========================');
      console.log('WELCOME TO CONNECT4 GAME');
      console.log('========================');
      this.RenderQuestionDifficulty(function () {
        _this.RenderQuestionPlayerBlue(function () {
          _this.RenderQuestionPlayerRed(function () {
            _this._menuState.DoAction(_this._context);
            /**
             * Start game
             */
            var inGamePageState = new _InGamePageState2.default();
            inGamePageState.DoAction(_this._context);
            _this._callback();
          });
        });
      });
    }
  }, {
    key: 'RenderQuestionDifficulty',
    value: function RenderQuestionDifficulty(callback) {
      var _this2 = this;

      var difficultyArr = Object.keys(_GameConstant.DIFFICULTY);
      this._ui.question('Difficulty (' + difficultyArr.map(function (diff) {
        return diff;
      }) + ') default "EASY" : ', function (answer) {
        if (difficultyArr.indexOf(answer.toUpperCase()) > -1) {
          _this2._menuState.SetDifficulty(answer);
        } else {
          _this2._menuState.SetDifficulty(_GameConstant.DIFFICULTY.EASY);
        }
        callback();
      });
    }
  }, {
    key: 'RenderQuestionPlayerBlue',
    value: function RenderQuestionPlayerBlue(callback) {
      var _this3 = this;

      var playerTypeArr = Object.keys(_GameConstant.PLAYER_TYPE);
      this._ui.question('Player Blue (' + playerTypeArr.map(function (player) {
        return player;
      }) + ') default "HUMAN" : ', function (answer) {
        if (playerTypeArr.indexOf(answer.toUpperCase()) > -1) {
          _this3._menuState.SetPlayerBlue(answer);
        } else {
          _this3._menuState.SetPlayerBlue(_GameConstant.PLAYER_TYPE.HUMAN);
        }
        callback();
      });
    }
  }, {
    key: 'RenderQuestionPlayerRed',
    value: function RenderQuestionPlayerRed(callback) {
      var _this4 = this;

      var playerTypeArr = Object.keys(_GameConstant.PLAYER_TYPE);
      this._ui.question('Player Red (' + playerTypeArr.map(function (player) {
        return player;
      }) + ') default "COMPUTER" : ', function (answer) {
        if (playerTypeArr.indexOf(answer.toUpperCase()) > -1) {
          _this4._menuState.SetPlayerRed(answer);
        } else {
          _this4._menuState.SetPlayerRed(_GameConstant.PLAYER_TYPE.COMPUTER);
        }
        callback();
      });
    }
  }]);

  return MainMenu;
}();

exports.default = MainMenu;
