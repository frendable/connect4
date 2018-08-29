class Context {
  /**
   * @private
   * Context can be accessed by controller, model, and view to know the real current state
   */
  
  constructor() {
    this._state = {
      pageState: null,
      turnState: null,
      menuState: null,
      winState: false
    }
  }

  SetPageState(pageState) {
    this._state.pageState = pageState;
  }

  GetPageState() {
    return this._state.pageState;
  }

  SetTurnState(turnState) {
    this._state.turnState = turnState;
  }

  GetTurnState() {
    return this._state.turnState;
  }

  SetWinState(winState) {
    this._state.winState = winState;
  }

  GetWinState() {
    return this._state.winState;
  }

  SetMenuState(menuState) {
    this._state.menuState = menuState;
  }

  GetMenuState() {
    return this._state.menuState;
  }

  GetAllState() {
    return this._state;
  }
}

export default Context;