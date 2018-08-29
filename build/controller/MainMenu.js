'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MainMenu = require('../view/MainMenu');

var _MainMenu2 = _interopRequireDefault(_MainMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainMenu = function () {
  function MainMenu(context, ui) {
    _classCallCheck(this, MainMenu);

    //Init view
    this._mainMenuView = new _MainMenu2.default(context, ui);
  }

  _createClass(MainMenu, [{
    key: 'Render',
    value: function Render(callback) {
      this._mainMenuView.RenderQuestion(callback);
    }
  }]);

  return MainMenu;
}();

exports.default = MainMenu;
