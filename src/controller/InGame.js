import InGameView from '../view/InGame';
import GameBoard from '../model/GameBoard';
import Controller from './Controller';
import Disc from '../model/Disc';
import Computer from '../model/AI/Computer';

import BlueTurnState from '../model/State/BlueTurnState';
import RedTurnState from '../model/State/RedTurnState';
import { COLOR, OUTCOME, DIFFICULTY, PLAYER_TYPE } from '../resource/GameConstant';
import GameBoardListener from '../listener/GameBoardListener';

class InGame extends Controller {
  constructor(context, ui) {
    super(context, ui);
    
    //Init game board
    this._gameBoard = new GameBoard(context, ui);
    this._blueTurnState = new BlueTurnState(context.getGameState().getPlayerBlue());
    this._redTurnState = new RedTurnState(context.getGameState().getPlayerRed());
    this._blueTurnState.doAction(context);
    this._useAI = context.getGameState().getPlayerBlue() === PLAYER_TYPE.COMPUTER || context.getGameState().getPlayerRed() === PLAYER_TYPE.COMPUTER;

    //Init view
    this._inGameView = new InGameView(context, ui, this._gameBoard);

    //Init listener
    this.initListener(this._inGameView);
    
    if (this._useAI) {
      //Init ai
      this.initAI();
    }
  }

  handleKeyLeft() {
    if (this._gameBoard.getPlayerActiveColumn() > 0) {
      this._gameBoard.setPlayerActiveColumn(this._gameBoard.getPlayerActiveColumn() - 1);
    }
  }

  handleKeyRight() {
    if (this._gameBoard.getPlayerActiveColumn() < this._gameBoard._COLUMN - 1) {
      this._gameBoard.setPlayerActiveColumn(this._gameBoard.getPlayerActiveColumn() + 1);
    }
  }

  handleKeySpace() {
    if (this.context.getGameState().getOutcome() === OUTCOME.NOTHING) {
      const playerActiveColumn = this._gameBoard.getPlayerActiveColumn();
      if (this._gameBoard.columnHeight(playerActiveColumn) > 0) {
        this.dropDisc(playerActiveColumn);
      }
    } else {
      this.context.getGameState().setOutcome(OUTCOME.NOTHING);
      this._gameBoard.newGame();
      this._inGameView.renderGame();
      if (this._useAI) {
        this.aiMove();
      }
    }

    this._gameBoard.redraw();
  }

  dropDisc(column) {
    this._gameBoard.placeMove(column, new Disc(this.context.getTurnState().getColor()));    
    this._gameBoard.redraw();
    if (this._gameBoard.checkWin() !== OUTCOME.NOTHING) {
      this.context.getGameState().setOutcome(this._gameBoard.checkWin());
      this._gameBoard.redraw();
    }

    if ((this.context.getGameState().getOutcome() === OUTCOME.NOTHING)) {
      if (this.context.getTurnState().getColor() === COLOR.BLUE) {
        //Switch to red
        this._redTurnState.doAction(this.context);
      } else {
        //Switch to blue
        this._blueTurnState.doAction(this.context);
      }
    }
    this._gameBoard.redraw();
    if (this._useAI) {
      /**
       * Handle Async action aiMove
       */
      this.aiMove().then(() => {
        this._gameBoard.redraw();
      });
    }
  }

  aiMove() {
    if (this.context.getTurnState().getPlayerType() === PLAYER_TYPE.COMPUTER && this.context.getGameState().getOutcome() === OUTCOME.NOTHING) {
      const turnColor = this.context.getTurnState().getColor();
      const bestMove = this._aiPlayer.getColumn(turnColor, turnColor === COLOR.BLUE ? COLOR.RED : COLOR.BLUE);
      this.dropDisc(bestMove);
    }
    return new Promise((resolve) => {
      resolve();
    });
  }

  initAI() {
    this._aiPlayer = new Computer(this._gameBoard);
    switch(this.context.getGameState().getDifficulty()) {
      case DIFFICULTY.HARD:
        this._aiPlayer.setDifficulty(10);
        break;
      case DIFFICULTY.NORMAL:
        this._aiPlayer.setDifficulty(7);
        break;
      case DIFFICULTY.EASY:
        this._aiPlayer.setDifficulty(4);
        break;
    }

    this.aiMove();
  }

  initListener(inGameView) {
    this.ui.onKey('right', () => {
      this.handleKeyRight();
    });
    this.ui.onKey('left', () => {
      this.handleKeyLeft();
    });
    this.ui.onKey('space', () => {
      this.handleKeySpace();
    });

    /**
     * Init all listeners used by the game
     */
    this._gameBoard.addListener(new GameBoardListener(this._inGameView));
  }

  start(callback) {
    this._inGameView.renderGame();
  }
}

export default InGame;