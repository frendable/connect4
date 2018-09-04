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
      gameState: null
    };
  }

  _createClass(Context, [{
    key: "setPageState",
    value: function setPageState(pageState) {
      this._state.pageState = pageState;
    }
  }, {
    key: "getPageState",
    value: function getPageState() {
      return this._state.pageState;
    }
  }, {
    key: "setTurnState",
    value: function setTurnState(turnState) {
      this._state.turnState = turnState;
    }
  }, {
    key: "getTurnState",
    value: function getTurnState() {
      return this._state.turnState;
    }
  }, {
    key: "setGameState",
    value: function setGameState(gameState) {
      this._state.gameState = gameState;
    }
  }, {
    key: "getGameState",
    value: function getGameState() {
      return this._state.gameState;
    }
  }, {
    key: "getAllState",
    value: function getAllState() {
      return this._state;
    }
  }]);

  return Context;
}();

exports.default = Context;
