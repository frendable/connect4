import { DIFFICULTY, PLAYER_TYPE } from '../resource/GameConstant';
import GameState from '../model/State/GameState';
import InGamePageState from '../model/State/InGamePageState';

class MainMenu {
  constructor(context, ui) {
    this._context = context;
    this._ui = ui;
    this._ui.clear();
    this._gameState = new GameState();
  }

  renderQuestion(callback) {
    this._callback = callback;
    console.log('========================');
    console.log('WELCOME TO CONNECT4 GAME');
    console.log('========================');
    this.renderQuestionDifficulty(() => {
      this.renderQuestionPlayerBlue(() => {
        this.renderQuestionPlayerRed(() => {
          /**
           * Save game state to context
           */
          this._gameState.doAction(this._context);
          /**
           * Start game
           */
          const inGamePageState = new InGamePageState();
          inGamePageState.doAction(this._context);
          this._callback();
        })
      })
    });
  }

  renderQuestionDifficulty(callback) {
    const difficultyArr = Object.keys(DIFFICULTY);
    this._ui.question(`Difficulty (${difficultyArr.map(diff => diff)}) default "EASY" : `, (answer) => {
      if (difficultyArr.indexOf(answer.toUpperCase()) > -1) {
        this._gameState.setDifficulty(answer);
      } else {
        this._gameState.setDifficulty(DIFFICULTY.EASY);
      }
      callback();
    });
  }

  renderQuestionPlayerBlue(callback) {
    const playerTypeArr = Object.keys(PLAYER_TYPE);
    this._ui.question(`Player Blue (${playerTypeArr.map(player => player)}) default "HUMAN" : `, (answer) => {
      if (playerTypeArr.indexOf(answer.toUpperCase()) > -1) {
        this._gameState.setPlayerBlue(answer);
      } else {
        this._gameState.setPlayerBlue(PLAYER_TYPE.HUMAN);
      }
      callback();
    });
  }

  renderQuestionPlayerRed(callback) {
    const playerTypeArr = Object.keys(PLAYER_TYPE);
    this._ui.question(`Player Red (${playerTypeArr.map(player => player)}) default "COMPUTER" : `, (answer) => {
      if (playerTypeArr.indexOf(answer.toUpperCase()) > -1) {
        this._gameState.setPlayerRed(answer);
      } else {
        this._gameState.setPlayerRed(PLAYER_TYPE.COMPUTER);
      }
      callback();
    });
  }
}

export default MainMenu;