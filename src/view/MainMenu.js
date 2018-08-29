import { DIFFICULTY, PLAYER_TYPE } from '../resource/GameConstant';
import MenuState from '../model/State/MenuState';
import InGamePageState from '../model/State/InGamePageState';

class MainMenu {
  constructor(context, ui) {
    this._context = context;
    this._ui = ui;
    this._ui.clear();
    this._menuState = new MenuState();
  }

  RenderQuestion(callback) {
    this._callback = callback;
    console.log('========================');
    console.log('WELCOME TO CONNECT4 GAME');
    console.log('========================');
    this.RenderQuestionDifficulty(() => {
      this.RenderQuestionPlayerBlue(() => {
        this.RenderQuestionPlayerRed(() => {
          this._menuState.DoAction(this._context);
          /**
           * Start game
           */
          const inGamePageState = new InGamePageState();
          inGamePageState.DoAction(this._context);
          this._callback();
        })
      })
    });
  }

  RenderQuestionDifficulty(callback) {
    const difficultyArr = Object.keys(DIFFICULTY);
    this._ui.question(`Difficulty (${difficultyArr.map(diff => diff)}) default "EASY" : `, (answer) => {
      if (difficultyArr.indexOf(answer.toUpperCase()) > -1) {
        this._menuState.SetDifficulty(answer);
      } else {
        this._menuState.SetDifficulty(DIFFICULTY.EASY);
      }
      callback();
    });
  }

  RenderQuestionPlayerBlue(callback) {
    const playerTypeArr = Object.keys(PLAYER_TYPE);
    this._ui.question(`Player Blue (${playerTypeArr.map(player => player)}) default "HUMAN" : `, (answer) => {
      if (playerTypeArr.indexOf(answer.toUpperCase()) > -1) {
        this._menuState.SetPlayerBlue(answer);
      } else {
        this._menuState.SetPlayerBlue(PLAYER_TYPE.HUMAN);
      }
      callback();
    });
  }

  RenderQuestionPlayerRed(callback) {
    const playerTypeArr = Object.keys(PLAYER_TYPE);
    this._ui.question(`Player Red (${playerTypeArr.map(player => player)}) default "COMPUTER" : `, (answer) => {
      if (playerTypeArr.indexOf(answer.toUpperCase()) > -1) {
        this._menuState.SetPlayerRed(answer);
      } else {
        this._menuState.SetPlayerRed(PLAYER_TYPE.COMPUTER);
      }
      callback();
    });
  }
}

export default MainMenu;