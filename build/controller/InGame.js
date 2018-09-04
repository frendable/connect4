'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _InGame = require('../view/InGame');

var _InGame2 = _interopRequireDefault(_InGame);

var _GameBoard = require('../model/GameBoard');

var _GameBoard2 = _interopRequireDefault(_GameBoard);

var _Controller2 = require('./Controller');

var _Controller3 = _interopRequireDefault(_Controller2);

var _Disc = require('../model/Disc');

var _Disc2 = _interopRequireDefault(_Disc);

var _Computer = require('../model/AI/Computer');

var _Computer2 = _interopRequireDefault(_Computer);

var _BlueTurnState = require('../model/State/BlueTurnState');

var _BlueTurnState2 = _interopRequireDefault(_BlueTurnState);

var _RedTurnState = require('../model/State/RedTurnState');

var _RedTurnState2 = _interopRequireDefault(_RedTurnState);

var _GameConstant = require('../resource/GameConstant');

var _GameBoardListener = require('../listener/GameBoardListener');

var _GameBoardListener2 = _interopRequireDefault(_GameBoardListener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InGame = function (_Controller) {
  _inherits(InGame, _Controller);

  function InGame(context, ui) {
    _classCallCheck(this, InGame);

    //Init game board
    var _this = _possibleConstructorReturn(this, (InGame.__proto__ || Object.getPrototypeOf(InGame)).call(this, context, ui));

    _this._gameBoard = new _GameBoard2.default(context, ui);
    _this._blueTurnState = new _BlueTurnState2.default(context.getGameState().getPlayerBlue());
    _this._redTurnState = new _RedTurnState2.default(context.getGameState().getPlayerRed());
    _this._blueTurnState.doAction(context);
    _this._isUseAI = context.getGameState().getPlayerBlue() === _GameConstant.PLAYER_TYPE.COMPUTER || context.getGameState().getPlayerRed() === _GameConstant.PLAYER_TYPE.COMPUTER;

    //Init view
    _this._inGameView = new _InGame2.default(context, ui, _this._gameBoard);

    //Init listener
    _this.initListener(_this._inGameView);

    if (_this._isUseAI) {
      //Init ai
      _this.initAI();
    }
    return _this;
  }

  _createClass(InGame, [{
    key: 'handleKeyLeft',
    value: function handleKeyLeft() {
      if (this._gameBoard.getPlayerActiveColumn() > 0) {
        this._gameBoard.setPlayerActiveColumn(this._gameBoard.getPlayerActiveColumn() - 1);
      }
    }
  }, {
    key: 'handleKeyRight',
    value: function handleKeyRight() {
      if (this._gameBoard.getPlayerActiveColumn() < this._gameBoard._COLUMN - 1) {
        this._gameBoard.setPlayerActiveColumn(this._gameBoard.getPlayerActiveColumn() + 1);
      }
    }
  }, {
    key: 'handleKeySpace',
    value: function handleKeySpace() {
      if (this.context.getGameState().getOutcome() === _GameConstant.OUTCOME.NOTHING) {
        var playerActiveColumn = this._gameBoard.getPlayerActiveColumn();
        if (this._gameBoard.columnHeight(playerActiveColumn) > 0) {
          this.dropDisc(playerActiveColumn);
        }
      } else {
        this.context.getGameState().setOutcome(_GameConstant.OUTCOME.NOTHING);
        this._gameBoard.newGame();
        this._inGameView.renderGame();
        if (this._isUseAI) {
          this.aiMove();
        }
      }

      this._gameBoard.redraw();
    }
  }, {
    key: 'dropDisc',
    value: function dropDisc(column) {
      var _this2 = this;

      this._gameBoard.placeMove(column, new _Disc2.default(this.context.getTurnState().getColor()));
      this._gameBoard.redraw();
      if (this._gameBoard.checkWin() !== _GameConstant.OUTCOME.NOTHING) {
        this.context.getGameState().setOutcome(this._gameBoard.checkWin());
        this._gameBoard.redraw();
      }

      if (this.context.getGameState().getOutcome() === _GameConstant.OUTCOME.NOTHING) {
        if (this.context.getTurnState().getColor() === _GameConstant.COLOR.BLUE) {
          //Switch to red
          this._redTurnState.doAction(this.context);
        } else {
          //Switch to blue
          this._blueTurnState.doAction(this.context);
        }
      }
      this._gameBoard.redraw();
      if (this._isUseAI) {
        /**
         * Handle Async action aiMove
         */
        this.aiMove().then(function () {
          _this2._gameBoard.redraw();
        });
      }
    }
  }, {
    key: 'aiMove',
    value: function aiMove() {
      if (this.context.getTurnState().getPlayerType() === _GameConstant.PLAYER_TYPE.COMPUTER && this.context.getGameState().getOutcome() === _GameConstant.OUTCOME.NOTHING) {
        var turnColor = this.context.getTurnState().getColor();
        var bestMove = this._aiPlayer.getColumn(turnColor, turnColor === _GameConstant.COLOR.BLUE ? _GameConstant.COLOR.RED : _GameConstant.COLOR.BLUE);
        this.dropDisc(bestMove);
      }
      return new Promise(function (resolve) {
        resolve();
      });
    }
  }, {
    key: 'initAI',
    value: function initAI() {
      this._aiPlayer = new _Computer2.default(this._gameBoard);
      switch (this.context.getGameState().getDifficulty()) {
        case _GameConstant.DIFFICULTY.HARD:
          this._aiPlayer.setDifficulty(10);
          break;
        case _GameConstant.DIFFICULTY.NORMAL:
          this._aiPlayer.setDifficulty(7);
          break;
        case _GameConstant.DIFFICULTY.EASY:
          this._aiPlayer.setDifficulty(4);
          break;
      }

      this.aiMove();
    }
  }, {
    key: 'initListener',
    value: function initListener(inGameView) {
      var _this3 = this;

      this.ui.onKey('right', function () {
        _this3.handleKeyRight();
      });
      this.ui.onKey('left', function () {
        _this3.handleKeyLeft();
      });
      this.ui.onKey('space', function () {
        _this3.handleKeySpace();
      });

      /**
       * Init all listeners used by the game
       */
      this._gameBoard.addListener(new _GameBoardListener2.default(this._inGameView));
    }
  }, {
    key: 'start',
    value: function start(callback) {
      this._inGameView.renderGame();
    }
  }]);

  return InGame;
}(_Controller3.default);

exports.default = InGame;
