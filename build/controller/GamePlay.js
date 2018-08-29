'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Context = require('../model/State/Context');

var _Context2 = _interopRequireDefault(_Context);

var _GameConstant = require('../resource/GameConstant');

var _Interface = require('../util/Interface');

var _Interface2 = _interopRequireDefault(_Interface);

var _BlueTurnState = require('../model/State/BlueTurnState');

var _BlueTurnState2 = _interopRequireDefault(_BlueTurnState);

var _RedTurnState = require('../model/State/RedTurnState');

var _RedTurnState2 = _interopRequireDefault(_RedTurnState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GamePlay = function () {
  function GamePlay() {
    _classCallCheck(this, GamePlay);

    this._context = new _Context2.default();
    this._interface = new _Interface2.default();

    // Initialize turn state
    this._blueTurnState = new _BlueTurnState2.default(_GameConstant.PLAYER_TYPE.HUMAN);
    this._blueTurnState.DoAction(this._context);
    this._redTurnState = new _RedTurnState2.default(_GameConstant.PLAYER_TYPE.COMPUTER);
    this._redTurnState.DoAction(this._context);
  }

  _createClass(GamePlay, [{
    key: 'loop',
    value: function loop() {
      var _this = this;

      setTimeout(function () {
        _this._interface.clear();
        _this._interface.cursor.goto(0, 0).yellow().write('FRENDY');
        // console.log(`State: ` + JSON.stringify(this._context.GetTurnState()));

        // if (this._context.GetTurnState().GetColor() === COLOR.BLUE) {
        //   this._redTurnState.DoAction(this._context);
        // } else {
        //   this._blueTurnState.DoAction(this._context);
        // }


        _this.loop();
      }, 3000);
    }
  }, {
    key: 'start',
    value: function start() {
      console.log('Game play started!');
      this.loop();
    }
  }]);

  return GamePlay;
}();

exports.default = GamePlay;
