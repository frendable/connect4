import InGameView from '../view/InGame';
import GameBoard from '../model/GameBoard';

class InGame {
  constructor(context, ui) {
    this._context = context;
    this._ui = ui;
    //Init view
    this._inGameView = new InGameView(context, ui);
    //Init listener
    this.InitListener();
    //Init player

    //Init game board
    this._gameBoard = new GameBoard(context, ui);
  }

  InitListener() {
    this._ui.onKey('right', () => {
      console.log('RIGHT');
    });
    this._ui.onKey('left', () => {
      console.log('LEFT');
    });
  }

  Render() {
    this._ui.clear();
    if (this._context.GetWinState()) {
      //Gameover
      this._inGameView.RenderGameOver();
    } else {
      this._gameBoard.DisplayBoard();
    }
  }
}

export default InGame;