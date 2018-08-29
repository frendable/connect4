"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Context = function () {
  /**
   * @private
   * Context can be accessed by controller, model, and view to know the real current state
   */

  function Context() {
    _classCallCheck(this, Context);

    this._state = {
      pageState: null,
      turnState: null,
      menuState: null,
      winState: false
    };
  }

  _createClass(Context, [{
    key: "SetPageState",
    value: function SetPageState(pageState) {
      this._state.pageState = pageState;
    }
  }, {
    key: "GetPageState",
    value: function GetPageState() {
      return this._state.pageState;
    }
  }, {
    key: "SetTurnState",
    value: function SetTurnState(turnState) {
      this._state.turnState = turnState;
    }
  }, {
    key: "GetTurnState",
    value: function GetTurnState() {
      return this._state.turnState;
    }
  }, {
    key: "SetWinState",
    value: function SetWinState(winState) {
      this._state.winState = winState;
    }
  }, {
    key: "GetWinState",
    value: function GetWinState() {
      return this._state.winState;
    }
  }, {
    key: "SetMenuState",
    value: function SetMenuState(menuState) {
      this._state.menuState = menuState;
    }
  }, {
    key: "GetMenuState",
    value: function GetMenuState() {
      return this._state.menuState;
    }
  }, {
    key: "GetAllState",
    value: function GetAllState() {
      return this._state;
    }
  }]);

  return Context;
}();

exports.default = Context;