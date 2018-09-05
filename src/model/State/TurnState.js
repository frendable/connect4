import State from './State';

/**
 * Parent state for blue/red turn state
 */
class TurnState extends State {
  constructor(color, playerType) {
    super();
    this._color = color;
    this._playerType = playerType;
  }

  getColor() {
    return this._color;
  }

  getPlayerType() {
    return this._playerType;
  }
}

export default TurnState;