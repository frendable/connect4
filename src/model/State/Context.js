/**
 * Defined all properties which can be accessed by controller, model, and view to know the real current state
 */ 
class Context {
  constructor() {
    this._state = {
      pageState: null,
      turnState: null,
      gameState: null
    }
  }

  setPageState(pageState) {
    this._state.pageState = pageState;
  }

  getPageState() {
    return this._state.pageState;
  }

  setTurnState(turnState) {
    this._state.turnState = turnState;
  }

  getTurnState() {
    return this._state.turnState;
  }

  setGameState(gameState) {
    this._state.gameState = gameState;
  }

  getGameState() {
    return this._state.gameState;
  }

  getAllState() {
    return this._state;
  }
}

export default Context;