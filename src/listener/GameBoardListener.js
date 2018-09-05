/**
 * Listener for all event in the game
 */
class GameBoardListener {
  constructor(view) {
    this._view = view;
  }
  
  redraw() {
    this._view.redraw();
  }
}

export default GameBoardListener;