'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Player2 = require('./Player');

var _Player3 = _interopRequireDefault(_Player2);

var _Move = require('./Move');

var _Move2 = _interopRequireDefault(_Move);

var _GameConstant = require('../../resource/GameConstant');

var _Disc = require('../Disc');

var _Disc2 = _interopRequireDefault(_Disc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Computer = function (_Player) {
  _inherits(Computer, _Player);

  function Computer(gameBoard) {
    _classCallCheck(this, Computer);

    var _this = _possibleConstructorReturn(this, (Computer.__proto__ || Object.getPrototypeOf(Computer)).call(this, 'Computer'));

    _this._gameBoard = gameBoard;
    return _this;
  }

  /**
   * Set difficulty of playing with ai
   * @param {int} depth maximum depth ai search for best move 
   */


  _createClass(Computer, [{
    key: 'setDifficulty',
    value: function setDifficulty(depth) {
      this._depth = depth;
    }

    /**
     * Get column for ai move
     * @return column
     */

  }, {
    key: 'getColumn',
    value: function getColumn(player, opponent) {
      return this.selectMove(player, opponent, -10000, 10000, this._depth).getColumn();
    }

    /**
     * Recursive minmax method
     * @param {COLOR} player player will move
     * @param {COLOR} opponent player won't move
     * @param {int} alpha the best score ai player achieve
     * @param {int} beta the best score other player achieve
     * @param {int} depth current depth in tree
     * @return bestMove
     */

  }, {
    key: 'selectMove',
    value: function selectMove(player, opponent, alpha, beta, depth) {
      var bestMove = new _Move2.default(-1, player === _GameConstant.COLOR.RED ? alpha : beta);
      for (var i = 0; i < this._gameBoard.getNumColumn(); i++) {
        if (this._gameBoard.columnHeight(i) > 0) {
          this._gameBoard.placeMove(i, new _Disc2.default(player));
          var score = 0;
          if (this._gameBoard.checkMatch(i, this._gameBoard.columnHeight(i))) {
            score = player === _GameConstant.COLOR.RED ? 1 : -1;
          } else if (depth !== 1) {
            score = this.selectMove(opponent, player, alpha, beta, depth - 1).getScore();
          }

          this._gameBoard.undoMove(i);

          if (player === _GameConstant.COLOR.RED && score > bestMove.getScore()) {
            bestMove = new _Move2.default(i, score);
            alpha = score;
          } else if (player === _GameConstant.COLOR.BLUE && score < bestMove.getScore()) {
            bestMove = new _Move2.default(i, score);
            beta = score;
          }

          if (alpha >= beta) {
            return bestMove;
          }
        }
      }
      return bestMove;
    }
  }]);

  return Computer;
}(_Player3.default);

exports.default = Computer;
