'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameConstant = require('../../resource/GameConstant');

var _TurnState2 = require('./TurnState');

var _TurnState3 = _interopRequireDefault(_TurnState2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BlueTurnState = function (_TurnState) {
  _inherits(BlueTurnState, _TurnState);

  function BlueTurnState(playerType) {
    _classCallCheck(this, BlueTurnState);

    return _possibleConstructorReturn(this, (BlueTurnState.__proto__ || Object.getPrototypeOf(BlueTurnState)).call(this, _GameConstant.COLOR.BLUE, playerType));
  }

  _createClass(BlueTurnState, [{
    key: 'doAction',
    value: function doAction(context) {
      /**
       * Blue player make a move
       */
      context.setTurnState(this);
    }
  }]);

  return BlueTurnState;
}(_TurnState3.default);

exports.default = BlueTurnState;
