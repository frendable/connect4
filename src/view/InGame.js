class InGame {
  constructor(context, ui) {
    this._context = context;
    this._ui = ui;
  }

  RenderGameOver() {
    this._ui.clear();
    const MSG = 'Game Over!';
    this._ui.cursor.goto(this._ui.center.x - MSG.length / 2, this._ui.center.y);
    this._ui.cursor.red();
    this._ui.cursor.bold();
    this._ui.write(MSG);
  
    this._ui.cursor.reset();
    this._ui.cursor.hex('#f65590');
    const RETRY = 'Press any key to play again';
    this._ui.cursor.goto(this._ui.center.x - RETRY.length / 2, this._ui.center.y + 2);
    this._ui.write(RETRY);
  }

  RenderGameBoard() {
    
  }
}

export default InGame;