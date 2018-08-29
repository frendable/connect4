'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Context = require('../model/State/Context');

var _Context2 = _interopRequireDefault(_Context);

var _Interface = require('../util/Interface');

var _Interface2 = _interopRequireDefault(_Interface);

var _MainMenuPageState = require('../model/State/MainMenuPageState');

var _MainMenuPageState2 = _interopRequireDefault(_MainMenuPageState);

var _GameConstant = require('../resource/GameConstant');

var _MainMenu = require('../controller/MainMenu');

var _MainMenu2 = _interopRequireDefault(_MainMenu);

var _InGame = require('../controller/InGame');

var _InGame2 = _interopRequireDefault(_InGame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FRAME = 100;

var GamePlay = function () {
  function GamePlay() {
    _classCallCheck(this, GamePlay);

    this._context = new _Context2.default();
    this._ui = new _Interface2.default();
    this._mainMenuController = new _MainMenu2.default(this._context, this._ui);
    this._inGameController = null;
    this._activeController = this._mainMenuController;

    /**
     * Open main menu page for the first time
     */
    var mainMenuPageState = new _MainMenuPageState2.default();
    mainMenuPageState.DoAction(this._context);
  }

  _createClass(GamePlay, [{
    key: 'activityManager',
    value: function activityManager() {
      var _this = this;

      if (this._context.GetPageState().GetPage() === _GameConstant.PAGE.MAIN_MENU) {
        this._activeController = this._mainMenuController;
        this._activeController.Render(function () {
          _this.loop();
        });
      } else {
        if (this._inGameController === null) {
          this._inGameController = new _InGame2.default(this._context, this._ui);
        }
        this._activeController = this._inGameController;
        this._activeController.Render();
        this.loop();
      }
    }
  }, {
    key: 'loop',
    value: function loop() {
      var _this2 = this;

      setTimeout(function () {
        _this2.activityManager();
      }, FRAME);
    }
  }, {
    key: 'start',
    value: function start() {
      console.log('Game started!');
      this.loop();
    }
  }]);

  return GamePlay;
}();

exports.default = GamePlay;
